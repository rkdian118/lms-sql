const { default: mongoose } = require("mongoose");
const helperFunctions = require("../../helper/helperFun");
const bdModel = require("../../model/BDModel/bdModel");
const countryLeadModel = require("../../model/CountryLeadModel/countryLeadModel.js");
const loginsModel = require("../../model/loginsModel");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const _ = require("lodash");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");
const countries = require("countries-list").countries;
let countriesList = require("countries-list");
class ClusterLeadService {
  async createCountryLeadService(req) {
    try {
      const body = req.body;
      if (!req.file) {
        return next(new ErrorHandler("Profile picture not found.", 400, {}));
        // return res.json({ "ResponseCode": 400, "ResponseMessage": "Profile picture not found.", "succeeded": false, "ResponseBody": {} })
      }
      const profilePic = req.file;
      const clusterLead = await countryLeadModel.findOne({ email: body.email });
      if (clusterLead) {
        return {
          status: 400,
          success: false,
          msg: "Country Lead email already exist.",
          data: "",
        };
      }
      const logins = await loginsModel.findOne({ username: body.username });
      if (logins) {
        return {
          status: 400,
          success: false,
          msg: "Country Lead username already exist.",
          data: "",
        };
      }
      const uniqueId = await helperFunctions.uniqueKey();
      const secret_key = await helperFunctions.generateSecretKey();

      const formData = countryLeadModel({
        admin_id: req.user._id,
        // manager_id: body.manager_id,
        emp_id: body.emp_id,
        unique_id: uniqueId,
        name: body.name,
        username: body.username,
        email: body.email,
        designation: body.designation,
        mobile: body.mobile,
        country_code: body.country_code,
        continent_code: body.continent_code,
        profile_pic: profilePic.path,
        secret_key: secret_key,
      });
      return await formData.save().then((data) => {
        return {
          status: 201,
          success: true,
          msg: "Country Lead create successfully.",
          data: data,
        };
      }).catch((err) => {
        return {
          status: 500,
          success: false,
          msg: "Something want wrong when create Country Lead.",
          data: err,
        };
      });
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Somethin went wrong",
        data: error,
      };
    }
  }

  async createCountryLeadCredentialService(req, countryLead) {
    try {
      const body = req.body;
      const loginData = loginsModel({
        user_id: countryLead._id,
        unique_id: countryLead.unique_id,
        name: countryLead.name,
        email: countryLead.email,
        username: body.username,
        password: body.password,
        role_type: "CountryLead",
        secret_key: countryLead.secret_key,
      });
      return await loginData.save().then(async (result) => {
        return {
          status: 201,
          success: true,
          msg: "Country Lead Credential created successfully.",
          data: { user: countryLead, role_type: result.role_type },
        };
      }).catch(async (err) => {
        const deletecountryLead = await countryLeadModel.deleteOne({
          _id: countryLead._id,
        });
        return {
          status: 500,
          success: false,
          msg: "Something want wrong when create credential.",
          data: err,
        };
      });
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Something went wrong when create Cluster Lead credentials",
        data: error,
      };
    }
  }

  async getCountryLeadsService(req) {
    const { page, limit, search, manager_id } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };
    // Create an empty match query
    const matchQuery = {};
    let userFilter = [];

    req?.user?._id ? userFilter.push({ admin_id: req.user._id }) : "";
    // manager_id ? userFilter.push({ manager_id: new mongoose.Types.ObjectId(manager_id) }) : "";
    // If the search parameter is provided, add filters for client_name and client_email
    if (search) {
      matchQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { country_code: { $regex: search, $options: "i" } },
        { continent_code: { $regex: search, $options: "i" } },
      ];
    }

    const resultAggregate = countryLeadModel.aggregate([
      {
        $match: { $and: userFilter, ...matchQuery },
      },
      {
        $lookup: {
          from: "admins",
          localField: "admin_id",
          foreignField: "_id",
          as: "adminData",
        },
      },
      {
        $unwind: {
          path: "$adminData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          emp_id: 1,
          unique_id: 1,
          name: 1,
          username: 1,
          email: 1,
          designation: 1,
          mobile: 1,
          country_code: 1,
          continent_code: 1,
          profile_pic: 1,
          secret_key: 1,
          status: 1,
          deleted: 1,
          assigned_targets: 1,
          admin: {
            _id: "$adminData._id",
            emp_id: "$adminData.emp_id",
            name: "$adminData.name",
            username: "$adminData.username",
            email: "$adminData.email",
            designation: "$adminData.designation",
          },
        },
      },
      {
        $sort: { status: 1, name: 1 },
      },
    ]);
    const countryLead = await countryLeadModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!countryLead || countryLead.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Country Lead not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Country Lead get successfully.",
      data: countryLead,
    };
  }

  async getCountryLeadDetailService(req, country_lead_id) {
    // const { _id } = req.query;
    const countryLeadDetail = await countryLeadModel
      .findOne(
        {
          $and: [{ _id: country_lead_id }], //, { admin_id: req?.user?._id }
        },
        {
          admin_id: 1,
          // manager_id: 1,
          emp_id: 1,
          unique_id: 1,
          name: 1,
          username: 1,
          email: 1,
          designation: 1,
          mobile: 1,
          continent_code: 1,
          country_code: 1,
          profile_pic: 1,
          secret_key: 1,
          status: 1,
          delete: 1,
        }
      )
      .populate("admin_id", "emp_id name username email designation");
    // .populate("manager_id", "emp_id name username email designation")
    // return

    if (!countryLeadDetail || countryLeadDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Country Lead detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Country Lead detail get successfully.",
      data: countryLeadDetail,
    };
  }

  async updatecountryLeadService(req) {
    try {
      const body = req.body;
      // const profilePic = req.file;

      const user = await countryLeadModel.findOne({
        _id: body.country_lead_id,
      });
      if (!user) {
        return {
          status: 400,
          success: false,
          msg: "Country Lead not found",
          data: user,
        };
      }
      const userLogins = await loginsModel.findOne({
        user_id: body.country_lead_id,
      });
      if (!userLogins) {
        return {
          status: 400,
          success: false,
          msg: "Country Lead credintials not found",
          data: userLogins,
        };
      }

      let userEmail;
      if (body?.email !== user.email) {
        userEmail = await countryLeadModel.findOne(
          { email: body.email },
          { name: 1, email: 1, designation: 1 }
        );
      }
      if (userEmail) {
        return {
          status: 400,
          success: false,
          msg: "Country Lead email already exist.",
          data: userEmail,
        };
      }

      const updatecountryLead = {};

      body?.name ? (updatecountryLead["name"] = body.name) : "";
      body?.email ? (updatecountryLead["email"] = body.email) : "";
      body?.designation ? (updatecountryLead["designation"] = body.designation) : "";
      body?.mobile ? (updatecountryLead["mobile"] = body.mobile) : "";
      // body?.country_code767 ? (updatecountryLead["country_code"] = body.country_code) : "";
      // body?.continent_code ? (updatecountryLead["continent_code"] = body.continent_code) : "";
      req.file ? (updatecountryLead["profile_pic"] = req.file.path) : "";

      const countryLead = await countryLeadModel.updateOne(
        { _id: body.country_lead_id },
        updatecountryLead
      );

      const updatecountryLeadCredential = {
        // username: body?.username ? body?.username : userLogins.username,
        // email: body?.email ? body?.email : userLogins?.email,
      };
      body.name ? (userLogins.name = body.name) : "";
      body.email ? (userLogins.email = body.email) : "";
      body.password ? (userLogins.password = body.password) : "";

      const countryLeadCred = await userLogins.save();
      // await loginsModel.updateOne(
      //   { user_id: body._id },
      //   updatecountryLeadCredential
      // );

      return {
        status: 200,
        success: true,
        msg: "Country Lead details updated successfully.",
        data: { countryLead },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Country Lead service.",
        data: error,
      };
    }
  }

  async countryLeadStatusChangeService(req) {
    try {
      const { country_lead_id, status } = req.body;
      //   const isBDcountryLead = await isBDcountryLeadService(country_lead_id);

      //   // if (!bdDetail || bdDetail.length === 0) {
      //   // if (isBDcountryLead.success && isBDcountryLead.data.length > 0) {
      //   if (isBDcountryLead.success && status == 3) {
      //     return {
      //       status: 400,
      //       success: false,
      //       msg: `Country Lead can't be deleted. BDE's assigned to this Country Lead.`,
      //       data: isBDcountryLead.data,
      //     };
      //   }
      // }
      // const { _id } = req.query;
      const checkcountryLead =
        await countryLeadInstance.getCountryLeadDetailService(
          req,
          country_lead_id
        );
      if (!checkcountryLead?.success) {
        return {
          status: 200,
          success: false,
          msg: "Country Lead not found.",
          data: "",
        };
      }

      const updateStatus = await countryLeadModel.updateOne(
        {
          _id: checkcountryLead?.data._id,
        },
        {
          status: status,
        }
      );
      const countryLeadStatus =
        status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete";
      return {
        status: 200,
        success: true,
        msg: `Country Lead ${countryLeadStatus}d successfully.`,
        data: updateStatus,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //`Something went wrong when update Country Lead status.`,
        data: error,
      };
    }
  }

  async getCountriesWithContinentCodes(continent) {

    const allCountries = Object.keys(countriesList.countries);
    const continentCountries = new Array();
    allCountries.forEach(async (country) => {
      const countryInfo = await countriesList.getCountryData(country);
      if (countryInfo && countryInfo.continent === continent) {
        continentCountries.push(countryInfo.name);
      }
    });

    return continentCountries;

    // const countriesWithContinentCodes = {};

    // // Iterate through each country
    // for (const countryCode in countries) {
    //   const countryInfo = countries[countryCode];
    //   const continentCode = countryInfo.continent;

    //   // Check if the continent code already exists in the result object
    //   if (!countriesWithContinentCodes[continentCode]) {
    //     // If not, create a new array for the continent code
    //     countriesWithContinentCodes[continentCode] = [];
    //   }

    //   // Add the country to the corresponding continent code array
    //   countriesWithContinentCodes[continentCode].push({
    //     code: countryCode,
    //     name: countryInfo.name,
    //   });
    // }

    // return countriesWithContinentCodes;
  }

  //Other API's.
  async getDropdownclusterLeadsService(req) {
    const clusterLeads = await clusterLeadModel
      .find({
        $and: [
          { cluster_head_id: req.user._id },
          { status: "1" },
          // { manager_id: req.body.manager_id }
        ],
      })
      .select({ _id: 1, emp_id: 1, name: 1, email: 1, designation: 1 });

    const dropdown = await clusterLeadTargetModel.aggregate([
      {
        $match: {
          $and: [
            { cluster_head_id: req.user._id },
            // { status: "1" },
            // { manager_id: req.body.manager_id }
          ],
        },
      },
      {
        $lookup: {
          from: "cluster_leads",
          localField: "cluster_lead_id",
          foreignField: "_id",
          as: "clusterLeadData",
        },
      },
      {
        $unwind: {
          path: "$clusterLeadData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$clusterLeadData._id",
          name: { $first: "$clusterLeadData.name" },
          designation: { $first: "$clusterLeadData.designation" },
          emp_id: { $first: "$clusterLeadData.emp_id" },
          email: { $first: "$clusterLeadData.email" },
          // cluster_lead_id: { $first: "$clusterLeadData.cluster_lead_id" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          emp_id: 1,
          email: 1,
          designation: 1,
        },
      },
    ]);

    const concatArray = await dropdown.concat(clusterLeads)
    const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.name)
    return {
      status: 200,
      success: true,
      msg: "Cluster Leads get successfully.",
      data: finalResult,
    };
  }

  async getDropdownBDEsService(req) {
    const { selectedCL } = req.body;
    let filterBDE = [];
    selectedCL && selectedCL.length > 0
      ? selectedCL.forEach((cl) => {
        filterBDE.push({ cluster_lead_id: new mongoose.Types.ObjectId(cl) });
      })
      : filterBDE.push({ cluster_head_id: req.user._id });

    const BDEs = await bdModel
      .find({
        $or: filterBDE,
        status: "1",
      })
      .select({ _id: 1, emp_id: 1, name: 1, email: 1, designation: 1, cluster_lead_id: 1 });

    const dropdown = await bdTargetModel.aggregate([
      {
        $match: {
          $or: filterBDE,
        },
      },
      {
        $lookup: {
          from: "businesses",
          localField: "bd_id",
          foreignField: "_id",
          as: "bdData",
        },
      },
      {
        $unwind: {
          path: "$bdData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$bdData._id",
          name: { $first: "$bdData.name" },
          emp_id: { $first: "$bdData.emp_id" },
          email: { $first: "$bdData.email" },
          designation: { $first: "$bdData.designation" },
          cluster_lead_id: { $first: "$cluster_lead_id" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          emp_id: 1,
          designation: 1,
          cluster_lead_id: 1,
        },
      },
    ]);

    const concatArray = await dropdown.concat(BDEs)
    const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.name)
    return {
      status: 200,
      success: true,
      msg: "BDEs Dropdown list get successfully.",
      data: finalResult,
    };
  }

  async checkclusterLeadTargets(cluster_lead_id, year, month) {
    try {
      const checkclusterLeadTarget = await clusterLeadTargetModel.find({
        $and: [
          { _id: cluster_lead_id },
          { target_month: month },
          { target_year: year },
        ],
      });

      if (!checkclusterLeadTarget) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead target not found for this month.",
          data: checkclusterLeadTarget,
        };
      }

      return {
        status: 200,
        success: true,
        msg: "Cluster Lead target get successfully.",
        data: checkclusterLeadTarget,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something want's wrong when check assign target's to the Cluster Lead.",
        data: "",
      };
    }
  }
}
const countryLeadInstance = new ClusterLeadService();
module.exports = new ClusterLeadService();
