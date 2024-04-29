const { default: mongoose } = require("mongoose");
const callActivityModel = require("../../model/BDModel/callActivityModel");
const callModel = require("../../model/BDModel/callModel");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");
const leadModel = require("../../model/BDModel/leadModel");
const masterStatusModel = require("../../model/CommonModel/masterStatusModel");
const moment = require("moment");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");

class AdminBdCallService {

    async adminGetLeadCallsService(req) {
        try {
            const { page, limit, search, cluster_lead_id, cluster_head_id, bd_id, lead_id, call_status_id, call_type_id, start_date, end_date, } = req.query;
            const options = {
                page: page ? page : 1, // Page number
                limit: limit ? limit : 10, // Number of documents per page
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
                meeting_date_time: {
                    //createdAt
                    $gte: startDate,
                    $lte: endDate,
                },
            };

            const matchQuery = {};
            let userFilter = [];

            cluster_head_id
                ? userFilter.push({ "clusterData._id": new mongoose.Types.ObjectId(cluster_head_id) })
                : "";
            lead_id
                ? userFilter.push({ lead_id: new mongoose.Types.ObjectId(lead_id) })
                : "";
            bd_id
                ? userFilter.push({ "bdData._id": new mongoose.Types.ObjectId(bd_id) })
                : "";
            cluster_lead_id
                ? userFilter.push({ "clusterLeadData._id": new mongoose.Types.ObjectId(cluster_lead_id), })
                : "";
            call_status_id
                ? userFilter.push({ call_status_id: new mongoose.Types.ObjectId(call_status_id), })
                : "";
            call_type_id
                ? userFilter.push({ call_type_id: new mongoose.Types.ObjectId(call_type_id), })
                : "";
            start_date && end_date && userFilter.push(match);

            if (search) {
                matchQuery.$or = [
                    { "bdData.name": { $regex: search, $options: "i" } },
                    { "bdData.email": { $regex: search, $options: "i" } },
                    { "clusterLeadData.name": { $regex: search, $options: "i" } },
                    { "clusterLeadData.email": { $regex: search, $options: "i" } },
                    { "clusterData.name": { $regex: search, $options: "i" } },
                    { "clusterData.email": { $regex: search, $options: "i" } },
                    { "leadData.client_name": { $regex: search, $options: "i" } },
                    { "leadData.client_email": { $regex: search, $options: "i" } },
                ];
            }

            const resultAggregate = callModel.aggregate([
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
                        localField: "call_type_id",
                        foreignField: "_id",
                        as: "callTypeData",
                    },
                },
                {
                    $unwind: {
                        path: "$callTypeData",
                        preserveNullAndEmptyArrays: true,
                    },
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
                    $unwind: {
                        path: "$callModeData",
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
                    $unwind: {
                        path: "$callStatusData",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $match: userFilter && userFilter.length > 0 ? { $and: userFilter } : {},
                },
                {
                    $match: { ...matchQuery }, //[{ bd_id: req.user._id }, { lead_id: new mongoose.Types.ObjectId(req.query.lead_id) }]
                },
                {
                    $project: {
                        bdData: {
                            bd_id: "$bdData._id",
                            name: "$bdData.name",
                            email: "$bdData.email",
                            status: "$bdData.status",
                            designation: "$bdData.designation",
                        },
                        clusterLeadData: {
                            cluster_lead_id: "$clusterLeadData._id",
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
                        leadData: 1,
                        callTypeData: {
                            _id: "$callTypeData._id",
                            status_name: "$callTypeData.status_name",
                        },
                        callModeData: {
                            _id: "$callModeData._id",
                            status_name: "$callModeData.status_name",
                        },
                        callStatusData: {
                            _id: "$callStatusData._id",
                            status_name: "$callStatusData.status_name",
                        },
                        meeting_link: 1,
                        pe_name: 1,
                        recording_link: 1,
                        meeting_date_time: 1,
                        comment_remark: 1,
                        status: 1,
                        deleted: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
                {
                    $sort: {
                        createdAt: -1, // Sort by createdAt date in descending order
                    },
                },
            ]);

            const leadCalls = await callModel.aggregatePaginate(
                resultAggregate,
                options
            );

            return {
                status: 200,
                success: true,
                msg: "Lead calls get successfully.",
                data: leadCalls,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when get lead calls service.",
                data: error,
            };
        }
    }

    async adminUpdateCallService(req) {
        try {
            const body = req.body;
            // const profilePic = req.file;
            const call = await callModel.findOne({ _id: body.call_id });
            if (!call) {
                return {
                    status: 400,
                    success: false,
                    msg: "Meeting not found",
                    data: call,
                };
            }

            let meetingDateTime = new Date(body.meeting_date_time);
            let scheduleStatus = await masterStatusModel.findOne({
                $and: [{ status_name: "Meeting Scheduled" }],
            });
            let meetingScheduled;
            if (meetingDateTime != call.meeting_date_time) {
                meetingScheduled = await callModel.find({
                    $and: [
                        { lead_id: { $nin: new mongoose.Types.ObjectId(call.lead_id) } },
                        // { bd_id: req.user._id },
                        { meeting_date_time: meetingDateTime },
                        {
                            $or: [
                                {
                                    call_status_id: {
                                        $in: scheduleStatus._id,
                                    },
                                },
                            ],
                        },
                    ],
                });
            }
            if (meetingScheduled && meetingScheduled.length > 0) {
                return {
                    success: false,
                    msg: "You have already scheduled a call at that time.",
                    status: 400,
                    data: meetingScheduled,
                };
            }

            const callValid = {};
            if (
                body.call_mode_id != call.call_mode_id ||
                body.meeting_link != call.meeting_link ||
                body.meeting_date_time != call.meeting_date_time
            ) {
                callValid["lead_id"] = body.lead_id;
                callValid["call_mode_id"] = body.call_mode_id;
                callValid["meeting_link"] = body.meeting_link;
                callValid["meeting_date_time"] = body.meeting_date_time;
                callValid["call_type_id"] = body.call_type_id;
            }

            const filtercallValid = {
                ...Object.fromEntries(Object.entries(callValid).filter(([_, v]) => v)),
            };

            if (filtercallValid && Object.keys(filtercallValid).length > 0) {
                const callFind = await callModel
                    .findOne({ $and: [{ _id: { $nin: body.call_id } }, filtercallValid] })
                    .populate("bd_id", "emp_id name email")
                    .populate("call_type_id", "status_name");

                if (
                    callFind &&
                    callFind?.bd_id?._id.toString() === call?.bd_id.toString()
                ) {
                    return {
                        success: false,
                        msg: "You have already added this call.",
                        status: 400,
                        data: callFind,
                    };
                }

                if (callFind && callFind != "") {
                    return {
                        success: false,
                        msg: `${callFind?.bd_id?.name} handling this call, ${callFind?.call_type_id?.status_name} type lead.`,
                        status: 400,
                        data: callFind,
                    };
                }
            }

            let callStatus =
                call.call_status_id.toString() == body.call_status_id
                    ? ""
                    : body.call_status_id;
            let callMasterStatus = await masterStatusModel.findById(
                body.call_status_id
            );
            // const formData = callModel(filtercall);
            call.call_mode_id = body.call_mode_id;
            call.meeting_link = body.meeting_link;
            call.meeting_date_time = meetingDateTime;
            call.pe_name = body.pe_name;
            call.recording_link = body.recording_link;
            call.call_type_id = body.call_type_id;
            call.call_status_id = body.call_status_id;
            call.comment_remark = body.comment_remark;

            const updatecall = await call.save();
            if (updatecall && callStatus != "") {
                // let callScheduleActivity = await masterStatusModel.findOne({ $and: [{ status_code: 38 }] })
                const activity = await leadActivityModel({
                    lead_id: updatecall.lead_id,
                    activity_id: updatecall?.call_status_id
                        ? updatecall?.call_status_id
                        : updatecall.call_type_id,
                    comment: [
                        {
                            comment_by_id: req.user._id,
                            comment:
                                updatecall?.comment_remark && updatecall?.comment_remark != ""
                                    ? updatecall?.comment_remark
                                    : callMasterStatus.status_name,
                        },
                    ],
                });

                const leadactivityData = await activity.save();

                const callActivity = await callActivityModel({
                    lead_id: updatecall.lead_id,
                    call_id: updatecall._id,
                    activity_id: updatecall?.call_status_id
                        ? updatecall?.call_status_id
                        : updatecall.call_type_id,
                    comment: [
                        {
                            comment_by_id: req.user._id,
                            comment:
                                updatecall?.comment_remark && updatecall?.comment_remark != ""
                                    ? updatecall?.comment_remark
                                    : callMasterStatus.status_name,
                            // comment: updatecall?.comment_remark && updatecall?.comment_remark != "" ? updatecall?.comment_remark :
                        },
                    ],
                });

                const callActivitySave = await callActivity.save();
            }
            return {
                status: 201,
                success: true,
                msg: "Call updated successfully.",
                data: updatecall,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when update call service.",
                data: error,
            };
        }
    }

    async adminGetCallActivityService(req) {
        try {
            const { page, limit, search, call_id } = req.query;
            const options = {
                page: page ? page : 1, // Page number
                limit: limit ? limit : 10, // Number of documents per page
            };

            const callActivity = await callActivityModel.aggregate([
                {
                    $match: { call_id: new mongoose.Types.ObjectId(call_id) }, //, ...matchQuery
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
                        // status: { $first: '$status' },
                        // deleted: { $first: '$deleted' },
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
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                    },
                },
                {
                    $sort: { createdAt: -1 },
                },
            ]);

            return {
                status: 200,
                success: true,
                msg: "Call Activities get successfully.",
                data: callActivity,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when get lead call activities service.",
                data: error,
            };
        }
    }

    async adminUpdateCallActivityService(req) {
        try {
            const { call_activity_id, activity_id, comment } = req.body;

            let callActivity;
            if (call_activity_id != "") {
                callActivity = await callActivityModel.findOne({
                    _id: call_activity_id,
                });
                if (!callActivity) {
                    return {
                        status: 400,
                        success: false,
                        msg: "callActivity not found",
                        data: callActivity,
                    };
                }
            }
            if (callActivity && callActivity.activity_id.toString() == activity_id.toString()) {
                return {
                    status: 400,
                    success: false,
                    msg: "call activity already updated.",
                    data: callActivity,
                };
            }
            let call = await callModel.findOne({ _id: callActivity.call_id });
            if (!call) {
                return {
                    status: 400,
                    success: false,
                    msg: "call not found",
                    data: call,
                };
            }
            let callActivityStatus = await masterStatusModel.findById(
                call.call_status_id
            );
            let activityStatus = await masterStatusModel.findById(activity_id);

            const activity = await callActivityModel({
                lead_id: callActivity?.lead_id,
                call_id: callActivity?.call_id ? callActivity?.call_id : "",
                activity_id: activity_id ? activity_id : "",
                comment: [
                    {
                        comment_by_id: req.user._id,
                        comment: comment && comment != ""
                            ? comment
                            : `${callActivityStatus.status_name} ${activityStatus.status_name}`,
                    },
                ],
            });

            const data = await activity.save();
            if (data) {
                call.call_status_id = data?.activity_id;
                call.save();
                // let callScheduleActivity = await masterStatusModel.findOne({ $and: [{ status_code: 38 }] })
                const leadActivity = await leadActivityModel({
                    lead_id: data.lead_id,
                    activity_id: data?.activity_id ? data?.activity_id : "",
                    comment: [
                        {
                            comment_by_id: req.user._id,
                            comment:
                                comment && comment != ""
                                    ? comment
                                    : `${callActivityStatus.status_name} ${activityStatus.status_name}`,
                        },
                    ],
                });
                await leadActivity.save();
            }
            return {
                status: 201,
                success: true,
                msg: "Call Activity updated successfully.",
                data: data,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: "Somethin went wrong when update call activity service.",
                data: error,
            };
        }
    }

    async adminAddCommentCallActivityService(req) {
        try {
            const { call_activity_id, comment } = req.body;

            let callActivity;
            if (call_activity_id != "") {
                callActivity = await callActivityModel.findOne({
                    _id: call_activity_id,
                });
                if (!callActivity) {
                    return {
                        status: 400,
                        success: false,
                        msg: "callActivity not found",
                        data: callActivity,
                    };
                }
            }
            const call = await callModel.findOne({ _id: callActivity.call_id });
            if (!call) {
                return {
                    status: 400,
                    success: false,
                    msg: "call not found.",
                    data: call,
                };
            }

            const activity = await callActivity.comment.unshift({
                comment_by_id: req.user._id,
                comment: comment ? comment : "",
            });

            const data = await callActivity.save();
            return {
                status: 201,
                success: true,
                msg: "Comment successfully on call activity.",
                data: data,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: "Somethin went wrong when update call activity service.",
                data: error,
            };
        }
    }

    async getMonthStartDate(req) {
        let clTarget = await branchTargetModel.findOne({
            //   bd_id: req.user._id,
            // cluster_head_id: req.user._id,
            target_month: moment().format("MMMM"),
            target_year: moment().format("YYYY"),
        });
        if (!clTarget) {
            clTarget = await branchTargetModel.findOne({
                // bd_id: req.user._id,
                // cluster_head_id: req.user._id,
                target_month: moment().subtract(1, "month").format("MMMM"),
                target_year: moment().subtract(1, "month").format("YYYY"),
            });
        }
        return clTarget;
    }





    ///////////////////////// ClusterBdCallService ///////////////////////
    async adminGetLeadCallTypeService(req) {
        try {
            const callType = await masterStatusModel
                .find({ $and: [{ status_type: "call" }] })
                .select("status_code status_name");

            return {
                status: 200,
                success: true,
                msg: "Call type get successfully.",
                data: callType,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when get call type service.",
                data: error,
            };
        }
    }

    async adminGetLeadCallStatusService(req) {
        try {
            const callStatus = await masterStatusModel
                .find({ $and: [{ status_type: "call_status" }] })
                .select("status_code status_name");

            return {
                status: 200,
                success: true,
                msg: "Call status get successfully.",
                data: callStatus,
            };
        } catch (error) {
            return {
                status: 400,
                success: false,
                msg: error, //"Somethin went wrong when get call status service.",
                data: error,
            };
        }
    }

}

const myInstance = new AdminBdCallService();

module.exports = new AdminBdCallService();
