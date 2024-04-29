const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const {
  adminGetLeadCallTypeService,
  adminGetLeadCallStatusService,
  adminGetLeadCallsService,
  adminUpdateCallService,
  adminGetCallActivityService,
  adminUpdateCallActivityService,
  adminAddCommentCallActivityService,
} = require("../../service/AdminService/adminBDCallsService.js");

class AdminBdCallController {

  async adminGetLeadCalls(req, res, next) {
    try {
      const result = await adminGetLeadCallsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when CL get lead calls."
    }
  }

  async adminUpdateCall(req, res, next) {
    try {
      const lead = await adminUpdateCallService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update lead call."
    }
  }

  async adminGetCallActivity(req, res, next) {
    try {
      const result = await adminGetCallActivityService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when CL get call activity."
    }
  }

  async adminUpdateCallActivity(req, res, next) {
    try {
      const lead = await adminUpdateCallActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when CL Update Call Activity."
    }
  }

  async adminAddCommentCallActivity(req, res, next) {
    try {
      const lead = await adminAddCommentCallActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update lead."
    }
  }







  /////////////////ClusterBDCallController/////////////////
  async adminGetLeadCallType(req, res, next) {
    try {
      const result = await adminGetLeadCallTypeService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead Call Type."
    }
  }

  async adminGetLeadCallStatus(req, res, next) {
    try {
      const result = await adminGetLeadCallStatusService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); // "Something went wrong when getting Lead Call Status."
    }
  }
}

module.exports = new AdminBdCallController();
