const ErrorHandler = require("../../Utils/errorHandler");
const { SuccessHandler } = require("../../middleware/resHandler");
const { createAdminService, createAdminCredentialService, getAdminsService } = require("../../service/AdminService/adminService");
const { scheduledTask } = require("../../service/AdminService/adminTargService");

class AdminController {

    createAdmin = async (req, res, next) => {
        try {

            const admin = await createAdminService(req);

            if (!admin || !admin.success) {
                return next(new ErrorHandler(admin.msg, admin.status, admin.data));
            }

            const logins = await createAdminCredentialService(req, admin);

            if (!logins || !logins.success) {
                return next(new ErrorHandler(logins.msg, logins.status, logins.data));
            }

            SuccessHandler(req, res, "Admin created successfully.", logins.status, logins.data);
        } catch (error) {
            console.error("adminCreate Error: ", error);
            next(new ErrorHandler(error, 500, error));//"Something went wrong when creating admin."
        }
    }

    async getAdmins(req, res, next) {
        try {
            const result = await getAdminsService(req);
            const { success, msg, status, data } = result;
            if (success) {
                SuccessHandler(req, res, msg, status, data);
            } else {
                next(new ErrorHandler(msg, status, data));
            }
        } catch (error) {
            next(new ErrorHandler(error, 500, error));//"Something went wrong when getting list of cluster heads."
        }
    }


}
module.exports = new AdminController()