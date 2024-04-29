const cron = require("node-cron");
const bdModel = require("./model/BDModel/bdModel");
const leadModel = require("./model/BDModel/leadModel");
const leadActivityModel = require("./model/BDModel/leadActivityModel");
const callModel = require("./model/BDModel/callModel");
const proposalModel = require("./model/BDModel/proposalModel ");
const moment = require("moment");
const mongoose = require("mongoose");
const _ = require("lodash");
const { SendMail } = require("./helper/EmailHelper");
const clusterModel = require("./model/ClusterModel/clusterModel");
const ExcelJS = require("exceljs");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

/** DSR generator  */
cron.schedule("0 0 * * *", async () => {
  console.log("statr cron DSR");
  try {
    const [bdDataList] = await pool
      .promise()
      .execute(
        `SELECT _id, cluster_head_id, cluster_lead_id FROM businesses WHERE status = ?`,
        ["1"]
      );
    for (let i = 0; i < bdDataList.length; i++) {
      const element = bdDataList[i];
      await pool.promise().execute(
        `INSERT INTO bddsrs (_id, bd_id, cluster_head_id, cluster_lead_id, calls_scheduled, estimation_submitted, feature_list_shared, follow_ups, lead_assigned, lead_negative_response, lead_positive_response, linkedin_messages, linkedin_response, meeting_done, meeting_scheduled, phone_call_done, proposal_amount, proposal_submitted, understamding_queries_submitted, understanding_queries_submitted, upwork_bids, upwork_positive_response, upwork_response, createdAt, updatedAt) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(),
          String(element._id),
          String(element.cluster_head_id),
          String(element.cluster_lead_id),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          new Date(),
          new Date(),
        ]
      );
    }
    console.log("Report Generation Done");
  } catch (err) {
    console.log("Error in Daily DSR Generator Cron Schedule. ", err);
  }
});

/** DSR update every 15 min */
cron.schedule("*/15 * * * *", async () => {
  console.log("statr cron DSR update");
  try {
    const [dsrCheck] = await pool.promise().execute(`SELECT * FROM bddsrs`);
    for (let i = 0; i < dsrCheck.length; i++) {
      const element = dsrCheck[i];
      const startDate = moment(element.createdAt).startOf("day");
      const endDate = moment(element.createdAt).endOf("day");

      const leadAssignedQuery = `
                              SELECT
                                l.*,
                                lt.status_name AS lead_type_name,
                                ls.status_name AS lead_source_name
                              FROM
                                leads AS l
                              LEFT JOIN
                                master_statuses AS lt ON l.lead_type_id = lt._id
                              LEFT JOIN
                              master_statuses AS ls ON l.lead_source_id = ls._id
                              WHERE
                              l.bd_id = '${String(element.bd_id)}' AND
                            l.assign_date BETWEEN ('${startDate}') AND ('${endDate}')
                            `;

      const [leadAssigned] = await pool.promise().execute(leadAssignedQuery);

      const leadResponsesQuery = `
                            SELECT
                              lr.*,
                              l.*,
                              lsd.status_name AS lead_source_name,
                              ltd.status_name AS lead_type_name
                            FROM
                              lead_responses AS lr
                            LEFT JOIN
                              leads AS l ON lr.lead_id = l._id
                            LEFT JOIN
                              master_statuses AS lsd ON l.lead_source_id = lsd._id
                            LEFT JOIN
                              master_statuses AS ltd ON l.lead_type_id = ltd._id
                            WHERE
                              lr.bd_id =?  AND lr.createdAt BETWEEN (?) AND (?)
                          `;

      const [leadResponses] = await pool
        .promise()
        .execute(leadResponsesQuery, [
          String(element.bd_id),
          startDate,
          endDate,
        ]);

      const [followups] = await pool.promise().execute(
        `select * from lead_activities as la 
                                            left join master_statuses as ad on la.activity_id = ad._id
                                            left join leads as l on la.lead_id = l._id
                                            where l.bd_id = ? and ad.status_type = "lead_follow_ups" and la.createdAt BETWEEN (?) AND (?)`,
        [String(element.bd_id), startDate, endDate]
      );

      const meetingResponsesQuery = `
                                          SELECT
                                          l.*,
                                          lt.status_name AS call_type_name,
                                          ls.status_name AS call_source_name,
                                          cs.status_name AS call_status_name
                                          FROM
                                          calls AS l
                                          LEFT JOIN
                                          master_statuses AS lt ON l.call_type_id = lt._id
                                          LEFT JOIN
                                          master_statuses AS ls ON l.call_mode_id = ls._id
                                          LEFT JOIN
                                          master_statuses AS cs ON l.call_status_id = cs._id
                                          WHERE
                                          l.bd_id = ? AND
                                          l.meeting_date_time BETWEEN (?) AND (?)
                                          `;

      const [meetingResponses] = await pool
        .promise()
        .execute(meetingResponsesQuery, [
          String(element.bd_id),
          startDate,
          endDate,
        ]);

      const proposalDataQuery = `
                                                        SELECT 
                                                        p.*,
                                                        JSON_ARRAYAGG(
                                                        JSON_OBJECT('_id',
                                                                        pd._id,
                                                                        'proposal_type_id',
                                                                        pd.proposal_type_id,
                                                                        'other_doc',
                                                                        pd.other_doc,
                                                                        'proposal',
                                                                        pd.proposal,
                                                                        'wbs',
                                                                        pd.wbs,
                                                                        'wireframe',
                                                                        pd.wireframe,
                                                                        'comment_remark',
                                                                        pd.comment_remark,
                                                                        'proposal_id',
                                                                        pd.proposal_id,
                                                                        'createdAt',
                                                                        pd.createdAt,
                                                                        'updatedAt',
                                                                        pd.updatedAt, "proposal_type" , ptd.status_name
                                                                        )) AS proposal
                                                    FROM
                                                        proposals AS p
                                                            LEFT JOIN
                                                        proposal_data AS pd ON p._id = pd.proposal_id
                                                        LEFT JOIN
                                                        master_statuses AS ptd ON pd.proposal_type_id = ptd._id
                                                    WHERE
                                                        p.bd_id = ? and
                                                        p.createdAt BETWEEN (?) AND (?)
                                                    GROUP BY p._id
                                                                                `;

      const [proposalData] = await pool
        .promise()
        .execute(proposalDataQuery, [
          String(element.bd_id),
          startDate,
          endDate,
        ]);

      const callsDataQuery = `
                                        SELECT
                                        *
                                        FROM
                                        followup_calls AS l
                                        WHERE
                                        l.bd_id = ? AND l.createdAt BETWEEN (?) AND (?)
`;

      const [callsData] = await pool
        .promise()
        .execute(callsDataQuery, [String(element.bd_id), startDate, endDate]);

      const responseCounts = {
        // _id: body.dsr_id,
        lead_positive_response: _.get(
          _.countBy(leadResponses, "response"),
          "1",
          0
        ),
        lead_negative_response: _.get(
          _.countBy(leadResponses, "response"),
          "2",
          0
        ),
        upwork_bids: _.get(
          _.countBy(leadAssigned, "lead_type_name"),
          "Upwork",
          0
        ),
        linkedin_response: _.get(
          _.countBy(leadResponses, (response) => {
            return (
              response.lead_source_name === "Self" &&
              response.lead_type_name === "LinkedIn"
            );
          }),
          true,
          0
        ),
        upwork_positive_response: _.get(
          _.countBy(leadResponses, (response) => {
            return (
              response.response === 1 &&
              response.lead_source_name === "Self" &&
              response.lead_type_name === "Upwork"
            );
          }),
          true,
          0
        ),
        lead_assigned: leadAssigned.length,
        follow_ups: followups.length,
        meeting_scheduled: meetingResponses.length,
        meeting_done: _.get(
          _.countBy(meetingResponses, "call_status_name"),
          "Meeting Done",
          0
        ),
        proposal_submitted: proposalData.length,
        estimation_submitted: _.get(
          _.countBy(proposalData, (data) => data.proposal[0].proposal_type),
          "Estimation",
          0
        ),
        understanding_queries_submitted: _.get(
          _.countBy(proposalData, (data) => data.proposal[0].proposal_type),
          "Understanding and Queries",
          0
        ),
        feature_list_shared: _.get(
          _.countBy(proposalData, (data) => data.proposal[0].proposal_type),
          "Features List",
          0
        ),
        phone_call_done: callsData.length,
        proposal_amount: _.sumBy(proposalData, (response) => {
          return response.proposal_submitted === "Yes" &&
            response.proposal[0].proposal_type === "Detailed Proposal"
            ? response.project_amount
            : 0;
        }),
      };

      const [update] = await pool.promise().execute(
        `update bddsrs set  
                            estimation_submitted = ?, 
                            feature_list_shared = ?, 
                            follow_ups = ?, 
                            lead_assigned = ?, 
                            lead_negative_response = ?, 
                            lead_positive_response = ?,
                            linkedin_response = ?, 
                            meeting_done = ?, 
                            meeting_scheduled = ?,       
                            phone_call_done = ?, 
                            proposal_amount = ?, 
                            proposal_submitted = ?, 
                            understanding_queries_submitted = ?, 
                            upwork_bids = ?, 
                            upwork_positive_response = ? 
                            where _id = ?`,
        [
          responseCounts.estimation_submitted,
          responseCounts.feature_list_shared,
          responseCounts.follow_ups,
          responseCounts.lead_assigned,
          responseCounts.lead_negative_response,
          responseCounts.lead_positive_response,
          responseCounts.linkedin_response,
          responseCounts.meeting_done,
          responseCounts.meeting_scheduled,
          responseCounts.phone_call_done,
          responseCounts.proposal_amount,
          responseCounts.proposal_submitted,
          responseCounts.understanding_queries_submitted,
          responseCounts.upwork_bids,
          responseCounts.upwork_positive_response,
          element._id,
        ]
      );
    }
    console.log("DSR update Done");
  } catch (err) {
    console.log("Error in Daily DSR Generator Cron Schedule. ", err);
  }
});

/** DSR send on email to BDE, CL and BH */
cron.schedule("10 0 * * *", async () => {
  try {
    const startDate =
      moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00";
    const endDate =
      moment().subtract(1, "day").format("YYYY-MM-DD") + " 23:59:59";
    /** bde dsrs */
    const [bdData] = await pool
      .promise()
      .execute(
        `SELECT * FROM businesses where status = ? order by createdAt DESC`,
        ["1"]
      );
    for (let i = 0; i < bdData.length; i++) {
      const element = bdData[i];

      const query = `select dsr.*, 
                            json_object("_id", bd._id, 
                                "email", bd.email, 
                                "username", bd.username, 
                                "name", bd.name, 
                                "emp_id", bd.emp_id) as bd_id 
                            from bddsrs as dsr 
                    left join businesses as bd on dsr.bd_id = bd._id 
                    where dsr.bd_id = ? AND dsr.createdAt BETWEEN ? AND ?`;

      const [[data]] = await pool
        .promise()
        .execute(query, [element._id, startDate, endDate]);
      if (data) {
        await SendMail(
          element.email,
          `Daily Status Report ${moment()
            .subtract(1, "day")
            .format("DD-MMM-YYYY")} ${element.name} BDE`,
          moment().subtract(1, "day").startOf("day"),
          data,
          1
        );
      }
    }

    // /** CL dsrs */

    // const clData = await clusterLeadModel
    //   .find({
    //     status: "1",
    //   })
    //   .sort({
    //     createdAt: -1,
    //   });

    // for (let j = 0; j < clData.length; j++) {
    //   const element = clData[j];
    //   const todayCLDsr = await dsrModel.aggregate([
    //     {
    //       $match: {
    //         cluster_lead_id: new mongoose.Types.ObjectId(element._id),
    //         createdAt: {
    //           $gte: new Date(moment().subtract(1, "day").startOf("day")),
    //           $lt: new Date(moment().subtract(1, "day").endOf("day")),
    //         },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "cluster_leads",
    //         localField: "cluster_lead_id",
    //         foreignField: "_id",
    //         as: "clusterLeadData",
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: null,
    //         lead_positive_response: { $sum: "$lead_positive_response" },
    //         lead_negative_response: { $sum: "$lead_negative_response" },
    //         upwork_bids: { $sum: "$upwork_bids" },
    //         linkedin_response: { $sum: "$linkedin_response" },
    //         upwork_positive_response: { $sum: "$upwork_positive_response" },
    //         lead_assigned: { $sum: "$lead_assigned" },
    //         follow_ups: { $sum: "$follow_ups" },
    //         meeting_scheduled: { $sum: "$meeting_scheduled" },
    //         meeting_done: { $sum: "$meeting_done" },
    //         proposal_submitted: { $sum: "$proposal_submitted" },
    //         estimation_submitted: { $sum: "$estimation_submitted" },
    //         understanding_queries_submitted: {
    //           $sum: "$understanding_queries_submitted",
    //         },
    //         feature_list_shared: { $sum: "$feature_list_shared" },
    //         phone_call_done: { $sum: "$phone_call_done" },
    //         proposal_amount: { $sum: "$proposal_amount" },
    //         linkedin_messages: { $sum: "$linkedin_messages" },
    //         bd_id: { $first: "$clusterLeadData" },
    //         date: { $first: "$createdAt" },
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         lead_positive_response: 1,
    //         lead_negative_response: 1,
    //         upwork_bids: 1,
    //         linkedin_response: 1,
    //         upwork_positive_response: 1,
    //         lead_assigned: 1,
    //         follow_ups: 1,
    //         meeting_scheduled: 1,
    //         meeting_done: 1,
    //         proposal_submitted: 1,
    //         estimation_submitted: 1,
    //         understanding_queries_submitted: 1,
    //         feature_list_shared: 1,
    //         phone_call_done: 1,
    //         proposal_amount: 1,
    //         linkedin_messages: 1,
    //         bd_id: { $arrayElemAt: ["$bd_id", 0] },
    //         date: 1,
    //       },
    //     },
    //   ]);

    //   await SendMail(
    //     element.email,
    //     `Daily Status Report ${moment()
    //       .subtract(1, "day")
    //       .format("DD-MMM-YYYY")} ${element.name} CL`,
    //     moment().subtract(1, "day").startOf("day"),
    //     todayCLDsr[0],
    //     1
    //   );
    // }

    /** BH dsrs */

    const [bhData] = await pool
      .promise()
      .execute(
        `SELECT * FROM clusters where status = ? order by createdAt DESC`,
        ["1"]
      );

    for (let j = 0; j < bhData.length; j++) {
      const element = bhData[j];
      const [[todayCLDsr]] = await pool.promise().execute(
        `SELECT
                  SUM(lead_positive_response) AS lead_positive_response,
                  SUM(lead_negative_response) AS lead_negative_response,
                  SUM(upwork_bids) AS upwork_bids,
                  SUM(linkedin_response) AS linkedin_response,
                  SUM(upwork_positive_response) AS upwork_positive_response,
                  SUM(lead_assigned) AS lead_assigned,
                  SUM(follow_ups) AS follow_ups,
                  SUM(meeting_scheduled) AS meeting_scheduled,
                  SUM(meeting_done) AS meeting_done,
                  SUM(proposal_submitted) AS proposal_submitted,
                  SUM(estimation_submitted) AS estimation_submitted,
                  SUM(understanding_queries_submitted) AS understanding_queries_submitted,
                  SUM(feature_list_shared) AS feature_list_shared,
                  SUM(phone_call_done) AS phone_call_done,
                  SUM(proposal_amount) AS proposal_amount,
                  SUM(linkedin_messages) AS linkedin_messages,
                  -- (SELECT bd.name FROM clusters as bd WHERE bd._id = dsr.cluster_head_id) AS bd_id,-- 
                  DATE(dsr.createdAt) AS date,
                  json_object("_id", bd._id, 
                                      "email", bd.email, 
                                      "username", bd.username, 
                                      "name", bd.name, 
                                      "emp_id", bd.emp_id) as bd_id 
              FROM
                  bddsrs as dsr
            LEFT JOIN clusters AS bd ON bd._id = dsr.cluster_head_id
              WHERE
                  dsr.createdAt between ? AND ?
                  AND dsr.cluster_head_id = ?
              GROUP BY
                  DATE(dsr.createdAt), bd._id;`,
        [startDate, endDate, element._id]
      );

      await SendMail(
        element.email,
        `Daily Status Report ${moment()
          .subtract(1, "day")
          .format("DD-MMM-YYYY")} ${element.name} BH`,
        moment().subtract(1, "day").startOf("day"),
        todayCLDsr,
        1
      );
    }
  } catch (error) {
    console.log(error);
  }
});

/** DSR bulk dsrs send to cl and bh  */
cron.schedule("20 0 * * *", async () => {
  try {
    const startDate =
      moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00";
    const endDate =
      moment().subtract(1, "day").format("YYYY-MM-DD") + " 23:59:59";
    // const clData = await clusterLeadModel
    //   .find({
    //     status: "1",
    //   })
    //   .sort({
    //     createdAt: -1,
    //   });

    // for (let i = 0; i < clData.length; i++) {
    //   const element = clData[i];
    //   const todayCLBDDsr = await dsrModel.aggregate([
    //     {
    //       $match: {
    //         cluster_lead_id: new mongoose.Types.ObjectId(element._id),
    //         createdAt: {
    //           $gte: new Date(moment().subtract(1, "day").startOf("day")),
    //           $lt: new Date(moment().subtract(1, "day").endOf("day")),
    //         },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "businesses",
    //         localField: "bd_id",
    //         foreignField: "_id",
    //         as: "bdData",
    //       },
    //     },
    //     {
    //       $unwind: "$bdData",
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         lead_positive_response: 1,
    //         lead_negative_response: 1,
    //         upwork_bids: 1,
    //         linkedin_response: 1,
    //         upwork_positive_response: 1,
    //         lead_assigned: 1,
    //         follow_ups: 1,
    //         meeting_scheduled: 1,
    //         meeting_done: 1,
    //         proposal_submitted: 1,
    //         estimation_submitted: 1,
    //         understanding_queries_submitted: 1,
    //         feature_list_shared: 1,
    //         phone_call_done: 1,
    //         proposal_amount: 1,
    //         linkedin_messages: 1,
    //         bd_id: "$bdData",
    //         date: 1,
    //       },
    //     },
    //   ]);

    //   await SendMail(
    //     element.email,
    //     `Daily Status Report ${moment()
    //       .subtract(1, "day")
    //       .format("DD-MMM-YYYY")} ${element.name} CL`,
    //     moment().subtract(1, "day").startOf("day"),
    //     todayCLBDDsr,
    //     2
    //   );
    // }

    /** BH dsrs */

    const [bhData] = await pool
      .promise()
      .execute(
        `SELECT * FROM clusters where status = ? order by createdAt DESC`,
        ["1"]
      );

    for (let j = 0; j < bhData.length; j++) {
      const element = bhData[j];
      const [todayCLBDDsr] = await pool.promise().execute(
        `SELECT
        SUM(lead_positive_response) AS lead_positive_response,
        SUM(lead_negative_response) AS lead_negative_response,
        SUM(upwork_bids) AS upwork_bids,
        SUM(linkedin_response) AS linkedin_response,
        SUM(upwork_positive_response) AS upwork_positive_response,
        SUM(lead_assigned) AS lead_assigned,
        SUM(follow_ups) AS follow_ups,
        SUM(meeting_scheduled) AS meeting_scheduled,
        SUM(meeting_done) AS meeting_done,
        SUM(proposal_submitted) AS proposal_submitted,
        SUM(estimation_submitted) AS estimation_submitted,
        SUM(understanding_queries_submitted) AS understanding_queries_submitted,
        SUM(feature_list_shared) AS feature_list_shared,
        SUM(phone_call_done) AS phone_call_done,
        SUM(proposal_amount) AS proposal_amount,
        SUM(linkedin_messages) AS linkedin_messages,
        json_object("_id", bd._id, 
                                    "email", bd.email, 
                                    "username", bd.username, 
                                    "name", bd.name, 
                                    "emp_id", bd.emp_id) as bd_id ,
        DATE(dsr.createdAt) AS date
    FROM
       bddsrs dsr
    left JOIN
        businesses AS bd ON dsr.bd_id = bd._id
    WHERE
        dsr.createdAt between ? AND ?
        AND dsr.cluster_head_id = ?
    GROUP BY
        dsr.bd_id, dsr.createdAt;`,
        [startDate, endDate, element._id]
      );

      await SendMail(
        element.email,
        `Daily Status Report ${moment()
          .subtract(1, "day")
          .format("DD-MMM-YYYY")} ${element.name} BH`,
        moment().subtract(1, "day").startOf("day"),
        todayCLBDDsr,
        2
      );
    }
  } catch (error) {
    console.log(error);
  }
});

const xlsxCallingSheetCLDaily = async () => {
  try {
    let data = await callModel
      .find({})
      .populate("call_type_id call_mode_id call_status_id")
      .populate({
        path: "lead_id",
        populate: {
          path: "lead_source_id lead_type_id lead_status",
        },
      })
      .populate({
        path: "bd_id",
        populate: [
          { path: "cluster_head_id", populate: "branch_id" },
          { path: "cluster_lead_id" },
        ],
      })
      .sort({ createdAt: -1 })
      .limit(25);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Data", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    // Initialize the row index
    let rowIndex = 1;

    let row = worksheet.getRow(rowIndex);
    row.values = [
      "Date",
      "Branch",
      "Source",
      "Branch Head",
      "Project Expert 1",
      "Project Expert 2",
      "Channel Partner",
      "BD Name",
      "Project Name / Meeting Agenda",
      "Client Name",
      "TYPE OF CALL",
      "Meeting Time",
      "Country",
      "Client Confirmation for Meeting",
      "Meeting Invite Sent",
      "Status",
      "Mode of Call",
      "Comments (If Yes)",
      "Subregion",
    ];
    row.font = { bold: true };

    const columnWidths = [
      15, 15, 10, 20, 20, 20, 20, 20, 30, 25, 20, 15, 15, 30, 20, 25, 15, 40,
      15,
    ];

    row.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidths[columnIndex];
      worksheet.getColumn(colNumber).width = columnWidth;
    });
    worksheet.getCell("A1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("B1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    worksheet.getCell("C1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    worksheet.getCell("D1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    worksheet.getCell("E1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    worksheet.getCell("F1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    worksheet.getCell("G1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    worksheet.getCell("H1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    worksheet.getCell("I1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("J1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("K1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("L1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("M1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("N1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("O1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("P1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("Q1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "56EEDA" },
    };
    worksheet.getCell("R1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "74EE56" },
    };
    worksheet.getCell("S1").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "CBA217" },
    };
    await Promise.all(
      data.map(async (task, index) => {
        // console.log(task?.bd_id?.cluster_head_id?.branch_id);
        const row = worksheet.getRow(rowIndex + index + 1);
        const date = moment(task?.meeting_date_time).format("DD-MMM-YYYY");
        const time = moment(task?.meeting_date_time).format("HH:mm");
        row.getCell("A").value = date;
        row.getCell("B").value =
          task?.bd_id?.cluster_head_id?.branch_id?.branch_name;
        row.getCell("C").value = task?.lead_id?.lead_source_id?.status_name;
        row.getCell("D").value = task?.bd_id?.cluster_head_id?.name;
        row.getCell("E").value = task?.pe_name;
        row.getCell("F").value = task?.pe_name1;
        row.getCell("G").value = "";
        row.getCell("H").value = task?.bd_id?.name;
        row.getCell("I").value = task?.comment_remark;
        row.getCell("J").value =
          task?.lead_id?.client_name != ""
            ? task?.lead_id?.client_name
            : task?.lead_id?.company_name;
        row.getCell("K").value = task?.call_type_id?.status_name;
        row.getCell("L").value = time;
        row.getCell("M").value = task?.lead_id?.client_country;
        row.getCell("N").value = "Yes";
        row.getCell("O").value = "Yes";
        row.getCell("P").value = task?.call_status_id?.status_name;
        row.getCell("Q").value = task?.call_mode_id?.status_name;
        row.getCell("R").value = task?.comment_remark;
        row.getCell("S").value = "";

        for (let col = 1; col <= 18; col++) {
          row.getCell(col).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb:
                task?.call_status_id?.status_name === "Meeting Done"
                  ? "60E412"
                  : task?.call_status_id?.status_name === "Meeting Re-Scheduled"
                  ? "F93D39"
                  : task?.call_status_id?.status_name === "Meeting Cancelled"
                  ? "FCE93B"
                  : task?.call_status_id?.status_name === "Meeting Scheduled"
                  ? "FFFFFFFF"
                  : "FFFFFFFF",
            },
          };
        }
      })
    );

    rowIndex += data.length;

    const borderStyle = {
      style: "thin",
      color: { argb: "00000000" },
    };

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const filePath = "callingsheet.xlsx";
    fs.writeFileSync(filePath, buffer);

    console.log(`Excel file '${filePath}' saved successfully.`);
  } catch (err) {
    console.log(err);
  }
};

const projectionSheet = async () => {
  try {
    const data = await proposalModel.aggregate([
      {
        $match: {
          // createdAt: {
          //   $gte: new Date(moment("2024-03-01").startOf("month")),
          //   $lte: new Date(moment("2024-03-01").endOf("month")),
          // },
          // proposal_submitted: "Yes",
        },
      },
      {
        $lookup: {
          from: "leads",
          localField: "lead_id",
          foreignField: "_id",
          as: "leadsData",
        },
      },
      {
        $unwind: {
          path: "$leadsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "businesses",
          localField: "bd_id",
          foreignField: "_id",
          as: "businessData",
        },
      },
      {
        $unwind: {
          path: "$businessData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.lead_status",
          foreignField: "_id",
          as: "leadStatusData",
        },
      },
      {
        $unwind: {
          path: "$leadStatusData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.projection_status",
          foreignField: "_id",
          as: "proStatusData",
        },
      },
      {
        $unwind: {
          path: "$proStatusData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "rfps",
          localField: "lead_id",
          foreignField: "lead_id",
          as: "rfpData",
        },
      },
      {
        $unwind: {
          path: "$rfpData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "leadStatusData.status_name": "Prospect",
          // "proStatusData.status_name": { $ne: "Not In Projection" },
          // "leadsData.bd_id": new mongoose.Types.ObjectId(
          //   "656f2ad09c4f6d4c72426e1d"
          // ),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    const workbook = new ExcelJS.Workbook();
    const worksheetProspect = workbook.addWorksheet("Projection Sheet", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndexProspect = 1;
    let firstRowProspect = worksheetProspect.getRow(rowIndexProspect);
    // firstRowProspect.getCell(
    //   1
    // ).value = `Projection Sheet - ${data[0]?.bdData?.name}`;
    firstRowProspect.font = { bold: true };
    worksheetProspect.mergeCells("A1:L1");

    let rowProspect = worksheetProspect.getRow(rowIndexProspect);
    rowProspect.values = [
      "Date",
      "Cluster Lead",
      "BD Name",
      "Project Name",
      "Client Name",
      "Country",
      "Expected Upfront Amount (USD)",
      "Expected Project Amount (USD)",
      "Lead Status",
      "Confirmation Percentage",
      "BA Name",
      "Current Status / Remarks",
    ];
    rowProspect.font = { bold: true };

    const columnWidthsProspect = [
      15, 20, 20, 35, 20, 15, 35, 35, 20, 25, 20, 40,
    ];

    rowProspect.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidthsProspect[columnIndex];
      worksheetProspect.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    const row2Prospect = worksheetProspect.getRow(1);
    row2Prospect.height = 40;

    for (let col = 1; col <= 12; col++) {
      // const cell2 = worksheetProspect.getCell(2, col);
      const cell1 = worksheetProspect.getCell(1, col);
      cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "43fafa" },
      };
    }
    await Promise.all(
      data?.map(async (task, index) => {
        const rowProspect = worksheetProspect.getRow(
          rowIndexProspect + index + 1
        );
        rowProspect.getCell("A").alignment = { horizontal: "left" };
        rowProspect.getCell("G").alignment = { horizontal: "center" };
        rowProspect.getCell("H").alignment = { horizontal: "center" };
        rowProspect.getCell("I").alignment = { horizontal: "center" };
        rowProspect.getCell("J").alignment = { horizontal: "center" };

        rowProspect.getCell("A").value = moment(
          task?.leadsData?.assign_date
        ).format("DD/MM/YYYY");
        rowProspect.getCell("B").value = "";
        rowProspect.getCell("C").value = task?.businessData?.name;
        rowProspect.getCell("D").value = task?.project_name;
        rowProspect.getCell("E").value = task?.leadsData?.client_name;
        rowProspect.getCell("F").value = task?.leadsData?.client_country;
        rowProspect.getCell("G").value = "$" + task?.upfront_amount;
        rowProspect.getCell("H").value = "$" + task?.project_amount;
        rowProspect.getCell("I").value = task?.proStatusData?.status_name;
        rowProspect.getCell("J").value = "0%";
        rowProspect.getCell("K").value = task?.rfpData?.rfp[0]?.pe_name;
        rowProspect.getCell("L").value = task?.proposal[0]?.comment_remark;
      })
    );

    rowIndexProspect += data.length;
    const borderStyleProspect = { style: "thin", color: { argb: "00000000" } };

    worksheetProspect.eachRow((rowProspect, rowNumber) => {
      rowProspect.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyleProspect,
          bottom: borderStyleProspect,
          right: borderStyleProspect,
          left: borderStyleProspect,
        };
      });
    });

    workbook.xlsx
      .writeFile("projectionsheet.xlsx")
      .then(() =>
        console.log("Excel file 'tasks_data.xlsx' saved successfully.")
      )
      .catch((error) => console.error("Error saving Excel file:", error));
  } catch (err) {
    console.log(err);
  }
};

const WMBDTeamDSRYearly = async () => {
  try {
    const data = [];
    const workbook = new ExcelJS.Workbook();
    const branchList = await clusterModel.find({ status: "1" });
    for (let i = 0; i < branchList.length; i++) {
      const element = branchList[i];
      const worksheetProspect = workbook.addWorksheet(
        `${element.name} BD Team`,
        {
          pageSetup: { paperSize: 9, orientation: "landscape" },
        }
      );

      let rowIndexProspect = 1;
      let firstRowProspect = worksheetProspect.getRow(rowIndexProspect);

      firstRowProspect.height = 60;
      firstRowProspect.font = { bold: true };
      firstRowProspect.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      let rowProspect = worksheetProspect.getRow(rowIndexProspect);
      rowProspect.values = [
        "Date",
        "Branch_Name",
        "BD_Name",
        "Successful Meetings",
        "Proposal Submitted",
        "Proposal Amount (in $)",
        "Project Closed (Num)",
        "Payment Received (in $)",
        "Sales Navigator (Sub.)",
        "Sales Navigator (Positive Resp.)",
        "Open Messages (Sub.)",
        "Open Messages (Positive Resp.)",
        "Upwork (Sub.)",
        "Upwork (Positive Resp.)",
        "Mobile App (Internal)",
        "Mobile App (External)",
        "Game App (Internal)",
        "Game App (External)",
        "Web Design (Internal)",
        "Web Design (External)",
        "Digital Markt. (Internal)",
        "Digital Markt. (External)",
        "Cyber Security Services (Internal)",
        "Cyber Security Services (External)",
        "Blockchain App Development (Internal)",
        "Blockchain App Development (External)",
        "Salesforce App Development (Internal)",
        "Salesforce App Development (External)",
        "Fintech Services (Internal)",
        "Fintech Services (External)",
        "Total Leads",
        "Leads with Numbers",
        "Daily Follow Up (Outlook)",
        "Daily Follow Up (Gmail)",
        "Response Received (Num)",
        "Followup Calls (Num)",
        "Email (Negative Resp.)",
        "Lead Returned",
      ];
      rowProspect.font = { bold: true };

      const columnWidthsProspect = [
        15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        15, 15,
      ];

      rowProspect.eachCell((cell, colNumber) => {
        const columnIndex = colNumber - 1;
        const columnWidth = columnWidthsProspect[columnIndex];
        worksheetProspect.getColumn(colNumber).width = columnWidth;
        // cell.alignment = { wrapText: true };
      });

      worksheetProspect.getCell("A1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "43FAFA" },
      };
      worksheetProspect.getCell("B1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD966" },
      };
      worksheetProspect.getCell("C1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "B7E1CD" },
      };
      worksheetProspect.getCell("D1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9EA3D" },
      };
      worksheetProspect.getCell("E1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9EA3D" },
      };
      worksheetProspect.getCell("F1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9EA3D" },
      };
      worksheetProspect.getCell("G1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9EA3D" },
      };
      worksheetProspect.getCell("H1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D9EA3D" },
      };
      worksheetProspect.getCell("I1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "43FAFA" },
      };
      worksheetProspect.getCell("J1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6FE53F" },
      };
      worksheetProspect.getCell("K1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "43FAFA" },
      };
      worksheetProspect.getCell("L1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6FE53F" },
      };
      worksheetProspect.getCell("M1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "43FAFA" },
      };
      worksheetProspect.getCell("N1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6FE53F" },
      };
      worksheetProspect.getCell("O1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("P1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("Q1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("R1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("S1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("T1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("U1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("V1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("W1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("X1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("Y1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("Z1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("AA1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("AB1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("AC1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE599" },
      };
      worksheetProspect.getCell("AD1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "EAD1DC" },
      };
      worksheetProspect.getCell("AE1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FD9B3B" },
      };
      worksheetProspect.getCell("AF1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "3C78D8" },
      };
      worksheetProspect.getCell("AG1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "43FAFA" },
      };
      worksheetProspect.getCell("AH1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "43FAFA" },
      };
      worksheetProspect.getCell("AI1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6FE53F" },
      };
      worksheetProspect.getCell("AJ1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6FE53F" },
      };
      worksheetProspect.getCell("AK1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6FE53F" },
      };
      worksheetProspect.getCell("AL1").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "6FE53F" },
      };

      for (let col = 1; col <= 38; col++) {
        worksheetProspect.getColumn(col).alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
      }

      await Promise.all(
        data?.map(async (task, index) => {
          const rowProspect = worksheetProspect.getRow(
            rowIndexProspect + index + 1
          );

          rowProspect.getCell("A").value = moment(
            task?.leadsData?.assign_date
          ).format("DD/MM/YYYY");
          rowProspect.getCell("B").value = "";
          rowProspect.getCell("C").value = task?.businessData?.name;
          rowProspect.getCell("D").value = task?.project_name;
          rowProspect.getCell("E").value = task?.leadsData?.client_name;
          rowProspect.getCell("F").value = task?.leadsData?.client_country;
          rowProspect.getCell("G").value = "$" + task?.upfront_amount;
          rowProspect.getCell("H").value = "$" + task?.project_amount;
          rowProspect.getCell("I").value = task?.proStatusData?.status_name;
          rowProspect.getCell("J").value = "0%";
          rowProspect.getCell("K").value = "";
          rowProspect.getCell("L").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("M").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("N").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("O").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("P").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("Q").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("R").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("S").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("T").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("U").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("V").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("W").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("X").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("Y").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("Z").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AA").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AB").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AC").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AD").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AE").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AF").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AG").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AH").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AI").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AJ").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AK").value = task?.proposal[0]?.comment_remark;
          rowProspect.getCell("AL").value = task?.proposal[0]?.comment_remark;
        })
      );

      rowIndexProspect += data.length;
      const borderStyleProspect = {
        style: "thin",
        color: { argb: "00000000" },
      };

      worksheetProspect.eachRow((rowProspect, rowNumber) => {
        rowProspect.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.border = {
            top: borderStyleProspect,
            bottom: borderStyleProspect,
            right: borderStyleProspect,
            left: borderStyleProspect,
          };
          cell.alignment = {
            horizontal: "center",
            vertical: "middle",
            wrapText: true,
          };
        });
      });
    }
    workbook.xlsx
      .writeFile("WM_BD_team_DSR.xlsx")
      .then(() =>
        console.log("Excel file 'tasks_data.xlsx' saved successfully.")
      )
      .catch((error) => console.error("Error saving Excel file:", error));
  } catch (err) {
    console.log(err);
  }
};

