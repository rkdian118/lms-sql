const ErrorHandler = require("../../Utils/errorHandler");
const userLogsModel = require("../../model/AdminModel/userLogsModel");
const masterStatusModel = require("../../model/CommonModel/masterStatusModel");
class CommonService {

  addMasterStatusService = async (req) => {
    try {
      const body = req.body;
      const masterStatus = await masterStatusModel.find({
        $and: [
          { status_type: body.status_type },
          { status_name: body.status_name },
        ],
      });
      if (masterStatus && masterStatus.length > 0) {
        return {
          status: 400,
          success: false,
          msg: "Master Status already exist.",
          data: "",
        };
      }

      const lastUser = await masterStatusModel.findOne(
        {},
        {},
        { sort: { status_code: -1 } }
      );
      let lastMasterStatus = 0;
      if (lastUser) {
        lastMasterStatus = parseInt(lastUser.status_code);
      }
      const nextMasterStatus = lastMasterStatus + 1;

      const formData = masterStatusModel({
        admin_id: req.decoded._id,
        status_code: nextMasterStatus,
        status_type: body.status_type,
        status_name: body.status_name,
        status_color: body.status_color,
      });
      return await formData
        .save()
        .then((masterData) => {
          return {
            status: 201,
            success: true,
            msg: "Master Status added successfully.",
            data: masterData,
          };
        })
        .catch((err) => {
          return {
            status: 500,
            success: false,
            msg: "Something want wrong when create Master Status.",
            data: err,
          };
        });
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Somethin went wrong",
        data: error,
      };
    }
  };

  updateMasterStatusService = async (req) => {
    try {
      const body = req.body;
      const masterStatus = await masterStatusModel.findOne({
        _id: body.master_status_id,
      });
      if (!masterStatus) {
        return {
          status: 400,
          success: false,
          msg: "Master Status not found",
          data: masterStatus,
        };
      }

      let masterStatusName;
      if (body?.status_name !== masterStatus.status_name) {
        masterStatusName = await masterStatusModel.findOne(
          {
            $and: [
              { status_type: masterStatus.status_type },
              { status_name: body.status_name },
            ],
          },
          { admin_id: 1, status_type: 1, status_name: 1 }
        );
      }
      if (masterStatusName) {
        return {
          status: 400,
          success: false,
          msg: "Master Status name already exist.",
          data: masterStatusName,
        };
      }
      // const updatemasterStatus = {};
      // body?.status_name ? updatemasterStatus['status_name'] = body.status_name : "";
      // const master_status = await masterStatusModel.updateOne({ _id: body.master_status_id }, updatemasterStatus);
      masterStatus.status_name = body.status_name;
      masterStatus.status_color = body.status_color;
      let master_status = await masterStatus.save();

      return {
        status: 200,
        success: true,
        msg: "Master Status updated successfully.",
        data: master_status,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Somethin went wrong when update Master Status service",
        data: error,
      };
    }
  };

  createUserLogsService = async (req, res, message, status, data) => {
    try {
      const logsData = {};
      req?.user?._id ? (logsData["user_id"] = req?.user?._id) : "";
      req?.decoded?.role_type
        ? (logsData["role_type"] = req?.decoded?.role_type)
        : "";
      req?.headers?.host ? (logsData["req_host"] = req?.headers?.host) : "";
      req?.originalUrl ? (logsData["req_url"] = req?.originalUrl) : "";
      req?.ip ? (logsData["req_ip"] = req?.ip) : "";
      req?.method ? (logsData["req_method"] = req?.method) : "";
      status ? (logsData["res_status"] = status) : "";
      message ? (logsData["res_msg"] = message) : "";
      data ? (logsData["res_data"] = data) : "";

      const logs = await userLogsModel(logsData).save();
      return true;
    } catch (error) {
      // res.status(500).json({ "ResponseCode": 500, "ResponseMessage": "Something want wrong when create logs.", "succeeded": false, "ResponseData": error?.message });
      // return next(new ErrorHandler("Something want wrong when create logs.", 500, error));
      return false;
    }
  };

  getUserLogsService = async (req) => {
    const { page, limit } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const resultAggregate = userLogsModel.aggregate([
      {
        $project: {
          user_id: 1,
          role_type: 1,
          req_url: 1,
          req_type: 1,
          req_ip: 1,
          req_method: 1,
          res_status: 1,
          res_msg: 1,
          res_data: 1,
          status: 1,
          deleted: 1,
        },
      },
    ]);
    // return
    const userLogs = await userLogsModel.aggregatePaginate(
      resultAggregate,
      options
    );

    if (!userLogs || userLogs.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "User Logs not found.",
        data: [],
      };
    }
    return {
      status: 200,
      success: true,
      msg: "User Logs get successfully.",
      data: userLogs,
    };
  };
}

module.exports = new CommonService();
