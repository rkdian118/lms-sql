const moment = require('moment');
const managerTargetModel = require('../model/ManagerModel/managerTargetModel');
const managerModel = require('../model/ManagerModel/managerModel');
const bdModel = require('../model/BDModel/bdModel');
const bdTargetModel = require('../model/ManagerModel/bdTargetModel');
const branchModel = require('../model/AdminModel/branchModel');
const branchTargetModel = require('../model/AdminModel/branchTargetModel');
const { config } = require('dotenv')
const fs = require('fs');
const { scheduledTask } = require('../service/AdminService/adminTargService');
const clusterLeadModel = require('../model/ClusterLeadModel/clusterLeadModel');
const clusterLeadTargetModel = require('../model/ManagerModel/clusterLeadTargetModel');

// class CronHelper {

exports.generateBranchTarget = async (admin_id, currentDate) => {
    try {

        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : moment();
        let date = moment(date_of_month);
        if (date.toDate() == "Invalid Date") {
            // console.log("Date not found: ", date.toString());
        };
        let currentMonth = date.format('MMMM');
        let currentMonthYear = date.year();
        let currMonth = date.month();

        let preMonth = currMonth - 1;
        let previousMonthYear = currentMonthYear;

        if (preMonth < 0) {
            preMonth = 11;
            previousMonthYear -= 1;
        }
        let preMonthDate = moment([previousMonthYear, preMonth, 1]);
        let previousMonth = preMonthDate.format('MMMM');

        const branches = await branchModel.find({ status: { $ne: 3 } })
        if (branches && branches.length <= 0) {
            // console.log("branches not found: ", branches);
        }
        let totalUpdates = [];
        for (let branch of branches) {
            let targets = 0;
            let prev_month_target = 0;
            let total_target = 0;
            let completed_target = 0;
            let remaining_target = 0;
            let assigned_targets = 0;
            let month_start_date = date;
            let target_month = currentMonth;
            let target_year = currentMonthYear;

            let currentMonthTarget = await branchTargetModel.findOne({
                $and: [
                    { "branch_id": branch._id },
                    { "target_month": currentMonth },
                    { "target_year": currentMonthYear }
                ]
            });
            if (currentMonthTarget == null || currentMonthTarget == "") {
                let previousMonthTarget = await branchTargetModel.findOne({
                    $and: [
                        { "branch_id": branch._id },
                        { "target_month": previousMonth },
                        { "target_year": previousMonthYear }
                    ]
                });

                if (previousMonthTarget && previousMonthTarget !== "") {
                    targets = previousMonthTarget.targets;
                    prev_month_target = previousMonthTarget.remaining_target;
                    total_target = targets + prev_month_target;
                    completed_target = completed_target;
                    remaining_target = total_target - completed_target;
                }

                var targetData = {
                    branch_id: branch._id,
                    targets: targets,
                    prev_month_target: prev_month_target,
                    total_target: total_target,
                    completed_target: completed_target,
                    remaining_target: remaining_target,
                    assigned_targets: assigned_targets,
                    month_start_date: month_start_date,
                    target_month: target_month,
                    target_year: target_year,
                };
                await branch?.cluster_head_id ? targetData["cluster_head_id"] = branch.cluster_head_id : "";
                await admin_id && admin_id !== "" ? targetData["admin_id"] = admin_id : "";

                let branchTargetData = await branchTargetModel(targetData)
                let currentTarget = await branchTargetData.save();

                if (!currentTarget) {
                    // console.log("Unable to start month for branch target.: ", currentTarget);
                }
                totalUpdates.push(currentTarget);
            }
        }
        // console.log("Current month branch targets created successfully.: ", totalUpdates);
        return true;
    } catch (error) {
        // console.log("Cron handler error for branch targets.: ", error);
        return false
    }
}

