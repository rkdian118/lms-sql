const { SuccessHandler } = require("../../middleware/resHandler");
const {
  addRFPService,
  getRFPService,
  getRFPActivitiesService,
  addCommentRFPActivityService,
  getLeadRFPStatusService,
  getLeadRFPTypeService,
  updateRFPActivityService,
  updateRFPService,
  getRfpMomService,
  updateRfpStatusService,
  getAllRFPCountsService,
  updateRFPProposalValueService,
} = require("../../service/BDService/bdRFPService");
const ErrorHandler = require("../../Utils/errorHandler");

class BdRfpController {
  async getLeadRFPType(req, res, next) {
    try {
      const result = await getLeadRFPTypeService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead RFP Type."
    }
  }

  async getLeadRFPStatus(req, res, next) {
    try {
      const result = await getLeadRFPStatusService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead RFP Status."
    }
  }

  async addRFP(req, res, next) {
    try {
      const result = await addRFPService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when add RFP."
    }
  }

  async updateRFP(req, res, next) {
    try {
      const result = await updateRFPService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when update RFP."
    }
  }

  async updateRFPProposalValue(req, res, next) {
    try {
      const result = await updateRFPProposalValueService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when update RFP."
    }
  }

  async updateRfpStatus(req, res, next) {
    try {
      const rfp = await updateRfpStatusService(req);
      const { success, msg, status, data } = rfp;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); // "Something want wrong when update RFP Status."
    }
  }

  async getRfp(req, res, next) {
    try {
      const result = await getRFPService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting request for proposal."
    }
  }

//   async getRfpMom(req, res, next) {
//     try {
//       const result = await getRfpMomService(req);
//       const { success, msg, status, data } = result;
//       if (success) {
//         SuccessHandler(req, res, msg, status, data);
//       } else {
//         next(new ErrorHandler(msg, status, data));
//       }
//     } catch (error) {
//       next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting rfp mom."
//     }
//   }

  async getRFPActivities(req, res, next) {
    try {
      const result = await getRFPActivitiesService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting RFP Activities."
    }
  }

  async updateRfpActivity(req, res, next) {
    try {
      const lead = await updateRFPActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when Update Call Activity."
    }
  }

  async addCommentRFPActivity(req, res, next) {
    try {
      const lead = await addCommentRFPActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something want wrong when update lead."
    }
  }
}

module.exports = new BdRfpController();