const bdIndividualDsr = async () => {
  try {
    const dataDsr = await leadActivityModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(moment("2024-03-01").startOf("month")),
            $lte: new Date(moment("2024-03-01").endOf("month")),
          },
        },
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
        $match: {
          "activityData.status_type": "lead_follow_ups",
        },
      },
      {
        $lookup: {
          from: "leads",
          localField: "lead_id",
          foreignField: "_id",
          as: "leadsData",
        },
      },
      {
        $unwind: {
          path: "$leadsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "leadsData.bd_id": new mongoose.Types.ObjectId(
            "656f2ad09c4f6d4c72426e1d"
          ),
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.lead_type_id",
          foreignField: "_id",
          as: "leadTypeData",
        },
      },
      {
        $unwind: {
          path: "$leadTypeData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.lead_source_id",
          foreignField: "_id",
          as: "leadSourceData",
        },
      },
      {
        $unwind: {
          path: "$leadSourceData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$lead_id",
          data: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    const bdData = await bdModel.findById("656f2ad09c4f6d4c72426e1d");
    const workbook = new ExcelJS.Workbook();

    /** DSR EMAIL SHEET */

    const worksheet = workbook.addWorksheet("DSR Email", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndex = 1;
    let firstRow = worksheet.getRow(rowIndex);
    firstRow.getCell(1).value = bdData.name;
    firstRow.font = { bold: true };
    worksheet.mergeCells("A1:Q1");

    let row = worksheet.getRow(rowIndex + 1);
    row.values = [
      "Date",
      "Client Name",
      "Email id",
      "Country",
      "Phone number",
      "Project Type",
      "Lead Source",
      "Intro Mail",
      "1st Follow up",
      "2nd Follow up",
      "3rd Follow up",
      "4th Follow up",
      "5th Follow up",
      "6th Follow up",
      "7th Follow up",
      "8th Follow up",
      "Status",
    ];
    row.font = { bold: true };

    const columnWidths = [
      15, 30, 30, 20, 25, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 20,
    ];

    row.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidths[columnIndex];
      worksheet.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    const row2 = worksheet.getRow(1);
    row2.height = 40;

    for (let col = 1; col <= 17; col++) {
      const cell2 = worksheet.getCell(2, col);
      const cell1 = worksheet.getCell(1, col);
      cell2.fill = cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    }

    await Promise.all(
      dataDsr?.map(async (task, index) => {
        const introMail = task?.data.find(
          (obj) => obj?.activityData?.status_name === "Intro Mail"
        );
        const follow1 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "1st follow up"
        );
        const follow2 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "2nd follow up"
        );
        const follow3 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "3rd follow up"
        );
        const follow4 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "4th follow up"
        );
        const follow5 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "5th follow up"
        );
        const follow6 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "6th follow up"
        );
        const follow7 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "7th follow up"
        );
        const follow8 = task?.data.find(
          (obj) => obj?.activityData?.status_name === "8th follow up"
        );
        const row = worksheet.getRow(rowIndex + index + 2);
        row.getCell("A").value = moment(
          task?.data[0]?.leadsData?.assign_date
        ).format("DD/MM/YYYY");
        row.getCell("B").value = task?.data[0]?.leadsData?.client_name;
        row.getCell("C").value = task?.data[0]?.leadsData?.client_email;
        row.getCell("D").value = task?.data[0]?.leadsData?.client_country;
        row.getCell("E").value = task?.data[0]?.leadsData?.client_number;
        row.getCell("F").value = task?.data[0]?.leadTypeData?.status_name;
        row.getCell("G").value = task?.data[0]?.leadSourceData?.status_name;
        row.getCell("H").value = introMail ? introMail.createdAt : "";
        row.getCell("I").value = follow1 ? follow1.createdAt : "";
        row.getCell("J").value = follow2 ? follow2.createdAt : "";
        row.getCell("K").value = follow3 ? follow3.createdAt : "";
        row.getCell("L").value = follow4 ? follow4.createdAt : "";
        row.getCell("M").value = follow5 ? follow5.createdAt : "";
        row.getCell("N").value = follow6 ? follow6.createdAt : "";
        row.getCell("O").value = follow7 ? follow7.createdAt : "";
        row.getCell("P").value = follow8 ? follow8.createdAt : "";
        row.getCell("Q").value = task?.data.at(-1)?.comment[0]?.comment;
      })
    );

    rowIndex += dataDsr.length;
    const borderStyle = { style: "thin", color: { argb: "00000000" } };

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
          left: borderStyle,
        };
      });
    });

    /** WORKSHEET  Calling */

    const dataCalling = await callModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(moment("2024-03-01").startOf("month")),
            $lte: new Date(moment("2024-03-01").endOf("month")),
          },
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
          from: "leads",
          localField: "lead_id",
          foreignField: "_id",
          as: "leadsData",
        },
      },
      {
        $unwind: {
          path: "$leadsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "leadsData.bd_id": new mongoose.Types.ObjectId(
            "656f2ad09c4f6d4c72426e1d"
          ),
        },
      },
      {
        $lookup: {
          from: "call_activities",
          localField: "_id",
          foreignField: "call_id",
          as: "callsActData",
        },
      },
      {
        $group: {
          _id: "$lead_id",
          data: {
            $push: "$$ROOT",
          },
        },
      },
    ]);

    const worksheetCalling = workbook.addWorksheet("Calling", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndexCalling = 1;
    let firstRowCalling = worksheetCalling.getRow(rowIndexCalling);
    firstRowCalling.getCell(1).value = bdData.name;
    firstRowCalling.font = { bold: true };
    worksheetCalling.mergeCells("A1:01");

    let rowCalling = worksheetCalling.getRow(rowIndexCalling + 1);
    rowCalling.values = [
      "Date",
      "Client Name",
      "Email id",
      "Country",
      "Phone number",
      "Intro Call",
      "1 Call",
      "2 Call",
      "3 Call",
      "4 Call",
      "5 Call",
      "6 Call",
      "7 Call",
      "8 Call",
      "Status",
    ];
    rowCalling.font = { bold: true };

    const columnWidthsCalling = [
      15, 30, 30, 20, 25, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 20,
    ];

    rowCalling.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidthsCalling[columnIndex];
      worksheetCalling.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    const row2Calling = worksheetCalling.getRow(1);
    row2Calling.height = 40;

    for (let col = 1; col <= 15; col++) {
      const cell2 = worksheetCalling.getCell(2, col);
      const cell1 = worksheetCalling.getCell(1, col);
      cell2.fill = cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    }

    await Promise.all(
      dataCalling?.map(async (task, index) => {
        const initial = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "Initial"
        );
        const call1 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "1st Call"
        );
        const call2 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "2nd Call"
        );
        const call3 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "3rd Call"
        );
        const call4 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "4th Call"
        );
        const call5 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "5th Call"
        );
        const call6 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "6th Call"
        );
        const call7 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "7th Call"
        );
        const call8 = task?.data.find(
          (obj) => obj?.callTypeData?.status_name === "8th Call"
        );
        const rowCalling = worksheetCalling.getRow(rowIndexCalling + index + 2);
        rowCalling.getCell("A").value = moment(
          task?.data[0]?.leadsData?.assign_date
        ).format("DD/MM/YYYY");
        rowCalling.getCell("B").value = task?.data[0]?.leadsData?.client_name;
        rowCalling.getCell("C").value = task?.data[0]?.leadsData?.client_email;
        rowCalling.getCell("D").value =
          task?.data[0]?.leadsData?.client_country;
        rowCalling.getCell("E").value = task?.data[0]?.leadsData?.client_number;
        rowCalling.getCell("F").value = initial
          ? initial.meeting_date_time
          : "";
        rowCalling.getCell("G").value = call1 ? call1.meeting_date_time : "";
        rowCalling.getCell("H").value = call2 ? call2.meeting_date_time : "";
        rowCalling.getCell("I").value = call3 ? call3.meeting_date_time : "";
        rowCalling.getCell("J").value = call4 ? call4.meeting_date_time : "";
        rowCalling.getCell("K").value = call5 ? call5.meeting_date_time : "";
        rowCalling.getCell("L").value = call6 ? call6.meeting_date_time : "";
        rowCalling.getCell("M").value = call7 ? call7.meeting_date_time : "";
        rowCalling.getCell("N").value = call8 ? call8.meeting_date_time : "";
        rowCalling.getCell("O").value = task?.data
          .at(-1)
          ?.callsActData.at(-1)?.comment[0]?.comment;
      })
    );

    rowIndexCalling += dataCalling.length;
    const borderStyleCalling = { style: "thin", color: { argb: "00000000" } };

    worksheetCalling.eachRow((rowCalling, rowNumber) => {
      rowCalling.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyleCalling,
          bottom: borderStyleCalling,
          right: borderStyleCalling,
          left: borderStyleCalling,
        };
      });
    });

    /** PROPOSAL SHEET  */

    const proposalSheetData = await proposalModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(moment("2024-03-01").startOf("month")),
            $lte: new Date(moment("2024-03-01").endOf("month")),
          },
          proposal_submitted: "Yes",
        },
      },
      {
        $lookup: {
          from: "leads",
          localField: "lead_id",
          foreignField: "_id",
          as: "leadsData",
        },
      },
      {
        $unwind: {
          path: "$leadsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "businesses",
          localField: "bd_id",
          foreignField: "_id",
          as: "businessData",
        },
      },
      {
        $unwind: {
          path: "$businessData",
          preserveNullAndEmptyArrays: true,
        },
      },
      // {
      //   $match: {
      //     "leadsData.bd_id": new mongoose.Types.ObjectId(
      //       "656f2ad09c4f6d4c72426e1d"
      //     ),
      //   },
      // },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const worksheetProposal = workbook.addWorksheet("Proposal", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndexProposal = 1;
    let firstRowProposal = worksheetProposal.getRow(rowIndexProposal);
    firstRowProposal.getCell(1).value = bdData.name;
    firstRowProposal.font = { bold: true };
    worksheetProposal.mergeCells("A1:I1");

    let rowProposal = worksheetProposal.getRow(rowIndexProposal + 1);
    rowProposal.values = [
      "S.No",
      "Client Name",
      "Country",
      "BD Name",
      "Mail id",
      "Project name",
      "Project Amount",
      "Upfront amount",
      "Status",
    ];
    rowProposal.font = { bold: true };

    const columnWidthsProposal = [10, 25, 25, 25, 25, 25, 25, 25, 40];

    rowProposal.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidthsProposal[columnIndex];
      worksheetProposal.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    const row2Proposal = worksheetProposal.getRow(1);
    row2Proposal.height = 40;

    for (let col = 1; col <= 9; col++) {
      const cell2 = worksheetProposal.getCell(2, col);
      const cell1 = worksheetProposal.getCell(1, col);
      cell2.fill = cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    }
    await Promise.all(
      proposalSheetData?.map(async (task, index) => {
        const rowProposal = worksheetProposal.getRow(
          rowIndexProposal + index + 2
        );
        rowProposal.getCell("A").alignment = { horizontal: "left" };
        rowProposal.getCell("G").alignment = { horizontal: "center" };
        rowProposal.getCell("H").alignment = { horizontal: "center" };

        rowProposal.getCell("A").value = index + 1;
        rowProposal.getCell("B").value = task?.leadsData?.client_name;
        rowProposal.getCell("C").value = task?.leadsData?.client_country;
        rowProposal.getCell("D").value = task?.businessData?.name;
        rowProposal.getCell("E").value = task?.leadsData?.client_email;
        rowProposal.getCell("F").value = task?.project_name;
        rowProposal.getCell("G").value = "$" + task?.project_amount;
        rowProposal.getCell("H").value = "$" + task?.upfront_amount;
        rowProposal.getCell("I").value = task?.proposal[0]?.comment_remark;
      })
    );

    rowIndexProposal += proposalSheetData.length;
    const borderStyleProposal = { style: "thin", color: { argb: "00000000" } };

    worksheetProposal.eachRow((rowProposal, rowNumber) => {
      rowProposal.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyleProposal,
          bottom: borderStyleProposal,
          right: borderStyleProposal,
          left: borderStyleProposal,
        };
      });
    });

    /** PROPOSAL SHEET  */

    const ProspectSheetData = await proposalModel.aggregate([
      {
        $match: {
          // createdAt: {
          //   $gte: new Date(moment("2024-03-01").startOf("month")),
          //   $lte: new Date(moment("2024-03-01").endOf("month")),
          // },
          // proposal_submitted: "Yes",
        },
      },
      {
        $lookup: {
          from: "leads",
          localField: "lead_id",
          foreignField: "_id",
          as: "leadsData",
        },
      },
      {
        $unwind: {
          path: "$leadsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "businesses",
          localField: "bd_id",
          foreignField: "_id",
          as: "businessData",
        },
      },
      {
        $unwind: {
          path: "$businessData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.lead_status",
          foreignField: "_id",
          as: "leadStatusData",
        },
      },
      {
        $unwind: {
          path: "$leadStatusData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.projection_status",
          foreignField: "_id",
          as: "proStatusData",
        },
      },
      {
        $unwind: {
          path: "$proStatusData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "leadStatusData.status_name": "Prospect",
          // "proStatusData.status_name": { $ne: "Not In Projection" },
          // "leadsData.bd_id": new mongoose.Types.ObjectId(
          //   "656f2ad09c4f6d4c72426e1d"
          // ),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    const worksheetProspect = workbook.addWorksheet("Prospect", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndexProspect = 1;
    let firstRowProspect = worksheetProspect.getRow(rowIndexProspect);
    firstRowProspect.getCell(1).value = bdData.name;
    firstRowProspect.font = { bold: true };
    worksheetProspect.mergeCells("A1:I1");

    let rowProspect = worksheetProspect.getRow(rowIndexProspect + 1);
    rowProspect.values = [
      "S.No",
      "Client Name",
      "Country",
      "BD Name",
      "Mail id",
      "Project name",
      "Project Amount",
      "Upfront amount",
      "Status",
    ];
    rowProspect.font = { bold: true };

    const columnWidthsProspect = [10, 25, 25, 25, 25, 25, 25, 25, 40];

    rowProspect.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidthsProspect[columnIndex];
      worksheetProspect.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    const row2Prospect = worksheetProspect.getRow(1);
    row2Prospect.height = 40;

    for (let col = 1; col <= 9; col++) {
      const cell2 = worksheetProspect.getCell(2, col);
      const cell1 = worksheetProspect.getCell(1, col);
      cell2.fill = cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    }
    await Promise.all(
      ProspectSheetData?.map(async (task, index) => {
        const rowProspect = worksheetProspect.getRow(
          rowIndexProspect + index + 2
        );
        rowProspect.getCell("A").alignment = { horizontal: "left" };
        rowProspect.getCell("G").alignment = { horizontal: "center" };
        rowProspect.getCell("H").alignment = { horizontal: "center" };

        rowProspect.getCell("A").value = index + 1;
        rowProspect.getCell("B").value = task?.leadsData?.client_name;
        rowProspect.getCell("C").value = task?.leadsData?.client_country;
        rowProspect.getCell("D").value = task?.businessData?.name;
        rowProspect.getCell("E").value = task?.leadsData?.client_email;
        rowProspect.getCell("F").value = task?.project_name;
        rowProspect.getCell("G").value = "$" + task?.project_amount;
        rowProspect.getCell("H").value = "$" + task?.upfront_amount;
        rowProspect.getCell("I").value = task?.proposal[0]?.comment_remark;
      })
    );

    rowIndexProspect += ProspectSheetData.length;
    const borderStyleProspect = { style: "thin", color: { argb: "00000000" } };

    worksheetProspect.eachRow((rowProspect, rowNumber) => {
      rowProspect.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyleProspect,
          bottom: borderStyleProspect,
          right: borderStyleProspect,
          left: borderStyleProspect,
        };
      });
    });

    workbook.xlsx
      .writeFile("individualDsrsheet.xlsx")
      .then(() =>
        console.log("Excel file 'tasks_data.xlsx' saved successfully.")
      )
      .catch((error) => console.error("Error saving Excel file:", error));
  } catch (err) {
    console.log(err);
  }
};

