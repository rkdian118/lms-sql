const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { clGetLeadsService, clGetDropdownLeadsService, clUpdateLeadService, clUpdateLeadStatusService, clUpdateLeadActivityService, clGetLeadActivityService, clAddCommentLeadActivityService, clGetLeadResponseService, clGetLeadFollowupCallService, clGetAllLeadActivitiesService } = require("../../service/clusterLeadService/clBDLeadsService");
class ClBDELeadsController {
  async clGetLeads(req, res, next) {
    try {
      const result = await clGetLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when CL get BD Leads."
    }
  }
  
  async clUpdateLead(req, res, next) {
    try {
      const lead = await clUpdateLeadService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when CL update lead."
    }
  }

  async clUpdateLeadStatus(req, res, next) {
    try {
      const lead = await clUpdateLeadStatusService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when CL update lead status."
    }
  }

  async clGetDropdownLeads(req, res, next) {
    try {
      const result = await clGetDropdownLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when CL get dropdown Leads."
    }
  }

  async clGetLeadActivity(req, res, next) {
    try {
      const result = await clGetLeadActivityService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when CL get Leads activity."
    }
  }

  async clGetAllLeadActivities(req, res, next) {
    try {
      const result = await clGetAllLeadActivitiesService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when CL get Leads activity."
    }
  }

  async clUpdateLeadActivity(req, res, next) {
    try {
      const lead = await clUpdateLeadActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when CL update lead activity."
    }
  }

  async clAddCommentLeadActivity(req, res, next) {
    try {
      const lead = await clAddCommentLeadActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when Cl add comment."
    }
  }

  async clGetLeadResponse(req, res, next) {
    try {
      const result = await clGetLeadResponseService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when add leads followup call."
    }
  }

  async clGetLeadFollowupCall(req, res, next) {
    try {
      const result = await clGetLeadFollowupCallService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when add leads followup call."
    }
  }


}

module.exports = new ClBDELeadsController();


