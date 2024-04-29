const { SuccessHandler } = require("../../middleware/resHandler");
const {
  clusterGetLeadCallTypeService,
  clusterGetLeadCallStatusService,
  clusterGetLeadCallsService,
  clusterUpdateCallService,
  clusterGetCallActivityService,
  clusterUpdateCallActivityService,
  clusterAddCommentCallActivityService,
} = require("../../service/ClusterService/cluBDCallsService");
const ErrorHandler = require("../../Utils/errorHandler");

class ClusterBdCallController {
  async clusterGetLeadCallType(req, res, next) {
    try {
      const result = await clusterGetLeadCallTypeService(req);
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

  async clusterGetLeadCallStatus(req, res, next) {
    try {
      const result = await clusterGetLeadCallStatusService(req);
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

  async clusterGetLeadCalls(req, res, next) {
    try {
      const result = await clusterGetLeadCallsService(req);
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

  async clusterUpdateCall(req, res, next) {
    try {
      const lead = await clusterUpdateCallService(req);
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

  async clusterGetCallActivity(req, res, next) {
    try {
      const result = await clusterGetCallActivityService(req);
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

  async clusterUpdateCallActivity(req, res, next) {
    try {
      const lead = await clusterUpdateCallActivityService(req);
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

  async clusterAddCommentCallActivity(req, res, next) {
    try {
      const lead = await clusterAddCommentCallActivityService(req);
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

module.exports = new ClusterBdCallController();
