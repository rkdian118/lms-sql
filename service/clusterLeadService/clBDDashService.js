const { default: mongoose } = require("mongoose");
const leadModel = require("../../model/BDModel/leadModel");
const masterStatusModel = require("../../model/CommonModel/masterStatusModel");
const moment = require("moment");
const callModel = require("../../model/BDModel/callModel");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");
const rfpModel = require("../../model/BDModel/rfpModel");
const proposalModel = require("../../model/BDModel/proposalModel ");
const _ = require("lodash");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");
class CLBdDashService {
  async clGetDashboardService(req) {
    try {
      const { bd_id, start_date, end_date } = req.query;
      const clTarget = await myInstance.getMonthStartDate(req);
      let startDate = new Date(moment().startOf("day"));
      if (clTarget?.month_start_date) {
        startDate = new Date(moment(clTarget.month_start_date).startOf("day"));
      }
      // let startDate = new Date(moment(new Date()).format('YYYY-MM'));
      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(end_date);
      }

      let match = {
        createdAtNew: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      let userFilter = [];

      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      userFilter.push(match);

      let countFilter = [];
      let matchCount = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
        },
      };
      req?.user?._id
        ? countFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? countFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      countFilter.push(matchCount);

      let leadCountFilter = [];
      let leadMatchCount = {
        assign_date: {
          $gte: startDate,
          $lte: endDate,
        },
      };
      req?.user?._id
        ? leadCountFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? leadCountFilter.push({
          "bdData._id": new mongoose.Types.ObjectId(bd_id),
        })
        : "";
      // req?.user?._id ? leadCountFilter.push({ bd_id: req.user._id }) : "";
      leadCountFilter.push(leadMatchCount);

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
                $addFields: {
                  createdAtNew: {
                    $toDate: {
                      $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$assign_date", //createdAt
                      },
                    },
                  },
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
                $match: { $and: userFilter },
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
                $addFields: {
                  createdAtNew: {
                    $toDate: {
                      $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$assign_date", //createdAt
                      },
                    },
                  },
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
                $match: { $and: userFilter },
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

