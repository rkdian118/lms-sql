const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const managerModel = require("../../model/ManagerModel/managerModel");
const managerTargetModel = require("../../model/ManagerModel/managerTargetModel");
const loginsModel = require("../../model/loginsModel");
const { isClusterLeadManagerService } = require("./clusterBDService");


class ClusterManagerService {

  async createManagerService(req) {
    try {
      const body = req.body;
      if (!req.file) {
        return next(new ErrorHandler("Profile picture not found.", 400, {}));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": "Profile picture not found.", "succeeded": false, "ResponseBody": {} })
      }
      const profilePic = req.file;
      const manager = await managerModel.findOne({ email: body.email });
      if (manager) {
        return { status: 400, success: false, msg: "Team Lead email already exist.", data: "" };
      }
      const logins = await loginsModel.findOne({ username: body.username });
      if (logins) {
        return { status: 400, success: false, msg: "Team Lead username already exist.", data: "" };
      }
      const uniqueId = await helperFunctions.uniqueKey();
      const secret_key = await helperFunctions.generateSecretKey();

      const formData = managerModel({
        cluster_head_id: req.decoded._id,
        emp_id: body.emp_id,
        unique_id: uniqueId,
        name: body.name,
        username: body.username,
        email: body.email,
        designation: body.designation,
        mobile: body.mobile,
        profile_pic: profilePic.path,
        secret_key: secret_key,
      })
      return await formData.save().then((data) => {
        return { status: 201, success: true, msg: "Team Lead create successfully.", data: data };
      }).catch((err) => {
        return { status: 500, success: false, msg: err, data: err };//"Something want wrong when create Team Lead."
      })
    } catch (error) {
      return { status: 400, success: false, msg: error, data: error }; //"Somethin went wrong"
    }
  }

  async createManagerCredentialService(req, manager) {
    try {
      const body = req.body;
      const loginData = loginsModel({
        user_id: manager._id,
        unique_id: manager.unique_id,
        email: manager.email,
        username: body.username,
        password: body.password,
        role_type: "Manager",
        secret_key: manager.secret_key,
      })
      return await loginData.save().then(async (result) => {
        return { status: 201, success: true, msg: "Team Lead Credential created successfully.", data: { user: manager, role_type: result.role_type } };
      }).catch(async (err) => {
        const deleteManager = await managerModel.deleteOne({ _id: manager._id });
        return { status: 500, success: false, msg: err, data: err };//"Something want wrong when create credential."
      })
    } catch (error) {
      return { status: 400, success: false, msg: error, data: error };//"Something went wrong when create Team Lead credentials"
    }
  }

