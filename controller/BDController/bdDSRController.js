const { SuccessHandler } = require("../../middleware/resHandler");
const {
  generateDSRReportService,
  getDSRReportService,
  getDSRReportDetailsService,
  updateDSRReportService,
} = require("../../service/BDService/bdDSRService");
const ErrorHandler = require("../../Utils/errorHandler");

class BdDSRController {


  async getDSRReport(req, res, next) {
    try {
      const result = await getDSRReportService(req);
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

  async getDSRReportDetails(req, res, next) {
    try {
      const result = await getDSRReportDetailsService(req);
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

  async updateDSRReport(req, res, next) {
    try {
      const result = await updateDSRReportService(req);
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

module.exports = new BdDSRController();