      let totalLeads = await leadModel.aggregate([
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
          $match: { $and: leadCountFilter },
        },
        {
          $group: {
            _id: "null",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let totalCalls = await callModel.aggregate([
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
          $match: { $and: countFilter },
        },
        {
          $group: {
            _id: "null",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let totalRFPs = await rfpModel.aggregate([
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
          $match: { $and: countFilter },
        },
        {
          $group: {
            _id: "null",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let totalProposals = await proposalModel.aggregate([
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
          $match: { $and: countFilter },
        },
        {
          $group: {
            _id: "null",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

      let totalProposalAmount = await proposalModel.aggregate([
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
        { $match: { $and: countFilter } },
        {
          $group: {
            _id: 1,
            totalAmount: { $sum: "$project_amount" },
          },
        },
      ]);

      let totalAmount =
        totalProposalAmount.length > 0 ? totalProposalAmount[0].totalAmount : 0;

      return {
        status: 200,
        success: true,
        msg: "Dashboard data get successfully.",
        data: {
          leadData: masterData,
          bdTargets: clTarget,
          totalLeads: totalLeads,
          totalCalls: totalCalls,
          totalRFPs: totalRFPs,
          totalProposals: totalProposals,
          totalProposalAmount: totalAmount,
        },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Somethin went wrong when CL get Dashboard service.",
        data: error,
      };
    }
  }

  async countObjectsWithUpdateValue(data) {
    try {
      let totalCount = 0;

      for (const key in data) {
        if (data.hasOwnProperty(key) && Array.isArray(data[key])) {
          for (const obj of data[key]) {
            if (obj.hasOwnProperty("updateValue")) {
              totalCount++;
            }
          }
        }
      }

      return await totalCount;
    } catch (error) {
      return false;
    }
  }

  async getMonthStartDate(req) {
    const clusterData = await clusterLeadModel.findById(req.user._id);
    let clTarget = await clusterLeadTargetModel.findOne({
      cluster_lead_id: req.user._id,
      cluster_head_id: clusterData?.cluster_head_id,
      target_month: moment().format("MMMM"),
      target_year: moment().format("YYYY"),
    });
    if (!clTarget) {
      clTarget = await clusterLeadTargetModel.findOne({
        cluster_lead_id: req.user._id,
        cluster_head_id: clusterData?.cluster_head_id,
        target_month: moment().subtract(1, "month").format("MMMM"),
        target_year: moment().subtract(1, "month").format("YYYY"),
      });
    }

    return clTarget;
  }

  // async clGetLeadTypeData(req){
  async clGetLeadTypeGraphData(req) {
    try {
      const { bd_id, start_date, end_date } = req.query;
      const clTarget = await myInstance.getMonthStartDate(req);
      let startDate = new Date(moment().startOf("day"));
      if (clTarget?.month_start_date) {
        startDate = new Date(moment(clTarget.month_start_date).startOf("day"));
      }

      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(end_date);
      }

      let match = {
        assign_date: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      let userFilter = [];

      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";

      userFilter.push(match);

      const leadTypes = await masterStatusModel.find({
        status_type: "lead_type",
      });

      const pipeline = [
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
            $and: userFilter,
            lead_type_id: { $in: leadTypes.map((type) => type._id) },
          },
        },
        {
          $group: {
            _id: {
              assign_date: {
                $dateToString: { format: "%Y-%m-%d", date: "$assign_date" },
              }, //createdAt
              lead_type_id: "$lead_type_id",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.assign_date", //createdAt
            counts: {
              $push: { lead_type_id: "$_id.lead_type_id", count: "$count" },
            },
          },
        },
      ];

      const result = await leadModel.aggregate(pipeline);

      // Create an object with lead types as keys and arrays of counts
      const data = {};
      result.forEach((item) => {
        const date = item._id;
        const counts = item.counts.reduce((acc, cur) => {
          const leadType = leadTypes.find((type) =>
            type._id.equals(cur.lead_type_id)
          );
          return {
            ...acc,
            [leadType.status_name]: cur.count,
          };
        }, {});

        data[date] = counts;
      });

      // Create the final data structure
      const finalData = {
        date: [], // Initialize the date array
      };

      // Initialize arrays for each lead type
      const leadTypesData = leadTypes.map((type) => type.status_name);
      leadTypesData.forEach((leadType) => {
        finalData[leadType] = [];
      });

      // Get an array of all distinct dates in the data
      const allDates = [...new Set(Object.keys(data))].sort();

      // Loop through all possible dates between startDate and endDate
      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateString = date.toISOString().substring(0, 10);
        finalData.date.push(dateString); // Add date to the date array

        leadTypesData.forEach((leadType) => {
          if (finalData[leadType]) {
            const count = (data[dateString] && data[dateString][leadType]) || 0;
            finalData[leadType].push(count);
          }
        });
      }

      return {
        status: 200,
        success: true,
        msg: "Lead type count get successsfully.",
        data: finalData, //{ date, Email, LinkedIn, Upwork }
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get Dashboard lead type count service.",
        data: error,
      };
    }
  }

  async clGetDashFollowupLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date, bd_id } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };

      let startDate = start_date
        ? moment(start_date).startOf("day")
        : moment().startOf("month");
      let endDate = end_date ? moment(end_date).endOf("day") : moment();


      // let addDateField = {
      //   $addFields: {
      //     createdAtNew: {
      //       $toDate: {
      //         $dateToString: {
      //           format: "%Y-%m-%d",
      //           date: "$assign_date", //createdAt
      //         },
      //       },
      //     },
      //   },
      // };

      // let match = {
      //   createdAtNew: {
      //     $gte: startDate,
      //     $lte: endDate,
      //   },
      // };

      let matchQuery = {};
      let userFilter = [];
      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? userFilter.push({ bd_id: new mongoose.Types.ObjectId(bd_id) })
        : "";
      // start_date && end_date ? userFilter.push(match) : "";

      if (search) {
        matchQuery.$or = [{ client_name: { $regex: search, $options: "i" } }];
      }

      const leadFollowup = leadModel.aggregate([
        // addDateField,
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
          $match: { $and: userFilter, ...matchQuery },
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $and: [
              {
                "leadStatusData.status_name": {
                  $nin: ["Dead", "Lead Return", "Awarded", "Hold"],
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_type_id",
            foreignField: "_id",
            as: "leadTypeData",
          },
        },
        {
          $unwind: {
            path: "$leadTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_req_type_id",
            foreignField: "_id",
            as: "reqTypeData",
          },
        },
        {
          $unwind: {
            path: "$reqTypeData",
            preserveNullAndEmptyArrays: true,
          },
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "projection_status",
            foreignField: "_id",
            as: "projectionStatusData",
          },
        },
        {
          $unwind: {
            path: "$projectionStatusData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "lead_activities",
            localField: "_id",
            foreignField: "lead_id",
            as: "leadActivityData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "activity_id",
                  foreignField: "_id",
                  as: "activityData",
                },
              },
              {
                $unwind: "$activityData",
              },
              {
                $match: { "activityData.status_type": "lead_follow_ups" },
              },
              {
                $project: {
                  _id: "$_id",
                  activity_id: "$activityData._id",
                  activityStatusCode: "$activityData.status_code",
                  status_type: "$activityData.status_type",
                  status_name: "$activityData.status_name",
                  followup_date: "$followup_date",
                  createdAt: "$createdAt",
                  updatedAt: "$updatedAt",
                },
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },
            ],
          },
        },
        {
          $project: {
            resp: {
              $arrayElemAt: ["$leadActivityData", 0],
            },
            client_name: 1,
            client_email: 1,
            client_alternate_email: 1,
            client_number: 1,
            client_whatsapp_num: 1,
            client_country: 1,
            address: 1,
            client_linkedin: 1,
            upwork_job_url: 1,
            bid_url: 1,
            skype_id: 1,
            company_name: 1,
            proposal_amount: 1,
            client_budget: 1,
            follow_up: 1,
            status: 1,
            deleted: 1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              email: "$bdData.email",
              designation: "$bdData.designation",
              status: "$bdData.status",
            },
            leadTypeData: {
              _id: "$leadTypeData._id",
              status_name: "$leadTypeData.status_name",
            },
            projectionStatusData: {
              _id: "$projectionStatusData._id",
              status_color: "$projectionStatusData.status_color",
              status_name: "$projectionStatusData.status_name",
            },
            reqTypeData: {
              _id: "$reqTypeData._id",
              status_name: "$reqTypeData.status_name",
            },
            leadSourceData: {
              _id: "$leadSourceData._id",
              status_name: "$leadSourceData.status_name",
            },
            leadStatusData: {
              _id: "$leadStatusData._id",
              status_name: "$leadStatusData.status_name",
            },
            lead_status: "$leadStatusData.status_name",
            createdAt: "$assign_date", //1,
            updatedAt: 1,
          },
        },
        {
          $match: {
            $and: [
              {
                // "resp.status_type": "lead_follow_ups",
                "resp.status_name": {
                  $nin: ["8th follow up"],
                },
              },
              {
                "resp.followup_date":
                  start_date && end_date
                    ? {
                      $gte: startDate.toDate(),
                      $lte: endDate.toDate(),
                    }
                    : {
                      $lte: new Date(moment().endOf("day")),
                    },
              },
            ],
          },
        },
        // {
        //   $match: {
        //     "resp.status_type": "lead_follow_ups",
        //   },
        // },
        {
          $sort: { "resp.activityStatusCode": 1, updatedAt: -1 },
        },
      ]);
      const result = await leadModel.aggregatePaginate(leadFollowup, options);
      let updatedObj = {};

      let lead_follow_ups = await masterStatusModel
        .find({ $and: [{ status_type: "lead_follow_ups" }] })
        .sort({ status_code: 1 });

      // // Iterate through the original array and group objects by status_name
      // result?.docs.forEach((obj) => {
      //   const statusName = obj.resp.status_name;

      //   // let dateplus = 2; //objindex <= 1 ? 1 : objindex > 1 && objindex <= 3 ? 3 : objindex > 3 && objindex <= 5 ? 4 : 5;

      //   // var newDate = new Date(obj.resp.createdAt);

      //   // newDate.setDate(newDate.getDate() + dateplus);
      //   // let updateDate = new Date(newDate.setHours(0, 0, 0, 0));
      //   // if (updateDate <= new Date()) {
      //   if (!updatedObj[statusName]) {
      //     updatedObj[statusName] = [];
      //   }
      //   obj["updateFollowupDate"] = obj?.resp?.followup_date// updateDate;
      //   updatedObj[statusName].push(obj);
      //   // }
      // });

      // let objKeys = Object.keys(updatedObj);

      // objKeys.forEach((updateStatus) => {
      //   var index = lead_follow_ups
      //     .map(function (follow_up) {
      //       return follow_up.status_name;
      //     })
      //     .indexOf(updateStatus);

      //   updatedObj[updateStatus].forEach((updateValue) => {
      //     updateValue["updateValue"] = lead_follow_ups[index + 1];
      //   });
      // });
      // result.docs = updatedObj;
      let updatedArray = [];

      result?.docs?.forEach((obj) => {
        const statusName = obj?.resp?.status_name;
        obj["updateFollowupDate"] = obj?.resp?.followup_date;
        const index = lead_follow_ups.findIndex(
          (follow_up) => follow_up.status_name === statusName
        );
        if (index !== -1 && index + 1 < lead_follow_ups.length) {
          obj["updateValue"] = lead_follow_ups[index + 1];
        }

        updatedArray.push(obj);
      });

      result.docs = updatedArray;
      return {
        status: 200,
        success: true,
        msg: "Dashboard followup lead data get successfully.",
        data: result, //, totalCount }
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup leads service.",
        data: error,
      };
    }
  }

