const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const leadModel = require("../../model/BDModel/leadModel");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const bdModel = require("../../model/BDModel/bdModel");
const masterStatusModel = require("../../model/CommonModel/masterStatusModel");
const leadResponseModel = require("../../model/BDModel/leadResponseModel");
const followupCallModel = require("../../model/BDModel/followupCallModel");
const duplicateLeadModel = require("../../model/BDModel/duplicateLeadModel");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");
const moment = require("moment");
const transferLeadsModel = require("../../model/ClusterModel/transferLeadsModel");
const callActivityModel = require("../../model/BDModel/callActivityModel");
const rfpActivityModel = require("../../model/BDModel/rfpActivityModel");

class LeadsServices {
  async getLeads(req) {
    try {
      const { page, limit, search, bd_id, cluster_lead_id, lead_status_id, lead_source_id, start_date, end_date, client_country, with_number, lead_req_type_id, lead_type_id } = req.query;
      // Set default values for page and limit
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;

      let startDate = new Date(moment().startOf("month"));
      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      const match = {
        assign_date: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      const userFilter = [];
      // Add filters based on query parameters
      req.user._id
      ? userFilter.push({ ["bdData.cluster_head_id"]: req.user._id })
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
      bd_id
        ? userFilter.push({ bd_id: new mongoose.Types.ObjectId(bd_id) })
        : "";
      cluster_lead_id
        ? userFilter.push({
          "bdData.cluster_lead_id": new mongoose.Types.ObjectId(cluster_lead_id),
        })
        : "";
      start_date && end_date && userFilter.push(match);
      // Add other filters similarly...

      // Match search query
      const searchQuery = search ? {
        $or: [
          // { "bdData.name": { $regex: search, $options: "i" } },
          // { "bdData.email": { $regex: search, $options: "i" } },
          // { "BranchHeadData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          // { "BranchHeadData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          // { "clusterData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          // { "clusterData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
          { client_name: { $regex: search, $options: "i" } },
          { client_email: { $regex: search, $options: "i" } },
          // { ["leadTyp  eData.status_name"]: { $regex: search, $options: "i" }, },
          // Add other fields to search...
        ],
      } : {};

      // Combine all match queries
      const matchQuery = { $and: userFilter, ...searchQuery };

      // Count total documents without pagination
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
        // {
        //   $match: {
        //     "bdData.cluster_head_id": req.user._id
        //   }
        // },
        // {
        //   $lookup: {
        //     from: "cluster_leads",
        //     localField: "bdData.cluster_lead_id",
        //     foreignField: "_id",
        //     as: "clusterData",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$clusterData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "master_statuses",
        //     localField: "lead_type_id",
        //     foreignField: "_id",
        //     as: "leadTypeData",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$leadTypeData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "master_statuses",
        //     localField: "lead_req_type_id",
        //     foreignField: "_id",
        //     as: "reqTypeData",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$reqTypeData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "master_statuses",
        //     localField: "lead_source_id",
        //     foreignField: "_id",
        //     as: "leadSourceData",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$leadSourceData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "master_statuses",
        //     localField: "lead_status",
        //     foreignField: "_id",
        //     as: "leadStatusData",
        //   },
        // },
        // {
        //   $unwind: {
        //     path: "$leadStatusData",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        { $match: matchQuery },
        // Add other stages of aggregation...
        { $count: "totalDocs" } // Add $count stage to count the matched documents
      ];

      const countResult = await leadModel.aggregate(aggregationPipeline).exec();

      const totalDocs = countResult.length > 0 ? countResult[0].totalDocs : 0;


      // Calculate skip value for pagination
      const skip = (pageNumber - 1) * pageSize;

      const resultAggregate = await leadModel.aggregate([
        {
          $sort: {
            assign_date: -1, // Sort by createdAt date in descending order
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
        // {
        //   $match: {
        //     "bdData.cluster_head_id": req.user._id
        //   }
        // },
        {
          $lookup: {
            from: "cluster_leads",
            localField: "bdData.cluster_lead_id",
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
        { $match: matchQuery },

        { $skip: skip },
        {
          $limit: pageSize
        },
        {
          $lookup: {
            from: "lead_responses",
            let: { leadId: "$_id", leadCreatedAt: "$assign_date" }, //"$createdAt" },
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
              name: "$bdData.name",
              email: "$bdData.email",
              status: "$bdData.status",
              designation: "$bdData.designation",
            },
            clusterLeadData: {
              cluster_id: "$clusterData._id",
              name: "$clusterData.name",
              email: "$clusterData.email",
              status: "$clusterData.status",
              designation: "$clusterData.designation",
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
      ])

      const totalPages = Math.ceil(totalDocs / pageSize);

      return {
        status: 200,
        success: true,
        msg: "Leads retrieved successfully.",
        data: {
          docs: resultAggregate,
          totalDocs: totalDocs,
          limit: pageSize,
          page: pageNumber,
          totalPages: totalPages,
          pagingCounter: (pageNumber - 1) * pageSize + 1,
          hasPrevPage: pageNumber > 1,
          hasNextPage: pageNumber < totalPages,
          prevPage: pageNumber > 1 ? pageNumber - 1 : null,
          nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
        },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Error fetching leads.",
        error,
      };
    }
  }
  async getLeadsService(req) {
    try {
      const {
        page,
        limit,
        search,
        bd_id,
        cluster_lead_id,
        lead_status_id,
        lead_source_id,
        start_date,
        end_date,
        client_country,
        with_number,
        lead_req_type_id,
        lead_type_id,
      } = req.query;

      const options = {
        page: _.defaultTo(page, 1),
        limit: _.defaultTo(limit, 10),
      };

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

      const match = {
        assign_date: {
          //createdAt
          $gte: startDate,
          $lte: endDate,
        },
      };
      const userFilter = [];
      _.get(req, "user._id") &&
        userFilter.push({ ["bdData.cluster_head_id"]: req.user._id });
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
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "clusterData._id": new mongoose.Types.ObjectId(cluster_lead_id),
          })
        : "";

      start_date && end_date && userFilter.push(match);

      const matchQuery = search
        ? {
            $or: [
              { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "bdData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "clusterData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "clusterData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { client_name: { $regex: search, $options: "i" } },
              { client_email: { $regex: search, $options: "i" } },
              {
                ["leadTypeData.status_name"]: { $regex: search, $options: "i" },
              },
            ],
          }
        : {};

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
            from: "cluster_leads",
            localField: "bdData.cluster_lead_id",
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
            from: "lead_responses",
            let: { leadId: "$_id", leadCreatedAt: "$assign_date" }, //"$createdAt" },
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
            status: 1,
            deleted: 1,
            createdAt: "$assign_date", //1,
            updatedAt: 1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              email: "$bdData.email",
              status: "$bdData.status",
              designation: "$bdData.designation",
            },
            clusterLeadData: {
              cluster_id: "$clusterData._id",
              name: "$clusterData.name",
              email: "$clusterData.email",
              status: "$clusterData.status",
              designation: "$clusterData.designation",
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
            createdAt: -1, // Sort by createdAt date in descending order
          },
        },
      ]);

      const lead = await leadModel.aggregatePaginate(resultAggregate, options);

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
        msg: error,
        data: error,
      };
    }
  }
  async getDuplicateLeadsService(req) {
    try {
      const {
        page,
        limit,
        search,
        bd_id,
        cluster_lead_id,
        lead_status_id,
        start_date,
        end_date,
      } = req.query;

      const options = {
        page: _.defaultTo(page, 1),
        limit: _.defaultTo(limit, 10),
      };

      const currentDate = new Date();
      let startDate = new Date(
        `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-01`
      );
      let endDate = new Date();

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(end_date);
      }

      const match = {
        assign_date: {
          //createdAt
          $gte: startDate,
          $lte: endDate,
        },
      };

      const userFilter = [];
      _.get(req, "user._id") &&
        userFilter.push({ ["bdData.cluster_head_id"]: req.user._id });
      lead_status_id &&
        userFilter.push({
          lead_status: new mongoose.Types.ObjectId(lead_status_id),
        });
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "clusterData._id": new mongoose.Types.ObjectId(cluster_lead_id),
          })
        : "";

      start_date && end_date && userFilter.push(match);

      const matchQuery = search
        ? {
            $or: [
              { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "bdData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "clusterData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "clusterData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { client_name: { $regex: search, $options: "i" } },
              { client_email: { $regex: search, $options: "i" } },
              { client_country: { $regex: search, $options: "i" } },
              {
                ["leadTypeData.status_name"]: { $regex: search, $options: "i" },
              },
            ],
          }
        : {};

      const resultAggregate = duplicateLeadModel.aggregate([
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
            pipeline: [
              {
                $lookup: {
                  from: "businesses",
                  localField: "bd_id",
                  foreignField: "_id",
                  as: "leadBdData",
                },
              },
              {
                $unwind: {
                  path: "$leadBdData",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  lead_id: "$_id",
                  lead_bd_data: {
                    bd_id: "$leadBdData._id",
                    bdName: "$leadBdData.name",
                    bdEmail: "$leadBdData.email",
                    bdDesignation: "$leadBdData.designation",
                  },
                  client_name: "$client_name",
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "cluster_leads",
            localField: "bdData.cluster_lead_id",
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
          $match: { $and: userFilter, ...matchQuery },
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
          $unwind: {
            path: "$leadData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "lead_responses",
            let: { leadId: "$lead_id", leadCreatedAt: "$assign_date" }, //"$createdAt" },
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
            leadData: 1,
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
              name: "$bdData.name",
              email: "$bdData.email",
              status: "$bdData.status",
              designation: "$bdData.designation",
            },
            clusterLeadData: {
              cluster_id: "$clusterData._id",
              name: "$clusterData.name",
              email: "$clusterData.email",
              status: "$clusterData.status",
              designation: "$clusterData.designation",
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
            createdAt: -1, // Sort by createdAt date in descending order
          },
        },
      ]);

      const lead = await duplicateLeadModel.aggregatePaginate(
        resultAggregate,
        options
      );

      if (_.isEmpty(lead)) {
        return { status: 201, success: true, msg: "Lead not found.", data: [] };
      }

      return {
        status: 200,
        success: true,
        msg: "Duplicate Lead get successfully.",
        data: lead,
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
    // const bdData = await clusterModel.findById(req.user._id);
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

  async deleteDuplicateLeadsService(req) {
    let duplicateLead = await duplicateLeadModel.findById(
      new mongoose.Types.ObjectId(req.query.duplicate_lead_id)
    );
    if (!duplicateLead) {
      return {
        status: 400,
        success: true,
        msg: "Duplicate lead not found.",
        data: [],
      };
    }
    let deleteLead = await duplicateLeadModel.deleteOne({
      _id: new mongoose.Types.ObjectId(req.query.duplicate_lead_id),
    });
    return {
      status: 200,
      success: true,
      msg: "Duplicate lead deleted successfully.",
      data: deleteLead,
    };
  }

  async updateLeadService(req) {
    try {
      const body = req.body;
      const lead = await leadModel.findOne({ _id: body.lead_id });

      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found",
          data: lead,
        };
      }

      const leadValidFields = [
        "client_name",
        "lead_req_type_id",
        "lead_type_id",
        "client_linkedin",
        "upwork_job_url",
      ];
      const leadValid = _.pick(body, leadValidFields);

      const filterLeadValid = _.pickBy(leadValid, _.identity);

      if (!_.isEmpty(filterLeadValid)) {
        const leadFind = await leadModel
          .find({ _id: { $nin: body.lead_id }, ...filterLeadValid })
          .populate("bd_id", "emp_id name email")
          .populate("lead_type_id", "status_name");

        const userIsHandlingLead =
          leadFind?.bd_id?._id.toString() === req.user?._id.toString();

        if (userIsHandlingLead) {
          return {
            success: false,
            msg: "Lead alreay Exist.",
            status: 400,
            data: leadFind,
          };
        }

        if (!_.isEmpty(leadFind)) {
          const leadHandlingMsg = `${leadFind?.bd_id?.name} handling this  ${lead?.lead_type_id?.status_name} type lead.`;
          return {
            success: false,
            msg: leadHandlingMsg,
            status: 400,
            data: lead,
          };
        }
      }

      const updateFields = [
        "client_name",
        "client_linkedin",
        "upwork_job_url",
        "client_number",
        "client_country",
        "address",
        "client_whatsapp_num",
        "client_email",
        "client_alternate_email",
        "bid_url",
        "skype_id",
        "company_name",
        "proposal_amount",
        "client_budget",
        "add_notes",
        "lead_req_type_id",
        "lead_type_id",
        "lead_source_id",
      ];

      updateFields.forEach((field) => {
        lead[field] = body[field];
      });

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
        msg: error,
        data: error,
      };
    }
  }

  async updateLeadStatusService(req) {
    try {
      const body = req.body;

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

      const updateLeadStatus = await lead.save();

      if (["Dead", "Lead Return"].includes(leadStatus.status_name)) {
        const leadActivity = await leadActivityModel({
          lead_id: body.lead_id,
          activity_id: leadStatus?._id || "",
          comment: [
            {
              comment_by_id: req.user._id,
              comment: `${leadStatus.status_name} by ${req.user.name}`,
            },
          ],
        });

        const leadactivityData = await leadActivity.save();
      }

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
        msg: error,
        data: error,
      };
    }
  }

  async getDropdownLeadsService(req) {
    try {
      const { page, limit, search, bd_id, cluster_lead_id } = req.query;

      const matchQuery = {};
      let userFilter = [];

      req?.user?._id
        ? userFilter.push({ "bdData.cluster_head_id": req.user._id })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "bdData.cluster_lead_id": new mongoose.Types.ObjectId(
              cluster_lead_id
            ),
          })
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
      // matchQuery["bdData.cluster_head_id"] = req.user._id;

      const lead = await leadModel.aggregate([
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
            localField: "lead_req_type_id",
            foreignField: "_id",
            as: "leadReqTypeData",
          },
        },
        {
          $unwind: {
            path: "$leadReqTypeData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            client_name: 1,
            client_country: 1,
            client_email: 1,
            client_linkedin: 1,
            bid_url: 1,
            leadSourceData: {
              _id: "$leadSourceData._id",
              status_name: "$leadSourceData.status_name",
              status_type: "$leadSourceData.status_type",
            },
            leadReqTypeData: {
              _id: "$leadReqTypeData._id",
              status_name: "$leadReqTypeData.status_name",
              status_type: "$leadReqTypeData.status_type",
            },
          },
        },
        {
          $sort: {
            assign_date: -1, //createdAt
          },
        },
      ]);

      if (!lead || lead.length === 0) {
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
        msg: error,
        data: error,
      };
    }
  }

  async getClusterLeadsDropdownService(req) {
    try {
      const matchQuery = {};
      matchQuery.cluster_head_id = req.user._id;

      const lead = await clusterLeadModel.aggregate([
        {
          $match: { $and: [{ status: "1" }], ...matchQuery },
        },
        {
          $project: {
            name: 1,
            email: 1,
            designation: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      if (!lead || lead.length === 0) {
        return {
          status: 200,
          success: true,
          msg: "Dropdown cluster leads not found.",
          data: [],
        };
      }

      return {
        status: 200,
        success: true,
        msg: "Cluster Leads get successfully.",
        data: lead,
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

  async getBDsDropdownService(req) {
    try {
      const { cl_id } = req.query;
      const matchQuery = {};

      if (cl_id) {
        matchQuery.cluster_lead_id = new mongoose.Types.ObjectId(cl_id);
      } else {
        matchQuery.cluster_head_id = req.user._id;
      }

      const lead = await bdModel.aggregate([
        {
          $match: { ...matchQuery }, //$and: [{ status: "1" }],
        },
        {
          $project: {
            name: 1,
            email: 1,
            designation: 1,
            cluster_lead_id: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      if (!lead || lead.length === 0) {
        return {
          status: 200,
          success: true,
          msg: "Dropdown bds not found.",
          data: [],
        };
      }

      return {
        status: 200,
        success: true,
        msg: "bds get successfully.",
        data: lead,
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

  async getLeadActivityService(req) {
    try {
      const matchQuery = {};
      matchQuery.lead_id = new mongoose.Types.ObjectId(req.query.lead_id);

      const leadActivity = await leadActivityModel.aggregate([
        {
          $match: matchQuery,
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
              _id: "$activityData._id",
              status_name: "$activityData.status_name",
            },
            comment_by_data: { $arrayElemAt: ["$comment.comment_by_data", 0] },
            comment: "$comment.comment",
            createdAt: "$comment.createdAt",
            updatedAt: "$comment.updatedAt",
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
                createdAt: "$createdAt",
                updatedAt: "$updatedAt",
              },
            },
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
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);

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
        msg: error,
        data: error,
      };
    }
  }

  async getAllLeadActivitiesService(req) {
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
          data: allLeadActivity,
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

  async updateLeadActivityService(req) {
    try {
      const { lead_activity_id, lead_id, activity_id, comment } = req.body;
      let lead = await leadModel.findById(lead_id);
      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found",
          data: lead,
        };
      }

      // let leadActivity;

      // if (lead_activity_id) {
      let leadActivity = await leadActivityModel
        .find({
          lead_id: new mongoose.Types.ObjectId(lead_id),
        }).sort({ createdAt: 1 });
      let lastActivity = leadActivity[leadActivity.length - 1];

      if (!leadActivity || leadActivity.length == 0) {
        return {
          status: 400,
          success: false,
          msg: "Lead activity not found",
          data: leadActivity,
        };
      }

      if (lastActivity.activity_id.toString() === activity_id.toString()) {
        return {
          status: 400,
          success: false,
          msg: "Lead activity already updated.",
          data: lastActivity,
        };
      }
      // }

      const activityStatus = await masterStatusModel.findById(activity_id);

      const activity = new leadActivityModel({
        lead_id: lastActivity?.lead_id || "",
        activity_id: activity_id || "",
        comment: [
          {
            comment_by_id: req.user._id,
            comment: comment || activityStatus.status_name,
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
        msg: error,
        data: error,
      };
    }
  }

  async addCommentLeadActivityService(req) {
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
      } else {
        return {
          status: 400,
          success: false,
          msg: "Activity id not found",
          data: {},
        };
      }
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error,
        data: error,
      };
    }
  }

  async getLeadResponseService(req) {
    try {
      let { user } = req;
      const { start_date, end_date, bd_id, cluster_lead_id, lead_id } =
        req.query;

      const date = new Date();
      const startDate = start_date
        ? new Date(start_date)
        : new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endDate = end_date
        ? new Date(new Date(end_date).setHours(23, 59, 59, 999))
        : new Date();

      const match = {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      const userFilter = [];

      _.get(user, "_id") &&
        userFilter.push({ "bdData.cluster_head_id": user._id });
      cluster_lead_id &&
        userFilter.push({
          "bdData.cluster_lead_id": new mongoose.Types.ObjectId(
            cluster_lead_id
          ),
        });
      bd_id &&
        userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) });
      lead_id &&
        userFilter.push({ lead_id: new mongoose.Types.ObjectId(lead_id) });
      startDate && endDate && userFilter.push(match);

      const aggregateStages = [
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
                $unwind: { path: "$bdData", preserveNullAndEmptyArrays: true },
              },
              { $match: { $and: userFilter } },
              {
                $project: {
                  bd_id: 1,
                  lead_id: 1,
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
                $unwind: { path: "$bdData", preserveNullAndEmptyArrays: true },
              },
              { $match: { $and: userFilter } },
              { $count: "count" },
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
                $unwind: { path: "$bdData", preserveNullAndEmptyArrays: true },
              },
              { $match: { $and: userFilter, response: 1 } },
              { $count: "count" },
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
                $unwind: { path: "$bdData", preserveNullAndEmptyArrays: true },
              },
              { $match: { $and: userFilter, response: 2 } },
              { $count: "count" },
            ],
          },
        },
      ];

      const result = await leadResponseModel.aggregate(aggregateStages);

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
        msg: error,
        data: error,
      };
    }
  }

  async getLeadFollowupCallService(req) {
    try {
      let { user } = req;
      const { start_date, end_date, bd_id, cluster_lead_id, lead_id } =
        req.query;

      var date = new Date();
      let startDate = new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      ); //01

      // let startDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
      let endDate = new Date();

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(end_date);
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

      user?._id ? userFilter.push({ "bdData.cluster_head_id": user._id }) : "";
      bd_id
        ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "bdData.cluster_lead_id": new mongoose.Types.ObjectId(
              cluster_lead_id
            ),
          })
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
        msg: "Followup calls get successfully.",
        data: result[0],
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error,
        data: error,
      };
    }
  }

  async transferLeadstoAnotherBDE(req) {
    try {
      const { bd_id, new_bd_id, lead_ids } = req.body;

      const bdCheck = await bdModel.findById(bd_id);

      if (
        !bdCheck &&
        String(bdCheck.cluster_head_id) !== String(req.user._id)
      ) {
        return {
          status: 400,
          success: false,
          msg: "BDE is not in Your Cluster",
          data: {},
        };
      }

      const bdCheckNew = await bdModel.findById(new_bd_id);
      if (
        !bdCheckNew &&
        String(bdCheckNew.cluster_head_id) !== String(req.user._id)
      ) {
        return {
          status: 400,
          success: false,
          msg: "New BDE is not in Your Cluster",
          data: {},
        };
      }

      const matchObj = {};
      matchObj["bdData.cluster_head_id"] = new mongoose.Types.ObjectId(
        req.user._id
      );
      matchObj.bd_id = new mongoose.Types.ObjectId(bd_id);

      if (lead_ids && lead_ids.length > 0) {
        const leadData = new Array();
        lead_ids.forEach((ids) => {
          leadData.push(new mongoose.Types.ObjectId(ids));
        });
        matchObj._id = { $in: leadData };
      }

      const leads = await leadModel.aggregate([
        {
          $lookup: {
            from: "businesses",
            localField: "bd_id",
            foreignField: "_id",
            as: "bdData",
          },
        },
        {
          $unwind: "$bdData",
        },
        { $match: matchObj },
      ]);

      const bulkOps = [];
      for (const lead of leads) {
        const transferData = {
          bd_id: lead?.bd_id,
          lead_req_type_id: lead?.lead_req_type_id,
          lead_type_id: lead?.lead_type_id,
          lead_source_id: lead?.lead_source_id,
          pre_defined_note_id: lead?.pre_defined_note_id,
          client_name: lead?.client_name,
          assign_date: lead?.assign_date,
          client_number: lead?.client_number,
          client_whatsapp_num: lead?.client_whatsapp_num,
          client_email: lead?.client_email,
          client_alternate_email: lead?.client_alternate_email,
          client_country: lead?.client_country,
          address: lead?.address,
          client_linkedin: lead?.client_linkedin,
          upwork_job_url: lead?.upwork_job_url,
          bid_url: lead?.bid_url,
          skype_id: lead?.skype_id,
          company_name: lead?.company_name,
          proposal_amount: lead?.proposal_amount,
          client_budget: lead?.client_budget,
          follow_up: lead?.follow_up,
          lead_status: lead?.lead_status,
          add_notes: lead?.add_notes,
          transfer_lead_id: lead._id,
          transfer_to: new_bd_id,
          transfer_date: moment(),
        };

        // Create a transfer entry
        const transfer = new transferLeadsModel(transferData);
        await transfer.save();
        /////////////////////////////////////// Bulk Update Lead //////////////////////////
        let arr = lead?.bde_transfer_section ? lead?.bde_transfer_section : [];
        arr?.unshift({
          old_bd_id: lead.bd_id,
          transfer_date: moment(),
        });
        bulkOps.push({
          updateOne: {
            filter: { _id: new mongoose.Types.ObjectId(lead._id) },
            update: {
              $set: {
                bd_id: new mongoose.Types.ObjectId(new_bd_id),
                bde_transfer_section: arr,
              },
            },
          },
        });
        /////////////////////////////////////// Bulk Update Lead //////////////////////////

        ///////////////////////////////////////Update Lead //////////////////////////
        // let newLead = await leadModel.findOne({
        //   _id: new mongoose.Types.ObjectId(lead._id),
        // });
        // newLead?.bde_transfer_section?.unshift({
        //   old_bd_id: lead.bd_id,
        //   transfer_date: moment(),
        // });
        // newLead.bd_id = new mongoose.Types.ObjectId(new_bd_id);
        // await newLead.save();
        ///////////////////////////////////////Update Lead //////////////////////////
      }
      await leadModel.bulkWrite(bulkOps);
      return {
        status: 201,
        success: true,
        msg: "BD Leads Tranfer Success.",
        data: {},
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error,
        data: error,
      };
    }
  }

  async getTransferLeadsService(req) {
    try {
      const { page, limit, bd_id, cluster_lead_id, search } = req.body;

      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };

      const matchQuery = {};
      let userFilter = [];

      req?.user?._id
        ? userFilter.push({ "bdData.cluster_head_id": req.user._id })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "bdData.cluster_lead_id": new mongoose.Types.ObjectId(
              cluster_lead_id
            ),
          })
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
      // let transferLeads = await transferLeadsModel
      // .find()
      // .populate("bd_id", "cluster_head_id emp_id name email")
      // .populate("transfer_to", "cluster_head_id emp_id name email");

      const resultAggregate = transferLeadsModel.aggregate([
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
            from: "businesses",
            localField: "transfer_to",
            foreignField: "_id",
            as: "transferbdData",
          },
        },
        {
          $unwind: {
            path: "$transferbdData",
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
            lead_type_id: 1,
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
            transfer_lead_id: 1,
            transfer_date: 1,
            status: 1,
            deleted: 1,
            createdAt: "$assign_date",
            updatedAt: 1,
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
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
            bdData: {
              bd_id: "$bdData._id",
              name: "$bdData.name",
              status: "$bdData.status",
              email: "$bdData.email",
              designation: "$bdData.designation",
            },
            transferbdData: {
              bd_id: "$transferbdData._id",
              name: "$transferbdData.name",
              status: "$transferbdData.status",
              email: "$transferbdData.email",
              designation: "$transferbdData.designation",
            },
          },
        },
        {
          $sort: {
            assign_date: -1, //createdAt
          },
        },
      ]);

      const transferLeads = await transferLeadsModel.aggregatePaginate(
        resultAggregate,
        options
      );


      return {
        status: 201,
        success: true,
        msg: "Transferd leads get successfully.",
        data: transferLeads,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error,
        data: error,
      };
    }
  }
}

const myInstance = new LeadsServices();
module.exports = new LeadsServices();