  async getManagersService(req) {
    const { page, limit, search } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const resultAggregate = managerModel.aggregate([
      {
        $match: {
          cluster_head_id: req.user._id,
        },
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
          profile_pic: 1,
          secret_key: 1,
          status: 1,
          deleted: 1,
          assigned_targets: 1,
          cluster_head_id: {
            _id: "$clusterData._id",
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
          },
        },
      },
    ]);
    const manager = await managerModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!manager || manager.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Team Lead not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Team Lead get successfully.",
      data: manager,
    };
  }

  async getManagerDetailService(req, manager_id) {
    // const { _id } = req.query;
    const managerDetail = await managerModel
      .findOne(
        {
          $and: [
            { _id: manager_id },
            { cluster_head_id: req.user._id }
          ]
        },
        {
          cluster_head_id: 1,
          emp_id: 1,
          unique_id: 1,
          name: 1,
          username: 1,
          email: 1,
          designation: 1,
          mobile: 1,
          profile_pic: 1,
          secret_key: 1,
          status: 1,
          delete: 1,
        }
      )
      .populate("cluster_head_id", "emp_id name email designation")
    // return

    if (!managerDetail || managerDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Team Lead detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Team Lead detail get successfully.",
      data: managerDetail,
    };
  }

  async updateManagerService(req) {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const user = await managerModel.findOne({ _id: body._id });
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "Team Lead not found",
          data: user,
        };
      }
      const userLogins = await loginsModel.findOne({ user_id: body._id });
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "Team Lead credintials not found",
          data: userLogins,
        };
      }

      let userEmail;
      if (body?.email !== user.email) {
        userEmail = await managerModel.findOne(
          { email: body.email },
          { name: 1, email: 1, designation: 1 }
        );
      }
      if (userEmail) {
        return {
          status: 400,
          success: false,
          msg: "Team Lead email already exist.",
          data: userEmail,
        };
      }

      const updateManager = {};

      body.name ? (updateManager["name"] = body.name) : "";
      body.email ? (updateManager["email"] = body.email) : "";
      body.designation ? (updateManager["designation"] = body.designation) : "";
      body.mobile ? (updateManager["mobile"] = body.mobile) : "";
      req.file ? (updateManager["profile_pic"] = req.file.path) : "";


      const manager = await managerModel.updateOne(
        { _id: body._id },
        updateManager
      );

      const updateManagerCredential = {
        // username: body?.username ? body?.username : userLogins.username,
        // email: body?.email ? body?.email : userLogins?.email,
      };
      body.email ? (userLogins.email = body.email) : "";
      body.password ? (userLogins.password = body.password) : "";

      const managerCred = await userLogins.save();
      // await loginsModel.updateOne(
      //   { user_id: body._id },
      //   updateManagerCredential
      // );

      return {
        status: 200,
        success: true,
        msg: "Team Lead details updated successfully.",
        data: { manager },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Team Lead service.",
        data: error,
      };
    }
  };

  async managerStatusChangeService(req) {
    try {
      const { manager_id, status } = req.body;
      const isBDManager = await isClusterLeadManagerService(manager_id);

      // if (!bdDetail || bdDetail.length === 0) {
      // if (isBDManager.success && isBDManager.data.length > 0) {
      if (isBDManager.success && status == 3) {
        return {
          status: 400,
          success: false,
          msg: `Team Lead can't be deleted. BDE's assigned to this Team Lead.`,
          data: isBDManager.data,
        };
      }
      // }
      // const { _id } = req.query;
      const checkManager = await this.getManagerDetailService(req, manager_id);
      if (!checkManager.success) {
        return {
          status: 200,
          success: false,
          msg: "Team Lead not found.",
          data: "",
        };
      }


      const updateStatus = await managerModel.updateOne({
        _id: checkManager.data._id,
      }, {
        status: status
      });
      const managerStatus = (status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete");
      return {
        status: 200,
        success: true,
        msg: `Team Lead ${managerStatus}d successfully.`,
        data: updateStatus,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //`Something went wrong when update Team Lead status.`,
        data: error,
      };
    }
  };
  async managerStatusChangeService(req) {
    try {
      const { manager_id, status } = req.body;
      const isBDManager = await isClusterLeadManagerService(manager_id);

      // if (!bdDetail || bdDetail.length === 0) {
      // if (isBDManager.success && isBDManager.data.length > 0) {
      if (isBDManager.success && status == 3) {
        return {
          status: 400,
          success: false,
          msg: `Team Lead can't be deleted. BDE's assigned to this Team Lead.`,
          data: isBDManager.data,
        };
      }
      // }
      // const { _id } = req.query;
      const checkManager = await this.getManagerDetailService(req, manager_id);
      if (!checkManager.success) {
        return {
          status: 200,
          success: false,
          msg: "Team Lead not found.",
          data: "",
        };
      }


      const updateStatus = await managerModel.updateOne({
        _id: checkManager.data._id,
      }, {
        status: status
      });
      const managerStatus = (status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete");
      return {
        status: 200,
        success: true,
        msg: `Team Lead ${managerStatus}d successfully.`,
        data: updateStatus,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //`Something went wrong when update Team Lead status.`,
        data: error,
      };
    }
  };

  async getDropdownCLsService(req) {
    const clusterLeads = await clusterLeadModel
      .find({
        cluster_head_id: req.user._id,
      })
      .select({ _id: 1, emp_id: 1, name: 1, email: 1 });


    if (!clusterLeads || clusterLeads.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Leads not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster Leads get successfully.",
      data: clusterLeads,
    };
  }

  // async getDropdownManagersService(req) {
  //   const managers = await managerModel
  //     .find({
  //       cluster_head_id: req.user._id,
  //     })
  //     .select({ _id: 1, emp_id: 1, name: 1, email: 1 });


  //   if (!managers || managers.length === 0) {
  //     return {
  //       status: 400,
  //       success: false,
  //       msg: "Team Leads not found.",
  //       data: "",
  //     };
  //   }
  //   return {
  //     status: 200,
  //     success: true,
  //     msg: "Team Leads get successfully.",
  //     data: managers,
  //   };
  // }

  // async checkManagerTargets(manager_id, year, month) {
  //   try {

  //     const checkManagerTarget = await managerTargetModel.find({
  //       $and: [
  //         { _id: manager_id },
  //         { target_month: month },
  //         { target_year: year }
  //       ]
  //     })

  //     if (!checkManagerTarget) {
  //       return { status: 400, success: false, msg: "Team Lead target not found for this month.", data: checkManagerTarget };
  //     }

  //     return { status: 200, success: true, msg: "Team Lead target get successfully.", data: checkManagerTarget };

  //   } catch (error) {
  //     return {
  //       status: 500,
  //       success: false,
  //       msg: "Something want's wrong when check assign target's to the Team Lead.",
  //       data: "",
  //     };

  //   }
  // };
}

module.exports = new ClusterManagerService()