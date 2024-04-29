const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { createBDService, createBDCredentialService, getBDsService, getbdDetailService, updateBDService, bdStatusChangeService } = require("../../service/ClusterService/clusterBDService");
const { getManagerBDsService, getManagerBDDetailService } = require("../../service/ManagerService/managerBDService");

class ManagerBDController {


    async getManagerBDs(req, res, next) {
        try {
            const result = await getManagerBDsService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when getting Lead Type."
        }
    }

    async getManagerBDDetail(req, res, next) {
        try {
            const { bd_id } = req.query;
            const result = await getManagerBDDetailService(req, bd_id);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(
                new ErrorHandler(error, 500, error)//"Something went wrong when getting BDE detail."
            );
        }
    }

    // async updateBD(req, res, next) {
    //     try {
    //         const cluster = await updateBDService(req);
    //         const { success, msg, status, data } = cluster;
    //         if (success) {
    //             SuccessHandler(req, res, msg, status, data);
    //         } else {
    //             next(new ErrorHandler(msg, status, data));
    //         }
    //     } catch (error) {
    //         next(new ErrorHandler("Something want wrong when update cluster head.", 500, error));
    //     }
    // }

    // async bdStatusChange(req, res, next) {
    //     try {
    //         const manager = await bdStatusChangeService(req);
    //         const { success, msg, status, data } = manager;
    //         if (success) {
    //             SuccessHandler(req, res, msg, status, data);
    //         } else {
    //             next(new ErrorHandler(msg, status, data));
    //         }
    //     } catch (error) {
    //         next(
    //             new ErrorHandler("Something want wrong when BDE status change.", 500, error)
    //         );
    //     }
    // }

}
module.exports = new ManagerBDController()