exports.generateManagerTarget = async (admin_id, currentDate) => {
    try {
        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : moment();

        let date = moment(date_of_month)
        if (date.toDate() == "Invalid Date") {
            // console.log("Manager Target Date not found: ", date.toString());
            // return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Date not found", "succeeded": false, "ResponseData": date.toString() });
        }
        let currentMonth = date.format('MMMM');
        let currentMonthYear = date.year();
        let currMonth = date.month();

        let preMonth = currMonth - 1;
        let previousMonthYear = currentMonthYear

        if (preMonth < 0) {
            preMonth = 11;
            previousMonthYear -= 1;
        }
        let preMonthDate = moment([previousMonthYear, preMonth, 1]);
        let previousMonth = preMonthDate.format('MMMM');

        const managers = await managerModel.find({ status: { $ne: 3 } }).populate('cluster_head_id', 'branch_id name email designation');
        if (managers && managers.length <= 0) {
            // console.log("Team Leads not found: ", managers);
            // return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Team Leads not found", "succeeded": false, "ResponseData": managers });
        };
        let totalUpdates = [];
        for (let manager of managers) {
            let targets = 0;
            let prev_month_target = 0;
            let total_target = 0;
            let completed_target = 0;
            let remaining_target = 0;
            let assigned_targets = 0;
            let month_start_date = date;
            let target_month = currentMonth;
            let target_year = currentMonthYear;

            let currentMonthTarget = await managerTargetModel.findOne({
                $and: [
                    { "manager_id": manager._id },
                    { "target_month": currentMonth },
                    { "target_year": currentMonthYear }
                ]
            });
            if (currentMonthTarget == null || currentMonthTarget == "") {
                let previousMonthTarget = await managerTargetModel.findOne({
                    $and: [
                        { "manager_id": manager._id },
                        { "target_month": previousMonth },
                        { "target_year": previousMonthYear }
                    ]
                });

                if (previousMonthTarget && previousMonthTarget !== "") {
                    targets = previousMonthTarget.targets;
                    prev_month_target = previousMonthTarget.remaining_target;
                    total_target = targets + prev_month_target;
                    completed_target = completed_target;
                    remaining_target = total_target - completed_target;
                }

                var targetData = {
                    manager_id: manager._id,
                    targets: targets,
                    prev_month_target: prev_month_target,
                    total_target: total_target,
                    completed_target: completed_target,
                    remaining_target: remaining_target,
                    assigned_targets: assigned_targets,
                    month_start_date: month_start_date,
                    target_month: target_month,
                    target_year: target_year,
                };
                await manager?.cluster_head_id ? targetData["cluster_head_id"] = manager.cluster_head_id : "";
                await manager?.cluster_head_id?.branch_id ? targetData["branch_id"] = manager.cluster_head_id.branch_id : "";
                await admin_id && admin_id !== "" ? targetData["admin_id"] = admin_id : "";

                let managerTargetData = await managerTargetModel(targetData);

                let currentTarget = await managerTargetData.save();
                if (!currentTarget) {
                    // console.log("Unable to start month for manager target.: ", currentTarget);
                }
                totalUpdates.push(currentTarget);
            }
        }
        // console.log("Current month manager targets created successfully.: ", totalUpdates);
        return true;
    } catch (error) {
        // console.log("Cron handler error for manager targets.: ", error);
        return false
    }
}

