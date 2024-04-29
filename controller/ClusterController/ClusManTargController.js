const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { getManagersTargetService, getManagerTargetDetailService, updateManagerTargetService, getBDsTargetsService, assignManagerTargetService, updateBDTargetService, clusCompBDTargetService } = require("../../service/ClusterService/clusManTargService");

class ClusManTargtController {

  async assignManagerTarget(req, res, next) {
    try {
      let { manager_id, newTarg = 0, currTarg = 0 } = req.body;
      let cluster_head_id = req.user._id;
      const result = await assignManagerTargetService(req);
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

  async getManagersTarget(req, res, next) {
    try {
      const result = await getManagersTargetService(req);
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

  async getManagerTargetDetail(req, res, next) {
    try {
      const { manager_id, target_id } = req.body;
      const result = await getManagerTargetDetailService(req, manager_id, target_id);
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

  async updateManagerTarget(req, res, next) {
    try {
      const cluster = await updateManagerTargetService(req);
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

  async updateBDTarget(req, res, next) {
    try {
      const cluster = await updateBDTargetService(req);
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

  async clusCompBDTarget(req, res, next) {
    try {
      const cluster = await clusCompBDTargetService(req);
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

}
module.exports = new ClusManTargtController()