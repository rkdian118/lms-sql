const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { addRequirementTypeService, getRequirementTypesService, addLeadTypeService, addCallTypeService, addLeadSourceService, addCallModeService, addProposalTypeService, addPreDefNoteService, getPreDefNotesService, getLeadTypeService, getCallTypeService, getLeadSourceService, getCallModeService, getProposalTypeService, updateRequirementTypeService, updateLeadTypeService, updateLeadSourceService, updateCallTypeService, updateCallModeService, updateProposalTypeService, updatePreDefNotesService, getUserLogsService, addMasterStatusService, updateMasterStatusService } = require("../../service/ManagerService/commonTableService");

class CommonController {

  addMasterStatus = async (req, res, next) => {
    return await Promise.resolve(addMasterStatusService(req)).then(async (masterStatus) => {
      if (masterStatus && masterStatus?.success) {
        SuccessHandler(req, res, masterStatus.msg, masterStatus.status, masterStatus.data)
      } else {
        return next(new ErrorHandler(masterStatus.msg, masterStatus.status, masterStatus.data));
      }
    }).catch((error) => {
      return next(new ErrorHandler(error, 500, error));//"Something want wrong when add Master Status."
    })
  }

  async updateMasterStatus(req, res, next) {
    try {
      const result = await updateMasterStatusService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      next(
        new ErrorHandler(error, 500, error)//"Something want wrong when update Master Status."
      );
    }
  }

  async getUserLogs(req, res, next) {
    try {
      const result = await getUserLogsService(req);
      const { success, msg, status, data } = result;
      if (success) {
        SuccessHandler(req, res, msg, status, data);
      } else {
        next(new ErrorHandler(msg, status, data));
      }
    } catch (error) {
      res.status(500).json({ "ResponseCode": "500", "ResponseMessage": "Something went wrong when user logs", "succeeded": false, "ResponseData": error.message });
    }
  }

}

module.exports = new CommonController()