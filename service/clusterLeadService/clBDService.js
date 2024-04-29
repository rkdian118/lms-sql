const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const loginsModel = require("../../model/loginsModel");

class ClusterLeadBDService {

    isBDClusterLeadService = async (cluster_lead_id) => {
        // const { cluster_lead_id } = req.query;
        const bdDetail = await bdModel.find(
            { cluster_lead_id: cluster_lead_id },
            {
                cluster_head_id: 1,
                cluster_lead_id: 1,
                emp_id: 1,
                unique_id: 1,
                name: 1,
                username: 1,
                email: 1,
                designation: 1,
                mobile: 1,
                profile_pic: 1,
                secret_key: 1,
                status: 1,
            }
        );
        //   .populate("admin_id", "emp_id name email designation");

        // return

        if (!bdDetail || bdDetail.length === 0) {
            return {
                status: 400,
                success: false,
                msg: "BDE detail not found.",
                data: "",
            };
        }
        return {
            status: 200,
            success: true,
            msg: "BDE detail get successfully.",
            data: bdDetail,
        };
    };

    async clGetBDsService(req) {
        const { page, limit, search, bd_id } = req.query;
            const options = {
                page: page ? page : 1, // Page number
                limit: limit ? limit : 10, // Number of documents per page
            };
            // Create an empty match query
            const matchQuery = {};
            let userFilter = [];

            req?.user?._id ? userFilter.push({ cluster_lead_id: req.user._id }) : "";
            bd_id ? userFilter.push({ _id: new mongoose.Types.ObjectId(bd_id) }) : "";
            // If the search parameter is provided, add filters for client_name and client_email
            if (search) {
                matchQuery.$or = [
                    { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for client_name
                    { email: { $regex: search, $options: 'i' } }, // Case-insensitive search for client_email
                ];
            }

        const resultAggregate = bdModel.aggregate([
            {
                $match: { $and: userFilter, ...matchQuery },
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
            //     $lookup: {
            //         from: "managers",
            //         localField: "manager_id",
            //         foreignField: "_id",
            //         as: "managerData",
            //     },
            // },
            // {
            //     $unwind: {
            //         path: "$managerData",
            //         preserveNullAndEmptyArrays: true,
            //     },
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
                $sort: { "clusterData.name": 1 }, // Corrected sorting syntax
            },
            {
                $project: {
                    emp_id: 1,
                    unique_id: 1,
                    name: 1,
                    username: 1,
                    email: 1,
                    designation: 1,
                    mobile: 1,
                    profile_pic: 1,
                    secret_key: 1,
                    status: 1,
                    deleted: 1,
                    clusterLead: {
                        _id: "$clusterLeadData._id",
                        emp_id: "$clusterLeadData.emp_id",
                        name: "$clusterLeadData.name",
                        email: "$clusterLeadData.email",
                        designation: "$clusterLeadData.designation",
                        profile_pic: "$clusterLeadData.profile_pic"
                    },
                    // manager: {
                    //     _id: "$managerData._id",
                    //     emp_id: "$managerData.emp_id",
                    //     name: "$managerData.name",
                    //     email: "$managerData.email",
                    //     designation: "$managerData.designation",
                    //     profile_pic: "$managerData.profile_pic"
                    // },
                    cluster: {
                        _id: "$clusterData._id",
                        emp_id: "$clusterData.emp_id",
                        name: "$clusterData.name",
                        email: "$clusterData.email",
                        designation: "$clusterData.designation",
                        profile_pic: "$clusterData.profile_pic"
                    },
                },
            },
        ]);
        const bd = await bdModel.aggregatePaginate(resultAggregate, options);
        if (!bd || bd.length === 0) {
            return {
                status: 400,
                success: false,
                msg: "BDEs not found.",
                data: "",
            };
        }
        return {
            status: 200,
            success: true,
            msg: "BDEs get successfully.",
            data: bd,
        };
    }

    async clGetBDsDropdownService(req) {
        const { search, bd_id } = req.query;
            // const options = {
            //     page: page ? page : 1, // Page number
            //     limit: limit ? limit : 10, // Number of documents per page
            // };
            // Create an empty match query
            const matchQuery = {};
            let userFilter = [];

            req?.user?._id ? userFilter.push({ cluster_lead_id: req.user._id }) : "";
            bd_id ? userFilter.push({ _id: new mongoose.Types.ObjectId(bd_id) }) : "";
            userFilter.push({ status: "1" }) ;
            // If the search parameter is provided, add filters for client_name and client_email
            if (search) {
                matchQuery.$or = [
                    { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for client_name
                    { email: { $regex: search, $options: 'i' } }, // Case-insensitive search for client_email
                ];
            }

        const bd = await bdModel.aggregate([
            {
                $match: { $and: userFilter, ...matchQuery },
            },
            
            {
                $sort: { "clusterData.name": 1 }, // Corrected sorting syntax
            },
            {
                $project: {
                    _id: 1,
                    emp_id: 1,
                    name: 1,
                    email: 1,
                    designation: 1,
                },
            },
        ]);
        // const bd = await bdModel.aggregatePaginate(resultAggregate, options);
        if (!bd || bd.length === 0) {
            return {
                status: 400,
                success: false,
                msg: "BDEs dropdown list not found.",
                data: "",
            };
        }
        return {
            status: 200,
            success: true,
            msg: "BDEs dropdown list get successfully.",
            data: bd,
        };
    }

    async clGetBDDetailService(req, bd_id) {
        // const { _id } = req.query;
        const bdDetail = await bdModel
            .findOne(
                { $and: [{ _id: bd_id }, { cluster_lead_id: req.user._id }] },
                {
                    cluster_head_id: 1,
                    manager_id: 1,
                    cluster_lead_id: 1,
                    emp_id: 1,
                    unique_id: 1,
                    name: 1,
                    username: 1,
                    email: 1,
                    designation: 1,
                    mobile: 1,
                    profile_pic: 1,
                    secret_key: 1,
                    status: 1,
                    delete: 1,
                }
            )
            .populate("cluster_lead_id", "emp_id name email designation")
            // .populate("manager_id", "emp_id name email designation")
            .populate("cluster_head_id", "emp_id name email designation")
            
        // return

        if (!bdDetail || bdDetail.length === 0) {
            return {
                status: 400,
                success: false,
                msg: "BDE detail not found.",
                data: "",
            };
        }
        return {
            status: 200,
            success: true,
            msg: "BDE detail get successfully.",
            data: bdDetail,
        };
    }

    // ClusterBDService.
    // updateBDService = async (req) => {
    //     try {
    //         const body = req.body;
    //         // const profilePic = req.file;

    //         const user = await bdModel.findOne({ _id: body.bd_id });
    //         if (!user) {
    //             return {
    //                 status: 400,
    //                 success: false,
    //                 msg: "BDE not found",
    //                 data: user,
    //             };
    //         }
    //         const userLogins = await loginsModel.findOne({ user_id: body.bd_id });
    //         if (!userLogins) {
    //             return {
    //                 status: 400,
    //                 success: false,
    //                 msg: "BDE credintials not found",
    //                 data: userLogins,
    //             };
    //         }

    //         let userEmail;
    //         if (body?.email !== user.email) {
    //             userEmail = await bdModel.findOne(
    //                 { email: body.email },
    //                 { name: 1, email: 1, designation: 1 }
    //             );
    //         }
    //         if (userEmail) {
    //             return {
    //                 status: 400,
    //                 success: false,
    //                 msg: "BDE email already exist.",
    //                 data: userEmail,
    //             };
    //         }

    //         const updateBD = {};

    //         body.name && body.name !== "" ? (updateBD["name"] = body.name) : "";
    //         body.email && body.email !== "" ? (updateBD["email"] = body.email) : "";
    //         body.designation && body.designation !== "" ? (updateBD["designation"] = body.designation) : "";
    //         body.mobile && body.mobile !== "" ? (updateBD["mobile"] = body.mobile) : "";
    //         // body.cluster_lead_id && body.cluster_lead_id !== "" ? (updateBD["cluster_lead_id"] = body.cluster_lead_id) : (updateBD["$unset"] = { cluster_lead_id: 1 });
    //         req.file ? (updateBD["profile_pic"] = req.file.path) : "";


    //         const bd = await bdModel.updateOne({ _id: body.bd_id }, updateBD);

    //         const updateBDCredential = {
    //             // username: body?.username ? body?.username : userLogins.username,
    //             // email: body?.email ? body?.email : userLogins?.email,
    //         };
    //         body.email && body.email !== "" ? (userLogins.email = body.email) : "";
    //         body.password && body.password !== "" ? (userLogins.password = body.password) : "";

    //         const BDCred = await userLogins.save();
    //         // await loginsModel.updateOne(
    //         //   { user_id: body._id },
    //         //   updateBDCredential
    //         // );

    //         return {
    //             status: 200,
    //             success: true,
    //             msg: "BDE details updated successfully.",
    //             data: { bd },
    //         };
    //     } catch (error) {
    //         return {
    //             status: 400,
    //             success: false,
    //             msg: "Somethin went wrong when update BDE service.",
    //             data: error,
    //         };
    //     }
    // };

}

module.exports = new ClusterLeadBDService();
