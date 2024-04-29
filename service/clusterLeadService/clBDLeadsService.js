const { default: mongoose } = require("mongoose");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");
const leadModel = require("../../model/BDModel/leadModel");
const masterStatusModel = require("../../model/CommonModel/masterStatusModel");
const leadResponseModel = require("../../model/BDModel/leadResponseModel");
const followupCallModel = require("../../model/BDModel/followupCallModel");
const moment = require("moment");
const { generateFollowupDate } = require("../../helper/helperFun");
const callActivityModel = require("../../model/BDModel/callActivityModel");
const rfpActivityModel = require("../../model/BDModel/rfpActivityModel");

class ClBDELeadsService {
  async clGetLeadsService(req) {
    try {
      const {
        page,
        limit,
        search,
        bd_id,
        lead_status_id,
        start_date,
        end_date,
        with_number,
        client_country,
        lead_req_type_id,
        lead_source_id,
        lead_type_id,
      } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };

      var date = new Date();
      let startDate = new Date(moment().startOf("month"));
      // new Date(
      //   `${date.getFullYear()}-${date.getMonth() + 1}-01`
      // );
      // let startDate = new Date(moment(new Date()).format('YYYY-MM'));
      let endDate = new Date(moment(end_date).endOf("day")); //new Date();

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day")); //new Date(start_date);
        endDate = new Date(moment(end_date).endOf("day")); //new Date(end_date);
      }
      let match = {
        assign_date: {
          //createdAt
          $gte: startDate,
          $lte: endDate,
        },
      };
      // Create an empty match query
      const matchQuery = {};
      let userFilter = [];

      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      with_number
        ? with_number == 0
          ? userFilter.push({ client_number: "" })
          : userFilter.push({ client_number: { $ne: "" } })
        : "";
      lead_status_id
        ? userFilter.push({
            lead_status: new mongoose.Types.ObjectId(lead_status_id),
          })
        : "";
      lead_type_id
        ? userFilter.push({
            lead_type_id: new mongoose.Types.ObjectId(lead_type_id),
          })
        : "";
      lead_req_type_id
        ? userFilter.push({
            lead_req_type_id: new mongoose.Types.ObjectId(lead_req_type_id),
          })
        : "";
      lead_source_id
        ? userFilter.push({
            lead_source_id: new mongoose.Types.ObjectId(lead_source_id),
          })
        : "";
      client_country
        ? userFilter.push({
            client_country: { $regex: client_country, $options: "i" },
          })
        : "";
      start_date && end_date ? userFilter.push(match) : "";
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { "bdData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
          { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
          {
            ["leadTypeData.status_name"]: { $regex: search, $options: "i" },
          },
        ];
      }

