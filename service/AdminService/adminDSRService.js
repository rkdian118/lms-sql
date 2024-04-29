const mongoose = require("mongoose");
const bdModel = require("../../model/BDModel/bdModel");
const leadModel = require("../../model/BDModel/leadModel");
const proposalModel = require("../../model/BDModel/proposalModel ");
const dsrModel = require("../../model/BDModel/dsrModel");
const moment = require("moment");
const leadResponseModel = require("../../model/BDModel/leadResponseModel");
const leadActivityModel = require("../../model/BDModel/leadActivityModel");
const _ = require("lodash");
const callModel = require("../../model/BDModel/callModel");
const followupCallModel = require("../../model/BDModel/followupCallModel");
const bdTargetModel = require("../../model/ManagerModel/bdTargetModel");
const ExcelJS = require("exceljs");
const { default: readXlsxFile } = require("read-excel-file/node");
const clusterLeadModel = require("../../model/ClusterLeadModel/clusterLeadModel");
const clusterLeadTargetModel = require("../../model/ManagerModel/clusterLeadTargetModel");
const branchTargetModel = require("../../model/AdminModel/branchTargetModel");

class AdminBdDSRService {
  async adminGetBDDSRReportService(req) {
    try {
      const {
        page,
        limit,
        search,
        start_date,
        end_date,
        cluster_head_id,
        cluster_lead_id,
        bd_id,
      } = req.query;

      const options = {
        page: page ? page : 1,
        limit: limit ? limit : 20,
      };
      const matchObject = {};
      // matchObject.cluster_head_id = new mongoose.Types.ObjectId(req.user._id);
      if (cluster_head_id)
        matchObject.cluster_head_id = new mongoose.Types.ObjectId(
          cluster_head_id
        );

      if (cluster_lead_id)
        matchObject.cluster_lead_id = new mongoose.Types.ObjectId(
          cluster_lead_id
        );

      if (start_date && end_date) {
        matchObject.createdAt = {
          $gte: new Date(moment(start_date).startOf("day")),
          $lt: new Date(moment(end_date).endOf("day")),
        };
      }
      if (bd_id) {
        matchObject.bd_id = new mongoose.Types.ObjectId(bd_id);
      }
      const resultAggregate = dsrModel.aggregate([
        {
          $match: matchObject,
        },
        {
          $sort: {
            createdAt: -1,
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
            from: "clusters",
            localField: "cluster_head_id",
            foreignField: "_id",
            as: "clusterHeadData",
          },
        },
        {
          $unwind: {
            path: "$clusterHeadData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            bd_id: 1,
            bd_username: "$bdData.username",
            bd_name: "$bdData.name",
            bd_email: "$bdData.email",
            cluster_lead: {
              username: "$clusterLeadData.username",
              name: "$clusterLeadData.name",
              email: "$clusterLeadData.email",
              designation: "$clusterLeadData.designation",
            },
            cluster_head: {
              username: "$clusterHeadData.username",
              name: "$clusterHeadData.name",
              email: "$clusterHeadData.email",
              designation: "$clusterHeadData.designation",
            },
            lead_positive_response: 1,
            lead_negative_response: 1,
            upwork_bids: 1,
            linkedin_response: 1,
            upwork_positive_response: 1,
            lead_assigned: 1,
            follow_ups: 1,
            meeting_scheduled: 1,
            meeting_done: 1,
            proposal_submitted: 1,
            estimation_submitted: 1,
            understanding_queries_submitted: 1,
            feature_list_shared: 1,
            phone_call_done: 1,
            proposal_amount: 1,
            linkedin_messages: 1,
            createdAt: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
            bd_name: 1,
          },
        },
      ]);

      const result = await dsrModel.aggregatePaginate(resultAggregate, options);

      for (let i = 0; i < result.docs.length; i++) {
        const element = result.docs[i];
        const bdTarget = await bdTargetModel.findOne({
          $and: [
            { bd_id: element.bd_id },
            { target_month: moment(element.createdAt).format("MMMM") },
            { target_year: moment(element.createdAt).format("YYYY") },
          ],
        });
        element.bd_target = bdTarget ? bdTarget.completed_target : 0;
      }

      return {
        status: 200,
        success: true,
        msg: "BD DSR get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }

  async adminGetCLDSRReportService(req) {
    try {
      const {
        page,
        limit,
        search,
        start_date,
        end_date,
        cluster_lead_id,
        cluster_head_id,
      } = req.query;
      const options = {
        page: page ? page : 1,
        limit: limit ? limit : 20,
      };
      const matchObject = {};
      // matchObject.cluster_head_id = new mongoose.Types.ObjectId(req.user._id);
      if (cluster_head_id) {
        matchObject.cluster_head_id = new mongoose.Types.ObjectId(
          cluster_head_id
        );
      }

      if (start_date && end_date) {
        matchObject.createdAt = {
          $gte: new Date(moment(start_date).startOf("day")),
          $lt: new Date(moment(end_date).endOf("day")),
        };
      }
      if (search) {
        matchObject.bd_id = new mongoose.Types.ObjectId(search);
      }
      if (cluster_lead_id) {
        matchObject.cluster_lead_id = new mongoose.Types.ObjectId(
          cluster_lead_id
        );
      }
      const resultAggregate = dsrModel.aggregate([
        {
          $match: matchObject,
        },
        {
          $sort: {
            createdAt: -1,
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
            from: "clusters",
            localField: "cluster_head_id",
            foreignField: "_id",
            as: "clusterHeadData",
          },
        },
        {
          $unwind: {
            path: "$clusterHeadData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: {
              cluster_lead_id: "$cluster_lead_id",
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            // count: { $sum: 1 },
            lead_positive_response: { $sum: "$lead_positive_response" },
            lead_negative_response: { $sum: "$lead_negative_response" },
            upwork_bids: { $sum: "$upwork_bids" },
            linkedin_response: { $sum: "$linkedin_response" },
            upwork_positive_response: { $sum: "$upwork_positive_response" },
            lead_assigned: { $sum: "$lead_assigned" },
            follow_ups: { $sum: "$follow_ups" },
            meeting_scheduled: { $sum: "$meeting_scheduled" },
            meeting_done: { $sum: "$meeting_done" },
            proposal_submitted: { $sum: "$proposal_submitted" },
            estimation_submitted: { $sum: "$estimation_submitted" },
            understanding_queries_submitted: {
              $sum: "$understanding_queries_submitted",
            },
            feature_list_shared: { $sum: "$feature_list_shared" },
            phone_call_done: { $sum: "$phone_call_done" },
            proposal_amount: { $sum: "$proposal_amount" },
            linkedin_messages: { $sum: "$linkedin_messages" },
            clusterLeadData: { $first: "$clusterLeadData" },
            clusterHeadData: { $first: "$clusterHeadData" },
          },
        },
        {
          $project: {
            _id: 0,
            createdAt: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
            // count: 1,
            lead_positive_response: 1,
            lead_negative_response: 1,
            upwork_bids: 1,
            linkedin_response: 1,
            upwork_positive_response: 1,
            lead_assigned: 1,
            follow_ups: 1,
            meeting_scheduled: 1,
            meeting_done: 1,
            proposal_submitted: 1,
            estimation_submitted: 1,
            understanding_queries_submitted: 1,
            feature_list_shared: 1,
            phone_call_done: 1,
            proposal_amount: 1,
            linkedin_messages: 1,
            clusterLeadData: {
              _id: "$clusterLeadData._id",
              name: "$clusterLeadData.name",
              email: "$clusterLeadData.email",
              designation: "$clusterLeadData.designation",
            },
            clusterHeadData: {
              _id: "$clusterHeadData._id",
              name: "$clusterHeadData.name",
              email: "$clusterHeadData.email",
              designation: "$clusterHeadData.designation",
            },
          },
        },
        {
          $sort: {
            createdAt: -1,
            "clusterLeadData.name": 1,
          },
        },
      ]);

      const result = await dsrModel.aggregatePaginate(resultAggregate, options);

      return {
        status: 200,
        success: true,
        msg: "CL DSR get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }

  async adminGetClusterDSRReportService(req) {
    try {
      const { page, limit, search, start_date, end_date, cluster_head_id } =
        req.query;
      const options = {
        page: page ? page : 1,
        limit: limit ? limit : 20,
      };
      const matchObject = {};
      // matchObject.cluster_head_id = new mongoose.Types.ObjectId(req.user._id);
      matchObject.cluster_head_id = new mongoose.Types.ObjectId(
        cluster_head_id
      );

      if (start_date && end_date) {
        matchObject.createdAt = {
          $gte: new Date(moment(start_date).startOf("day")),
          $lt: new Date(moment(end_date).endOf("day")),
        };
      }

      const resultAggregate = dsrModel.aggregate([
        {
          $match: matchObject,
        },
        // {
        //   $sort: {
        //     createdAt: -1,
        //   },
        // },
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
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            // count: { $sum: 1 },
            lead_positive_response: { $sum: "$lead_positive_response" },
            lead_negative_response: { $sum: "$lead_negative_response" },
            upwork_bids: { $sum: "$upwork_bids" },
            linkedin_response: { $sum: "$linkedin_response" },
            upwork_positive_response: { $sum: "$upwork_positive_response" },
            lead_assigned: { $sum: "$lead_assigned" },
            follow_ups: { $sum: "$follow_ups" },
            meeting_scheduled: { $sum: "$meeting_scheduled" },
            meeting_done: { $sum: "$meeting_done" },
            proposal_submitted: { $sum: "$proposal_submitted" },
            estimation_submitted: { $sum: "$estimation_submitted" },
            understanding_queries_submitted: {
              $sum: "$understanding_queries_submitted",
            },
            feature_list_shared: { $sum: "$feature_list_shared" },
            phone_call_done: { $sum: "$phone_call_done" },
            proposal_amount: { $sum: "$proposal_amount" },
            linkedin_messages: { $sum: "$linkedin_messages" },
          },
        },
        {
          $project: {
            _id: 0,
            createdAt: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
            // count: 1,
            lead_positive_response: 1,
            lead_negative_response: 1,
            upwork_bids: 1,
            linkedin_response: 1,
            upwork_positive_response: 1,
            lead_assigned: 1,
            follow_ups: 1,
            meeting_scheduled: 1,
            meeting_done: 1,
            proposal_submitted: 1,
            estimation_submitted: 1,
            understanding_queries_submitted: 1,
            feature_list_shared: 1,
            phone_call_done: 1,
            proposal_amount: 1,
            linkedin_messages: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);

      const result = await dsrModel.aggregatePaginate(resultAggregate, options);

      return {
        status: 200,
        success: true,
        msg: "Cluster DSR get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }

  async adminGetLeadDataBankService(req) {
    try {
      const { bh_id, start_date, end_date, lead_status, bd_id } = req.query;
      const matchObj = [];
      if (bh_id) {
        matchObj.push(`ch._id = '${bh_id}'`);
      }
      if (bd_id) matchObj.push(`bd._id = '${bd_id}'`);

      let startDate = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
      let endDate = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss");

      if (start_date && end_date) {
        startDate = moment(start_date)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        endDate = moment(end_date).endOf("day").format("YYYY-MM-DD HH:mm:ss");
      }

      matchObj.push(`l.assign_date between '${startDate}' AND '${endDate}' `);

      if (lead_status) matchObj.push(`ls._id = '${lead_status}'`);

      const query = `SELECT 
      l._id as _id,
      l.assign_date,
      bd.name AS bdname,
      bh.branch_name AS branch_name,
      cl.name AS clusterLeadname,
      ch.name AS clusterHeadname,
      rt.status_name AS lead_req_type_name,
      lt.status_name AS lead_type_data_name,
      lsd.status_name AS lead_source_name,
      l.client_name,
      l.company_name,
      l.client_name,
      l.company_name,
      l.client_number,
      l.client_whatsapp_num,
      l.client_email,
      l.client_alternate_email,
      l.skype_id,
      l.client_country,
      l.address,
      l.client_linkedin,
      l.upwork_job_url,
      l.bid_url,
      l.client_budget,
      l.proposal_amount,
      ls.status_name AS lead_status_name,
      l.add_notes
  FROM
      leads l
          LEFT JOIN
      master_statuses AS rt ON rt._id = l.lead_req_type_id
          LEFT JOIN
      master_statuses AS lt ON lt._id = l.lead_type_id
          LEFT JOIN
      master_statuses AS ls ON ls._id = l.lead_status
          LEFT JOIN
      master_statuses AS lsd ON lsd._id = l.lead_source_id
          LEFT JOIN
      businesses AS bd ON bd._id = l.bd_id
          LEFT JOIN
      cluster_leads AS cl ON cl._id = bd.cluster_lead_id
          LEFT JOIN
      clusters AS ch ON ch._id = bd.cluster_head_id
          LEFT JOIN
      branches AS bh ON bh._id = ch.branch_id
      ${matchObj.length > 0 ? ` WHERE ${matchObj.join(" AND ")}` : ""}`;
      // console.log(query);
      const [result] = await pool.promise().execute(query);

      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        let [[activity]] = await pool.promise().execute(
          `select la.*, aid.status_name from lead_activities la
        left join master_statuses as aid on aid._id =  la.activity_id
        where lead_id = ? order by createdAt desc`,
          [element._id]
        );

        element.leadActivityStatus = activity?.status_name;
        element.leadLastActivity = activity?.createdAt;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      // Add headers to the worksheet
      const headers = [
        "S.No.",
        "Assign Date",
        "BDE Name",
        "Branch Name",
        "cluster lead name",
        "cluster Head name",
        "Requirement Type",
        "Lead Type",
        "Lead Source",
        "Client Name",
        "Company Name",
        "Client Number",
        "Client whats App",
        "Client Email",
        "Client Alternate Email",
        "Skype Id",
        "Country",
        "Address",
        "LinkedIn Url",
        "Upwork Url",
        "Bid Url",
        "Client Budget (USD)",
        "Proposal Amount (USD)",
        "Lead Status",
        "Notes",
        "Last Activity",
        "Last Activity Date",
      ];
      worksheet.addRow(headers);
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      let counter = 1;
      result.forEach((item) => {
        // user.s_no = counter;
        worksheet.addRow([
          counter,
          item?.assign_date === null ? "" : item?.assign_date,
          item?.bdname === null ? "" : item?.bdname,
          item?.branch_name === null ? "" : item?.branch_name,
          item?.clusterLeadname === null ? "" : item?.clusterLeadname,
          item?.clusterHeadname === null ? "" : item?.clusterHeadname,
          item?.lead_req_type_name === null ? "" : item?.lead_req_type_name,
          item?.lead_type_data_name === null ? "" : item?.lead_type_data_name,
          item?.lead_source_name === null ? "" : item?.lead_source_name,
          item?.client_name === null ? "" : item?.client_name,
          item?.company_name === null ? "" : item?.company_name,
          item?.client_number === null ? "" : item?.client_number,
          item?.client_whatsapp_num === null ? "" : item?.client_whatsapp_num,
          item?.client_email === null ? "" : item?.client_email,
          item?.client_alternate_email === null
            ? ""
            : item?.client_alternate_email,
          item?.skype_id === null ? "" : item?.skype_id,
          item?.client_country === null ? "" : item?.client_country,
          item?.address === null ? "" : item?.address,
          item?.client_linkedin === null ? "" : item?.client_linkedin,
          item?.upwork_job_url === null ? "" : item?.upwork_job_url,
          item?.bid_url === null ? "" : item?.bid_url,
          item?.client_budget === null ? "" : item?.client_budget,
          item?.proposal_amount === null ? "" : item?.proposal_amount,
          item?.lead_status_name === null ? "" : item?.lead_status_name,
          item?.add_notes === null ? "" : item?.add_notes,
          item?.leadActivityStatus,
          item?.leadLastActivity,
        ]); // Add data in worksheet
        counter++;
      });
      await workbook.xlsx.writeFile("Uploads/attachments/leadData.xlsx");

      return {
        status: 200,
        success: true,
        msg: "Lead export successfully.",
        data: {},
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }

  async adminAddBDsTargetService(req) {
    try {
      const rows = await readXlsxFile(req.file.path);
      rows.shift();

      const BDsTargets = new Array();
      let index = 0;
      for (const row of rows) {
        if (row[0]) {
          let checkDate = row[6];
          if (moment(row[6], "DD-MM-YYYY").isValid()) {
            checkDate = moment(row[6], "DD-MM-YYYY").format("YYYY-MM-DD"); // Format as ISO 8601
          }
          const bdData = await bdModel.findById(row[1]);

          const clData = await clusterLeadModel
            .findById(row[2])
            .populate("cluster_head_id");

          const targetObj = {
            bd_id: new mongoose.Types.ObjectId(row[1]),
            cluster_head_id: clData?.cluster_head_id?._id,
            branch_id: clData?.cluster_head_id?.branch_id,
            admin_id: clData?.cluster_head_id?.admin_id,
            cluster_lead_id: clData?._id,
            targets: row[7].toFixed(0),
            prev_month_target: row[8].toFixed(0),
            total_target: row[9].toFixed(0),
            completed_target: row[10].toFixed(0),
            remaining_target: row[12].toFixed(0),
            confirm_business: row[11].toFixed(0),
            target_month: row[5],
            target_year: row[4],
            month_start_date: new Date(checkDate),
            status: "1",
            deleted: false,
          };
          index += 1;
          BDsTargets.push(targetObj);
        }
      }
      await bdTargetModel.insertMany(BDsTargets);

      const bdTargetsNew = await bdTargetModel.aggregate([
        {
          $match: {
            target_year: "2023",
            cluster_head_id: new mongoose.Types.ObjectId(
              "656ef8ff9c4f6d4c72426a3a"
            ),
          },
        },
        {
          $group: {
            _id: {
              target_month: "$target_month",
              cluster_lead_id: "$cluster_lead_id",
            },
            target_year: { $first: "$target_year" },
            month_start_date: { $first: "$month_start_date" },
            completed_target: { $sum: "$completed_target" },
            confirm_business: { $sum: "$confirm_business" },
            remaining_target: { $sum: "$remaining_target" },
            targets: { $sum: "$targets" },
            total_target: { $sum: "$total_target" },
            prev_month_target: { $sum: "$prev_month_target" },
          },
        },
        {
          $project: {
            cluster_lead_id: "$_id.cluster_lead_id",
            _id: 0,
            completed_target: 1,
            confirm_business: 1,
            remaining_target: 1,
            month_start_date: 1,
            target_month: "$_id.target_month",
            target_year: 1,
            targets: 1,
            total_target: 1,
            prev_month_target: 1,
          },
        },
      ]);

      for (let i = 0; i < bdTargetsNew.length; i++) {
        const element = bdTargetsNew[i];
        const newww = await new clusterLeadTargetModel({
          cluster_lead_id: new mongoose.Types.ObjectId(element.cluster_lead_id),
          cluster_head_id: new mongoose.Types.ObjectId(
            "656ef8ff9c4f6d4c72426a3a"
          ),
          branch_id: new mongoose.Types.ObjectId("656ef7fd9c4f6d4c72426a1d"),
          admin_id: new mongoose.Types.ObjectId("656ef751bea150f62aa1eb83"),
          month_start_date: element.month_start_date,
          target_month: element.target_month,
          target_year: element.target_year,
          completed_target: element.completed_target,
          remaining_target: element.remaining_target,
          confirm_business: element.confirm_business,
          targets: element.targets,
          total_target: element.total_target,
          prev_month_target: element.prev_month_target,
          status: "1",
          deleted: false,
        }).save();
      }

      const clTargetsNew = await clusterLeadTargetModel.aggregate([
        {
          $match: {
            target_year: "2023",
            cluster_head_id: new mongoose.Types.ObjectId(
              "656ef8ff9c4f6d4c72426a3a"
            ),
          },
        },
        {
          $group: {
            _id: {
              target_month: "$target_month",
            },
            target_year: { $first: "$target_year" },
            cluster_head_id: { $first: "$cluster_head_id" },
            completed_target: { $sum: "$completed_target" },
            month_start_date: { $first: "$month_start_date" },
            confirm_business: { $sum: "$confirm_business" },
            remaining_target: { $sum: "$remaining_target" },
            targets: { $sum: "$targets" },
            total_target: { $sum: "$total_target" },
            prev_month_target: { $sum: "$prev_month_target" },
          },
        },
        {
          $project: {
            cluster_head_id: 1,
            _id: 0,
            completed_target: 1,
            remaining_target: 1,
            confirm_business: 1,
            month_start_date: 1,
            target_month: "$_id.target_month",
            target_year: 1,
            targets: 1,
            total_target: 1,
            prev_month_target: 1,
          },
        },
      ]);

      for (let j = 0; j < clTargetsNew.length; j++) {
        const element = clTargetsNew[j];
        await new branchTargetModel({
          cluster_head_id: new mongoose.Types.ObjectId(
            "656ef8ff9c4f6d4c72426a3a"
          ),
          branch_id: new mongoose.Types.ObjectId("656ef7fd9c4f6d4c72426a1d"),
          admin_id: new mongoose.Types.ObjectId("656ef751bea150f62aa1eb83"),
          month_start_date: element.month_start_date,
          target_month: element.target_month,
          target_year: element.target_year,
          completed_target: element.completed_target,
          remaining_target: element.remaining_target,
          confirm_business: element.confirm_business,
          targets: element.targets,
          total_target: element.total_target,
          prev_month_target: element.prev_month_target,
          status: "1",
          deleted: false,
        }).save();
      }

      return {
        status: 200,
        success: true,
        msg: "Target Added success.",
        data: BDsTargets,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }
}

module.exports = new AdminBdDSRService();
