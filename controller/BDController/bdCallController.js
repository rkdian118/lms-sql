const { SuccessHandler } = require("../../middleware/resHandler");
const { addCallService, getLeadCallsService, getCallActivityService, updateCallActivityService, addCommentCallActivityService, getLeadCallStatusService, getLeadCallTypeService, updateCallService, getAllCallCountsService } = require("../../service/BDService/bdCallService");
const ErrorHandler = require("../../Utils/errorHandler");

class BdCallController {

  async getLeadCallType(req, res, next) {
    try {
        const result = await getLeadCallTypeService(req);
        const { success, msg, status, data } = result;
        if (success) {
            SuccessHandler(req, res, msg, status, data);
        } else {
            next(new ErrorHandler(msg, status, data));
        }
    } catch (error) {
        next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead Call Type."
    }
}

async getLeadCallStatus(req, res, next) {
  try {
      const result = await getLeadCallStatusService(req);
      const { success, msg, status, data } = result;
      if (success) {
          SuccessHandler(req, res, msg, status, data);
      } else {
          next(new ErrorHandler(msg, status, data));
      }
  } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead Call Counts."
  }
}

async getAllCallCounts(req, res, next) {
  try {
      const result = await getAllCallCountsService(req);
      const { success, msg, status, data } = result;
      if (success) {
          SuccessHandler(req, res, msg, status, data);
      } else {
          next(new ErrorHandler(msg, status, data));
      }
  } catch (error) {
      next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead Call Counts."
  }
}

    async addCall(req, res, next) {
        try {
            const result = await addCallService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error)); //"Something went wrong when adding Call."
        }
    }

    async getLeadCalls(req, res, next) {
        try {
            const result = await getLeadCallsService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead Type."
        }
    }

    async updateCall(req, res, next) {
        try {
          const lead = await updateCallService(req);
          const { success, msg, status, data } = lead;
          if (success) {
            SuccessHandler(req, res, msg, status, data);
          } else {
            next(new ErrorHandler(msg, status, data));
          }
        } catch (error) {
          next( new ErrorHandler(error, 500, error) ); //"Something want wrong when update lead call."
        }
      }

    async getCallActivity(req, res, next) {
        try {
            const result = await getCallActivityService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting Lead Type."
        }
    }

    async updateCallActivity(req, res, next) {
        try {
          const lead = await updateCallActivityService(req);
          const { success, msg, status, data } = lead;
          if (success) {
            SuccessHandler(req, res, msg, status, data);
          } else {
            next(new ErrorHandler(msg, status, data));
          }
        } catch (error) {
          next( new ErrorHandler(error, 500, error) ); //"Something want wrong when Update Call Activity."
        }
      }

      async addCommentCallActivity(req, res, next) {
        try {
          const lead = await addCommentCallActivityService(req);
          const { success, msg, status, data } = lead;
          if (success) {
            SuccessHandler(req, res, msg, status, data);
          } else {
            next(new ErrorHandler(msg, status, data));
          }
        } catch (error) {
          next( new ErrorHandler(error, 500, error) ); //"Something want wrong when update lead."
        }
      }
}

module.exports = new BdCallController();