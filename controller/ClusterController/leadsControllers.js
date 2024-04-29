const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const {
  getLeadsService,
  getLeads,
  updateLeadService,
  updateLeadStatusService,
  getDropdownLeadsService,
  getClusterLeadsDropdownService,
  getBDsDropdownService,
  getLeadActivityService,
  updateLeadActivityService,
  addCommentLeadActivityService,
  getLeadResponseService,
  getLeadFollowupCallService,
  getDuplicateLeadsService,
  deleteDuplicateLeadsService,
  getAllLeadActivitiesService,
  transferLeadstoAnotherBDE,
  getTransferLeadsService,
} = require("../../service/ClusterService/leadsServices");

class LeadsControllers {
  async getLeadsControllers(req, res, next) {
    try {
      const result = await getLeads(req);//getLeadsService
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

  async getDuplicateLeadsControllers(req, res, next) {
    try {
      const result = await getDuplicateLeadsService(req);
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

  async deleteDuplicateLeadsControllers(req, res, next) {
    try {
      const result = await deleteDuplicateLeadsService(req);
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

  async updateLeadsControllers(req, res, next) {
    try {
      const result = await updateLeadService(req);
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

  async updateLeadsStatusControllers(req, res, next) {
    try {
      const result = await updateLeadStatusService(req);
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

  async getDropdownLeadsControllers(req, res, next) {
    try {
      const result = await getDropdownLeadsService(req);
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

  async getClusterLeadsDropdownControllers(req, res, next) {
    try {
      const result = await getClusterLeadsDropdownService(req);
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

  async getBDsDropdownControllers(req, res, next) {
    try {
      const result = await getBDsDropdownService(req);
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

  async getLeadActivityControllers(req, res, next) {
    try {
      const result = await getLeadActivityService(req);
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

  async getAllLeadActivitiesControllers(req, res, next) {
    try {
      const result = await getAllLeadActivitiesService(req);
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

  async updateLeadActivityController(req, res, next) {
    try {
      const result = await updateLeadActivityService(req);
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

  async addCommentLeadActivityController(req, res, next) {
    try {
      const result = await addCommentLeadActivityService(req);
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

  async getLeadResponseControllers(req, res, next) {
    try {
      const result = await getLeadResponseService(req);
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

  async getLeadFollowupCallController(req, res, next) {
    try {
      const result = await getLeadFollowupCallService(req);
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

  async transferLeadstoAnotherBDEController(req, res, next) {
    try {
      const result = await transferLeadstoAnotherBDE(req);
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

  async getTransferLeadsController(req, res, next) {
    try {
      const result = await getTransferLeadsService(req);
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
module.exports = new LeadsControllers();
