const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const {
    createCountryLeadService, createCountryLeadCredentialService, getCountryLeadsService, updatecountryLeadService, countryLeadStatusChangeService, getCountryLeadDetailService

} = require("../../service/AdminService/adminCountryLeadService.js");

class AdminClusterController {
    async createCountryLead(req, res, next) {
        try {
            const countryLead = await createCountryLeadService(req);
            const {
                success: countryLeadSuccess,
                msg: countryLeadMsg,
                status: countryLeadStatus,
                data: countryLeadData,
            } = countryLead;
            if (countryLeadSuccess) {
                const logins = await createCountryLeadCredentialService(req, countryLeadData);
                const {
                    success: loginSuccess,
                    msg: loginMsg,
                    status: loginStatus,
                    data: loginData,
                } = logins;
                if (loginSuccess) {
                    SuccessHandler(req,
                        res,
                        "Country Lead created successfully.",
                        loginStatus,
                        loginData
                    );
                } else {
                    next(new ErrorHandler(loginMsg, loginStatus, loginData));
                }
            } else {
                next(new ErrorHandler(countryLeadMsg, countryLeadStatus, countryLeadData));
            }
        } catch (error) {
            next(
                new ErrorHandler(
                    error, //"Something want wrong when create countryLead head.",
                    500,
                    error
                )
            );
        }
    }

    async getCountryLeads(req, res, next) {
        try {
            const result = await getCountryLeadsService(req);
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

    async getCountryLeadDetail(req, res, next) {
        try {
            const { country_lead_id } = req.query;
            const result = await getCountryLeadDetailService(req, country_lead_id);
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

    async updateCountryLead(req, res, next) {
        try {
            const countryLead = await updatecountryLeadService(req);
            const {
                success: countryLeadSuccess,
                msg: countryLeadMsg,
                status: countryLeadStatus,
                data: countryLeadData,
            } = countryLead;
            if (countryLeadSuccess) {
                SuccessHandler(req, res, countryLeadMsg, countryLeadStatus, countryLeadData);
            } else {
                next(new ErrorHandler(countryLeadMsg, countryLeadStatus, countryLeadData));
            }
        } catch (error) {
            next(
                new ErrorHandler(
                    error, //"Something want wrong when update countryLead head.",
                    500,
                    error
                )
            );
        }
    }

    async countryLeadStatusChange(req, res, next) {
        try {
            const countryLead = await countryLeadStatusChangeService(req);
            const {
                success: countryLeadSuccess,
                msg: countryLeadMsg,
                status: countryLeadStatus,
                data: countryLeadData,
            } = countryLead;
            if (countryLeadSuccess) {
                SuccessHandler(req, res, countryLeadMsg, countryLeadStatus, countryLeadData);
            } else {
                next(new ErrorHandler(countryLeadMsg, countryLeadStatus, countryLeadData));
            }
        } catch (error) {
            next(
                new ErrorHandler(
                    error, //"Something want wrong when update countryLead head status.",
                    500,
                    error
                )
            );
        }
    }

    async updateClusterBranch(req, res, next) {
        try {
            const reassignBranch = await updateClusterBranchService(req);
            const { success, msg, status, data } = reassignBranch;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(
                new ErrorHandler(
                    error, //"Something want wrong when reassignBranch.",
                    500,
                    error
                )
            );
        }
    }
}
module.exports = new AdminClusterController();
