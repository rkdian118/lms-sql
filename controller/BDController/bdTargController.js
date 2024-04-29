const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { getTargetsService } = require("../../service/BDService/bdTargService");

class BDTargetController {
    async getTargets(req, res, next) {
        try {
            const result = await getTargetsService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(
                new ErrorHandler(error, 500, error)//"Something went wrong when get targets."
            );
        }
    }

}

module.exports = new BDTargetController();
