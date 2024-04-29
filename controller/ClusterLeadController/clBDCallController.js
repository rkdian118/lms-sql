const { SuccessHandler } = require("../../middleware/resHandler");
const { addCallService, getLeadCallsService, getCallActivityService, updateCallActivityService, addCommentCallActivityService, getLeadCallStatusService, getLeadCallTypeService, updateCallService } = require("../../service/BDService/bdCallService");
const { clGetLeadCallTypeService, clGetLeadCallStatusService, clAddCallService, clGetLeadCallsService, clUpdateCallService, clGetCallActivityService, clUpdateCallActivityService, clAddCommentCallActivityService } = require("../../service/clusterLeadService/clBDCallService");
const ErrorHandler = require("../../Utils/errorHandler");

class CLBdCallController {

  async clGetLeadCallType(req, res, next) {
    try {
      const result = await clGetLeadCallTypeService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting Lead Call Type."
    }
  }

  async clGetLeadCallStatus(req, res, next) {
    try {
      const result = await clGetLeadCallStatusService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));// "Something went wrong when getting Lead Call Status."
    }
  }

  async clAddCall(req, res, next) {
    try {
      const result = await clAddCallService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when adding Call."
    }
  }

  async clGetLeadCalls(req, res, next) {
    try {
      const result = await clGetLeadCallsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when CL get lead calls."
    }
  }

  async clUpdateCall(req, res, next) {
    try {
      const lead = await clUpdateCallService(req);
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

  async clGetCallActivity(req, res, next) {
    try {
      const result = await clGetCallActivityService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when CL get call activity."
    }
  }

  async clUpdateCallActivity(req, res, next) {
    try {
      const lead = await clUpdateCallActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when CL Update Call Activity."
    }
  }

  async clAddCommentCallActivity(req, res, next) {
    try {
      const lead = await clAddCommentCallActivityService(req);
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
}

module.exports = new CLBdCallController();