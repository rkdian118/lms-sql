const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const {
  createClusterHeadService,
  createClusterCredentialService,
  getClusterHeadsService,
  getClusterDetailService,
  updateClusterService,
  deleteClusterService,
  updateClusterBranchService,
  clusterStatusChangeService,
} = require("../../service/AdminService/adminClusterService");

class AdminClusterController {
  async createClusterHead(req, res, next) {
    try {
      const cluster = await createClusterHeadService(req);
      const {
        success: clusterSuccess,
        msg: clusterMsg,
        status: clusterStatus,
        data: clusterData,
      } = cluster;
      if (clusterSuccess) {
        const logins = await createClusterCredentialService(req, clusterData);
        const {
          success: loginSuccess,
          msg: loginMsg,
          status: loginStatus,
          data: loginData,
        } = logins;
        if (loginSuccess) {
          SuccessHandler(req, 
            res,
            "Cluster head created successfully.",
            loginStatus,
            loginData
          );
        } else {
          next(new ErrorHandler(loginMsg, loginStatus, loginData));
        }
      } else {
        next(new ErrorHandler(clusterMsg, clusterStatus, clusterData));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when create cluster head.",
          500,
          error
        )
      );
    }
  }

  async getClusterHeads(req, res, next) {
    try {
      const result = await getClusterHeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting list of cluster heads.",
          500,
          error
        )
      );
    }
  }

  async getClusterDetail(req, res, next) {
    try {
      const { _id } = req.query;
      const result = await getClusterDetailService(_id);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting list of cluster heads.",
          500,
          error
        )
      );
    }
  }

  async updateCluster(req, res, next) {
    try {
      const cluster = await updateClusterService(req);
      const {
        success: clusterSuccess,
        msg: clusterMsg,
        status: clusterStatus,
        data: clusterData,
      } = cluster;
      if (clusterSuccess) {
        SuccessHandler(req, res, clusterMsg, clusterStatus, clusterData);
      } else {
        next(new ErrorHandler(clusterMsg, clusterStatus, clusterData));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when update cluster head.",
          500,
          error
        )
      );
    }
  }

  async clusterStatusChange(req, res, next) {
    try {
      const cluster = await clusterStatusChangeService(req);
      const {
        success: clusterSuccess,
        msg: clusterMsg,
        status: clusterStatus,
        data: clusterData,
      } = cluster;
      if (clusterSuccess) {
        SuccessHandler(req, res, clusterMsg, clusterStatus, clusterData);
      } else {
        next(new ErrorHandler(clusterMsg, clusterStatus, clusterData));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when update cluster head status.",
          500,
          error
        )
      );
    }
  }

  async updateClusterBranch(req, res, next) {
    try {
      const reassignBranch = await updateClusterBranchService(req);
      const { success, msg, status, data } = reassignBranch;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when reassignBranch.",
          500,
          error
        )
      );
    }
  }
}
module.exports = new AdminClusterController();