const momSheet = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add the headers to the worksheet
    const headers = [
      "Branch Head",
      "BD Name",
      "MTD Leads",
      "Daily Leads",
      "Today's Calls",
      "Time",
      "Call Type- Initial/Proposal/Closer",
      "Dates- Lead/ Proposal/RFP Date",
      "Total Proposal",
      "Value of Proposal",
      "Status of Proposal",
      "Reason of Reject",
    ];
    let rowIndex = 2;
    let row = worksheet.getRow(rowIndex);
    row.values = headers;
    row.font = { bold: true };
    row.alignment = { wrapText: true };

    const columnWidths = [15, 15, 12, 12, 13, 10, 35, 35, 15, 20, 20, 18];

    row.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidths[columnIndex];
      worksheet.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    const row2 = worksheet.getRow(rowIndex);
    row2.height = 60;

    // Define the data for the first table
    const data = [
      [
        "Swaraj",
        "Arpit",
        11,
        0,
        1,
        "21:30",
        "Initial",
        "Self - 13/4/2024",
        "-",
        "-",
        "-",
        "-",
      ],
      ["", "Aashi", 16, 2, 1, "14:30", "Initial", "-", "-", "-", "-", "-"],
      [
        "",
        "Ayushi",
        17,
        2,
        2,
        "14:30\n18:00",
        "Initial",
        "Self - LinkedIn",
        "-",
        "-",
        "-",
        "-",
      ],
      [
        "",
        "Rashmi",
        14,
        2,
        1,
        "12:30",
        "Initial",
        "Lead - 23/03/2024",
        "-",
        "-",
        "-",
        "-",
      ],
      ["", "Leena", 6, 1, 1, "04:00", "Initial", "-", "-", "-", "-", "-"],
      ["", "Nikita", 10, 2, "-", "-", "-", "-", "-", "-", "-", "-"],
      [
        "",
        "Vaibhav",
        11,
        2,
        1,
        "18:00",
        "Initial",
        "Lead - 26/03/2024",
        "-",
        "-",
        "-",
        "-",
      ],
      ["", "Praveen", 7, 1, "-", "-", "-", "-", "-", "-", "-", "-"],
      ["", "Gunjan", 10, 2, "-", "-", "-", "-", "-", "-", "-", "-"],
      [
        "",
        "Vijayshree",
        13,
        1,
        1,
        "21:00",
        "Initial",
        "Lead - 09-03-2024",
        "-",
        "-",
        "-",
        "",
      ],
    ];
    // Add the data for the first table to the worksheet
    await Promise.all(
      data?.map(async (task, index) => {
        const row = worksheetProspect.getRow(rowIndex + index + 1);
        row.getCell("A").value = "";
        row.getCell("B").value = "";
        row.getCell("C").value = task?.businessData?.name;
        row.getCell("D").value = task?.project_name;
        row.getCell("E").value = task?.leadsData?.client_name;
        row.getCell("F").value = task?.leadsData?.client_country;
        row.getCell("G").value = "$" + task?.upfront_amount;
        row.getCell("H").value = "$" + task?.project_amount;
        row.getCell("I").value = task?.proStatusData?.status_name;
        row.getCell("J").value = "0%";
        row.getCell("K").value = task?.rfpData?.rfp[0]?.pe_name;
        row.getCell("L").value = task?.proposal[0]?.comment_remark;
      })
    );

    // Merge the first column cells in the first table
    const mergedCellFirstTable = worksheet.getCell(`A3:A${data.length + 2}`);
    worksheet.mergeCells(`A3:A${data.length + 2}`);
    mergedCellFirstTable.value = "Swaraj";
    mergedCellFirstTable.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    // Styling for the first table
    for (let col = 1; col <= 12; col++) {
      if (col != 1) {
        worksheet.getColumn(col).alignment = {
          horizontal: "center",
          wrapText: true,
        };
        worksheet.getRow(col).height = 40;
      }
    }

    // Border styling for the first table
    const borderStyle = { style: "thin", color: { argb: "00000000" } };
    worksheet.eachRow((rowProspect, rowNumber) => {
      rowProspect.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
          left: borderStyle,
        };
      });
    });

    // Define the data for the second table
    const data2 = [
      ["Swaraj", "Arpit", "-", "-", "-", "-", "-", "-"],
      [
        "",
        "Aashi",
        "Daniela",
        "Mobile App",
        "YTR",
        "YTR",
        "15/04/2024",
        "Abhishek",
      ],
      ["", "Ayushi", "-", "-", "-", "-", "-", "-"],
      ["", "Leena", "-", "-", "-", "-", "-", "-"],
      [
        "",
        "Rashmi",
        "Suzanne Anthony\nJohn",
        "Pet Sitting App\nTender Feasibility",
        "YTR",
        "YTR",
        "18/04/2024",
        "Abhishek",
      ],
      [
        "",
        "Vaibhav",
        "Ben Television",
        "Multi vendor Website and Mobile app",
        "YTR",
        "YTR",
        "16/04/2024",
        "Seema",
      ],
      ["", "Praveen", "-", "-", "-", "-", "-", "-"],
      ["", "Nikita", "-", "-", "-", "-", "-", "-"],
      [
        "",
        "Vijayshree",
        "Barbershop Locator and Appointment Management App",
        "Revise Proposal",
        "11,360",
        "3,976",
        "16/04/2024",
        "Seema",
      ],
      ["", "Gunjan", "-", "-", "-", "-", "-", "-"],
    ];

    let rowS = worksheet.getRow(data.length + 5);
    rowS.getCell(1).value = "Todays Proposal";
    rowS.font = { bold: true };
    worksheet.mergeCells(`A${data.length + 5}:I${data.length + 5}`);
    rowS.alignment = { horizontal: "center" };

    rowS = worksheet.getRow(data.length + 6);
    rowS.values = [
      "Branch Head",
      "BD Name",
      "Client Name",
      "Project Details",
      "Value In USD",
      "Proposal Assign Date",
      "TAT",
      "Dependency",
      "Status of Proposal",
    ];
    rowS.font = { bold: true };
    rowS.alignment = { wrapText: true };

    const columnWidths2 = [15, 15, 25, 25, 13, 15, 35, 35, 25];

    rowS.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidths2[columnIndex];
      worksheet.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    // Add the data for the second table to the worksheet
    data2.forEach((row) => {
      worksheet.addRow(row);
    });

    // Merge the first column cells in the second table
    const mergedCellSecondTable = worksheet.getCell(
      `A${data.length + 7}:A${data.length + 6 + data2.length}`
    );
    worksheet.mergeCells(
      `A${data.length + 7}:A${data.length + 6 + data2.length}`
    );

    // Set value and alignment for merged cell in the second table
    mergedCellSecondTable.value = "Swaraj";
    mergedCellSecondTable.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    // Styling for the second table
    for (let col = 1; col <= 9; col++) {
      if (col != 1) {
        worksheet.getColumn(col).alignment = {
          horizontal: "center",
          wrapText: true,
        };
        worksheet.getRow(data.length + 6 + col + 1).height = 40;
      }
    }

    // Border styling for the second table
    const borderStyle2 = { style: "thin", color: { argb: "00000000" } };
    worksheet.eachRow((rowProspect, rowNumber) => {
      rowProspect.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle2,
          bottom: borderStyle2,
          right: borderStyle2,
          left: borderStyle2,
        };
      });
    });

    const data3 = [
      ["Arpit", "", 1, 11680, 0, 0, 0, 0],
      ["Aashi", "", 0, 0, 0, 0, 0, 0],
      ["Ayushi", "", 5, 37480, 0, 0, 0, 0],
      ["Leena", "", 1, 2400, 1, 0, 0, 0],
      ["Rashmi", "", 1, 10450, 0, 0, 0, 0],
      ["Vaibhav", "", 2, 11828, 1, 5328, 1, 3500],
      ["Praveen", "", 3, 28000, 0, 0, 0, 0],
      ["Nikita", "", 3, 16720, 2, 16000, 0, 0],
      ["Viijayshree", "", 2, 16960, 0, 0, 0, 0],
      ["Gunjan", "", 3, 75800, 0, 0, 0, 0],
    ];

    let row3 = worksheet.getRow(data.length + data2.length + 9);
    row3.getCell(1).value = "Gap Table";
    row3.font = { bold: true };
    worksheet.mergeCells(
      `A${data.length + data2.length + 9}:H${data.length + data2.length + 9}`
    );
    row3.alignment = { horizontal: "center" };

    let rowT = worksheet.getRow(data.length + data2.length + 10);
    rowT.values = [
      "BD Name",
      "PE Name",
      "Total Proposal As on Date",
      "Total Value as on date",
      "Hot Proposal As on date",
      "Value of Hot Proposal",
      "Closer Numbers",
      "Upfront Payment",
    ];
    rowT.font = { bold: true };
    rowT.alignment = { horizontal: "center", wrapText: true };

    const columnWidths3 = [15, 15, 25, 25, 25, 25, 25, 25];

    rowT.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidths3[columnIndex];
      worksheet.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    // Add the data for the third table to the worksheet
    data3.forEach((row) => {
      worksheet.addRow(row);
    });

    // Styling for the third table
    for (let col = 1; col <= 8; col++) {
      if (col != 1) {
        worksheet.getColumn(col).alignment = {
          horizontal: "center",
          wrapText: true,
        };
        worksheet.getRow(data.length + data2.length + 10 + col - 1).height = 40;
      }
    }

    // Border styling for the third table
    worksheet.eachRow((rowProspect, rowNumber) => {
      rowProspect.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
          left: borderStyle,
        };
      });
    });

    workbook.xlsx
      .writeFile("momHuddle.xlsx")
      .then(() => {
        console.log("File written successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
};

const bdBusinessUpdate = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    workbook.xlsx
      .writeFile("bdIndividualUpdate.xlsx")
      .then(() => {
        console.log("File written successfully");
      })
      .catch((err) => {
        console.error("Error writing file:", err);
      });
  } catch (error) {
    console.log(error);
  }
};

