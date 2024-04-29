const moment = require("moment");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

class BdDashService {
  async getDashboardService(req) {
    try {
      const { start_date, end_date } = req.query;

      const bdTarget = await myInstance.getMonthStartDate(req);

      let startDate = new Date(moment().startOf("day"));
      if (bdTarget?.month_start_date) {
        startDate = new Date(moment(bdTarget.month_start_date).startOf("day"));
      }
      // let startDate = new Date(moment(new Date()).format('YYYY-MM'));
      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(end_date);
      }
      startDate = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
      let masterLeadSourceSQL = `SELECT master_statuses.status_type, master_statuses._id AS _id, master_statuses.status_color AS status_color, COUNT(master_statuses.status_name) AS count, master_statuses.status_name AS status_name FROM master_statuses LEFT JOIN leads ON leads.lead_source_id = master_statuses._id WHERE master_statuses.status_type = 'lead_source' AND bd_id = '${req.user._id}'`;
      if (startDate && end_date) {
        masterLeadSourceSQL += ` AND assign_date BETWEEN '${startDate}' and '${endDate}'`;
      }
      masterLeadSourceSQL += ` GROUP BY master_statuses.status_name;`;
      let [masterLeadSourceData] = await pool
        .promise()
        .execute(masterLeadSourceSQL);

      let masterLeadStatusSQL = `SELECT master_statuses.status_type, master_statuses._id AS _id, master_statuses.status_color AS status_color, COUNT(leads.lead_status) AS count, master_statuses.status_name AS status_name FROM master_statuses LEFT JOIN leads ON leads.lead_status = master_statuses._id AND bd_id = '${req.user._id}'`;
      if (startDate && endDate) {
        masterLeadStatusSQL += ` AND assign_date BETWEEN '${startDate}' and '${endDate}'`;
      }
      masterLeadStatusSQL += `  WHERE master_statuses.status_type = 'lead_status' GROUP BY master_statuses.status_name;`;
      // console.log(masterLeadStatusSQL); 
      let [masterLeadStatusData] = await pool
        .promise()
        .execute(masterLeadStatusSQL);
      // console.log(masterLeadSourceData, masterLeadStatusData)
      const masterData = [...masterLeadSourceData, ...masterLeadStatusData];

      ///// Lead, Call, RFP, and Proposal Counts.
      let totalLeadsSQL = `select count(*) AS total from leads WHERE bd_id = '${req.user._id}'`;
      if (startDate && endDate) {
        totalLeadsSQL += ` AND assign_date BETWEEN '${startDate}' and '${endDate}'`;
      }
      let [totalLeadsData] = await pool.promise().execute(totalLeadsSQL);
      let totalLeads = totalLeadsData[0].total ? 0 : totalLeadsData[0].total;

      let totalCallsSQL = `select count(*) AS total from calls WHERE bd_id = '${req.user._id}'`;
      if (startDate && endDate) {
        totalCallsSQL += ` AND createdAt BETWEEN '${startDate}' and '${endDate}'`;
      }
      let [totalCallsData] = await pool.promise().execute(totalCallsSQL);
      let totalCalls = totalCallsData[0].total ? 0 : totalCallsData[0].total;

      let totalRFPsSQL = `select count(*) AS total from rfps WHERE bd_id = '${req.user._id}'`;
      if (startDate && endDate) {
        totalRFPsSQL += ` AND createdAt BETWEEN '${startDate}' and '${endDate}'`;
      }
      let [totalRFPsData] = await pool.promise().execute(totalRFPsSQL);
      let totalRFPs = totalRFPsData[0].total ? 0 : totalRFPsData[0].total;

      let totalProposalsSQL = `select count(*) AS total, SUM(project_amount) AS project_amount from proposals WHERE bd_id = '${req.user._id}'`;
      if (startDate && endDate) {
        totalProposalsSQL += ` AND createdAt BETWEEN '${startDate}' and '${endDate}'`;
      }
      let [totalProposalsData] = await pool
        .promise()
        .execute(totalProposalsSQL);
      let totalProposals = totalProposalsData[0].total
        ? 0
        : totalProposalsData[0].total;

      let totalAmount = totalProposalsData[0].project_amount
        ? 0
        : totalProposalsData[0].project_amount;

      return {
        status: 200,
        success: true,
        msg: "Dashboard data get successfully.",
        data: {
          leadData: masterData,
          bdTargets: bdTarget,
          totalLeads: totalLeads,
          totalCalls: totalCalls,
          totalRFPs: totalRFPs,
          totalProposals: totalProposals,
          totalProposalAmount: totalAmount,
        },
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get Dashboard service.",
        data: error,
      };
    }
  }
  // async getLeadTypeData(req){
  async getLeadTypeGraphData(req) {
    try {
      const { bd_id, start_date, end_date } = req.query;
      const bdTarget = await myInstance.getMonthStartDate(req);

      let startDate = new Date(moment().startOf("day"));
      if (bdTarget?.month_start_date) {
        startDate = new Date(moment(bdTarget.month_start_date).startOf("day"));
      }
      // let startDate = new Date(moment(new Date()).format('YYYY-MM'));
      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(end_date);
      }
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss')
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss')

      let [leadTypes] = await pool
        .promise()
        .execute(`select * from master_statuses where status_type = "lead_type"`);


      let [leadTypesData] = await pool
        .promise()
        .execute(`SELECT DATE_FORMAT(assign_date,'%Y-%m-%d') AS assign_date, lead_type_id, count(lead_type_id) AS sum  FROM leads WHERE bd_id = '${ req.user._id}' AND assign_date BETWEEN '${startDate}' AND '${endDate}' AND lead_type_id IN (SELECT _id from master_statuses WHERE status_type = 'lead_type') GROUP BY lead_type_id, assign_date ORDER BY assign_date`);

      // Create the final data structure
      const finalData = {
        date: [], // Initialize the date array
      };

      let leadName = {};
      leadTypes.forEach((type) => {
        finalData[type.status_name] = [];
        leadName[type._id] = type.status_name
      });

      let leadInfo = {};
      leadTypesData.forEach(leadTypes => {
        if(!leadInfo[leadTypes.lead_type_id]) leadInfo[leadTypes.lead_type_id] = {}
        leadInfo[leadTypes.lead_type_id][`${leadTypes.assign_date}`] = leadTypes.sum
      });

      for (let i = 0; i <= moment(endDate).diff(startDate, 'days');   i++){
        let loopDate = moment(startDate).add(i, 'days').format('YYYY-MM-DD');

        for (const key in leadName) {
          if(leadInfo[key] && leadInfo[key][loopDate]){
            finalData[leadName[key]].push(leadInfo[key][loopDate])
          }else{
            finalData[leadName[key]].push(0)
          }
        }
        finalData.date.push(loopDate)
      }

      return {
        status: 200,
        success: true,
        msg: "Lead type count get successsfully.",
        data: finalData, //{ date, Email, LinkedIn, Upwork }
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get Dashboard lead type count service.",
        data: error,
      };
    }
  }


  async getDashFollowupLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date } = req.query;
      // Calculate startDate and endDate using moment.js
      let startDate = start_date
        ? moment(start_date).startOf("day")
        : moment().startOf("year");
      let endDate = end_date ? moment(end_date).endOf("day") : moment().endOf("day");

      startDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss')
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss')
      let leadsQuery = "";
      leadsQuery += `
      SELECT 

      leads._id,
      leads.bd_id,
      leads.client_name,
      leads.client_email,
      leads.client_alternate_email,
      leads.client_number,
      leads.client_whatsapp_num,
      leads.client_country,
      leads.address,
      leads.client_linkedin,
      leads.upwork_job_url,
      leads.bid_url,
      leads.skype_id,
      leads.company_name,
      leads.proposal_amount,
      leads.client_budget,
      leads.follow_up,
      leads.status,
      leads.deleted,
      leads.updatedAt,
      leads.assign_date as createdAt,
      resp.followup_date AS updateFollowupDate,
      leadStatusData.status_name as status_name,

      Json_object("_id",leadStatusData._id, "status_name",leadStatusData.status_name, "status_color",leadStatusData.status_color) AS leadStatusData,

      Json_object("_id",leads.bd_id, "name", bdData.name, "email", bdData.email,"designation", bdData.designation, "status", bdData.status) AS bdData,

      Json_object('_id', leadTypeData._id, 'status_name', leadTypeData.status_name) AS  leadTypeData,

      Json_object('_id', reqTypeData._id, 'status_name', reqTypeData.status_name) AS  reqTypeData,

      Json_object('_id', leadSourceData._id, 'status_name', leadSourceData.status_name) AS  leadSourceData,

      Json_object('_id', projectionStatusData._id, 'status_name', projectionStatusData.status_name) AS  projectionStatusData,

      Json_object('_id', resp._id, 'activity_id',resp.activity_id, 'activityStatusCode', resp.activityStatusCode, 'status_type', resp.status_type, 'status_name', resp.status_name, 'followup_date', resp.followup_date, 'createdAt', resp.createdAt, 'updatedAt', resp.updatedAt) AS  resp

      FROM leads as leads

      left join (SELECT leadActivities._id, leadActivities.lead_id, leadActivities.activity_id, activityData.status_code as activityStatusCode, activityData.status_type, activityData.status_name, leadActivities.followup_date, leadActivities.createdAt, leadActivities.updatedAt FROM
        ( SELECT *, ROW_NUMBER() OVER( PARTITION BY lead_id ORDER BY createdAt DESC ) AS rowNumber FROM lead_activities) AS leadActivities
        LEFT JOIN master_statuses AS activityData
        ON leadActivities.activity_id = activityData._id WHERE activityData.status_type = 'lead_follow_ups' AND leadActivities.rowNumber = 1) AS resp ON resp.lead_id = leads._id 

      left join master_statuses as leadStatusData on leads.lead_status = leadStatusData._id 
      left join businesses as bdData on leads.bd_id = bdData._id
      left join master_statuses as leadTypeData on leads.lead_type_id = leadTypeData._id
      left join master_statuses as reqTypeData on leads.lead_req_type_id = reqTypeData._id
      left join master_statuses as leadSourceData on leads.lead_source_id = leadSourceData._id
      left join master_statuses as projectionStatusData on leads.projection_status = projectionStatusData._id


      WHERE leads.bd_id = '${req?.user?._id}' and resp.status_name!='8th follow up' AND leadStatusData.status_name NOT IN ('Dead', 'Lead Return', 'Awarded', 'Hold')`;

      if (startDate && endDate) {
        leadsQuery += ` AND resp.followup_date BETWEEN '${startDate}' and '${endDate}'`;
      }

      if (search) {
        leadsQuery += ` AND leads.client_name='${search}'`;
      }
