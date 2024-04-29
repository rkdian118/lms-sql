const { SuccessHandler } = require("../../middleware/resHandler");
const { addProposalService, updateProposalService, getProposalService } = require("../../service/BDService/bdProposalService");
const { clGetProposalService, clUpdateProposalService, clAddProposalService } = require("../../service/clusterLeadService/clBDProposalService");
const ErrorHandler = require("../../Utils/errorHandler");

class CLBdProposalController {

    // async clAddProposal(req, res, next) {
    //     try {
    //         const result = await clAddProposalService(req);
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

    async clUpdateProposal(req, res, next) {
        try {
            const result = await clUpdateProposalService(req);
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

    async clGetProposal(req, res, next) {
        try {
            const result = await clGetProposalService(req);
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

module.exports = new CLBdProposalController();