  async clUpdateFollowupDateService(req) {
    try {
      let { lead_activity_id, followup_date, comment } = req.body;

      // Get the current date
      const currentDate = new Date(followup_date);

      let leadActivity = await leadActivityModel.findById(lead_activity_id);
      if (!leadActivity) {
        return {
          status: 400,
          success: false,
          msg: "Lead activity not found.",
          data: leadActivity,
        };
      }

      leadActivity.followup_date = new Date(currentDate); //twoDaysAgo);
      await leadActivity.comment.unshift({
        comment_by_id: req.user._id,
        comment: comment
          ? comment
          : `Follow-up date has been updated to ${currentDate}.`,
      });

      let updateFollowupDate = await leadActivity.save();

      return {
        status: 200,
        success: true,
        msg: "Followup date updated successfully.",
        data: updateFollowupDate,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup leads service.",
        data: error,
      };
    }
  }

  async clDashCallLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date, bd_id, lead_id } = req.query;
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;

      // var date = new Date();
      let startDate = new Date(moment().startOf("month"));
      let endDate = new Date(moment().endOf("day"));
      let meetingStartDate = new Date(moment().startOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        meetingStartDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      let matchQuery = {};
      let userFilter = [];
      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id ? userFilter.push({ bd_id: new mongoose.Types.ObjectId(bd_id) }) : "";
      lead_id
        ? userFilter.push({
          lead_id: new mongoose.Types.ObjectId(lead_id),
        })
        : "";
      if (search) {
        matchQuery.$or = [{ client_name: { $regex: search, $options: "i" } }];
      }

      const aggregationPipeline = [
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
          $match: { $and: userFilter, ...matchQuery },
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
            preserveNullAndEmptyArrays: true,
          },
        },
        // {
        //   $lookup: {
        //     from: "lead_activities",
        //     localField: "leadData._id",
        //     foreignField: "lead_id",
        //     as: "leadActivityData",
        //     pipeline: [
        //       {
        //         $lookup: {
        //           from: "master_statuses",
        //           localField: "activity_id",
        //           foreignField: "_id",
        //           as: "activityData",
        //         },
        //       },
        //       {
        //         $unwind: "$activityData",
        //       },
        //       {
        //         $match: {
        //           "activityData.status_type": "call_status",
        //         },
        //       },
        //       {
        //         $project: {
        //           _id: "$_id",
        //           activity_id: "$activityData._id",
        //           activityStatusCode: "$activityData.status_code",
        //           status_type: "$activityData.status_type",
        //           status_name: "$activityData.status_name",
        //           status_color: "$activityData.status_color",
        //           createdAt: "$createdAt",
        //           updatedAt: "$updatedAt",
        //         },
        //       },
        //       {
        //         $sort: {
        //           createdAt: -1,
        //         },
        //       },
        //     ],
        //   },
        // },
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
            preserveNullAndEmptyArrays: true,
          },
        },
        // {
        //   $lookup: {
        //     from: "call_activities",
        //     localField: "_id",
        //     foreignField: "call_id",
        //     as: "callActivityData",
        //     pipeline: [
        //       {
        //         $lookup: {
        //           from: "master_statuses",
        //           localField: "activity_id",
        //           foreignField: "_id",
        //           as: "activityData",
        //         },
        //       },
        //       {
        //         $unwind: "$activityData",
        //       },
        //       {
        //         $match: {
        //           "activityData.status_type": "call_status",
        //         },
        //       },
        //       {
        //         $project: {
        //           _id: "$_id",
        //           activity_id: "$activityData._id",
        //           activityStatusCode: "$activityData.status_code",
        //           status_type: "$activityData.status_type",
        //           status_name: "$activityData.status_name",
        //           status_color: "$activityData.status_color",
        //           createdAt: "$createdAt",
        //           updatedAt: "$updatedAt",
        //         },
        //       },
        //       {
        //         $sort: {
        //           createdAt: -1,
        //         },
        //       },
        //     ],
        //   },
        // },
        {
          $match: {
            meeting_date_time: {
              $gte: new Date(meetingStartDate),
              $lte: new Date(endDate),
            },
            "leadStatusData.status_name": {
              $nin: ["Dead", "Awarded", "Lead Return"],
            },
          },
        },
        // Add other stages of aggregation...
        { $count: "totalDocs" }, // Add $count stage to count the matched documents
      ];
      const countResult = await callModel.aggregate(aggregationPipeline).exec();
      const totalDocs = countResult.length > 0 ? countResult[0].totalDocs : 0;
      // Calculate skip value for pagination
      const skip = (pageNumber - 1) * pageSize;

      const callStatus = await callModel
        .aggregate([
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
            $match: { $and: userFilter, ...matchQuery },
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
              preserveNullAndEmptyArrays: true,
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
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: {
              meeting_date_time: {
                $gte: new Date(meetingStartDate),
                $lte: new Date(endDate),
              },
              "leadStatusData.status_name": {
                $nin: ["Dead", "Awarded", "Lead Return"],
              },
            },
          },
          {
            $lookup: {
              from: "lead_activities",
              localField: "leadData._id",
              foreignField: "lead_id",
              as: "leadActivityData",
              pipeline: [
                {
                  $lookup: {
                    from: "master_statuses",
                    localField: "activity_id",
                    foreignField: "_id",
                    as: "activityData",
                  },
                },
                {
                  $unwind: "$activityData",
                },
                {
                  $match: {
                    "activityData.status_type": "call_status",
                  },
                },
                {
                  $project: {
                    _id: "$_id",
                    activity_id: "$activityData._id",
                    activityStatusCode: "$activityData.status_code",
                    status_type: "$activityData.status_type",
                    status_name: "$activityData.status_name",
                    status_color: "$activityData.status_color",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                  },
                },
                {
                  $sort: {
                    createdAt: -1,
                  },
                },
              ],
            },
          },

          {
            $lookup: {
              from: "master_statuses",
              localField: "leadData.lead_type_id",
              foreignField: "_id",
              as: "leadTypeData",
            },
          },
          {
            $unwind: {
              path: "$leadTypeData",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "master_statuses",
              localField: "leadData.lead_req_type_id",
              foreignField: "_id",
              as: "reqTypeData",
            },
          },
          {
            $unwind: {
              path: "$reqTypeData",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "master_statuses",
              localField: "leadData.lead_source_id",
              foreignField: "_id",
              as: "leadSourceData",
            },
          },
          {
            $unwind: {
              path: "$leadSourceData",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "master_statuses",
              localField: "call_status_id",
              foreignField: "_id",
              as: "callStatusData",
            },
          },
          {
            $unwind: "$callStatusData",
          },
          {
            $lookup: {
              from: "call_activities",
              localField: "_id",
              foreignField: "call_id",
              as: "callActivityData",
              pipeline: [
                {
                  $lookup: {
                    from: "master_statuses",
                    localField: "activity_id",
                    foreignField: "_id",
                    as: "activityData",
                  },
                },
                {
                  $unwind: "$activityData",
                },
                {
                  $match: {
                    "activityData.status_type": "call_status",
                  },
                },
                {
                  $project: {
                    _id: "$_id",
                    activity_id: "$activityData._id",
                    activityStatusCode: "$activityData.status_code",
                    status_type: "$activityData.status_type",
                    status_name: "$activityData.status_name",
                    status_color: "$activityData.status_color",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                  },
                },
                {
                  $sort: {
                    createdAt: -1,
                  },
                },
              ],
            },
          },

          {
            $project: {
              resp: {
                $arrayElemAt: ["$leadActivityData", 0],
              },
              _id: "$leadData._id",
              client_name: "$leadData.client_name",
              assign_date: "$leadData.assign_date",
              client_number: "$leadData.client_number",
              client_whatsapp_num: "$leadData.client_whatsapp_num",
              client_email: "$leadData.client_email",
              client_alternate_email: "$leadData.client_alternate_email",
              client_country: "$leadData.client_country",
              address: "$leadData.address",
              client_linkedin: "$leadData.client_linkedin",
              upwork_job_url: "$leadData.upwork_job_url",
              bid_url: "$leadData.bid_url",
              skype_id: "$leadData.skype_id",
              company_name: "$leadData.company_name",
              proposal_amount: "$leadData.proposal_amount",
              client_budget: "$leadData.client_budget",
              follow_up: "$leadData.follow_up",
              add_notes: "$leadData.add_notes",
              status: "$leadData.status",
              deleted: "$leadData.deleted",
              updatedAt: "$leadData.updatedAt",
              createdAt: "$assign_date", //1,
              bdData: {
                bd_id: "$bdData._id",
                name: "$bdData.name",
                email: "$bdData.email",
                designation: "$bdData.designation",
              },
              leadTypeData: {
                _id: "$leadTypeData._id",
                status_name: "$leadTypeData.status_name",
              },
              reqTypeData: {
                _id: "$reqTypeData._id",
                status_name: "$reqTypeData.status_name",
              },
              leadSourceData: {
                _id: "$leadSourceData._id",
                status_name: "$leadSourceData.status_name",
              },
              leadStatusData: {
                _id: "$leadStatusData._id",
                status_name: "$leadStatusData.status_name",
                status_color: "$leadStatusData.status_color",
              },
              lead_status: "$leadStatusData.status_name",
              callData: {
                _id: "$_id",
                callResp: {
                  $arrayElemAt: ["$callActivityData", 0],
                },
                meeting_link: "$meeting_link",
                meeting_link: "$meeting_link",
                recording_link: "$recording_link",
                pe_name: "$pe_name",
                meeting_date_time: "$meeting_date_time",
                call_status: "$callStatusData.status_name",
                status_color: "$callStatusData.status_color",
              },
            },
          },
          // {
          //   $match: {
          //     "resp.status_type": "call_status",
          //   },
          // },
          {
            $sort: {
              "resp.activityStatusCode": 1,
              meeting_date_time: -1,
            },
          },
        ])
        .skip(skip)
        .limit(pageSize);

      // const result =  await callModel.aggregatePaginate(callStatus, options);
      const totalPages = Math.ceil(totalDocs / pageSize);
      const result = {
        docs: callStatus,
        totalDocs: totalDocs,
        limit: pageSize,
        page: pageNumber,
        totalPages: totalPages,
        pagingCounter: (pageNumber - 1) * pageSize + 1,
        hasPrevPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages,
        prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
      };
      // const updatedObj = _.groupBy(
      //   result?.docs,
      //   (obj) => obj.callData.call_status
      // );
      // result.docs = updatedObj;
      return {
        status: 200,
        success: true,
        msg: "Dashboard followup call data get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup calls service.",
        data: error,
      };
    }
  }

  async clGetDashCallLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date, bd_id, lead_id } =
        req.query;
      // const {  search, start_date, end_date, bd_id } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };

      let startDate = new Date(moment().startOf("month"));
      let endDate = new Date(moment().endOf("day"));
      let meetingStartDate = new Date(moment().startOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        meetingStartDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      let matchQuery = {};
      let userFilter = [];
      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      lead_id
        ? userFilter.push({ _id: new mongoose.Types.ObjectId(lead_id) })
        : "";
      if (search) {
        matchQuery.$or = [{ client_name: { $regex: search, $options: "i" } }];
      }

      const callStatus = callModel.aggregate([
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
          $lookup: {
            from: "lead_activities",
            localField: "leadData._id",
            foreignField: "lead_id",
            as: "leadActivityData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "activity_id",
                  foreignField: "_id",
                  as: "activityData",
                },
              },
              {
                $unwind: "$activityData",
              },
              {
                $match: { "activityData.status_type": "call_status" },
              },
              {
                $project: {
                  _id: "$_id",
                  activity_id: "$activityData._id",
                  activityStatusCode: "$activityData.status_code",
                  status_type: "$activityData.status_type",
                  status_name: "$activityData.status_name",
                  createdAt: "$createdAt",
                  updatedAt: "$updatedAt",
                },
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },
            ],
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "leadData.lead_type_id",
            foreignField: "_id",
            as: "leadTypeData",
          },
        },
        {
          $unwind: {
            path: "$leadTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "leadData.lead_req_type_id",
            foreignField: "_id",
            as: "reqTypeData",
          },
        },
        {
          $unwind: {
            path: "$reqTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "leadData.lead_source_id",
            foreignField: "_id",
            as: "leadSourceData",
          },
        },
        {
          $unwind: {
            path: "$leadSourceData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "call_status_id",
            foreignField: "_id",
            as: "callStatusData",
          },
        },
        {
          $unwind: "$callStatusData",
        },
        {
          $lookup: {
            from: "call_activities",
            localField: "_id",
            foreignField: "call_id",
            as: "callActivityData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "activity_id",
                  foreignField: "_id",
                  as: "activityData",
                },
              },
              {
                $unwind: "$activityData",
              },
              {
                $match: { "activityData.status_type": "call_status" },
              },
              {
                $project: {
                  _id: "$_id",
                  activity_id: "$activityData._id",
                  activityStatusCode: "$activityData.status_code",
                  status_type: "$activityData.status_type",
                  status_name: "$activityData.status_name",
                  status_color: "$activityData.status_color",
                  createdAt: "$createdAt",
                  updatedAt: "$updatedAt",
                },
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },
            ],
          },
        },
        {
          $match: { $and: userFilter, ...matchQuery },
        },
        {
          $match: {
            meeting_date_time: {
              $gte: new Date(meetingStartDate),
              $lte: new Date(endDate),
            },
            "leadStatusData.status_name": {
              $nin: ["Dead", "Awarded", "Lead Return"],
            },
          },
        },
        {
          $project: {
            resp: {
              $arrayElemAt: ["$leadActivityData", 0],
            },
            _id: "$leadData._id",
            client_name: "$leadData.client_name",
            assign_date: "$leadData.assign_date",
            client_number: "$leadData.client_number",
            client_whatsapp_num: "$leadData.client_whatsapp_num",
            client_email: "$leadData.client_email",
            client_alternate_email: "$leadData.client_alternate_email",
            client_country: "$leadData.client_country",
            address: "$leadData.address",
            client_linkedin: "$leadData.client_linkedin",
            upwork_job_url: "$leadData.upwork_job_url",
            bid_url: "$leadData.bid_url",
            skype_id: "$leadData.skype_id",
            company_name: "$leadData.company_name",
            proposal_amount: "$leadData.proposal_amount",
            client_budget: "$leadData.client_budget",
            follow_up: "$leadData.follow_up",
            add_notes: "$leadData.add_notes",
            status: "$leadData.status",
            deleted: "$leadData.deleted",
            updatedAt: "$leadData.updatedAt",
            createdAt: "$assign_date", //1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              email: "$bdData.email",
              designation: "$bdData.designation",
            },
            leadTypeData: {
              _id: "$leadTypeData._id",
              status_name: "$leadTypeData.status_name",
            },
            reqTypeData: {
              _id: "$reqTypeData._id",
              status_name: "$reqTypeData.status_name",
            },
            leadSourceData: {
              _id: "$leadSourceData._id",
              status_name: "$leadSourceData.status_name",
            },
            leadStatusData: {
              _id: "$leadStatusData._id",
              status_name: "$leadStatusData.status_name",
            },
            lead_status: "$leadStatusData.status_name",
            callData: {
              _id: "$_id",
              callResp: {
                $arrayElemAt: ["$callActivityData", 0],
              },
              meeting_link: "$meeting_link",
              meeting_link: "$meeting_link",
              recording_link: "$recording_link",
              pe_name: "$pe_name",
              meeting_date_time: "$meeting_date_time",
              call_status: "$callStatusData.status_name",
            },
          },
        },
        // {
        //   $match: {
        //     "resp.status_type": "call_status",
        //   },
        // },
        {
          $sort: {
            "resp.activityStatusCode": 1,
            meeting_date_time: -1,
          },
        },
      ]);
      const result = await callModel.aggregatePaginate(callStatus, options);
      // const updatedObj = _.groupBy(
      //   result?.docs,
      //   (obj) => obj.callData.call_status
      // );

      // result.docs = updatedObj;

      return {
        status: 200,
        success: true,
        msg: "Dashboard followup call data get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup calls service.",
        data: error,
      };
    }
  }

  async clDashRfpLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date, bd_id, lead_id } = req.query;
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;

      let startDate = new Date(moment().startOf("month"));
      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      const match = {
        "leadData.assign_date": {
          $gte: startDate,
          $lte: endDate,
        },
      };

      let matchQuery = {};
      let userFilter = [];
      req?.user?._id ? userFilter.push({ "bdData.cluster_lead_id": req.user._id }) : "";
      bd_id ? userFilter.push({ bd_id: new mongoose.Types.ObjectId(bd_id) }) : "";
      start_date && end_date ? userFilter.push(match) : "";
      lead_id
        ? userFilter.push({
          lead_id: new mongoose.Types.ObjectId(lead_id),
        })
        : "";
      if (search) {
        matchQuery.$or = [{ client_name: { $regex: search, $options: "i" } }];
      }

      const aggregationPipeline = [
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: { $and: userFilter, ...matchQuery },
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_rfp_status",
            foreignField: "_id",
            as: "rfpStatusData",
          },
        },
        {
          $unwind: "$rfpStatusData",
        },
        {
          $match: {
            $or: [
              { "rfpStatusData.status_name": "Request For Proposal" },
              { "rfpStatusData.status_name": "Revised RFP" },
              { "rfpStatusData.status_name": "RFP Pending" },
            ],
          },
        },
        {
          $match: {
            // meeting_date_time: {
            //   $gte: new Date(meetingStartDate),
            //   $lte: new Date(endDate),
            // },
            "leadStatusData.status_name": {
              $nin: ["Dead"],
            },
          },
        },
        // Add other stages of aggregation...
        { $count: "totalDocs" }, // Add $count stage to count the matched documents
      ];
      const countResult = await rfpModel.aggregate(aggregationPipeline).exec();
      const totalDocs = countResult.length > 0 ? countResult[0].totalDocs : 0;
      // Calculate skip value for pagination
      const skip = (pageNumber - 1) * pageSize;

      const rfpStatus = await rfpModel
        .aggregate([
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
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: { $and: userFilter, ...matchQuery },
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
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: {
              "leadStatusData.status_name": {
                $nin: ["Dead"],
              },
            },
          },
          {
            $lookup: {
              from: "master_statuses",
              localField: "lead_rfp_status",
              foreignField: "_id",
              as: "rfpStatusData",
            },
          },
          {
            $unwind: "$rfpStatusData",
          },
          {
            $match: {
              $or: [
                { "rfpStatusData.status_name": "Request For Proposal" },
                { "rfpStatusData.status_name": "Revised RFP" },
                { "rfpStatusData.status_name": "RFP Pending" },
              ],
            },
          },
          {
            $lookup: {
              from: "lead_activities",
              localField: "leadData._id",
              foreignField: "lead_id",
              as: "leadActivityData",
              pipeline: [
                {
                  $lookup: {
                    from: "master_statuses",
                    localField: "activity_id",
                    foreignField: "_id",
                    as: "activityData",
                  },
                },
                {
                  $unwind: "$activityData",
                },
                {
                  $match: {
                    "activityData.status_type": "rfp_status",
                  },
                },
                {
                  $project: {
                    _id: "$_id",
                    activity_id: "$activityData._id",
                    activityStatusCode: "$activityData.status_code",
                    status_type: "$activityData.status_type",
                    status_name: "$activityData.status_name",
                    status_color: "$activityData.status_color",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                  },
                },
                {
                  $sort: {
                    createdAt: -1,
                  },
                },
              ],
            },
          },

          {
            $lookup: {
              from: "master_statuses",
              localField: "leadData.lead_type_id",
              foreignField: "_id",
              as: "leadTypeData",
            },
          },
          {
            $unwind: {
              path: "$leadTypeData",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "master_statuses",
              localField: "leadData.lead_req_type_id",
              foreignField: "_id",
              as: "reqTypeData",
            },
          },
          {
            $unwind: {
              path: "$reqTypeData",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "master_statuses",
              localField: "leadData.lead_source_id",
              foreignField: "_id",
              as: "leadSourceData",
            },
          },
          {
            $unwind: {
              path: "$leadSourceData",
              preserveNullAndEmptyArrays: true,
            },
          },
          // {
          //   $lookup: {
          //     from: "rfps",
          //     localField: "_id",
          //     foreignField: "rfp_id",
          //     as: "rfpData",
          //     pipeline: [
          //       {
          //         $lookup: {
          //           from: "master_statuses",
          //           localField: "activity_id",
          //           foreignField: "_id",
          //           as: "activityData",
          //         },
          //       },
          //       {
          //         $unwind: "$activityData",
          //       },
          //       {
          //         $match: {
          //           "activityData.status_type": "rfp_status",
          //         },
          //       },
          //       {
          //         $project: {
          //           _id: "$_id",
          //           activity_id: "$activityData._id",
          //           activityStatusCode: "$activityData.status_code",
          //           status_type: "$activityData.status_type",
          //           status_name: "$activityData.status_name",
          //           status_color: "$activityData.status_color",
          //           createdAt: "$createdAt",
          //           updatedAt: "$updatedAt",
          //         },
          //       },
          //       {
          //         $sort: {
          //           createdAt: -1,
          //         },
          //       },
          //     ],
          //   },
          // },

          {
            $project: {
              resp: {
                $arrayElemAt: ["$leadActivityData", 0],
              },
              _id: "$leadData._id",
              client_name: "$leadData.client_name",
              assign_date: "$leadData.assign_date",
              client_number: "$leadData.client_number",
              client_whatsapp_num: "$leadData.client_whatsapp_num",
              client_email: "$leadData.client_email",
              client_alternate_email: "$leadData.client_alternate_email",
              client_country: "$leadData.client_country",
              address: "$leadData.address",
              client_linkedin: "$leadData.client_linkedin",
              upwork_job_url: "$leadData.upwork_job_url",
              bid_url: "$leadData.bid_url",
              skype_id: "$leadData.skype_id",
              company_name: "$leadData.company_name",
              proposal_amount: "$leadData.proposal_amount",
              client_budget: "$leadData.client_budget",
              follow_up: "$leadData.follow_up",
              add_notes: "$leadData.add_notes",
              status: "$leadData.status",
              deleted: "$leadData.deleted",
              updatedAt: "$leadData.updatedAt",
              createdAt: "$assign_date", //1,
              bdData: {
                bd_id: "$bdData._id",
                name: "$bdData.name",
                email: "$bdData.email",
                designation: "$bdData.designation",
              },
              leadTypeData: {
                _id: "$leadTypeData._id",
                status_name: "$leadTypeData.status_name",
              },
              reqTypeData: {
                _id: "$reqTypeData._id",
                status_name: "$reqTypeData.status_name",
              },
              leadSourceData: {
                _id: "$leadSourceData._id",
                status_name: "$leadSourceData.status_name",
              },
              leadStatusData: {
                _id: "$leadStatusData._id",
                status_name: "$leadStatusData.status_name",
                status_color: "$leadStatusData.status_color",
              },
              lead_status: "$leadStatusData.status_name",
              rfpData: {
                _id: "$_id",
                proposal_value: "$proposal_value",
                lead_rfp_status: "$rfpStatusData.status_name",
                rfpResp: {
                  $arrayElemAt: ["$rfp", 0],
                },
                // meeting_link: "$meeting_link",
                // meeting_link: "$meeting_link",
                // recording_link: "$recording_link",
                // pe_name: "$pe_name",
                // meeting_date_time: "$meeting_date_time",
                // call_status: "$callStatusData.status_name",
                // status_color: "$callStatusData.status_color",
              },
            },
          },
          // {
          //   $match: {
          //     "resp.status_type": "call_status",
          //   },
          // },
          {
            $sort: {
              "resp.activityStatusCode": 1,
              updatedAt: -1,
            },
          },
        ])
        .skip(skip)
        .limit(pageSize);

      // const result =  await callModel.aggregatePaginate(callStatus, options);
      const totalPages = Math.ceil(totalDocs / pageSize);
      const result = {
        docs: rfpStatus,
        totalDocs: totalDocs,
        limit: pageSize,
        page: pageNumber,
        totalPages: totalPages,
        pagingCounter: (pageNumber - 1) * pageSize + 1,
        hasPrevPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages,
        prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
      };
      // const updatedObj = _.groupBy(
      //   result?.docs,
      //   (obj) => obj.callData.call_status
      // );
      // result.docs = updatedObj;
      return {
        status: 200,
        success: true,
        msg: "Dashboard followup call data get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup calls service.",
        data: error,
      };
    }
  }

  async clGetDashRfpLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date, bd_id } = req.query;
      // const {  search, start_date, end_date, bd_id } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };
      var date = new Date();
      let startDate = new Date(moment().startOf("month")); // new Date(
      // `${date.getFullYear()}-${date.getMonth() + 1}-01`
      // );
      // let startDate = new Date(moment(new Date()).format('YYYY-MM'));
      let endDate = new Date(moment().endOf("day")); //new Date();

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day")); //new Date(start_date);
        endDate = new Date(moment(end_date).endOf("day")); //new Date(end_date);
      }
      let addDateField = {
        $addFields: {
          createdAtNew: {
            $toDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$assign_date", //createdAt
              },
            },
          },
        },
      };

      let match = {
        createdAtNew: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      let matchQuery = {};
      let userFilter = [];
      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      start_date && end_date ? userFilter.push(match) : "";
      req?.query?.lead_id
        ? userFilter.push({
          _id: new mongoose.Types.ObjectId(req.query.lead_id),
        })
        : "";
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          // { "leadData.client_email": { $regex: search, $options: 'i' } }, // Case-insensitive search for client_email
        ];
      }

      const rfpStatus = leadModel.aggregate([
        addDateField,
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
          $match: { $and: userFilter, ...matchQuery },
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $and: [
              {
                "leadStatusData.status_name": {
                  $nin: ["Lead Return", "Awarded", "Hold"],
                },
              },
            ],
          }, //"Proposal Submitted",//, "Lead Return", "Awarded", "Hold"
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_type_id",
            foreignField: "_id",
            as: "leadTypeData",
          },
        },
        {
          $unwind: {
            path: "$leadTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_req_type_id",
            foreignField: "_id",
            as: "reqTypeData",
          },
        },
        {
          $unwind: {
            path: "$reqTypeData",
            preserveNullAndEmptyArrays: true,
          },
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "lead_activities",
            localField: "_id",
            foreignField: "lead_id",
            as: "leadActivityData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "activity_id",
                  foreignField: "_id",
                  as: "activityData",
                },
              },
              {
                $unwind: "$activityData",
              },
              {
                $match: {
                  "activityData.status_type": "rfp_status",
                },
              },
              {
                $project: {
                  _id: "$activityData._id",
                  activityStatusCode: "$activityData.status_code",
                  status_type: "$activityData.status_type",
                  status_name: "$activityData.status_name",
                  createdAt: "$createdAt",
                  updatedAt: "$updatedAt",
                },
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "rfps",
            localField: "_id",
            foreignField: "lead_id",
            as: "rfpData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "lead_rfp_status",
                  foreignField: "_id",
                  as: "rfpStatusData",
                },
              },
              {
                $unwind: "$rfpStatusData",
              },
              {
                $match: {
                  "rfpStatusData.status_type": "rfp_status",
                },
              },
              {
                $project: {
                  _id: "$_id",
                  proposal_value: "$proposal_value",
                  lead_rfp_status: "$rfpStatusData.status_name",
                  //"$rfp"
                  rfp: {
                    $arrayElemAt: ["$rfp", 0],
                  },
                  // 'client_name': 1,
                  // 'client_email': 1,
                  // 'client_number': 1,
                  // 'lead_status': '$leadStatusData.status_name',
                  // 'createdAt': 1,
                  // 'updatedAt': 1,
                },
              },
            ],
          },
        },
        {
          $match: {
            $or: [
              { "rfpData.lead_rfp_status": "Request For Proposal" },
              { "rfpData.lead_rfp_status": "Revised RFP" },
              { "rfpData.lead_rfp_status": "RFP Pending" },
            ],
          },
        },
        {
          $project: {
            resp: {
              $arrayElemAt: ["$leadActivityData", 0],
            },
            rfpData: {
              $arrayElemAt: ["$rfpData", 0],
            },
            client_name: 1,
            client_email: 1,
            client_alternate_email: 1,
            client_number: 1,
            client_whatsapp_num: 1,
            client_country: 1,
            address: 1,
            client_linkedin: 1,
            upwork_job_url: 1,
            bid_url: 1,
            skype_id: 1,
            company_name: 1,
            proposal_amount: 1,
            client_budget: 1,
            follow_up: 1,
            add_notes: 1,
            status: 1,
            deleted: 1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              email: "$bdData.email",
              designation: "$bdData.designation",
              status: "$bdData.status",
            },
            leadTypeData: {
              _id: "$leadTypeData._id",
              status_name: "$leadTypeData.status_name",
            },
            reqTypeData: {
              _id: "$reqTypeData._id",
              status_name: "$reqTypeData.status_name",
            },
            leadSourceData: {
              _id: "$leadSourceData._id",
              status_name: "$leadSourceData.status_name",
            },
            leadStatusData: {
              _id: "$leadStatusData._id",
              status_name: "$leadStatusData.status_name",
            },
            lead_status: "$leadStatusData.status_name",
            createdAt: "$assign_date", //1,
            updatedAt: 1,
          },
        },
        {
          $match: {
            "resp.status_type": "rfp_status",
          },
        },
        {
          $sort: { "resp.activityStatusCode": 1, updatedAt: -1 },
        },
      ]);

      const result = await leadModel.aggregatePaginate(rfpStatus, options);
      // let updatedObj = {};

      // result?.docs.forEach((obj) => {
      //   const statusName = obj.resp.status_name;

      //   if (!updatedObj[statusName]) {
      //     updatedObj[statusName] = [];
      //   }

      //   updatedObj[statusName].push(obj);
      // });

      // // Now updatedObj will contain objects grouped by status_name
      // result.docs = updatedObj;
      return {
        status: 200,
        success: true,
        msg: "Dashboard RFP Status data get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard RFPs status service.",
        data: error,
      };
    }
  }

  async clGetLeadDetailsService(req) {
    try {
      const { page, limit, search, lead_id } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };
      // Create an empty match query
      let matchQuery = {};
      let userFilter = [];

      // req?.user?._id ? userFilter.push({ bd_id: req.user._id }) : "";
      lead_id
        ? userFilter.push({ _id: new mongoose.Types.ObjectId(lead_id) })
        : "";
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
        ];
      }

      const lead = await leadModel.aggregate([
        {
          $match: { $and: userFilter, ...matchQuery },
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
          $lookup: {
            from: "master_statuses",
            localField: "lead_type_id",
            foreignField: "_id",
            as: "leadTypeData",
          },
        },
        {
          $unwind: {
            path: "$leadTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_req_type_id",
            foreignField: "_id",
            as: "reqTypeData",
          },
        },
        {
          $unwind: {
            path: "$reqTypeData",
            preserveNullAndEmptyArrays: true,
          },
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
            preserveNullAndEmptyArrays: true,
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            lead_req_type_id: 1,
            lead_source_id: 1,
            client_name: 1,
            client_number: 1,
            client_whatsapp_num: 1,
            client_email: 1,
            client_alternate_email: 1,
            client_country: 1,
            address: 1,
            client_linkedin: 1,
            upwork_job_url: 1,
            bid_url: 1,
            skype_id: 1,
            company_name: 1,
            proposal_amount: 1,
            client_budget: 1,
            follow_up: 1,
            add_notes: 1,
            lead_status: 1,
            status: 1,
            deleted: 1,
            createdAt: "$assign_date", //1,
            updatedAt: 1,
            bdData: {
              bd_id: "$bdData._id",
              status_name: "$bdData.status_name",
              email: "$bdData.email",
              designation: "$bdData.designation",
            },
            leadTypeData: {
              _id: "$leadTypeData._id",
              status_name: "$leadTypeData.status_name",
            },
            reqTypeData: {
              _id: "$reqTypeData._id",
              status_name: "$reqTypeData.status_name",
            },
            leadSourceData: {
              _id: "$leadSourceData._id",
              status_name: "$leadSourceData.status_name",
            },
            leadStatusData: {
              _id: "$leadStatusData._id",
              status_name: "$leadStatusData.status_name",
            },
          },
        },
        {
          $sort: {
            createdAt: -1, // Sort by createdAt date in descending order
          },
        },
      ]);

      if (!lead || lead == "") {
        return { status: 201, success: true, msg: "Lead not found.", data: [] };
      }
      return {
        status: 200,
        success: true,
        msg: "Lead details get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead detail service.",
        data: error,
      };
    }
  }

  async clGetCallDetailService(req) {
    try {
      const { page, limit, search, lead_id } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };
      // Create an empty match query
      let matchQuery = {};
      let userFilter = [];

      // req?.user?._id ? userFilter.push({ bd_id: req.user._id }) : "";
      lead_id
        ? userFilter.push({ _id: new mongoose.Types.ObjectId(lead_id) })
        : "";
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
        ];
      }

      const lead = await leadModel.aggregate([
        {
          $match: { $and: userFilter, ...matchQuery },
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
          $lookup: {
            from: "master_statuses",
            localField: "lead_type_id",
            foreignField: "_id",
            as: "leadTypeData",
          },
        },
        {
          $unwind: {
            path: "$leadTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_req_type_id",
            foreignField: "_id",
            as: "reqTypeData",
          },
        },
        {
          $unwind: {
            path: "$reqTypeData",
            preserveNullAndEmptyArrays: true,
          },
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
            preserveNullAndEmptyArrays: true,
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "calls",
            localField: "_id",
            foreignField: "lead_id",
            as: "callData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "call_type_id",
                  foreignField: "_id",
                  as: "callTypeData",
                },
              },
              {
                $unwind: "$callTypeData",
              },
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "call_mode_id",
                  foreignField: "_id",
                  as: "callModeData",
                },
              },
              {
                $unwind: "$callModeData",
              },
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "call_status_id",
                  foreignField: "_id",
                  as: "callStatusData",
                },
              },
              {
                $unwind: "$callStatusData",
              },
              {
                $project: {
                  _id: "$_id",
                  meeting_link: "$meeting_link",
                  pe_name: "$pe_name",
                  recording_link: "$recording_link",
                  meeting_date_time: "$meeting_date_time",
                  comment_remark: "$comment_remark",
                  status: "$status",
                  deleted: "$deleted",
                  createdAt: "$createdAt",
                  updatedAt: "$updatedAt",
                  call_type: "$callTypeData.status_name",
                  call_mode: "$callModeData.status_name",
                  call_status: "$callStatusData.status_name",
                },
              },
              // {
              //     '$sort': {
              //         'createdAt': -1
              //     }
              // }
            ],
          },
        },
        {
          $project: {
            client_name: 1,
            client_number: 1,
            client_whatsapp_num: 1,
            client_email: 1,
            client_alternate_email: 1,
            client_country: 1,
            address: 1,
            client_linkedin: 1,
            upwork_job_url: 1,
            bid_url: 1,
            skype_id: 1,
            company_name: 1,
            proposal_amount: 1,
            client_budget: 1,
            follow_up: 1,
            add_notes: 1,
            lead_status: 1,
            status: 1,
            deleted: 1,
            createdAt: "$assign_date", //1,
            updatedAt: 1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              email: "$bdData.email",
              designation: "$bdData.designation",
            },
            leadType: "$leadTypeData.status_name",
            reqType: "$reqTypeData.status_name",
            leadSource: "$leadSourceData.status_name",
            leadStatus: "$leadStatusData.status_name",
            callData: {
              $arrayElemAt: ["$callData", 0],
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      if (!lead || lead == "") {
        return { status: 201, success: true, msg: "Lead not found.", data: [] };
      }
      return {
        status: 200,
        success: true,
        msg: "Lead details get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead detail service.",
        data: error,
      };
    }
  }

  async clGetRfpDetailService(req) {
    try {
      const { page, limit, search, lead_id } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };
      // Create an empty match query
      let matchQuery = {};
      let userFilter = [];

      // req?.user?._id ? userFilter.push({ bd_id: req.user._id }) : "";
      lead_id
        ? userFilter.push({ _id: new mongoose.Types.ObjectId(lead_id) })
        : "";
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
        ];
      }

      const lead = await leadModel.aggregate([
        {
          $match: { $and: userFilter, ...matchQuery },
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
          $lookup: {
            from: "master_statuses",
            localField: "lead_type_id",
            foreignField: "_id",
            as: "leadTypeData",
          },
        },
        {
          $unwind: {
            path: "$leadTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "master_statuses",
            localField: "lead_req_type_id",
            foreignField: "_id",
            as: "reqTypeData",
          },
        },
        {
          $unwind: {
            path: "$reqTypeData",
            preserveNullAndEmptyArrays: true,
          },
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
            preserveNullAndEmptyArrays: true,
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
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "rfps",
            localField: "_id",
            foreignField: "lead_id",
            as: "rfpData",
            pipeline: [
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "lead_rfp_status",
                  foreignField: "_id",
                  as: "rfpStatusData",
                },
              },
              {
                $unwind: "$rfpStatusData",
              },
              {
                $project: {
                  subRfp: {
                    $arrayElemAt: ["$rfp", 0],
                  },
                  lead_rfp_status: "$rfpStatusData.status_name",
                },
              },
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "subRfp.rfp_type",
                  foreignField: "_id",
                  as: "rfpTypeData",
                },
              },
              {
                $unwind: "$rfpTypeData",
              },
              {
                $lookup: {
                  from: "master_statuses",
                  localField: "subRfp.activity_id",
                  foreignField: "_id",
                  as: "rfpActivityData",
                },
              },
              {
                $unwind: "$rfpActivityData",
              },
              {
                $project: {
                  sub_rfp_id: "$subRfp._id",
                  lead_rfp_status: "$lead_rfp_status",
                  rfp_type: "$rfpTypeData.status_name",
                  activity: "$rfpActivityData.status_name",
                  pe_name: "$subRfp.pe_name",
                  pe_email: "$subRfp.pe_email",
                  remarks: "$subRfp.remarks",
                  minutes_of_meeting: "$subRfp.minutes_of_meeting",
                  attachments: "$subRfp.attachments",
                  createdAt: "$subRfp.createdAt",
                  updatedAt: "$subRfp.updatedAt",
                },
              },
              {
                $sort: {
                  createdAt: -1,
                },
              },
            ],
          },
        },
        {
          $unwind: "$rfpData",
        },
        {
          $project: {
            client_name: 1,
            client_number: 1,
            client_whatsapp_num: 1,
            client_email: 1,
            client_alternate_email: 1,
            client_country: 1,
            address: 1,
            client_linkedin: 1,
            upwork_job_url: 1,
            bid_url: 1,
            skype_id: 1,
            company_name: 1,
            proposal_amount: 1,
            client_budget: 1,
            follow_up: 1,
            add_notes: 1,
            lead_status: 1,
            status: 1,
            deleted: 1,
            createdAt: "$assign_date", //1,
            updatedAt: 1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              email: "$bdData.email",
              designation: "$bdData.designation",
            },
            leadType: "$leadTypeData.status_name",
            reqType: "$reqTypeData.status_name",
            leadSource: "$leadSourceData.status_name",
            leadStatus: "$leadStatusData.status_name",
            rfpData: "$rfpData",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      if (!lead || lead == "") {
        return { status: 201, success: true, msg: "RFP not found.", data: [] };
      }
      return {
        status: 200,
        success: true,
        msg: "RFP details get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead RFP detail service.",
        data: error,
      };
    }
  }
}

const myInstance = new CLBdDashService();

module.exports = new CLBdDashService();
