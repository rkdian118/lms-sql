const { SuccessHandler } = require("../../middleware/resHandler");
const { addProposalService, updateProposalService, getProposalService, getAllProposalCountsService } = require("../../service/BDService/bdProposalService");
const ErrorHandler = require("../../Utils/errorHandler");

class BdProposalController {
    // async getAllProposalCounts(req, res, next) {
    //     try {
    //         const result = await getAllProposalCountsService(req);
    //         const { success, msg, status, data } = result;
    //         if (success) {
    //             SuccessHandler(req, res, msg, status, data);
    //         } else {
    //             next(new ErrorHandler(msg, status, data));
    //         }
    //     } catch (error) {
    //         next(new ErrorHandler(error, 500, error)); //"Something went wrong when adding Call."
    //     }
    // }

    async addProposal(req, res, next) {
        try {
            const result = await addProposalService(req);
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

    async updateProposal(req, res, next) {
        try {
            const result = await updateProposalService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error)); //"Something went wrong when updating proposal."
        }
    }

    async getProposal(req, res, next) {
        try {
            const result = await getProposalService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error)); //"Something went wrong when getting proposal."
        }
    }
}

module.exports = new BdProposalController();
