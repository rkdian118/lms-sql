const { default: mongoose } = require("mongoose");
const helperFunctions = require("../../helper/helperFun");
const adminModel = require("../../model/AdminModel/adminModel");
const bdModel = require("../../model/BDModel/bdModel");
const clusterModel = require("../../model/ClusterModel/clusterModel");
const managerModel = require("../../model/ManagerModel/managerModel");
const managerTargetModel = require("../../model/ManagerModel/managerTargetModel");
const loginsModel = require("../../model/loginsModel");
// const { isBDManagerService } = require("./clusterBDService");
const moment = require('moment');
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const { assignManagerTargetService } = require("../ClusterService/clusManTargService");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");
const { completeBDTargetService, updateCurrMonBDTarg } = require("../BDService/bdTargService");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");

class ManCLTargtService {

  async manGetCLsTargetService(req) {
    const { page, limit, search } = req.query;
    const options = {
      page: page ? page : 1, // Page number
      limit: limit ? limit : 10, // Number of documents per page
    };

    const filtertarget = {};

    req?.user?._id ? filtertarget['manager_id'] = req.user._id : "";
    req?.body?.cluster_lead_id ? filtertarget['cluster_lead_id'] = req?.body?.cluster_lead_id : "";
    // req?.body?.bd_id ? filtertarget['bd_id'] = new mongoose.Types.ObjectId(req.body.bd_id) : "";
    req?.query?.targetYear ? filtertarget['target_year'] = req.query.targetYear : "";
    req?.query?.targetMonth ? filtertarget['target_month'] = req.query.targetMonth : "";

    const resultAggregate = clusterLeadTargetModel.aggregate([
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
          localField: "cluster_lead",
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
      // {
      //   $lookup: {
      //     from: "businesses",
      //     localField: "bd_id",
      //     foreignField: "_id",
      //     as: "bdData",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$bdData",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      // { $sort: { "$clusterData.name": 1 } },
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
          // bd: {
          //   _id: "$bdData._id",
          //   emp_id: "$bdData.emp_id",
          //   name: "$bdData.name",
          //   email: "$bdData.email",
          //   designation: "$bdData.designation",
          //   profile_pic: "$bdData.profile_pic",
          // },
        },
      },
    ]);
    const clTarget = await clusterLeadTargetModel.aggregatePaginate(
      resultAggregate,
      options
    );
    if (!clTarget || clTarget.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Lead's targets not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster Lead's targets get successfully.",
      data: clTarget,
    };
  }

  async manGetCLTargetDetailService(req, cl_id, target_id) {
    // const { _id } = req.query;
    const clTargetDetail = await clusterLeadTargetModel
      .findOne(
        {
          $and: [
            { _id: target_id },
            { cluster_lead_id: cl_id },
            { manager_id: req.user._id }
          ]
        },
        {
          cluster_head_id: 1,
          manager_id: 1,
          cluster_lead_id: 1,
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
      .populate("cluster_head_id", "emp_id name email designation profile_pic")
      .populate("manager_id", "emp_id name email designation profile_pic")
      .populate("cluster_lead_id", "emp_id name email designation profile_pic")
      .populate("cluster_lead_id", "emp_id name email designation profile_pic")

    // return

    if (!clTargetDetail || clTargetDetail.length === 0) {
      return {
        status: 400,
        success: false,
        msg: "Cluster Lead Target detail not found.",
        data: "",
      };
    }
    return {
      status: 200,
      success: true,
      msg: "Cluster Lead Target detail get successfully.",
      data: clTargetDetail,
    };
  }

  async manUpdateCLTargetService(req) {
    try {
      const body = req.body;

      const clTarget = await clusterLeadTargetModel.findOne({ _id: body.target_id });
      if (!clTarget) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead targets not found",
          data: clTarget,
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
      let addTarg = body.targets - clTarget.targets;

      if (clTarget.target_month == currentMonth) {
        body?.targets !== '' ? (clTarget.targets = body.targets) : "";
        clTarget?.total_target !== "" ? (clTarget.total_target = (body.targets + clTarget.prev_month_target)) : "";
        clTarget?.remaining_target !== "" ? (clTarget.remaining_target = clTarget.total_target - clTarget.completed_target) : "";

        const updateclTarget = await clTarget.save();

        if (updateclTarget) {
          // const clusterLeadTarg = await clusterLeadTargetModel.findOne({ $and: [{ cluster_lead_id: updateclTarget.cluster_lead_id }, { target_month: currentMonth }] });
          // if (clusterLeadTarg) {
          //   clusterLeadTarg.assigned_targets = clusterLeadTarg.assigned_targets + addTarg;
          //   let updateclusterLeadTarg = await clusterLeadTarg.save();
          // }

          const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updateclTarget.manager_id }, { target_month: currentMonth }] });
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
          msg: "Current month Cluster Lead target updated successfully.",
          data: updateclTarget,
        };
      } else if (clTarget.target_month == previousMonth) {
        body.targets !== "" ? (clTarget.targets = body.targets) : "";
        clTarget?.total_target !== "" ? (clTarget.total_target = (body.targets + clTarget.prev_month_target)) : "";
        clTarget?.remaining_target !== "" ? (clTarget.remaining_target = clTarget.total_target - clTarget.completed_target) : "";

        const updateclTarget = await clTarget.save();
        let updatClusterLeadTarg;
        let updateManagerTarg;
        let updatebranchTarg;
        if (updateclTarget) {

          // const clusterLeadTarg = await clusterLeadTargetModel.findOne({ $and: [{ cluster_lead_id: updateclTarget.cluster_lead_id }, { target_month: previousMonth }] });
          // if (clusterLeadTarg) {
          //   clusterLeadTarg.assigned_targets = clusterLeadTarg.assigned_targets + addTarg;
          //   updatClusterLeadTarg = await clusterLeadTarg.save();
          // }

          const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updateclTarget.manager_id }, { target_month: previousMonth }] });
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

        let currMonclTarg = await clusterLeadTargetModel.findOne({ $and: [{ bd_id: updateclTarget.cluster_lead_id }, { target_month: currentMonth }] });

        if (currMonclTarg) {
          currMonclTarg?.prev_month_target !== "" ? (currMonclTarg.prev_month_target = (updateclTarget.remaining_target)) : "";
          currMonclTarg?.total_target !== "" ? (currMonclTarg.total_target = (currMonclTarg.targets + currMonclTarg.prev_month_target)) : "";
          currMonclTarg?.remaining_target !== "" ? (currMonclTarg.remaining_target = currMonclTarg.total_target - currMonclTarg?.completed_target) : "";

          const updatecurrMonclTarg = await currMonclTarg.save();
        }

        // let currMonManagerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: currMonclTarg.manager_id }, { target_month: currentMonth }] });

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
          data: updateclTarget,
        };
      } else {
        return {
          status: 400,
          success: false,
          msg: "You only have permissions to update the target for the current month and previous month.",
          data: clTarget,
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

  async manCompCLTargetService(req) {
    try {

      let { cl_id, target_id, complete_target } = req.body;
      let clTarget = await clusterLeadTargetModel.findOne({ _id: target_id });
      if (!clTarget) {
        return {
          status: 400,
          success: false,
          msg: "Cluster Lead targets not found",
          data: clTarget,
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

      let currMonthclTarget = await clusterLeadTargetModel.findOne({ $and: [{ cluster_lead_id: cl_id }, { target_month: currentMonth }] });
      if (currMonthclTarget) {
        if (String(currMonthclTarget._id) == String(clTarget._id)) {
          let compTarget = await completeclTargetService(clTarget, complete_target);
          if (compTarget) {
            return compTarget;
          }
          // complete_target !== "" ? (clTarget.completed_target == clTarget.completed_target + complete_target) : "";
          // clTarget?.remaining_target !== "" ? (clTarget.remaining_target = clTarget.total_target - clTarget.completed_target) : "";

          // const updateclTarget = await clTarget.save();

          // if (updateclTarget) {
          //   const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updateclTarget.manager_id }, { target_month: updateclTarget.target_month }] });
          //   if (managerTarg) {
          //     managerTarg.completed_target !== "" ? (managerTarg.completed_target == managerTarg.completed_target + complete_target) : "";
          //     managerTarg?.remaining_target !== "" ? (managerTarg.remaining_target = managerTarg.total_target - managerTarg.completed_target) : "";

          //     const updatemanagerTarg = await managerTarg.save();
          //   }

          //   const branchTarg = await branchTargetModel.findOne({ $and: [{ branch_id: updatemanagerTarg.branch_id }, { target_month: updateclTarget.target_month }] });
          //   if (branchTarg) {
          //     branchTarg?.completed_target !== "" ? (branchTarg.completed_target == branchTarg.completed_target + complete_target) : "";
          //     branchTarg?.remaining_target !== "" ? (branchTarg.remaining_target = branchTarg.total_target - branchTarg.completed_target) : "";

          //     const updatebranchTarg = await branchTarg.save();
          //   }
          // }
          // return {
          //   status: 200,
          //   success: true,
          //   msg: "BDE completed target updated successfully.",
          //   data: updateclTarget,
          // };
        } else {
          return {
            status: 400,
            success: false,
            msg: "You have only permission to complete the current month targets.",
            data: currMonthclTarget,
          };
        }
      } else if (clTarget.target_month == previousMonth) {

        const compTarget = await completeclTargetService(clTarget, complete_target);
        // if (compTarget) {
        //   return compTarget;
        // }

        if (compTarget?.success) {
          let updateCurrMontarg = await updateCurrMonBDTarg(currMonthclTarget, compTarget.data);
          return updateCurrMontarg;
        } else {
          return compTarget;
        }

        // complete_target !== "" ? (clTarget.completed_target == clTarget.completed_target + complete_target) : "";
        // clTarget?.remaining_target !== "" ? (clTarget.remaining_target = clTarget.total_target - clTarget.completed_target) : "";

        // const updateclTarget = await clTarget.save();

        // if (updateclTarget) {
        //   const managerTarg = await managerTargetModel.findOne({ $and: [{ manager_id: updateclTarget.manager_id }, { target_month: updateclTarget.target_month }] });
        //   if (managerTarg) {
        //     managerTarg?.completed_target !== "" ? (managerTarg.completed_target == managerTarg.completed_target + complete_target) : "";
        //     managerTarg?.remaining_target !== "" ? (managerTarg.remaining_target = managerTarg.total_target - managerTarg.completed_target) : "";

        //     const updatemanagerTarg = await managerTarg.save();
        //   }

        //   const branchTarg = await branchTargetModel.findOne({ $and: [{ branch_id: updatemanagerTarg.branch_id }, { target_month: updateclTarget.target_month }] });
        //   if (branchTarg) {
        //     branchTarg?.completed_target !== "" ? (branchTarg.completed_target == branchTarg.completed_target + complete_target) : "";
        //     branchTarg?.remaining_target !== "" ? (branchTarg.remaining_target = branchTarg.total_target - branchTarg.completed_target) : "";

        //     const updatebranchTarg = await branchTarg.save();
        //   }
        // }
        // return {
        //   status: 200,
        //   success: true,
        //   msg: "BDE completed target updated successfully.",
        //   data: updateclTarget,
        // };
      } else {
        return {
          status: 400,
          success: false,
          msg: "You have only permission to complete the current month targets.",
          data: clTarget,
        };
      }

    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when Complete BDE Target service.",
        data: error,
      };
    }
  };

  // async assignBDTargetService(req) {
  //   try {
  //     let { bd_id, newTarg = 0 } = req.body;
  //     let manager_id = req.user._id;
  //     let cluster_head_id = req.user.cluster_head_id._id;
  //     let date = moment("2023-05-04");
  //     if (date.toDate() == "Invalid Date") {
  //       return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Date not found", "succeeded": true, "ResponseData": date.toString() });
  //     }
  //     let currentMonth = date.format('MMMM');
  //     let currentMonthYear = date.year();
  //     let currMonth = date.month();

  //     let preMonth = currMonth - 1;
  //     let previousMonthYear = currentMonthYear

  //     if (preMonth < 0) {
  //       preMonth = 11;
  //       previousMonthYear -= 1;
  //     }
  //     let preMonthDate = moment([previousMonthYear, preMonth, 1]);
  //     let previousMonth = preMonthDate.format('MMMM');

  //     const currMonthTarg = await bdTargetModel.findOne({ $and: [{ bd_id: new mongoose.Types.ObjectId(bd_id) }, { target_month: currentMonth }, { target_year: currentMonthYear }] });

  //     if (currMonthTarg) {
  //       // const updateTarg = newTarg - currTarg;
  //       // currMonthTarg?.assigned_targets ? currMonthTarg.assigned_targets = currMonthTarg.assigned_targets + updateTarg : currMonthTarg["assigned_targets"] = 0 + updateTarg

  //       // let saveTarg = await currMonthTarg.save();
  //       return {
  //         status: 200,
  //         success: true,
  //         msg: "Current month BDE targets already assigned.",
  //         data: currMonthTarg,
  //       };
  //     }
  //     let targets = 0;
  //     let prev_month_target = 0;
  //     let total_target = 0;
  //     let completed_target = 0;
  //     let remaining_target = 0;
  //     // let assigned_targets = 0; //newTarg;
  //     let target_month = currentMonth;
  //     let target_year = currentMonthYear;


  //     const preMonthTarg = await bdModel.findOne({ $and: [{ bd_id: new mongoose.Types.ObjectId(bd_id) }, { target_month: previousMonth }, { target_year: previousMonthYear }] });

  //     if (preMonthTarg && preMonthTarg !== "") {
  //       targets = await newTarg;
  //       prev_month_target = await preMonthTarg.remaining_target;
  //       total_target = await targets + prev_month_target;
  //       completed_target = await completed_target;
  //       remaining_target = await total_target - completed_target;
  //     } else {
  //       targets = await newTarg;
  //       prev_month_target = 0;
  //       total_target = await targets + prev_month_target;
  //       completed_target = 0;
  //       remaining_target = await total_target - completed_target;
  //     }

  //     let targetData = await bdTargetModel({
  //       bd_id: bd_id,
  //       manager_id: manager_id,
  //       cluster_head_id: cluster_head_id,
  //       targets: targets,
  //       prev_month_target: prev_month_target,
  //       total_target: total_target,
  //       completed_target: completed_target,
  //       remaining_target: remaining_target,
  //       // assigned_targets: assigned_targets,
  //       target_month: target_month,
  //       target_year: target_year,
  //     })


  //     let currentTarget = await targetData.save();
  //     let bdTarget

  //     if (!currentTarget) {
  //       return {
  //         status: 400,
  //         success: false,
  //         msg: "Unable to add current month Team Lead targets.",
  //         data: currentTarget,
  //       };
  //     } else {
  //       bdTarget = await updateBDTargToManager(manager_id, cluster_head_id, newTarg);
  //     }
  //     // await this.updateBDTargToManager(manager_id, cluster_head_id, newTarg, 0); //this.updateBDTargToManager(manager_id, cluster_head_id, newTarg);

  //     return {
  //       status: 200,
  //       success: true,
  //       msg: "Current month Team Lead targets created successfully.",
  //       data: currentTarget,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       success: true,
  //       msg: error, //"Assign Team Lead target service error.",
  //       data: error,
  //     };
  //   }
  // }

  // async checkManagerTargets(manager_id, year, month) {
  //   try {

  //     const checkManagerTarget = await managerTargetModel.find({
  //       $and: [
  //         { _id: manager_id },
  //         { target_month: month },
  //         { target_year: year }
  //       ]
  //     })

  //     if (!checkManagerTarget) {
  //       return { status: 400, success: false, msg: "Team Lead target not found for this month.", data: checkManagerTarget };
  //     }

  //     return { status: 200, success: true, msg: "Team Lead target get successfully.", data: checkManagerTarget };

  //   } catch (error) {
  //     return {
  //       status: 500,
  //       success: false,
  //       msg: "Something want's wrong when check assign target's to the Team Lead.",
  //       data: "",
  //     };

  //   }
  // };

}


// const updateBDTargToManager = async (manager_id, cluster_head_id, newTarg = 0, currTarg = 0) => {
//   try {
//     let date = moment("2023-05-04");
//     if (date.toDate() == "Invalid Date") {
//       return res.status(400).json({ "ResponseCode": 400, "ResponseMessage": "Date not found", "succeeded": true, "ResponseData": date.toString() });
//     }
//     let currentMonth = date.format('MMMM');
//     let currentMonthYear = date.year();
//     let currMonth = date.month();

//     let preMonth = currMonth - 1;
//     let previousMonthYear = currentMonthYear

//     if (preMonth < 0) {
//       preMonth = 11;
//       previousMonthYear -= 1;
//     }

//     let preMonthDate = moment([previousMonthYear, preMonth, 1]);
//     let previousMonth = preMonthDate.format('MMMM');

//     const currMonthTarg = await managerTargetModel.findOne({ $and: [{ manager_id: new mongoose.Types.ObjectId(manager_id) }, { target_month: currentMonth }, { target_year: currentMonthYear }] });

//     if (currMonthTarg) {
//       const updateTarg = newTarg - currTarg;
//       currMonthTarg?.assigned_targets ? currMonthTarg.assigned_targets = currMonthTarg.assigned_targets + updateTarg : currMonthTarg["assigned_targets"] = 0 + updateTarg
//       // currMonthTarg.assigned_targets = await currMonthTarg.assigned_targets + updateTarg;

//       let saveTarg = await currMonthTarg.save();
//       return {
//         status: 200,
//         success: true,
//         msg: "Current month Team Lead assigned target updated.",
//         data: saveTarg,
//       };
//       // return res.status(200).json({ "ResponseCode": 200, "ResponseMessage": "Current month manager assigned target updated.", "succeeded": true, "ResponseData": saveTarg });
//     }
//     let targets = 0;
//     let prev_month_target = 0;
//     let total_target = 0;
//     let completed_target = 0;
//     let remaining_target = 0;
//     let assigned_targets = newTarg;
//     let target_month = currentMonth;
//     let target_year = currentMonthYear;

//     const preMonthTarg = await managerTargetModel.findOne({ $and: [{ manager_id: new mongoose.Types.ObjectId(manager_id) }, { target_month: previousMonth }, { target_year: previousMonthYear }] });

//     if (preMonthTarg && preMonthTarg !== "") {
//       targets = 0;
//       prev_month_target = await preMonthTarg.remaining_target;
//       total_target = await targets + prev_month_target;
//       completed_target = await completed_target;
//       remaining_target = await total_target - completed_target;
//     }

//     let targetData = await managerTargetModel({
//       manager_id: manager_id,
//       cluster_head_id: cluster_head_id,
//       targets: targets,
//       prev_month_target: prev_month_target,
//       total_target: total_target,
//       completed_target: completed_target,
//       remaining_target: remaining_target,
//       assigned_targets: assigned_targets,
//       target_month: target_month,
//       target_year: target_year,
//     })


//     let currentTarget = await targetData.save();

//     if (!currentTarget) {
//       return {
//         status: 400,
//         success: false,
//         msg: "Unable to add current month Team Lead targets.",
//         data: currentTarget,
//       };
//     }
//     return {
//       status: 200,
//       success: true,
//       msg: "Current month Team Lead targets created successfully.",
//       data: currentTarget,
//     };
//   } catch (error) {
//     return {
//       status: 500,
//       success: true,
//       msg: error, //"Update BD's targets to Team Lead service error.",
//       data: error,
//     };
//   }
// }
module.exports = new ManCLTargtService()