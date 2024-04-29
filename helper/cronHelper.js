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
const { v4: uuidv4 } = require("uuid");

// class CronHelper {

exports.generateBranchTarget = async (admin_id, currentDate) => {
    try {

        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : moment();
        let date = moment(date_of_month);
        if (date.toDate() == "Invalid Date") {
            // console.log(".................Date not found: ", date.toString());
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
            // console.log(".................branches not found: ", branches);
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
                    // console.log(".................Unable to start month for branch target.: ", currentTarget);
                }
                totalUpdates.push(currentTarget);
            }
        }
        // console.log(".................Current month branch targets created successfully.: ", totalUpdates);
        return true;
    } catch (error) {
        // console.log(".................Cron handler error for branch targets.: ", error);
        return false
    }
}

exports.generateManagerTarget = async (admin_id, currentDate) => {
    try {
        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : moment();

        let date = moment(date_of_month)
        if (date.toDate() == "Invalid Date") {
            // console.log(".................Manager Target Date not found: ", date.toString());
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
            // console.log(".................Team Leads not found: ", managers);
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
                    // console.log(".................Unable to start month for manager target.: ", currentTarget);
                }
                totalUpdates.push(currentTarget);
            }
        }
        // console.log(".................Current month manager targets created successfully.: ", totalUpdates);
        return true;
    } catch (error) {
        // console.log(".................Cron handler error for manager targets.: ", error);
        return false
    }
}

exports.generateClusterLeadTarget = async (admin_id, currentDate) => {
    try {
        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : moment();

        let date = moment(date_of_month)
        if (date.toDate() == "Invalid Date") {
            // console.log(".................clusterLead Target Date not found: ", date.toString());
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
            // console.log(".................Cluster Leads not found: ", clusterLeads);
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
                await clusterLead?.cluster_head_id ? targetData["cluster_head_id"] = clusterLead.cluster_head_id._id : "";
                await clusterLead?.cluster_head_id?.branch_id ? targetData["branch_id"] = clusterLead.cluster_head_id.branch_id : "";
                await admin_id && admin_id !== "" ? targetData["admin_id"] = admin_id : "";

                let clusterLeadTargetData = await clusterLeadTargetModel(targetData);

                let currentTarget = await clusterLeadTargetData.save();
                if (!currentTarget) {
                    // console.log(".................Unable to start month for clusterLead target.: ", currentTarget);
                }
                totalUpdates.push(currentTarget);
            }
        }
        // console.log(".................Current month clusterLead targets created successfully.: ", totalUpdates);
        return true;
    } catch (error) {
        // console.log(".................Cron handler error for clusterLead targets.: ", error);
        return false
    }
}

