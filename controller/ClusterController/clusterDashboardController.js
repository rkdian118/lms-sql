const { SuccessHandler } = require("../../middleware/resHandler");
const {
  getClusterTargetGraph,
  getClusterCardsData,
  getCLAndBDEPerformers,
  getClusterDashBoardDSR,
} = require("../../service/ClusterService/clusterDashService");
const ErrorHandler = require("../../Utils/errorHandler");

class BhBdRfpController {
  async getClusterTargetGraphControllers(req, res, next) {
    try {
      const result = await getClusterTargetGraph(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));
    }
  }

  async getClusterCardsDataController(req, res, next) {
    try {
      const result = await getClusterCardsData(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));
    }
  }

  async getCLAndBDEPerformersController(req, res, next) {
    try {
      const result = await getCLAndBDEPerformers(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));
    }
  }

  async getClusterDashBoardDSRController(req, res, next) {
    try {
      const result = await getClusterDashBoardDSR(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));
    }
  }
}

module.exports = new BhBdRfpController();
