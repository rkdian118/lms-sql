const { default: mongoose } = require("mongoose");
const helperFunctions = require("../helper/helperFun");
const adminModel = require("../model/AdminModel/adminModel");
const branchModel = require("../model/AdminModel/branchModel");
const bdModel = require("../model/BDModel/bdModel");
const clusterLeadModel = require("../model/ClusterLeadModel/clusterLeadModel");
const clusterModel = require("../model/ClusterModel/clusterModel");
const managerModel = require("../model/ManagerModel/managerModel");
const loginsModel = require("../model/loginsModel");
const countryLeadModel = require("../model/CountryLeadModel/countryLeadModel");
const bcrypt = require("bcryptjs");

class UserService {
  userProfileService = async (id, type) => {
    try {
      let user;
      switch (type) {
        case "Admin":
          // user = await adminModel
          //   .findOne({ _id: id })
          //   .select(
          //     "_id created_by emp_id unique_id name email designation country_code mobile profile_pic secret_key status deleted"
          //   );
          const adminquery = `SELECT 
          _id, 
          created_by, 
          emp_id, 
          unique_id, 
          name, 
          email, 
          designation, 
          country_code, 
          mobile, 
          profile_pic, 
          secret_key, 
          status, 
          deleted 
          FROM lms.admins 
          WHERE _id = ?`;
          [[user]] = await pool.promise().execute(adminquery, [id]);
          break;

        case "Cluster":
          // user = await clusterModel
          //   .findOne({ _id: id })
          //   .select(
          //     "_id admin_id emp_id unique_id name email designation country_code branch_id country state city mobile profile_pic secret_key status deleted"
          //   )
          //   .populate("branch_id", "branch_name")
          //   .populate("admin_id", "name emp_id email designation");
          const clusterquery = `
          SELECT c._id AS _id,
          (
            SELECT JSON_OBJECT(
              '_id',a._id, 
              'emp_id', a.emp_id, 
              'name', a.name, 
              'email', a.email, 
              'designation', a.designation
            )
           FROM admins a 
           WHERE a._id = c.admin_id
          ) AS admin_id,
          c.emp_id AS emp_id,
          c.unique_id AS unique_id,
          c.name AS name,
          c.email AS email,
          c.designation AS designation,
          c.country_code AS country_code,
          (
            SELECT JSON_OBJECT(
              '_id', b._id, 
              'branch_name', b.branch_name
            )
           FROM branches b 
           WHERE b._id = c.branch_id
          ) AS branch_id,
          c.mobile AS mobile,
          c.profile_pic AS profile_pic,
          c.secret_key AS secret_key,
          c.status AS status,
          c.deleted AS deleted
          FROM lms.clusters c
          WHERE c._id = ?;`;
          [[user]] = await pool.promise().execute(clusterquery, [id]);
          break;

        case "Manager":
          user = await managerModel
            .findOne({ _id: id })
            .select(
              "_id cluster_head_id emp_id unique_id name email designation country_code mobile profile_pic secret_key status deleted"
            )
            .populate("cluster_head_id", "name emp_id email designation");
          break;

        case "ClusterLead":
          const clusterleadquery = `
          SELECT 
          cl._id AS _id,
          (
            SELECT JSON_OBJECT(
              '_id', c._id, 
              'emp_id', c.emp_id, 
              'name', c.name, 
              'email', c.email, 
              'designation', c.designation
            ) 
            FROM clusters c 
            WHERE c._id = cl.cluster_head_id 
          ) AS cluster_head_id,
          cl.emp_id AS emp_id,
          cl.unique_id AS unique_id,
          cl.name AS name,
          cl.email AS email,
          cl.designation AS designation,
          cl.country_code AS country_code,
          cl.mobile AS mobile,
          cl.profile_pic AS profile_pic,
          cl.secret_key AS secret_key,
          cl.status AS status,
          cl.deleted AS deleted
          FROM lms.cluster_leads cl
          WHERE cl._id = ?;
          `;
          [[user]] = await pool.promise().execute(clusterleadquery, [id]);
          break;

        case "CountryLead":
          // user = await countryLeadModel
          //   .findOne({ _id: id })
          //   .select(
          //     "_id admin_id emp_id unique_id name email designation country_code continent_code mobile profile_pic secret_key status deleted"
          //   )
          //   .populate("admin_id", "name emp_id email designation");
          // // .populate("manager_id", "name emp_id email designation");
          const countryleadquery = `
          SELECT
          countryLead._id AS _id,
          (
            SELECT JSON_OBJECT(
              '_id', a._id,
              'emp_id', a.emp_id,
              'name', a.name,
              'email', a.email,
              'designation', a.designation
            )
            FROM admins a
            WHERE a._id = countryLead._id
          ) AS admin_id,
          countryLead.emp_id AS emp_id,
          countryLead.unique_id AS unique_id,
          countryLead.name AS name,
          countryLead.email AS email,
          countryLead.designation AS designation,
          countryLead.country_code AS country_code,
          countryLead.mobile AS mobile,
          countryLead.profile_pic AS profile_pic,
          countryLead.secret_key AS secret_key,
          countryLead.status AS status,
          countryLead.deleted AS deleted
          FROM lms.country_leads countryLead
          WHERE countryLead._id = ?;
          `;

          [[user]] = await pool.promise().execute(countryleadquery, [id]);
          break;

        case "Business":
          // user = await bdModel
          //   .findOne({ _id: id })
          //   .select(
          //     "_id cluster_head_id cluster_lead_id emp_id unique_id name email designation country_code mobile profile_pic secret_key status deleted"
          //   )
          //   .populate("cluster_head_id", "name emp_id email designation")
          //   // .populate("manager_id", "name emp_id email designation")
          //   .populate("cluster_lead_id", "name emp_id email designation");
          // let bdquery = 
          // `SELECT _id, cluster_head_id, cluster_lead_id, emp_id, unique_id, name, email, designation, country_code, mobile, profile_pic, secret_key, status, deleted FROM lms.businesses WHERE _id = "${id}" `
          [[user]] = await pool.promise().execute(`
          SELECT
          bd._id AS _id,
          (
            SELECT JSON_OBJECT(
              '_id', c._id,
              'emp_id', c.emp_id,
              'name', c.name,
              'email', c.email,
              'designation', c.designation
            )
            FROM clusters c
            WHERE c._id = bd.cluster_head_id
          ) AS cluster_head_id,
          (
            SELECT JSON_OBJECT(
              '_id', cl._id,
              'emp_id', cl.emp_id,
              'name', cl.name,
              'email', cl.email,
              'designation', cl.designation
            )
            FROM cluster_leads cl
            WHERE cl._id = bd.cluster_lead_id
          ) AS cluster_lead_id,
          bd.emp_id AS emp_id,
          bd.unique_id AS unique_id,
          bd.name AS name,
          bd.email AS email,
          bd.designation AS designation,
          bd.country_code AS country_code,
          bd.mobile AS mobile,
          bd.profile_pic AS profile_pic,
          bd.secret_key AS secret_key,
          bd.status AS status,
          bd.deleted AS deleted
          FROM lms.businesses bd
          WHERE bd._id = ?`, [id]);
          break;

        default:
          return {
            status: 400,
            success: false,
            msg: "Invalid user type.",
            data: "",
          };
      }
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: `${type} details not found.`,
          data: "",
        };
      }