exports.generateBDTarget = async (admin_id, currentDate, scheduledTaskProp) => {
    try {
        let date_of_month = currentDate && currentDate !== "" ? new Date(currentDate) : new Date();
        let date = moment(date_of_month)
        if (date.toDate() == "Invalid Date") {
            console.log(".................BD Target Date not found: ", date.toString());
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
        let getbdquery = `SELECT 
        bd._id AS _id,
        bd.cluster_lead_id AS cluster_lead_id,
        (
            SELECT JSON_OBJECT(
                '_id',ch._id, 
                'branch_id',ch.branch_id, 
                'emp_id', ch.emp_id, 
                'name', ch.name, 
                'email', ch.email, 
                'designation', ch.designation
              )
            FROM clusters ch
            WHERE ch._id = bd.cluster_head_id
        ) AS cluster_head_id,
        bd.emp_id AS emp_id,
        bd.unique_id AS unique_id,
        bd.name AS name,
        bd.username AS username,
        bd.email AS email,
        bd.designation AS designation,
        bd.mobile AS mobile,
        bd.profile_pic AS profile_pic,
        bd.secret_key AS secret_key,
        bd.status AS status,
        bd.country_code AS country_code,
        bd.updatedAt AS updatedAt,
        bd.createdAt AS createdAt
        FROM lms.businesses bd
        WHERE bd.status NOT IN (2, 3);`
        // const bds = await bdModel.find({ status: { $ne: 3 } }).populate('cluster_head_id', 'branch_id name email designation');
        // const bds = await bdModel.find({ status: { $nin: [2, 3] } }).populate('cluster_head_id', 'branch_id name email designation');
        const [bds] = await pool.promise().execute(getbdquery, []);
        if (bds && bds.length <= 0) {
            // console.log(".................Business Developers not found: ", bds);
        }

        let totalUpdates = [];
        for (let bd of bds) {
            let targets = 0;
            let prev_month_target = 0;
            let total_target = 0;
            let completed_target = 0;
            let remaining_target = 0;
            let month_start_date = new Date(date_of_month);
            let target_month = currentMonth;
            let target_year = currentMonthYear;

            // let currentMonthTarget = await bdTargetModel.findOne({
            //     $and: [
            //         { "bd_id": bd._id },
            //         { "cluster_head_id": bd.cluster_head_id },
            //         { "target_month": currentMonth },
            //         { "target_year": currentMonthYear }
            //     ]
            // });
            let currentMonthTargetquery = `SELECT * 
                FROM bd_targets 
                WHERE bd_id = '${bd._id}' 
                AND cluster_head_id = '${bd.cluster_head_id._id}' 
                AND target_month = '${currentMonth}' 
                AND target_year = '${currentMonthYear}'; `
            let [currentMonthTarget] = await pool.promise().execute(currentMonthTargetquery, [])
            if (currentMonthTarget == null || currentMonthTarget == "") {
                // let previousMonthTarget = await bdTargetModel.findOne({
                //     $and: [
                //         { "bd_id": bd._id },
                //         { "cluster_head_id": bd.cluster_head_id },
                //         { "target_month": previousMonth },
                //         { "target_year": previousMonthYear }
                //     ]
                // });
                let previousMonthTargetquery = `SELECT * 
                    FROM bd_targets 
                    WHERE bd_id = '${bd._id}' 
                    AND cluster_head_id = '${bd.cluster_head_id._id}' 
                    AND target_month = '${previousMonth}' 
                    AND target_year = '${previousMonthYear}'; `
                let [[previousMonthTarget]] = await pool.promise().execute(previousMonthTargetquery, [])
                if (previousMonthTarget && previousMonthTarget !== "") { //previousMonthTarget !== "" // previousMonthTarget.length > 0
                    targets = previousMonthTarget.targets;
                    prev_month_target = target_month == "January" ? 0 : previousMonthTarget.remaining_target;
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
                    month_start_date: new Date(month_start_date),
                    target_month: target_month,
                    target_year: target_year,
                };
                // // await bd?.manager_id ? targetData["manager_id"] = bd.manager_id : "";
                // await bd?.cluster_head_id ? targetData["cluster_head_id"] = bd.cluster_head_id._id : "";
                // await bd?.cluster_head_id?.branch_id ? targetData["branch_id"] = bd.cluster_head_id.branch_id : "";
                // await bd?.cluster_lead_id ? targetData["cluster_lead_id"] = bd.cluster_lead_id : "";
                // await admin_id && admin_id !== "" ? targetData["admin_id"] = admin_id : "";
                // let bdTargetData = await bdTargetModel(targetData);
                // let currentTarget = await bdTargetData.save();

                // Construct the INSERT INTO query
                let insertQuery = `
                INSERT INTO bd_targets (_id, bd_id, targets, prev_month_target, total_target, completed_target, remaining_target, month_start_date, target_month, target_year, createdAt, updatedAt`;

                // Add optional fields if they exist
                if (bd && bd?.cluster_head_id) insertQuery += ', cluster_head_id';
                if (bd && bd?.cluster_head_id && bd.cluster_head_id.branch_id) insertQuery += ', branch_id';
                if (bd && bd?.cluster_lead_id) insertQuery += ', cluster_lead_id';
                if (admin_id && admin_id !== "") insertQuery += ', admin_id';

                insertQuery += `) VALUES (
                '${uuidv4()}',
                '${targetData.bd_id}',
                '${targetData.targets}',
                '${targetData.prev_month_target}',
                '${targetData.total_target}',
                '${targetData.completed_target}',
                '${targetData.remaining_target}',
                '${new Date(targetData.month_start_date).toISOString().slice(0, 19).replace('T', ' ')}',
                '${targetData.target_month}',
                '${targetData.target_year}',
                '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
                '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;

                // Add optional values if they exist
                if (bd && bd.cluster_head_id) insertQuery += `, '${bd.cluster_head_id._id}'`;
                if (bd && bd.cluster_head_id && bd.cluster_head_id.branch_id) insertQuery += `, '${bd.cluster_head_id.branch_id}'`;
                if (bd && bd.cluster_lead_id) insertQuery += `, '${bd.cluster_lead_id}'`;
                if (admin_id && admin_id !== "") insertQuery += `, '${admin_id}'`;

                insertQuery += ')';

                // Execute the INSERT INTO query
                let currentTarget = await pool.promise().execute(insertQuery);
                let [[getCurrentTarget]] = await pool.promise().execute(`SELECT * 
                FROM bd_targets 
                WHERE bd_id = '${targetData.bd_id}' 
                AND cluster_head_id = '${bd.cluster_head_id._id}' 
                AND target_month = '${targetData.target_month}' 
                AND target_year = '${targetData.target_year}'; `);


                if (!getCurrentTarget) {
                    console.log(".................Unable to start month for BDE target.: ", currentTarget);
                } else {
                    // Cluster Lead Target update.
                    let cltargets = getCurrentTarget.targets;
                    let clprev_month_target = getCurrentTarget.prev_month_target;
                    let cltotal_target = getCurrentTarget.total_target;
                    let clcompleted_target = getCurrentTarget.completed_target;
                    let clremaining_target = getCurrentTarget.remaining_target;
                    let clmonth_start_date = getCurrentTarget.month_start_date;
                    let cltarget_month = getCurrentTarget.target_month;
                    let cltarget_year = getCurrentTarget.target_year;

                    // let currentMonthCLTarget = await clusterLeadTargetModel.findOne({
                    //     $and: [{ "cluster_lead_id": currentTarget.cluster_lead_id },
                    //         { "cluster_head_id": currentTarget.cluster_head_id },
                    //         { "target_month": target_month },
                    //         { "target_year": target_year }]});
                    // console.log(".................currentMonthCLTarget: ", currentMonthCLTarget);
                    let currentMonthCLTargetquery = `SELECT * 
                    FROM lms.cluster_lead_targets 
                    WHERE cluster_lead_id = '${getCurrentTarget.cluster_lead_id}' 
                    AND cluster_head_id = '${getCurrentTarget.cluster_head_id}' 
                    AND target_month = '${target_month}' 
                    AND target_year = '${target_year}'; `
                    let [currentMonthCLTarget] = await pool.promise().execute(currentMonthCLTargetquery, [])
                    
                    if (currentMonthCLTarget.length > 0) {

                        // currentMonthCLTarget.targets = currentMonthCLTarget.targets + currentTarget.targets;
                        // currentMonthCLTarget.prev_month_target = currentMonthCLTarget.prev_month_target + currentTarget.prev_month_target;
                        // currentMonthCLTarget.total_target = currentMonthCLTarget.targets + currentMonthCLTarget.prev_month_target;
                        // currentMonthCLTarget.completed_target = currentMonthCLTarget.completed_target + currentTarget.completed_target;
                        // currentMonthCLTarget.remaining_target = currentMonthCLTarget.total_target - currentMonthCLTarget.completed_target;
                        // let clTarg = await currentMonthCLTarget.save();
                        // If the target exists, update the values
                        let updateQuery = `
                        UPDATE lms.cluster_lead_targets
                        SET targets = targets + ${cltargets},
                            prev_month_target = prev_month_target + ${clprev_month_target},
                            total_target = targets + prev_month_target,
                            completed_target = completed_target + ${clcompleted_target},
                            remaining_target = total_target - completed_target,
                            updatedAt = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                        WHERE cluster_lead_id = '${getCurrentTarget.cluster_lead_id}'
                        AND cluster_head_id = '${getCurrentTarget.cluster_head_id}'
                        AND target_month = '${target_month}'
                        AND target_year = '${target_year}';
                        `;

                    let updatecltarget = await pool.promise().execute(updateQuery);
                    } else {
                        var cltargetData = {
                            cluster_lead_id: getCurrentTarget.cluster_lead_id,
                            targets: cltargets,
                            prev_month_target: clprev_month_target,
                            total_target: cltotal_target,
                            completed_target: clcompleted_target,
                            remaining_target: clremaining_target,
                            // assigned_targets: assigned_targets,
                            month_start_date: clmonth_start_date,
                            target_month: cltarget_month,
                            target_year: cltarget_year,
                        };
                        // await currentTarget?.cluster_head_id ? cltargetData["cluster_head_id"] = currentTarget.cluster_head_id : "";
                        // await currentTarget?.branch_id ? cltargetData["branch_id"] = currentTarget.branch_id : "";
                        // await admin_id && admin_id !== "" ? cltargetData["admin_id"] = admin_id : "";

                        // let clTargetDatasave = await clusterLeadTargetModel(cltargetData)

                        // let clcurrentTarget = await clTargetDatasave.save();

                        let clInsertQuery = `
                        INSERT INTO lms.cluster_lead_targets (_id, cluster_lead_id, targets, prev_month_target, total_target, completed_target, remaining_target, month_start_date, target_month, target_year, createdAt, updatedAt`;

                        // Add optional fields if they exist
                        if (getCurrentTarget && getCurrentTarget?.cluster_head_id) clInsertQuery += ', cluster_head_id';
                        if (getCurrentTarget && getCurrentTarget?.branch_id) clInsertQuery += ', branch_id';
                        if (admin_id && admin_id !== "") clInsertQuery += ', admin_id';

                        clInsertQuery += `) VALUES (
                        '${uuidv4()}',
                        '${cltargetData.cluster_lead_id}',
                        '${cltargetData.targets}',
                        '${cltargetData.prev_month_target}',
                        '${cltargetData.total_target}',
                        '${cltargetData.completed_target}',
                        '${cltargetData.remaining_target}',
                        '${new Date(cltargetData.month_start_date).toISOString().slice(0, 19).replace('T', ' ')}',
                        '${cltargetData.target_month}',
                        '${cltargetData.target_year}',
                        '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
                        '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;

                        // Add optional values if they exist
                        if (getCurrentTarget && getCurrentTarget.cluster_head_id) clInsertQuery += `, '${getCurrentTarget.cluster_head_id}'`;
                        if (getCurrentTarget && getCurrentTarget?.branch_id) clInsertQuery += `, '${getCurrentTarget?.branch_id}'`;
                        if (admin_id && admin_id !== "") clInsertQuery += `, '${admin_id}'`;

                        clInsertQuery += ')';

                        // Execute the INSERT INTO query
                        let clCurrentTarget = await pool.promise().execute(clInsertQuery);
                    }

                    /// Branch Target Update.
                    let branchtargets = getCurrentTarget.targets;
                    let branchprev_month_target = getCurrentTarget.prev_month_target;
                    let branchtotal_target = getCurrentTarget.total_target;
                    let branchcompleted_target = getCurrentTarget.completed_target;
                    let branchremaining_target = getCurrentTarget.remaining_target;
                    let branchmonth_start_date = getCurrentTarget.month_start_date;
                    let branchtarget_month = getCurrentTarget.target_month;
                    let branchtarget_year = getCurrentTarget.target_year;

                    // let currentMonthBranchTarget = await branchTargetModel.findOne({
                    //     $and: [
                    //         { "branch_id": currentTarget.branch_id },
                    //         { "target_month": currentTarget.target_month },
                    //         { "target_year": currentTarget.target_year }
                    //     ]
                    // });
                    let currentMonthBranchTargetquery = `SELECT * 
                    FROM lms.branch_targets 
                    WHERE branch_id = '${getCurrentTarget.branch_id}' 
                    AND target_month = '${getCurrentTarget.target_month}' 
                    AND target_year = '${getCurrentTarget.target_year}'; `
                    let [currentMonthBranchTarget] = await pool.promise().execute(currentMonthBranchTargetquery, [])

                    if (currentMonthBranchTarget.length > 0) {
                        // currentMonthBranchTarget.targets = currentMonthBranchTarget.targets + currentTarget.targets;
                        // currentMonthBranchTarget.prev_month_target = currentMonthBranchTarget.prev_month_target + currentTarget.prev_month_target;
                        // currentMonthBranchTarget.total_target = currentMonthBranchTarget.targets + currentMonthBranchTarget.prev_month_target;
                        // currentMonthBranchTarget.completed_target = currentMonthBranchTarget.completed_target + currentTarget.completed_target;
                        // currentMonthBranchTarget.remaining_target = currentMonthBranchTarget.total_target - currentMonthBranchTarget.completed_target;
                        // let branchTarg = await currentMonthBranchTarget.save();

                        let branchupdateQuery = `
                        UPDATE lms.branch_targets
                        SET targets = targets + ${branchtargets},
                            prev_month_target = prev_month_target + ${branchprev_month_target},
                            total_target = targets + prev_month_target,
                            completed_target = completed_target + ${branchcompleted_target},
                            remaining_target = total_target - completed_target,
                            updatedAt = '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
                            WHERE branch_id = '${getCurrentTarget.branch_id}'
                        AND target_month = '${target_month}'
                        AND target_year = '${target_year}';
                        `;

                    let branchupdateTerg = await pool.promise().execute(branchupdateQuery);
                    } else {
                        var branchtargetData = {
                            branch_id: getCurrentTarget.branch_id,
                            targets: branchtargets,
                            prev_month_target: branchprev_month_target,
                            total_target: branchtotal_target,
                            completed_target: branchcompleted_target,
                            remaining_target: branchremaining_target,
                            // assigned_targets: assigned_targets,
                            month_start_date: branchmonth_start_date,
                            target_month: branchtarget_month,
                            target_year: branchtarget_year,
                        };
                        await getCurrentTarget?.branch_id ? branchtargetData["branch_id"] = getCurrentTarget.branch_id : "";
                        await admin_id && admin_id !== "" ? branchtargetData["admin_id"] = admin_id : "";

                        // let branchTargetDatasave = await branchTargetModel(branchtargetData)

                        // let branchcurrentTarget = await branchTargetDatasave.save();

                        let branchInsertQuery = `
                        INSERT INTO lms.branch_targets (_id, branch_id, targets, prev_month_target, total_target, completed_target, remaining_target, month_start_date, target_month, target_year, createdAt, updatedAt`;

                        // Add optional fields if they exist
                        if (getCurrentTarget && getCurrentTarget?.cluster_head_id) branchInsertQuery += ', cluster_head_id';
                        if (admin_id && admin_id !== "") branchInsertQuery += ', admin_id';

                        branchInsertQuery += `) VALUES (
                        '${uuidv4()}',
                        '${branchtargetData.branch_id}',
                        '${branchtargetData.targets}',
                        '${branchtargetData.prev_month_target}',
                        '${branchtargetData.total_target}',
                        '${branchtargetData.completed_target}',
                        '${branchtargetData.remaining_target}',
                        '${new Date(branchtargetData.month_start_date).toISOString().slice(0, 19).replace('T', ' ')}',
                        '${branchtargetData.target_month}',
                        '${branchtargetData.target_year}',
                        '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
                        '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;

                        // Add optional values if they exist
                        if (getCurrentTarget && getCurrentTarget.cluster_head_id) branchInsertQuery += `, '${getCurrentTarget.cluster_head_id}'`;
                        if (admin_id && admin_id !== "") branchInsertQuery += `, '${admin_id}'`;

                        branchInsertQuery += ')';

                        // Execute the INSERT INTO query
                        let branchCurrentTarget = await pool.promise().execute(branchInsertQuery);
                    }

                }
                totalUpdates.push(getCurrentTarget);
            }
            // break;
        }
        // console.log(".................Current month BDE targets created successfully.: ", totalUpdates);

        let cronExpression = ``;
        let adminId = ``;
        let updateCurrDate = ``;
        // console.log(".................scheduledTaskProp: ", scheduledTaskProp);

        if (scheduledTaskProp && scheduledTaskProp?.taskId) {
            (scheduledTaskProp.taskId).stop();
            // console.log('.................Cron job stopped.: ', scheduledTaskProp);
            delete scheduledTaskProp['taskId'];
        } else {
            console.log('.................No cron job is currently running.');
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
        console.log(".................BD Targets Cron handler error: ", error);
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