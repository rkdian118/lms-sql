const { SuccessHandler } = require("../../middleware/resHandler");
const {
  addLeadService,
  getLeadsService,
  updateLeadService,
  getLeadFollowUpStatusService,
  updateLeadActivityService,
  addCommentLeadActivityService,
  getLeadActivityService,
  getAllActivitiesService,
  getDropdownLeadsService,
  getMasterStatusService,
  updateLeadStatusService,
  getDashboardService,
  getAllLeadCountsService,
  addLeadFollowupCallService,
  getLeadFollowupCallService,
  addLeadResponseService,
  getLeadResponseService,
  uploadLeadService,
  uploadLeadUpdateService,
  createManualDsrService,
  updateFollowupDatesService,
  getAllLeadActivitiesService,
  updateProjectionStatusService,
} = require("../../service/BDService/bdService"); // , addCallService, addRFPService, getRFPService, addProposalService, getProposalService,
const ErrorHandler = require("../../Utils/errorHandler");

class BusinessController {
  async getMasterStatus(req, res, next) {
    try {
      const result = await getMasterStatusService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something went wrong when adding Lead."
      );
    }
  }

  // async getDashboard(req, res, next) {
  //   try {
  //       const result = await getDashboardService(req);
  //       const { success, msg, status, data } = result;
  //       if (success) {
  //           SuccessHandler(req, res, msg, status, data);
  //       } else {
  //           next(new ErrorHandler(msg, status, data));
  //       }
  //   } catch (error) {
  //       next(new ErrorHandler("Something went wrong when getting dashboard data.", 500, error));
  //   }
  // }

  // async getDashFollowupLeads(req, res, next) {
  //   try {
  //       const result = await getDashFollowupLeadsService(req);
  //       const { success, msg, status, data } = result;
  //       if (success) {
  //           SuccessHandler(req, res, msg, status, data);
  //       } else {
  //           next(new ErrorHandler(msg, status, data));
  //       }
  //   } catch (error) {
  //       next(new ErrorHandler("Something went wrong when getting dashboard followup leads.", 500, error));
  //   }
  // }

  async addLead(req, res, next) {
    try {
      const result = await addLeadService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something went wrong when adding Lead."
      );
    }
  }

  async updateLead(req, res, next) {
    try {
      const lead = await updateLeadService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }

  async updateLeadStatus(req, res, next) {
    try {
      const lead = await updateLeadStatusService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }

  async updateProjectionStatus(req, res, next) {
    try {
      const lead = await updateProjectionStatusService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }

  async getLeadFollowUpStatus(req, res, next) {
    try {
      const result = await getLeadFollowUpStatusService(req);
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

  async getAllActivities(req, res, next) {
    try {
      const result = await getAllActivitiesService(req);
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

  async getAllLeadCounts(req, res, next) {
    try {
      const result = await getAllLeadCountsService(req);
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

  async updateLeadActivity(req, res, next) {
    try {
      const lead = await updateLeadActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }

  async addCommentLeadActivity(req, res, next) {
    try {
      const lead = await addCommentLeadActivityService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }

  async getLeadActivity(req, res, next) {
    try {
      const result = await getLeadActivityService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something went wrong when getting Lead.."
      );
    }
  }

  async getAllLeadActivities(req, res, next) {
    try {
      const result = await getAllLeadActivitiesService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something went wrong when getting Lead.."
      );
    }
  }

  async getLeads(req, res, next) {
    try {
      const result = await getLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something went wrong when getting Leads."
      );
    }
  }

  async getDropdownLeads(req, res, next) {
    try {
      const result = await getDropdownLeadsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting dropdown Leads.",
          500,
          error
        )
      );
    }
  }

  async addLeadFollowupCall(req, res, next) {
    try {
      const result = await addLeadFollowupCallService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when add leads followup call.",
          500,
          error
        )
      );
    }
  }

  async getLeadFollowupCall(req, res, next) {
    try {
      const result = await getLeadFollowupCallService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when add leads followup call.",
          500,
          error
        )
      );
    }
  }

  async addLeadResponse(req, res, next) {
    try {
      const result = await addLeadResponseService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when add leads response.",
          500,
          error
        )
      );
    }
  }

  async getLeadResponse(req, res, next) {
    try {
      const result = await getLeadResponseService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when add leads followup call.",
          500,
          error
        )
      );
    }
  }

  // async addCall(req, res, next) {
  //     try {
  //         const result = await addCallService(req);
  //         const { success, msg, status, data } = result;
  //         if (success) {
  //             SuccessHandler(req, res, msg, status, data);
  //         } else {
  //             next(new ErrorHandler(msg, status, data));
  //         }
  //     } catch (error) {
  //         next(new ErrorHandler("Something went wrong when adding Call.", 500, error));
  //     }
  // }

  // async addRFP(req, res, next) {
  //     try {
  //         const result = await addRFPService(req);
  //         const { success, msg, status, data } = result;
  //         if (success) {
  //             SuccessHandler(req, res, msg, status, data);
  //         } else {
  //             next(new ErrorHandler(msg, status, data));
  //         }
  //     } catch (error) {
  //         next(new ErrorHandler("Something went wrong when adding Call.", 500, error));
  //     }
  // }

  // async getRfp(req, res, next) {
  //     try {
  //         const result = await getRFPService(req);
  //         const { success, msg, status, data } = result;
  //         if (success) {
  //             SuccessHandler(req, res, msg, status, data);
  //         } else {
  //             next(new ErrorHandler(msg, status, data));
  //         }
  //     } catch (error) {
  //         next(new ErrorHandler("Something went wrong when getting request for proposal.", 500, error));
  //     }
  // }

  // async addProposal(req, res, next) {
  //     try {
  //         const result = await addProposalService(req);
  //         const { success, msg, status, data } = result;
  //         if (success) {
  //             SuccessHandler(req, res, msg, status, data);
  //         } else {
  //             next(new ErrorHandler(msg, status, data));
  //         }
  //     } catch (error) {
  //         next(new ErrorHandler("Something went wrong when adding Call.", 500, error));
  //     }
  // }

  // async getProposal(req, res, next) {
  //     try {
  //         const result = await getProposalService(req);
  //         const { success, msg, status, data } = result;
  //         if (success) {
  //             SuccessHandler(req, res, msg, status, data);
  //         } else {
  //             next(new ErrorHandler(msg, status, data));
  //         }
  //     } catch (error) {
  //         next(new ErrorHandler("Something went wrong when getting proposal.", 500, error));
  //     }
  // }

  async updateFollowupDates(req, res, next) {
    try {
      const lead = await updateFollowupDatesService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }

  async uploadLead(req, res, next) {
    try {
      const lead = await uploadLeadService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }

  async createManualDsr(req, res, next) {
    try {
      const lead = await createManualDsrService(req);
      const { success, msg, status, data } = lead;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when update lead."
      );
    }
  }
}

