const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { createBranchService, getBranchesService, getDropdownBranchesService, getBranchDetailService, updateBranchService, branchStatusChangeService } = require("../../service/AdminService/adminBranchService");
const { scheduledTask } = require("../../service/AdminService/adminTargService");

class AdminBranchController {
  async createBranch(req, res, next) {
    try {
      const result = await createBranchService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error) //"Something want wrong when create branch."
      );
    }
  }

  async getBranches(req, res, next) {
    try {
      const result = await getBranchesService(req);
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

  async getBranchDetail(req, res, next) {
    try {
      // console.log("getBranchDetail scheduledTask: ",scheduledTask);
      const { branch_id } = req.query;
      const result = await getBranchDetailService(branch_id);
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

  async updateBranch(req, res, next) {
    try {
      const branch = await updateBranchService(req);
      const {
        success: branchSuccess,
        msg: branchMsg,
        status: branchStatus,
        data: branchData,
      } = branch;
      if (branchSuccess) {
        SuccessHandler(req, res, branchMsg, branchStatus, branchData);
      } else {
        next(new ErrorHandler(branchMsg, branchStatus, branchData));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when update branch.",
          500,
          error
        )
      );
    }
  }

  async getDropdownBranches(req, res, next) {
    try {
      const result = await getDropdownBranchesService(req);
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

  async branchStatusChange(req, res, next) {
    try {
      const branch = await branchStatusChangeService(req);
      const { success , msg, status, data } = branch;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(
          error, //"Something want wrong when update branch status.",
          500,
          error
        )
      );
    }
  }
}
module.exports = new AdminBranchController();
