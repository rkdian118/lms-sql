const { SuccessHandler } = require("../../middleware/resHandler");
const { addProposalService, updateProposalService, getProposalService } = require("../../service/BDService/bdProposalService");
const { bhGetProposalService, bhUpdateProposalService, bhAddProposalService } = require("../../service/ClusterService/clusterBDProposalService.js");
const ErrorHandler = require("../../Utils/errorHandler");

class BhBdProposalController {

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

    async bhUpdateProposal(req, res, next) {
        try {
            const result = await bhUpdateProposalService(req);
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

    async bhGetProposal(req, res, next) {
        try {
            const result = await bhGetProposalService(req);
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

module.exports = new BhBdProposalController();
