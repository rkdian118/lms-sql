const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { clGetDashboardService, clGetDashFollowupLeadsService, clGetDashCallLeadsService, clGetDashRfpLeadsService, clGetLeadDetailsService, clGetCallDetailService, clGetRfpDetailService, clGetLeadTypeGraphData, clUpdateFollowupDateService, clDashCallLeadsService, clDashRfpLeadsService } = require("../../service/clusterLeadService/clBDDashService");

class CLBdDashController {
  async clGetDashboard(req, res, next) {
    try {
      const result = await clGetDashboardService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting dashboard data."
    }
  }  
  async clGetLeadTypeGraph(req, res, next) {
    try {
      const result = await clGetLeadTypeGraphData(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting dashboard data."
    }
  }

  // async clGetBDTargets(req, res, next) {
  //   try {
  //     const result = await clGetLeadTypeData(req);
  //     const { success, msg, status, data } = result;
  //     if (success) {
  //       SuccessHandler(req, res, msg, status, data);
  //     } else {
  //       next(new ErrorHandler(msg, status, data));
  //     }
  //   } catch (error) {
  //     next(new ErrorHandler("Something went wrong when getting dashboard bd targets data.", 500, error));
  //   }
  // }

  async clGetDashFollowupLeads(req, res, next) {
    try {
      const result = await clGetDashFollowupLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting dashboard followup leads."
    }
  }

  async clUpdateFollowupDate(req, res, next) {
    try {
      const result = await clUpdateFollowupDateService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting dashboard followup leads."
    }
  }

  async clGetDashCallLeads(req, res, next) {
    try {
      const result = await clDashCallLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting dashboard call status leads."
    }
  }

  async clGetDashRfpLeads(req, res, next) {
    try {
      const result = await clDashRfpLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting dashboard rfp status leads."
    }
  }

  async clGetLeadDetails(req, res, next) {
    try {
      const result = await clGetLeadDetailsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting Lead Details."
    }
  }

  async clGetCallDetails(req, res, next) {
    try {
      const result = await clGetCallDetailService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting Call Details."
    }
  }

  async clGetRfpDetail(req, res, next) {
    try {
      const result = await clGetRfpDetailService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Call Details."
    }
  }
}

module.exports = new CLBdDashController();