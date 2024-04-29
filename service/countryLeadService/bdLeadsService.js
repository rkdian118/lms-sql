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
const { getCountriesWithContinentCodes } = require("../AdminService/adminCountryLeadService");

class CountryLeadLeadsService {
  async getLeadsService(req) {
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

      const countriesWithContinentCodes = await getCountriesWithContinentCodes(req.user.continent_code);

      const userFilter = [];
      // Add filters based on query parameters
      req?.user?._id 
        ? userFilter.push({ status: "1" })
        : "";
        client_country
          ? userFilter.push({
            client_country: { $regex: client_country, $options: "i" },
          })
          : req?.user?.continent_code
            ? userFilter.push({ client_country: { $in: countriesWithContinentCodes } })
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
      // bd_id
      //   ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
      //   : "";
      // cluster_lead_id
      //   ? userFilter.push({
      //     "clusterData._id": new mongoose.Types.ObjectId(cluster_lead_id),
      //   })
      //   : "";
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
}

module.exports = new CountryLeadLeadsService();
