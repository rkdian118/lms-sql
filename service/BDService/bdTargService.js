const managerTargetModel = require("../../model/ManagerModel/managerTargetModel");
const moment = require("moment");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");
const { default: mongoose } = require("mongoose");
const bdModel = require("../../model/BDModel/bdModel");

class BDTargetService {
  async getTargetsService(req) {
    try {
      const { page, limit, search, targetYear, targetMonth } = req.query;
      const { selectedMonth, selectedYear } = req.body;
      const options = {
        page: page ? page : 1, // Page number
        limit: limit ? limit : 10, // Number of documents per page
      };

      // Constructing the WHERE clause conditions
      let whereConditions = [];

      // Add filtering conditions based on selected month
      if (selectedMonth && selectedMonth.length > 0) {
        whereConditions.push(
          `bd_targets.target_month IN (${selectedMonth
            .map((month) => `'${month}'`)
            .join(", ")})`
        );
      }

      // Add filtering conditions based on selected year
      if (selectedYear) {
        whereConditions.push(`bd_targets.target_year = '${selectedYear}'`);
      } else {
        whereConditions.push(`bd_targets.target_year = YEAR(CURRENT_DATE())`); // Current year if not provided
      }

      // Add filtering conditions based on user ID
      if (req?.user?._id) {
        whereConditions.push(`bd_targets.bd_id = '${req.user._id}'`);
      }

      // Constructing the complete WHERE clause
      let whereClause =
        whereConditions.length > 0
          ? "WHERE " + whereConditions.join(" AND ")
          : "";

      console.log("whereClause: ", whereClause);
      // Main SQL query
      let mainQuery = `
                      SELECT
                          bd._id AS _id,
                          bd.cluster_head_id AS cluster_head_id,
                          bd.name AS name,
                          bd.email AS email,
                          branches.branch_name AS branch_name,
                          bd.designation AS designation
                      FROM 
                          businesses bd
                          LEFT JOIN 
                               clusters ON bd.cluster_head_id = clusters._id
                      LEFT JOIN 
                          branches ON clusters.branch_id = branches._id
                     WHERE bd._id = ? `;

      let [[bdData]] = await pool
        .promise()
        .execute(mainQuery, [String(req.user._id)]);

      let mainQueryTarget = `
      SELECT * 
      FROM 
         bd_targets
      ${whereClause} ORDER BY month_start_date ASC   `;

      let [targets] = await pool.promise().execute(mainQueryTarget);
      // console.log("targets: ", bdData, targets);

      const data = [{
        ...bdData,
        targData: targets,
      }];
      // let filterTargetYear = [];
      // let filterTargetMonth = [];
      // let filterBDs = [];
      // let filterCL = [];

      // selectedYear
      //   ? filterTargetYear.push({ "bdTargData.target_year": selectedYear })
      //   : filterTargetYear.push({
      //       "bdTargData.target_year": `${new Date().getFullYear()}`,
      //     });
      // selectedMonth && selectedMonth.length > 0
      //   ? selectedMonth.forEach((item) => {
      //       filterTargetMonth.push({ "bdTargData.target_month": item });
      //     })
      //   : "";
      // // selectedBDE && selectedBDE.length > 0 ? selectedBDE.forEach((bd) => { filterBDs.push({ _id: new mongoose.Types.ObjectId(bd) }) }) : filterBDs.push({ cluster_lead_id: req.user._id });

      // let filterTarg = [];
      // filterTargetMonth && filterTargetMonth.length > 0
      //   ? filterTarg.push({ $or: filterTargetMonth })
      //   : "";
      // filterTargetYear && filterTargetYear.length > 0
      //   ? filterTarg.push({ $or: filterTargetYear })
      //   : "";
      // req?.user?._id
      //   ? filterTarg.push({
      //       "bdTargData.bd_id": new mongoose.Types.ObjectId(req?.user?._id),
      //     })
      //   : "";

      // let targets = await bdModel.aggregate([
      //   // { $match: { $or: filterBDs } },
      //   {
      //     $lookup: {
      //       from: "bd_targets",
      //       localField: "_id",
      //       foreignField: "bd_id",
      //       as: "bdTargData",
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$bdTargData",
      //       preserveNullAndEmptyArrays: true,
      //     },
      //   },
      //   { $match: { $and: filterTarg } },
      //   {
      //     $lookup: {
      //       from: "branches",
      //       localField: "bdTargData.branch_id",
      //       foreignField: "_id",
      //       as: "branchData",
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$branchData",
      //       preserveNullAndEmptyArrays: true,
      //     },
      //   },
      //   { $sort: { "bdTargData.month_start_date": 1 } },
      //   {
      //     $group: {
      //       _id: {
      //         _id: "$_id",
      //         cluster_head_id: "$bdTargData.cluster_head_id",
      //       },
      //       name: { $first: "$name" },
      //       email: { $first: "$email" },
      //       designation: { $first: "$designation" },
      //       branch_name: { $first: "$branchData.branch_name" },
      //       targData: { $push: "$bdTargData" },
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 1,
      //       // emp_id: "$_id",
      //       name: 1,
      //       email: 1,
      //       branch_name: 1,
      //       designation: 1,
      //       targData: 1,
      //     },
      //   },
      // ]);

      return {
        status: 200,
        success: true,
        msg: "BDE targets get successfully.",
        data: data,
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

  completeBDTargetService = async (bdTarget, complete_target) => {
    try {
      let [[clusterLeadTarg]] = await pool
        .promise()
        .execute(
          `select * from cluster_lead_targets where cluster_lead_id = ? AND target_month = ? AND target_year = ? limit 1`,
          [
            bdTarget.cluster_lead_id,
            bdTarget.target_month,
            bdTarget.target_year,
          ]
        );
      if (!clusterLeadTarg) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead targets not found.",
          data: clusterLeadTarg,
        };
      }

      //Branch Target.
      let [[branchTarg]] = await pool
        .promise()
        .execute(
          `select * from branch_targets where branch_id = ? AND target_month = ? AND target_year = ? limit 1`,
          [
            clusterLeadTarg.branch_id,
            bdTarget.target_month,
            bdTarget.target_year,
          ]
        );
      if (!branchTarg) {
        return {
          status: 400,
          success: false,
          msg: "Branch targets not found.",
          data: branchTarg,
        };
      }

      const [[bdTargetData]] = await pool
        .promise()
        .execute(`select * from bd_targets WHERE _id = ?`, [bdTarget._id]);
      const [updatebdTarget] = await pool
        .promise()
        .execute(
          `update bd_targets set completed_target = ?, remaining_target = ? WHERE _id = ?`,
          [
            Number(bdTargetData.completed_target) + Number(complete_target),
            Number(bdTargetData.total_target) -
              (Number(bdTargetData.completed_target) + Number(complete_target)),
            bdTarget._id,
          ]
        );

      if (!updatebdTarget) {
        return {
          status: 400,
          success: false,
          msg: "BDE targets not updated.",
          data: updatebdTarget,
        };
      }

      //Complete TeamLead Target.

      const [[clusterLeadTargs]] = await pool
        .promise()
        .execute(`select * from cluster_lead_targets WHERE _id = ?`, [
          bdTarget.cluster_lead_id,
        ]);
      const [updateclusterLeadTarg] = await pool
        .promise()
        .execute(
          `update cluster_lead_targets set completed_target = ?, remaining_target = ? WHERE cluster_lead_id = ?`,
          [
            Number(clusterLeadTargs.completed_target) + Number(complete_target),
            Number(clusterLeadTargs.total_target) -
              (Number(clusterLeadTargs.completed_target) +
                Number(complete_target)),
            bdTarget.cluster_lead_id,
          ]
        );
      if (!updateclusterLeadTarg) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead targets not updated.",
          data: updateclusterLeadTarg,
        };
      }

      const [[branchTargs]] = await pool
        .promise()
        .execute(`select * from cluster_lead_targets WHERE _id = ?`, [
          bdTarget.cluster_lead_id,
        ]);
      const [updatebranchTarg] = await pool
        .promise()
        .execute(
          `update cluster_lead_targets set completed_target = ?, remaining_target = ? WHERE branch_id = ?`,
          [
            Number(branchTargs.completed_target) + Number(complete_target),
            Number(branchTargs.total_target) -
              (Number(branchTargs.completed_target) + Number(complete_target)),
            bdTarget.branch_id,
          ]
        );

      if (!updatebranchTarg) {
        return {
          status: 400,
          success: false,
          msg: "Branch targets not updated.",
          data: updatebranchTarg,
        };
      }

      return {
        status: 200,
        success: true,
        msg: "BDE completed target successfully.",
        data: updatebdTarget,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Complete BDE Target service.",
        data: error,
      };
    }
  };

  updateCurrMonBDTarg = async (currMonBDTarg, PreMonBDTarg) => {
    try {
      //BDE Target.
      // Cluster Lead Target
      let prevMonClusterLeadTarg = await clusterLeadTargetModel.findOne({
        $and: [
          { cluster_lead_id: PreMonBDTarg.cluster_lead_id },
          { target_month: PreMonBDTarg.target_month },
        ],
      });
      if (!prevMonClusterLeadTarg) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead previous month targets not found.",
          data: prevMonClusterLeadTarg,
        };
      }
      // ClusterLead Target
      let currMonClusterLeadTarg = await clusterLeadTargetModel.findOne({
        $and: [
          { cluster_lead_id: currMonBDTarg.cluster_lead_id },
          { target_month: currMonBDTarg.target_month },
        ],
      });
      if (!currMonClusterLeadTarg) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead current month targets not found.",
          data: currMonClusterLeadTarg,
        };
      }

      // let prevMonManagerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: PreMonBDTarg.manager_id }, { target_month: PreMonBDTarg.target_month }] });
      // if (!prevMonManagerTarg) {
      //     return {
      //         status: 400,
      //         success: false,
      //         msg: "Team Lead previous month targets not found.",
      //         data: prevMonManagerTarg,
      //     };
      // }

      // let currMonManagerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: currMonBDTarg.manager_id }, { target_month: currMonBDTarg.target_month }] });
      // if (!currMonManagerTarg) {
      //     return {
      //         status: 400,
      //         success: false,
      //         msg: "Team Lead current month targets not found.",
      //         data: currMonManagerTarg,
      //     };
      // }

      //Branch Target.
      let prevMonBranchTarg = await branchTargetModel.findOne({
        $and: [
          { branch_id: prevMonClusterLeadTarg.branch_id },
          { target_month: prevMonClusterLeadTarg.target_month },
        ],
      });
      if (!prevMonBranchTarg) {
        return {
          status: 400,
          success: false,
          msg: "Branch previous month targets not found.",
          data: prevMonBranchTarg,
        };
      }

      let currMonBranchTarg = await branchTargetModel.findOne({
        $and: [
          { branch_id: currMonClusterLeadTarg.branch_id },
          { target_month: currMonClusterLeadTarg.target_month },
        ],
      });
      if (!currMonBranchTarg) {
        return {
          status: 400,
          success: false,
          msg: "Branch current month targets not found.",
          data: currMonBranchTarg,
        };
      }

      //Complete BDE Target.
      currMonBDTarg?.prev_month_target !== ""
        ? (currMonBDTarg.prev_month_target = PreMonBDTarg.remaining_target)
        : "";
      currMonBDTarg?.total_target !== ""
        ? (currMonBDTarg.total_target =
            currMonBDTarg.targets + currMonBDTarg.prev_month_target)
        : "";
      currMonBDTarg?.remaining_target !== ""
        ? (currMonBDTarg.remaining_target =
            currMonBDTarg.total_target - currMonBDTarg.completed_target)
        : "";

      let updatebdTarget = await currMonBDTarg.save();

      if (!updatebdTarget) {
        return {
          status: 400,
          success: false,
          msg: "BDE current month targets not updated.",
          data: updatebdTarget,
        };
      }

      //Complete ClusterLead Target.
      currMonClusterLeadTarg?.prev_month_target !== ""
        ? (currMonClusterLeadTarg.prev_month_target =
            prevMonClusterLeadTarg.remaining_target)
        : "";
      currMonClusterLeadTarg?.total_target !== ""
        ? (currMonClusterLeadTarg.total_target =
            currMonClusterLeadTarg.targets +
            currMonClusterLeadTarg.prev_month_target)
        : "";
      currMonClusterLeadTarg?.remaining_target !== ""
        ? (currMonClusterLeadTarg.remaining_target =
            currMonClusterLeadTarg.total_target -
            currMonClusterLeadTarg.completed_target)
        : "";

      let updateClusterLeadTarg = await currMonClusterLeadTarg.save();
      if (!updateClusterLeadTarg) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead current month targets not updated.",
          data: updateClusterLeadTarg,
        };
      }

      //Complete TeamLead Target.
      // currMonManagerTarg?.prev_month_target !== "" ? (currMonManagerTarg.prev_month_target = (prevMonManagerTarg.remaining_target)) : "";
      // currMonManagerTarg?.total_target !== "" ? (currMonManagerTarg.total_target = (currMonManagerTarg.targets + currMonManagerTarg.prev_month_target)) : "";
      // currMonManagerTarg?.remaining_target !== "" ? (currMonManagerTarg.remaining_target = currMonManagerTarg.total_target - currMonManagerTarg.completed_target) : "";

      // let updatemanagerTarg = await currMonManagerTarg.save();
      // if (!updatemanagerTarg) {
      //     return {
      //         status: 400,
      //         success: false,
      //         msg: "Team Lead current month targets not updated.",
      //         data: updatemanagerTarg,
      //     };
      // }

      //Complete Branch Target
      currMonBranchTarg?.prev_month_target !== ""
        ? (currMonBranchTarg.prev_month_target =
            prevMonBranchTarg.remaining_target)
        : "";
      currMonBranchTarg?.total_target !== ""
        ? (currMonBranchTarg.total_target =
            currMonBranchTarg.targets + currMonBranchTarg.prev_month_target)
        : "";
      currMonBranchTarg?.remaining_target !== ""
        ? (currMonBranchTarg.remaining_target =
            currMonBranchTarg.total_target - currMonBranchTarg.completed_target)
        : "";

      let updatebranchTarg = await currMonBranchTarg.save();
      if (!updatebranchTarg) {
        return {
          status: 400,
          success: false,
          msg: "Branch current month targets not updated.",
          data: updatebranchTarg,
        };
      }
      // }
      // }
      // }

      // }
      return {
        status: 200,
        success: true,
        msg: "BDE previous month targets Achived successfully.",
        data: PreMonBDTarg,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Achived BDE Target service.",
        data: error,
      };
    }
  };
}

module.exports = new BDTargetService();
