const ErrorHandler = require("../../Utils/errorHandler.js");
const { SuccessHandler } = require("../../middleware/resHandler.js");
const { getLeadsService } = require("../../service/countryLeadService/bdLeadsService.js");

class CountryLeadLeadsController {


    async getLeads(req, res, next) {
        try {
            const result = await getLeadsService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error)); //"Something went wrong when CL get BD list."
        }
    }


}
module.exports = new CountryLeadLeadsController()