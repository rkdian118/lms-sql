const { default: mongoose } = require("mongoose");
const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const managerModel = require("../../model/ManagerModel/managerModel");
const managerTargetModel = require("../../model/ManagerModel/managerTargetModel");
const loginsModel = require("../../model/loginsModel");
const { isBDManagerService } = require("./clusterBDService");
const moment = require('moment');
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");
const { updateCurrMonBDTarg, completeBDTargetService } = require("../BDService/bdTargService");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");

class ClusManTargtService {

  async getManagersTargetService(req) {
    const { page, limit, search } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const filtertarget = {};
    req?.user?._id ? filtertarget['cluster_head_id'] = req.user._id : "";
    req?.body?.manager_id ? filtertarget['manager_id'] = new mongoose.Types.ObjectId(req.body.manager_id) : "";
    req?.query?.targetYear ? filtertarget['target_year'] = req.query.targetYear : "";
    req?.query?.targetMonth ? filtertarget['target_month'] = req.query.targetMonth : "";

    const resultAggregate = managerTargetModel.aggregate([
      {
        $match: filtertarget,
        // {
        //   cluster_head_id: req.user._id,
        // },
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
        $project: {
          targets: 1,
          prev_month_target: 1,
          total_target: 1,
          completed_target: 1,
          remaining_target: 1,
          assigned_targets: 1,
          month_start_date: 1,
          target_month: 1,
          target_year: 1,
          status: 1,
          deleted: 1,
          cluster_head: {
            _id: "$clusterData._id",
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
            profile_pic: "$clusterData.profile_pic",
          },
          manager: {
            _id: "$managerData._id",
            emp_id: "$managerData.emp_id",
            name: "$managerData.name",
            email: "$managerData.email",
            designation: "$managerData.designation",
            profile_pic: "$managerData.profile_pic",
          },
        },
      },
    ]);
    const managerTarget = await managerTargetModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!managerTarget || managerTarget.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Team Lead targets not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Team Lead targets get successfully.",
      data: managerTarget,
    };
  }

  async getManagerTargetDetailService(req, manager_id, target_id) {
    // const { _id } = req.query;
    const targetDetail = await managerTargetModel
      .findOne(
        {
          $and: [
            { _id: target_id },
            { manager_id: manager_id },
            { cluster_head_id: req.user._id }
          ]
        },
        {
          cluster_head_id: 1,
          manager_id: 1,
          targets: 1,
          prev_month_target: 1,
          total_target: 1,
          completed_target: 1,
          remaining_target: 1,
          assigned_targets: 1,
          month_start_date: 1,
          target_month: 1,
          target_year: 1,
          status: 1,
          deleted: 1,
        }
      )
      .populate("cluster_head_id", "emp_id name email designation")
      .populate("manager_id", "emp_id name email designation")

    // return

    if (!targetDetail || targetDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Team Lead Target detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Team Lead Target detail get successfully.",
      data: targetDetail,
    };
  }

  async updateManagerTargetService(req) {
    try {
      const body = req.body;

      const managerTarget = await managerTargetModel.findOne({ _id: body.target_id });
      if (!managerTarget) {
        return {
          status: 400,
          success: false,
          msg: "Team Lead targets not found",
          data: managerTarget,
        };
      }

      let date = moment(); //"2023-07-19"
      if (date.toDate() == "Invalid Date") {
        return {
          status: 400,
          success: false,
          msg: "Date not found.",
          data: date.toString(),
        };
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
      let addTarg = body.targets - managerTarget.targets;

      if (managerTarget.target_month == currentMonth) {
        body?.targets !== "" ? (managerTarget.targets = body.targets) : "";
        managerTarget?.total_target !== "" ? (managerTarget.total_target = (body.targets + managerTarget.prev_month_target)) : "";
        managerTarget?.remaining_target !== "" ? (managerTarget.remaining_target = managerTarget.total_target - managerTarget.completed_target) : "";

        const updatemanagerTarget = await managerTarget.save();
        if (updatemanagerTarget) {
          const branchTarget = await branchTargetModel.findOne({ $and: [{ branch_id: updatemanagerTarget.branch_id }, { target_month: currentMonth }] });
          if (branchTarget) {
            branchTarget.assigned_targets = branchTarget.assigned_targets + addTarg;
            let updateBranchTarg = await branchTarget.save();
          }
        }

        return {
          status: 200,
          success: true,
          msg: "Current month Team Lead target updated successfully.",
          data: updatemanagerTarget,
        };
      } else if (managerTarget.target_month == previousMonth) {
        body?.targets !== '' ? (managerTarget.targets = body.targets) : "";
        managerTarget?.total_target !== "" ? (managerTarget.total_target = (body.targets + managerTarget.prev_month_target)) : "";
        managerTarget?.remaining_target !== "" ? (managerTarget.remaining_target = managerTarget.total_target - managerTarget.completed_target) : "";

        const updatemanagerTarget = await managerTarget.save();

        if (updatemanagerTarget) {
          const branchTarget = await branchTargetModel.findOne({ $and: [{ branch_id: updatemanagerTarget.branch_id }, { target_month: previousMonth }] });
          if (branchTarget) {
            branchTarget.assigned_targets = branchTarget.assigned_targets + addTarg;
            let updateBranchTarg = await branchTarget.save();
          }
        }

        let currMonManagerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: managerTarget.manager_id }, { target_month: currentMonth }] });

        if (currMonManagerTarg) {
          currMonManagerTarg?.prev_month_target !== "" ? (currMonManagerTarg.prev_month_target = (updatemanagerTarget.remaining_target)) : "";
          currMonManagerTarg?.total_target !== "" ? (currMonManagerTarg.total_target = (currMonManagerTarg.targets + currMonManagerTarg.prev_month_target)) : "";
          currMonManagerTarg?.remaining_target !== "" ? (currMonManagerTarg.remaining_target = currMonManagerTarg.total_target - currMonManagerTarg?.completed_target) : "";

          const updatecurrMonManagerTarg = await currMonManagerTarg.save();
        }
        return {
          status: 200,
          success: true,
          msg: "Previous month Team Lead target updated successfully.",
          data: updatemanagerTarget,
        };
      } else {
        return {
          status: 400,
          success: false,
          msg: "You only have permissions to update the target for the current month and previous month.",
          data: managerTarget,
        };
      }

    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Team Lead target service.",
        data: error,
      };
    }
  };

  async getBDsTargetsService(req) {
    const { page, limit, search } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const filtertarget = {};
    req?.user?._id ? filtertarget['cluster_head_id'] = req.user._id : "";
    req?.body?.manager_id ? filtertarget['manager_id'] = new mongoose.Types.ObjectId(req.body.manager_id) : "";
    req?.body?.cluster_lead_id ? filtertarget['cluster_lead_id'] = new mongoose.Types.ObjectId(req.body.cluster_lead_id) : "";
    req?.body?.bd_id ? filtertarget['bd_id'] = new mongoose.Types.ObjectId(req.body.bd_id) : "";
    req?.query?.targetYear ? filtertarget['target_year'] = req.query.targetYear : "";
    req?.query?.targetMonth ? filtertarget['target_month'] = req.query.targetMonth : "";

    const resultAggregate = bdTargetModel.aggregate([
      {
        $match: filtertarget,
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
        $project: {
          targets: 1,
          prev_month_target: 1,
          total_target: 1,
          completed_target: 1,
          remaining_target: 1,
          month_start_date: 1,
          target_month: 1,
          target_year: 1,
          status: 1,
          deleted: 1,
          cluster_head: {
            _id: "$clusterData._id",
            emp_id: "$clusterData.emp_id",
            name: "$clusterData.name",
            email: "$clusterData.email",
            designation: "$clusterData.designation",
            profile_pic: "$clusterData.profile_pic",
          },
          manager: {
            _id: "$managerData._id",
            emp_id: "$managerData.emp_id",
            name: "$managerData.name",
            email: "$managerData.email",
            designation: "$managerData.designation",
            profile_pic: "$managerData.profile_pic",
          },
          cluster_lead: {
            _id: "$clusterLeadData._id",
            emp_id: "$clusterLeadData.emp_id",
            name: "$clusterLeadData.name",
            email: "$clusterLeadData.email",
            designation: "$clusterLeadData.designation",
            profile_pic: "$clusterLeadData.profile_pic",
          },
          bd: {
            _id: "$bdData._id",
            emp_id: "$bdData.emp_id",
            name: "$bdData.name",
            email: "$bdData.email",
            designation: "$bdData.designation",
            profile_pic: "$bdData.profile_pic",
          },
        },
      },
    ]);
    const bdTarget = await bdTargetModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!bdTarget || bdTarget.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "BDE targets not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "BDE targets get successfully.",
      data: bdTarget,
    };
  }

  async updateBDTargetService(req) {
    try {
      const body = req.body;

      const bdTarget = await bdTargetModel.findOne({ _id: body.target_id });
      if (!bdTarget) {
        return {
          status: 400,
          success: false,
          msg: "BDE targets not found",
          data: bdTarget,
        };
      }

      let date = moment(); //"2023-07-19"
      if (date.toDate() == "Invalid Date") {
        return {
          status: 400,
          success: false,
          msg: "Date not found.",
          data: date.toString(),
        };
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
      let addTarg = body.targets - bdTarget.targets;

      if (bdTarget.target_month == currentMonth) {
        body?.targets !== '' ? (bdTarget.targets = body.targets) : "";
        bdTarget?.total_target !== "" ? (bdTarget.total_target = (body.targets + bdTarget.prev_month_target)) : "";
        bdTarget?.remaining_target !== "" ? (bdTarget.remaining_target = bdTarget.total_target - bdTarget.completed_target) : "";

        const updatebdTarget = await bdTarget.save();

        if (updatebdTarget) {
          const clusterLeadTarg = await clusterLeadTargetModel.findOne({ $and: [{ cluster_lead_id: updatebdTarget.cluster_lead_id }, { target_month: currentMonth }] });
          if (clusterLeadTarg) {
            clusterLeadTarg.assigned_targets = clusterLeadTarg.assigned_targets + addTarg;
            let updateclusterLeadTarg = await clusterLeadTarg.save();
          }

          const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updatebdTarget.manager_id }, { target_month: currentMonth }] });
          if (managerTarg) {
            managerTarg.assigned_targets = managerTarg.assigned_targets + addTarg;
            let updateManagerTarg = await managerTarg.save();
          }

          // const branchTarg = await branchTargetModel.findOne({ $and: [{ branch_id: managerTarg.branch_id }, { target_month: currentMonth }] });
          // if (branchTarg) {
          //   branchTarg.assigned_targets = branchTarg.assigned_targets + addTarg;
          //   let updatebranchTarg = await branchTarg.save();
          // }
        }

        return {
          status: 200,
          success: true,
          msg: "Current month BDE target updated successfully.",
          data: updatebdTarget,
        };
      } else if (bdTarget.target_month == previousMonth) {
        body.targets !== "" ? (bdTarget.targets = body.targets) : "";
        bdTarget?.total_target !== "" ? (bdTarget.total_target = (body.targets + bdTarget.prev_month_target)) : "";
        bdTarget?.remaining_target !== "" ? (bdTarget.remaining_target = bdTarget.total_target - bdTarget.completed_target) : "";

        const updatebdTarget = await bdTarget.save();
        let updateManagerTarg;
        let updateClusterLeadTarg;
        let updatebranchTarg;
        if (updatebdTarget) {
          const clusterLeadTarg = await clusterLeadTargetModel.findOne({ $and: [{ cluster_lead_id: updatebdTarget.cluster_lead_id }, { target_month: previousMonth }] });
          if (clusterLeadTarg) {
            clusterLeadTarg.assigned_targets = clusterLeadTarg.assigned_targets + addTarg;
            updateClusterLeadTarg = await clusterLeadTarg.save();
          }

          const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updatebdTarget.manager_id }, { target_month: previousMonth }] });
          if (managerTarg) {
            managerTarg.assigned_targets = managerTarg.assigned_targets + addTarg;
            updateManagerTarg = await managerTarg.save();
          }
          // const branchTarg = await branchTargetModel.findOne({ $and: [{ branch_id: managerTarg.branch_id }, { target_month: previousMonth }] });
          // if (branchTarg) {
          //   branchTarg.assigned_targets = branchTarg.assigned_targets + addTarg;
          //   updatebranchTarg = await branchTarg.save();
          // }
        }

        let currMonBDTarg = await bdTargetModel.findOne({ $and: [{ bd_id: bdTarget.bd_id }, { target_month: currentMonth }] });

        if (currMonBDTarg) {
          currMonBDTarg?.prev_month_target !== "" ? (currMonBDTarg.prev_month_target = (updatebdTarget.remaining_target)) : "";
          currMonBDTarg?.total_target !== "" ? (currMonBDTarg.total_target = (currMonBDTarg.targets + currMonBDTarg.prev_month_target)) : "";
          currMonBDTarg?.remaining_target !== "" ? (currMonBDTarg.remaining_target = currMonBDTarg.total_target - currMonBDTarg?.completed_target) : "";

          const updatecurrMonBDTarg = await currMonBDTarg.save();
        }

        // let currMonManagerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: currMonBDTarg.manager_id }, { target_month: currentMonth }] });

        // if (currMonManagerTarg) {
        //   currMonManagerTarg?.prev_month_target !== "" ? (currMonManagerTarg.prev_month_target = (updateManagerTarg.remaining_target)) : "";
        //   currMonManagerTarg?.total_target !== "" ? (currMonManagerTarg.total_target = (currMonManagerTarg.targets + currMonManagerTarg.prev_month_target)) : "";
        //   currMonManagerTarg?.remaining_target !== "" ? (currMonManagerTarg.remaining_target = currMonManagerTarg.total_target - currMonManagerTarg?.completed_target) : "";

        //   const updatecurrMonManagerTarg = await currMonManagerTarg.save();
        // }
        // let currMonbranchTarg = await branchTargetModel.findOne({ $and: [{ branch_id: currMonManagerTarg.branch_id }, { target_month: currentMonth }] });

        // if (currMonbranchTarg) {
        //   currMonbranchTarg?.prev_month_target !== "" ? (currMonbranchTarg.prev_month_target = (updatebranchTarg.remaining_target)) : "";
        //   currMonbranchTarg?.total_target !== "" ? (currMonbranchTarg.total_target = (currMonbranchTarg.targets + currMonbranchTarg.prev_month_target)) : "";
        //   currMonbranchTarg?.remaining_target !== "" ? (currMonbranchTarg.remaining_target = currMonbranchTarg.total_target - currMonbranchTarg?.completed_target) : "";

        //   const updatecurrMonbranchTarg = await currMonbranchTarg.save();
        // }
        return {
          status: 200,
          success: true,
          msg: "Previous month BDE target updated successfully.",
          data: updatebdTarget,
        };
      } else {
        return {
          status: 400,
          success: false,
          msg: "You only have permissions to update the target for the current month and previous month.",
          data: bdTarget,
        };
      }
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update BDE target service.",
        data: error,
      };
    }
  };

  async clusCompBDTargetService(req) {
    try {

      let { bd_id, target_id, complete_target } = req.body;
      let bdTarget = await bdTargetModel.findOne({ _id: target_id });
      if (!bdTarget) {
        return {
          status: 400,
          success: false,
          msg: "BDE targets not found",
          data: bdTarget,
        };
      }
      let date = moment();
      if (date.toDate() == "Invalid Date") {
        return {
          status: 400,
          success: false,
          msg: "Date not found.",
          data: date.toString(),
        };
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

      let currMonthBDTarget = await bdTargetModel.findOne({ $and: [{ bd_id: bd_id }, { target_month: currentMonth }] });
      if (currMonthBDTarget) {
        if (bdTarget.target_month == currMonthBDTarget.target_month) {
          let compTarget = await completeBDTargetService(bdTarget, complete_target);
          if (compTarget) {
            return compTarget;
          }
        } else if (bdTarget.target_month == previousMonth) {
          let compTarget = await completeBDTargetService(bdTarget, complete_target);
          if (compTarget?.success) {
            let updateCurrMontarg = await updateCurrMonBDTarg(currMonthBDTarget, compTarget.data);
            return updateCurrMontarg;
          } else {
            return compTarget;
          }
        } else {
          return {
            status: 400,
            success: false,
            msg: "You have only permission to complete the current month and previous month targets targets.",
            data: currMonthBDTarget,
          };
        }
      } else if (bdTarget.target_month == previousMonth) {

        const compTarget = await completeBDTargetService(bdTarget, complete_target);
        if (compTarget) {
          return compTarget;
        }

      } else {
        return {
          status: 400,
          success: false,
          msg: "You have only permission to complete the current month targets.",
          data: bdTarget,
        };
      }

    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Somethin went wrong when Complete BDE Target service.",
        data: error,
      };
    }
  };

  async assignManagerTargetService(req) {
    try {
      let { manager_id, newTarg = 0 } = req.body;
      let cluster_head_id = req.user._id;
      let date = moment("2023-05-04");
      if (date.toDate() == "Invalid Date") {
        return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Date not found", "succeeded": true, "ResponseData": date.toString() });
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


      const currMonthTarg = await managerTargetModel.findOne({ $and: [{ manager_id: new mongoose.Types.ObjectId(manager_id) }, { target_month: currentMonth }, { target_year: currentMonthYear }] });

      if (currMonthTarg) {
        // const updateTarg = newTarg - currTarg;
        // currMonthTarg?.assigned_targets ? currMonthTarg.assigned_targets = currMonthTarg.assigned_targets + updateTarg : currMonthTarg["assigned_targets"] = 0 + updateTarg

        // let saveTarg = await currMonthTarg.save();
        return {
          status: 200,
          success: true,
          msg: "Current month Team Lead targets already assigned.",
          data: currMonthTarg,
        };
      }
      let targets = newTarg || 0;
      let prev_month_target = 0;
      let total_target = 0;
      let completed_target = 0;
      let remaining_target = 0;
      let assigned_targets = 0; //newTarg;
      let target_month = currentMonth;
      let target_year = currentMonthYear;


      const preMonthTarg = await managerTargetModel.findOne({ $and: [{ manager_id: new mongoose.Types.ObjectId(manager_id) }, { target_month: previousMonth }, { target_year: previousMonthYear }] });

      if (preMonthTarg && preMonthTarg !== "") {
        targets = await newTarg;
        prev_month_target = await preMonthTarg.remaining_target;
        total_target = await targets + prev_month_target;
        completed_target = await completed_target;
        remaining_target = await total_target - completed_target;
      }


      let targetData = await managerTargetModel({
        manager_id: manager_id,
        cluster_head_id: cluster_head_id,
        targets: targets,
        prev_month_target: prev_month_target,
        total_target: total_target,
        completed_target: completed_target,
        remaining_target: remaining_target,
        assigned_targets: assigned_targets,
        target_month: target_month,
        target_year: target_year,
      })


      let currentTarget = await targetData.save();

      if (!currentTarget) {
        return {
          status: 400,
          success: false,
          msg: "Unable to add current month Team Lead targets.",
          data: currentTarget,
        };
      };
      return {
        status: 200,
        success: true,
        msg: "Current month Team Lead targets created successfully.",
        data: currentTarget,
      };
    } catch (error) {
      return {
        status: 500,
        success: true,
        msg: error, //"Assign Team Lead target service error.",
        data: error,
      };
    }
  }
}

module.exports = new ClusManTargtService()