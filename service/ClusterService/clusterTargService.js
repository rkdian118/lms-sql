const { default: mongoose } = require("mongoose");
const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const managerModel = require("../../model/ManagerModel/managerModel");
const managerTargetModel = require("../../model/ManagerModel/managerTargetModel");
const loginsModel = require("../../model/loginsModel");
const { isBDManagerService } = require("./clusterBDService");
const moment = require("moment");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");
const {
  updateCurrMonBDTarg,
  completeBDTargetService,
} = require("../BDService/bdTargService");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const _ = require("lodash")
class ClusterTargtService {
  async getClusterLeadsTargetService(req) {
    const { page, limit, search } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const filtertarget = {};
    req?.user?._id ? (filtertarget["cluster_head_id"] = req.user._id) : "";
    req?.body?.cluster_lead_id
      ? (filtertarget["cluster_lead_id"] = new mongoose.Types.ObjectId(
        req.body.cluster_lead_id
      ))
      : "";
    req?.query?.targetYear
      ? (filtertarget["target_year"] = req.query.targetYear)
      : "";
    req?.query?.targetMonth
      ? (filtertarget["target_month"] = req.query.targetMonth)
      : "";

    const resultAggregate = clusterLeadTargetModel.aggregate([
      {
        $match: filtertarget,
        // {
        //   cluster_head_id: req.user._id,
        // },
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
        $project: {
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
          cluster_head: {
            _id: "$clusterData._id",
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
            profile_pic: "$clusterData.profile_pic",
          },
          clusterLead: {
            _id: "$clusterLeadData._id",
            emp_id: "$clusterLeadData.emp_id",
            name: "$clusterLeadData.name",
            email: "$clusterLeadData.email",
            designation: "$clusterLeadData.designation",
            profile_pic: "$clusterLeadData.profile_pic",
          },
        },
      },
    ]);
    const clusterLeadTarget = await clusterLeadTargetModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!clusterLeadTarget || clusterLeadTarget.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Lead targets not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster Lead targets get successfully.",
      data: clusterLeadTarget,
    };
  }

  async getClusterLeadTargetDetailService(req, cluster_lead_id, target_id) {
    // const { _id } = req.query;
    const targetDetail = await clusterLeadTargetModel
      .findOne(
        {
          $and: [
            { _id: target_id },
            { cluster_lead_id: cluster_lead_id },
            { cluster_head_id: req.user._id },
          ],
        },
        {
          cluster_head_id: 1,
          cluster_lead_id: 1,
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
      .populate("cluster_head_id", "emp_id name email designation")
      .populate("cluster_lead_id", "emp_id name email designation");

    // return

    if (!targetDetail || targetDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Lead Target detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster Lead Target detail get successfully.",
      data: targetDetail,
    };
  }

  async updateClusterLeadTargetService(req) {
    try {
      const body = req.body;

      const clusterLeadTarget = await clusterLeadTargetModel.findOne({
        _id: body.target_id,
      });
      if (!clusterLeadTarget) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead targets not found",
          data: clusterLeadTarget,
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
      let currentMonth = date.format("MMMM");
      let currentMonthYear = date.year();
      let currMonth = date.month();

      let preMonth = currMonth - 1;
      let previousMonthYear = currentMonthYear;

      if (preMonth < 0) {
        preMonth = 11;
        previousMonthYear -= 1;
      }

      let preMonthDate = moment([previousMonthYear, preMonth, 1]);
      let previousMonth = preMonthDate.format("MMMM");
      let addTarg = body.targets - clusterLeadTarget.targets;

      if (clusterLeadTarget.target_month == currentMonth) {
        body?.targets !== "" ? (clusterLeadTarget.targets = body.targets) : "";
        clusterLeadTarget?.total_target !== ""
          ? (clusterLeadTarget.total_target =
            body.targets + clusterLeadTarget.prev_month_target)
          : "";
        clusterLeadTarget?.remaining_target !== ""
          ? (clusterLeadTarget.remaining_target =
            clusterLeadTarget.total_target -
            clusterLeadTarget.completed_target)
          : "";

        const updateclusterLeadTarget = await clusterLeadTarget.save();
        if (updateclusterLeadTarget) {
          const branchTarget = await branchTargetModel.findOne({
            $and: [
              { branch_id: updateclusterLeadTarget.branch_id },
              { target_month: currentMonth },
            ],
          });
          if (branchTarget) {
            branchTarget.assigned_targets =
              branchTarget.assigned_targets + addTarg;
            let updateBranchTarg = await branchTarget.save();
          }
        }

        return {
          status: 200,
          success: true,
          msg: "Current month Cluster Lead target updated successfully.",
          data: updateclusterLeadTarget,
        };
      } else if (clusterLeadTarget.target_month == previousMonth) {
        body?.targets !== "" ? (clusterLeadTarget.targets = body.targets) : "";
        clusterLeadTarget?.total_target !== ""
          ? (clusterLeadTarget.total_target =
            body.targets + clusterLeadTarget.prev_month_target)
          : "";
        clusterLeadTarget?.remaining_target !== ""
          ? (clusterLeadTarget.remaining_target =
            clusterLeadTarget.total_target -
            clusterLeadTarget.completed_target)
          : "";

        const updateclusterLeadTarget = await clusterLeadTarget.save();

        if (updateclusterLeadTarget) {
          const branchTarget = await branchTargetModel.findOne({
            $and: [
              { branch_id: updateclusterLeadTarget.branch_id },
              { target_month: previousMonth },
            ],
          });
          if (branchTarget) {
            branchTarget.assigned_targets =
              branchTarget.assigned_targets + addTarg;
            let updateBranchTarg = await branchTarget.save();
          }
        }

        let currMonclusterLeadTarg = await clusterLeadTargetModel.findOne({
          $and: [
            { clusterLead_id: clusterLeadTarget.clusterLead_id },
            { target_month: currentMonth },
          ],
        });

        if (currMonclusterLeadTarg) {
          currMonclusterLeadTarg?.prev_month_target !== ""
            ? (currMonclusterLeadTarg.prev_month_target =
              updateclusterLeadTarget.remaining_target)
            : "";
          currMonclusterLeadTarg?.total_target !== ""
            ? (currMonclusterLeadTarg.total_target =
              currMonclusterLeadTarg.targets +
              currMonclusterLeadTarg.prev_month_target)
            : "";
          currMonclusterLeadTarg?.remaining_target !== ""
            ? (currMonclusterLeadTarg.remaining_target =
              currMonclusterLeadTarg.total_target -
              currMonclusterLeadTarg?.completed_target)
            : "";

          const updatecurrMonclusterLeadTarg =
            await currMonclusterLeadTarg.save();
        }
        return {
          status: 200,
          success: true,
          msg: "Previous month Cluster Lead target updated successfully.",
          data: updateclusterLeadTarget,
        };
      } else {
        return {
          status: 400,
          success: false,
          msg: "You only have permissions to update the target for the current month and previous month.",
          data: clusterLeadTarget,
        };
      }
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Team Lead target service.",
        data: error,
      };
    }
  }

  // async assignClusterLeadTargetService(req) {
  //   try {
  //     let { cluster_lead_id, newTarg = 0 } = req.body;
  //     let cluster_head_id = req.user._id;
  //     let date = moment("2023-05-04");
  //     if (date.toDate() == "Invalid Date") {
  //       return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Date not found", "succeeded": true, "ResponseData": date.toString() });
  //     }
  //     let currentMonth = date.format('MMMM');
  //     let currentMonthYear = date.year();
  //     let currMonth = date.month();

  //     let preMonth = currMonth - 1;
  //     let previousMonthYear = currentMonthYear

  //     if (preMonth < 0) {
  //       preMonth = 11;
  //       previousMonthYear -= 1;
  //     }

  //     let preMonthDate = moment([previousMonthYear, preMonth, 1]);
  //     let previousMonth = preMonthDate.format('MMMM');

  //     const currMonthTarg = await clusterLeadTargetModel.findOne({ $and: [{ cluster_lead_id: new mongoose.Types.ObjectId(cluster_lead_id) }, { target_month: currentMonth }, { target_year: currentMonthYear }] });

  //     if (currMonthTarg) {
  //       // const updateTarg = newTarg - currTarg;
  //       // currMonthTarg?.assigned_targets ? currMonthTarg.assigned_targets = currMonthTarg.assigned_targets + updateTarg : currMonthTarg["assigned_targets"] = 0 + updateTarg

  //       // let saveTarg = await currMonthTarg.save();
  //       return {
  //         status: 200,
  //         success: true,
  //         msg: "Current month Cluster Lead targets already assigned.",
  //         data: currMonthTarg,
  //       };
  //     }
  //     let targets = newTarg || 0;
  //     let prev_month_target = 0;
  //     let total_target = 0;
  //     let completed_target = 0;
  //     let remaining_target = 0;
  //     let assigned_targets = 0; //newTarg;
  //     let target_month = currentMonth;
  //     let target_year = currentMonthYear;

  //     const preMonthTarg = await clusterLeadTargetModel.findOne({ $and: [{ cluster_lead_id: new mongoose.Types.ObjectId(cluster_lead_id) }, { target_month: previousMonth }, { target_year: previousMonthYear }] });

  //     if (preMonthTarg && preMonthTarg !== "") {
  //       targets = await newTarg;
  //       prev_month_target = await preMonthTarg.remaining_target;
  //       total_target = await targets + prev_month_target;
  //       completed_target = completed_target;
  //       remaining_target = await total_target - completed_target;
  //     }

  //     let targetData = await clusterLeadTargetModel({
  //       cluster_lead_id: cluster_lead_id,
  //       cluster_head_id: cluster_head_id,
  //       targets: targets,
  //       prev_month_target: prev_month_target,
  //       total_target: total_target,
  //       completed_target: completed_target,
  //       remaining_target: remaining_target,
  //       assigned_targets: assigned_targets,
  //       target_month: target_month,
  //       target_year: target_year,
  //     })

  //     let currentTarget = await targetData.save();

  //     if (!currentTarget) {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "Unable to add current month Team Lead targets.",
  //         data: currentTarget,
  //       };
  //     };
  //     return {
  //       status: 200,
  //       success: true,
  //       msg: "Current month Team Lead targets created successfully.",
  //       data: currentTarget,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       success: true,
  //       msg: error, //"Assign Team Lead target service error.",
  //       data: error,
  //     };
  //   }
  // }

  async chGetBDsTargetsService(req) {
    const {
      page,
      limit,
      search,
      bd_id,
      cluster_lead_id,
      targetYear,
      targetMonth,
    } = req.query;
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
    req?.user?._id ? filtertarget.push({ cluster_head_id: req.user._id }) : "";
    // req?.body?.manager_id ? filtertarget['manager_id'] = new mongoose.Types.ObjectId(req.body.manager_id) : "";
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
        $match: { $and: filtertarget },
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

  async bhGetTargetsService(req) {
    const { page, limit, search, bd_id, targetYear, targetMonth } = req.query;
    const {
      selectedBDE,
      selectedCLs,
      selectedMonth,
      selectedYear,
      isCLTarget,
      isBHTarget,
    } = req.body;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };
    if (isBHTarget) {
      // && selectedBDE && selectedBDE.length <= 0

      let filterTargetYear = [];
      let filterTargetMonth = [];
      let filterBH = [];
      let filterBHTarg = [];

      selectedYear
        ? filterTargetYear.push({ "BHTargData.target_year": selectedYear })
        : filterTargetYear.push({
          "BHTargData.target_year": `${new Date().getFullYear()}`,
        });
      selectedMonth && selectedMonth.length > 0
        ? selectedMonth.forEach((item) => {
          filterTargetMonth.push({ "BHTargData.target_month": item });
        })
        : "";

      let filterTarg = [];
      req?.user?._id ? filterBH.push({ _id: req?.user?._id }) : "";
      req?.user?._id
        ? filterBHTarg.push({ "BHTargData.cluster_head_id": req?.user?._id })
        : "";
      filterTargetMonth && filterTargetMonth.length > 0
        ? filterTarg.push({ $or: filterTargetMonth })
        : "";
      filterTargetYear && filterTargetYear.length > 0
        ? filterTarg.push({ $or: filterTargetYear })
        : "";
      filterBHTarg && filterBHTarg.length > 0
        ? filterTarg.push({ $or: filterBHTarg })
        : "";

      // console.log("filterTarg: ", filterTarg);
      // console.log("filterBH: ", filterBH);
      let targets = await clusterModel.aggregate([
        { $match: { $or: filterBH } },
        {
          $lookup: {
            from: "branch_targets",
            localField: "_id",
            foreignField: "cluster_head_id",
            as: "BHTargData",
          },
        },
        {
          $unwind: {
            path: "$BHTargData",
            preserveNullAndEmptyArrays: true,
          },
        },

        { $sort: { "BHTargData.month_start_date": 1 } },
        { $match: { $and: filterTarg } }, //[{$or: filterTargetMonth}, {$or: filterTargetYear }] }},
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            email: { $first: "$email" },
            designation: { $first: "$designation" },
            targData: { $push: "$BHTargData" },
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
        msg: "Branch Head targets get successfully.",
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
          filterCL.push({ _id: new mongoose.Types.ObjectId(cl) });
        })
        : filterCL.push({ cluster_head_id: req.user._id });
      filterTargetMonth && filterTargetMonth.length > 0
        ? filterTarg.push({ $or: filterTargetMonth })
        : "";
      filterTargetYear && filterTargetYear.length > 0
        ? filterTarg.push({ $or: filterTargetYear })
        : "";
      /// Filter Cluster Lead Target.
      selectedCLs && selectedCLs.length > 0
        ? selectedCLs.forEach((cl) => {
          filterCLTarg.push({
            $and: [
              {
                "clusterLeadTargData.cluster_lead_id":
                  new mongoose.Types.ObjectId(cl),
              },
              { "clusterLeadTargData.cluster_head_id": req.user._id },
            ],
          });
        })
        : filterCLTarg.push({
          "clusterLeadTargData.cluster_head_id": req.user._id,
        });

      filterTargetMonth && filterTargetMonth.length > 0
        ? filterTarg.push({ $or: filterTargetMonth })
        : "";
      filterTargetYear && filterTargetYear.length > 0
        ? filterTarg.push({ $or: filterTargetYear })
        : "";
      filterCLTarg && filterCLTarg.length > 0
        ? filterTarg.push({ $or: filterCLTarg })
        : "";
      // console.log("filterTarg: ", filterTarg);
      // console.log("filterCL: ", filterCL);
      let targets = await clusterLeadModel.aggregate([
        { $match: { $or: filterCL } },
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
          : filterBDs.push({ cluster_head_id: req.user._id });
      selectedBDE && selectedBDE.length > 0
        ? selectedBDE.forEach((bd) => {
          filterBDTargs.push({
            $and: [
              { "bdTargData.bd_id": new mongoose.Types.ObjectId(bd) },
              { "bdTargData.cluster_head_id": req.user._id },
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
                { "bdTargData.cluster_head_id": req.user._id },
              ],
            });
          })
          : filterBDTargs.push({ "bdTargData.cluster_head_id": req.user._id });
      filterBDTargs && filterBDTargs.length > 0
        ? filterTarg.push({ $or: filterBDTargs })
        : "";

      //=========================================
      // let filterTarg = [];
      // filterTargetMonth && filterTargetMonth.length > 0
      //   ? filterTarg.push({ $or: filterTargetMonth })
      //   : "";
      // filterTargetYear && filterTargetYear.length > 0
      //   ? filterTarg.push({ $or: filterTargetYear })
      //   : "";
      // filterTarg.push({ "bdTargData.cluster_head_id": req.user._id });
      // selectedBDE && selectedBDE.length > 0
      //   ? selectedBDE.forEach((bd) => {
      //     filterTarg.push({
      //       "bdTargData.bd_id": new mongoose.Types.ObjectId(bd),
      //     });
      //   })
      //   : selectedCLs && selectedCLs.length > 0
      //     ? selectedCLs.forEach((cl) => {
      //       filterTarg.push({
      //         "bdTargData.cluster_lead_id": new mongoose.Types.ObjectId(cl),
      //       });
      //     })
      //     : filterTarg.push({ "bdTargData.cluster_head_id": req.user._id });
      //=============================
      // console.log("filterTarg: ", filterTarg);
      // console.log("filterBDs: ", filterBDs);
      let targets = await bdModel.aggregate([
        { $match: { $or: filterBDs } },
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
        { $match: { $and: filterTarg } },
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

  // async chUpdateBDTargetService(req) {
  //   try {
  //     const body = req.body;

  //     const bdTarget = await bdTargetModel.findOne({ _id: body.target_id });
  //     if (!bdTarget) {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "BDE targets not found",
  //         data: bdTarget,
  //       };
  //     }

  //     let date = moment(); //"2023-07-19"
  //     if (date.toDate() == "Invalid Date") {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "Date not found.",
  //         data: date.toString(),
  //       };
  //     }
  //     let currentMonth = date.format("MMMM");
  //     let currentMonthYear = date.year();
  //     let currMonth = date.month();

  //     let preMonth = currMonth - 1;
  //     let previousMonthYear = currentMonthYear;

  //     if (preMonth < 0) {
  //       preMonth = 11;
  //       previousMonthYear -= 1;
  //     }

  //     let preMonthDate = moment([previousMonthYear, preMonth, 1]);
  //     let previousMonth = preMonthDate.format("MMMM");
  //     let addTarg = body.targets - bdTarget.targets;

  //     if (bdTarget.target_month == currentMonth) {
  //       body?.targets !== "" ? (bdTarget.targets = body.targets) : "";
  //       bdTarget?.total_target !== ""
  //         ? (bdTarget.total_target = body.targets + bdTarget.prev_month_target)
  //         : "";
  //       bdTarget?.remaining_target !== ""
  //         ? (bdTarget.remaining_target =
  //             bdTarget.total_target - bdTarget.completed_target)
  //         : "";

  //       const updatebdTarget = await bdTarget.save();

  //       if (updatebdTarget) {
  //         const clusterLeadTarg = await clusterLeadTargetModel.findOne({
  //           $and: [
  //             { cluster_lead_id: updatebdTarget.cluster_lead_id },
  //             { target_month: currentMonth },
  //           ],
  //         });
  //         if (clusterLeadTarg) {
  //           // clusterLeadTarg.assigned_targets = clusterLeadTarg.assigned_targets + addTarg;
  //           clusterLeadTarg.targets = clusterLeadTarg.targets + addTarg;
  //           clusterLeadTarg.total_target =
  //             clusterLeadTarg.targets + clusterLeadTarg.prev_month_target;
  //           clusterLeadTarg.remaining_target =
  //             clusterLeadTarg.total_target - clusterLeadTarg.completed_target;
  //           let updateclusterLeadTarg = await clusterLeadTarg.save();
  //         }

  //         // const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updatebdTarget.manager_id }, { target_month: currentMonth }] });
  //         // if (managerTarg) {
  //         //   managerTarg.assigned_targets = managerTarg.assigned_targets + addTarg;
  //         //   let updateManagerTarg = await managerTarg.save();
  //         // }

  //         const branchTarg = await branchTargetModel.findOne({
  //           $and: [
  //             { branch_id: clusterLeadTarg.branch_id },
  //             { target_month: currentMonth },
  //           ],
  //         });
  //         if (branchTarg) {
  //           // branchTarg.assigned_targets = branchTarg.assigned_targets + addTarg;
  //           branchTarg.targets = branchTarg.targets + addTarg;
  //           branchTarg.total_target =
  //             branchTarg.targets + branchTarg.prev_month_target;
  //           branchTarg.remaining_target =
  //             branchTarg.total_target - branchTarg.completed_target;
  //           let updatebranchTarg = await branchTarg.save();
  //         }
  //       }

  //       return {
  //         status: 200,
  //         success: true,
  //         msg: "Current month BDE target updated successfully.",
  //         data: updatebdTarget,
  //       };
  //     } else if (bdTarget.target_month == previousMonth) {
  //       body.targets !== "" ? (bdTarget.targets = body.targets) : "";
  //       bdTarget?.total_target !== ""
  //         ? (bdTarget.total_target = body.targets + bdTarget.prev_month_target)
  //         : "";
  //       bdTarget?.remaining_target !== ""
  //         ? (bdTarget.remaining_target =
  //             bdTarget.total_target - bdTarget.completed_target)
  //         : "";

  //       const updatebdTarget = await bdTarget.save();
  //       // let updateManagerTarg;
  //       let updateClusterLeadTarg;
  //       let updatebranchTarg;
  //       if (updatebdTarget) {
  //         const clusterLeadTarg = await clusterLeadTargetModel.findOne({
  //           $and: [
  //             { cluster_lead_id: updatebdTarget.cluster_lead_id },
  //             { target_month: previousMonth },
  //           ],
  //         });
  //         if (clusterLeadTarg) {
  //           // clusterLeadTarg.assigned_targets = clusterLeadTarg.assigned_targets + addTarg;
  //           clusterLeadTarg.targets = clusterLeadTarg.targets + addTarg;
  //           clusterLeadTarg.total_target =
  //             clusterLeadTarg.targets + clusterLeadTarg.prev_month_target;
  //           clusterLeadTarg.remaining_target =
  //             clusterLeadTarg.total_target - clusterLeadTarg.completed_target;
  //           updateClusterLeadTarg = await clusterLeadTarg.save();
  //         }

  //         // const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updatebdTarget.manager_id }, { target_month: previousMonth }] });
  //         // if (managerTarg) {
  //         //   managerTarg.assigned_targets = managerTarg.assigned_targets + addTarg;
  //         //   updateManagerTarg = await managerTarg.save();
  //         // }
  //         const branchTarg = await branchTargetModel.findOne({
  //           $and: [
  //             { branch_id: clusterLeadTarg.branch_id },
  //             { target_month: previousMonth },
  //           ],
  //         });
  //         if (branchTarg) {
  //           // branchTarg.assigned_targets = branchTarg.assigned_targets + addTarg;
  //           branchTarg.targets = branchTarg.targets + addTarg;
  //           branchTarg.total_target =
  //             branchTarg.targets + branchTarg.prev_month_target;
  //           branchTarg.remaining_target =
  //             branchTarg.total_target - branchTarg.completed_target;
  //           updatebranchTarg = await branchTarg.save();
  //         }
  //       }

  //       let currMonBDTarg = await bdTargetModel.findOne({
  //         $and: [{ bd_id: bdTarget.bd_id }, { target_month: currentMonth }],
  //       });

  //       if (currMonBDTarg) {
  //         currMonBDTarg?.prev_month_target !== ""
  //           ? (currMonBDTarg.prev_month_target =
  //               updatebdTarget.remaining_target)
  //           : "";
  //         currMonBDTarg?.total_target !== ""
  //           ? (currMonBDTarg.total_target =
  //               currMonBDTarg.targets + currMonBDTarg.prev_month_target)
  //           : "";
  //         currMonBDTarg?.remaining_target !== ""
  //           ? (currMonBDTarg.remaining_target =
  //               currMonBDTarg.total_target - currMonBDTarg?.completed_target)
  //           : "";

  //         const updatecurrMonBDTarg = await currMonBDTarg.save();
  //       }

  //       let currMonCLTarg = await clusterLeadTargetModel.findOne({
  //         $and: [
  //           { cluster_lead_id: currMonBDTarg.cluster_lead_id },
  //           { target_month: currentMonth },
  //         ],
  //       });

  //       if (currMonCLTarg) {
  //         currMonCLTarg?.prev_month_target !== ""
  //           ? (currMonCLTarg.prev_month_target =
  //               updateClusterLeadTarg.remaining_target)
  //           : "";
  //         currMonCLTarg?.total_target !== ""
  //           ? (currMonCLTarg.total_target =
  //               currMonCLTarg.targets + currMonCLTarg.prev_month_target)
  //           : "";
  //         currMonCLTarg?.remaining_target !== ""
  //           ? (currMonCLTarg.remaining_target =
  //               currMonCLTarg.total_target - currMonCLTarg?.completed_target)
  //           : "";

  //         const updatecurrMonCLTarg = await currMonCLTarg.save();
  //       }
  //       let currMonbranchTarg = await branchTargetModel.findOne({
  //         $and: [
  //           { branch_id: currMonCLTarg.branch_id },
  //           { target_month: currentMonth },
  //         ],
  //       });

  //       if (currMonbranchTarg) {
  //         currMonbranchTarg?.prev_month_target !== ""
  //           ? (currMonbranchTarg.prev_month_target =
  //               updatebranchTarg.remaining_target)
  //           : "";
  //         currMonbranchTarg?.total_target !== ""
  //           ? (currMonbranchTarg.total_target =
  //               currMonbranchTarg.targets + currMonbranchTarg.prev_month_target)
  //           : "";
  //         currMonbranchTarg?.remaining_target !== ""
  //           ? (currMonbranchTarg.remaining_target =
  //               currMonbranchTarg.total_target -
  //               currMonbranchTarg?.completed_target)
  //           : "";

  //         const updatecurrMonbranchTarg = await currMonbranchTarg.save();
  //       }
  //       return {
  //         status: 200,
  //         success: true,
  //         msg: "Previous month BDE target updated successfully.",
  //         data: updatebdTarget,
  //       };
  //     } else {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "You only have permissions to update the target for the current month and previous month.",
  //         data: bdTarget,
  //       };
  //     }
  //   } catch (error) {
  //     return {
  //       status: 400,
  //       success: false,
  //       msg: error, //"Somethin went wrong when update BDE target service.",
  //       data: error,
  //     };
  //   }
  // }

  async chUpdateBDTargetService(req) {
    try {
      let { target_id, targets } = req.body;
      let bdTarget = await bdTargetModel.findOne({ _id: target_id });

      if (bdTarget.target_year !== moment().format("YYYY")) {
        return {
          status: 400,
          success: false,
          msg: "You have only permission to update the current month targets.",
          data: bdTarget.target_month,
        };
      }

      const result = await bdTargetModel.findByIdAndUpdate(
        bdTarget._id,
        {
          $set: {
            targets: Number(targets),
            total_target: Number(targets + bdTarget.prev_month_target),
            remaining_target: Number(
              targets + bdTarget.prev_month_target - bdTarget.completed_target
            ),
          },
        },
        { new: true }
      );

      const bdTargetsNew = await bdTargetModel.aggregate([
        {
          $match: {
            target_year: moment().format("YYYY"),
            cluster_head_id: new mongoose.Types.ObjectId(req.user._id),
          },
        },
        {
          $group: {
            _id: {
              target_month: "$target_month",
              cluster_lead_id: "$cluster_lead_id",
            },
            target_year: { $first: "$target_year" },
            completed_target: { $sum: "$completed_target" },
            confirm_business: { $sum: "$confirm_business" },
            remaining_target: { $sum: "$remaining_target" },
            targets: { $sum: "$targets" },
            total_target: { $sum: "$total_target" },
            prev_month_target: { $sum: "$prev_month_target" },
          },
        },
        {
          $project: {
            cluster_lead_id: "$_id.cluster_lead_id",
            _id: 0,
            completed_target: 1,
            confirm_business: 1,
            remaining_target: 1,
            target_month: "$_id.target_month",
            target_year: 1,
            targets: 1,
            total_target: 1,
            prev_month_target: 1,
          },
        },
      ]);

      for (let i = 0; i < bdTargetsNew.length; i++) {
        const element = bdTargetsNew[i];
        // console.log("====================================");
        // console.log(element, "element");
        // console.log("====================================");
        const newww = await clusterLeadTargetModel.findOneAndUpdate(
          {
            cluster_lead_id: new mongoose.Types.ObjectId(
              element.cluster_lead_id
            ),
            target_month: element.target_month,
            target_year: element.target_year,
          },
          {
            completed_target: element.completed_target,
            remaining_target: element.remaining_target,
            confirm_business: element.confirm_business,
            targets: element.targets,
            total_target: element.total_target,
            prev_month_target: element.prev_month_target,
          }
        );
        // console.log("====================================");
        // console.log(newww, "newww");
        // console.log("====================================");
        // return;
      }

      const clTargetsNew = await clusterLeadTargetModel.aggregate([
        {
          $match: {
            target_year: moment().format("YYYY"),
            cluster_head_id: new mongoose.Types.ObjectId(req.user._id),
          },
        },
        {
          $group: {
            _id: {
              target_month: "$target_month",
            },
            target_year: { $first: "$target_year" },
            cluster_head_id: { $first: "$cluster_head_id" },
            completed_target: { $sum: "$completed_target" },
            confirm_business: { $sum: "$confirm_business" },
            remaining_target: { $sum: "$remaining_target" },
            targets: { $sum: "$targets" },
            total_target: { $sum: "$total_target" },
            prev_month_target: { $sum: "$prev_month_target" },
          },
        },
        {
          $project: {
            cluster_head_id: 1,
            _id: 0,
            completed_target: 1,
            remaining_target: 1,
            confirm_business: 1,
            target_month: "$_id.target_month",
            target_year: 1,
            targets: 1,
            total_target: 1,
            prev_month_target: 1,
          },
        },
      ]);

      for (let j = 0; j < clTargetsNew.length; j++) {
        const element = clTargetsNew[j];
        await branchTargetModel.findOneAndUpdate(
          {
            cluster_head_id: new mongoose.Types.ObjectId(
              element.cluster_head_id
            ),
            target_month: element.target_month,
            target_year: element.target_year,
          },
          {
            completed_target: element.completed_target,
            remaining_target: element.remaining_target,
            confirm_business: element.confirm_business,
            targets: element.targets,
            total_target: element.total_target,
            prev_month_target: element.prev_month_target,
          }
        );
      }
      return {
        status: 200,
        success: true,
        msg: "Target Achived Success.",
        data: result,
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

  // async chCompBDTargetService(req) {
  //   try {
  //     let { bd_id, target_id, complete_target } = req.body;
  //     let bdTarget = await bdTargetModel.findOne({ _id: target_id });
  //     if (!bdTarget) {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "BDE targets not found",
  //         data: bdTarget,
  //       };
  //     }
  //     let date = moment();
  //     if (date.toDate() == "Invalid Date") {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "Date not found.",
  //         data: date.toString(),
  //       };
  //     }
  //     let currentMonth = date.format("MMMM");
  //     let currentMonthYear = date.year();
  //     let currMonth = date.month();

  //     let preMonth = currMonth - 1;
  //     let previousMonthYear = currentMonthYear;

  //     if (preMonth < 0) {
  //       preMonth = 11;
  //       previousMonthYear -= 1;
  //     }

  //     let preMonthDate = moment([previousMonthYear, preMonth, 1]);
  //     let previousMonth = preMonthDate.format("MMMM");

  //     let currMonthBDTarget = await bdTargetModel.findOne({
  //       $and: [
  //         { bd_id: bd_id },
  //         { target_month: currentMonth },
  //         { target_year: currentMonthYear },
  //       ],
  //     });
  //     if (currMonthBDTarget) {
  //       if (bdTarget.target_month == currMonthBDTarget.target_month) {
  //         let compTarget = await completeBDTargetService(
  //           bdTarget,
  //           complete_target
  //         );
  //         if (compTarget) {
  //           return compTarget;
  //         }
  //       } else if (bdTarget.target_month == previousMonth) {
  //         let compTarget = await completeBDTargetService(
  //           bdTarget,
  //           complete_target
  //         );
  //         if (compTarget?.success) {
  //           let updateCurrMontarg = await updateCurrMonBDTarg(
  //             currMonthBDTarget,
  //             compTarget.data
  //           );
  //           return updateCurrMontarg;
  //         } else {
  //           return compTarget;
  //         }
  //       } else {
  //         return {
  //           status: 400,
  //           success: false,
  //           msg: "You have only permission to achived the current month and previous month targets targets.",
  //           data: currMonthBDTarget,
  //         };
  //       }
  //     } else if (bdTarget.target_month == previousMonth) {
  //       const compTarget = await completeBDTargetService(
  //         bdTarget,
  //         complete_target
  //       );
  //       if (compTarget) {
  //         return compTarget;
  //       }
  //     } else {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "You have only permission to achive the current month targets.",
  //         data: bdTarget,
  //       };
  //     }
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       success: false,
  //       msg: error, //"Somethin went wrong when Achived BDE Target service.",
  //       data: error,
  //     };
  //   }
  // }

  async chCompBDTargetService(req) {
    try {
      let { bd_id, target_id, upfront_amount, confirm_business } = req.body;
      let bdTarget = await bdTargetModel.findOne({ _id: target_id });

      if (bdTarget.target_year !== moment().format("YYYY")) {
        return {
          status: 400,
          success: false,
          msg: "You have only permission to achive the current year targets.",
          data: bdTarget.target_year,
        };
      }

      const result = await bdTargetModel.findByIdAndUpdate(
        bdTarget._id,
        {
          $set: {
            completed_target: Number(upfront_amount),
            confirm_business: Number(confirm_business),
            remaining_target: Number(bdTarget.total_target - upfront_amount),
          },
        },
        { new: true }
      );

      const bdTargetsNew = await bdTargetModel.aggregate([
        {
          $match: {
            target_year: moment().format("YYYY"),
            cluster_head_id: new mongoose.Types.ObjectId(req.user._id),
          },
        },
        {
          $group: {
            _id: {
              target_month: "$target_month",
              cluster_lead_id: "$cluster_lead_id",
            },
            target_year: { $first: "$target_year" },
            completed_target: { $sum: "$completed_target" },
            confirm_business: { $sum: "$confirm_business" },
            remaining_target: { $sum: "$remaining_target" },
            targets: { $sum: "$targets" },
            total_target: { $sum: "$total_target" },
            prev_month_target: { $sum: "$prev_month_target" },
          },
        },
        {
          $project: {
            cluster_lead_id: "$_id.cluster_lead_id",
            _id: 0,
            completed_target: 1,
            confirm_business: 1,
            remaining_target: 1,
            target_month: "$_id.target_month",
            target_year: 1,
            targets: 1,
            total_target: 1,
            prev_month_target: 1,
          },
        },
      ]);

      for (let i = 0; i < bdTargetsNew.length; i++) {
        const element = bdTargetsNew[i];
        // console.log("====================================");
        // console.log(element, "element");
        // console.log("====================================");
        const newww = await clusterLeadTargetModel.findOneAndUpdate(
          {
            cluster_lead_id: new mongoose.Types.ObjectId(
              element.cluster_lead_id
            ),
            target_month: element.target_month,
            target_year: element.target_year,
          },
          {
            completed_target: element.completed_target,
            remaining_target: element.remaining_target,
            confirm_business: element.confirm_business,
            targets: element.targets,
            total_target: element.total_target,
            prev_month_target: element.prev_month_target,
          }
        );
        // console.log("====================================");
        // console.log(newww, "newww");
        // console.log("====================================");
        // return;
      }

      const clTargetsNew = await clusterLeadTargetModel.aggregate([
        {
          $match: {
            target_year: moment().format("YYYY"),
            cluster_head_id: new mongoose.Types.ObjectId(req.user._id),
          },
        },
        {
          $group: {
            _id: {
              target_month: "$target_month",
            },
            target_year: { $first: "$target_year" },
            cluster_head_id: { $first: "$cluster_head_id" },
            completed_target: { $sum: "$completed_target" },
            confirm_business: { $sum: "$confirm_business" },
            remaining_target: { $sum: "$remaining_target" },
            targets: { $sum: "$targets" },
            total_target: { $sum: "$total_target" },
            prev_month_target: { $sum: "$prev_month_target" },
          },
        },
        {
          $project: {
            cluster_head_id: 1,
            _id: 0,
            completed_target: 1,
            remaining_target: 1,
            confirm_business: 1,
            target_month: "$_id.target_month",
            target_year: 1,
            targets: 1,
            total_target: 1,
            prev_month_target: 1,
          },
        },
      ]);

      for (let j = 0; j < clTargetsNew.length; j++) {
        const element = clTargetsNew[j];
        await branchTargetModel.findOneAndUpdate(
          {
            cluster_head_id: new mongoose.Types.ObjectId(
              element.cluster_head_id
            ),
            target_month: element.target_month,
            target_year: element.target_year,
          },
          {
            completed_target: element.completed_target,
            remaining_target: element.remaining_target,
            confirm_business: element.confirm_business,
            targets: element.targets,
            total_target: element.total_target,
            prev_month_target: element.prev_month_target,
          }
        );
      }
      return {
        status: 200,
        success: true,
        msg: "Target Achived Success.",
        data: result,
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

  async bhAssignOldTargetsService(req) {
    try {
      let { bd_id, target_id, complete_target } = req.body;
      let bdTarget = await bdTargetModel.findOne({ _id: target_id });
      if (!bdTarget) {
        return {
          status: 400,
          success: false,
          msg: "BDE targets not found",
          data: bdTarget,
        };
      }
      let date = moment();
      if (date.toDate() == "Invalid Date") {
        return {
          status: 400,
          success: false,
          msg: "Date not found.",
          data: date.toString(),
        };
      }
      let currentMonth = date.format("MMMM");
      let currentMonthYear = date.year();
      let currMonth = date.month();

      let preMonth = currMonth - 1;
      let previousMonthYear = currentMonthYear;

      if (preMonth < 0) {
        preMonth = 11;
        previousMonthYear -= 1;
      }

      let preMonthDate = moment([previousMonthYear, preMonth, 1]);
      let previousMonth = preMonthDate.format("MMMM");

      let currMonthBDTarget = await bdTargetModel.findOne({
        $and: [{ bd_id: bd_id }, { target_month: currentMonth }],
      });
      if (currMonthBDTarget) {
        if (bdTarget.target_month == currMonthBDTarget.target_month) {
          let compTarget = await completeBDTargetService(
            bdTarget,
            complete_target
          );
          if (compTarget) {
            return compTarget;
          }
        } else if (bdTarget.target_month == previousMonth) {
          let compTarget = await completeBDTargetService(
            bdTarget,
            complete_target
          );
          if (compTarget?.success) {
            let updateCurrMontarg = await updateCurrMonBDTarg(
              currMonthBDTarget,
              compTarget.data
            );
            return updateCurrMontarg;
          } else {
            return compTarget;
          }
        } else {
          return {
            status: 400,
            success: false,
            msg: "You have only permission to achived the current month and previous month targets targets.",
            data: currMonthBDTarget,
          };
        }
      } else if (bdTarget.target_month == previousMonth) {
        const compTarget = await completeBDTargetService(
          bdTarget,
          complete_target
        );
        if (compTarget) {
          return compTarget;
        }
      } else {
        return {
          status: 400,
          success: false,
          msg: "You have only permission to achive the current month targets.",
          data: bdTarget,
        };
      }
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Achived BDE Target service.",
        data: error,
      };
    }
  }

  async BDTargetDropdownService(req) {
    try {
      const { cluster_lead_id } = req.body;
      const matchObject = {};
      matchObject.cluster_head_id = req.user._id;
      if (cluster_lead_id && cluster_lead_id.length > 0) {
        let newArray = new Array();
        newArray.push(
          cluster_lead_id.forEach((cl) => {
            newArray.push(new mongoose.Types.ObjectId(cl));
          })
        );
        matchObject.cluster_lead_id = { $in: newArray };
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
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
            cluster_lead_id: 1,
          },
        },
      ]);

      const dropDownBDE = await bdModel.find(matchObject).select("_id name designation cluster_lead_id")

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

  async CLTargetDropdownService(req) {
    try {
      const matchObject = {};
      matchObject.cluster_head_id = req.user._id;
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
            designation: { $first: "$clusterLeadData.designation" },
            // cluster_lead_id: { $first: "$clusterLeadData.cluster_lead_id" },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            designation: 1,
          },
        },
      ]);

      const dropDownBDE = await clusterLeadModel.find(matchObject).select("_id name designation")

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
}

module.exports = new ClusterTargtService();