exports.generateClusterLeadTarget = async (admin_id, currentDate) => {
    try {
        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : moment();

        let date = moment(date_of_month)
        if (date.toDate() == "Invalid Date") {
            // console.log("clusterLead Target Date not found: ", date.toString());
            // return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Date not found", "succeeded": false, "ResponseData": date.toString() });
        }
        let currentMonth = date.format('MMMM');
        let currentMonthYear = date.year();
        let currMonth = date.month();

        let preMonth = currMonth - 1;
        let previousMonthYear = currentMonthYear

        if (preMonth < 0) {
            preMonth = 11;
            previousMonthYear -= 1;
        }
        let preMonthDate = moment([previousMonthYear, preMonth, 1]);
        let previousMonth = preMonthDate.format('MMMM');

        const clusterLeads = await clusterLeadModel.find({ status: { $ne: 3 } }).populate('cluster_head_id', 'branch_id name email designation');
        if (clusterLeads && clusterLeads.length <= 0) {
            // console.log("Cluster Leads not found: ", clusterLeads);
            // return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Cluster Leads not found", "succeeded": false, "ResponseData": clusterLeads });
        };
        let totalUpdates = [];
        for (let clusterLead of clusterLeads) {
            let targets = 0;
            let prev_month_target = 0;
            let total_target = 0;
            let completed_target = 0;
            let remaining_target = 0;
            let assigned_targets = 0;
            let month_start_date = date;
            let target_month = currentMonth;
            let target_year = currentMonthYear;

            let currentMonthTarget = await clusterLeadTargetModel.findOne({
                $and: [
                    { "cluster_lead_id": clusterLead._id },
                    { "target_month": currentMonth },
                    { "target_year": currentMonthYear }
                ]
            });
            if (currentMonthTarget == null || currentMonthTarget == "") {
                let previousMonthTarget = await clusterLeadTargetModel.findOne({
                    $and: [
                        { "cluster_lead_id": clusterLead._id },
                        { "target_month": previousMonth },
                        { "target_year": previousMonthYear }
                    ]
                });

                if (previousMonthTarget && previousMonthTarget !== "") {
                    targets = previousMonthTarget.targets;
                    prev_month_target = previousMonthTarget.remaining_target;
                    total_target = targets + prev_month_target;
                    completed_target = completed_target;
                    remaining_target = total_target - completed_target;
                }

                var targetData = {
                    cluster_lead_id: clusterLead._id,
                    targets: targets,
                    prev_month_target: prev_month_target,
                    total_target: total_target,
                    completed_target: completed_target,
                    remaining_target: remaining_target,
                    assigned_targets: assigned_targets,
                    month_start_date: month_start_date,
                    target_month: target_month,
                    target_year: target_year,
                };
                await clusterLead?.cluster_head_id ? targetData["cluster_head_id"] = clusterLead.cluster_head_id : "";
                await clusterLead?.cluster_head_id?.branch_id ? targetData["branch_id"] = clusterLead.cluster_head_id.branch_id : "";
                await admin_id && admin_id !== "" ? targetData["admin_id"] = admin_id : "";

                let clusterLeadTargetData = await clusterLeadTargetModel(targetData);

                let currentTarget = await clusterLeadTargetData.save();
                if (!currentTarget) {
                    // console.log("Unable to start month for clusterLead target.: ", currentTarget);
                }
                totalUpdates.push(currentTarget);
            }
        }
        // console.log("Current month clusterLead targets created successfully.: ", totalUpdates);
        return true;
    } catch (error) {
        // console.log("Cron handler error for clusterLead targets.: ", error);
        return false
    }
}

