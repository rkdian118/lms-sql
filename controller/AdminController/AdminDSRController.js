const { SuccessHandler } = require("../../middleware/resHandler");
const {
  adminGetBDDSRReportService,
  adminGetClusterDSRReportService,
  adminGetCLDSRReportService,
  adminGetLeadDataBankService,
  adminAddBDsTargetService,
} = require("../../service/AdminService/adminDSRService.js");
const ErrorHandler = require("../../Utils/errorHandler");

class AdminBdDSRController {
  async adminGetBDDSRReport(req, res, next) {
    try {
      const result = await adminGetBDDSRReportService(req);
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

  async adminGetCLDSRReport(req, res, next) {
    try {
      const result = await adminGetCLDSRReportService(req);
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

  async adminGetClusterDSRReport(req, res, next) {
    try {
      const result = await adminGetClusterDSRReportService(req);
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
  
  async adminGetLeadDataBank(req, res, next) {
    try {
      const result = await adminGetLeadDataBankService(req);
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
  
  async adminAddBDsTarget(req, res, next) {
    try {
      const result = await adminAddBDsTargetService(req);
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

module.exports = new AdminBdDSRController();
