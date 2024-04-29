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
const branchModel = require("../../model/AdminModel/branchModel");

class AdminLeadService {
  async getLeads(req) {
    try {
      console.log("Get Leads: ");
      const {
        page,
        limit,
        search,
        bd_id,
        cluster_lead_id,
        branch_id,
        lead_status_id,
        lead_source_id,
        start_date,
        end_date,
        projection_status,
        client_country,
        with_number,
        lead_req_type_id,
        lead_type_id,
      } = req.query;
      console.log(
        page,
        limit,
        search,
        bd_id,
        cluster_lead_id,
        branch_id,
        lead_status_id,
        projection_status,
        lead_source_id,
        start_date,
        end_date,
        client_country,
        with_number,
        lead_req_type_id,
        lead_type_id
      );
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
      projection_status
        ? userFilter.push({
            projection_status: new mongoose.Types.ObjectId(projection_status),
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
      branch_id
        ? userFilter.push({
            "BranchHeadData.branch_id": new mongoose.Types.ObjectId(branch_id),
          })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "clusterData._id": new mongoose.Types.ObjectId(cluster_lead_id),
          })
        : "";
      req.user._id
        ? userFilter.push({
            status: "1",
          })
        : "";
      start_date && end_date && userFilter.push(match);
      // Add other filters similarly...

      // Combine filters
      // const filters = { $and: userFilter };

      // Match search query
      const searchQuery = search
        ? {
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
          }
        : {};

      // Combine all match queries
      const matchQuery = { $and: userFilter, ...searchQuery };
      console.log("matchQuery: ", matchQuery);

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
            from: "clusters",
            localField: "bdData.cluster_head_id",
            foreignField: "_id",
            as: "BranchHeadData",
          },
        },
        {
          $unwind: {
            path: "$BranchHeadData",
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
        // Add other stages of aggregation...
        { $count: "totalDocs" }, // Add $count stage to count the matched documents
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
            from: "clusters",
            localField: "bdData.cluster_head_id",
            foreignField: "_id",
            as: "BranchHeadData",
          },
        },
        {
          $unwind: {
            path: "$BranchHeadData",
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
        { $match: matchQuery },

        { $skip: skip },
        {
          $limit: pageSize,
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
            BranchHeadData: {
              cluster_id: "$BranchHeadData._id",
              name: "$BranchHeadData.name",
              branch_id: "$BranchHeadData.branch_id",
              email: "$BranchHeadData.email",
              status: "$BranchHeadData.status",
              designation: "$BranchHeadData.designation",
            },
            leadTypeData: {
              _id: "$leadTypeData._id",
              status_name: "$leadTypeData.status_name",
              status_color: "$leadTypeData.status_color",
            },
            reqTypeData: {
              _id: "$reqTypeData._id",
              status_name: "$reqTypeData.status_name",
              status_color: "$reqTypeData.status_color",
            },
            leadSourceData: {
              _id: "$leadSourceData._id",
              status_name: "$leadSourceData.status_name",
              status_color: "$leadSourceData.status_color",
            },
            leadStatusData: {
              _id: "$leadStatusData._id",
              status_name: "$leadStatusData.status_name",
              status_color: "$leadStatusData.status_color",
            },
            projectionStatusData: {
              _id: "$projectionStatusData._id",
              status_name: "$projectionStatusData.status_name",
              status_color: "$projectionStatusData.status_color",
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
      ]);

      const totalPages = Math.ceil(totalDocs / pageSize);
      console.log("totalPages: ", totalPages);

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
      console.log("Error: ", error);
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
        branch_id,
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
        // sort: { createdAt: -1 }
      };

      let startDate = new Date(moment().startOf("month"));
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
      //   _.get(req, "user._id") &&
      //     userFilter.push({ ["bdData.cluster_head_id"]: req.user._id });
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
      branch_id
        ? userFilter.push({
            "BranchHeadData.branch_id": new mongoose.Types.ObjectId(branch_id),
          })
        : "";
      cluster_lead_id
        ? userFilter.push({
            "clusterData._id": new mongoose.Types.ObjectId(cluster_lead_id),
          })
        : "";
      req.user._id
        ? userFilter.push({
            status: "1",
          })
        : "";

      start_date && end_date && userFilter.push(match);

      const matchQuery = search
        ? {
            $or: [
              { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "bdData.email": { $regex: search, $options: "i" } },
              { "BranchHeadData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "BranchHeadData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
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
            from: "clusters",
            localField: "bdData.cluster_head_id",
            foreignField: "_id",
            as: "BranchHeadData",
          },
        },
        {
          $unwind: {
            path: "$BranchHeadData",
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
            BranchHeadData: {
              cluster_id: "$BranchHeadData._id",
              name: "$BranchHeadData.name",
              branch_id: "$BranchHeadData.branch_id",
              email: "$BranchHeadData.email",
              status: "$BranchHeadData.status",
              designation: "$BranchHeadData.designation",
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
        // {
        //   $sort: {
        //     createdAt: -1, // Sort by createdAt date in descending order
        //   },
        // },
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
        branch_id,
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
      //   _.get(req, "user._id") &&
      //     userFilter.push({ ["bdData.cluster_head_id"]: req.user._id });
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
      branch_id
        ? userFilter.push({
            "BranchHeadData.branch_id": new mongoose.Types.ObjectId(branch_id),
          })
        : "";
      req.user._id
        ? userFilter.push({
            status: "1",
          })
        : "";

      start_date && end_date && userFilter.push(match);

      const matchQuery = search
        ? {
            $or: [
              { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "bdData.email": { $regex: search, $options: "i" } },
              { "BranchHeadData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
              { "BranchHeadData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
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
            from: "clusters",
            localField: "bdData.cluster_head_id",
            foreignField: "_id",
            as: "BranchHeadData",
          },
        },
        {
          $unwind: {
            path: "$BranchHeadData",
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
            BranchHeadData: {
              cluster_id: "$BranchHeadData._id",
              name: "$BranchHeadData.name",
              branch_id: "$BranchHeadData.branch_id",
              email: "$BranchHeadData.email",
              status: "$BranchHeadData.status",
              designation: "$BranchHeadData.designation",
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
      const { page, limit, search, bd_id, cluster_lead_id, branch_id } =
        req.query;

      const matchQuery = {};
      let userFilter = [];

      //   req?.user?._id
      //     ? userFilter.push({ "bdData.cluster_head_id": req.user._id })
      //     : "";
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
      branch_id
        ? userFilter.push({
            "BranchHeadData.branch_id": new mongoose.Types.ObjectId(branch_id),
          })
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
          $lookup: {
            from: "clusters",
            localField: "bdData.cluster_head_id",
            foreignField: "_id",
            as: "BranchHeadData",
          },
        },
        {
          $unwind: {
            path: "$BranchHeadData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: { $and: userFilter, ...matchQuery },
        },
        {
          $project: {
            client_name: 1,
            client_country: 1,
            client_email: 1,
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
      const { branch_id } = req.query;
      const matchQuery = {};
      if (branch_id) {
        matchQuery["BranchHeadData.branch_id"] = new mongoose.Types.ObjectId(
          branch_id
        );
      }

      const lead = await clusterLeadModel.aggregate([
        {
          $lookup: {
            from: "clusters",
            localField: "cluster_head_id",
            foreignField: "_id",
            as: "BranchHeadData",
          },
        },
        {
          $unwind: {
            path: "$BranchHeadData",
            preserveNullAndEmptyArrays: true,
          },
        },
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

  async getBranchessDropdownService(req) {
    try {
      const matchQuery = {};

      const lead = await branchModel.aggregate([
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
          msg: "Dropdown Branch not found.",
          data: [],
        };
      }

      return {
        status: 200,
        success: true,
        msg: "Branches get successfully.",
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
      const { cl_id, branch_id } = req.query;
      const matchQuery = {};

      if (cl_id) {
        matchQuery.cluster_lead_id = new mongoose.Types.ObjectId(cl_id);
      }
      if (branch_id) {
        matchQuery["BranchHeadData.branch_id"] = new mongoose.Types.ObjectId(
          branch_id
        );
      }

      const lead = await bdModel.aggregate([
        {
          $lookup: {
            from: "clusters",
            localField: "cluster_head_id",
            foreignField: "_id",
            as: "BranchHeadData",
          },
        },
        {
          $unwind: {
            path: "$BranchHeadData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: { $and: [{ status: "1" }], ...matchQuery },
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
            commentCreatedAt: "$comment.createdAt",
            commentUpdatedAt: "$comment.updatedAt",
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

  async updateLeadActivityService(req) {
    try {
      const { lead_activity_id, lead_id, activity_id, comment } = req.body;

      let leadActivity;

      if (lead_activity_id) {
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

        if (leadActivity.activity_id.toString() === activity_id.toString()) {
          return {
            status: 400,
            success: false,
            msg: "Lead activity already updated.",
            data: leadActivity,
          };
        }
      }

      const activityStatus = await masterStatusModel.findById(activity_id);

      const activity = new leadActivityModel({
        lead_id: leadActivity?.lead_id || "",
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
      const { lead_activity_id, comment } = req.body;

      let leadActivity;
      if (lead_activity_id != "") {
        leadActivity = await leadActivityModel.findOne({
          _id: lead_activity_id,
        });

        if (!leadActivity) {
          return {
            status: 400,
            success: false,
            msg: "LeadActivity not found",
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
          msg: "LeadActivity id not found",
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
      const {
        start_date,
        end_date,
        bd_id,
        cluster_lead_id,
        lead_id,
        branch_id,
      } = req.query;

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

      //   _.get(user, "_id") &&
      //     userFilter.push({ "bdData.cluster_head_id": user._id });
      cluster_lead_id &&
        userFilter.push({
          "bdData.cluster_lead_id": new mongoose.Types.ObjectId(
            cluster_lead_id
          ),
        });
      bd_id &&
        userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) });
      branch_id &&
        userFilter.push({
          "BranchHeadData.branch_id": new mongoose.Types.ObjectId(branch_id),
        });
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
              {
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
                  foreignField: "_id",
                  as: "BranchHeadData",
                },
              },
              {
                $unwind: {
                  path: "$BranchHeadData",
                  preserveNullAndEmptyArrays: true,
                },
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
              {
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
                  foreignField: "_id",
                  as: "BranchHeadData",
                },
              },
              {
                $unwind: {
                  path: "$BranchHeadData",
                  preserveNullAndEmptyArrays: true,
                },
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
              {
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
                  foreignField: "_id",
                  as: "BranchHeadData",
                },
              },
              {
                $unwind: {
                  path: "$BranchHeadData",
                  preserveNullAndEmptyArrays: true,
                },
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
              {
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
                  foreignField: "_id",
                  as: "BranchHeadData",
                },
              },
              {
                $unwind: {
                  path: "$BranchHeadData",
                  preserveNullAndEmptyArrays: true,
                },
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
      const {
        start_date,
        end_date,
        bd_id,
        cluster_lead_id,
        branch_id,
        lead_id,
      } = req.query;

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

      //   user?._id ? userFilter.push({ "bdData.cluster_head_id": user._id }) : "";
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
      branch_id
        ? userFilter.push({
            "branchHeadData.branch_id": new mongoose.Types.ObjectId(branch_id),
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
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
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
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
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
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
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
                $lookup: {
                  from: "clusters",
                  localField: "bdData.cluster_head_id",
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
}

module.exports = new AdminLeadService();