      if (user.status == 2) {
        const admin = type == "Admin" ? "Admin" : "Cluster Head";
        return {
          status: 207,
          success: false,
          msg: `Your Account is Deactivated by ${admin}, please contact ${admin}`, //${type} Account is Deactivated by ${admin}, please contact to the ${admin},
          data: "",
        };
      }

      if (user.status == 3) {
        const admin = type == "Admin" ? "Admin" : "Cluster Head";
        return {
          status: 400,
          success: false,
          msg: `${type} Account is Deleted by ${admin}, please contact to the ${admin}`, //`${type} details not found.`,
          data: "",
        };
      }

      return {
        status: 200,
        success: true,
        msg: `${type} details get successfully.`,
        data: user,
      };
    } catch (err) {
      return {
        status: 500,
        success: false,
        msg: `Something went wrong when getting ${type} details.`,
        data: err,
      };
    }
  };

  loginService = async (req) => {
    try {
      const { username, password } = req.body;
      // const user = await loginsModel.findOne({ username }).select("+password");
      const query = `SELECT *  FROM lms.logins WHERE username = "${username}" `;
      const [[user]] = await pool.promise().execute(query, []);

      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "Invalid Username or Password.",
          data: "",
        };
      }
      // const isPasswordMatched = await user.comparePassword(password);
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return {
          status: 401,
          success: false,
          msg: "Invalid Username or Password.",
          data: "",
        };
      }
      const userDetails = await this.userProfileService(
        user.user_id,
        user.role_type
      );
      if (!userDetails.success) {
        return {
          status: userDetails.status,
          success: userDetails.success,
          msg: userDetails.msg,
          data: userDetails.data,
        };
      }
      var params = {
        _id: userDetails.data._id,
        emp_id: userDetails.data.emp_id,
        unique_id: userDetails.data.unique_id,
        email: userDetails.data.email,
        role_type: user.role_type,
      };
      let tempKey = process.env.TEMP_KEY;
      let expire = 1 * 60;
      const token = await helperFunctions.sendToken(
        params,
        tempKey,
        `${expire}s`
      );

      return {
        status: 200,
        success: true,
        msg: "Login successful, please enter secret code",
        data: { token: token, role_type: user.role_type },
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something want wrong when login admin.",
        data: error,
      };
    }
  };

  verifySecretKeyService = async (req) => {
    try {
      const { secret_key } = req.body;
      const user = req.user;
      const query = `SELECT *  FROM lms.logins WHERE user_id = "${user._id}" `;
      const [[loginCred]] = await pool.promise().execute(query, []);

      // const loginCred = await loginsModel.findOne({ user_id: user._id });
      if (!loginCred) {
        return {
          status: 400,
          success: false,
          msg: "User credintials not found.",
          data: "",
        };
        // return next(new ErrorHandler("Admin credintials not found", 400));
      }
      if (secret_key !== loginCred.secret_key) {
        return {
          status: 400,
          success: false,
          msg: "Please enter valid secret key.",
          data: "",
        };
        // return next(new ErrorHandler("Please enter valid secret key.", 400));
      }

      var params = {
        _id: user._id,
        emp_id: user.emp_id,
        unique_id: user.unique_id,
        email: user.email,
        role_type: loginCred.role_type,
      };
      const token = await helperFunctions.sendToken(params);

      return {
        status: 200,
        success: true,
        msg: "User logged in successfully.",
        data: { token: token, user: user, role_type: loginCred.role_type },
      };
      // res.json({ "ResponseCode": 200, "ResponseMessage": "Admin logged in successfully.", "succeeded": true, "ResponseData": { token , admin, role_type: loginCred.role_type} });
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something want wrong when verify secret key.",
        data: error,
      };
      // return next(new ErrorHandler("Something want wrong when login admin.", 500, err));
    }
  };

  updateUserProfileService = async (req) => {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const user = req.user;
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "User not found",
          data: user,
        };
      }
      // const userLogins = await loginsModel.findOne({ user_id: user._id });
      let loginquery = `
      SELECT *
      FROM lms.logins 
      WHERE user_id ="${user._id}";
      `;
      const [[userLogins]] = await pool.promise().execute(loginquery, []);
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "User credintials not found",
          data: userLogins,
        };
      }

      const userModel =
        req.decoded.role_type == "Admin"
          ? "admins" //adminModel
          : req.decoded.role_type == "Cluster"
          ? "clusters" //clusterModel
          : req.decoded.role_type == "Manager"
          ? "managers" //managerModel
          : req.decoded.role_type == "ClusterLead"
          ? "cluster_leads" //clusterLeadModel
          : "businesses"; //bdModel;

      let userEmail;
      if (body.email && body?.email !== user.email) {
        let useremailquery = (`
        SELECT *
        FROM lms.${userModel} 
        WHERE email ="${body.email}"
        AND _id NOT IN (
          SELECT _id
          FROM lms.${userModel}
          WHERE _id = "${user._id}"
        )
        `[[userEmail]] = await pool.promise().execute(useremailquery, []));
        // await userModel.findOne(
        //   { email: body.email, _id: { $nin: new mongoose.Types.ObjectId(user._id) } },
        //   { name: 1, email: 1, designation: 1 }
        // );
      }
      if (userEmail) {
        return {
          status: 400,
          success: false,
          msg: "User email already exist.",
          data: userEmail,
        };
      }

      // const updateUser = {
      //   name: body?.name ? body?.name : user.name,
      //   email: body?.email ? body?.email : user?.email,
      //   designation: body?.designation ? body?.designation : user?.designation,
      //   mobile: body?.mobile ? body?.mobile : user?.mobile,
      //   country_code: body?.country_code ? body?.country_code : user?.country_code,
      //   // profile_pic: profilePic?.path ? profilePic?.path : body.profilePic,
      // };

      // req.file ? (updateUser["profile_pic"] = req.file.path) : "";

      // // const User = await userModel.updateOne({ _id: user._id }, updateUser);

      // const updateUserCredential = {
      //   // username: body?.username ? body?.username : userLogins.username,
      //   email: body?.email ? body?.email : userLogins?.email,
      //   name: body?.name ? body?.name : userLogins?.name,
      // };
      // const userCred = await loginsModel.updateOne(
      //   { user_id: user._id },
      //   updateUserCredential
      // );

      // Construct the update query based on the conditions
      let updateQuery = `UPDATE lms.${userModel} SET`;
      let updateFields = [];

      // Check if each field exists in the body, if yes, add it to the updateFields array
      if (body.name) updateFields.push(`name = '${body.name}'`);
      if (body.email) updateFields.push(`email = '${body.email}'`);
      if (body.designation)
        updateFields.push(`designation = '${body.designation}'`);
      if (body.mobile) updateFields.push(`mobile = '${body.mobile}'`);
      if (body.country_code)
        updateFields.push(`country_code = '${body.country_code}'`);
      if (req.file) updateFields.push(`profile_pic = '${req.file.path}'`);

      // Join the update fields into a single string
      updateQuery += ` ${updateFields.join(", ")}`;

      // Add the WHERE clause
      updateQuery += ` WHERE _id = '${user._id}'`;

      // Execute the update query
      let User = await pool.promise().execute(updateQuery);

      // Construct the update query for user credentials
      let updateCredentialQuery = `UPDATE logins SET`;
      let updateCredentialFields = [];

      // Check if each field exists in the body or userLogins, if yes, add it to the updateCredentialFields array
      if (body.name || userLogins.name)
        updateCredentialFields.push(`name = '${body.name || userLogins.name}'`);
      if (body.email || userLogins.email)
        updateCredentialFields.push(
          `email = '${body.email || userLogins.email}'`
        );

      // Join the update fields into a single string
      updateCredentialQuery += ` ${updateCredentialFields.join(", ")}`;

      // Add the WHERE clause
      updateCredentialQuery += ` WHERE user_id = '${user._id}'`;
      // Execute the update query for user credentials
      let userCred = await pool.promise().execute(updateCredentialQuery);

      return {
        status: 200,
        success: true,
        msg: "User details updated successfully.",
        data: { User, userCred },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong",
        data: error,
      };
    }
  };

  updateUserPasswordService = async (req) => {
    try {
      const body = req.body;
      const user = req.user;
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "User not found",
          data: user,
        };
      }
      // const userLogins = await loginsModel.findOne({ user_id: user._id });
      let loginquery = `
      SELECT *
      FROM lms.logins 
      WHERE user_id ="${user._id}";
      `;
      const [[userLogins]] = await pool.promise().execute(loginquery, []);
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "User credintials not found",
          data: userLogins,
        };
      }

      // const isPasswordMatched = await userLogins.comparePassword( body.oldPassword);
      const isPasswordMatched = await bcrypt.compare(
        body.oldPassword,
        userLogins.password
      );

      if (!isPasswordMatched) {
        return {
          status: 401,
          success: false,
          msg: "Invalid Old Password.",
          data: "",
        };
      }
      // body.newPassword && body.newPssword !== ""
      //   ? (userLogins.password = body.newPassword)
      //   : "";
      // let userCred = await userLogins.save();
      if (
        body.newPassword == null ||
        body.newPassword == undefined ||
        body.newPassword == ""
      ) {
        return {
          status: 400,
          success: false,
          msg: "Please enter valid new password.",
          data: "",
        };
      }
      const bcryptedPassword = await bcrypt.hash(body.newPassword, 10);
      let updatePass = `
        UPDATE lms.logins SET password = "${bcryptedPassword}" WHERE _id = "${userLogins._id}"
      `;
      let userCred = await pool.promise().execute(updatePass);

      return {
        status: 200,
        success: true,
        msg: "Password updated successfully.",
        data: userCred,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update password",
        data: error,
      };
    }
  };

  updateUsernameService = async (req) => {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const user = req.user;
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "User not found",
          data: user,
        };
      }
      const userLogins = await loginsModel.findOne({ user_id: user._id });
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "User credintials not found",
          data: userLogins,
        };
      }

      const userModel =
        req.decoded.role_type == "Admin"
          ? adminModel
          : req.decoded.role_type == "Cluster"
          ? clusterModel
          : req.decoded.role_type == "Manager"
          ? managerModel
          : req.decoded.role_type == "ClusterLead"
          ? clusterLeadModel
          : bdModel;

      let userName;
      if (body.username && body?.username !== user.username) {
        userName = await userModel.findOne(
          {
            username: body.username,
            _id: { $nin: new mongoose.Types.ObjectId(user._id) },
          },
          { name: 1, username: 1, designation: 1 }
        );
      } else {
        return {
          status: 400,
          success: false,
          msg: "Please enter valid username.",
          data: userName,
        };
      }
      if (userName) {
        return {
          status: 400,
          success: false,
          msg: "username already exist.",
          data: userName,
        };
      }

      const updateUser = {
        // name: body?.name ? body?.name : user.name,
        username: body?.username ? body?.username : user?.username,
        // designation: body?.designation ? body?.designation : user?.designation,
        // mobile: body?.mobile ? body?.mobile : user?.mobile,
        // profile_pic: profilePic?.path ? profilePic?.path : body.profilePic,
      };

      // req.file ? (updateUser["profile_pic"] = req.file.path) : "";

      const User = await userModel.updateOne({ _id: user._id }, updateUser);

      const updateUserCredential = {
        // username: body?.username ? body?.username : userLogins.username,
        username: body?.username ? body?.username : userLogins?.username,
        // name: body?.name ? body?.name : userLogins?.name,
      };
      const userCred = await loginsModel.updateOne(
        { user_id: user._id },
        updateUserCredential
      );

      return {
        status: 200,
        success: true,
        msg: "Username updated successfully.",
        data: { User, userCred },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update username.",
        data: error,
      };
    }
  };

  getBranchesService = async (req) => {
    let branchQuery = `
    SELECT _id, admin_id, branch_name, country, state, city, address, pincode, cluster_id, status
    FROM lms.branches
    `;
    const [branches] = await pool.promise().execute(branchQuery, []);
    // await branchModel
    //   .find()
    //   .select( "admin_id branch_name country state city address pincode cluster_id status" );
    if (!branches || branches.length == 0) {
      return {
        status: 400,
        success: false,
        msg: "Branches not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Branches get successfully.",
      data: branches,
    };
  };
}

module.exports = new UserService();
