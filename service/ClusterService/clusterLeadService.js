const { default: mongoose } = require("mongoose");
const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
// const clusterLeadModel = require("../../model/clusterLeadModel/clusterLeadModel");
// const clusterLeadTargetModel = require("../../model/clusterLeadModel/clusterLeadTargetModel");
const loginsModel = require("../../model/loginsModel");
const { isBDclusterLeadService } = require("./clusterBDService");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const _ = require("lodash");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");
class ClusterLeadService {
  async createclusterLeadService(req) {
    try {
      const body = req.body;
      if (!req.file) {
        return next(new ErrorHandler("Profile picture not found.", 400, {}));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": "Profile picture not found.", "succeeded": false, "ResponseBody": {} })
      }
      const profilePic = req.file;
      const clusterLead = await clusterLeadModel.findOne({ email: body.email });
      if (clusterLead) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead email already exist.",
          data: "",
        };
      }
      const logins = await loginsModel.findOne({ username: body.username });
      if (logins) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead username already exist.",
          data: "",
        };
      }
      const uniqueId = await helperFunctions.uniqueKey();
      const secret_key = await helperFunctions.generateSecretKey();

      const formData = clusterLeadModel({
        cluster_head_id: req.decoded._id,
        // manager_id: body.manager_id,
        emp_id: body.emp_id,
        unique_id: uniqueId,
        name: body.name,
        username: body.username,
        email: body.email,
        designation: body.designation,
        mobile: body.mobile,
        country_code: body.country_code,
        profile_pic: profilePic.path,
        secret_key: secret_key,
      });
      return await formData
        .save()
        .then((data) => {
          return {
            status: 201,
            success: true,
            msg: "Cluster Lead create successfully.",
            data: data,
          };
        })
        .catch((err) => {
          return {
            status: 500,
            success: false,
            msg: "Something want wrong when create Cluster Lead.",
            data: err,
          };
        });
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Somethin went wrong",
        data: error,
      };
    }
  }

  async createclusterLeadCredentialService(req, clusterLead) {
    try {
      const body = req.body;
      const loginData = loginsModel({
        user_id: clusterLead._id,
        unique_id: clusterLead.unique_id,
        name: clusterLead.name,
        email: clusterLead.email,
        username: body.username,
        password: body.password,
        role_type: "ClusterLead",
        secret_key: clusterLead.secret_key,
      });
      return await loginData
        .save()
        .then(async (result) => {
          return {
            status: 201,
            success: true,
            msg: "Cluster Lead Credential created successfully.",
            data: { user: clusterLead, role_type: result.role_type },
          };
        })
        .catch(async (err) => {
          const deleteclusterLead = await clusterLeadModel.deleteOne({
            _id: clusterLead._id,
          });
          return {
            status: 500,
            success: false,
            msg: "Something want wrong when create credential.",
            data: err,
          };
        });
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Something went wrong when create Cluster Lead credentials",
        data: error,
      };
    }
  }

  async getclusterLeadsService(req) {
    const { page, limit, search, manager_id } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };
    // Create an empty match query
    const matchQuery = {};
    let userFilter = [];

    req?.user?._id ? userFilter.push({ cluster_head_id: req.user._id }) : "";
    // manager_id ? userFilter.push({ manager_id: new mongoose.Types.ObjectId(manager_id) }) : "";
    // If the search parameter is provided, add filters for client_name and client_email
    if (search) {
      matchQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const resultAggregate = clusterLeadModel.aggregate([
      {
        $match: { $and: userFilter, ...matchQuery },
      },
      {
        $lookup: {
          from: "clusters",
          localField: "cluster_head_id",
          foreignField: "_id",
          as: "clusterData",
        },
      },
      {
        $unwind: {
          path: "$clusterData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          emp_id: 1,
          unique_id: 1,
          name: 1,
          username: 1,
          email: 1,
          designation: 1,
          mobile: 1,
          country_code: 1,
          profile_pic: 1,
          secret_key: 1,
          status: 1,
          deleted: 1,
          assigned_targets: 1,
          cluster_head: {
            _id: "$clusterData._id",
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            username: "$clusterData.username",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
          },
        },
      },
      {
        $sort: { status: 1, name: 1 },
      },
    ]);
    const clusterLead = await clusterLeadModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!clusterLead || clusterLead.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Lead not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster Lead get successfully.",
      data: clusterLead,
    };
  }

  async getclusterLeadDetailService(req, cluster_lead_id) {
    // const { _id } = req.query;
    const clusterLeadDetail = await clusterLeadModel
      .findOne(
        {
          $and: [{ _id: cluster_lead_id }, { cluster_head_id: req.user._id }],
        },
        {
          cluster_head_id: 1,
          // manager_id: 1,
          emp_id: 1,
          unique_id: 1,
          name: 1,
          username: 1,
          email: 1,
          designation: 1,
          mobile: 1,
          country_code: 1,
          profile_pic: 1,
          secret_key: 1,
          status: 1,
          delete: 1,
        }
      )
      .populate("cluster_head_id", "emp_id name username email designation");
    // .populate("manager_id", "emp_id name username email designation")
    // return

    if (!clusterLeadDetail || clusterLeadDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Lead detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster Lead detail get successfully.",
      data: clusterLeadDetail,
    };
  }

  async updateclusterLeadService(req) {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const user = await clusterLeadModel.findOne({
        _id: body.cluster_lead_id,
      });
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead not found",
          data: user,
        };
      }
      const userLogins = await loginsModel.findOne({
        user_id: body.cluster_lead_id,
      });
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead credintials not found",
          data: userLogins,
        };
      }

      let userEmail;
      if (body?.email !== user.email) {
        userEmail = await clusterLeadModel.findOne(
          { email: body.email },
          { name: 1, email: 1, designation: 1 }
        );
      }
      if (userEmail) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead email already exist.",
          data: userEmail,
        };
      }

      const updateclusterLead = {};

      body?.name ? (updateclusterLead["name"] = body.name) : "";
      body?.email ? (updateclusterLead["email"] = body.email) : "";
      body?.designation
        ? (updateclusterLead["designation"] = body.designation)
        : "";
      body?.mobile ? (updateclusterLead["mobile"] = body.mobile) : "";
      body?.country_code
        ? (updateclusterLead["country_code"] = body.country_code)
        : "";
      req.file ? (updateclusterLead["profile_pic"] = req.file.path) : "";

      const clusterLead = await clusterLeadModel.updateOne(
        { _id: body.cluster_lead_id },
        updateclusterLead
      );

      const updateclusterLeadCredential = {
        // username: body?.username ? body?.username : userLogins.username,
        // email: body?.email ? body?.email : userLogins?.email,
      };
      body.name ? (userLogins.name = body.name) : "";
      body.email ? (userLogins.email = body.email) : "";
      body.password ? (userLogins.password = body.password) : "";

      const clusterLeadCred = await userLogins.save();
      // await loginsModel.updateOne(
      //   { user_id: body._id },
      //   updateclusterLeadCredential
      // );

      return {
        status: 200,
        success: true,
        msg: "Cluster Lead details updated successfully.",
        data: { clusterLead },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Cluster Lead service.",
        data: error,
      };
    }
  }

  async clusterLeadStatusChangeService(req) {
    try {
      const { cluster_lead_id, status } = req.body;
      const isBDclusterLead = await isBDclusterLeadService(cluster_lead_id);

      // if (!bdDetail || bdDetail.length === 0) {
      // if (isBDclusterLead.success && isBDclusterLead.data.length > 0) {
      if (isBDclusterLead.success && status == 3) {
        return {
          status: 400,
          success: false,
          msg: `Cluster Lead can't be deleted. BDE's assigned to this Cluster Lead.`,
          data: isBDclusterLead.data,
        };
      }
      // }
      // const { _id } = req.query;
      const checkclusterLead =
        await clusterLeadInstance.getclusterLeadDetailService(
          req,
          cluster_lead_id
        );
      // console.log(checkclusterLead, "checkclusterLead");
      if (!checkclusterLead?.success) {
        return {
          status: 200,
          success: false,
          msg: "Cluster Lead not found.",
          data: "",
        };
      }

      const updateStatus = await clusterLeadModel.updateOne(
        {
          _id: checkclusterLead?.data._id,
        },
        {
          status: status,
        }
      );
      const clusterLeadStatus =
        status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete";
      return {
        status: 200,
        success: true,
        msg: `Cluster Lead ${clusterLeadStatus}d successfully.`,
        data: updateStatus,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        success: false,
        msg: error, //`Something went wrong when update Cluster Lead status.`,
        data: error,
      };
    }
  }

  //Other API's.
  async getDropdownclusterLeadsService(req) {
    const clusterLeads = await clusterLeadModel
      .find({
        $and: [
          { cluster_head_id: req.user._id },
          { status: "1" },
          // { manager_id: req.body.manager_id }
        ],
      })
      .select({ _id: 1, emp_id: 1, name: 1, email: 1, designation: 1 });

    const dropdown = await clusterLeadTargetModel.aggregate([
      {
        $match: {
          $and: [
            { cluster_head_id: req.user._id },
            // { status: "1" },
            // { manager_id: req.body.manager_id }
          ],
        },
      },
      {
        $lookup: {
          from: "cluster_leads",
          localField: "cluster_lead_id",
          foreignField: "_id",
          as: "clusterLeadData",
        },
      },
      {
        $unwind: {
          path: "$clusterLeadData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$clusterLeadData._id",
          name: { $first: "$clusterLeadData.name" },
          designation: { $first: "$clusterLeadData.designation" },
          emp_id: { $first: "$clusterLeadData.emp_id" },
          email: { $first: "$clusterLeadData.email" },
          // cluster_lead_id: { $first: "$clusterLeadData.cluster_lead_id" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          emp_id: 1,
          email: 1,
          designation: 1,
        },
      },
    ]);

    const concatArray = await dropdown.concat(clusterLeads)
    const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.name)
    return {
      status: 200,
      success: true,
      msg: "Cluster Leads get successfully.",
      data: finalResult,
    };
  }

  async getDropdownBDEsService(req) {
    const { selectedCL } = req.body;
    let filterBDE = [];
    selectedCL && selectedCL.length > 0
      ? selectedCL.forEach((cl) => {
        filterBDE.push({ cluster_lead_id: new mongoose.Types.ObjectId(cl) });
      })
      : filterBDE.push({ cluster_head_id: req.user._id });

    const BDEs = await bdModel
      .find({
        $or: filterBDE,
        status: "1",
      })
      .select({ _id: 1, emp_id: 1, name: 1, email: 1, designation: 1, cluster_lead_id: 1 });

    const dropdown = await bdTargetModel.aggregate([
      {
        $match: {
          $or: filterBDE,
        },
      },
      {
        $lookup: {
          from: "businesses",
          localField: "bd_id",
          foreignField: "_id",
          as: "bdData",
        },
      },
      {
        $unwind: {
          path: "$bdData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$bdData._id",
          name: { $first: "$bdData.name" },
          emp_id: { $first: "$bdData.emp_id" },
          email: { $first: "$bdData.email" },
          designation: { $first: "$bdData.designation" },
          cluster_lead_id: { $first: "$cluster_lead_id" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          emp_id: 1,
          designation: 1,
          cluster_lead_id: 1,
        },
      },
    ]);

    const concatArray = await dropdown.concat(BDEs)
    const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.name)
    return {
      status: 200,
      success: true,
      msg: "BDEs Dropdown list get successfully.",
      data: finalResult,
    };
  }

  async checkclusterLeadTargets(cluster_lead_id, year, month) {
    try {
      const checkclusterLeadTarget = await clusterLeadTargetModel.find({
        $and: [
          { _id: cluster_lead_id },
          { target_month: month },
          { target_year: year },
        ],
      });

      if (!checkclusterLeadTarget) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead target not found for this month.",
          data: checkclusterLeadTarget,
        };
      }

      return {
        status: 200,
        success: true,
        msg: "Cluster Lead target get successfully.",
        data: checkclusterLeadTarget,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something want's wrong when check assign target's to the Cluster Lead.",
        data: "",
      };
    }
  }
}
const clusterLeadInstance = new ClusterLeadService();
module.exports = new ClusterLeadService();