module.exports = new BusinessController();

// const ErrorHandler = require("../../Utils/errorHandler");
// const { SuccessHandler } = require("../../middleware/resHandler");
// const { addLeadService, getLeadsService, addCallService } = require("../../service/BDService/bdService");

// class BusinessController {

//     addLead= async (req, res, next) => {
//         return await Promise.resolve(addLeadService(req)).then(async (result) => {
//             if (result && result.success) {
//                 SuccessHandler(req, res,  result.msg, result.status, result.data )
//             } else {
//                 return next(new ErrorHandler(result.msg, result.status, result.data));
//             }
//         }).catch((error) => {
//             return next(new ErrorHandler("Something want wrong when add Lead.", 500, error));
//         })
//     }

//     getLeads= async (req, res, next) => {
//         return await Promise.resolve(getLeadsService(req)).then(async (result) => {
//             if (result && result.success) {
//                 SuccessHandler(req, res,  result.msg, result.status, result.data )
//             } else {
//                 return next(new ErrorHandler(result.msg, result.status, result.data));
//             }
//         }).catch((error) => {
//             return next(new ErrorHandler("Something want wrong when get Lead Type.", 500, error));
//         })
//     }

//     addCall = async (req, res, next) => {
//         return await Promise.resolve(addCallService(req)).then(async (result) => {
//             if (result && result.success) {
//                 SuccessHandler(req, res,  result.msg, result.status, result.data )
//             } else {
//                 return next(new ErrorHandler(result.msg, result.status, result.data));
//             }
//         }).catch((error) => {
//             return next(new ErrorHandler("Something want wrong when Add Call .", 500, error));
//         })
//     }

// }

// module.exports = new BusinessController()
