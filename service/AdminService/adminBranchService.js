const { default: mongoose } = require("mongoose");
const branchModel = require("../../model/AdminModel/branchModel");

class AdminBranchService {

  createBranchService = async (req) => {
    try {
      const body = req.body;
      const branch = await branchModel.findOne({
        branch_name: body.branch_name,
      });
      if (branch) {
        return {
          status: 400,
          success: false,
          msg: "branch already exist.",
          data: "",
        };
      }

      const formData = branchModel({
        admin_id: req.decoded._id,
        branch_name: body.branch_name,
        country: body.country,
        state: body.state,
        city: body.city,
        address: body.address,
        pincode: body.pincode,
      });
      return await formData
        .save()
        .then((branch) => {
          return {
            status: 201,
            success: true,
            msg: "Branch create successfully.",
            data: branch,
          };
        })
        .catch((err) => {
          return {
            status: 500,
            success: false,
            msg: "Something want wrong when create branch.",
            data: err,
          };
        });
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong",
        data: error,
      };
    }
  };

  async getBranchesService(req) {
    const { page, limit, search } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const resultAggregate = branchModel.aggregate([
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
          from: "clusters",
          localField: "cluster_id",
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
        $match: {
          // ...filtertarget,
          $or: [
            { "clusterData.name": { $regex: search ? search : "", $options: 'i' } }, // Case-insensitive search for branch_name
            { "clusterData.email": { $regex: search ? search : "", $options: 'i' } }, // Case-insensitive search for branch_name
            { "adminData.name": { $regex: search ? search : "", $options: 'i' } }, // Case-insensitive search for branch_name
            { "adminData.email": { $regex: search ? search : "", $options: 'i' } }, // Case-insensitive search for branch_name
            { branch_name: { $regex: search ? search : "", $options: 'i' } }, // Case-insensitive search for branch_name
            { city: { $regex: search ? search : "", $options: 'i' } }, // Case-insensitive search for branch_name
          ],
        },
      },
      {
        $project: {
          branch_name: 1,
          country: 1,
          state: 1,
          city: 1,
          address: 1,
          pincode: 1,
          status: 1,
          deleted: 1,
          cluster_id: {
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
          },
          // clusterData:1,
          admin_id: {
            emp_id: "$adminData.emp_id",
            name: "$adminData.name",
            email: "$adminData.email",
          },
        },
      },
    ]);
    const branch = await branchModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!branch || branch.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Branches not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Branches get successfully.",
      data: branch,
    };
  }

  async getBranchDetailService(branch_id) {
    // const { branch_id } = req.query;
    const branchDetail = await branchModel
      .findOne(
        { _id: branch_id },
        {
          admin_id: 1,
          cluster_id: 1,
          branch_name: 1,
          country: 1,
          state: 1,
          city: 1,
          address: 1,
          pincode: 1,
          status:1
        }
      )
      // .populate("admin_id", "emp_id name email designation")
      // .populate("cluster_id", "emp_id name email designation");
    // return

    if (!branchDetail || branchDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Branch detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Branch detail get successfully.",
      data: branchDetail,
    };
  }

  updateBranchService = async (req) => {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const branchCheck = await branchModel.findOne({ _id: body.branch_id });
      if (!branchCheck) {
        return {
          status: 400,
          success: false,
          msg: "Branch not found",
          data: branchCheck,
        };
      }

      let branchName;
      if (body?.branch_name !== branchCheck.branch_name) {
        branchName = await branchModel.findOne(
          { branch_name: body.branch_name },
          { cluster_id:1, branch_name: 1, country: 1, state:1, city:1, address:1 }
        );
      }
      if (branchName) {
        return {
          status: 400,
          success: false,
          msg: "Branch name already exist.",
          data: branchName,
        };
      }


      const updateBranch = {
        // branch_name: body?.branch_name ? body?.branch_name : branch.branch_name,
        // address: body?.address ? body?.address : branch?.address,
        // pincode: body?.pincode ? body?.pincode : branch?.pincode,
      };

      body?.branch_name ? updateBranch['branch_name'] = body.branch_name : "";
      body?.address ? updateBranch['address'] = body.address : "";
      body?.pincode ? updateBranch['pincode'] = body.pincode : "";


      const branch = await branchModel.updateOne(
        { _id: body.branch_id },
        updateBranch
      );

      return {
        status: 200,
        success: true,
        msg: "Branch details updated successfully.",
        data: branch,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update branch service",
        data: error,
      };
    }
  };

  async getDropdownBranchesService(req) {
    const branchs = await branchModel
      .find({
        // admin_id: req.user._id,
        $or: [
          { cluster_id: null },
          { cluster_id: { $exists: false } },
          { cluster_id: new mongoose.Types.ObjectId() },
        ],
        $or: [
          { status: 0 },
          { status: 2 },
        ],
        // status: 0
      })
      .select({ _id: 0, branch_name: 1, cluster_id: 1, branch_id: "$_id" });
    // .populate("admin_id", "emp_id name email")
    // .populate("cluster_id", "emp_id name email designation")


    if (!branchs || branchs.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Branches not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Branches get successfully.",
      data: branchs,
    };
  }

  branchStatusChangeService = async (req) => {
    try {
      const { branch_id, status } = req.body;
      const checkbranch = await this.getBranchDetailService(branch_id);
      if (!checkbranch.success) {
        return {
          status: 200,
          success: false,
          msg: "branch not found.",
          data: "",
        };
      }


      if (checkbranch?.data?.cluster_id && status == 3) {

        return {
          status: 400,
          success: false,
          msg: `Branch can't be deleted. Cluster Head assigned to this Branch.`,
          data: checkbranch.data,
        };
      }

      const updateStatus = await branchModel.updateOne({
        _id: checkbranch.data._id,
      }, {
        status: status
      });
      const branchStatus = status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete";
      return {
        status: 200,
        success: true,
        msg: `Branch ${branchStatus}d successfully.`,
        data: updateStatus,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: `Something went wrong when ${branchStatus} branch.`,
        data: error,
      };
    }
  };

  async checkBranchHeadService(cluster_id) {
    // const { cluster_id } = req.query;
    const branchDetail = await branchModel
      .findOne(
        { cluster_id: cluster_id },
        {
          admin_id: 1,
          branch_name: 1,
          country: 1,
          state: 1,
          city: 1,
          address: 1,
          pincode: 1,
        }
      )
    //   .populate("admin_id", "emp_id name email designation");

    // return

    if (!branchDetail || branchDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Branch detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Branch detail get successfully.",
      data: branchDetail,
    };
  }
}

module.exports = new AdminBranchService();