const mongoose = require("mongoose");
const bdModel = require("../../model/BDModel/bdModel");
const leadModel = require("../../model/BDModel/leadModel");
const proposalModel = require("../../model/BDModel/proposalModel ");
const dsrModel = require("../../model/BDModel/dsrModel");
const moment = require("moment");
const leadResponseModel = require("../../model/BDModel/leadResponseModel");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");
const _ = require("lodash");
const callModel = require("../../model/BDModel/callModel");
const followupCallModel = require("../../model/BDModel/followupCallModel");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
class ClBdDSRService {
  async getBDDSRReportService(req) {
    try {
      const { page, limit, search, start_date, end_date } = req.query;
      const options = {
        page: page ? page : 1,
        limit: limit ? limit : 20,
      };
      const matchObject = {};
      matchObject.cluster_lead_id = new mongoose.Types.ObjectId(req.user._id);

      if (start_date && end_date) {
        matchObject.createdAt = {
          $gte: new Date(moment(start_date).startOf("day")),
          $lt: new Date(moment(end_date).endOf("day")),
        };
      }
      if (search) {
        matchObject.bd_id = new mongoose.Types.ObjectId(search);
      }
      const resultAggregate = dsrModel.aggregate([
        {
          $match: matchObject,
        },
        {
          $sort: {
            createdAt: -1,
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
            _id: 1,
            bd_id: 1,
            bd_username: "$bdData.username",
            bd_name: "$bdData.name",
            bd_email: "$bdData.email",
            cluster_head_id: 1,
            cluster_lead_id: 1,
            createdAt: 1,
          },
        },
      ]);

      const result = await dsrModel.aggregatePaginate(resultAggregate, options);

      for (let i = 0; i < result.docs.length; i++) {
        const element = result.docs[i];
        const bdTarget = await bdTargetModel.findOne({
          $and: [
            { bd_id: element.bd_id },
            { target_month: moment(element.createdAt).format("MMMM") },
            { target_year: moment(element.createdAt).format("YYYY") },
          ],
        });
        element.bd_target = bdTarget ? bdTarget.completed_target : 0;
      }

      return {
        status: 200,
        success: true,
        msg: "BD DSR get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }

  async getBDDSRReportDetailsService(req) {
    try {
      const { body } = req;
      const dsrCheck = await dsrModel.findById(body.dsr_id);

      const startDate = moment(dsrCheck.createdAt).startOf("day");
      const endDate = moment(dsrCheck.createdAt).endOf("day");

      const leadAssigned = await leadModel
        .find({
          assign_date: {
            $gte: startDate,
            $lt: endDate,
          },
          bd_id: new mongoose.Types.ObjectId(dsrCheck.bd_id),
        })
        .populate("lead_type_id lead_source_id");

      const leadResponses = await leadResponseModel.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate),
            },
            bd_id: new mongoose.Types.ObjectId(dsrCheck.bd_id),
          },
        },
        {
          $lookup: {
            from: "leads", // Replace with the actual name of the collection
            localField: "lead_id",
            foreignField: "_id",
            as: "leadData",
          },
        },
        {
          $unwind: "$leadData",
        },
        {
          $lookup: {
            from: "master_statuses", // Replace with the actual name of the collection
            localField: "leadData.lead_source_id",
            foreignField: "_id",
            as: "leadSourceData",
          },
        },
        {
          $unwind: "$leadSourceData",
        },
        {
          $lookup: {
            from: "master_statuses", // Replace with the actual name of the collection
            localField: "leadData.lead_type_id",
            foreignField: "_id",
            as: "leadTypeData",
          },
        },
        {
          $unwind: "$leadTypeData",
        },
      ]);

      const followups = await leadActivityModel.aggregate([
        {
          $lookup: {
            from: "master_statuses",
            localField: "activity_id",
            foreignField: "_id",
            as: "activityData",
          },
        },
        {
          $unwind: {
            path: "$activityData",
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
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lt: new Date(endDate),
            },
            ["leadData.bd_id"]: new mongoose.Types.ObjectId(dsrCheck.bd_id),
            ["activityData.status_type"]: "lead_follow_ups",
          },
        },
      ]);

      const meetingResponses = await callModel
        .find({
          meeting_date_time: {
            $gte: startDate,
            $lt: endDate,
          },
          bd_id: new mongoose.Types.ObjectId(dsrCheck.bd_id),
        })
        .populate("call_type_id call_mode_id call_status_id");

      const proposalData = await proposalModel
        .find({
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
          bd_id: new mongoose.Types.ObjectId(dsrCheck.bd_id),
        })
        .populate("proposal.proposal_type_id");

      const callsData = await followupCallModel.find({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
        bd_id: new mongoose.Types.ObjectId(dsrCheck.bd_id),
      });
      const responseCounts = {
        // _id: body.dsr_id,
        lead_positive_response: _.get(
          _.countBy(leadResponses, "response"),
          "1",
          0
        ),
        lead_negative_response: _.get(
          _.countBy(leadResponses, "response"),
          "2",
          0
        ),
        upwork_bids: _.get(
          _.countBy(leadAssigned, "lead_type_id.status_name"),
          "Upwork",
          0
        ),
        linkedin_response: _.get(
          _.countBy(leadResponses, (response) => {
            return (
              response.leadSourceData.status_name === "Self" &&
              response.leadTypeData.status_name === "LinkedIn"
            );
          }),
          true,
          0
        ),
        upwork_positive_response: _.get(
          _.countBy(leadResponses, (response) => {
            return (
              response.response === 1 &&
              response.leadSourceData.status_name === "Self" &&
              response.leadTypeData.status_name === "Upwork"
            );
          }),
          true,
          0
        ),
        lead_assigned: leadAssigned.length,
        follow_ups: followups.length,
        meeting_scheduled: meetingResponses.length,
        meeting_done: _.get(
          _.countBy(meetingResponses, "call_status_id.status_name"),
          "Meeting Done",
          0
        ),
        proposal_submitted: proposalData.length,
        estimation_submitted: _.get(
          _.countBy(proposalData, "proposal.0.proposal_type_id.status_name"),
          "Estimation",
          0
        ),
        understanding_queries_submitted: _.get(
          _.countBy(proposalData, "proposal.0.proposal_type_id.status_name"),
          "Understanding and Queries",
          0
        ),
        feature_list_shared: _.get(
          _.countBy(proposalData, "proposal.0.proposal_type_id.status_name"),
          "Features List",
          0
        ),
        phone_call_done: callsData.length,
        proposal_amount: _.sumBy(proposalData, (response) => {
          return response.proposal_submitted === "Yes" &&
            response.proposal[0].proposal_type_id.status_name ===
              "Detailed Proposal"
            ? response.project_amount
            : 0;
        }),
      };

      const result = await dsrModel
        .findByIdAndUpdate(
          body.dsr_id,
          {
            $set: responseCounts,
          },
          { new: true }
        )
        .populate("bd_id", "emp_id username name email");

      return {
        status: 200,
        success: true,
        msg: "DSR Detail get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }

  async getCLDSRReportService(req) {
    try {
      const { page, limit, search, start_date, end_date } = req.query;
      const options = {
        page: page ? page : 1,
        limit: limit ? limit : 20,
      };
      const matchObject = {};
      matchObject.cluster_lead_id = new mongoose.Types.ObjectId(req.user._id);

      if (start_date && end_date) {
        matchObject.createdAt = {
          $gte: new Date(moment(start_date).startOf("day")),
          $lt: new Date(moment(end_date).endOf("day")),
        };
      }
      if (search) {
        matchObject.bd_id = new mongoose.Types.ObjectId(search);
      }
      const resultAggregate = dsrModel.aggregate([
        {
          $match: matchObject,
        },
        {
          $sort: {
            createdAt: -1,
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
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
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
            createdAt: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
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
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      const result = await dsrModel.aggregatePaginate(resultAggregate, options);

      return {
        status: 200,
        success: true,
        msg: "CL DSR get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }
}

module.exports = new ClBdDSRService();
