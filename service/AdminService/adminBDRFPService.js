const { default: mongoose } = require("mongoose");
const rfpModel = require("../../model/BDModel/rfpModel");
const rfpActivityModel = require("../../model/BDModel/rfpActivityModel");
const masterStatusModel = require("../../model/CommonModel/masterStatusModel");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");

class AdminBdRfpService {
    async adminGetRFPService(req) {
        try {
            const { page, limit, search, lead_id, bd_id, cluster_lead_id, cluster_head_id, lead_rfp_status_id, } = req.query;
            const options = {
                page: page ? page : 1, // Page number
                limit: limit ? limit : 10, // Number of documents per page
            };

            let matchQuery = {};
            let userFilter = [];
            // req.user._id ? userFilter.push({ bd_id: req.user._id }) : "";
            // req.query.lead_id ? userFilter.push({ lead_id: new mongoose.Types.ObjectId(req.query.lead_id) }) : "";

            cluster_head_id
                ? userFilter.push({ "bdData.cluster_head_id": cluster_head_id })
                : "";
            lead_id
                ? userFilter.push({ lead_id: new mongoose.Types.ObjectId(lead_id) })
                : "";
            cluster_lead_id
                ? userFilter.push({ "bdData.cluster_lead_id": new mongoose.Types.ObjectId(cluster_lead_id) })
                : "";
            bd_id
                ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
                : "";
            lead_rfp_status_id
                ? userFilter.push({
                    lead_rfp_status: new mongoose.Types.ObjectId(lead_rfp_status_id),
                })
                : "";

            // If the search parameter is provided, add filters for client_name and client_email
            if (search) {
                matchQuery.$or = [
                    // { ["leadData.client_name"]: { $regex: search, $options: 'i' } }, // Case-insensitive search for client_name
                    // { "leadData.client_name": { $regex: search, $options: 'i' } }, // Case-insensitive search for client_name
                    // { "leadData.client_email": { $regex: search, $options: 'i' } }, // Case-insensitive search for client_email
                    { "bdData.name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
                    { "bdData.email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
                    { "clusterLeadData.name": { $regex: search, $options: "i" } },
                    { "clusterLeadData.email": { $regex: search, $options: "i" } },
                    { "clusterData.name": { $regex: search, $options: "i" } },
                    { "clusterData.email": { $regex: search, $options: "i" } },
                    { "leadData.client_name": { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
                    { "leadData.client_email": { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
                ];
            }

            const resultAggregate = rfpActivityModel.aggregate([
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
                    $match: userFilter && userFilter.length > 0 ? { $and: userFilter } : {},//{ $and: userFilter },
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
                        from: "cluster_leads",
                        localField: "bdData.cluster_lead_id",
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
                    $match: { ...matchQuery },
                },
                {
                    $lookup: {
                        from: "master_statuses",
                        localField: "lead_rfp_status",
                        foreignField: "_id",
                        as: "leadRfpStatusData",
                    },
                },
                {
                    $unwind: {
                        path: "$leadRfpStatusData",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: "$rfp",
                },
                {
                    $lookup: {
                        from: "master_statuses",
                        localField: "rfp.rfp_type",
                        foreignField: "_id",
                        as: "rfp.rfp_type_data",
                    },
                },
                {
                    $lookup: {
                        from: "master_statuses",
                        localField: "rfp.activity_id",
                        foreignField: "_id",
                        as: "rfp.activity_data",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        bdData: {
                            bd_id: "$bdData._id",
                            emp_id: "$bdData.emp_id",
                            name: "$bdData.name",
                            email: "$bdData.email",
                            status: "$bdData.status",
                            designation: "$bdData.designation",
                        },
                        clusterLeadData: {
                            cluster_lead_id: "$clusterLeadData._id",
                            emp_id: "$clusterLeadData.emp_id",
                            name: "$clusterLeadData.name",
                            email: "$clusterLeadData.email",
                            status: "$clusterLeadData.status",
                            designation: "$clusterLeadData.designation",
                        },
                        clusterHeadData: {
                            cluster_head_id: "$clusterData._id",
                            name: "$clusterData.name",
                            email: "$clusterData.email",
                            status: "$clusterData.status",
                            designation: "$clusterData.designation",
                        },
                        leadData: {
                            lead_id: "$leadData._id",
                            client_name: "$leadData.client_name",
                            client_number: "$leadData.client_number",
                            client_email: "$leadData.client_email",
                        },
                        leadRfpStatusData: {
                            status_name: "$leadRfpStatusData.status_name",
                        },
                        rfp_type_data: { $arrayElemAt: ["$rfp.rfp_type_data", 0] },
                        activity_data: { $arrayElemAt: ["$rfp.activity_data", 0] },
                        pe_name: "$rfp.pe_name",
                        pe_email: "$rfp.pe_email",
                        remarks: "$rfp.remarks",
                        minutes_of_meeting: "$rfp.minutes_of_meeting",
                        rfp_id: "$rfp._id",
                        attachments: "$rfp.attachments",
                        proposal_value: 1,
                        // _id: '$rfp._id',
                        createdAt: "$rfp.createdAt",
                        updatedAt: "$rfp.updatedAt",

                        // rfp: {
                        //     rfp_type_data: '$rfpTypeData.status_name',
                        //     activity_data: '$activityData.status_name',
                        //     minutes_of_meeting: '$rfp.minutes_of_meeting',
                        //     attachments: '$rfp.attachments',
                        //     _id: '$rfp._id',
                        //     createdAt: '$rfp.createdAt',
                        //     updatedAt: '$rfp.updatedAt',
                        // },
                        status: 1,
                        deleted: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        bdData: { $first: "$bdData" },
                        clusterLeadData: { $first: "$clusterLeadData" },
                        clusterHeadData: { $first: "$clusterHeadData" },
                        leadData: { $first: "$leadData" },
                        leadRfpStatusData: { $first: "$leadRfpStatusData" },
                        rfp: {
                            $push: {
                                rfp_type_data: "$rfp_type_data.status_name",
                                rfp_type_data_id: "$rfp_type_data._id",
                                activity_data: "$activity_data.status_name",
                                activity_data_id: "$activity_data._id",
                                pe_name: "$pe_name",
                                pe_email: "$pe_email",
                                remarks: "$remarks",
                                minutes_of_meeting: "$minutes_of_meeting",
                                attachments: "$attachments",
                                _id: "$rfp_id",
                                createdAt: "$createdAt",
                                updatedAt: "$updatedAt",
                            },
                        },
                        proposal_value: { $first: "$proposal_value" },
                        status: { $first: "$status" },
                        deleted: { $first: "$deleted" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                    },
                },
                {
                    $unwind: "$rfp",
                },
                {
                    $group: {
                        _id: "$_id",
                        bdData: { $first: "$bdData" },
                        leadData: { $first: "$leadData" },
                        clusterLeadData: { $first: "$clusterLeadData" },
                        clusterHeadData: { $first: "$clusterHeadData" },
                        leadRfpStatusData: { $first: "$leadRfpStatusData" },
                        rfps: { $push: "$rfp" },
                        status: { $first: "$status" },
                        deleted: { $first: "$deleted" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                    },
                },
                {
                    $sort: { "rfps.createdAt": -1 },
                },
            ]);

            const rfp = await rfpModel.aggregatePaginate(resultAggregate, options);

            if (!rfp || rfp == "") {
                return {
                    status: 201,
                    success: true,
                    msg: "Requests for proposals not found.",
                    data: [],
                };
            }
            return {
                status: 200,
                success: true,
                msg: "Requests for proposals get successfully.",
                data: rfp,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when get proposal request service.",
                data: error,
            };
        }
    }

    async adminUpdateRFPService(req) {
        try {
            const { body, files, user } = req;

            const checkRfp = await rfpModel
                .findOne({
                    $and: [{ _id: body.rfp_id }],
                })
                .populate("bd_id", "emp_id name email")
                .populate("lead_id", "client_name client_number client_email");

            if (!checkRfp) {
                return {
                    success: false,
                    msg: "RFP not found.",
                    status: 400,
                    data: checkRfp,
                };
            }

            let attachment = [];
            if (files && files.attachment) {
                files.attachment.forEach((file) => attachment.push(file.path));
            }
            let rfpActivityBody = await masterStatusModel.findById(body.activity_id);
            let rfpActivityData = await masterStatusModel.findOne({
                $and: [{ status_name: "Revised RFP" }],
            });

            // let rfpActivityData = await masterStatusModel.findOne({ _id: new mongoose.Types.ObjectId(body.activity_id) });
            if (!rfpActivityData) {
                return {
                    success: false,
                    msg: "RFP activity not found.",
                    status: 400,
                    data: rfpActivityData,
                };
            }
            let rfpMom = {
                // activity_id: introMailActivity ? introMailActivity._id : "",
                rfp_type: body.rfp_type,
                activity_id: body.activity_id, // rfpActivityData._id,
                minutes_of_meeting: body.minutes_of_meeting,
                attachments: attachment,
            };

            const activity = await checkRfp.rfp.unshift(rfpMom);
            checkRfp.lead_rfp_status = rfpActivityData._id;

            const data = await checkRfp.save();
            if (data) {
                // let callScheduleActivity = await masterStatusModel.findOne({ $and: [{ status_code: 38 }] })
                const leadAtivity = await leadActivityModel({
                    lead_id: data.lead_id,
                    activity_id: body.activity_id, //rfpActivityData._id,
                    comment: [
                        {
                            comment_by_id: user._id,
                            comment:
                                data.comment && data.comment != ""
                                    ? data.comment
                                    : rfpActivityBody.status_name, //rfpActivityData.status_name,
                        },
                    ],
                });

                const leadactivityData = await leadAtivity.save();

                const rfpActivity = await rfpActivityModel({
                    lead_id: data.lead_id._id,
                    rfp_id: data.rfp[0]._id, //data._id,
                    activity_id: body.activity_id, //rfpActivityData._id,
                    comment: [
                        {
                            comment_by_id: user._id,
                            comment:
                                data.comment && data.comment != ""
                                    ? data.comment
                                    : rfpActivityBody.status_name, //rfpActivityData.status_name,
                        },
                    ],
                });

                let rfpActivitySaveData = await rfpActivity.save();
            }
            return {
                status: 201,
                success: true,
                msg: "RFP Request updated successfully.",
                data: data,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when update rfp service.",
                data: error,
            };
        }
    }

    async adminGetRfpMomService(req) {
        try {
            const { page, limit, search, rfp_id } = req.query;
            const options = {
                page: page ? page : 1, // Page number
                limit: limit ? limit : 10, // Number of documents per page
            };

            const resultAggregate = await rfpModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(rfp_id) },
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
                        from: "cluster_leads",
                        localField: "bdData.cluster_lead_id",
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
                        from: "clusters",
                        localField: "bdData.cluster_head_id",
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
                        localField: "lead_rfp_status",
                        foreignField: "_id",
                        as: "leadRfpStatusData",
                    },
                },
                {
                    $unwind: {
                        path: "$leadRfpStatusData",
                        preserveNullAndEmptyArrays: true,
                    },
                },

                {
                    $unwind: "$rfp",
                },
                {
                    $lookup: {
                        from: "rfp_activities",
                        localField: "rfp._id",
                        foreignField: "rfp_id",
                        as: "rfpRfpActivities",
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
                                    rfp_id: 1,
                                    lead_id: 1,
                                    activityData: {
                                        _id: "$activityData._id", //{ $arrayElemAt: ['$activityData.status_name', 0] }
                                        status_name: "$activityData.status_name", //{ $arrayElemAt: ['$activityData.status_name', 0] }
                                    },
                                    comment_by_data: {
                                        $arrayElemAt: ["$comment.comment_by_data", 0],
                                    },
                                    comment: "$comment.comment",
                                    comment_id: "$comment._id",
                                    commentcreatedAt: "$comment.createdAt",
                                    commentupdatedAt: "$comment.updatedAt",
                                    createdAt: 1,
                                    updatedAt: 1,
                                },
                            },
                            {
                                $group: {
                                    _id: "$_id",
                                    rfp_id: { $first: "$rfp_id" },
                                    lead_id: { $first: "$lead_id" },
                                    activityData: { $first: "$activityData" },
                                    comments: {
                                        $push: {
                                            comment_by: "$comment_by_data.username",
                                            comment_by_name: "$comment_by_data.name",
                                            comment: "$comment",
                                            _id: "$comment_id",
                                            createdAt: "$commentcreatedAt",
                                            updatedAt: "$commentupdatedAt",
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
                                    rfp_id: { $first: "$rfp_id" },
                                    lead_id: { $first: "$lead_id" },
                                    activityData: { $first: "$activityData" },
                                    comments: { $push: "$comments" },
                                    createdAt: { $first: "$createdAt" },
                                    updatedAt: { $first: "$updatedAt" },
                                },
                            },
                            {
                                $sort: { createdAt: -1 },
                            },
                        ],
                    },
                },
                {
                    $unwind: "$rfpRfpActivities",
                },
                {
                    $lookup: {
                        from: "master_statuses",
                        localField: "rfp.rfp_type",
                        foreignField: "_id",
                        as: "rfp.rfp_type_data",
                    },
                },
                {
                    $lookup: {
                        from: "master_statuses",
                        localField: "rfp.activity_id",
                        foreignField: "_id",
                        as: "rfp.activity_data",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        bdData: {
                            bd_id: "$bdData._id",
                            emp_id: "$bdData.emp_id",
                            name: "$bdData.name",
                            email: "$bdData.email",
                            designation: "$bdData.designation",
                        },
                        leadData: {
                            lead_id: "$leadData._id",
                            client_name: "$leadData.client_name",
                            client_number: "$leadData.client_number",
                            client_email: "$leadData.client_email",
                        },
                        clusterLeadData: {
                            cluster_lead_id: "$clusterLeadData._id",
                            emp_id: "$clusterLeadData.emp_id",
                            name: "$clusterLeadData.name",
                            email: "$clusterLeadData.email",
                            designation: "$clusterLeadData.designation",
                        },
                        clusterHeadData: {
                            cluster_head_id: "$clusterData._id",
                            name: "$clusterData.name",
                            email: "$clusterData.email",
                            status: "$clusterData.status",
                            designation: "$clusterData.designation",
                        },
                        leadRfpStatusData: {
                            status_name: "$leadRfpStatusData.status_name",
                        },
                        rfp_type_data: { $arrayElemAt: ["$rfp.rfp_type_data", 0] },
                        activity_data: { $arrayElemAt: ["$rfp.activity_data", 0] },
                        rfpRfpActivities: 1,
                        minutes_of_meeting: "$rfp.minutes_of_meeting",
                        rfp_id: "$rfp._id",
                        attachments: "$rfp.attachments",
                        createdAt: "$rfp.createdAt",
                        updatedAt: "$rfp.updatedAt",
                        status: 1,
                        deleted: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        bdData: { $first: "$bdData" },
                        leadData: { $first: "$leadData" },
                        clusterLeadData: { $first: "$clusterLeadData" },
                        clusterHeadData: { $first: "$clusterHeadData" },
                        leadRfpStatusData: { $first: "$leadRfpStatusData" },
                        rfp: {
                            $push: {
                                rfp_type_data: "$rfp_type_data.status_name",
                                activity_data: "$activity_data.status_name",
                                rfpRfpActivities: "$rfpRfpActivities",
                                minutes_of_meeting: "$minutes_of_meeting",
                                attachments: "$attachments",
                                _id: "$rfp_id",
                                createdAt: "$createdAt",
                                updatedAt: "$updatedAt",
                            },
                        },
                        status: { $first: "$status" },
                        deleted: { $first: "$deleted" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                    },
                },
                {
                    $unwind: "$rfp",
                },
                {
                    $group: {
                        _id: "$_id",
                        bdData: { $first: "$bdData" },
                        leadData: { $first: "$leadData" },
                        clusterLeadData: { $first: "$clusterLeadData" },
                        clusterHeadData: { $first: "$clusterHeadData" },
                        leadRfpStatusData: { $first: "$leadRfpStatusData" },
                        rfps: { $push: "$rfp" },
                        status: { $first: "$status" },
                        deleted: { $first: "$deleted" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                    },
                },
                {
                    $sort: { "rfps.createdAt": -1 },
                },
            ]);

            return {
                status: 200,
                success: true,
                msg: "Requests for proposals get successfully.",
                data: resultAggregate,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when get proposal request service.",
                data: error,
            };
        }
    }

    async adminUpdateRfpStatusService(req) {
        try {
            const body = req.body;
            // const profilePic = req.file;
            const rfp = await rfpModel.findOne({ _id: body.rfp_id });
            if (!rfp) {
                return {
                    status: 400,
                    success: false,
                    msg: "rfp not found",
                    data: rfp,
                };
            }
            rfp.lead_rfp_status = body.rfp_status;
            // rfp.rfp_status = body.rfp_status ? body.rfp_status :

            const updaterfpStatus = await rfp.save();
            return {
                status: 201,
                success: true,
                msg: "RFP status updated successfully.",
                data: updaterfpStatus,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when update rfp status service.",
                data: error,
            };
        }
    }

    async adminGetRFPActivitiesService(req) {
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
                matchQuery.$or =
                    // { ["$leads.client_name"]: { $regex: search, $options: 'i' } }, // Case-insensitive search for client_name
                    [
                        { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
                        { client_email: { $regex: search, $options: "i" } }, // Case-insensitive search for client_email
                    ];
            }

            const rfpActivity = await rfpActivityModel.aggregate([
                {
                    $match: {
                        rfp_id: new mongoose.Types.ObjectId(req.query.rfp_id),
                        ...matchQuery,
                    }, // Match the specific RfpActivity document by _id
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
                        comment_id: "$comment._id",
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
                                _id: "$comment_id",
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

            // const rfpActivity = await rfpActivityModel.aggregatePaginate(
            //     resultAggregate,
            //     options
            // );

            if (!rfpActivity || rfpActivity == "") {
                return {
                    status: 201,
                    success: true,
                    msg: "rfpActivity not found.",
                    data: [],
                };
            }
            return {
                status: 200,
                success: true,
                msg: "RFP Activity get successfully.",
                data: rfpActivity,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when get lead rfp activities service.",
                data: error,
            };
        }
    }

    async adminUpdateRFPActivityService(req) {
        try {
            const { rfp_activity_id, rfp_id, activity_id, comment } = req.body;

            let rfpActivity;
            if (rfp_activity_id != "") {
                rfpActivity = await rfpActivityModel.findOne({ _id: rfp_activity_id });
                if (!rfpActivity) {
                    return {
                        status: 400,
                        success: false,
                        msg: "rfpActivity not found",
                        data: rfpActivity,
                    };
                }
            }
            if (
                rfpActivity &&
                rfpActivity.activity_id.toString() == activity_id.toString()
            ) {
                return {
                    status: 400,
                    success: false,
                    msg: "RFP activity already updated.",
                    data: rfpActivity,
                };
            }
            let rfp = await rfpModel.findOne({ "rfp._id": rfpActivity.rfp_id });
            if (!rfp) {
                return {
                    status: 400,
                    success: false,
                    msg: "RFP not found",
                    data: rfp,
                };
            }
            let rfpActivityStatus = await masterStatusModel.findById(
                rfp.lead_rfp_status
            );
            let activityStatus = await masterStatusModel.findById(activity_id);

            const activity = await rfpActivityModel({
                lead_id: rfpActivity?.lead_id,
                rfp_id: rfpActivity?.rfp_id ? rfpActivity?.rfp_id : "",
                activity_id: activity_id ? activity_id : "",
                comment: [
                    {
                        comment_by_id: req.user._id,
                        comment:
                            comment && comment != ""
                                ? comment
                                : `${rfpActivityStatus.status_name} ${activityStatus.status_name}`,
                    },
                ],
            });

            const data = await activity.save();
            if (data) {
                // rfp.lead_rfp_status = data?.activity_id;
                // rfp.save();
                // let rfpUpdate = await rfpModel.updateOne({ "rfp._id": new mongoose.Types.ObjectId(rfpActivity.rfp_id) }, { "rfp.activity_id": new mongoose.Types.ObjectId(data?.activity_id) });
                let rfpUpdate = await rfpModel.updateOne(
                    { "rfp._id": new mongoose.Types.ObjectId(rfpActivity.rfp_id) },
                    {
                        $set: {
                            "rfp.$.activity_id": new mongoose.Types.ObjectId(
                                data?.activity_id
                            ),
                        },
                    }
                );
                // let rfpScheduleActivity = await masterStatusModel.findOne({ $and: [{ status_code: 38 }] })
                const activity = await leadActivityModel({
                    lead_id: data.lead_id,
                    activity_id: data?.activity_id ? data?.activity_id : "",
                    comment: [
                        {
                            comment_by_id: req.user._id,
                            comment:
                                comment && comment != "" ? comment : activityStatus.status_name,
                        },
                    ],
                });

                const leadactivityData = await activity.save();
            }
            return {
                status: 201,
                success: true,
                msg: "RFP Activity updated successfully.",
                data: data,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when update rfp activity service.",
                data: error,
            };
        }
    }

    async adminAddCommentRFPActivityService(req) {
        try {
            const { rfp_activity_id, comment } = req.body;

            let rfpActivity;
            if (rfp_activity_id != "") {
                rfpActivity = await rfpActivityModel.findOne({ _id: rfp_activity_id });
                if (!rfpActivity) {
                    return {
                        status: 400,
                        success: false,
                        msg: "rfpActivity not found",
                        data: rfpActivity,
                    };
                }
            }
            const rfp = await rfpModel.findOne({ "rfp._id": rfpActivity.rfp_id });
            if (!rfp) {
                return {
                    status: 400,
                    success: false,
                    msg: "rfp not found.",
                    data: rfp,
                };
            }

            const activity = await rfpActivity.comment.unshift({
                comment_by_id: req.user._id,
                comment: comment ? comment : "",
            });
            // rfpActivityModel({
            //     rfp_id: rfp_id ? rfp_id : "",
            //     activity_id: activity_id ? activity_id : "",
            //     comment: [{
            //         comment_by_id: req.user._id,
            //         comment: comment ? comment : ""
            //     }]
            // })

            const data = await rfpActivity.save();
            return {
                status: 201,
                success: true,
                msg: "Comment successfully on rfp activity.",
                data: data,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when update rfp activity service.",
                data: error,
            };
        }
    }

    ///////////////////////////BH Service /////////////////////////

}

module.exports = new AdminBdRfpService();