const proposalDataSheet = async () => {
  try {
    const data = await proposalModel.aggregate([
      {
        $match: {
          // createdAt: {
          //   $gte: new Date(moment("2024-03-01").startOf("month")),
          //   $lte: new Date(moment("2024-03-01").endOf("month")),
          // },
          // proposal_submitted: "Yes",
        },
      },
      {
        $lookup: {
          from: "leads",
          localField: "lead_id",
          foreignField: "_id",
          as: "leadsData",
        },
      },
      {
        $unwind: {
          path: "$leadsData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "businesses",
          localField: "bd_id",
          foreignField: "_id",
          as: "businessData",
        },
      },
      {
        $unwind: {
          path: "$businessData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.lead_status",
          foreignField: "_id",
          as: "leadStatusData",
        },
      },
      {
        $unwind: {
          path: "$leadStatusData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "leadsData.lead_source_id",
          foreignField: "_id",
          as: "leadSourceData",
        },
      },
      {
        $unwind: {
          path: "$leadSourceData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "rfps",
          localField: "lead_id",
          foreignField: "lead_id",
          as: "rfpData",
        },
      },
      {
        $unwind: {
          path: "$rfpData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          // "leadStatusData.status_name": "Prospect",
          // "proStatusData.status_name": { $ne: "Not In Projection" },
          // "leadsData.bd_id": new mongoose.Types.ObjectId(
          //   "656f2ad09c4f6d4c72426e1d"
          // ),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    // console.log(data[0]);
    const workbook = new ExcelJS.Workbook();
    const worksheetProspect = workbook.addWorksheet("Projection Sheet", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndexProspect = 1;
    let firstRowProspect = worksheetProspect.getRow(rowIndexProspect);
    firstRowProspect.font = { bold: true };
    worksheetProspect.mergeCells("A1:L1");

    let rowProspect = worksheetProspect.getRow(rowIndexProspect);
    rowProspect.values = [
      "S.no",
      "Date",
      "BA Name",
      "BD Name",
      "Client Name",
      "E-mail id",
      "Phone Number",
      "Project Name",
      "Country",
      "Upfront Amount (USD)",
      "Project Amount (USD)",
      "WBS",
      "Proposal",
      "Wireframe",
      "Proposal Submitted",
      "Status",
      "Lead Month",
      "Source",
      "Timeline days",
      "Man Hour",
    ];
    rowProspect.font = { bold: true };

    const columnWidthsProspect = [
      15, 20, 20, 35, 20, 15, 35, 35, 20, 25, 20, 40,
    ];

    rowProspect.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidthsProspect[columnIndex];
      worksheetProspect.getColumn(colNumber).width = columnWidth;
      // worksheetProspect.getColumn(colNumber).fill = {
      //   type: "pattern",
      //   pattern: "solid",
      //   fgColor: { argb: "43fafa" },
      // };
      cell.alignment = { wrapText: true };
    });

    const row2Prospect = worksheetProspect.getRow(1);
    row2Prospect.height = 40;

    for (let col = 1; col <= 12; col++) {
      // const cell2 = worksheetProspect.getCell(2, col);
      const cell1 = worksheetProspect.getCell(1, col);
      cell1.alignment = {
        horizontal: "center",
        wrapText: true,
      };
    }
    await Promise.all(
      data?.map(async (task, index) => {
        const rowProspect = worksheetProspect.getRow(
          rowIndexProspect + index + 1
        );
        rowProspect.getCell("A").value = index + 1;
        rowProspect.getCell("B").value = moment(task?.createdAt).format(
          "DD/MM/YYYY"
        );
        rowProspect.getCell("C").value = task?.rfpData?.rfp[0]?.pe_name;
        rowProspect.getCell("D").value = task?.businessData?.name;
        rowProspect.getCell("E").value = task?.leadsData?.client_name;
        rowProspect.getCell("F").value = task?.leadsData?.client_email;
        rowProspect.getCell("G").value = task?.leadsData?.client_number;
        rowProspect.getCell("H").value = task?.project_name;
        rowProspect.getCell("I").value = task?.leadsData?.client_country;
        rowProspect.getCell("J").value = "$" + task?.upfront_amount;
        rowProspect.getCell("K").value = "$" + task?.project_amount;
        rowProspect.getCell("L").value =
          task?.proposal[0]?.wbs?.length > 0 ? "Yes" : "No";
        rowProspect.getCell("M").value =
          task?.proposal[0]?.proposal?.length > 0 ? "Yes" : "No";
        rowProspect.getCell("N").value =
          task?.proposal[0]?.wireframe?.length > 0 ? "Yes" : "No";
        rowProspect.getCell("O").value = task?.proposal_submitted;
        rowProspect.getCell("P").value = task?.proposal[0]?.comment_remark;
        rowProspect.getCell("Q").value = moment(
          task?.leadsData?.assign_date
        ).format("MMMM");
        rowProspect.getCell("R").value = task?.leadSourceData?.status_name;
        rowProspect.getCell("S").value = task?.timeline_days;
        rowProspect.getCell("T").value = task?.man_hour;
      })
    );

    rowIndexProspect += data.length;
    const borderStyleProspect = { style: "thin", color: { argb: "00000000" } };

    worksheetProspect.eachRow((rowProspect, rowNumber) => {
      rowProspect.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyleProspect,
          bottom: borderStyleProspect,
          right: borderStyleProspect,
          left: borderStyleProspect,
        };

        cell.alignment = { horizontal: "center" };
      });
    });

    worksheetProspect.columns.forEach((column, colNumber) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const length = cell.value ? String(cell.value).length : 0;
        maxLength = Math.max(maxLength, length);
      });
      column.width = Math.min(100, Math.max(15, maxLength * 1.2)); // Adjust the multiplier as needed
    });

    workbook.xlsx
      .writeFile("proposalDataSheet.xlsx")
      .then(() =>
        console.log("Excel file 'tasks_data.xlsx' saved successfully.")
      )
      .catch((error) => console.error("Error saving Excel file:", error));
  } catch (err) {
    console.log(err);
  }
};

