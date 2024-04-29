const { SuccessHandler } = require("../../middleware/resHandler");
const { bhGetLeadRFPTypeService, bhGetLeadRFPStatusService, bhAddRFPService, bhUpdateRFPService, bhUpdateRfpStatusService, bhGetRFPService, bhGetRfpMomService, bhGetRFPActivitiesService, bhUpdateRFPActivityService, bhAddCommentRFPActivityService } = require("../../service/ClusterService/clusterBDRFPService.js");
const ErrorHandler = require("../../Utils/errorHandler");

class BhBdRfpController {

    async bhGetRfp(req, res, next) {
        try {
            const result = await bhGetRFPService(req);
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
    
    async bhUpdateRFP(req, res, next) {
        try {
            const result = await bhUpdateRFPService(req);
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

    async bhGetRfpMom(req, res, next) {
        try {
            const result = await bhGetRfpMomService(req);
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

    async bhUpdateRfpStatus(req, res, next) {
        try {
            const rfp = await bhUpdateRfpStatusService(req);
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

    async bhGetRFPActivities(req, res, next) {
        try {
            const result = await bhGetRFPActivitiesService(req);
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

    async bhUpdateRfpActivity(req, res, next) {
        try {
            const lead = await bhUpdateRFPActivityService(req);
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

    async bhAddCommentRFPActivity(req, res, next) {
        try {
            const lead = await bhAddCommentRFPActivityService(req);
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
/////////////////////////////////////////////////
    async bhGetLeadRFPType(req, res, next) {
        try {
            const result = await bhGetLeadRFPTypeService(req);
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

    async bhGetLeadRFPStatus(req, res, next) {
        try {
            const result = await bhGetLeadRFPStatusService(req);
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

    async bhAddRFP(req, res, next) {
        try {
            const result = await bhAddRFPService(req);
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
}

module.exports = new BhBdRfpController();
