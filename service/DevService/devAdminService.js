const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const loginsModel = require("../../model/loginsModel");


class DevAdminService {

    createAdmin = async(req) => {
        try {
            const body = req.body;
            const profilePic = req.file;
            const admin = await adminModel.findOne({ email: body.email });
            if (admin) {
                return { status: 400, success: false, msg: "Email already exist.", data: "" };
            }
            const logins = await loginsModel.findOne({ username: body.username });
            if (logins) {
                return { status: 400, success: false, msg: "Username already exist.", data: "" };
            }
            const uniqueId = await helperFunctions.uniqueKey();
            const secret_key = await helperFunctions.generateSecretKey();

            const formData = adminModel({
                emp_id: body.emp_id,
                unique_id: uniqueId,
                name: body.name,
                username: body.username,
                email: body.email,
                designation: body.designation,
                mobile: body.mobile,
                profile_pic: profilePic.path,
                secret_key: secret_key,
                status: body.status,
            })
            return await formData.save().then((data) => {
                return { status: 200, success: true, msg: "admin create successfully.", data: data };
            }).catch((err) => {
                return { status: 500, success: false, msg: "Something want wrong when create admin.", data: err };
            })
        } catch (error) {
            return { status: 400, success: false, msg: "Somethin went wrong", data: error };
        }
    }

    createCredential = async(req, admin) => {
        try {
            const body = req.body;
            const loginData = loginsModel({
                user_id: admin.data._id,
                unique_id: admin.data.unique_id,
                email: admin.data.email,
                username: body.username,
                password: body.password,
                role_type: "Admin",
                secret_key: admin.data.secret_key,
            })
            return await loginData.save().then(async(result) => {
                return { status: 200, success: true, msg: "Credential created successfully.", data: {user: admin.data, role_type: result.role_type } };
            }).catch(async(err) => {
                const deleteAdmin = await adminModel.deleteOne({ _id: admin.data._id });
                return { status: 500, success: false, msg: "Something want wrong when create credential.", data: err };
            })
        } catch (error) {
            return { status: 400, success: false, msg: "Something went wrong when create credentials", data: error };
        }
    }

}

module.exports = new DevAdminService()