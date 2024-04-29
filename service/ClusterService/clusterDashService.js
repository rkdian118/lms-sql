const { default: mongoose } = require("mongoose");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const leadModel = require("../../model/BDModel/leadModel");
const moment = require("moment");
const callModel = require("../../model/BDModel/callModel");
const _ = require("lodash");
const rfpModel = require("../../model/BDModel/rfpModel");
const proposalModel = require("../../model/BDModel/proposalModel ");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const dsrModel = require("../../model/BDModel/dsrModel");
const masterStatusModel = require("../../model/CommonModel/masterStatusModel");

class ClusterDashboardService {
  async getClusterTargetGraph(req) {
    try {
      const { target_month, target_year } = req.query;

      const matchObj = {};
      matchObj.cluster_head_id = new mongoose.Types.ObjectId(req.user._id);
      if (target_month) matchObj.target_month = target_month;
      if (target_year) matchObj.target_year = target_year;

      const targets = await branchTargetModel.aggregate([
        {
          $match: matchObj,
        },
        {
          $sort: { month_start_date: 1 },
        },
        {
          $project: {
            targets: 1,
            prev_month_target: 1,
            total_target: 1,
            completed_target: 1,
            confirm_business: 1,
            month_start_date: 1,
            remaining_target: 1,
            target_year: 1,
            target_month: 1,
          },
        },
      ]);

      const branchTarget = await myInstance.getMonthStartDate(req);
      console.log(branchTarget, "branchTarget");
      let monthDate = new Date(moment());
      if (branchTarget?.month_start_date) {
        monthDate = new Date(
          moment(branchTarget.month_start_date).startOf("day")
        );
      }

      const currentMonthTarget = await branchTargetModel
        .findOne({
          cluster_head_id: new mongoose.Types.ObjectId(req.user._id),
          target_year: moment(monthDate).format("YYYY"),
          target_month: moment(monthDate).format("MMMM"),
        })
        .select({
          targets: 1,
          prev_month_target: 1,
          total_target: 1,
          completed_target: 1,
          confirm_business: 1,
          month_start_date: 1,
          remaining_target: 1,
          target_year: 1,
          target_month: 1,
        });

      return {
        status: 200,
        success: true,
        msg: "Graph get successfully.",
        data: { targets, currentMonthTarget },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error,
        data: error,
      };
    }
  }

  async getClusterCardsData(req) {
    try {
      const { start_date, end_date, bd_id, cluster_lead_id } = req.query;
      const branchTarget = await myInstance.getMonthStartDate(req);

      let startDate = new Date(moment().startOf("month"));
      if (branchTarget?.month_start_date) {
        startDate = new Date(
          moment(branchTarget.month_start_date).startOf("day")
        );
      }

      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      const matchObj = {};
      matchObj["bdData.cluster_head_id"] = new mongoose.Types.ObjectId(
        req.user._id
      );
      if (cluster_lead_id) {
        matchObj["bdData.cluster_lead_id"] = new mongoose.Types.ObjectId(
          cluster_lead_id
        );
      }
      if (bd_id) {
        matchObj["bdData._id"] = new mongoose.Types.ObjectId(bd_id);
      }
      console.log(startDate, endDate, matchObj, branchTarget);
      const leads = await leadModel.aggregate([
        {
          $sort: { assign_date: -1 },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_source_id",
            foreignField: "_id",
            as: "leadSourceData",
          },
        },
        {
          $unwind: {
            path: "$leadSourceData",
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_status",
            foreignField: "_id",
            as: "leadStatusData",
          },
        },
        {
          $unwind: {
            path: "$leadStatusData",
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
          },
        },
        {
          $match: {
            assign_date: {
              $gte: startDate,
              $lt: endDate,
            },
            ...matchObj,
            ["leadStatusData.status_name"]: { $nin: ["Dead", "Lead Return"] },
          },
        },
      ]);

      const meetings = await callModel.aggregate([
        {
          $sort: { meeting_date_time: -1 },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "call_status_id",
            foreignField: "_id",
            as: "calStatusData",
          },
        },
        {
          $unwind: {
            path: "$calStatusData",
          },
        },
        {
          $lookup: {
            from: "leads",
            localField: "lead_id",
            foreignField: "_id",
            as: "leadData",
          },
        },
        {
          $unwind: {
            path: "$leadData",
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "leadData.lead_status",
            foreignField: "_id",
            as: "leadStatusData",
          },
        },
        {
          $unwind: {
            path: "$leadStatusData",
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "call_type_id",
            foreignField: "_id",
            as: "callTypeData",
          },
        },
        {
          $unwind: {
            path: "$callTypeData",
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
          },
        },
        {
          $match: {
            meeting_date_time: {
              $gte: startDate,
              $lt: endDate,
            },
            ...matchObj,
            ["leadStatusData.status_name"]: { $nin: ["Dead", "Lead Return"] },
          },
        },
      ]);

