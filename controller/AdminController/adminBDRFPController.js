const { SuccessHandler } = require("../../middleware/resHandler");
const { adminGetLeadRFPTypeService, adminGetLeadRFPStatusService, adminAddRFPService, adminUpdateRFPService, adminUpdateRfpStatusService, adminGetRFPService, adminGetRfpMomService, adminGetRFPActivitiesService, adminUpdateRFPActivityService, adminAddCommentRFPActivityService } = require("../../service/AdminService/adminBDRFPService");
const ErrorHandler = require("../../Utils/errorHandler");

class AdminBdRfpController {
    async adminGetRfp(req, res, next) {
        try {
            const result = await adminGetRFPService(req);
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

    async adminUpdateRFP(req, res, next) {
        try {
            const result = await adminUpdateRFPService(req);
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

    async adminGetRfpMom(req, res, next) {
        try {
            const result = await adminGetRfpMomService(req);
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
    
    async adminUpdateRfpStatus(req, res, next) {
        try {
            const rfp = await adminUpdateRfpStatusService(req);
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

    async adminGetRFPActivities(req, res, next) {
        try {
            const result = await adminGetRFPActivitiesService(req);
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

    async adminUpdateRfpActivity(req, res, next) {
        try {
            const lead = await adminUpdateRFPActivityService(req);
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

    async adminAddCommentRFPActivity(req, res, next) {
        try {
            const lead = await adminAddCommentRFPActivityService(req);
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


    /////////////////////////////////BH Controller ////////////////////

}

module.exports = new AdminBdRfpController();
