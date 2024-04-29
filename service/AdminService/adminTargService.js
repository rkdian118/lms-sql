const cron = require('node-cron');
const moment = require('moment');
const fs = require('fs');
const { config } = require('dotenv')
const branchTargetModel = require('../../model/AdminModel/branchTargetModel');
const { generateBranchTarget, generateManagerTarget, generateBDTarget, generateClusterLeadTarget } = require('../../helper/cronHelper');
const bdTargetModel = require('../../model/ManagerModel/bdTargetModel');
const branchModel = require('../../model/AdminModel/branchModel');
const bdModel = require('../../model/BDModel/bdModel');
const clusterLeadModel = require('../../model/ClusterLeadModel/clusterLeadModel');
const { default: mongoose } = require('mongoose');
const clusterLeadTargetModel = require('../../model/ManagerModel/clusterLeadTargetModel');
// const { generateBranchTarget, generateManagerTarget, generateBDTarget } = require('../../helper/cronHelper');
const _ = require("lodash");
const clusterModel = require('../../model/ClusterModel/clusterModel');

let scheduledTask = {};
class AdminTargService {
  // constructor(){
  //   this.scheduledTask = {}
  // }

  async startMonthService(req) {
    try {

      const { start_date_of_month, current_date_of_month } = req.body;
      let date_of_month = current_date_of_month && current_date_of_month !== "" ? new Date(current_date_of_month) : moment();

      let currentDate = moment(date_of_month); //"2023-07-19"
      let date = new Date(start_date_of_month)
      let targetDate = moment(date);

      const targetHr = targetDate.hour();
      const targetMin = targetDate.minute();
      const targetDay = targetDate.date();
      const targetMonth = targetDate.month() + 1; // moment uses 0-based months
      const targetYear = targetDate.year();

      const currentDay = currentDate.date();
      const currentMonth = currentDate.month() + 1; // moment uses 0-based months
      const currentYear = currentDate.year();

      if (
        targetYear === currentYear &&
        targetMonth === currentMonth &&
        targetDay === currentDay
      ) {
        // Use node-cron to schedule the job at the specified time
        // const branchTarg = await generateBranchTarget(req.user._id, currentDate);
        // const ManagerTarg = await generateManagerTarget(req.user._id, currentDate);
        // const ClusterLeadTarg = await generateClusterLeadTarget(req.user._id, currentDate);
        const bdTarg = await generateBDTarget(req.user._id, currentDate, scheduledTask);

        return {
          status: 200,
          success: true,
          msg: "Current month targets created successfully.",
          data: { currentDate: currentDate.toString() },
        };
      } else if (targetDate > currentDate && targetMonth === currentMonth) {

        // Use node-cron to schedule the job at the specified time
        const cronExpression = `${targetMin} ${targetHr} ${targetDay} ${targetMonth} *`;
        // let cronExpression = `23 15 20 9 *`;
        let adminId = req.user._id;
        if (cronExpression && adminId) {
          scheduledTask['taskId'] = cron.schedule(cronExpression, async (req, res, next) => {
            // const branchTarg = await generateBranchTarget(adminId, currentDate);
            // const ManagerTarg = await generateManagerTarget(adminId, currentDate);
            // const ClusterLeadTarg = await generateClusterLeadTarget(adminId, currentDate);
            const bdTarg = await generateBDTarget(adminId, currentDate, scheduledTask);
          });
        }
        const envConfig = config();
        envConfig.parsed.CRONEXP = cronExpression;
        envConfig.parsed.ADMINID = adminId;
        envConfig.parsed.CURRDATE = currentDate;

        const serializedEnv = await Object.keys(envConfig.parsed)
          .map(key => `${key}=${envConfig.parsed[key]}`)
          .join('\n');

        // Write the updated environment variables back to the .env file
        const updatefs = await fs.writeFileSync('.env', serializedEnv);

        return {
          status: 200,
          success: true,
          msg: "Current month targets scheduled successfully.",
          data: { targetDate: targetDate.toString(), currentDate: currentDate.toString() },
        };
      } else {
        return {
          status: 400,
          success: false,
          msg: "Please select valid target date.",
          data: { targetDate: targetDate.toString(), currentDate: currentDate.toString() },
        };
      }
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Something want wrong when start month.",
        data: error,
      };
    }
  }

  async adminGetTargetsService(req) {
    const { page, limit, search, bd_id, targetYear, targetMonth } = req.query;
    const { selectedBDE, selectedCLs, selectedBranches, selectedBHs, selectedMonth, selectedYear, isCLTarget, isBranchTarget, isAdminTarget, } = req.body;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    if (isBranchTarget) {
      let filterTargetYear = [];
      let filterTargetMonth = [];
      let filterBranch = [];
      let filterBranchTarg = [];

      selectedYear
        ? filterTargetYear.push({
          "branchTargetData.target_year": selectedYear,
        })
        : filterTargetYear.push({
          "branchTargetData.target_year": `${new Date().getFullYear()}`,
        });
      selectedMonth && selectedMonth.length > 0
        ? selectedMonth.forEach((item) => {
          filterTargetMonth.push({
            "branchTargetData.target_month": item,
          });
        })
        : "";

      let filterTarg = [];

      selectedBranches && selectedBranches.length > 0 ? selectedBranches.forEach((branch) => {
        filterBranch.push({ _id: new mongoose.Types.ObjectId(branch) });
      }) : "";

      selectedBranches && selectedBranches.length > 0
        ? selectedBranches.forEach((branch) => {
          filterBranchTarg.push({
            $and: [
              {
                "branchTargetData.branch_id":
                  new mongoose.Types.ObjectId(branch),
              },
              // { "branchTargetData.cluster_head_id": req.user._id },
            ],
          });
        })
        : "";
      // filterCLTarg.push({
      //   "branchTargetData.cluster_head_id": req.user._id,
      // });

      filterTargetYear && filterTargetYear.length > 0
        ? filterTarg.push({ $or: filterTargetYear })
        : "";
      filterTargetMonth && filterTargetMonth.length > 0
        ? filterTarg.push({ $or: filterTargetMonth })
        : "";
      filterBranchTarg && filterBranchTarg.length > 0
        ? filterTarg.push({ $or: filterBranchTarg })
        : "";

      let targets = await branchModel.aggregate([
        { $match: filterBranch && filterBranch.length > 0 ? { $or: filterBranch } : {} },
        {
          $lookup: {
            from: "branch_targets",
            localField: "_id",
            foreignField: "branch_id",
            as: "branchTargetData"
          },
        },
        {
          $unwind: {
            path: "$branchTargetData",
            preserveNullAndEmptyArrays: true
          }
        },
        { $sort: { "branchTargetData.month_start_date": 1 } },
        { $match: { $and: filterTarg } }, //[{$or: filterTargetMonth}, {$or: filterTargetYear }] }},
        {
          $group: {
            _id: "$_id",
            name: { $first: "$branch_name" },
            email: { $first: "$country" },
            designation: { $first: "$state" },
            // pincode: { $first: "$pincode" },
            targData: { $push: "$branchTargetData" },
          },
        },
        {
          $project: {
            _id: 1,
            // emp_id: "$_id",
            name: 1,
            email: 1,
            designation: 1,
            targData: 1,
          },
        },
      ])

      return {
        status: 200,
        success: true,
        msg: "Branch targets get successfully.",
        data: targets,
      };

    } else if (isCLTarget) {
      let filterTargetYear = [];
      let filterTargetMonth = [];
      let filterCL = [];
      let filterCLTarg = [];

      selectedYear
        ? filterTargetYear.push({
          "clusterLeadTargData.target_year": selectedYear,
        })
        : filterTargetYear.push({
          "clusterLeadTargData.target_year": `${new Date().getFullYear()}`,
        });
      selectedMonth && selectedMonth.length > 0
        ? selectedMonth.forEach((item) => {
          filterTargetMonth.push({
            "clusterLeadTargData.target_month": item,
          });
        })
        : "";

      // req?.user?._id ? filterCL.push({ cluster_head_id: new mongoose.Types.ObjectId(req?.user?._id) }) : "";

      let filterTarg = [];
      selectedCLs && selectedCLs.length > 0
        ? selectedCLs.forEach((cl) => {
          filterCL.push({ _id: new mongoose.Types.ObjectId(cl) })
        })
        : selectedBHs && selectedBHs.length > 0 ? selectedBHs.forEach((bh_id) => {
          filterCL.push({ cluster_head_id: new mongoose.Types.ObjectId(bh_id) });
        }) : "";
      /// Filter Cluster Lead Target.
      selectedCLs && selectedCLs.length > 0
        ? selectedCLs.forEach((cl) => {
          filterCLTarg.push({
            $and: [
              {
                "clusterLeadTargData.cluster_lead_id":
                  new mongoose.Types.ObjectId(cl),
              },
              // { "clusterLeadTargData.cluster_head_id": req.user._id },
            ],
          });
        })
        : selectedBHs && selectedBHs.length > 0 ? selectedBHs.forEach((bh_id) => {
          filterCLTarg.push({ "clusterLeadTargData.cluster_head_id": new mongoose.Types.ObjectId(bh_id) });
        }) : "";
      // filterCLTarg.push({
      //   "clusterLeadTargData.cluster_head_id": req.user._id,
      // });

      filterTargetMonth && filterTargetMonth.length > 0
        ? filterTarg.push({ $or: filterTargetMonth })
        : "";
      filterTargetYear && filterTargetYear.length > 0
        ? filterTarg.push({ $or: filterTargetYear })
        : "";
      filterCLTarg && filterCLTarg.length > 0
        ? filterTarg.push({ $or: filterCLTarg })
        : "";
      let targets = await clusterLeadModel.aggregate([
        { $match: filterCL && filterCL.length > 0 ? { $or: filterCL } : {} },
        {
          $lookup: {
            from: "cluster_lead_targets",
            localField: "_id",
            foreignField: "cluster_lead_id",
            as: "clusterLeadTargData",
          },
        },
        {
          $unwind: {
            path: "$clusterLeadTargData",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $sort: { "clusterLeadTargData.month_start_date": 1 } },
        { $match: { $and: filterTarg } }, //[{$or: filterTargetMonth}, {$or: filterTargetYear }] }},
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            email: { $first: "$email" },
            designation: { $first: "$designation" },
            targData: { $push: "$clusterLeadTargData" },
          },
        },
        {
          $project: {
            _id: 1,
            // emp_id: "$_id",
            name: 1,
            email: 1,
            designation: 1,
            targData: 1,
          },
        },
      ]);
      return {
        status: 200,
        success: true,
        msg: "Cluster Lead targets get successfully.",
        data: targets,
      };
    } else {
      let filterTargetYear = [];
      let filterTargetMonth = [];
      let filterBDs = [];
      let filterBDTargs = [];

      selectedYear
        ? filterTargetYear.push({ "bdTargData.target_year": selectedYear })
        : filterTargetYear.push({
          "bdTargData.target_year": `${new Date().getFullYear()}`,
        });
      selectedMonth && selectedMonth.length > 0
        ? selectedMonth.forEach((item) => {
          filterTargetMonth.push({ "bdTargData.target_month": item });
        })
        : "";
      // selectedBDE && selectedBDE.length > 0 ? selectedBDE.forEach((bd) => { filterBDs.push({ _id: new mongoose.Types.ObjectId(bd) }) }) : filterBDs.push({ cluster_lead_id: req.user._id });

      // req?.user?._id ? filterCL.push({ _id: new mongoose.Types.ObjectId(req?.user?._id) }) : "";
      let filterTarg = [];
      filterTargetMonth && filterTargetMonth.length > 0
        ? filterTarg.push({ $or: filterTargetMonth })
        : "";
      filterTargetYear && filterTargetYear.length > 0
        ? filterTarg.push({ $or: filterTargetYear })
        : "";
      // filterTarg.push({ 'bdTargData.cluster_head_id': req.user._id })
      selectedBDE && selectedBDE.length > 0
        ? selectedBDE.forEach((bd) => {
          filterBDs.push({ _id: new mongoose.Types.ObjectId(bd) });
        })
        : selectedCLs && selectedCLs.length > 0
          ? selectedCLs.forEach((cl) => {
            filterBDs.push({
              cluster_lead_id: new mongoose.Types.ObjectId(cl),
            });
          })
          : selectedBHs && selectedBHs.length > 0 ? selectedBHs.forEach((bh_id) => {
            filterBDs.push({ cluster_head_id: new mongoose.Types.ObjectId(bh_id) });
          }) : "";
      // filterBDs.push({ cluster_head_id: req.user._id });
      selectedBDE && selectedBDE.length > 0
        ? selectedBDE.forEach((bd) => {
          filterBDTargs.push({
            $and: [
              { "bdTargData.bd_id": new mongoose.Types.ObjectId(bd) },
              // { "bdTargData.cluster_head_id": req.user._id },
            ],
          });
        })
        : selectedCLs && selectedCLs.length > 0
          ? selectedCLs.forEach((cl) => {
            filterBDTargs.push({
              $and: [
                {
                  "bdTargData.cluster_lead_id": new mongoose.Types.ObjectId(cl),
                },
                // { "bdTargData.cluster_head_id": req.user._id },
              ],
            });
          })
          : selectedBHs && selectedBHs.length > 0 ? selectedBHs.forEach((bh_id) => {
            filterBDTargs.push({ "bdTargData.cluster_head_id": new mongoose.Types.ObjectId(bh_id) });
          }) : "";
      // filterBDTargs.push({ "bdTargData.cluster_head_id": req.user._id });
      filterBDTargs && filterBDTargs.length > 0
        ? filterTarg.push({ $or: filterBDTargs })
        : "";
      let targets = await bdModel.aggregate([
        { $match: filterBDs && filterBDs.length > 0 ? { $or: filterBDs } : {} },
        {
          $lookup: {
            from: "bd_targets",
            localField: "_id",
            foreignField: "bd_id",
            as: "bdTargData",
          },
        },
        {
          $unwind: {
            path: "$bdTargData",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $sort: { "bdTargData.month_start_date": 1 } },
        { $match: filterTarg && filterTarg.length > 0 ? { $and: filterTarg } : {} },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            email: { $first: "$email" },
            designation: { $first: "$designation" },
            targData: { $push: "$bdTargData" },
          },
        },
        {
          $project: {
            _id: 1,
            // emp_id: "$_id",
            name: 1,
            email: 1,
            designation: 1,
            targData: 1,
          },
        },
      ]);

      return {
        status: 200,
        success: true,
        msg: "BDE targets get successfully.",
        data: targets,
      };
    }

  }

  async adminGetBdTargetsService(req) {
    const { page, limit, search, bd_id, cluster_lead_id, cluster_head_id, targetYear, targetMonth, } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    // const filtertarget = {};
    // req?.user?._id ? (filtertarget["cluster_head_id"] = req.user._id) : "";
    // // req?.body?.manager_id ? filtertarget['manager_id'] = new mongoose.Types.ObjectId(req.body.manager_id) : "";
    // req?.body?.cluster_lead_id
    //   ? (filtertarget["cluster_lead_id"] = new mongoose.Types.ObjectId(
    //     req.body.cluster_lead_id
    //   ))
    //   : "";
    // req?.body?.bd_id
    //   ? (filtertarget["bd_id"] = new mongoose.Types.ObjectId(req.body.bd_id))
    //   : "";
    // req?.query?.targetYear
    //   ? (filtertarget["target_year"] = req.query.targetYear)
    //   : "";
    // req?.query?.targetMonth
    //   ? (filtertarget["target_month"] = req.query.targetMonth)
    //   : "";

    const filtertarget = [];
    // req?.user?._id ? filtertarget.push({ cluster_head_id: req.user._id }) : "";
    // req?.body?.manager_id ? filtertarget['manager_id'] = new mongoose.Types.ObjectId(req.body.manager_id) : "";
    cluster_head_id
      ? filtertarget.push({
        cluster_head_id: new mongoose.Types.ObjectId(cluster_head_id),
      })
      : "";
    cluster_lead_id
      ? filtertarget.push({
        cluster_lead_id: new mongoose.Types.ObjectId(cluster_lead_id),
      })
      : "";
    bd_id
      ? filtertarget.push({
        bd_id: new mongoose.Types.ObjectId(bd_id),
      })
      : "";

    targetYear ? filtertarget.push({ target_year: targetYear }) : "";
    targetMonth ? filtertarget.push({ target_month: targetMonth }) : "";

    const resultAggregate = bdTargetModel.aggregate([
      {
        $match: filtertarget.length > 0 ? { $and: filtertarget } : {},
      },
      {
        $sort: { month_start_date: 1 },
      },
      {
        $lookup: {
          from: "clusters",
          localField: "cluster_head_id",
          foreignField: "_id",
          as: "clusterData",
        },
      },
      {
        $unwind: {
          path: "$clusterData",
          preserveNullAndEmptyArrays: true,
        },
      },
      // {
      //   $lookup: {
      //     from: "managers",
      //     localField: "manager_id",
      //     foreignField: "_id",
      //     as: "managerData",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$managerData",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
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
        $project: {
          targets: 1,
          prev_month_target: 1,
          total_target: 1,
          completed_target: 1,
          confirm_business: 1,
          remaining_target: 1,
          month_start_date: 1,
          target_month: 1,
          target_year: 1,
          status: 1,
          deleted: 1,
          cluster_head: {
            _id: "$clusterData._id",
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
            profile_pic: "$clusterData.profile_pic",
          },
          // manager: {
          //   _id: "$managerData._id",
          //   emp_id: "$managerData.emp_id",
          //   name: "$managerData.name",
          //   email: "$managerData.email",
          //   designation: "$managerData.designation",
          //   profile_pic: "$managerData.profile_pic",
          // },
          cluster_lead: {
            _id: "$clusterLeadData._id",
            emp_id: "$clusterLeadData.emp_id",
            name: "$clusterLeadData.name",
            email: "$clusterLeadData.email",
            designation: "$clusterLeadData.designation",
            profile_pic: "$clusterLeadData.profile_pic",
          },
          bd: {
            _id: "$bdData._id",
            emp_id: "$bdData.emp_id",
            name: "$bdData.name",
            email: "$bdData.email",
            designation: "$bdData.designation",
            profile_pic: "$bdData.profile_pic",
          },
        },
      },
    ]);
    const bdTarget = await bdTargetModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!bdTarget || bdTarget.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "BDE targets not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "BDE targets get successfully.",
      data: bdTarget,
    };
  }

  async AdminBDTargetDropdownService(req) {
    try {
      const { cluster_lead_id, branch_id, cluster_head_id } = req.body;
      const matchObject = {};
      if (cluster_lead_id && cluster_lead_id.length > 0) {
        let newArray = new Array();
        cluster_lead_id.forEach((cl) => {
          newArray.push(new mongoose.Types.ObjectId(cl));
        })
        matchObject.cluster_lead_id = { $in: newArray };
      }

      if (branch_id && branch_id.length > 0) {
        let newArray = new Array();
        branch_id.forEach((cl) => {
          newArray.push(new mongoose.Types.ObjectId(cl));
        })
        matchObject.branch_id = { $in: newArray };
      }

      if (cluster_head_id && cluster_head_id.length > 0) {
        let newArray = new Array();
        cluster_head_id.forEach((cl) => {
          newArray.push(new mongoose.Types.ObjectId(cl));
        })
        matchObject.cluster_head_id = { $in: newArray };
      }
      const dropdown = await bdTargetModel.aggregate([
        {
          $match: matchObject,
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
            designation: { $first: "$bdData.designation" },
            cluster_lead_id: { $first: "$cluster_lead_id" },
            cluster_head_id: { $first: "$cluster_head_id" },
            branch_id: { $first: "$branch_id" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
            cluster_lead_id: 1,
            cluster_head_id: 1,
            branch_id: 1,
          },
        },
      ]);



      const matchObj = {}
      if (cluster_lead_id && cluster_lead_id.length > 0) {
        let newArray = new Array();
        cluster_lead_id.forEach((cl) => {
          newArray.push(new mongoose.Types.ObjectId(cl));
        })
        matchObj.cluster_lead_id = { $in: newArray };
      }

      if (branch_id && branch_id.length > 0) {
        const objectIdArray = branch_id.map(id => new mongoose.Types.ObjectId(id));
        matchObj["clusterData.branch_id"] = { $in: objectIdArray };
      }
      if (cluster_head_id && cluster_head_id.length > 0) {
        let newArray = new Array();
        cluster_head_id.forEach((cl) => {
          newArray.push(new mongoose.Types.ObjectId(cl));
        })
        matchObj.cluster_head_id = { $in: newArray };
      }

      const dropDownBDE = await bdModel.aggregate([
        {
          $lookup: {
            from: "clusters",
            localField: "cluster_head_id",
            foreignField: "_id",
            as: "clusterData",
          },
        },
        {
          $unwind: {
            path: "$clusterData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: matchObj,
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            designation: { $first: "$designation" },
            cluster_lead_id: { $first: "$cluster_lead_id" },
            cluster_head_id: { $first: "$cluster_head_id" },
            branch_id: { $first: "$clusterData.branch_id" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
            cluster_lead_id: 1,
            cluster_head_id: 1,
            branch_id: 1,
          },
        },
      ])

      const concatArray = await dropdown.concat(dropDownBDE)
      const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.name)
      return {
        status: 200,
        success: true,
        msg: "BD dropdown get success.",
        data: finalResult,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Achived BDE Target service.",
        data: error,
      };
    }
  }

  async AdminCLTargetDropdownService(req) {
    try {
      let { branch_id, cluster_head_id } = req.body;
      const matchObject = {};
      if (branch_id && branch_id.length > 0) {
        let newArray = new Array();
        branch_id.forEach((b_id) => {
          newArray.push(new mongoose.Types.ObjectId(b_id));
        })
        matchObject.branch_id = { $in: newArray };
      }

      if (cluster_head_id && cluster_head_id.length > 0) {
        let newArray = new Array();
        cluster_head_id.forEach((ch) => {
          newArray.push(new mongoose.Types.ObjectId(ch));
        })
        matchObject.cluster_head_id = { $in: newArray };
      }

      const dropdown = await clusterLeadTargetModel.aggregate([
        {
          $match: matchObject,
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
            branch_id: { $first: "$branch_id" },
            cluster_head_id: { $first: "$cluster_head_id" },
            designation: { $first: "$clusterLeadData.designation" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
            branch_id: 1,
            cluster_head_id: 1,
          },
        },
      ]);


      const dropDownBDE = await clusterLeadModel.aggregate([
        {
          $match: matchObject,
        },
        {
          $lookup: {
            from: "clusters",
            localField: "cluster_head_id",
            foreignField: "_id",
            as: "clusterData",
          },
        },
        {
          $unwind: {
            path: "$clusterData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            branch_id: { $first: "$clusterData.branch_id" },
            cluster_head_id: { $first: "$clusterData._id" },
            designation: { $first: "$designation" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
            branch_id: 1,
            cluster_head_id: 1,
          },
        },
      ])



      const concatArray = await dropdown.concat(dropDownBDE)
      const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.name)

      return {
        status: 200,
        success: true,
        msg: "CL dropdown get success.",
        data: finalResult,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Achived BDE Target service.",
        data: error,
      };
    }
  }

  async AdminClusterTargetDropdownService(req) {
    try {
      let { branch_id } = req.body;
      const matchObject = {};
      if (branch_id && branch_id.length > 0) {
        let newArray = new Array();
        await branch_id.forEach((cl) => {
          newArray.push(new mongoose.Types.ObjectId(cl));
        })
        matchObject.branch_id = { $in: newArray };
      }


      const dropdown = await branchTargetModel.aggregate([
        {
          $match: matchObject,
        },
        {
          $lookup: {
            from: "clusters",
            localField: "cluster_head_id",
            foreignField: "_id",
            as: "clusterData",
          },
        },
        {
          $unwind: {
            path: "$clusterData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$clusterData._id",
            branch_id: { $first: "$branch_id" },
            name: { $first: "$clusterData.name" },
            designation: { $first: "$clusterData.designation" },
          },
        },
        {
          $project: {
            _id: 1,
            branch_id: 1,
            name: 1,
            designation: 1,
          },
        },
      ]);

      const dropDownBDE = await clusterModel.find(matchObject).select("_id branch_id name designation")

      const concatArray = await dropdown.concat(dropDownBDE)
      const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.name)

      return {
        status: 200,
        success: true,
        msg: "CL dropdown get success.",
        data: finalResult,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Achived BDE Target service.",
        data: error,
      };
    }
  }

  async AdminBranchTargetDropdownService(req) {
    try {
      const matchObject = {};
      const dropdown = await branchTargetModel.aggregate([
        {
          $match: matchObject,
        },
        {
          $lookup: {
            from: "branches",
            localField: "branch_id",
            foreignField: "_id",
            as: "branchData",
          },
        },
        {
          $unwind: {
            path: "$branchData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$branchData._id",//"$_id",
            cluster_head_id: { $first: "$branchData.cluster_id" },
            branch_name: { $first: "$branchData.branch_name" },
            country: { $first: "$branchData.country" },
            state: { $first: "$branchData.state" },
            city: { $first: "$branchData.city" },
          },
        },
        {
          $project: {
            _id: 1,
            cluster_head_id: 1,
            branch_name: 1,
            country: 1,
            state: 1,
            city: 1,
          },
        },
      ]);

      const dropDownBDE = await branchModel.find(matchObject).select("_id cluster_id as cluster_head_id branch_name country status city")//.populate("cluster_id, name email designation");
      const concatArray = await dropdown.concat(dropDownBDE)
      const finalResult = _.uniqBy(concatArray, obj => obj._id + obj.branch_name)

      return {
        status: 200,
        success: true,
        msg: "Branch dropdown get success.",
        data: finalResult,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Achived BDE Target service.",
        data: error,
      };
    }
  }

  async getBranchTargetsService(req) {
    const { page, limit, search } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const filtertarget = {};
    // req?.user?._id ? filtertarget['cluster_head_id'] = req.user._id : "";
    // req?.body?.manager_id ? filtertarget['manager_id'] = new mongoose.Types.ObjectId(req.body.manager_id) : "";
    req?.query?.targetYear ? filtertarget['target_year'] = req.query.targetYear : "";
    req?.query?.targetMonth ? filtertarget['target_month'] = req.query.targetMonth : "";


    const resultAggregate = branchTargetModel.aggregate([
      // {
      //   $match: filtertarget,
      //   // {
      //   //   cluster_head_id: req.user._id,
      //   // },
      // },
      {
        $lookup: {
          from: "branches",
          localField: "branch_id",
          foreignField: "_id",
          as: "branchData",
        },
      },
      {
        $unwind: {
          path: "$branchData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          ...filtertarget,
          $or: [
            { "branchData.branch_name": { $regex: search ? search : "", $options: 'i' } }, // Case-insensitive search for branch_name
          ],
        },
      },
      {
        $lookup: {
          from: "clusters",
          localField: "cluster_head_id",
          foreignField: "_id",
          as: "branchHeadData",
        },
      },
      {
        $unwind: {
          path: "$branchHeadData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          cluster_head_id: 1,
          admin_id: 1,
          targets: 1,
          prev_month_target: 1,
          total_target: 1,
          completed_target: 1,
          remaining_target: 1,
          assigned_targets: 1,
          month_start_date: 1,
          target_month: 1,
          target_year: 1,
          status: 1,
          deleted: 1,
          branch: {
            _id: "$branchData._id",
            branch_name: "$branchData.branch_name",
          },
          branchHeadData: "$branchHeadData"
        },
      },
    ]);
    const branchTarget = await branchTargetModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!branchTarget || branchTarget.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Branch targets not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Branch targets get successfully.",
      data: branchTarget,
    };
  }

  async getBranchTargetDetailService(req, branch_id, target_id) {
    // const { _id } = req.query;
    const targetDetail = await branchTargetModel
      .findOne(
        {
          $and: [
            { _id: target_id },
            // { branch_id: branch_id },
          ]
        },
        {
          _id: 1,
          cluster_head_id: 1,
          admin_id: 1,
          branch_id: 1,
          targets: 1,
          prev_month_target: 1,
          total_target: 1,
          completed_target: 1,
          remaining_target: 1,
          assigned_targets: 1,
          month_start_date: 1,
          target_month: 1,
          target_year: 1,
          status: 1,
          deleted: 1,
        }
      )
      .populate("admin_id", "emp_id name email designation")
      .populate("branch_id", "branch_name country state city address")

    // return

    if (!targetDetail || targetDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Branch Target detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Branch Target detail get successfully.",
      data: targetDetail,
    };
  }

  async updateBranchTargetService(req) {
    try {
      const body = req.body;

      const branchTarget = await branchTargetModel.findOne({ _id: body.target_id });
      if (!branchTarget) {
        return {
          status: 400,
          success: false,
          msg: "Branch targets not found",
          data: branchTarget,
        };
      }

      let date = moment(); //"2023-07-19"
      if (date.toDate() == "Invalid Date") {
        return {
          status: 400,
          success: false,
          msg: "Date not found.",
          data: date.toString(),
        };
      }
      let currentMonth = date.format('MMMM');
      let currentMonthYear = date.year();
      let currMonth = date.month();

      let preMonth = currMonth - 1;
      let previousMonthYear = currentMonthYear

      if (preMonth < 0) {
        preMonth = 11;
        previousMonthYear -= 1;
      }

      let preMonthDate = moment([previousMonthYear, preMonth, 1]);
      let previousMonth = preMonthDate.format('MMMM');

      if (branchTarget.target_month == currentMonth) {
        body.targets !== "" ? (branchTarget.targets = body.targets) : "";
        branchTarget?.total_target !== "" ? (branchTarget.total_target = (body.targets + branchTarget.prev_month_target)) : "";
        branchTarget?.remaining_target !== "" ? (branchTarget.remaining_target = branchTarget.total_target - branchTarget.completed_target) : "";

        const updatebranchTarget = await branchTarget.save();

        return {
          status: 200,
          success: true,
          msg: "Current month branch target updated successfully.",
          data: updatebranchTarget,
        };
      } else if (branchTarget.target_month == previousMonth) {
        body.targets !== "" ? (branchTarget.targets = body.targets) : "";
        branchTarget?.total_target !== "" ? (branchTarget.total_target = (body.targets + branchTarget.prev_month_target)) : "";
        branchTarget?.remaining_target !== "" ? (branchTarget.remaining_target = branchTarget.total_target - branchTarget.completed_target) : "";

        const updatebranchTarget = await branchTarget.save();

        let currMonBranchTarg = await branchTargetModel.findOne({ $and: [{ branch_id: branchTarget.branch_id }, { target_month: currentMonth }] });

        if (currMonBranchTarg) {
          currMonBranchTarg?.prev_month_target !== "" ? (currMonBranchTarg.prev_month_target = (updatebranchTarget.remaining_target)) : "";
          currMonBranchTarg?.total_target !== "" ? (currMonBranchTarg.total_target = (currMonBranchTarg.targets + currMonBranchTarg.prev_month_target)) : "";
          currMonBranchTarg?.remaining_target !== "" ? (currMonBranchTarg.remaining_target = currMonBranchTarg.total_target - currMonBranchTarg?.completed_target) : "";

          const updatecurrMonBranchTarg = await currMonBranchTarg.save();
        }
        return {
          status: 200,
          success: true,
          msg: "Previous month branch target updated successfully.",
          data: updatebranchTarget,
        };
      } else {
        return {
          status: 400,
          success: false,
          msg: "You only have permissions to update the target for the current month and previous month.",
          data: branchTarget,
        };
      }

    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Branch target service.",
        data: error,
      };
    }
  };
}

const adminTargServiceInstance = new AdminTargService();

module.exports = {
  adminTargServiceInstance,
  scheduledTask,
};