      const proposals = await proposalModel.aggregate([
        {
          $lookup: {
            from: "leads",
            localField: "lead_id",
            foreignField: "_id",
            as: "leadData",
          },
        },
        {
          $unwind: {
            path: "$leadData",
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "leadData.lead_status",
            foreignField: "_id",
            as: "leadStatusData",
          },
        },
        {
          $unwind: {
            path: "$leadStatusData",
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
          },
        },
        {
          $addFields: {
            proposalLast: {
              $arrayElemAt: ["$proposal", -1],
            },
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "proposalLast.proposal_type_id",
            foreignField: "_id",
            as: "proposalTypeData",
          },
        },
        {
          $unwind: {
            path: "$proposalTypeData",
          },
        },
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lt: endDate,
            },
            ...matchObj,
            ["leadStatusData.status_name"]: { $nin: ["Dead", "Lead Return"] },
          },
        },
      ]);

      const masterData = await masterStatusModel.aggregate([
        {
          $match: { status_type: { $in: ["lead_status", "lead_source"] } },
        },
        {
          $lookup: {
            from: "leads",
            localField: "_id",
            foreignField: "lead_source_id",
            as: "lead_source",
            pipeline: [
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
                $match: {
                  assign_date: {
                    $gte: startDate,
                    $lt: endDate,
                  },
                  ...matchObj,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "leads",
            localField: "_id",
            foreignField: "lead_status",
            as: "lead_status",
            pipeline: [
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
                $match: {
                  assign_date: {
                    $gte: startDate,
                    $lt: endDate,
                  },
                  ...matchObj,
                },
              },
            ],
          },
        },
        {
          $project: {
            _id: "$_id",
            status_type: 1,
            status_name: 1,
            count: {
              $cond: {
                if: {
                  $gt: [
                    {
                      $size: "$lead_source",
                    },
                    0,
                  ],
                },
                then: {
                  $size: "$lead_source",
                },
                else: {
                  $size: "$lead_status",
                },
              },
            },
          },
        },
      ]);

      const responseCounts = {
        leadData: masterData,
        external_leads: _.get(
          _.countBy(leads, "leadSourceData.status_name"),
          "External",
          0
        ),
        internal_leads: _.get(
          _.countBy(leads, "leadSourceData.status_name"),
          "Internal",
          0
        ),
        calls_done: _.get(
          _.countBy(meetings, "calStatusData.status_name"),
          "Meeting Done",
          0
        ),
        initial_calls: _.get(
          _.countBy(meetings, (response) => {
            return (
              //   response.calStatusData.status_name === "Meeting Done" &&
              response.callTypeData.status_name === "Initial"
            );
          }),
          true,
          0
        ),
        discussion_leads: _.get(
          _.countBy(leads, "leadStatusData.status_name"),
          "In Discussion",
          0
        ),
        proposals: _.get(
          _.countBy(proposals, "proposalTypeData.status_name"),
          "Detailed Proposal",
          0
        ),
        proposal_amount: _.sumBy(proposals, (response) => {
          return response?.proposal_submitted === "Yes" &&
            response?.proposalTypeData?.status_name === "Detailed Proposal"
            ? response.project_amount
            : 0;
        }),
      };
      //   console.log(meetings);
      return {
        status: 200,
        success: true,
        msg: "Cards Data get successfully.",
        data: responseCounts,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error,
        data: error,
      };
    }
  }

  async getCLAndBDEPerformers(req) {
    try {
      const { start_date, end_date } = req.query;

      const branchTarget = await myInstance.getMonthStartDate(req);

      let startDate = new Date(moment().startOf("month"));
      if (branchTarget?.month_start_date) {
        startDate = new Date(
          moment(branchTarget.month_start_date).startOf("day")
        );
      }

      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }
      const matchObj = {};
      matchObj.cluster_head_id = new mongoose.Types.ObjectId(req.user._id);
      matchObj.status = "1";
      // console.log("====================================");
      // console.log(startDate, endDate, matchObj);
      // console.log("====================================");
      const bdPerformer = await bdModel.aggregate([
        {
          $match: matchObj,
        },
        {
          $lookup: {
            from: "bd_targets",
            let: { bd_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$bd_id", "$$bd_id"] },
                      { $gte: ["$month_start_date", startDate] },
                      { $lt: ["$month_start_date", endDate] },
                    ],
                  },
                },
              },
            ],
            as: "targets",
          },
        },
        {
          $lookup: {
            from: "calls",
            localField: "_id",
            foreignField: "bd_id",
            as: "calls",
          },
        },
        {
          $lookup: {
            from: "proposals",
            localField: "_id",
            foreignField: "bd_id",
            as: "proposals",
          },
        },
        {
          $addFields: {
            totalTargets: { $sum: "$targets.completed_target" },
            totalCalls: { $size: "$calls" },
            totalProposals: { $size: "$proposals" },
          },
        },
        {
          $addFields: {
            avgTargets: { $avg: "$totalTargets" },
            avgCalls: { $avg: "$totalCalls" },
            avgProposals: { $avg: "$totalProposals" },
          },
        },
        {
          $lookup: {
            from: "cluster_leads",
            localField: "emp_id",
            foreignField: "emp_id",
            as: "clusterLeads",
          },
        },
        {
          $match: {
            "clusterLeads.emp_id": { $exists: false },
          },
        },
        {
          $facet: {
            topPerformers: [
              {
                $sort: {
                  avgTargets: -1,
                  avgCalls: -1,
                  avgProposals: -1,
                },
              },
              {
                $limit: 3,
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  username: 1,
                  emp_id: 1,
                  designation: 1,
                  profile_pic: 1,
                  totalCalls: 1,
                  totalProposals: 1,
                  totalTargets: 1,
                  avgTargets: 1,
                  avgCalls: 1,
                  avgProposals: 1,
                  avgTargets: 1,
                  reason: {
                    $concatArrays: [
                      {
                        $cond: {
                          if: {
                            $and: [
                              { $gte: ["$totalTargets", "$avgTargets"] },
                              { $ne: ["$totalTargets", 0] },
                            ],
                          },
                          then: ["Exceeded targets significantly."],
                          else: [],
                        },
                      },
                      {
                        $cond: {
                          if: {
                            $and: [
                              { $gte: ["$totalCalls", "$avgCalls"] },
                              { $ne: ["$totalCalls", 0] },
                            ],
                          },
                          then: ["Made calls on average."],
                          else: [],
                        },
                      },
                      {
                        $cond: {
                          if: {
                            $and: [
                              { $gte: ["$totalProposals", "$avgProposals"] },
                              { $ne: ["$totalProposals", 0] },
                            ],
                          },
                          then: [
                            "Submitted a high number of proposals on average.",
                          ],
                          else: [],
                        },
                      },
                      // {
                      //   $cond: {
                      //     if: {
                      //       $and: [
                      //         { $gte: ["$avgTargets", 50] },
                      //         { $lte: ["$avgCalls", 2] },
                      //       ],
                      //     },
                      //     then: ["Met targets with fewer calls."],
                      //     else: [],
                      //   },
                      // },
                    ],
                  },
                },
              },
            ],
            bottomPerformers: [
              {
                $sort: {
                  avgTargets: 1,
                  avgCalls: 1,
                  avgProposals: 1,
                },
              },
              {
                $limit: 3,
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  username: 1,
                  emp_id: 1,
                  designation: 1,
                  profile_pic: 1,
                  totalCalls: 1,
                  totalProposals: 1,
                  totalTargets: 1,
                  avgTargets: 1,
                  avgCalls: 1,
                  avgProposals: 1,
                  avgTargets: 1,
                },
              },
            ],
          },
        },
      ]);

      const clusterLeadPerformer = await clusterLeadModel.aggregate([
        {
          $match: matchObj,
        },
        {
          $lookup: {
            from: "cluster_lead_targets",
            let: { bd_id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$cluster_lead_id", "$$bd_id"] },
                      { $ne: ["$completed_target", 0] },
                      { $gte: ["$month_start_date", startDate] },
                      { $lt: ["$month_start_date", endDate] },
                    ],
                  },
                },
              },
            ],
            as: "targets",
          },
        },
        {
          $lookup: {
            from: "calls",
            let: { cluster_lead_id: "$_id" },
            pipeline: [
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
                },
              },
              {
                $lookup: {
                  from: "cluster_leads",
                  localField: "bdData.cluster_lead_id",
                  foreignField: "_id",
                  as: "clusterLeadData",
                },
              },
              {
                $unwind: {
                  path: "$clusterLeadData",
                },
              },
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$clusterLeadData._id", "$$cluster_lead_id"] },
                      { $ne: ["$clusterLeadData.status", "1"] },
                    ],
                  },
                },
              },
            ],
            as: "calls",
          },
        },
        {
          $lookup: {
            from: "proposals",
            let: { cluster_lead_id: "$_id" },
            pipeline: [
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
                },
              },
              {
                $lookup: {
                  from: "cluster_leads",
                  localField: "bdData.cluster_lead_id",
                  foreignField: "_id",
                  as: "clusterLeadData",
                },
              },
              {
                $unwind: {
                  path: "$clusterLeadData",
                },
              },
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$clusterLeadData._id", "$$cluster_lead_id"] },
                      { $ne: ["$clusterLeadData.status", "1"] },
                    ],
                  },
                },
              },
            ],
            as: "proposals",
          },
        },
        {
          $addFields: {
            totalTargets: { $sum: "$targets.completed_target" },
            totalCalls: { $size: "$calls" },
            totalProposals: { $size: "$proposals" },
          },
        },
        {
          $addFields: {
            avgTargets: { $avg: "$totalTargets" },
            avgCalls: { $avg: "$totalCalls" },
            avgProposals: { $avg: "$totalProposals" },
          },
        },
        {
          $lookup: {
            from: "clusters",
            localField: "emp_id",
            foreignField: "emp_id",
            as: "clusterHeads",
          },
        },
        {
          $match: {
            "clusterHeads.emp_id": { $exists: false },
          },
        },
        {
          $facet: {
            topPerformers: [
              {
                $sort: {
                  avgTargets: -1,
                  avgCalls: -1,
                  avgProposals: -1,
                },
              },
              {
                $limit: 3,
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  username: 1,
                  emp_id: 1,
                  designation: 1,
                  profile_pic: 1,
                  totalCalls: 1,
                  totalProposals: 1,
                  totalTargets: 1,
                  avgTargets: 1,
                  avgCalls: 1,
                  avgProposals: 1,
                  reason: {
                    $concatArrays: [
                      {
                        $cond: {
                          if: {
                            $and: [
                              { $gte: ["$totalTargets", "$avgTargets"] },
                              { $ne: ["$totalTargets", 0] },
                            ],
                          },
                          then: ["Exceeded targets significantly."],
                          else: [],
                        },
                      },
                      {
                        $cond: {
                          if: {
                            $and: [
                              { $gte: ["$totalCalls", "$avgCalls"] },
                              { $ne: ["$totalCalls", 0] },
                            ],
                          },
                          then: ["Made calls on average."],
                          else: [],
                        },
                      },
                      {
                        $cond: {
                          if: {
                            $and: [
                              { $gte: ["$totalProposals", "$avgProposals"] },
                              { $ne: ["$totalProposals", 0] },
                            ],
                          },
                          then: [
                            "Submitted a high number of proposals on average.",
                          ],
                          else: [],
                        },
                      },
                      // {
                      //   $cond: {
                      //     if: {
                      //       $and: [
                      //         { $gte: ["$avgTargets", 50] },
                      //         { $lte: ["$avgCalls", 2] },
                      //       ],
                      //     },
                      //     then: ["Met targets with fewer calls."],
                      //     else: [],
                      //   },
                      // },
                    ],
                  },
                },
              },
            ],
            bottomPerformers: [
              {
                $sort: {
                  avgTargets: 1,
                  avgCalls: 1,
                  avgProposals: 1,
                },
              },
              {
                $limit: 3,
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  username: 1,
                  emp_id: 1,
                  designation: 1,
                  profile_pic: 1,
                  totalCalls: 1,
                  totalProposals: 1,
                  totalTargets: 1,
                  avgTargets: 1,
                  avgCalls: 1,
                  avgProposals: 1,
                },
              },
            ],
          },
        },
      ]);

      // Now, clusterLeadPerformer will contain the top and bottom performers among cluster leads.

      return {
        status: 200,
        success: true,
        msg: "Performers get successfully.",
        data: {
          bdPerformer: bdPerformer[0],
          clPerformer: clusterLeadPerformer[0],
        },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error,
        data: error,
      };
    }
  }

  async getClusterDashBoardDSR(req) {
    try {
      const { start_date, end_date } = req.query;

      let startDate = new Date(moment().subtract(1, "day").startOf("day"));
      let endDate = new Date(moment().subtract(1, "day").endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }
      const matchObj = {};
      matchObj.cluster_head_id = new mongoose.Types.ObjectId(req.user._id);
      matchObj.createdAt = {
        $gte: startDate,
        $lt: endDate,
      };

      const dsr = await dsrModel.aggregate([
        {
          $match: matchObj,
        },
        {
          $group: {
            _id: {
              cluster_head_id: "$cluster_head_id",
            },
            // count: { $sum: 1 },
            lead_positive_response: { $sum: "$lead_positive_response" },
            lead_negative_response: { $sum: "$lead_negative_response" },
            upwork_bids: { $sum: "$upwork_bids" },
            linkedin_response: { $sum: "$linkedin_response" },
            upwork_positive_response: { $sum: "$upwork_positive_response" },
            lead_assigned: { $sum: "$lead_assigned" },
            follow_ups: { $sum: "$follow_ups" },
            meeting_scheduled: { $sum: "$meeting_scheduled" },
            meeting_done: { $sum: "$meeting_done" },
            proposal_submitted: { $sum: "$proposal_submitted" },
            estimation_submitted: { $sum: "$estimation_submitted" },
            understanding_queries_submitted: {
              $sum: "$understanding_queries_submitted",
            },
            feature_list_shared: { $sum: "$feature_list_shared" },
            phone_call_done: { $sum: "$phone_call_done" },
            proposal_amount: { $sum: "$proposal_amount" },
            linkedin_messages: { $sum: "$linkedin_messages" },
          },
        },
        {
          $project: {
            _id: 0,
            // date: {
            //   $dateFromParts: {
            //     year: "$_id.year",
            //     month: "$_id.month",
            //     day: "$_id.day",
            //   },
            // },
            // count: 1,
            lead_positive_response: 1,
            lead_negative_response: 1,
            upwork_bids: 1,
            linkedin_response: 1,
            upwork_positive_response: 1,
            lead_assigned: 1,
            follow_ups: 1,
            meeting_scheduled: 1,
            meeting_done: 1,
            proposal_submitted: 1,
            estimation_submitted: 1,
            understanding_queries_submitted: 1,
            feature_list_shared: 1,
            phone_call_done: 1,
            proposal_amount: 1,
            linkedin_messages: 1,
          },
        },
      ]);

      return {
        status: 200,
        success: true,
        msg: "DSR get successfully.",
        data: dsr[0],
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error,
        data: error,
      };
    }
  }

  async getMonthStartDate(req) {
    let clTarget = await branchTargetModel.findOne({
      //   bd_id: req.user._id,
      cluster_head_id: req.user._id,
      target_month: moment().format("MMMM"),
      target_year: moment().format("YYYY"),
    });
    if (!clTarget) {
      clTarget = await branchTargetModel.findOne({
        // bd_id: req.user._id,
        cluster_head_id: req.user._id,
        target_month: moment().subtract(1, "month").format("MMMM"),
        target_year: moment().subtract(1, "month").format("YYYY"),
      });
    }
    return clTarget;
  }
}

const myInstance = new ClusterDashboardService();

module.exports = new ClusterDashboardService();
