const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { adminTargServiceInstance } = require("../../service/AdminService/adminTargService");
// const { startMonthService } = require("../../service/AdminService/adminTargService");
const { getManagersTargetService, getManagerTargetDetailService, updateManagerTargetService, getBDsTargetsService, assignManagerTargetService } = require("../../service/ClusterService/clusManTargService");

class AdminTargController {

  async startMonth(req, res, next) {
    try {
      const result = await adminTargServiceInstance.startMonthService(req);
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

  async adminGetTargets(req, res, next) {
    try {
      const result = await adminTargServiceInstance.adminGetTargetsService(req);
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

  async adminGetBdTargets(req, res, next) {
    try {
      const result = await adminTargServiceInstance.adminGetBdTargetsService(req);
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

  async getBranchTargets(req, res, next) {
    try {
      const result = await adminTargServiceInstance.getBranchTargetsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when get branch targets.",
          500,
          error
        )
      );
    }
  }

  async AdminBDTargetDropdown(req, res, next) {
    try {
      const cluster = await adminTargServiceInstance.AdminBDTargetDropdownService(req);
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
  async AdminCLTargetDropdown(req, res, next) {
    try {
      const cluster = await adminTargServiceInstance.AdminCLTargetDropdownService(req);
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

  async AdminClusterTargetDropdown(req, res, next) {
    try {
      const cluster = await adminTargServiceInstance.AdminClusterTargetDropdownService(req);
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
  async AdminBranchTargetDropdown(req, res, next) {
    try {
      const cluster = await adminTargServiceInstance.AdminBranchTargetDropdownService(req);
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

  async getBranchTargetDetail(req, res, next) {
    try {
      const { branch_id, target_id } = req.query;
      const result = await adminTargServiceInstance.getBranchTargetDetailService(req, branch_id, target_id);
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

  async updateBranchTarget(req, res, next) {
    try {
      const cluster = await adminTargServiceInstance.updateBranchTargetService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update branch targets."
    }
  }

  /// ClusManTargtController Code.

  // async assignManagerTarget(req, res, next) {
  //   try {
  //     let { manager_id, newTarg = 0, currTarg = 0 } = req.body;
  //     let cluster_head_id = req.user._id;
  //     const result = await assignManagerTargetService(req);
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

  //     async managerStatusChange(req, res, next) {
  //       try {
  //         const manager = await managerStatusChangeService(req);
  //         const { success, msg, status,  data } = manager;
  //         if (success) {
  //           SuccessHandler(req, res, msg, status, data);
  //         } else {
  //           next(new ErrorHandler(msg, status, data));
  //         }
  //       } catch (error) {
  //         next(
  //           new ErrorHandler(
  //             "Something want wrong when manager status change.",
  //             500,
  //             error
  //           )
  //         );
  //       }
  //     }

  //     async getDropdownManagers(req, res, next) {
  //       try {
  //         const result = await getDropdownManagersService(req);
  //         const { success, msg, status, data } = result;
  //         if (success) {
  //           SuccessHandler(req, res, msg, status, data);
  //         } else {
  //           next(new ErrorHandler(msg, status, data));
  //         }
  //       } catch (error) {
  //         next(
  //           new ErrorHandler(
  //             "Something went wrong when getting Lead Type.",
  //             500,
  //             error
  //           )
  //         );
  //       }
  //     }

  //     async getBDsTargets(req, res, next) {
  //       try {
  //         const result = await getBDsTargetsService(req);
  //         const { success, msg, status, data } = result;
  //         if (success) {
  //           SuccessHandler(req, res, msg, status, data);
  //         } else {
  //           next(new ErrorHandler(msg, status, data));
  //         }
  //       } catch (error) {
  //         next(
  //           new ErrorHandler(
  //             "Something went wrong when get manager targets.",
  //             500,
  //             error
  //           )
  //         );
  //       }
  //     }

}
module.exports = new AdminTargController()