exports.generateBDTarget = async (admin_id, currentDate, scheduledTaskProp) => {
    try {

        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : moment();
        let date = moment(date_of_month)
        if (date.toDate() == "Invalid Date") {
            // console.log("BD Target Date not found: ", date.toString());
        }
        let currentMonth = date.format('MMMM');
        let currentMonthYear = date.year();
        let currMonth = date.month();

        let preMonth = currMonth - 1;
        let previousMonthYear = currentMonthYear

        if (preMonth < 0) {
            preMonth = 11;
            previousMonthYear -= 1;
        }
        let preMonthDate = moment([previousMonthYear, preMonth, 1]);
        let previousMonth = preMonthDate.format('MMMM');
        const bds = await bdModel.find({ status: { $ne: 3 } }).populate('cluster_head_id', 'branch_id name email designation');
        if (bds && bds.length <= 0) {
            // console.log("Business Developers not found: ", bds);
        }

        let totalUpdates = [];
        for (let bd of bds) {
            let targets = 0;
            let prev_month_target = 0;
            let total_target = 0;
            let completed_target = 0;
            let remaining_target = 0;
            let month_start_date = date;
            let target_month = currentMonth;
            let target_year = currentMonthYear;

            let currentMonthTarget = await bdTargetModel.findOne({
                $and: [
                    { "bd_id": bd._id },
                    { "target_month": currentMonth },
                    { "target_year": currentMonthYear }
                ]
            });
            if (currentMonthTarget == null || currentMonthTarget == "") {
                let previousMonthTarget = await bdTargetModel.findOne({
                    $and: [
                        { "bd_id": bd._id },
                        { "target_month": previousMonth },
                        { "target_year": previousMonthYear }
                    ]
                });

                if (previousMonthTarget && previousMonthTarget !== "") {
                    targets = previousMonthTarget.targets;
                    prev_month_target = previousMonthTarget.remaining_target;
                    total_target = targets + prev_month_target;
                    completed_target = completed_target;
                    remaining_target = total_target - completed_target;
                }

                var targetData = {
                    bd_id: bd._id,
                    targets: targets,
                    prev_month_target: prev_month_target,
                    total_target: total_target,
                    completed_target: completed_target,
                    remaining_target: remaining_target,
                    month_start_date: month_start_date,
                    target_month: target_month,
                    target_year: target_year,
                };

                // await bd?.manager_id ? targetData["manager_id"] = bd.manager_id : "";
                await bd?.cluster_head_id ? targetData["cluster_head_id"] = bd.cluster_head_id : "";
                // await bd?.cluster_head_id?.branch_id ? targetData["branch_id"] = bd.cluster_head_id.branch_id : "";
                await bd?.cluster_lead_id ? targetData["cluster_lead_id"] = bd.cluster_head_id.cluster_lead_id : "";
                await admin_id && admin_id !== "" ? targetData["admin_id"] = admin_id : "";

                let bdTargetData = await bdTargetModel(targetData)

                let currentTarget = await bdTargetData.save();

                if (!currentTarget) {
                    // console.log("Unable to start month for BDE target.: ", currentTarget);
                }
                totalUpdates.push(currentTarget);
            }
        }
        // console.log("Current month BDE targets created successfully.: ", totalUpdates);

        let cronExpression = ``;
        let adminId = ``;
        let updateCurrDate = ``;
        // console.log("scheduledTaskProp: ", scheduledTaskProp);

        if (scheduledTaskProp && scheduledTaskProp?.taskId) {
            (scheduledTaskProp.taskId).stop();
            // console.log('Cron job stopped.: ', scheduledTaskProp);
            delete scheduledTaskProp['taskId'];
        } else {
            // console.log('No cron job is currently running.');
        }
        const envConfig = config();
        envConfig.parsed.CRONEXP = cronExpression;
        envConfig.parsed.ADMINID = adminId;
        envConfig.parsed.CURRDATE = updateCurrDate;

        const serializedEnv = await Object.keys(envConfig.parsed)
            .map(key => `${key}=${envConfig.parsed[key]}`)
            .join('\n');

        // Write the updated environment variables back to the .env file
        const updatefs = await fs.writeFileSync('.env', serializedEnv);
        return true;
    } catch (error) {
        // console.log("BD Targets Cron handler error: ", error);
        return false;
    }
}

// }

// module.exports = new CronHelper();




// PORT= 10003
// TEMP_KEY= temprorykeyforuservalidation
// PRIVATE_KEY= privatekeyforuservalidation
// CLUSTER_KEY= clusterkeyforuservalidation
// ADMIN_KEY= adminkeyforuserauthvalidation
// MANAGER_KEY=,managerkeyforuservalidation
// BUSINESS_KEY=businesskeyforbusinessdeveloperauthentication
// USER_KEY= secretkeyforuservalidationhkjghfgh
// ADMIN_KAYY= secretkeyforadminvalidationjhjbghdfdgf
// SECRET_KEY= secretkeyforpasswortvalidation
// DB_HOST=127.0.0.1
// DB_PORT=27017
// DB_URL=mongodb+srv://admin:admin@cluster0.u8gbr.mongodb.net
// DB_NAME=LMS
// DB_USER=root
// DB_PASSWORD=Root@123
// NODE_ENV= DEVELOPMENT