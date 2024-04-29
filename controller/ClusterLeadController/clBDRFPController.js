const { SuccessHandler } = require("../../middleware/resHandler");
const { addRFPService, getRFPService, getRFPActivitiesService, addCommentRFPActivityService, getLeadRFPStatusService, getLeadRFPTypeService, updateRFPActivityService, updateRFPService, getRfpMomService, updateRfpStatusService } = require("../../service/BDService/bdRFPService");
const { clGetLeadRFPTypeService, clGetLeadRFPStatusService, clAddRFPService, clUpdateRFPService, clUpdateRfpStatusService, clGetRFPService, clGetRfpMomService, clGetRFPActivitiesService, clUpdateRFPActivityService, clAddCommentRFPActivityService, clUpdateRFPProposalValueService } = require("../../service/clusterLeadService/clBDRFPService");
const ErrorHandler = require("../../Utils/errorHandler");

class CLBdRfpController {

    async clGetLeadRFPType(req, res, next) {
        try {
            const result = await clGetLeadRFPTypeService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when getting Lead RFP Type."
        }
    }

    async clGetLeadRFPStatus(req, res, next) {
        try {
            const result = await clGetLeadRFPStatusService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when getting Lead RFP Status."
        }
    }

    async clAddRFP(req, res, next) {
        try {
            const result = await clAddRFPService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when CL add RFP."
        }
    }

    async clUpdateRFP(req, res, next) {
        try {
            const result = await clUpdateRFPService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when CL update RFP."
        }
    }

    async clUpdateRFPProposalValue(req, res, next) {
        try {
            const result = await clUpdateRFPProposalValueService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when update RFP."
        }
    }

    async clUpdateRfpStatus(req, res, next) {
        try {
            const rfp = await clUpdateRfpStatusService(req);
            const { success, msg, status, data } = rfp;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something want wrong when CL update RFP Status."
        }
    }

    async clGetRfp(req, res, next) {
        try {
            const result = await clGetRFPService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when CL get request for proposal."
        }
    }

    async clGetRfpMom(req, res, next) {
        try {
            const result = await clGetRfpMomService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when CL get rfp mom."
        }
    }

    async clGetRFPActivities(req, res, next) {
        try {
            const result = await clGetRFPActivitiesService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when CL get RFP Activities."
        }
    }

    async clUpdateRfpActivity(req, res, next) {
        try {
            const lead = await clUpdateRFPActivityService(req);
            const { success, msg, status, data } = lead;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));// "Something want wrong when CL Update Call Activity."
        }
    }

    async clAddCommentRFPActivity(req, res, next) {
        try {
            const lead = await clAddCommentRFPActivityService(req);
            const { success, msg, status, data } = lead;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something want wrong when CL update lead."
        }
    }
}

module.exports = new CLBdRfpController();
