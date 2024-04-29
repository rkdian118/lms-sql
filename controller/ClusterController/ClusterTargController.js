const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
// const { getManagersTargetService, getManagerTargetDetailService, updateManagerTargetService, getBDsTargetsService, assignManagerTargetService, updateBDTargetService, clusCompBDTargetService } = require("../../service/ClusterService/clusManTargService");
const {
  getClusterLeadsTargetService,
  getClusterLeadTargetDetailService,
  updateClusterLeadTargetService,
  getBDsTargetsService,
  chGetBDsTargetsService,
  chUpdateBDTargetService,
  chCompBDTargetService,
  bhGetTargetsService,
  bhAssignOldTargetsService,
  BDTargetDropdownService,
  CLTargetDropdownService,
} = require("../../service/ClusterService/clusterTargService");

class ClusCLTargtController {
  async getClusterLeadsTarget(req, res, next) {
    try {
      const result = await getClusterLeadsTargetService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when get Cluster Lead targets.",
          500,
          error
        )
      );
    }
  }

  async getClusterLeadTargetDetail(req, res, next) {
    try {
      const { cluster_lead_id, target_id } = req.body; //manager_id
      const result = await getClusterLeadTargetDetailService(
        req,
        cluster_lead_id,
        target_id
      );
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

  async updateClusterLeadTarget(req, res, next) {
    try {
      const cluster = await updateClusterLeadTargetService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update cluster lead targets."
    }
  }

  // async assignClusterLeadTarget(req, res, next) {
  //   try {
  //     let { manager_id, newTarg = 0, currTarg = 0 } = req.body;
  //     let cluster_head_id = req.user._id;
  //     const result = await assignClusterLeadTargetService(req);
  //     const { success, msg, status, data } = result;
  //     if (success) {
  //       SuccessHandler(req, res, msg, status, data);
  //     } else {
  //       next(new ErrorHandler(msg, status, data));
  //     }
  //   } catch (error) {
  //     next(
  //       new ErrorHandler(
  //         "Something went wrong when get manager targets.",
  //         500,
  //         error
  //       )
  //     );
  //   }
  // }

  async chGetBDsTargets(req, res, next) {
    try {
      const result = await chGetBDsTargetsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when CH get BDE targets.",
          500,
          error
        )
      );
    }
  }

  async bhGetTargets(req, res, next) {
    try {
      const result = await bhGetTargetsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when CH get BDE targets.",
          500,
          error
        )
      );
    }
  }

  async chUpdateBDTarget(req, res, next) {
    try {
      const cluster = await chUpdateBDTargetService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when CH update BDE targets."
    }
  }

  async chCompBDTarget(req, res, next) {
    try {
      const cluster = await chCompBDTargetService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update BDE targets."
    }
  }

  async bhAssignOldTargets(req, res, next) {
    try {
      const cluster = await bhAssignOldTargetsService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update BDE targets."
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
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update BDE targets."
    }
  }
  async CLTargetDropdown(req, res, next) {
    try {
      const cluster = await CLTargetDropdownService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update BDE targets."
    }
  }
}
module.exports = new ClusCLTargtController();
