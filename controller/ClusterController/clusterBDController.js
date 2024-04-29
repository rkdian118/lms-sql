const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { createBDService, createBDCredentialService, getBDsService, updateBDService, bdStatusChangeService, getbdDetailService } = require("../../service/ClusterService/clusterBDService");

class ClusterBDController {

  async createBD(req, res, next) {
    return await Promise.resolve(createBDService(req)).then(async (bd) => {
      if (bd && bd.success) {
        return await Promise.resolve(createBDCredentialService(req, bd.data)).then((logins) => {
          if (logins && logins.success) {
            SuccessHandler(req, res, "BDE created successfully.", logins.status, logins.data)
            // res.json({ "ResponseCode": logins.status, "ResponseMessage": "bd head created successfully.", "succeeded": logins.success, "ResponseData": logins.data });
          } else {
            return next(new ErrorHandler(logins.msg, logins.status, logins.data));
          }
        }).catch((error) => {
          return next(new ErrorHandler(error, 500, error));//"Something want wrong when create BDE credential."
        })
      } else {
        return next(new ErrorHandler(bd.msg, bd.status, bd.data));
      }
    }).catch((error) => {
      return next(new ErrorHandler(error, 500, error));//"Something want wrong when create BDE."
    })
  }

  async getBDs(req, res, next) {
    try {
      const result = await getBDsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something went wrong when getting Lead Type."
    }
  }

  async getbdDetail(req, res, next) {
    try {
      const { bd_id } = req.query;
      const result = await getbdDetailService(req, bd_id);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error)//"Something went wrong when getting BDE detail."
      );
    }
  }

  async updateBD(req, res, next) {
    try {
      const cluster = await updateBDService(req);
      const { success, msg, status, data } = cluster;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(new ErrorHandler(error, 500, error));//"Something want wrong when update cluster head."
    }
  }

  async bdStatusChange(req, res, next) {
    try {
      const manager = await bdStatusChangeService(req);
      const { success, msg, status, data } = manager;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error)//"Something want wrong when BDE status change."
      );
    }
  }

}
module.exports = new ClusterBDController()