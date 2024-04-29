const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { getManagersTargetService, getManagerTargetDetailService, updateManagerTargetService, getBDsTargetsService } = require("../../service/ClusterService/clusManTargService");
const { getBDTargetDetailService, getBDsTargetService, updateBDTargetService, assignBDTargetService, manCompBDTargetService } = require("../../service/ManagerService/manBDTargService");
const { manGetCLsTargetService, manGetCLTargetDetailService, manUpdateCLTargetService, manCompCLTargetService } = require("../../service/ManagerService/manCLTargService");

class ManCLTargtController {


  async manGetCLsTarget(req, res, next) {
    try {
      const result = await manGetCLsTargetService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when get cluster lead target targets.",
          500,
          error
        )
      );
    }
  }

  async manGetCLTargetDetail(req, res, next) {
    try {
      const { cl_id, target_id } = req.body;
      const result = await manGetCLTargetDetailService(req, cl_id, target_id);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting cluster lead target detail.",
          500,
          error
        )
      );
    }
  }

  async manUpdateCLTarget(req, res, next) {
    try {
      const cluster = await manUpdateCLTargetService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when update cluster lead targets."
    }
  }

  async manCompCLTarget(req, res, next) {
    try {
      const cluster = await manCompCLTargetService(req);
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

  async assignBDTarget(req, res, next) {
    try {
      const result = await assignBDTargetService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting Lead Type.",
          500,
          error
        )
      );
    }
  }


  async getBDsTargets(req, res, next) {
    try {
      const result = await getBDsTargetsService(req);
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

}
module.exports = new ManCLTargtController()