console.log('====================================');
console.log(leadsQuery);
console.log('====================================');
      // count query
      let countQuery = `select count(*) as totalDocs from (${leadsQuery}) as countQuery`;
      // console.log("countQuery", countQuery)
      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;

      // Pagination variable
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;
      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      leadsQuery += ` ORDER BY resp.activityStatusCode ASC, updatedAt DESC LIMIT ${pageSize} OFFSET ${skip}`;
      // console.log("leadsQuery", leadsQuery)

      const [resultAggregate] = await pool.promise().execute(leadsQuery, []);

      const [lead_follow_ups] = await pool.promise().execute(`select * from master_statuses where status_type = 'lead_follow_ups' ORDER BY status_code`);

      let updatedArray = [];
      resultAggregate?.forEach((obj) => {
        // console.log("resultAggregate", obj?.resp?.status_name);
        const statusName = obj?.resp?.status_name;
        const index = lead_follow_ups.findIndex(
          (follow_up) => follow_up.status_name === statusName
        );
        if (index !== -1 && index + 1 < lead_follow_ups.length) {
          obj["updateValue"] = lead_follow_ups[index + 1];
        }
        updatedArray.push(obj);
      });
      return {
        status: 200,
        success: true,
        msg: "New Dashboard followup lead data get successfully..",
        data: {
          docs: updatedArray,
          totalDocs: totalDocs,
          limit: pageSize,
          page: pageNumber,
          totalPages: totalPages,
          pagingCounter: (pageNumber - 1) * pageSize + 1,
          hasPrevPage: pageNumber > 1,
          hasNextPage: pageNumber < totalPages,
          prevPage: pageNumber > 1 ? pageNumber - 1 : null,
          nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
        },
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

  async updateFollowupDateService(req) {
    try {
      let { lead_activity_id, followup_date, comment } = req.body;
      // console.log(req.body)
      // Get the current date
      const currentDate = moment(followup_date).format('YYYY-MM-DD HH:mm:ss')


      let [leadActivity] = await pool.promise().execute(`SELECT * FROM lead_activities WHERE _id = ?`, [lead_activity_id]);//await leadActivityModel.findById(lead_activity_id);
      if (!leadActivity) {
        return {
          status: 400,
          success: false,
          msg: "Lead activity not found.",
          data: leadActivity,
        };
      }

      await pool.promise().execute(`update lead_activities set followup_date=? where _id=?`,[currentDate ,lead_activity_id])

      let commentData =  comment ? comment : `Follow-up date has been updated to ${currentDate}.`
      const commentId = uuidv4();
      let commentSql = `INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;
      let [updateFollowupDate] = await pool.promise().execute(commentSql, [commentId, req.user._id, commentData, lead_activity_id, new Date(),new Date()])

      return {
        status: 200,
        success: true,
        msg: "Update followup date successfully.",
        data: updateFollowupDate,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup leads service.",
        data: error,
      };
    }
  }

  async dashCallLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date } = req.query;
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;

      // var date = new Date();
      let startDate = new Date(moment().startOf("month"));
      let endDate = new Date(moment().endOf("day"));
      let meetingStartDate = new Date(moment().startOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        meetingStartDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      meetingStartDate = moment(meetingStartDate).format('YYYY-MM-DD HH:mm:ss')
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss')

      let callStatusSql = `SELECT 
            leadData._id,
            leadData.client_name,
            leadData.assign_date,
            leadData.client_number,
            leadData.client_whatsapp_num,
            leadData.client_email,
            leadData.client_alternate_email,
            leadData.client_country,
            leadData.address,
            leadData.client_linkedin,
            leadData.upwork_job_url,
            leadData.bid_url,
            leadData.skype_id,
            leadData.company_name,
            leadData.proposal_amount,
            leadData.client_budget,
            leadData.follow_up,
            leadData.add_notes,
            leadData.status,
            leadData.deleted,
            leadData.updatedAt,
            assign_date AS createdAt,
            leadStatusData.status_name AS lead_status,
            
            JSON_OBJECT("_id",bdData._id, "name", bdData.name, "email", bdData.email,"designation", bdData.designation, "status", bdData.status) AS bdData,
            
            JSON_OBJECT('_id', leadStatusData._id, 'status_name', leadStatusData.status_name, 'status_color', leadStatusData.status_color) AS  leadStatusData,
            
            JSON_OBJECT('_id', leadTypeData._id, 'status_name', leadTypeData.status_name) AS  leadTypeData,
            
            JSON_OBJECT('_id', reqTypeData._id, 'status_name', reqTypeData.status_name) AS  reqTypeData,
            
            JSON_OBJECT('_id', leadSourceData._id, 'status_name', leadSourceData.status_name) AS  leadSourceData,
            
            JSON_OBJECT('_id', resp._id, 'activity_id',resp.activity_id, 'activityStatusCode', resp.activityStatusCode, 'status_type', resp.status_type, 'status_name', resp.status_name, 'followup_date', resp.followup_date, 'createdAt', resp.createdAt, 'updatedAt', resp.updatedAt) AS  resp,
            
            JSON_OBJECT(
            '_id', calls._id, 'callResp', JSON_OBJECT('_id', callData._id, 'lead_id', callData.lead_id, 'activity_id', callData.activity_id, 'activityStatusCode', callData.activityStatusCode, 'status_type', callData.status_type, 'status_name', callData.status_name, 'status_color', callData.status_color, 'createdAt', callData.createdAt, 'updatedAt', callData.updatedAt), 'meeting_link', calls.meeting_link,'recording_link', calls.recording_link, 'pe_name', calls.pe_name, 'meeting_date_time', calls.meeting_date_time, 'call_status', callStatusData.status_name, 'status_color', callStatusData.status_color ) AS callData
            
            FROM calls
            
            left join leads AS leadData on leadData._id = calls.lead_id
            left join businesses as bdData on leadData.bd_id = bdData._id
            left join master_statuses as leadStatusData on leadData.lead_status = leadStatusData._id
            left join master_statuses as leadTypeData on leadData.lead_type_id = leadTypeData._id
            left join master_statuses as reqTypeData on leadData.lead_req_type_id = reqTypeData._id
            left join master_statuses as leadSourceData on leadData.lead_source_id = leadSourceData._id
            left join master_statuses as callStatusData on calls.call_status_id = callStatusData._id
            left join (
                SELECT leadActivities._id, leadActivities.lead_id, leadActivities.activity_id, activityData.status_code as activityStatusCode, activityData.status_type, activityData.status_name, leadActivities.followup_date, leadActivities.createdAt, leadActivities.updatedAt FROM
                ( SELECT *, ROW_NUMBER() OVER( PARTITION BY lead_id ORDER BY createdAt DESC ) AS rowNumber FROM lead_activities) AS leadActivities
                    LEFT JOIN master_statuses AS activityData ON leadActivities.activity_id = activityData._id WHERE activityData.status_type = 'call_status' AND leadActivities.rowNumber = 1)
            AS resp ON resp.lead_id = calls.lead_id
            
            left join (
                SELECT callActivities._id, callActivities.call_id, callActivities.lead_id, activityData._id AS activity_id, activityData.status_code AS activityStatusCode, activityData.status_type, activityData.status_name, activityData.status_color, callActivities.createdAt, callActivities.updatedAt  FROM 
                ( SELECT *, ROW_NUMBER() OVER( PARTITION BY lead_id ORDER BY createdAt DESC ) AS rowNumber FROM call_activities) AS callActivities
                LEFT JOIN master_statuses AS activityData ON callActivities.activity_id = activityData._id WHERE activityData.status_type='call_status' AND callActivities.rowNumber = 1
            ) AS callData ON  calls._id = callData.call_id

            WHERE leadData.bd_id = '${req?.user?._id}' AND leadStatusData.status_name NOT IN ('Dead', 'Awarded', 'Hold')`;

      if (meetingStartDate && endDate) {
        callStatusSql += ` AND calls.meeting_date_time BETWEEN '${meetingStartDate}' and '${endDate}'`;
      }

      if (search) {
        callStatusSql += ` AND leadData.client_name='${search}'`;
      }

      // count query
      let countQuery = `select count(*) as totalDocs from (${callStatusSql}) as countQuery`;
      // console.log("countQuery", countQuery)
      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;

      // Pagination variable
      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      callStatusSql += ` ORDER BY resp.activityStatusCode ASC, calls.meeting_date_time DESC LIMIT ${pageSize} OFFSET ${skip}`;
      
      // console.log("callStatusSql", callStatusSql)
      const [resultAggregate] = await pool.promise().execute(callStatusSql, []);

      const result = {
        docs: resultAggregate,
        totalDocs: totalDocs,
        limit: pageSize,
        page: pageNumber,
        totalPages: totalPages,
        pagingCounter: (pageNumber - 1) * pageSize + 1,
        hasPrevPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages,
        prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
      };
      return {
        status: 200,
        success: true,
        msg: "Dashboard followup call data get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup calls service.",
        data: error,
      };
    }
  }

  // async rfpLeadsService(req) {
  //   try {
  //     const { page, limit, search, start_date, end_date } = req.query;
  //     const pageNumber = parseInt(page) || 1;
  //     const pageSize = parseInt(limit) || 10;

  //     let startDate = new Date(moment().startOf("month"));
  //     let endDate = new Date(moment().endOf("day"));

  //     if (start_date && end_date) {
  //       startDate = new Date(moment(start_date).startOf("day"));
  //       endDate = new Date(moment(end_date).endOf("day"));
  //     }
  //     let addDateField = {
  //       $addFields: {
  //         createdAtNew: {
  //           $toDate: {
  //             $dateToString: {
  //               format: "%Y-%m-%d",
  //               date: "$assign_date", //createdAt'
  //             },
  //           },
  //         },
  //       },
  //     };

  //     let match = {
  //       createdAtNew: {
  //         $gte: startDate,
  //         $lte: endDate,
  //       },
  //     };

  //     let matchQuery = {};
  //     let userFilter = [];
  //     req?.user?._id ? userFilter.push({ bd_id: req.user._id }) : "";
  //     start_date && end_date ? userFilter.push(match) : "";
  //     req?.query?.lead_id
  //       ? userFilter.push({
  //           lead_id: new mongoose.Types.ObjectId(req.query.lead_id),
  //         })
  //       : "";
  //     // If the search parameter is provided, add filters for client_name and client_email
  //     if (search) {
  //       matchQuery.$or = [
  //         { client_name: { $regex: search, $options: "i" } }, // Case-insensitive search for client_name
  //         // { "leadData.client_email": { $regex: search, $options: 'i' } }, // Case-insensitive search for client_email
  //       ];
  //     }

  //     const aggregationPipeline = [
  //       addDateField,
  //       {
  //         $match: { $and: userFilter, ...matchQuery },
  //       },
  //       {
  //         $lookup: {
  //           from: "master_statuses",
  //           localField: "lead_status",
  //           foreignField: "_id",
  //           as: "leadStatusData",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$leadStatusData",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },
  //       {
  //         $match: {
  //           $and: [{ "leadStatusData.status_name": { $nin: ["Dead"] } }],
  //         }, // "Lead Return", "Awarded", "Hold"
  //       },
  //       {
  //         $lookup: {
  //           from: "lead_activities",
  //           localField: "_id",
  //           foreignField: "lead_id",
  //           as: "leadActivityData",
  //           pipeline: [
  //             {
  //               $lookup: {
  //                 from: "master_statuses",
  //                 localField: "activity_id",
  //                 foreignField: "_id",
  //                 as: "activityData",
  //               },
  //             },
  //             {
  //               $unwind: "$activityData",
  //             },
  //             {
  //               $match: {
  //                 "activityData.status_type": "rfp_status",
  //               },
  //             },
  //             {
  //               $project: {
  //                 _id: "$activityData._id",
  //                 activityStatusCode: "$activityData.status_code",
  //                 status_type: "$activityData.status_type",
  //                 status_name: "$activityData.status_name",
  //                 status_color: "$activityData.status_color",
  //                 createdAt: "$createdAt",
  //                 updatedAt: "$updatedAt",
  //               },
  //             },
  //             {
  //               $sort: {
  //                 createdAt: -1,
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "rfps",
  //           localField: "_id",
  //           foreignField: "lead_id",
  //           as: "rfpData",
  //           pipeline: [
  //             {
  //               $lookup: {
  //                 from: "master_statuses",
  //                 localField: "lead_rfp_status",
  //                 foreignField: "_id",
  //                 as: "rfpStatusData",
  //               },
  //             },
  //             {
  //               $unwind: "$rfpStatusData",
  //             },
  //             {
  //               $match: {
  //                 "rfpStatusData.status_type": "rfp_status",
  //               },
  //             },
  //             {
  //               $project: {
  //                 _id: "$_id",
  //                 proposal_value: "$proposal_value",
  //                 lead_rfp_status: "$rfpStatusData.status_name",
  //                 //"$rfp"
  //                 rfp: {
  //                   $arrayElemAt: ["$rfp", 0],
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         $match: {
  //           $or: [
  //             { "rfpData.lead_rfp_status": "Request For Proposal" },
  //             { "rfpData.lead_rfp_status": "Revised RFP" },
  //             { "rfpData.lead_rfp_status": "RFP Pending" },
  //           ],
  //         },
  //       },
  //       // Add other stages of aggregation...
  //       { $count: "totalDocs" }, // Add $count stage to count the matched documents
  //     ];
  //     const countResult = await leadModel.aggregate(aggregationPipeline).exec();
  //     const totalDocs = countResult.length > 0 ? countResult[0].totalDocs : 0;
  //     // Calculate skip value for pagination
  //     const skip = (pageNumber - 1) * pageSize;

  //     const rfpStatus = await leadModel
  //       .aggregate([
  //         addDateField,
  //         {
  //           $match: { $and: userFilter, ...matchQuery },
  //         },
  //         {
  //           $lookup: {
  //             from: "master_statuses",
  //             localField: "lead_status",
  //             foreignField: "_id",
  //             as: "leadStatusData",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$leadStatusData",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $match: {
  //             $and: [{ "leadStatusData.status_name": { $nin: ["Dead"] } }],
  //           }, // "Lead Return", "Awarded", "Hold"
  //         },
  //         {
  //           $lookup: {
  //             from: "businesses",
  //             localField: "bd_id",
  //             foreignField: "_id",
  //             as: "bdData",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$bdData",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "master_statuses",
  //             localField: "lead_type_id",
  //             foreignField: "_id",
  //             as: "leadTypeData",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$leadTypeData",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "master_statuses",
  //             localField: "lead_req_type_id",
  //             foreignField: "_id",
  //             as: "reqTypeData",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$reqTypeData",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "master_statuses",
  //             localField: "lead_source_id",
  //             foreignField: "_id",
  //             as: "leadSourceData",
  //           },
  //         },
  //         {
  //           $unwind: {
  //             path: "$leadSourceData",
  //             preserveNullAndEmptyArrays: true,
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "lead_activities",
  //             localField: "_id",
  //             foreignField: "lead_id",
  //             as: "leadActivityData",
  //             pipeline: [
  //               {
  //                 $lookup: {
  //                   from: "master_statuses",
  //                   localField: "activity_id",
  //                   foreignField: "_id",
  //                   as: "activityData",
  //                 },
  //               },
  //               {
  //                 $unwind: "$activityData",
  //               },
  //               {
  //                 $match: {
  //                   "activityData.status_type": "rfp_status",
  //                 },
  //               },
  //               {
  //                 $project: {
  //                   _id: "$activityData._id",
  //                   activityStatusCode: "$activityData.status_code",
  //                   status_type: "$activityData.status_type",
  //                   status_name: "$activityData.status_name",
  //                   status_color: "$activityData.status_color",
  //                   createdAt: "$createdAt",
  //                   updatedAt: "$updatedAt",
  //                 },
  //               },
  //               {
  //                 $sort: {
  //                   createdAt: -1,
  //                 },
  //               },
  //             ],
  //           },
  //         },
  //         {
  //           $lookup: {
  //             from: "rfps",
  //             localField: "_id",
  //             foreignField: "lead_id",
  //             as: "rfpData",
  //             pipeline: [
  //               {
  //                 $lookup: {
  //                   from: "master_statuses",
  //                   localField: "lead_rfp_status",
  //                   foreignField: "_id",
  //                   as: "rfpStatusData",
  //                 },
  //               },
  //               {
  //                 $unwind: "$rfpStatusData",
  //               },
  //               {
  //                 $match: {
  //                   "rfpStatusData.status_type": "rfp_status",
  //                 },
  //               },
  //               {
  //                 $project: {
  //                   _id: "$_id",
  //                   proposal_value: "$proposal_value",
  //                   lead_rfp_status: "$rfpStatusData.status_name",
  //                   //"$rfp"
  //                   rfp: {
  //                     $arrayElemAt: ["$rfp", 0],
  //                   },
  //                   // 'client_name': 1,
  //                   // 'client_email': 1,
  //                   // 'client_number': 1,
  //                   // 'lead_status': '$leadStatusData.status_name',
  //                   // 'createdAt': 1,
  //                   // 'updatedAt': 1,
  //                 },
  //               },
  //             ],
  //           },
  //         }, //6538d092d00ca5a25138c4fe //"Request For Proposal", "Revised RFP", "RFP Pending"
  //         {
  //           $match: {
  //             $or: [
  //               { "rfpData.lead_rfp_status": "Request For Proposal" },
  //               { "rfpData.lead_rfp_status": "Revised RFP" },
  //               { "rfpData.lead_rfp_status": "RFP Pending" },
  //             ],
  //           },
  //         },
  //         {
  //           $project: {
  //             resp: {
  //               $arrayElemAt: ["$leadActivityData", 0],
  //             },
  //             rfpData: {
  //               $arrayElemAt: ["$rfpData", 0],
  //             },
  //             client_name: 1,
  //             client_email: 1,
  //             client_alternate_email: 1,
  //             client_number: 1,
  //             client_whatsapp_num: 1,
  //             client_country: 1,
  //             address: 1,
  //             client_linkedin: 1,
  //             upwork_job_url: 1,
  //             bid_url: 1,
  //             skype_id: 1,
  //             company_name: 1,
  //             proposal_amount: 1,
  //             client_budget: 1,
  //             follow_up: 1,
  //             add_notes: 1,
  //             status: 1,
  //             deleted: 1,
  //             bdData: {
  //               bd_id: "$bdData._id",
  //               name: "$bdData.name",
  //               email: "$bdData.email",
  //               designation: "$bdData.designation",
  //             },
  //             leadTypeData: {
  //               _id: "$leadTypeData._id",
  //               status_name: "$leadTypeData.status_name",
  //             },
  //             reqTypeData: {
  //               _id: "$reqTypeData._id",
  //               status_name: "$reqTypeData.status_name",
  //             },
  //             leadSourceData: {
  //               _id: "$leadSourceData._id",
  //               status_name: "$leadSourceData.status_name",
  //             },
  //             leadStatusData: {
  //               _id: "$leadStatusData._id",
  //               status_name: "$leadStatusData.status_name",
  //               status_color: "$leadStatusData.status_color",
  //             },
  //             lead_status: "$leadStatusData.status_name",
  //             // 'assign_date': 1,
  //             createdAt: "$assign_date", //1,
  //             updatedAt: 1,
  //           },
  //         },
  //         // {
  //         //   $match: {
  //         //     "resp.status_type": "rfp_status",
  //         //   },
  //         // },
  //         {
  //           $sort: { "resp.activityStatusCode": 1, updatedAt: -1 },
  //         },
  //       ])
  //       .skip(skip)
  //       .limit(pageSize);
  //     const totalPages = Math.ceil(totalDocs / pageSize);

  //     const result = {
  //       docs: rfpStatus,
  //       totalDocs: totalDocs,
  //       limit: pageSize,
  //       page: pageNumber,
  //       totalPages: totalPages,
  //       pagingCounter: (pageNumber - 1) * pageSize + 1,
  //       hasPrevPage: pageNumber > 1,
  //       hasNextPage: pageNumber < totalPages,
  //       prevPage: pageNumber > 1 ? pageNumber - 1 : null,
  //       nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
  //     };
  //     // await leadModel.aggregatePaginate(rfpStatus, options);
  //     // let updatedObj = {};

  //     // // Iterate through the original array and group objects by status_name
  //     // result?.docs.forEach((obj) => {
  //     //   const statusName = obj.resp.status_name;

  //     //   if (!updatedObj[statusName]) {
  //     //     updatedObj[statusName] = [];
  //     //   }

  //     //   updatedObj[statusName].push(obj);
  //     // });

  //     // // Now updatedObj will contain objects grouped by status_name
  //     // result.docs = updatedObj;
  //     return {
  //       status: 200,
  //       success: true,
  //       msg: "Dashboard RFP Status data get successfully.",
  //       data: result,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 400,
  //       success: false,
  //       msg: error, //"Somethin went wrong when get dashboard RFPs status service.",
  //       data: error,
  //     };
  //   }
  // }

  async dashRfpLeadsService(req) {
    try {
      const { page, limit, search, start_date, end_date } = req.query;
      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;

      let startDate = new Date(moment().startOf("month"));
      let endDate = new Date(moment().endOf("day"));

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      startDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss')
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss')

      let rfpLeadsSql = `
            select JSON_OBJECT(
                        'bd_id', bdData._id,
                        'name', bdData.name,
                        'email', bdData.email,
                        'designation', bdData.designation
                    ) as bdData,
                    JSON_OBJECT(
                        '_id', leadStatusData._id,
                        'status_name', leadStatusData.status_name,
                        'status_color', leadStatusData.status_color
                    ) as leadStatusData,
                    JSON_OBJECT(
                        '_id', leadTypeData._id,
                        'status_name', leadTypeData.status_name
                    ) as leadTypeData,
                    JSON_OBJECT(
                        '_id', reqTypeData._id,
                        'status_name', reqTypeData.status_name
                    ) as reqTypeData,
                  JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "_id", rfps._id,
                        "proposal_value", rfps.proposal_value,
                        "lead_rfp_status", rfpStatusData.status_name,
                        'rfpResp', JSON_OBJECT(
                            "rfp_type", rfpData.rfp_type ,
                            "pe_name", rfpData.pe_name ,
                            "pe_email", rfpData.pe_email ,
                            "remarks", rfpData.remarks ,
                            "activity_id", rfpData.activity_id ,
                            "minutes_of_meeting", rfpData.minutes_of_meeting ,
                            "attachments", rfpData.attachments ,
                            "_id", rfpData._id ,
                            "createdAt", rfpData.createdAt ,
                            "updatedAt", rfpData.updatedAt 
                    )
                  )
                ) AS rfpData,
                    JSON_ARRAYAGG(
                    JSON_OBJECT(
                      "_id", leadActivityData._id,
                  "activity_id", leadMasterData._id,
                  "activityStatusCode", leadMasterData.status_code,
                  "status_type", leadMasterData.status_type,
                  "status_name", leadMasterData.status_name,
                  "status_color", leadMasterData.status_color,
                  "createdAt", leadActivityData.createdAt,
                  "updatedAt", leadActivityData.updatedAt
                  )
                ) AS resp,
                    leads._id  as _id,
                    leads.client_name as client_name,
                    leads.assign_date as assign_date,
                    leads.client_number as client_number,
                    leads.client_whatsapp_num as client_whatsapp_num,
                    leads.client_email as client_email,
                    leads.client_alternate_email as client_alternate_email,
                    leads.client_country as client_country,
                    leads.address as address,
                    leads.client_linkedin as client_linkedin,
                    leads.upwork_job_url as upwork_job_url,
                    leads.bid_url as bid_url,
                    leads.skype_id as skype_id,
                    leads.company_name as company_name,
                    leads.proposal_amount as proposal_amount,
                    leads.client_budget as client_budget,
                    leads.follow_up as follow_up,
                    leads.add_notes as add_notes,
                    leads.status as status,
                    leads.deleted as deleted,
                    leads.updatedAt as updatedAt,
                    leadStatusData.status_name as lead_status
                    from rfps
                    LEFT JOIN 
                leads ON rfps.lead_id = leads._id
            LEFT JOIN 
                businesses AS bdData ON leads.bd_id = bdData._id
            LEFT JOIN 
                rfp_data AS rfpData ON rfps._id = rfpData.rfp_id
            LEFT JOIN 
                master_statuses AS leadStatusData ON leads.lead_status = leadStatusData._id
            LEFT JOIN 
                master_statuses AS leadTypeData ON leads.lead_type_id = leadTypeData._id
            LEFT JOIN 
                master_statuses AS reqTypeData ON leads.lead_req_type_id = reqTypeData._id
            LEFT JOIN 
                master_statuses AS leadSourceData ON leads.lead_source_id = leadSourceData._id
            LEFT JOIN 
                master_statuses AS rfpStatusData ON rfps.lead_rfp_status = rfpStatusData._id
            LEFT JOIN 
                lead_activities AS leadActivityData ON leads._id = leadActivityData.lead_id
            LEFT JOIN 
                master_statuses AS leadMasterData ON leadMasterData._id = leadActivityData.activity_id
            WHERE 
                leadStatusData.status_name NOT IN ('Dead') AND leads.bd_id = '${req?.user?._id}'`;
                
      if (search) {
        rfpLeadsSql += ` AND leads.client_name='${search}'`;
      }
      rfpLeadsSql += ` AND leadMasterData.status_type = 'rfp_status'
                AND rfpStatusData.status_name IN ('Request For Proposal', 'Revised RFP', 'RFP Pending')
                AND rfpData.createdAt BETWEEN '${startDate}' and '${endDate}'
                AND rfpData.createdAt = (
                    SELECT 
                        MAX(rfpDataSub.createdAt)
                    FROM 
                        rfp_data AS rfpDataSub
                    WHERE 
                        rfps._id = rfpDataSub.rfp_id
                ) 
                AND leadActivityData.createdAt = (
                    SELECT 
                        MAX(leadActivityDataSub.createdAt)
                    FROM 
                        lead_activities AS leadActivityDataSub
                    WHERE 
                        leads._id = leadActivityDataSub.lead_id
                )
            group by leads._id
      `;

      // count query
      let countQuery = `select count(*) as totalDocs from (${rfpLeadsSql}) as countQuery`;
      // console.log("countQuery", countQuery)
      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;
      
      // Pagination variable
      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      rfpLeadsSql += ` LIMIT ${pageSize} OFFSET ${skip}`;
      
      // console.log("rfpLeadsSql", rfpLeadsSql)
      const [resultAggregate] = await pool.promise().execute(rfpLeadsSql, []);

      const result = {
        docs: resultAggregate,
        totalDocs: totalDocs,
        limit: pageSize,
        page: pageNumber,
        totalPages: totalPages,
        pagingCounter: (pageNumber - 1) * pageSize + 1,
        hasPrevPage: pageNumber > 1,
        hasNextPage: pageNumber < totalPages,
        prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
      };
      // const updatedObj = _.groupBy(
      //   result?.docs,
      //   (obj) => obj.callData.call_status
      // );
      // result.docs = updatedObj;
      return {
        status: 200,
        success: true,
        msg: "Dashboard followup call data get successfully.",
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dashboard followup calls service.",
        data: error,
      };
    }
  }

  async getLeadDetailsService(req) {
    try {
      const { page, limit, search, lead_id } = req.query;
      
      

      let leadsQuery = `
      SELECT 
      leads.lead_req_type_id,
      leads.lead_source_id,
      leads._id,
      leads.bd_id,
      leads.client_name,
      leads.client_email,
      leads.client_alternate_email,
      leads.client_number,
      leads.client_whatsapp_num,
      leads.client_country,
      leads.address,
      leads.client_linkedin,
      leads.upwork_job_url,
      leads.bid_url,
      leads.skype_id,
      leads.company_name,
      leads.proposal_amount,
      leads.client_budget,
      leads.follow_up,
      leads.add_notes,
      leads.lead_status,
      leads.status,
      leads.deleted,
      leads.updatedAt,
      leads.assign_date as createdAt,
      leadStatusData.status_name as leadStatus,

      Json_object("_id",leadStatusData._id, "status_name",leadStatusData.status_name, "status_color",leadStatusData.status_color) AS leadStatusData,

      Json_object("_id",leads.bd_id, "name", bdData.name, "email", bdData.email,"designation", bdData.designation, "status", bdData.status) AS bdData,

      Json_object('_id', leadTypeData._id, 'status_name', leadTypeData.status_name) AS  leadTypeData,

      Json_object('_id', reqTypeData._id, 'status_name', reqTypeData.status_name) AS  reqTypeData,

      Json_object('_id', leadSourceData._id, 'status_name', leadSourceData.status_name) AS  leadSourceData,

      Json_object('_id', projectionStatusData._id, 'status_name', projectionStatusData.status_name) AS  projectionStatusData

      FROM leads

      left join master_statuses as leadStatusData on leads.lead_status = leadStatusData._id 
      left join businesses as bdData on leads.bd_id = bdData._id
      left join master_statuses as leadTypeData on leads.lead_type_id = leadTypeData._id
      left join master_statuses as reqTypeData on leads.lead_req_type_id = reqTypeData._id
      left join master_statuses as leadSourceData on leads.lead_source_id = leadSourceData._id
      left join master_statuses as projectionStatusData on leads.projection_status = projectionStatusData._id


      WHERE leads.bd_id = '${req?.user?._id}'`;


      if (lead_id) {
        leadsQuery += ` AND leads._id='${lead_id}'`;
      }

      // console.log(leadsQuery);
      let [lead] = await pool.promise().execute(leadsQuery,[])

      return {
        status: 200,
        success: true,
        msg: "Lead details get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead detail service.",
        data: error,
      };
    }
  }

  async getCallDetailService(req) {
    try {
      const { page, limit, search, lead_id } = req.query;

      let userFilter = [];

      userFilter.push(`leads.bd_id = "${req.user._id}"`);

      if (lead_id) {
        userFilter.push(`leads._id = '${lead_id}'`);
      }
      const leadQuery = `select 
                          leads._id  as _id,
                          leads.client_name as client_name,
                          leads.assign_date as assign_date,
                          leads.client_number as client_number,
                          leads.client_whatsapp_num as client_whatsapp_num,
                          leads.client_email as client_email,
                          leads.client_alternate_email as client_alternate_email,
                          leads.client_country as client_country,
                          leads.address as address,
                          leads.client_linkedin as client_linkedin,
                          leads.upwork_job_url as upwork_job_url,
                          leads.bid_url as bid_url,
                          leads.skype_id as skype_id,
                          leads.company_name as company_name,
                          leads.proposal_amount as proposal_amount,
                          leads.client_budget as client_budget,
                          leads.follow_up as follow_up,
                          leads.add_notes as add_notes,
                          leadStatusData.status_name as leadStatus,
                          leads.lead_status as lead_status,
                          leadTypeData.status_name as leadType,
                          reqTypeData.status_name as reqType,
                          reqTypeData.status_name as leadSource,
                          leads.deleted as deleted,
                          leads.updatedAt as updatedAt,
                          leads.assign_date as createdAt,
                          JSON_OBJECT(
                              'bd_id', bdData._id,
                              'name', bdData.name,
                              'email', bdData.email,
                              'designation', bdData.designation
                          ) as bdData,
                          JSON_OBJECT(
                        "_id", c._id,
                        "meeting_link", c.meeting_link,
                        "pe_name", c.pe_name,
                        "recording_link", c.recording_link,
                        "meeting_date_time", c.meeting_date_time,
                        "comment_remark", c.comment_remark,
                        "status", c.status,
                        "deleted", c.deleted,
                        "createdAt", c.createdAt,
                        "updatedAt", c.updatedAt,
                        "call_type", c.call_type,
                        "call_mode", c.call_mode,
                        "call_status", c.call_status
                      ) as callData
                          from leads
                    LEFT JOIN 
                      businesses AS bdData ON leads.bd_id = bdData._id
                    LEFT JOIN 
                      master_statuses AS leadStatusData ON leads.lead_status = leadStatusData._id
                    LEFT JOIN 
                      master_statuses AS leadTypeData ON leads.lead_type_id = leadTypeData._id
                    LEFT JOIN 
                      master_statuses AS reqTypeData ON leads.lead_req_type_id = reqTypeData._id
                    LEFT JOIN 
                      master_statuses AS leadSourceData ON leads.lead_source_id = leadSourceData._id
                    LEFT JOIN (
                      SELECT 
                        c.*,
                        ct.status_name AS call_type,
                        cm.status_name AS call_mode,
                        cs.status_name AS call_status
                      FROM 
                        calls c
                        LEFT JOIN master_statuses ct ON c.call_type_id = ct._id
                        LEFT JOIN master_statuses cm ON c.call_mode_id = cm._id
                        LEFT JOIN master_statuses cs ON c.call_status_id = cs._id
                      ORDER BY 
                        c.createdAt DESC
                      LIMIT 1
                    ) c ON leads._id = c.lead_id
                    ${
                      userFilter.length > 0
                        ? `WHERE ${userFilter.join(" AND ")}`
                        : ""
                    }`;

                    // console.log(leadQuery);
      const [lead] = await pool.promise().execute(leadQuery);

      return {
        status: 200,
        success: true,
        msg: "Lead details get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead detail service.",
        data: error,
      };
    }
  }

  async getRfpDetailService(req) {
    try {
      const { page, limit, search, lead_id } = req.query;
      let userFilter = [];

      userFilter.push(`leads.bd_id = "${req.user._id}"`);

      if (lead_id) {
        userFilter.push(`leads._id = '${lead_id}'`);
      }

      const rfpQuery = `select 
                              leads._id  as _id,
                                                leads.client_name as client_name,
                                                leads.assign_date as assign_date,
                                                leads.client_number as client_number,
                                                leads.client_whatsapp_num as client_whatsapp_num,
                                                leads.client_email as client_email,
                                                leads.client_alternate_email as client_alternate_email,
                                                leads.client_country as client_country,
                                                leads.address as address,
                                                leads.client_linkedin as client_linkedin,
                                                leads.upwork_job_url as upwork_job_url,
                                                leads.bid_url as bid_url,
                                                leads.skype_id as skype_id,
                                                leads.company_name as company_name,
                                                leads.proposal_amount as proposal_amount,
                                                leads.client_budget as client_budget,
                                                leads.follow_up as follow_up,
                                                leads.add_notes as add_notes,
                                                leadStatusData.status_name as leadStatus,
                                                leads.lead_status as lead_status,
                                                leadTypeData.status_name as leadType,
                                                reqTypeData.status_name as reqType,
                                                reqTypeData.status_name as leadSource,
                                                leads.deleted as deleted,
                                                leads.updatedAt as updatedAt,
                                                leads.assign_date as createdAt,
                                                JSON_OBJECT(
                                                    'bd_id', bdData._id,
                                                    'name', bdData.name,
                                                    'email', bdData.email,
                                                    'designation', bdData.designation
                                                ) as bdData,
                                                json_arrayagg(
                                                json_object(
                                                "_id", rfps._id,
                                  "sub_rfp_id",rfpData._id ,
                                  "lead_rfp_status", rfpStatusData.status_name,
                                  "rfp_type", rfpTypeData.status_name ,
                                  "activity", rfpActivity.status_name ,
                                  "pe_name", rfpData.pe_name,
                                  "pe_email", rfpData.pe_email,
                                  "remarks", rfpData.remarks,
                                  "minutes_of_meeting", rfpData.minutes_of_meeting,
                                  "attachments", rfpData.attachments,
                                  "createdAt", rfpData.createdAt,
                                  "updatedAt", rfpData.updatedAt
                                                )) as rfpData
                            from leads
                      LEFT JOIN 
                          businesses AS bdData ON leads.bd_id = bdData._id
                      LEFT JOIN 
                          rfps ON leads._id = rfps.lead_id
                      LEFT JOIN 
                          rfp_data AS rfpData ON rfps._id = rfpData.rfp_id
                      LEFT JOIN 
                          master_statuses AS leadStatusData ON leads.lead_status = leadStatusData._id
                      LEFT JOIN 
                          master_statuses AS leadTypeData ON leads.lead_type_id = leadTypeData._id
                      LEFT JOIN 
                          master_statuses AS reqTypeData ON leads.lead_req_type_id = reqTypeData._id
                      LEFT JOIN 
                          master_statuses AS leadSourceData ON leads.lead_source_id = leadSourceData._id
                      LEFT JOIN 
                          master_statuses AS rfpStatusData ON rfps.lead_rfp_status = rfpStatusData._id
                      LEFT JOIN 
                          master_statuses AS rfpTypeData ON rfpData.rfp_type = rfpTypeData._id
                      LEFT JOIN 
                          master_statuses AS rfpActivity ON rfpData.activity_id = rfpActivity._id
                      WHERE 
                          rfpData.createdAt = (
                              SELECT 
                                  MAX(rfpDataSub.createdAt)
                              FROM 
                                  rfp_data AS rfpDataSub
                              WHERE 
                                  rfps._id = rfpDataSub.rfp_id
                          ) AND  ${
                            userFilter.length > 0
                              ? `${userFilter.join(" AND ")}`
                              : ""
                          }
                      group by leads._id`;

      const lead = await pool.promise().execute(rfpQuery);

      return {
        status: 200,
        success: true,
        msg: "RFP details get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead RFP detail service.",
        data: error,
      };
    }
  }

  async getMonthStartDate(req) {
    let [[bdData]] = await pool
      .promise()
      .execute(`SELECT * FROM businesses WHERE _id='${req.user._id}'`);
    let [[clTarget]] = await pool
      .promise()
      .execute(
        `SELECT * FROM bd_targets WHERE bd_id=? AND cluster_head_id = ? AND target_month=? AND target_year=?`,
        [
          String(req.user._id),
          String(bdData?.cluster_head_id),
          moment().format("MMMM"),
          moment().format("YYYY"),
        ]
      );
    if (!clTarget) {
      [[clTarget]] = await pool
        .promise()
        .execute(
          `SELECT * FROM bd_targets WHERE bd_id=? AND cluster_head_id = ? AND target_month=? AND target_year=?`,
          [
            String(req.user._id),
            String(bdData?.cluster_head_id),
            moment().subtract(1, "month").format("MMMM"),
            moment().subtract(1, "month").format("YYYY"),
          ]
        );
    }
    // console.log("bdData",clTarget)
    return clTarget;
  }
}

const myInstance = new BdDashService();

module.exports = new BdDashService();
