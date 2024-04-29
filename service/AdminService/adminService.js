const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const loginsModel = require("../../model/loginsModel");
const { scheduledTask } = require("./adminTargService");

class AdminService{
  async createAdminService(req) {
    try {
      const body = req.body;
      const profilePic = req.file;

      const adminByEmail = await adminModel.findOne({ email: body.email });
      if (adminByEmail) {
        return {
          status: 400,
          success: false,
          msg: "Email already exists.",
          data: "",
        };
      }

      const adminByUsername = await loginsModel.findOne({
        username: body.username,
      });
      if (adminByUsername) {
        return {
          status: 400,
          success: false,
          msg: "Username already exists.",
          data: "",
        };
      }

      const uniqueId = await helperFunctions.uniqueKey();
      const secretKey = await helperFunctions.generateSecretKey();

      const formData = adminModel({
        created_by: req.user._id,
        emp_id: body.emp_id,
        unique_id: uniqueId,
        name: body.name,
        username: body.username,
        email: body.email,
        designation: body.designation,
        mobile: body.mobile,
        profile_pic: profilePic.path,
        secret_key: secretKey,
      });

      const data = await formData.save();
      return {
        status: 201,
        success: true,
        msg: "Admin created successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong",
        data: error,
      };
    }
  }

  async createAdminCredentialService(req, admin) {
    try {
      const body = req.body;
      const loginData = loginsModel({
        user_id: admin.data._id,
        unique_id: admin.data.unique_id,
        name: admin.data.name,
        email: admin.data.email,
        username: body.username,
        password: body.password,
        role_type: "Admin",
        secret_key: admin.data.secret_key,
      });

      const result = await loginData.save();

      return {
        status: 201,
        success: true,
        msg: "Credential created successfully.",
        data: { user: admin.data, role_type: result.role_type },
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when creating credentials.",
        data: error,
      };
    }
  }

  async getAdminsService(req) {
    const { page, limit } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const resultAggregate = adminModel.aggregate([]);
    // return
    const admin = await adminModel.aggregatePaginate(resultAggregate, options);

    if (!admin || admin.length === 0) {
      return { status: 400, success: false, msg: "Admin not found.", data: "" };
    }
    return {
      status: 200,
      success: true,
      msg: "Admin get successfully.",
      data: admin,
    };
  }

}

module.exports = new AdminService();