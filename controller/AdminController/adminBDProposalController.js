const { SuccessHandler } = require("../../middleware/resHandler");
const { addProposalService, updateProposalService, getProposalService } = require("../../service/BDService/bdProposalService");
const { adminGetProposalService, adminUpdateProposalService, adminAddProposalService } = require("../../service/AdminService/adminBDProposalService");
const ErrorHandler = require("../../Utils/errorHandler");

class adminBdProposalController {

    async adminUpdateProposal(req, res, next) {
        try {
            const result = await adminUpdateProposalService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when updating proposal."
        }
    }

    async adminGetProposal(req, res, next) {
        try {
            const result = await adminGetProposalService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when getting proposal."
        }
    }
}

module.exports = new adminBdProposalController();