const ExternalInternalMonthlySheet = async () => {
  try {
    const externalData = await leadModel.aggregate([
      {
        $match: {
          assign_date: {
            $gte: new Date(moment("2024-01-01").startOf("month")),
            $lt: new Date(moment("2024-01-01").endOf("month")),
          },
        },
      },
      {
        $sort: { assign_date: 1 },
      },
      {
        $lookup: {
          from: "lead_activities",
          let: { lead_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$lead_id", "$$lead_id"] },
                activity_id: { $exists: true }, // Ensure activity_id exists
                "activityData.status_type": {
                  $nin: ["call_status", "rfp_status"],
                },
              },
            },
            {
              $sort: { createdAt: -1 },
            },
            {
              $limit: 1,
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
          ],
          as: "leadActivityData",
        },
      },
      {
        $unwind: {
          path: "$leadActivityData",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "master_statuses",
          localField: "lead_source_id",
          foreignField: "_id",
          as: "leadSourceData",
        },
      },
      {
        $unwind: {
          path: "$leadSourceData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "master_statuses",
          localField: "lead_req_type_id",
          foreignField: "_id",
          as: "leadTypeData",
        },
      },
      {
        $unwind: {
          path: "$leadTypeData",
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
        $match: {
          "leadSourceData.status_name": { $in: ["External", "Internal"] },
        },
      },
      {
        $project: {
          assign_date: 1,
          lead_source: "$leadSourceData.status_name",
          lead_type: "$leadTypeData.status_name",
          client_name: 1,
          client_email: 1,
          client_country: 1,
          bd_name: "$bdData.name",
          commentData: {
            $arrayElemAt: ["$leadActivityData.comment", 0],
          },
        },
      },
    ]);

    const groupedData = _.groupBy(externalData, "lead_source");

    const workbook = new ExcelJS.Workbook();

    /** EXTERNAL SHEET */

    const worksheet = workbook.addWorksheet("External Lead", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndex = 1;

    let row = worksheet.getRow(rowIndex);
    row.values = [
      "Lead Assiging Date",
      "Source of Lead (External/Internal)",
      "Type of Lead (App / Website / Game…)",
      "Client Name",
      "Email ID",
      "Country",
      "BD Name",
      "Status",
    ];
    row.font = { bold: true };

    const columnWidths = [20, 20, 20, 20, 25, 20, 20, 25];

    row.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidths[columnIndex];
      worksheet.getColumn(colNumber).width = columnWidth;
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
    });

    row.height = 40;

    for (let col = 1; col <= 8; col++) {
      const cell1 = worksheet.getCell(1, col);
      cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    }

    await Promise.all(
      groupedData["External"].map(async (task, index) => {
        const row = worksheet.getRow(rowIndex + index + 1);
        row.getCell("A").value = moment(task?.assign_date).format(
          "DD MMMM YYYY"
        );
        row.getCell("B").value = task?.lead_source;
        row.getCell("C").value = task?.lead_type;
        row.getCell("D").value = task?.client_name;
        row.getCell("E").value = task?.client_email;
        row.getCell("F").value = task?.client_country;
        row.getCell("G").value = task?.bd_name;
        row.getCell("H").value = task?.commentData?.comment;
      })
    );

    rowIndex += groupedData["External"].length;
    const borderStyle = { style: "thin", color: { argb: "00000000" } };

    worksheet.eachRow((row, rowNumber) => {
      row.height = 40;

      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
          left: borderStyle,
        };
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
      });
    });

    /** INTERNAL SHEET */

    const worksheetCalling = workbook.addWorksheet("Internal Lead", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndexCalling = 1;

    let rowCalling = worksheetCalling.getRow(rowIndexCalling);
    rowCalling.values = [
      "Lead Assiging Date",
      "Source of Lead (External/Internal)",
      "Type of Lead (App / Website / Game…)",
      "Client Name",
      "Email ID",
      "Country",
      "BD Name",
      "Status",
    ];
    rowCalling.font = { bold: true };

    const columnWidthsCalling = [20, 20, 20, 20, 25, 20, 20, 25];

    rowCalling.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidthsCalling[columnIndex];
      worksheetCalling.getColumn(colNumber).width = columnWidth;
      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
      };
    });

    rowCalling.height = 40;

    for (let col = 1; col <= 8; col++) {
      const cell1 = worksheetCalling.getCell(1, col);
      cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    }

    await Promise.all(
      groupedData["Internal"]?.map(async (task, index) => {
        const rowCalling = worksheetCalling.getRow(rowIndexCalling + index + 1);
        rowCalling.getCell("A").value = moment(task?.assign_date).format(
          "DD MMMM YYYY"
        );
        rowCalling.getCell("B").value = task?.lead_source;
        rowCalling.getCell("C").value = task?.lead_type;
        rowCalling.getCell("D").value = task?.client_name;
        rowCalling.getCell("E").value = task?.client_email;
        rowCalling.getCell("F").value = task?.client_country;
        rowCalling.getCell("G").value = task?.bd_name;
        rowCalling.getCell("H").value = task?.commentData?.comment;
      })
    );

    rowIndexCalling += groupedData["Internal"].length;
    const borderStyleCalling = { style: "thin", color: { argb: "00000000" } };

    worksheetCalling.eachRow((rowCalling, rowNumber) => {
      rowCalling.height = 40;
      rowCalling.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyleCalling,
          bottom: borderStyleCalling,
          right: borderStyleCalling,
          left: borderStyleCalling,
        };
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
          wrapText: true,
        };
      });
    });

    workbook.xlsx
      .writeFile("ExternalInternalMonthlySheet.xlsx")
      .then(() =>
        console.log("Excel file 'tasks_data.xlsx' saved successfully.")
      )
      .catch((error) => console.error("Error saving Excel file:", error));
  } catch (err) {
    console.log(err);
  }
};

