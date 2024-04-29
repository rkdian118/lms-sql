const { SuccessHandler } = require("../../middleware/resHandler");
const {
  getBDDSRReportService,
  getClusterDSRReportService,
  getCLDSRReportService,
  getLeadDataBankService,
  addBDsTargetService,
} = require("../../service/ClusterService/clusterDSRService");
const ErrorHandler = require("../../Utils/errorHandler");

class ClBdDSRController {
  async getBDDSRReport(req, res, next) {
    try {
      const result = await getBDDSRReportService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting BDE DSR report.",
          500,
          error
        )
      );
    }
  }

  async getCLDSRReport(req, res, next) {
    try {
      const result = await getCLDSRReportService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting BDE DSR report Detail.",
          500,
          error
        )
      );
    }
  }

  async getClusterDSRReport(req, res, next) {
    try {
      const result = await getClusterDSRReportService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting BDE DSR report Detail.",
          500,
          error
        )
      );
    }
  }
  
  async getLeadDataBank(req, res, next) {
    try {
      const result = await getLeadDataBankService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting BDE DSR report Detail.",
          500,
          error
        )
      );
    }
  }
  
  async addBDsTarget(req, res, next) {
    try {
      const result = await addBDsTargetService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting BDE DSR report Detail.",
          500,
          error
        )
      );
    }
  }
}

module.exports = new ClBdDSRController();
