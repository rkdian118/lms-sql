const mongoose = require("mongoose");
const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const managerModel = require("../../model/ManagerModel/managerModel");
const loginsModel = require("../../model/loginsModel");
const moment = require("moment");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");

class ClusterBDService {
  async createBDService(req) {
    try {
      const body = req.body;
      const profilePic = req.file;
      const bd = await bdModel.findOne({ email: body.email });
      if (bd) {
        return {
          status: 400,
          success: false,
          msg: "BDE email already exist.",
          data: "",
        };
      }
      const logins = await loginsModel.findOne({ username: body.username });
      if (logins) {
        return {
          status: 400,
          success: false,
          msg: "BDE username already exist.",
          data: "",
        };
      }

      const clusterLead = await clusterLeadModel.findOne({
        _id: body.cluster_lead_id,
      });
      if (!clusterLead) {
        return {
          status: 400,
          success: false,
          msg: "Cluster lead not found.",
          data: clusterLead,
        };
      }
      const uniqueId = await helperFunctions.uniqueKey();
      const secret_key = await helperFunctions.generateSecretKey();

      const formData = bdModel({
        cluster_head_id: req.decoded._id,
        // manager_id: clusterLead.manager_id,
        cluster_lead_id: body.cluster_lead_id,
        emp_id: body.emp_id,
        unique_id: uniqueId,
        username: body.username,
        name: body.name,
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
            msg: "BDE created successfully.",
            data: data,
          };
        })
        .catch((err) => {
          return {
            status: 500,
            success: false,
            msg: "Something want wrong when create BDE.",
            data: err,
          };
        });
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong",
        data: error,
      };
    }
  }

  async createBDCredentialService(req, bd) {
    try {
      const body = req.body;
      const loginData = loginsModel({
        user_id: bd._id,
        unique_id: bd.unique_id,
        name: bd.name,
        email: bd.email,
        username: body.username,
        password: body.password,
        role_type: "Business",
        secret_key: bd.secret_key,
      });
      return await loginData
        .save()
        .then(async (result) => {
          return {
            status: 201,
            success: true,
            msg: "BDE Credential created successfully.",
            data: { user: bd, role_type: result.role_type },
          };
        })
        .catch(async (err) => {
          const deleteBD = await bdModel.deleteOne({ _id: bd._id });
          return {
            status: 500,
            success: false,
            msg: "Something want wrong when save BDE credential.",
            data: err,
          };
        });
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Something went wrong when create BDE credentials",
        data: error,
      };
    }
  }

  async isBDclusterLeadService(cluster_lead_id) {
    // const { cluster_lead_id } = req.query;
    const bdDetail = await bdModel.find(
      { cluster_lead_id: cluster_lead_id },
      {
        cluster_head_id: 1,
        manager_id: 1,
        cluster_lead_id: 1,
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
      }
    );
    //   .populate("admin_id", "emp_id name email designation");

    // return

    if (!bdDetail || bdDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "BDE detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "BDE detail get successfully.",
      data: bdDetail,
    };
  }

  async getBDsService(req) {
    const { page, limit, search, cluster_lead_id } = req.query; // manager_id
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };
    // Create an empty match query
    const matchQuery = {};
    let userFilter = [];

    req?.user?._id ? userFilter.push({ cluster_head_id: req.user._id }) : "";
    // manager_id ? userFilter.push({ manager_id: new mongoose.Types.ObjectId(manager_id) }) : "";
    cluster_lead_id
      ? userFilter.push({
        cluster_lead_id: new mongoose.Types.ObjectId(cluster_lead_id),
      })
      : "";
    // If the search parameter is provided, add filters for client_name and client_email
    if (search) {
      matchQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const resultAggregate = bdModel.aggregate([
      // {
      //   $match: {
      //     cluster_head_id: req.user._id,
      //   },
      // },
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
        $sort: { "clusterData.name": 1 }, // Corrected sorting syntax
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
          cluster_head: {
            _id: "$clusterData._id",
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
          },
          cluster_lead: {
            _id: "$clusterLeadData._id",
            emp_id: "$clusterLeadData.emp_id",
            name: "$clusterLeadData.name",
            email: "$clusterLeadData.email",
            designation: "$clusterLeadData.designation",
          },
        },
      },
      {
        $sort: { status: 1, name: 1 },
      },
    ]);
    const bd = await bdModel.aggregatePaginate(resultAggregate, options);
    if (!bd || bd.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "BDEs not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "BDEs get successfully.",
      data: bd,
    };
  }

  async getbdDetailService(req, bd_id) {
    // const { _id } = req.query;
    const bdDetail = await bdModel
      .findOne(
        { $and: [{ _id: bd_id }, { cluster_head_id: req.user._id }] },
        {
          //   cluster_head_id: 1,
          // cluster_lead_id: 1,
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
      .populate("cluster_lead_id", "emp_id name email designation")
      // .populate("manager_id", "emp_id name email designation");
      .populate("cluster_head_id", "emp_id name email designation");
    // return

    if (!bdDetail || bdDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "BDE detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "BDE detail get successfully.",
      data: bdDetail,
    };
  }

  async updateBDService(req) {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const user = await bdModel.findOne({ _id: body._id });
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "BDE not found",
          data: user,
        };
      }
      const userLogins = await loginsModel.findOne({ user_id: body._id });
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "BDE credintials not found",
          data: userLogins,
        };
      }

      let userEmail;
      if (body?.email !== user.email) {
        userEmail = await bdModel.findOne(
          { email: body.email },
          { name: 1, email: 1, designation: 1 }
        );
      }
      if (userEmail) {
        return {
          status: 400,
          success: false,
          msg: "BDE email already exist.",
          data: userEmail,
        };
      }

      const updateBD = {};

      body?.name && body?.name !== "" ? (updateBD["name"] = body.name) : "";
      body?.email && body?.email !== "" ? (updateBD["email"] = body.email) : "";
      body?.designation && body?.designation !== ""
        ? (updateBD["designation"] = body.designation)
        : "";
      body?.mobile && body?.mobile !== ""
        ? (updateBD["mobile"] = body.mobile)
        : "";
      body?.country_code && body?.country_code !== ""
        ? (updateBD["country_code"] = body.country_code)
        : "";
      // body?.manager_id && body?.manager_id !== "" ? (updateBD["manager_id"] = body.manager_id) : (updateBD["$unset"] = { manager_id: 1 });
      body?.cluster_lead_id && body?.cluster_lead_id !== ""
        ? (updateBD["cluster_lead_id"] = body.cluster_lead_id)
        : (updateBD["$unset"] = { cluster_lead_id: 1 });
      req.file ? (updateBD["profile_pic"] = req.file.path) : "";

      if (body?.cluster_lead_id && body?.cluster_lead_id !== "") {
        await bdTargetModel.findOneAndUpdate(
          {
            bd_id: new mongoose.Types.ObjectId(body._id),
            target_month: moment().format("MMMM"),
            target_year: moment().format("YYYY"),
          },
          { $set: { cluster_lead_id: body.cluster_lead_id } }
        );

        const bdTargetsNew = await bdTargetModel.aggregate([
          {
            $match: {
              target_year: moment().format("YYYY"),
              cluster_head_id: new mongoose.Types.ObjectId(req.user._id),
            },
          },
          {
            $group: {
              _id: {
                target_month: "$target_month",
                cluster_lead_id: "$cluster_lead_id",
              },
              target_year: { $first: "$target_year" },
              completed_target: { $sum: "$completed_target" },
              confirm_business: { $sum: "$confirm_business" },
              remaining_target: { $sum: "$remaining_target" },
              targets: { $sum: "$targets" },
              total_target: { $sum: "$total_target" },
              prev_month_target: { $sum: "$prev_month_target" },
            },
          },
          {
            $project: {
              cluster_lead_id: "$_id.cluster_lead_id",
              _id: 0,
              completed_target: 1,
              confirm_business: 1,
              remaining_target: 1,
              target_month: "$_id.target_month",
              target_year: 1,
              targets: 1,
              total_target: 1,
              prev_month_target: 1,
            },
          },
        ]);

        for (let i = 0; i < bdTargetsNew.length; i++) {
          const element = bdTargetsNew[i];
          // console.log("====================================");
          // console.log(element, "element");
          // console.log("====================================");
          const newww = await clusterLeadTargetModel.findOneAndUpdate(
            {
              cluster_lead_id: new mongoose.Types.ObjectId(
                element.cluster_lead_id
              ),
              target_month: element.target_month,
              target_year: element.target_year,
            },
            {
              completed_target: element.completed_target,
              remaining_target: element.remaining_target,
              confirm_business: element.confirm_business,
              targets: element.targets,
              total_target: element.total_target,
              prev_month_target: element.prev_month_target,
            }
          );
          // console.log("====================================");
          // console.log(newww, "newww");
          // console.log("====================================");
          // return;
        }

        const clTargetsNew = await clusterLeadTargetModel.aggregate([
          {
            $match: {
              target_year: moment().format("YYYY"),
              cluster_head_id: new mongoose.Types.ObjectId(req.user._id),
            },
          },
          {
            $group: {
              _id: {
                target_month: "$target_month",
              },
              target_year: { $first: "$target_year" },
              cluster_head_id: { $first: "$cluster_head_id" },
              completed_target: { $sum: "$completed_target" },
              confirm_business: { $sum: "$confirm_business" },
              remaining_target: { $sum: "$remaining_target" },
              targets: { $sum: "$targets" },
              total_target: { $sum: "$total_target" },
              prev_month_target: { $sum: "$prev_month_target" },
            },
          },
          {
            $project: {
              cluster_head_id: 1,
              _id: 0,
              completed_target: 1,
              remaining_target: 1,
              confirm_business: 1,
              target_month: "$_id.target_month",
              target_year: 1,
              targets: 1,
              total_target: 1,
              prev_month_target: 1,
            },
          },
        ]);

        for (let j = 0; j < clTargetsNew.length; j++) {
          const element = clTargetsNew[j];
          await branchTargetModel.findOneAndUpdate(
            {
              cluster_head_id: new mongoose.Types.ObjectId(
                element.cluster_head_id
              ),
              target_month: element.target_month,
              target_year: element.target_year,
            },
            {
              completed_target: element.completed_target,
              remaining_target: element.remaining_target,
              confirm_business: element.confirm_business,
              targets: element.targets,
              total_target: element.total_target,
              prev_month_target: element.prev_month_target,
            }
          );
        }
      }
      const bd = await bdModel.updateOne({ _id: body._id }, updateBD);

      const updateBDCredential = {
        // username: body?.username ? body?.username : userLogins.username,
        // email: body?.email ? body?.email : userLogins?.email,
      };
      body.name && body.name !== "" ? (userLogins.name = body.name) : "";
      body.email && body.email !== "" ? (userLogins.email = body.email) : "";
      body.password && body.password !== ""
        ? (userLogins.password = body.password)
        : "";

      const BDCred = await userLogins.save();
      // await loginsModel.updateOne(
      //   { user_id: body._id },
      //   updateBDCredential
      // );

      return {
        status: 200,
        success: true,
        msg: "BDE details updated successfully.",
        data: { bd },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update BDE service.",
        data: error,
      };
    }
  }

  async bdStatusChangeService(req) {
    try {
      const { bd_id, status } = req.body;

      const checkbd = await clusterBDInstance.getbdDetailService(req, bd_id);
      if (!checkbd.success) {
        return {
          status: 200,
          success: false,
          msg: "BDE not found.",
          data: "",
        };
      }

      if (checkbd?.data?.cluster_lead_id && status == 3) {
        return {
          status: 400,
          success: false,
          msg: `BDE can't be deleted. BDE assigned to Cluster Lead.`,
          data: checkbd.data.manager_id,
        };
      }

      const updateStatus = await bdModel.updateOne(
        {
          _id: checkbd.data._id,
        },
        {
          status: status,
        }
      );
      let bdStatus =
        status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete";
      return {
        status: 200,
        success: true,
        msg: `BDE ${bdStatus}d successfully.`,
        data: updateStatus,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //`Something went wrong when ${bdStatus} BDE.`,
        data: error,
      };
    }
  }

  /// Another apis
  async isClusterLeadManagerService(manager_id) {
    // const { manager_id } = req.query;
    const bdDetail = await clusterLeadModel.find(
      { manager_id: manager_id },
      {
        cluster_head_id: 1,
        manager_id: 1,
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
      }
    );
    //   .populate("admin_id", "emp_id name email designation");

    // return

    if (!bdDetail || bdDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "BDE detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "BDE detail get successfully.",
      data: bdDetail,
    };
  }

  async isBDclusterLeadService(cluster_lead_id) {
    // const { cluster_lead_id } = req.query;
    const bdDetail = await bdModel.find(
      { cluster_lead_id: cluster_lead_id },
      {
        cluster_head_id: 1,
        manager_id: 1,
        cluster_lead_id: 1,
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
      }
    );
    //   .populate("admin_id", "emp_id name email designation");

    // return

    if (!bdDetail || bdDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "BDE detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "BDE detail get successfully.",
      data: bdDetail,
    };
  }
}

const clusterBDInstance = new ClusterBDService();

module.exports = new ClusterBDService();
