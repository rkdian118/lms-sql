const { SuccessHandler } = require("../middleware/resHandler");
const task = require("../service/AdminService/adminTargService");
const userService = require("../service/userService");
const ErrorHandler = require("../Utils/errorHandler")


class UserController {

    loginController = async (req, res, next) => {
        return await Promise.resolve(userService.loginService(req)).then(async (user) => {
            if (user && user.success) {
                SuccessHandler(req, res, user.msg, user.status, user.data);
                // res.json({ "ResponseCode": user.status, "ResponseMessage": user.msg, "succeeded": user.success, "ResponseData": user.data });
            } else {
                return next(new ErrorHandler(user.msg, user.status, user.data));
            }
        }).catch((error) => {
            return next(new ErrorHandler(error, 500, error)); //"Something want wrong when login user."
        })
    }

    verifySecretKeyController = async (req, res, next) => {
        return await Promise.resolve(userService.verifySecretKeyService(req)).then(async (data) => {
            if (data && data.success) {
                SuccessHandler(req, res, data.msg, data.status, data.data)
                // res.json({ "ResponseCode": data.status, "ResponseMessage": data.msg, "succeeded": data.success, "ResponseData": data.data });
            } else {
                return next(new ErrorHandler(data.msg, data.status, data.data));
            }
        }).catch((error) => {
            return next(new ErrorHandler(error, 500, error));//"Something want wrong when verify secret key controller."
        })
    }

    getUserProfile = async (req, res, next) => {
        try {
            const user = req.user;
            // console.log("user profile task.scheduleTask: ", task.scheduledTask);
            SuccessHandler(req, res, "User details get successfully.", 200, { user, role_type: req.decoded.role_type })
            // res.json({ "ResponseCode": 200, "ResponseMessage": "User details get successfully.", "succeeded": true, "ResponseData": {user, role_type: req.decoded.role_type} });
        } catch (error) {
            return next(new ErrorHandler(error, 500, error));//"Something want wrong when get user profile."
        }
    }

    async updateUserProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfileService(req);
            const {
                success: userSuccess,
                msg: userMsg,
                status: userStatus,
                data: userData,
            } = user;
            if (userSuccess) {
                SuccessHandler(req, res, userMsg, userStatus, userData);
            } else {
                next(new ErrorHandler(userMsg, userStatus, userData));
            }
        } catch (error) {
            next(
                new ErrorHandler(
                    error, //"Something want wrong when update user profile.",
                    500,
                    error
                )
            );
        }
    }

    async updateUserPassword(req, res, next) {
        try {
            const user = await userService.updateUserPasswordService(req);
            const {
                success: userSuccess,
                msg: userMsg,
                status: userStatus,
                data: userData,
            } = user;
            if (userSuccess) {
                SuccessHandler(req, res, userMsg, userStatus, userData);
            } else {
                next(new ErrorHandler(userMsg, userStatus, userData));
            }
        } catch (error) {
            next(
                new ErrorHandler(
                    error,//"Something want wrong when update user password.",
                    500,
                    error
                )
            );
        }
    }
    async updateUsername(req, res, next) {
        try {
            const user = await userService.updateUsernameService(req);
            const {
                success: userSuccess,
                msg: userMsg,
                status: userStatus,
                data: userData,
            } = user;
            if (userSuccess) {
                SuccessHandler(req, res, userMsg, userStatus, userData);
            } else {
                next(new ErrorHandler(userMsg, userStatus, userData));
            }
        } catch (error) {
            next(
                new ErrorHandler(
                    error, //"Something want wrong when update username.",
                    500,
                    error
                )
            );
        }
    }

    getBranches = async (req, res, next) => {
        return await Promise.resolve(userService.getBranchesService(req)).then(async (result) => {
            if (result && result.success) {
                SuccessHandler(req, res, result.msg, result.status, result.data)
            } else {
                return next(new ErrorHandler(result.msg, result.status, result.data));
            }
        }).catch((error) => {
            return next(new ErrorHandler(error, 500, error));//"Something want wrong when get branches details."
        })
    }

}

module.exports = new UserController()