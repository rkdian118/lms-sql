const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { getManagersTargetService, getManagerTargetDetailService, updateManagerTargetService, getBDsTargetsService } = require("../../service/ClusterService/clusManTargService");
const { getBDTargetDetailService, getBDsTargetService, updateBDTargetService, assignBDTargetService, manCompBDTargetService } = require("../../service/ManagerService/manBDTargService");
const { clGetBDsTargetService, clGetBDTargetDetailService, clUpdateBDTargetService, BDTargetDropdownService } = require("../../service/clusterLeadService/clBDTargService");

class CLBDTargtController {


  async clGetBDsTarget(req, res, next) {
    try {
      const result = await clGetBDsTargetService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when get manager targets.",
          500,
          error
        )
      );
    }
  }

  async clGetBDTargetDetail(req, res, next) {
    try {
      const { bd_id, target_id } = req.body;
      const result = await clGetBDTargetDetailService(req, bd_id, target_id);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting manager detail.",
          500,
          error
        )
      );
    }
  }

  async clUpdateBDTarget(req, res, next) {
    try {
      const cluster = await clUpdateBDTargetService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when update manager targets."
    }
  }
  
  async BDTargetDropdown(req, res, next) {
    try {
      const cluster = await BDTargetDropdownService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when update manager targets."
    }
  }

  // async clManCompBDTarget(req, res, next) {
  //   try {
  //     const cluster = await manCompBDTargetService(req);
  //     const { success, msg, status, data } = cluster;
  //     if (success) {
  //       SuccessHandler(req, res, msg, status, data);
  //     } else {
  //       next(new ErrorHandler(msg, status, data));
  //     }
  //   } catch (error) {
  //     next(new ErrorHandler("Something want wrong when update manager targets.", 500, error));
  //   }
  // }

  // async clAssignBDTarget(req, res, next) {
  //   try {
  //     const result = await assignBDTargetService(req);
  //     const { success, msg, status, data } = result;
  //     if (success) {
  //       SuccessHandler(req, res, msg, status, data);
  //     } else {
  //       next(new ErrorHandler(msg, status, data));
  //     }
  //   } catch (error) {
  //     next(
  //       new ErrorHandler(
  //         "Something went wrong when getting Lead Type.",
  //         500,
  //         error
  //       )
  //     );
  //   }
  // }

}
module.exports = new CLBDTargtController()