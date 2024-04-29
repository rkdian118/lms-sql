const { SuccessHandler } = require("../../middleware/resHandler");
const {
  getBDDSRReportService,
  getBDDSRReportDetailsService,
  updateBDDSRReportService,
  getCLDSRReportService,
} = require("../../service/clusterLeadService/clBDDSRService");
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

  async getBDDSRReportDetails(req, res, next) {
    try {
      const result = await getBDDSRReportDetailsService(req);
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
}

module.exports = new ClBdDSRController();
