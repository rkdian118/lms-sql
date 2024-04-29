const ErrorHandler = require("../../Utils/errorHandler");
const helperFunctions = require("../../helper/helperFun");
const { SuccessHandler } = require("../../middleware/resHandler");
const adminModel = require('../../model/AdminModel/adminModel');
const loginsModel = require('../../model/loginsModel');
const devAdminService = require("../../service/DevService/devAdminService");

class DevAdmin {

    adminCreate = async (req, res, next) => {
        return await Promise.resolve(devAdminService.createAdmin(req)).then(async (admin) => {
            if (admin && admin.success) {
                return await Promise.resolve(devAdminService.createCredential(req, admin)).then((logins) => {
                    if (logins && logins.success) {
                        SuccessHandler(req, res, "Admin created successfully.", logins.status,  logins.data )
                        // res.json({ "ResponseCode": logins.status, "ResponseMessage": "Admin created successfully.", "succeeded": logins.success, "ResponseData": logins.data });
                    } else {
                        return next(new ErrorHandler(logins.msg, logins.status, logins.data));
                    }
                }).catch((error) => {
                    return next(new ErrorHandler(error, 500, error));//"Something want wrong when create admin."
                })
            } else {
                return next(new ErrorHandler(admin.msg, admin.status, admin.data));
            }
        }).catch((error) => {
            return next(new ErrorHandler(error, 500, error));//"Something want wrong when create admin."
        })
    }

    uniqueId = async (req, res, next) => {
        const rendomPassword = await helperFunctions.generateRandomPassword();
        return res.status(200).json(rendomPassword)
    }
}
module.exports = new DevAdmin()







// createAdmin = async (req, res, next) => {
//     try {
//         const body = req.body;
//         const pic = req?.file ? req.file : "";

//         const user = await adminModel.findOne({ email: body.email });
//         if (user) {
//             return next(new ErrorHandler("User already exist. Please Log In.", 400, {}, false))
//         }

//         const uniqueId = await helperFunctions.uniqueKey();
//         const secret_key = await helperFunctions.generateSecretKey();

//         const formData = adminModel({
//             emp_id: body.emp_id,
//             unique_id: uniqueId,
//             name: body.name,
//             email: body.email,
//             designation: body.designation,
//             mobile: body.mobile,
//             profile_pic: pic.path,
//             secret_key: secret_key,
//             status: body.status,
//         })

//         return await formData.save().then(async (data) => {
//             const loginData = loginsModel({
//                 user_id: data._id,
//                 unique_id: uniqueId,
//                 email: data.email,
//                 username: body.username,
//                 password: body.password,
//                 role_type: body.role_type,
//                 secret_key: data.secret_key,
//             })
//             return await loginData.save().then((result) => {
//                 res.json({ "ResponseCode": 200, "ResponseMessage": "Admin created successfully.", "succeeded": true, "ResponseData": { user: data, role_type: result.role_type } });
//             }).catch(async (err) => {
//                 const deleteAdmin = await adminModel.deleteOne({ _id: data._id });
//                 return next(new ErrorHandler("Something want wrong when store login data.", 500, err))
//             })
//         }).catch((err) => {
//             return next(new ErrorHandler("Something want wrong when register admin.", 500, err))
//         })
//     } catch (error) {
//         return next(new ErrorHandler("Something want wrong when create admin.", 500, err));
//     }
// }