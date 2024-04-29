const helperFunctions = require("../../helper/helperFun");
const branchModel = require("../../model/AdminModel/branchModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const loginsModel = require("../../model/loginsModel");
const {
  checkBranchHeadService,
  getBranchDetailService,
} = require("./adminBranchService");

class AdminClusterService {
  createClusterHeadService = async (req) => {
    try {
      const body = req.body;
      if (!req.file) {
        return next(new ErrorHandler("Profile picture not found.", 400, {}));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": "Profile picture not found.", "succeeded": false, "ResponseBody": {} })
      }
      const profilePic = req.file;
      const branchStatus = await branchModel
        .findOne({ $and: [{ _id: body.branch_id }, { status: 1 }] })
        .select("branch_name country state address pincode")
        .populate("cluster_id", "emp_id name email designation");
      if (branchStatus) {
        return {
          status: 400,
          success: false,
          msg: "Branch already has a cluster head assigned.",
          data: branchStatus,
        };
      }
      const cluster = await clusterModel
        .findOne({
          $and: [{ email: body.email }, { branch_id: body.branch_id }],
        })
        .select("name email designation")
        .populate("branch_id", "branch_name address ");
      if (cluster) {
        return {
          status: 400,
          success: false,
          msg: "User already exist to this branch.",
          data: cluster,
        };
      }
      const logins = await loginsModel.findOne({ username: body.username });
      if (logins) {
        return {
          status: 400,
          success: false,
          msg: "Cluster username already exist.",
          data: "",
        };
      }
      const uniqueId = await helperFunctions.uniqueKey();
      const secret_key = await helperFunctions.generateSecretKey();

      const formData = clusterModel({
        admin_id: req.decoded._id,
        emp_id: body.emp_id,
        unique_id: uniqueId,
        name: body.name,
        username: body.username,
        email: body.email,
        designation: body.designation,
        mobile: body.mobile,
        branch_id: body.branch_id,
        profile_pic: profilePic.path,
        secret_key: secret_key,
      });
      return await formData
        .save()
        .then(async (data) => {
          const updateBranch = await branchModel.updateOne(
            { _id: data.branch_id },
            { cluster_id: data._id, status: 1 }
          );
          return {
            status: 201,
            success: true,
            msg: "Cluster head create successfully.",
            data: data,
          };
        })
        .catch((err) => {
          return {
            status: 500,
            success: false,
            msg: err, //"Something want wrong when create cluster head..",
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
  };

  createClusterCredentialService = async (req, cluster) => {
    try {
      const body = req.body;
      const loginData = loginsModel({
        user_id: cluster._id,
        unique_id: cluster.unique_id,
        name: cluster.name,
        email: cluster.email,
        username: body.username,
        password: body.password,
        role_type: "Cluster",
        secret_key: cluster.secret_key,
      });
      return await loginData
        .save()
        .then(async (result) => {
          return {
            status: 201,
            success: true,
            msg: "Cluster Credential created successfully.",
            data: { user: cluster, role_type: result.role_type },
          };
        })
        .catch(async (err) => {
          const deleteCluster = await clusterModel.deleteOne({
            _id: cluster._id,
          });
          const updateBranch = await branchModel.updateOne(
            { _id: cluster.branch_id },
            { cluster_id: null, status: 2 }
          );
          return {
            status: 500,
            success: false,
            msg: err, //"Something want wrong when create credential.",
            data: err,
          };
        });
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Something went wrong when create cluster credentials",
        data: error,
      };
    }
  };

  async getClusterHeadsService(req) {
    const { page, limit } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const resultAggregate = clusterModel.aggregate([
      // {
      //   $match: {
      //     admin_id: req.user._id,
      //   },
      // },
      {
        $lookup: {
          from: "admins",
          localField: "admin_id",
          foreignField: "_id",
          as: "adminData",
        },
      },
      {
        $unwind: {
          path: "$adminData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "branches",
          localField: "branch_id",
          foreignField: "_id",
          as: "branchData",
        },
      },
      {
        $unwind: {
          path: "$branchData",
          preserveNullAndEmptyArrays: true,
        },
      },
      // {
      //   $lookup: {
      //     from: "logins",
      //     let: { clusterId: "$email" },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: { $eq: ["$email", "$$clusterId"] }
      //         }
      //       }
      //     ],
      //     as: "userLoginData"
      //   }
      // },
      // {
      //   $lookup: {
      //     from: "logins",
      //     localField: "_id",
      //     foreignField: "user_id",
      //     as: "userLoginData",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$userLoginData",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
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
          status: 1,
          secret_key: 1,
          delete: 1,
          branch_id: {
            _id: "$branchData._id",
            branch_name: "$branchData.branch_name",
            country: "$branchData.country",
            state: "$branchData.state",
            city: "$branchData.city",
          },
          // adminData: 1,
          // userLoginData: 1,
          // clusterData:1,
          admin_id: {
            emp_id: "$adminData.emp_id",
            name: "$adminData.name",
            email: "$adminData.email",
          },
          // _id: 1,  //"$userLoginData"
          // _id: "$userLoginData._id"
          // {
          //   username: "$userLoginData.username",
          //   password: "$userLoginData.password",
          //   emp_id: "$userLoginData.emp_id",
          //   email: "$userLoginData.email",
          // },
        },
      },
    ]);
    // return
    const cluster = await clusterModel.aggregatePaginate(
      resultAggregate,
      options
    );

    if (!cluster || cluster.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Heads not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster heads get successfully.",
      data: cluster,
    };
  }

  async getClusterDetailService(cluster_id) {
    // const { _id } = req.query;
    const clusterDetail = await clusterModel
      .findOne(
        { _id: cluster_id },
        {
          admin_id: 1,
          emp_id: 1,
          unique_id: 1,
          name: 1,
          username: 1,
          email: 1,
          designation: 1,
          mobile: 1,
          profile_pic: 1,
          branch_id: 1,
          secret_key: 1,
          status: 1,
          delete: 1,
        }
      )
      .populate("admin_id", "emp_id name email designation")
      .populate("branch_id", "branch_name country state city address pincode");
    // return

    if (!clusterDetail || clusterDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster detail get successfully.",
      data: clusterDetail,
    };
  }

  updateClusterService = async (req) => {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const user = await clusterModel.findOne({ _id: body._id });
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "Cluster not found",
          data: user,
        };
      }
      const userLogins = await loginsModel.findOne({ user_id: body._id });
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "Cluster credintials not found",
          data: userLogins,
        };
      }

      let userEmail;
      if (body?.email !== user.email) {
        userEmail = await clusterModel.findOne(
          { email: body.email },
          { name: 1, email: 1, designation: 1 }
        );
      }
      if (userEmail) {
        return {
          status: 400,
          success: false,
          msg: "Cluster email already exist.",
          data: userEmail,
        };
      }

      const updateCluster = {
        name: body?.name ? body?.name : user.name,
        email: body?.email ? body?.email : user?.email,
        designation: body?.designation ? body?.designation : user?.designation,
        mobile: body?.mobile ? body?.mobile : user?.mobile,
        // profile_pic: profilePic?.path ? profilePic?.path : body.profilePic,
      };
      req.file ? (updateCluster["profile_pic"] = req.file.path) : "";


      const cluster = await clusterModel.updateOne(
        { _id: body._id },
        updateCluster
      );

      body.name && body.name !== "" ? (userLogins.name = body.name) : "";
      body.email && body.email !== "" ? (userLogins.email = body.email) : "";
      body.password && body.password !== "" ? (userLogins.password = body.password) : "";

      const clusterCred = await userLogins.save();

      return {
        status: 200,
        success: true,
        msg: "Cluster details updated successfully.",
        data: { cluster, clusterCred },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong",
        data: error,
      };
    }
  };

  // updateClusterCredentialService = async (req, cluster) => {
  //   try {
  //     const body = req.body;
  //     const loginData = loginsModel({
  //       user_id: cluster._id,
  //       unique_id: cluster.unique_id,
  //       email: cluster.email,
  //       username: body.username,
  //       password: body.password,
  //       role_type: "Cluster",
  //       secret_key: cluster.secret_key,
  //     });
  //     return await loginData
  //       .save()
  //       .then(async (result) => {
  //         return {
  //           status: 201,
  //           success: true,
  //           msg: "Cluster Credential created successfully.",
  //           data: { user: cluster, role_type: result.role_type },
  //         };
  //       })
  //       .catch(async (err) => {
  //         const deleteCluster = await clusterModel.deleteOne({
  //           _id: cluster._id,
  //         });
  //         const updateBranch = await branchModel.updateOne(
  //           { _id: cluster.branch_id },
  //           { cluster_id: null, status: 2 }
  //         );
  //         return {
  //           status: 500,
  //           success: false,
  //           msg: "Something want wrong when create credential.",
  //           data: err,
  //         };
  //       });
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       success: false,
  //       msg: "Something went wrong when create cluster credentials",
  //       data: error,
  //     };
  //   }
  // };

  clusterStatusChangeService = async (req) => {
    try {
      const { cluster_id, status } = req.body;
      const checkBranchHead = await checkBranchHeadService(cluster_id);
      if (checkBranchHead.success && status == 3) {
        return {
          status: 400,
          success: false,
          msg: `Cluster head can't be deleted, cluster head assigned to the ${checkBranchHead.data.branch_name} branch.`,
          data: checkBranchHead.data,
        };
      }
      // const { _id } = req.query;
      const checkCluster = await this.getClusterDetailService(cluster_id);
      if (!checkCluster.success) {
        return {
          status: 200,
          success: false,
          msg: "Cluster not found.",
          data: "",
        };
      }


      const updateStatus = await clusterModel.updateOne({
        _id: checkCluster.data._id,
      }, {
        status: status
      });
      const clusterStatus = status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete";
      return {
        status: 200,
        success: true,
        msg: `Cluster ${clusterStatus}d successfully.`,
        data: updateStatus,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: `Something went wrong when ${clusterStatus} cluster.`,
        data: error,
      };
    }
  };

  updateClusterBranchService = async (req) => {
    try {
      const {
        cluster_id,
        current_branch_id = "",
        new_branch_id = "",
      } = req.body;


      const clusterDetail = await this.getClusterDetailService(cluster_id);
      if (!clusterDetail.success) {
        return clusterDetail;
      }

      if (clusterDetail.data.status == 2) {
        return {
          status: 400,
          success: false,
          msg: "Unable to update branch to cluster. cluster is not active.",
          data: clusterDetail.data,
        };
      }

      if (clusterDetail.data.status == 3) {
        return {
          status: 400,
          success: false,
          msg: "Unable to update branch to cluster. cluster is deleted.",
          data: clusterDetail.data,
        };
      }

      let currBranchDetail;
      if (current_branch_id) {
        currBranchDetail = await getBranchDetailService(current_branch_id);
        if (!currBranchDetail.success) {
          return currBranchDetail;
        }
      }

      let newBranchDetail;
      if (new_branch_id) {
        newBranchDetail = await getBranchDetailService(new_branch_id);
        if (!newBranchDetail.success) {
          return newBranchDetail;
        }
      }
      let reassignCluster;
      let reassignBranch;
      let deleteBranch;

      if (
        cluster_id !== "" &&
        current_branch_id !== "" &&
        new_branch_id !== ""
      ) {
        reassignCluster = await clusterModel.updateOne(
          { _id: cluster_id },
          { branch_id: new_branch_id }
        );

        deleteBranch = await branchModel.updateOne(
          { _id: current_branch_id },
          { $unset: { cluster_id: 1 }, status: 2 }
        );
        
        reassignBranch = await branchModel.updateOne(
          { _id: new_branch_id },
          { cluster_id: cluster_id, status: 1 }
        );
        
      } else if (
        cluster_id !== "" &&
        current_branch_id == "" &&
        new_branch_id !== ""
      ) {
        reassignCluster = await clusterModel.updateOne(
          { _id: cluster_id },
          { branch_id: new_branch_id }
        );
        
        reassignBranch = await branchModel.updateOne(
          { _id: new_branch_id },
          { cluster_id: cluster_id, status: 1 }
        );
      } else if (
        cluster_id !== "" &&
        current_branch_id !== "" &&
        new_branch_id == ""
      ) {
        reassignCluster = await clusterModel.updateOne(
          { _id: cluster_id },
          { $unset: { branch_id: 1 } }
        );
        
        reassignBranch = await branchModel.updateOne(
          { _id: current_branch_id },
          { $unset: { cluster_id: 1 }, status: 2 }
        );
      }
      return {
        status: 200,
        success: true,
        msg: "Cluster head branch updated successfully.",
        data: {reassignCluster, reassignBranch, deleteBranch},
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when update cluster head branch.",
        data: error,
      };
    }
  };
}

module.exports = new AdminClusterService();