      const resultAggregate = leadModel.aggregate([
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
          $match: { $and: userFilter, ...matchQuery },
        },
        {
          $lookup: {
            from: "lead_responses", // Assuming the collection name is "lead_responses"
            let: { leadId: "$_id", leadCreatedAt: "$assign_date" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$lead_id", "$$leadId"] },
                      { $gte: ["$createdAt", "$$leadCreatedAt"] },
                    ],
                  },
                },
                // $match: {
                //     $expr: { $eq: ["$lead_id", "$$leadId"] },
                //     createdAt: { $gte: '$$leadCreatedAt', $lte: endDate },
                // },
              },
              {
                $facet: {
                  totalResponses: [{ $count: "count" }],
                  positiveResponses: [
                    { $match: { response: 1 } },
                    { $count: "count" },
                  ],
                  negativeResponses: [
                    { $match: { response: 2 } },
                    { $count: "count" },
                  ],
                },
              },
            ],
            as: "leadResponseData",
          },
        },

        {
          $project: {
            // resp: {
            //   $arrayElemAt: ["$leadActivityData", 0],
            // },
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
            transfer_lead: 1,
            transfer_lead_id: 1,
            transfer_lead_date: 1,
            status: 1,
            deleted: 1,
            createdAt: "$assign_date", //1,
            updatedAt: 1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              cluster_lead_id: "$bdData.cluster_lead_id",
              // status_name: "$bdData.status_name",
              status: "$bdData.status",
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
            leadResponseData: {
              totalResponses: {
                $arrayElemAt: ["$leadResponseData.totalResponses.count", 0],
              },
              positiveResponses: {
                $arrayElemAt: ["$leadResponseData.positiveResponses.count", 0],
              },
              negativeResponses: {
                $arrayElemAt: ["$leadResponseData.negativeResponses.count", 0],
              },
            },
          },
        },
        {
          $sort: {
            "resp.followup_date": -1, // Sort by createdAt date in descending order
            createdAt: -1, // Sort by createdAt date in descending order
          },
        },
      ]);

      const lead = await leadModel.aggregatePaginate(resultAggregate, options);

      if (!lead || lead == "") {
        return { status: 201, success: true, msg: "Lead not found.", data: [] };
      }

      for (let i = 0; i < lead.docs.length; i++) {
        const element = lead.docs[i];
        const leadActivity = await leadActivityModel.aggregate([
          {
            $match: {
              lead_id: new mongoose.Types.ObjectId(element._id),
            },
          },
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
            $lookup: {
              from: "master_statuses",
              let: {
                status_code_plus_one: {
                  $add: ["$activityData.status_code", 1],
                },
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$status_code", "$$status_code_plus_one"],
                    },
                  },
                },
              ],
              as: "updateActivityData",
            },
          },
          {
            $unwind: "$updateActivityData",
          },
          {
            $project: {
              _id: "$_id",
              activity_id: "$activityData._id",
              activityStatusCode: "$activityData.status_code",
              status_type: "$activityData.status_type",
              status_name: "$activityData.status_name",
              update_activity_id: "$updateActivityData._id",
              update_activityStatusCode: "$updateActivityData.status_code",
              update_status_type: "$updateActivityData.status_type",
              update_status_name: "$updateActivityData.status_name",
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
        ]);
        element.resp = leadActivity[0];
      }
      return {
        status: 200,
        success: true,
        msg: "Lead get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead service.",
        data: error,
      };
    }
  }

  async clUpdateLeadService(req) {
    try {
      const body = req.body;
      // const profilePic = req.file;
      const lead = await leadModel.findOne({ _id: body.lead_id });
      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found",
          data: lead,
        };
      }

      const leadValid = {};
      if (
        body.client_name != lead.client_name ||
        body.client_linkedin != lead.client_linkedin ||
        body.upwork_job_url != lead.upwork_job_url
      ) {
        leadValid["client_name"] = body.client_name;
        leadValid["lead_req_type_id"] = body.lead_req_type_id;
        leadValid["lead_type_id"] = body.lead_type_id;
        leadValid["client_linkedin"] = body.client_linkedin;
        leadValid["upwork_job_url"] = body.upwork_job_url;
      }

      const filterLeadValid = {
        ...Object.fromEntries(Object.entries(leadValid).filter(([_, v]) => v)),
      };

      if (filterLeadValid && Object.keys(filterLeadValid).length > 0) {
        const leadFind = await leadModel
          .find({ $and: [{ _id: { $nin: body.lead_id } }, filterLeadValid] })
          .populate("bd_id", "emp_id name email")
          .populate("lead_type_id", "status_name");

        if (
          leadFind &&
          leadFind.bd_id?._id.toString() === req.user?._id.toString()
        ) {
          return {
            success: false,
            msg: "You have already added this lead.",
            status: 400,
            data: leadFind,
          };
        }

        if (leadFind && leadFind != "") {
          return {
            success: false,
            msg: `The ${leadFind?.bd_id?.name} handling this lead, ${lead?.lead_type_id?.status_name} type lead.`,
            status: 400,
            data: lead,
          };
        }
      }

      // const formData = leadModel(filterLead);
      lead.client_name = body.client_name;
      lead.client_linkedin = body.client_linkedin;
      lead.upwork_job_url = body.upwork_job_url;
      lead.client_number = body.client_number;
      lead.client_country = body.client_country;
      lead.address = body.address;
      lead.client_whatsapp_num = body.client_whatsapp_num;
      lead.client_email = body.client_email;
      lead.client_alternate_email = body.client_alternate_email;
      lead.bid_url = body.bid_url;
      lead.skype_id = body.skype_id;
      lead.company_name = body.company_name;
      lead.proposal_amount = body.proposal_amount;
      lead.client_budget = body.client_budget;
      lead.add_notes = body.add_notes;
      lead.lead_req_type_id = body?.lead_req_type_id
        ? body.lead_req_type_id
        : lead.lead_req_type_id;
      lead.lead_type_id = body?.lead_type_id
        ? body.lead_type_id
        : lead.lead_type_id;
      lead.lead_source_id = body?.lead_source_id
        ? body.lead_source_id
        : lead.lead_source_id;
      // lead.lead_status = body.lead_status ? body.lead_status :

      const updateLead = await lead.save();
      return {
        status: 201,
        success: true,
        msg: "Lead updated successfully.",
        data: updateLead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Lead service.",
        data: error,
      };
    }
  }

  async clUpdateLeadStatusService(req) {
    try {
      const body = req.body;
      // const profilePic = req.file;
      const lead = await leadModel.findOne({ _id: body.lead_id });
      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found",
          data: lead,
        };
      }
      const leadStatus = await masterStatusModel.findOne({
        _id: body.lead_status,
      });
      if (!leadStatus) {
        return {
          status: 400,
          success: false,
          msg: "Lead status not found",
          data: leadStatus,
        };
      }
      lead.lead_status = body.lead_status;
      // lead.lead_status = body.lead_status ? body.lead_status :

      const updateLeadStatus = await lead.save();
      // if (
      //   leadStatus.status_name == "Dead" ||
      //   leadStatus.status_name == "Lead Return"
      // ) {
      //   const leadActivity = await leadActivityModel({
      //     lead_id: body.lead_id,
      //     activity_id: leadStatus?._id ? leadStatus?._id : "",
      //     comment: [
      //       {
      //         comment_by_id: req.user._id,
      //         comment: `${leadStatus.status_name} by ${req.user.name}`,
      //       },
      //     ],
      //   });

      //   const leadactivityData = await leadActivity.save();
      // }
      return {
        status: 201,
        success: true,
        msg: "Lead status updated successfully.",
        data: updateLeadStatus,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update lead status service.",
        data: error,
      };
    }
  }

  async clGetDropdownLeadsService(req) {
    try {
      const { page, limit, search, bd_id } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };
      // Create an empty match query
      const matchQuery = {};
      let userFilter = [];

      req?.user?._id
        ? userFilter.push({ "bdData.cluster_lead_id": req.user._id })
        : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { "bdData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
          { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
        ];
      }

      let lead = await leadModel.aggregate([
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
            "leadStatusData.status_name": {
              $nin: ["Dead", "Awarded", "Lead Return"],
            },
          },
        },
        {
          $project: {
            client_name: 1,
            // client_number: 1,
            client_email: 1,
            client_country: 1,
            requirement_type: "$reqTypeData.status_name",
            lead_status: "$leadStatusData.status_name",
            // lead_status: 1,
            // status: 1,
            // deleted: 1,
            // createdAt: 1,
            // updatedAt: 1,
          },
        },
        {
          $sort: {
            assign_date: -1, //createdAt // Sort by createdAt date in descending order
          },
        },
      ]);

      // const lead = await leadModel.aggregatePaginate(
      //     resultAggregate,
      //     options
      // );

      if (!lead || lead == "") {
        return {
          status: 200,
          success: true,
          msg: "Dropdown leads not found.",
          data: [],
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Lead get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dropdown lead service.",
        data: error,
      };
    }
  }

  async clGetLeadActivityService(req) {
    try {
      const { page, limit, search } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };
      // Create an empty match query
      const matchQuery = {};
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
        ];
      }

      // const resultAggregate
      const leadActivity = await leadActivityModel.aggregate([
        {
          //$and: [{ bd_id: req.user._id }, { }]
          $match: {
            lead_id: new mongoose.Types.ObjectId(req.query.lead_id),
            ...matchQuery,
          },
        },
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
          $unwind: "$comment",
        },
        {
          $lookup: {
            from: "logins",
            localField: "comment.comment_by_id",
            foreignField: "user_id",
            as: "comment.comment_by_data",
          },
        },
        {
          $project: {
            _id: 1,
            activityData: {
              _id: "$activityData._id", //{ $arrayElemAt: ['$activityData.status_name', 0] }
              status_name: "$activityData.status_name", //{ $arrayElemAt: ['$activityData.status_name', 0] }
            },
            comment_by_data: { $arrayElemAt: ["$comment.comment_by_data", 0] },
            comment: "$comment.comment",
            createdAt: "$comment.createdAt",
            updatedAt: "$comment.updatedAt",
            // status: 1,
            // deleted: 1,
            followup_date: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            // leadData: { $first: '$leadData' },
            // callData: { $first: '$callData' },
            activityData: { $first: "$activityData" },
            comments: {
              $push: {
                comment_by: "$comment_by_data.username",
                comment_by_name: "$comment_by_data.name",
                comment: "$comment",
                _id: "$_id",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt",
              },
            },
            // status: { $first: '$status' },
            // deleted: { $first: '$deleted' },
            followup_date: { $first: "$followup_date" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
          },
        },
        {
          $unwind: "$comments",
        },
        {
          $group: {
            _id: "$_id",
            // leadData: { $first: '$leadData' },
            // callData: { $first: '$callData' },
            activityData: { $first: "$activityData" },
            comments: { $push: "$comments" },
            // status: { $first: '$status' },
            // deleted: { $first: '$deleted' },
            followup_date: { $first: "$followup_date" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      // const leadActivity = await leadModel.aggregate([
      //     {
      //         $match: { $and: [{ bd_id: req.user._id }, { _id: new mongoose.Types.ObjectId(req.query.lead_id) }], ...matchQuery },
      //     },
      //     // {
      //     //     $unwind: '$lead',
      //     // },
      //     // {
      //     //     $lookup: {
      //     //         from: "businesses",
      //     //         localField: "bd_id",
      //     //         foreignField: "_id",
      //     //         as: "bdData",
      //     //     },
      //     // },
      //     // {
      //     //     $unwind: {
      //     //         path: "$bdData",
      //     //         preserveNullAndEmptyArrays: true,
      //     //     },
      //     // },
      //     // {
      //     //     $lookup: {
      //     //         from: "lead_types",
      //     //         localField: "lead_type_id",
      //     //         foreignField: "_id",
      //     //         as: "leadTypeData",
      //     //     },
      //     // },
      //     // {
      //     //     $unwind: {
      //     //         path: "$leadTypeData",
      //     //         preserveNullAndEmptyArrays: true,
      //     //     },
      //     // },
      //     {
      //         $lookup: {
      //             from: "requirement_types",
      //             localField: "lead_req_type_id",
      //             foreignField: "_id",
      //             as: "reqTypeData",
      //         },
      //     },
      //     {
      //         $unwind: {
      //             path: "$reqTypeData",
      //             preserveNullAndEmptyArrays: true,
      //         },
      //     },
      //     {
      //         $lookup: {
      //             from: "lead_activities",
      //             localField: "_id",
      //             foreignField: "lead_id",
      //             as: "activityData",
      //             pipeline: [
      //                 {
      //                     $sort: { createdAt: -1 }
      //                 },
      //                 {
      //                     $lookup: {
      //                         from: "master_statuses",
      //                         localField: "activity_id",
      //                         foreignField: "_id",
      //                         as: "activityMasterData",
      //                     },
      //                 },
      //                 {
      //                     $unwind: {
      //                         path: "$activityMasterData",
      //                         preserveNullAndEmptyArrays: true
      //                     }
      //                 },
      //                 {
      //                     $lookup: {
      //                         from: "logins",
      //                         localField: "comment.comment_by_id",
      //                         foreignField: "user_id",
      //                         as: "commentByData",
      //                     },
      //                 },
      //                 {
      //                     $unwind: {
      //                         path: "$commentByData",
      //                         preserveNullAndEmptyArrays: true
      //                     }
      //                 },
      //                 {
      //                     $project: {
      //                         lead_activity: "$activityMasterData.status_name",
      //                         comment: 1
      //                         // commentBy: "$commentByData"
      //                         // comments: {
      //                         //     commentby: "$commentByData.email",
      //                         //     comment: "$comment",
      //                         // },
      //                         // commentby: "$commentByData.email",
      //                         // comments: "$comment",
      //                     }
      //                 }
      //             ]
      //         },
      //     },
      //     {
      //         $project: {
      //             client_name: 1,
      //             client_email: 1,
      //             // client_country: 1,
      //             lead_status: 1,
      //             status: 1,
      //             // deleted: 1,
      //             // createdAt: 1,
      //             // updatedAt: 1,
      //             reqTypeData: {
      //                 _id: "$reqTypeData._id",
      //                 name: "$reqTypeData.name",
      //             },
      //             activityData: 1
      //             // activityData: {
      //             //     lead_activity: "$activityData.activityMasterData.status_name",
      //             //     comments: "$activityData.comment",
      //             //     lead_createdAt:  "$activityData.createdAt",
      //             //     lead_updatedAt:  "$activityData.updatedAt"
      //             // },
      //             // bdData: {
      //             //     bd_id: "$bdData._id",
      //             //     name: "$bdData.name",
      //             //     email: "$bdData.email",
      //             //     designation: "$bdData.designation",
      //             // },
      //             // leadTypeData: {
      //             //     _id: "$leadTypeData._id",
      //             //     name: "$leadTypeData.name",
      //             // },
      //             // reqTypeData: {
      //             //     _id: "$reqTypeData._id",
      //             //     name: "$reqTypeData.name",
      //             // },

      //             // preDefNotesData: {
      //             //     _id: "$preDefNotesData._id",
      //             //     name: "$preDefNotesData.name",
      //             // },
      //         },
      //     },
      //     {
      //         $sort: {
      //             createdAt: -1, // Sort by createdAt date in descending order
      //         },
      //     },
      // ]);

      // const leadActivity = await leadModel.aggregatePaginate(
      //     resultAggregate,
      //     options
      // );

      if (!leadActivity || leadActivity == "") {
        return {
          status: 400,
          success: true,
          msg: "leadActivity not found.",
          data: [],
        };
      }
      return {
        status: 200,
        success: true,
        msg: "leadActivity get successfully.",
        data: leadActivity,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead activity service.",
        data: error,
      };
    }
  }

  async clGetAllLeadActivitiesService(req) {
    try {
      const { page, limit, search } = req.query;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };
      // Create an empty match query
      const matchQuery = {};
      // If the search parameter is provided, add filters for client_name and client_email
      if (search) {
        matchQuery.$or = [
          { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
        ];
      }
      const allLeadActivity = await leadModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.query.lead_id),
          },
        },
        {
          $lookup: {
            from: "lead_activities",
            localField: "_id",
            foreignField: "lead_id",
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
                $unwind: {
                  path: "$activityData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $match: {
                  "activityData.status_type": {
                    $nin: ["call_status", "rfp_status"],
                  },
                },
              },
              {
                $unwind: "$comment",
              },
              {
                $lookup: {
                  from: "logins",
                  localField: "comment.comment_by_id",
                  foreignField: "user_id",
                  as: "comment.comment_by_data",
                },
              },
              {
                $project: {
                  _id: 1,
                  type: "lead_activity",
                  activityData: {
                    _id: "$activityData._id",
                    status_name: "$activityData.status_name",
                  },
                  comment_by_data: {
                    $arrayElemAt: ["$comment.comment_by_data", 0],
                  },
                  comment: "$comment.comment",
                  commentCreatedAt: "$comment.createdAt",
                  commentUpdatedAt: "$comment.updatedAt",
                  followup_date: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
              {
                $group: {
                  _id: "$_id",
                  activityData: { $first: "$activityData" },
                  comments: {
                    $push: {
                      comment_by: "$comment_by_data.username",
                      comment_by_name: "$comment_by_data.name",
                      comment: "$comment",
                      _id: "$_id",
                      createdAt: "$commentCreatedAt",
                      updatedAt: "$commentUpdatedAt",
                    },
                  },
                  followup_date: { $first: "$followup_date" },
                  type: { $first: "$type" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                },
              },
              {
                $unwind: "$comments",
              },
              {
                $group: {
                  _id: "$_id",
                  activityData: { $first: "$activityData" },
                  comments: { $push: "$comments" },
                  followup_date: { $first: "$followup_date" },
                  type: { $first: "$type" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                },
              },
            ],
            as: "leadActivities",
          },
        },
        {
          $lookup: {
            from: "call_activities",
            localField: "_id",
            foreignField: "lead_id",
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
                $unwind: {
                  path: "$activityData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $unwind: "$comment",
              },
              {
                $lookup: {
                  from: "logins",
                  localField: "comment.comment_by_id",
                  foreignField: "user_id",
                  as: "comment.comment_by_data",
                },
              },
              {
                $project: {
                  _id: 1,
                  type: "call_activity",
                  activityData: {
                    _id: "$activityData._id",
                    status_name: "$activityData.status_name",
                  },
                  comment_by_data: {
                    $arrayElemAt: ["$comment.comment_by_data", 0],
                  },
                  comment: "$comment.comment",
                  commentCreatedAt: "$comment.createdAt",
                  commentUpdatedAt: "$comment.updatedAt",
                  followup_date: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
              {
                $group: {
                  _id: "$_id",
                  activityData: { $first: "$activityData" },
                  comments: {
                    $push: {
                      comment_by: "$comment_by_data.username",
                      comment_by_name: "$comment_by_data.name",
                      comment: "$comment",
                      _id: "$_id",
                      createdAt: "$commentCreatedAt",
                      updatedAt: "$commentUpdatedAt",
                    },
                  },
                  followup_date: { $first: "$followup_date" },
                  type: { $first: "$type" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                },
              },
              {
                $unwind: "$comments",
              },
              {
                $group: {
                  _id: "$_id",
                  activityData: { $first: "$activityData" },
                  comments: { $push: "$comments" },
                  followup_date: { $first: "$followup_date" },
                  type: { $first: "$type" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                },
              },
            ],
            as: "callActivities",
          },
        },
        {
          $lookup: {
            from: "rfp_activities",
            localField: "_id",
            foreignField: "lead_id",
            pipeline: [
              // {
              //   $match: {
              //     lead_id: new mongoose.Types.ObjectId(req.query.lead_id),
              //     // ...matchQuery,
              //   },
              // },
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
                $unwind: "$comment",
              },
              {
                $lookup: {
                  from: "logins",
                  localField: "comment.comment_by_id",
                  foreignField: "user_id",
                  as: "comment.comment_by_data",
                },
              },
              {
                $project: {
                  _id: 1,
                  type: "rfp_activity",
                  activityData: {
                    _id: "$activityData._id",
                    status_name: "$activityData.status_name",
                  },
                  comment_by_data: {
                    $arrayElemAt: ["$comment.comment_by_data", 0],
                  },
                  comment: "$comment.comment",
                  commentCreatedAt: "$comment.createdAt",
                  commentUpdatedAt: "$comment.updatedAt",
                  followup_date: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
              {
                $group: {
                  _id: "$_id",
                  activityData: { $first: "$activityData" },
                  comments: {
                    $push: {
                      comment_by: "$comment_by_data.username",
                      comment_by_name: "$comment_by_data.name",
                      comment: "$comment",
                      _id: "$_id",
                      createdAt: "$commentCreatedAt",
                      updatedAt: "$commentUpdatedAt",
                    },
                  },
                  followup_date: { $first: "$followup_date" },
                  type: { $first: "$type" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                },
              },
              {
                $unwind: "$comments",
              },
              {
                $group: {
                  _id: "$_id",
                  activityData: { $first: "$activityData" },
                  comments: { $push: "$comments" },
                  followup_date: { $first: "$followup_date" },
                  type: { $first: "$type" },
                  createdAt: { $first: "$createdAt" },
                  updatedAt: { $first: "$updatedAt" },
                },
              },
            ],
            as: "rfpActivities",
          },
        },

        // Merge the collections together.
        {
          $project: {
            Union: {
              $concatArrays: [
                "$leadActivities",
                "$callActivities",
                "$rfpActivities",
              ],
            }, //, "$Collection2", "$Collection3"] }
          },
        },

        { $unwind: "$Union" }, // Unwind the union collection into a result set.
        { $replaceRoot: { newRoot: "$Union" } },
        {
          $sort: { createdAt: -1 },
        },
      ]);

      if (!allLeadActivity || allLeadActivity == "") {
        return {
          status: 400,
          success: true,
          msg: "Lead activity not found.",
          data: [],
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Lead activity get successfully.",
        data: allLeadActivity,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead activity service.",
        data: error,
      };
    }
  }

  async clUpdateLeadActivityService(req) {
    try {
      const { lead_activity_id, lead_id, activity_id, comment } = req.body;

      let leadActivity;
      if (lead_activity_id != "") {
        leadActivity = await leadActivityModel.findOne({
          _id: lead_activity_id,
        });
        if (!leadActivity) {
          return {
            status: 400,
            success: false,
            msg: "Lead activity not found",
            data: leadActivity,
          };
        }
      }
      if (
        leadActivity &&
        leadActivity.activity_id.toString() == activity_id.toString()
      ) {
        return {
          status: 400,
          success: false,
          msg: "Lead activity already updated.",
          data: leadActivity,
        };
      }
      const activityStatus = await masterStatusModel.findById(activity_id);
      let followupDate = await generateFollowupDate();

      const activity = await leadActivityModel({
        lead_id: leadActivity?.lead_id ? leadActivity?.lead_id : "",
        activity_id: activity_id ? activity_id : "",
        followup_date: followupDate,
        comment: [
          {
            comment_by_id: req.user._id,
            comment: comment ? comment : activityStatus.status_name,
          },
        ],
      });

      const data = await activity.save();
      return {
        status: 201,
        success: true,
        msg: "Activity updated successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update lead activity service.",
        data: error,
      };
    }
  }

  async clAddCommentLeadActivityService(req) {
    try {
      const { lead_activity_id, comment, type } = req.body;

      let leadActivityType =
        type == "call_activity"
          ? callActivityModel
          : type == "rfp_activity"
          ? rfpActivityModel
          : leadActivityModel;
      let leadActivity;
      if (lead_activity_id != "") {
        leadActivity = await leadActivityType.findOne({
          _id: lead_activity_id,
        });
        if (!leadActivity) {
          return {
            status: 400,
            success: false,
            msg: "Activity not found",
            data: leadActivity,
          };
        }
      }
      const lead = await leadModel.findOne({ _id: leadActivity.lead_id });
      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found.",
          data: lead,
        };
      }

      const activity = await leadActivity.comment.unshift({
        comment_by_id: req.user._id,
        comment: comment ? comment : "",
      });

      const data = await leadActivity.save();
      return {
        status: 201,
        success: true,
        msg: "Comment successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update lead activity service.",
        data: error,
      };
    }
  }

  async clGetLeadResponseService(req) {
    try {
      let { body, user } = req;
      const { page, limit, search, start_date, end_date, bd_id, lead_id } =
        req.query;

      var date = new Date();
      let startDate = new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      ); //01

      // let startDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
      let endDate = new Date(moment().endOf("day")); //new Date();

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(moment(end_date).endOf("day")); //new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(.end_date);
        // endDate = new Date(.end_date);
      }

      let match = {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      const matchQuery = {};
      let userFilter = [];

      user?._id ? userFilter.push({ "bdData.cluster_lead_id": user._id }) : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      lead_id
        ? userFilter.push({ lead_id: new mongoose.Types.ObjectId(lead_id) })
        : "";
      startDate && endDate ? userFilter.push(match) : "";

      let result = await leadResponseModel.aggregate([
        {
          $facet: {
            data: [
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
              {
                $project: {
                  bd_id: 1,
                  lead_id: 1,
                  // comment: 1,
                  response: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
            ],
            totalCalls: [
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
              {
                $count: "count",
              },
            ],
            positiveCalls: [
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
                $match: { $and: userFilter, response: 1 },
              },
              {
                $count: "count",
              },
            ],
            negativeCalls: [
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
                $match: { $and: userFilter, response: 2 },
              },
              {
                $count: "count",
              },
            ],
          },
        },
      ]);

      return {
        status: 201,
        success: true,
        msg: "Followup calls get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something went wrong when get followup calls.",
        data: error,
      };
    }
  }

  async clGetLeadFollowupCallService(req) {
    try {
      let { body, user } = req;
      const { page, limit, search, start_date, end_date, bd_id, lead_id } =
        req.query;

      var date = new Date();
      let startDate = new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      ); //01

      // let startDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
      let endDate = new Date(moment().endOf("day")); //new Date();

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day")); //new Date(start_date);
        endDate = new Date(moment(end_date).endOf("day")); //new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(end_date);
        // endDate = new Date(end_date);
      }

      let match = {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      const matchQuery = {};
      let userFilter = [];

      user?._id ? userFilter.push({ "bdData.cluster_lead_id": user._id }) : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      lead_id
        ? userFilter.push({ lead_id: new mongoose.Types.ObjectId(lead_id) })
        : "";
      startDate && endDate ? userFilter.push(match) : "";

      let result = await followupCallModel.aggregate([
        {
          $facet: {
            data: [
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
              {
                $project: {
                  bd_id: 1,
                  lead_id: 1,
                  comment: 1,
                  response: 1,
                  createdAt: 1,
                  updatedAt: 1,
                },
              },
            ],
            totalCalls: [
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
              {
                $count: "count",
              },
            ],
            positiveCalls: [
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
                $match: { $and: userFilter, response: 1 },
              },
              {
                $count: "count",
              },
            ],
            negativeCalls: [
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
                $match: { $and: userFilter, response: 2 },
              },
              {
                $count: "count",
              },
            ],
          },
        },
      ]);

      return {
        status: 201,
        success: true,
        msg: "CL Followup calls get successfully.",
        data: result[0],
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something went wrong when get followup calls.",
        data: error,
      };
    }
  }
}

module.exports = new ClBDELeadsService();
