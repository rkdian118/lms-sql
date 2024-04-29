const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const {
  getDashboardService,
  getDashFollowupLeadsService,
  getLeadDetailsService,
  getCallDetailService,
  getRfpDetailService,
  getBDTargetService,
  getLeadTypeData,
  getLeadTypeGraphData,
  updateFollowupDateService,
  dashCallLeadsService,
  dashRfpLeadsService,
} = require("../../service/BDService/bdDashService");

class BdDashController {
  async getDashboard(req, res, next) {
    try {
      const result = await getDashboardService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting dashboard data."
    }
  }
  async getDashboardGraph(req, res, next) {
    try {
      const result = await getLeadTypeGraphData(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting dashboard data."
    }
  }

  async getDashFollowupLeads(req, res, next) {
    try {
      const result = await getDashFollowupLeadsService(req);
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

  async updateFollowupDate(req, res, next) {
    try {
      const result = await updateFollowupDateService(req);
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

  async getDashCallLeads(req, res, next) {
    try {
      const result = await dashCallLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting dashboard call status leads."
    }
  }

  async getDashRfpLeads(req, res, next) {
    try {
      const result = await dashRfpLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting dashboard rfp status leads."
    }
  }

  async getLeadDetails(req, res, next) {
    try {
      const result = await getLeadDetailsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead Details."
    }
  }

  async getCallDetails(req, res, next) {
    try {
      const result = await getCallDetailService(req);
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

  async getRfpDetail(req, res, next) {
    try {
      const result = await getRfpDetailService(req);
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

module.exports = new BdDashController();
