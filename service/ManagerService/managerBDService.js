const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const managerModel = require("../../model/ManagerModel/managerModel");
const loginsModel = require("../../model/loginsModel");

class ManagerBDService {

    async isBDManagerService(manager_id) {
        // const { manager_id } = req.query;
        const bdDetail = await bdModel.find(
            { manager_id: manager_id },
            {
                cluster_head_id: 1,
                manager_id: 1,
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

    async getManagerBDsService(req) {
        const { page, limit, search } = req.query;
        const options = {
            page: page ? page : 1, // Page number
            limit: limit ? limit : 10, // Number of documents per page
        };

        const resultAggregate = bdModel.aggregate([
            {
                $match: {
                    manager_id: req.user._id,
                },
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
            {
                $lookup: {
                    from: "managers",
                    localField: "manager_id",
                    foreignField: "_id",
                    as: "managerData",
                },
            },
            {
                $unwind: {
                    path: "$managerData",
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
                    manager: {
                        _id: "$managerData._id",
                        emp_id: "$managerData.emp_id",
                        name: "$managerData.name",
                        email: "$managerData.email",
                        designation: "$managerData.designation",
                        profile_pic: "$managerData.profile_pic"
                    },
                    cluster_head: {
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

    async getManagerBDDetailService(req, bd_id) {
        // const { _id } = req.query;
        const bdDetail = await bdModel
            .findOne(
                { $and: [{ _id: bd_id }, { manager_id: req.user._id }] },
                {
                    cluster_head_id: 1,
                    manager_id: 1,
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
            .populate("manager_id", "emp_id name email designation")
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

    // async updateBDService(req) {
    //     try {
    //         const body = req.body;
    //         // const profilePic = req.file;

    //         const user = await bdModel.findOne({ _id: body._id });
    //         if (!user) {
    //             return {
    //                 status: 400,
    //                 success: false,
    //                 msg: "BDE not found",
    //                 data: user,
    //             };
    //         }
    //         const userLogins = await loginsModel.findOne({ user_id: body._id });
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
    //         body.manager_id && body.manager_id !== "" ? (updateBD["manager_id"] = body.manager_id) : (updateBD["$unset"] = { manager_id: 1 });
    //         req.file ? (updateBD["profile_pic"] = req.file.path) : "";


    //         const bd = await bdModel.updateOne({ _id: body._id }, updateBD);

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
    //             msg: error, //"Somethin went wrong when update BDE service.",
    //             data: error,
    //         };
    //     }
    // };

    // async bdStatusChangeService(req) {
    //     try {
    //         const { bd_id, status } = req.body;

    //         const checkbd = await this.getbdDetailService(req, bd_id);
    //         if (!checkbd.success) {
    //             return {
    //                 status: 200,
    //                 success: false,
    //                 msg: "BDE not found.",
    //                 data: "",
    //             };
    //         }


    //         if (checkbd?.data?.manager_id && status == 3) {
    //                 "checkbd?.data?.manager_id && status == 3: ",
    //                 checkbd?.data?.manager_id && status == 3
    //             );
    //             return {
    //                 status: 400,
    //                 success: false,
    //                 msg: `BDE can't be deleted. BDE assigned to the Team Lead.`,
    //                 data: checkbd.data.manager_id,
    //             };
    //         }

    //         const updateStatus = await bdModel.updateOne(
    //             {
    //                 _id: checkbd.data._id,
    //             },
    //             {
    //                 status: status,
    //             }
    //         );
    //         const bdStatus =
    //             status == 1 ? "Activate" : status == 2 ? "Deactivate" : "Delete";
    //         return {
    //             status: 200,
    //             success: true,
    //             msg: `BDE ${bdStatus}d successfully.`,
    //             data: updateStatus,
    //         };
    //     } catch (error) {
    //         return {
    //             status: 500,
    //             success: false,
    //             msg: `Something went wrong when ${bdStatus} BDE.`,
    //             data: error,
    //         };
    //     }
    // };
}

module.exports = new ManagerBDService();
