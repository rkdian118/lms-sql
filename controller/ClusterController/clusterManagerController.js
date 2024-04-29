const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { createManagerService, createManagerCredentialService, getManagersService, getManagerDetailService, getDropdownManagersService, managerStatusChangeService, updateManagerService } = require("../../service/ClusterService/clusterManagerService");

class ClusterController {

  async createManager(req, res, next) {
    return await Promise.resolve(createManagerService(req)).then(async (manager) => {
      if (manager && manager.success) {
        return await Promise.resolve(createManagerCredentialService(req, manager.data)).then((logins) => {
          if (logins && logins.success) {
            SuccessHandler(req, res, "Team Lead created successfully.", logins.status, logins.data)
            // res.json({ "ResponseCode": logins.status, "ResponseMessage": "manager head created successfully.", "succeeded": logins.success, "ResponseData": logins.data });
          } else {
            return next(new ErrorHandler(logins.msg, logins.status, logins.data));
          }
        }).catch((error) => {
          return next(new ErrorHandler(error, 500, error));//"Something want wrong when create team lead credential."
        })
      } else {
        return next(new ErrorHandler(manager.msg, manager.status, manager.data));
      }
    }).catch((error) => {
      return next(new ErrorHandler(error, 500, error)); //"Something want wrong when create Team Lead."
    })
  }

  async getManagers(req, res, next) {
    try {
      const result = await getManagersService(req);
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

  async getManagerDetail(req, res, next) {
    try {
      const { manager_id } = req.query;
      const result = await getManagerDetailService(req, manager_id);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something went wrong when getting Team Lead detail.",
          500,
          error
        )
      );
    }
  }

  async updateManager(req, res, next) {
    try {
      const cluster = await updateManagerService(req);
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

  //Other Apis
  async managerStatusChange(req, res, next) {
    try {
      const manager = await managerStatusChangeService(req);
      const { success, msg, status, data } = manager;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when Team Lead status change.",
          500,
          error
        )
      );
    }
  }

  async getDropdownManagers(req, res, next) {
    try {
      const result = await getDropdownManagersService(req);
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

}
module.exports = new ClusterController()