const getWeeksDataOfMonth = async (startOfMonth, endOfMonth) => {
  const weeklyData = {};
  const startWeek = startOfMonth.isoWeek();
  const endWeek = endOfMonth.isoWeek();

  const totalWeeksInMonth = endWeek - startWeek + 1;
  for (let week = 1; week <= totalWeeksInMonth; week++) {
    const startOfWeek = moment(startOfMonth)
      .add(week - 1, "weeks")
      .startOf("week");
    const endOfWeek = moment(startOfMonth)
      .add(week - 1, "weeks")
      .endOf("week");

    const newStartDate =
      moment(startOfWeek).month() == moment().month()
        ? startOfWeek
        : startOfMonth;
    const newEndDate =
      moment(endOfWeek).month() == moment().month() ? endOfWeek : endOfMonth;

    weeklyData[`week${week}`] = {
      newStartDate,
      newEndDate,
      week,
    };
  }
  return weeklyData;
};

/***
 * 
 * 
const xlsxProspectsSheetCLWeekly = async (data) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Data", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    let rowIndex = 1;
    let firstRow = worksheet.getRow(rowIndex);
    firstRow.getCell(1).value = "Indore IT";
    firstRow.font = { bold: true };
    worksheet.mergeCells("A1:O1");

    let row = worksheet.getRow(rowIndex + 1);
    row.values = [
      "Sr. No.",
      "Proposal Submission Date",
      "Team Leader",
      "BD Name",
      "Project Name",
      "Client name",
      "Country",
      "Upfront Amount (USD)",
      "Project Amount (USD)",
      "Lead Status",
      "BA Name",
      "Current Status",
      "Last Communication with Client",
      "Action Item for Jay",
      "",
    ];
    row.font = { bold: true };

    const columnWidths = [
      10, 25, 15, 15, 25, 15, 15, 20, 20, 20, 15, 20, 25, 20, 10,
    ];

    row.eachCell((cell, colNumber) => {
      const columnIndex = colNumber - 1;
      const columnWidth = columnWidths[columnIndex];
      worksheet.getColumn(colNumber).width = columnWidth;
      cell.alignment = { wrapText: true };
    });

    const row2 = worksheet.getRow(2);
    row2.height = 40;

    for (let col = 1; col <= 15; col++) {
      const cell2 = worksheet.getCell(2, col);
      const cell1 = worksheet.getCell(1, col);
      cell2.fill = cell1.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    }

    const rowOthers = worksheet.getRow(rowIndex + 2);
    rowOthers.getCell(2).value = "Deepanshi";
    rowOthers.font = { bold: true };
    worksheet.mergeCells("B3:O3");
    worksheet.getCell("B3").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFC000" },
    };

    await Promise.all(
      data.map(async (task, index) => {
        const row = worksheet.getRow(rowIndex + index + 3);
        row.getCell("A").value = index + 1;
        row.getCell("B").value = task?.Proposal_Submission_Date;
        row.getCell("C").value = task?.Team_Leader;
        row.getCell("D").value = task?.BD_Name;
        row.getCell("E").value = task?.Project_Name;
        row.getCell("F").value = task?.Client_name;
        row.getCell("G").value = task?.Country;
        row.getCell("H").value = task?.Upfront_Amount;
        row.getCell("I").value = task?.Project_Amount;
        row.getCell("J").value = task?.Lead_Status;
        row.getCell("K").value = task?.BA_Name;
        row.getCell("L").value = task?.Current_Status;
        row.getCell("M").value = task?.Last_Communication_with_Client;
        row.getCell("N").value = task?.Action_Item_for_Jay;
        row.getCell("O").value = "";
      })
    );

    rowIndex += data.length;
    const borderStyle = { style: "thin", color: { argb: "00000000" } };

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
          left: borderStyle,
        };
      });
    });

    workbook.xlsx
      .writeFile("tasks_data.xlsx")
      .then(() =>
        console.log("Excel file 'tasks_data.xlsx' saved successfully.")
      )
      .catch((error) => console.error("Error saving Excel file:", error));
  } catch (err) {
    console.log(err);
  }
};

const bdMatrixSheetData = async (data = []) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const filePath = "dynamic_data.xlsx";

    const worksheet = workbook.addWorksheet("Data");

    let rowIndex = 2;

    for (let i = 0; i < data.length; i++) {
      const datum = data[i];

      // Add name as title for the table
      let row = worksheet.getRow(rowIndex);
      let nameCell = row.getCell(1);
      nameCell.value = datum.name;
      nameCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "d4923b" }, // Set your desired color
      };
      row.height = 30;
      row.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      row.font = { bold: true, size: 16 };
      worksheet.mergeCells(`A${rowIndex}:G${rowIndex}`);

      rowIndex += 1; // Leave two blank rows after the title

      // Add table headers
      row = worksheet.getRow(rowIndex);
      row.values = [
        "",
        "Target",
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
      ];
      row.font = { bold: true };

      rowIndex++;

      datum.matrix.forEach((item) => {
        // Add table data
        const rowData = [
          item.key,
          item.target,
          item.week_1,
          item.week_2,
          item.week_3,
          item.week_4,
          item.week_5,
        ];
        let row = worksheet.addRow(rowData);
        row.getCell(1).font = { bold: true };
        row.getCell(2).font = { bold: true };
        rowIndex++;
      });

      // Increment rowIndex by 2 for two blank rows between tables
      rowIndex += 2;
    }

    const borderStyle = { style: "thin", color: { argb: "00000000" } };

    worksheet.eachRow((row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
          right: borderStyle,
        };
      });
    });

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 0;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    // Write the workbook to a file
    await workbook.xlsx.writeFile(filePath);
    console.log(`Excel file '${filePath}' saved successfully.`);
  } catch (error) {
    console.log(error);
  }
};
 */
