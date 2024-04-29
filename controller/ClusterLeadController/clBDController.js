const ErrorHandler = require("../../Utils/errorHandler.js");
const { SuccessHandler } = require("../../middleware/resHandler.js");
const { clGetBDDetailService, clGetBDsService, clGetBDsDropdownService } = require("../../service/clusterLeadService/clBDService.js");

class ClusterLeadBDController {


    async clGetBDs(req, res, next) {
        try {
            const result = await clGetBDsService(req);
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

    async clGetBDsDropdown(req, res, next) {
        try {
            const result = await clGetBDsDropdownService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));// "Something went wrong when CL get BDs Dropdown list."
        }
    }

    async clGetBDDetail(req, res, next) {
        try {
            const { bd_id } = req.query;
            const result = await clGetBDDetailService(req, bd_id);
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

    // ClusterBDController.
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

}
module.exports = new ClusterLeadBDController()