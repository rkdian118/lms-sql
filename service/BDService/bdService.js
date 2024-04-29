const readXlsxFile = require("read-excel-file/node");
const _ = require("lodash");
const moment = require("moment");
const { generateFollowupDate } = require("../../helper/helperFun");
const { v4: uuidv4 } = require("uuid");

class BusinessService {
  async getMasterStatusService(req) {
    try {
      const statusType = req.query.status_type;

      let query = `SELECT _id, status_code, status_type, status_name, status_color FROM master_statuses`;
      let condition = "";

      if (statusType) {
        condition = ` WHERE status_type = "${statusType}"`;
      }

      query += condition;
      query += ` ORDER BY status_code ASC`;

      const [rows] = await pool.promise().execute(query, []);

      if (rows.length === 0) {
        return {
          status: 200,
          success: true,
          msg: "Master status not found.",
          data: rows,
        };
      }

      return {
        status: 200,
        success: true,
        msg: "Master status get successfully.",
        data: rows,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Something went wrong when get Master status service.",
        data: error,
      };
    }
  }

  async addLeadService(req) {
    try {
      const body = req.body;
      const [pro_status] = await pool
        .promise()
        .execute(
          `SELECT * FROM master_statuses WHERE status_name = ? AND status_type = ?`,
          ["Not In Projection", "projection_status"]
        );
      const leadData = {
        bd_id: String(req.user._id),
        lead_req_type_id: body.lead_req_type_id,
        lead_type_id: body.lead_type_id,
        lead_source_id: body.lead_source_id,
        projection_status: pro_status[0]._id,
        client_name: body.client_name,
        client_number: body.client_number,
        client_whatsapp_num: body.client_whatsapp_num,
        client_email: body.client_email,
        client_alternate_email: body.client_alternate_email,
        client_country: body.client_country,
        address: body.address,
        // pre_defined_note_id: body.pre_defined_note_id,
        client_linkedin: body.client_linkedin,
        upwork_job_url: body.upwork_job_url,
        skype_id: body.skype_id,
        company_name: body.company_name,
        bid_url: body.bid_url,
        proposal_amount: body.proposal_amount,
        client_budget: body.client_budget,
        add_notes: body.add_notes,
        assign_date: new Date().toISOString().slice(0, 10) + " 00:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      const [leadActive] = await pool
        .promise()
        .execute(`SELECT * FROM master_statuses WHERE status_name = ?`, [
          "Active",
        ]);
      leadActive ? (leadData["lead_status"] = leadActive[0]._id) : "";
      const filterLead = { _id: uuidv4() };
      Object.entries(leadData).forEach(([key, value]) => {
        if (value) filterLead[key] = value;
      });

      const [[leadTypeCheck]] = await pool.promise().execute(
        `
          SELECT * FROM master_statuses 
          WHERE _id = ?
          LIMIT 1
        `,
        [body.lead_type_id]
      );

      let checkCond = "";
      if (leadTypeCheck.status_name === "LinkedIn") {
        checkCond = `client_linkedin = "${body.client_linkedin}"`;
      } else if (leadTypeCheck.status_name === "Email") {
        checkCond = `client_email = "${body.client_email}"`;
      } else if (leadTypeCheck.status_name === "Upwork") {
        checkCond = `bid_url = "${body.bid_url}" OR upwork_job_url = "${body.upwork_job_url}" `;
      } else {
        checkCond = `client_name = "${body.client_name}" OR client_email = "${body.client_email}"`;
      }

      const [[leadEmailTypeCheck]] = await pool.promise().execute(
        `
        SELECT leads.*, businesses.*,
        master_statuses.status_name AS lead_status, 
        req_type.status_name AS lead_req_type, 
                  lead_type.status_name AS lead_type, 
                  lead_source.status_name AS lead_source, 
                  pro_status.status_name AS project_status  FROM leads
                  left join businesses ON businesses._id = leads.bd_id 
                  left join master_statuses ON master_statuses._id = leads.lead_status
                  left join master_statuses AS req_type ON req_type._id = leads.lead_req_type_id
                  left join master_statuses AS lead_type ON lead_type._id = leads.lead_type_id
                  left join master_statuses AS lead_source ON lead_source._id = leads.lead_source_id
                  left join master_statuses AS pro_status ON pro_status._id = leads.projection_status
          WHERE (${checkCond})
          LIMIT 1
        `,
        [String(req.user._id)]
      );
      console.log(leadEmailTypeCheck);
      if (
        leadEmailTypeCheck &&
        leadEmailTypeCheck.bd_id === String(req.user._id)
      ) {
        return {
          success: false,
          msg: "You have already added this lead.",
          status: 400,
          data: leadEmailTypeCheck,
        };
      }

      if (leadEmailTypeCheck && leadEmailTypeCheck.lead_status !== "Dead") {
        const keys = Object.keys(filterLead);
        const values = Object.values(filterLead);
        const placeholders = Array(values.length).fill("?").join(",");

        const [duplicateLead] = await pool
          .promise()
          .execute(
            `INSERT INTO duplicate_leads (${keys.join(
              ","
            )}) VALUES (${placeholders})`,
            values
          );

        return {
          success: false,
          msg: `${leadEmailTypeCheck.name} is handling this lead, and the lead status is ${leadEmailTypeCheck.lead_status}.`,
          status: 400,
          data: leadEmailTypeCheck,
        };
      }

      if (leadEmailTypeCheck && leadEmailTypeCheck.lead_status === "Dead") {
        console.log("0in");
        const [transferLead] = await pool.promise().execute(
          `
            UPDATE leads
            SET transfer_lead = true, transfer_lead_date = ?
            WHERE _id = ?
          `,
          [
            new Date().toISOString().slice(0, 19).replace("T", " "),
            leadEmailTypeCheck._id,
          ]
        );

        filterLead["transfer_lead_id"] = leadEmailTypeCheck._id;
        filterLead["transfer_lead_date"] = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        const keys = Object.keys(filterLead);
        const values = Object.values(filterLead);
        const placeholders = Array(values.length).fill("?").join(",");

        const [newLeadDta] = await pool
          .promise()
          .execute(
            `INSERT INTO leads (${keys.join(",")}) VALUES (${placeholders})`,
            values
          );
        const [newLead] = await pool
          .promise()
          .execute(
            `SELECT * FROM leads WHERE _id = "${filterLead._id}"`,
            values
          );

        const [introMailActivity] = await pool.promise().execute(
          `
            SELECT * FROM master_statuses
            WHERE status_name = ?
          `,
          ["Intro Mail"]
        );

        const [newActivityData] = await pool.promise().execute(
          `
            INSERT INTO lead_activities (_id, activity_id, followup_date, lead_id, status, deleted, createdAt, updatedAt)
            VALUES (?,?,?,?,?,?,?,?)
          `,
          [
            uuidv4(),
            introMailActivity[0]._id,
            new Date().toISOString().slice(0, 19).replace("T", " "),
            newLead[0]._id,
            "1",
            false,
            new Date().toISOString().slice(0, 19).replace("T", " "),
            new Date().toISOString().slice(0, 19).replace("T", " "),
          ]
        );

        const [newActivity] = await pool
          .promise()
          .execute(
            `SELECT * FROM lead_activities WHERE lead_id = "${filterLead._id}" ORDER BY createdAt ASC`,
            []
          );

        console.log(newActivity);

        const [newActivityComment] = await pool.promise().execute(
          `
            INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt)
            VALUES (?,?,?,?,?,?)
          `,
          [
            uuidv4(),
            req.user._id,
            introMailActivity[0].status_name,
            newActivity[0]._id,
            new Date().toISOString().slice(0, 19).replace("T", " "),
            new Date().toISOString().slice(0, 19).replace("T", " "),
          ]
        );
        return {
          status: 201,
          success: true,
          msg: "Lead create successfully.",
          data: newLead[0],
        };
      }

      const keys = Object.keys(filterLead);
      const values = Object.values(filterLead);
      const placeholders = Array(values.length).fill("?").join(",");

      const [newLeadDta] = await pool
        .promise()
        .execute(
          `INSERT INTO leads (${keys.join(",")}) VALUES (${placeholders})`,
          values
        );
      const [newLead] = await pool
        .promise()
        .execute(`SELECT * FROM leads WHERE _id = "${filterLead._id}"`, values);

      const [introMailActivity] = await pool.promise().execute(
        `
            SELECT * FROM master_statuses
            WHERE status_name = ?
          `,
        ["Intro Mail"]
      );

      const [newActivityData] = await pool.promise().execute(
        `
            INSERT INTO lead_activities (_id, activity_id, followup_date, lead_id, status, deleted, createdAt, updatedAt)
            VALUES (?,?,?,?,?,?,?,?)
          `,
        [
          uuidv4(),
          introMailActivity[0]._id,
          generateFollowupDate(new Date()),
          newLead[0]._id,
          "1",
          false,
          new Date().toISOString().slice(0, 19).replace("T", " "),
          new Date().toISOString().slice(0, 19).replace("T", " "),
        ]
      );

      const [newActivity] = await pool
        .promise()
        .execute(
          `SELECT * FROM lead_activities WHERE lead_id = "${filterLead._id}" ORDER BY createdAt ASC`,
          []
        );

      const [newActivityComment] = await pool.promise().execute(
        `
            INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt)
            VALUES (?,?,?,?,?,?)
          `,
        [
          uuidv4(),
          req.user._id,
          introMailActivity[0].status_name,
          newActivity[0]._id,
          new Date().toISOString().slice(0, 19).replace("T", " "),
          new Date().toISOString().slice(0, 19).replace("T", " "),
        ]
      );
      return {
        status: 201,
        success: true,
        msg: "Lead create successfully.",
        data: newLead[0],
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        success: false,
        msg: "Something went wrong when creating lead.",
        data: error,
      };
    }
  }

  async getLeadsService(req) {
    try {
      const {
        page,
        limit,
        search,
        lead_status_id,
        start_date,
        end_date,
        client_country,
        with_number,
        lead_req_type_id,
        lead_source_id,
        lead_type_id,
      } = req.query;

      const pageNumber = parseInt(page) || 1;
      const pageSize = parseInt(limit) || 10;

      const date = new Date();
      let startDate = new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-01`
      );
      let endDate = new Date();

      if (start_date && end_date) {
        startDate = new Date(moment(start_date).startOf("day"));
        endDate = new Date(moment(end_date).endOf("day"));
      }

      let userFilter = [];

      // if (req?.user?._id) {
      userFilter.push(`bd_id = "${req.user._id}"`);
      // }

      if (with_number) {
        if (with_number == 0) {
          userFilter.push("client_number = ''");
        } else {
          userFilter.push("client_number != ''");
        }
      }

      if (lead_status_id) {
        userFilter.push(`lead_status = '${lead_status_id}'`);
      }

      if (lead_type_id) {
        userFilter.push(`lead_type_id = '${lead_type_id}'`);
      }

      if (lead_req_type_id) {
        userFilter.push(`lead_req_type_id = '${lead_req_type_id}'`);
      }

      if (lead_source_id) {
        userFilter.push(`lead_source_id = '${lead_source_id}'`);
      }

      if (client_country) {
        userFilter.push(`client_country LIKE '%${client_country}%'`);
      }

      if (start_date && end_date) {
        userFilter.push(
          `assign_date BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`
        );
      }

      let matchQuery = "";

      if (search) {
        matchQuery = `(client_name LIKE '%${search}%' OR client_email LIKE '%${search}%')`;
      }

      const countQuery = `
              SELECT COUNT(*) AS totalDocs 
              FROM leads 
              ${
                userFilter.length > 0 ? `WHERE ${userFilter.join(" AND ")}` : ""
              }
              ${matchQuery ? `AND ${matchQuery}` : ""}
          `;

      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;

      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      let leadsQuery = `
      SELECT 
      leads._id AS _id,
      lead_req_type_id,
      lead_source_id,
      client_name,
      client_number,
      client_whatsapp_num,
      client_email,
      client_alternate_email,
      client_country,
      address,
      client_linkedin,
      upwork_job_url,
      bid_url,
      skype_id,
      company_name,
      proposal_amount,
      client_budget,
      follow_up,
      add_notes,
      lead_status,
      transfer_lead,
      assign_date
      AS createdAt,
      leads.updatedAt
      AS updatedAt,
      leads.status
      AS status,
      leads.deleted
      AS deleted,
      Json_object('bd_id', bd._id, 'name', bd.NAME, 'status', bd.status,
      'email',
      bd.email, 'designation', bd.designation)
      AS bdData,
      Json_object('_id', lt._id, 'status_name', lt.status_name, 'status_color',
      lt.status_color)
      AS leadTypeData,
      Json_object('_id', rt._id, 'status_name', rt.status_name, 'status_color',
      rt.status_color)
      AS reqTypeData,
      Json_object('_id', ls._id, 'status_name', ls.status_name, 'status_color',
      ls.status_color)
      AS leadSourceData,
      Json_object('_id', lsd._id, 'status_name', lsd.status_name,
      'status_color',
      lsd.status_color)
      AS leadStatusData,
      Json_object('_id', psd._id, 'status_name', psd.status_name,
      'status_color',
      psd.status_color)
      AS projectionStatusData,
      Json_object('totalResponses', Ifnull(
      leadResponseData.totalresponses_count, 0),
      'negativeResponses', Ifnull(leadResponseData.negativeresponses_count, 0),
      'positiveResponses', Ifnull(leadResponseData.positiveresponses_count, 0))
      AS
      leadResponseData,
      Json_object("_id", la._id, "activity_id", la.activity_id,
      "activitystatuscode",
      ma.status_code, "lead_id", la.lead_id, "status_type", ma.status_type, "status_name",
      ma.status_name,
      "update_activity_id", uad._id, "update_activitystatuscode",
      uad.status_code,
      "update_status_type", uad.status_type, "update_status_name",
      uad.status_name,
      "followup_date", la.followup_date, "createdAt", la.createdAt, "updatedAt"
      ,
      la.updatedAt)
      AS resp
  FROM   leads
  LEFT JOIN (
    SELECT _id, lead_id, activity_id, followup_date, createdAt, updatedAt
    FROM (
        SELECT _id, lead_id, activity_id, followup_date, createdAt, updatedAt,
            ROW_NUMBER() OVER (PARTITION BY lead_id ORDER BY createdAt DESC) as rn
        FROM lead_activities
    ) t
    WHERE t.rn = 1
  ) AS la
       ON leads._id = la.lead_id
      LEFT JOIN businesses AS bd
             ON leads.bd_id = bd._id
      LEFT JOIN master_statuses AS lt
             ON leads.lead_type_id = lt._id
      LEFT JOIN master_statuses AS rt
             ON leads.lead_req_type_id = rt._id
      LEFT JOIN master_statuses AS ls
             ON leads.lead_source_id = ls._id
      LEFT JOIN master_statuses AS lsd
             ON leads.lead_status = lsd._id
      LEFT JOIN master_statuses AS psd
             ON leads.projection_status = psd._id
      LEFT JOIN (SELECT lead_id,
                        Sum(CASE
                              WHEN response = 1 THEN 1
                              ELSE 0
                            END) AS positiveResponses_count,
                        Sum(CASE
                              WHEN response = 2 THEN 1
                              ELSE 0
                            END) AS negativeResponses_count,
                        Count(*) AS totalResponses_count
                 FROM   lead_responses
                 GROUP  BY lead_id) AS leadResponseData
             ON leads._id = leadResponseData.lead_id
      LEFT JOIN master_statuses AS ma
             ON la.activity_id = ma._id
      LEFT JOIN master_statuses AS uad
             ON ma.status_code + 1 = uad.status_code
                AND uad.status_type = 'lead_follow_ups'
                ${
                  userFilter.length > 0
                    ? `WHERE ${userFilter.join(" AND ")}`
                    : ""
                }
                ${matchQuery ? `AND ${matchQuery}` : ""}
                ORDER BY assign_date DESC
                LIMIT ${pageSize}
                OFFSET ${skip};`;

      const [resultAggregate] = await pool.promise().execute(leadsQuery);

      return {
        status: 200,
        success: true,
        msg: "Lead get successfully.",
        data: {
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

  async updateLeadService(req) {
    try {
      const body = req.body;

      const [[lead]] = await pool
        .promise()
        .execute(`SELECT * FROM leads WHERE _id = ?`, [body._id]);

      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found",
          data: lead,
        };
      }

      const leadValid = {};
      if (
        body.client_name != lead.client_name ||
        body.client_linkedin != lead.client_linkedin ||
        body.upwork_job_url != lead.upwork_job_url
      ) {
        leadValid["client_name"] = body.client_name;
        leadValid["lead_req_type_id"] = body.lead_req_type_id;
        leadValid["lead_type_id"] = body.lead_type_id;
        leadValid["client_linkedin"] = body.client_linkedin;
        leadValid["upwork_job_url"] = body.upwork_job_url;
      }

      const filterLeadValid = {
        ...Object.fromEntries(Object.entries(leadValid).filter(([_, v]) => v)),
      };

      if (filterLeadValid && Object.keys(filterLeadValid).length > 0) {
        const leadFindQuery = `
        SELECT
            leads.*,
            JSON_OBJECT(
              "_id", bd._id,
                "emp_id", bd.emp_id,
                "name", bd.name,
                "email", bd.email
            ) AS bd_id,
            JSON_OBJECT(
                "status_name", lt.status_name
            ) AS lead_type_id
        FROM
            leads
            LEFT JOIN businesses AS bd ON leads.bd_id = bd._id 
            LEFT JOIN master_statuses AS lt ON leads.lead_type_id = lt._id 
        WHERE
            leads._id <> ?
            ${Object.keys(filterLeadValid)
              .map((key) => `AND ${key} = ?`)
              .join(" ")}
    `;

        const filterLeadValidValues = Object.values(filterLeadValid);

        const [leadFind] = await pool
          .promise()
          .execute(leadFindQuery, [body._id, ...filterLeadValidValues]);

        if (
          leadFind[0] &&
          leadFind[0].bd_id?._id === "656f278d9c4f6d4c72426d8e"
        ) {
          return {
            success: false,
            msg: "You have already added this lead.",
            status: 400,
            data: leadFind[0],
          };
        }

        if (leadFind && leadFind != "") {
          return {
            success: false,
            msg: `The ${leadFind[0]?.bd_id?.name} handling this lead, ${leadFind[0]?.lead_type_id?.status_name} type lead.`,
            status: 400,
            data: leadFind[0],
          };
        }
      }

      const query = `
      UPDATE leads
      SET
        lead_req_type_id = IF(LENGTH(?) > 0, ?, lead_req_type_id),
        lead_type_id = IF(LENGTH(?) > 0, ?, lead_type_id),
        lead_source_id = IF(LENGTH(?) > 0, ?, lead_source_id),
        client_name = IF(LENGTH(?) > 0, ?, client_name),
        company_name = IF(LENGTH(?) > 0, ?, company_name),
        skype_id = IF(LENGTH(?) > 0, ?, skype_id),
        client_number = IF(LENGTH(?) > 0, ?, client_number),
        client_whatsapp_num = IF(LENGTH(?) > 0, ?, client_whatsapp_num),
        client_email = IF(LENGTH(?) > 0, ?, client_email),
        client_country = IF(LENGTH(?) > 0, ?, client_country),
        client_linkedin = IF(LENGTH(?) > 0, ?, client_linkedin),
        address = IF(LENGTH(?) > 0, ?, address),
        upwork_job_url = IF(LENGTH(?) > 0, ?, upwork_job_url),
        bid_url = IF(LENGTH(?) > 0, ?, bid_url),
        proposal_amount = IF(LENGTH(?) > 0, ?, proposal_amount),
        client_budget = IF(LENGTH(?) > 0, ?, client_budget),
        add_notes = IF(LENGTH(?) > 0, ?, add_notes)
      WHERE
        _id = ?`;

      //        client_alternate_email = IF(LENGTH(?) > 0, ?, client_alternate_email),

      const inputValues = [
        body.lead_req_type_id,
        body.lead_req_type_id,
        body.lead_type_id,
        body.lead_type_id,
        body.lead_source_id,
        body.lead_source_id,
        body.client_name,
        body.client_name,
        body.company_name,
        body.company_name,
        body.skype_id,
        body.skype_id,
        body.client_number,
        body.client_number,
        body.client_whatsapp_num,
        body.client_whatsapp_num,
        body.client_email,
        body.client_email,
        body.client_country,
        body.client_country,
        body.client_linkedin,
        body.client_linkedin,
        body.address,
        body.address,
        body.upwork_job_url,
        body.upwork_job_url,
        body.bid_url,
        body.bid_url,
        body.proposal_amount,
        body.proposal_amount,
        body.client_budget,
        body.client_budget,
        body.add_notes,
        body.add_notes,
        body._id,
      ];

      const [updateLead] = await pool.promise().execute(query, inputValues);
      return {
        status: 201,
        success: true,
        msg: "Lead updated successfully.",
        data: updateLead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update Lead service.",
        data: error,
      };
    }
  }

  async updateLeadStatusService(req) {
    try {
      const { body } = req;

      const [[lead]] = await pool
        .promise()
        .execute(`select * from leads where _id = ?`, [body.lead_id]);

      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found",
          data: lead,
        };
      }

      const [[leadStatus]] = await pool
        .promise()
        .execute(`select * from master_statuses where _id = ?`, [
          body.lead_status,
        ]);

      if (!leadStatus) {
        return {
          status: 400,
          success: false,
          msg: "Lead status not found",
          data: leadStatus,
        };
      }

      if (leadStatus.status_name === "Prospect") {
        if (!body?.projection_status) {
          return {
            status: 400,
            success: false,
            msg: "Project status is required",
            data: {},
          };
        }
        lead.projection_status = body.projection_status;
      } else if (leadStatus.status_name === "Dead") {
        lead.projection_status = await masterStatusCheck(
          "Dead",
          "projection_status"
        );
      } else if (leadStatus.status_name === "Awarded") {
        lead.projection_status = await masterStatusCheck(
          "Invoice Cleared",
          "projection_status"
        );
      }

      const [updateLeadStatus] = await pool
        .promise()
        .execute(`UPDATE leads set lead_status = ? where _id = ?`, [
          body.lead_status,
          body.lead_id,
        ]);
      if (body.projection_status) {
        const [updateprojectStatus] = await pool
          .promise()
          .execute(`UPDATE leads set projection_status = ? where _id = ?`, [
            lead.projection_status,
            body.lead_id,
          ]);
      }
      return {
        status: 201,
        success: true,
        msg: "Lead status updated successfully.",
        data: updateLeadStatus,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update lead status service.",
        data: error,
      };
    }
  }

  async updateProjectionStatusService(req) {
    try {
      const { body } = req;
      // const profilePic = req.file;

      const [[lead]] = await pool
        .promise()
        .execute(`select * from leads where _id = ?`, [body.lead_id]);

      if (!lead) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found",
          data: lead,
        };
      }
      console.log(body.projection_status, "in");

      const [[projectionStatus]] = await pool
        .promise()
        .execute(
          `select * from master_statuses where _id = ? AND status_type = ?`,
          [body.projection_status, "projection_status"]
        );
      if (!projectionStatus) {
        return {
          status: 400,
          success: false,
          msg: "Projection status not found",
          data: projectionStatus,
        };
      }

      if (projectionStatus.status_name === "Dead") {
        lead.lead_status = await masterStatusCheck("Dead", "lead_status");
      } else if (projectionStatus.status_name === "Invoice Cleared") {
        lead.lead_status = await masterStatusCheck("Awarded", "lead_status");
      }
      lead.projection_status = body.projection_status;
      const [updateLeadStatus] = await pool
        .promise()
        .execute(
          `UPDATE leads set lead_status = ?, projection_status = ? where _id = ?`,
          [lead.lead_status, body.projection_status, body.lead_id]
        );

      return {
        status: 201,
        success: true,
        msg: "Projection status updated successfully.",
        data: updateLeadStatus,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update lead status service.",
        data: error,
      };
    }
  }

  async getLeadFollowUpStatusService(req) {
    try {
      const [[followupStatus]] = await pool
        .promise()
        .execute(
          `SELECT _id, status_code, status_name FROM master_statuses WHERE status_type = ?`,
          ["lead_follow_ups"]
        );

      if (!followupStatus) {
        return {
          status: 200,
          success: true,
          msg: "Lead follow-ups status not found.",
          data: followupStatus,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Lead follow-up status get successfully.",
        data: followupStatus,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get follow-up status service.",
        data: error,
      };
    }
  }

  async getAllActivitiesService(req) {
    try {
      const activities = await pool
        .promise()
        .execute(`SELECT * FROM master_statuses`, []);

      if (!activities) {
        return {
          status: 200,
          success: true,
          msg: "Activities not found.",
          data: activities,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Activities get successfully.",
        data: activities,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get Activities service.",
        data: error,
      };
    }
  }

  async getAllLeadCountsService(req) {
    const { page, limit, search, start_date, end_date } = req.query;
    let startDate = new Date();
    let endDate = new Date();

    if (start_date && end_date) {
      startDate = new Date(start_date);
      endDate = new Date(end_date);
    }

    let userFilter = [];
    if (req?.user?._id) {
      userFilter.push(`bd_id = '${req.user._id}'`);
    }
    if (start_date && end_date) {
      userFilter.push(
        `assign_date BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`
      );
    }

    let leadStatusQuery = `
        SELECT _id, status_name
        FROM master_statuses
        WHERE status_type = 'lead_status'
      `;

    let [leadStatusRows] = await pool.promise().execute(leadStatusQuery, []);

    let activeLead = leadStatusRows.find(
      (element) => element.status_name === "Active"
    )?._id;

    let deadLead = leadStatusRows.find(
      (element) => element.status_name === "Dead"
    )?._id;

    let prospectLead = leadStatusRows.find(
      (element) => element.status_name === "Prospect"
    )?._id;

    let holdLead = leadStatusRows.find(
      (element) => element.status_name === "Hold"
    )?._id;

    let transferLead = leadStatusRows.find(
      (element) => element.status_name === "Lead Return"
    )?._id;

    let awardedLead = leadStatusRows.find(
      (element) => element.status_name === "Awarded"
    )?._id;

    let inDiscussionLead = leadStatusRows.find(
      (element) => element.status_name === "In Discussion"
    )?._id;

    let query = `
        SELECT
          (SELECT COUNT(*) FROM leads WHERE ${
            userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
          }) AS totalLead,
          (SELECT COUNT(*) FROM leads WHERE lead_status = '${activeLead}' AND ${
      userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
    }) AS activeLead,
          (SELECT COUNT(*) FROM leads WHERE lead_status = '${deadLead}' AND ${
      userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
    }) AS deadLead,
          (SELECT COUNT(*) FROM leads WHERE lead_status = '${prospectLead}' AND ${
      userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
    }) AS prospectLead,
          (SELECT COUNT(*) FROM leads WHERE lead_status = '${holdLead}' AND ${
      userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
    }) AS holdLead,
          (SELECT COUNT(*) FROM leads WHERE lead_status = '${transferLead}' AND ${
      userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
    }) AS transferLead,
          (SELECT COUNT(*) FROM leads WHERE lead_status = '${awardedLead}' AND ${
      userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
    }) AS awardedLead,
          (SELECT COUNT(*) FROM leads WHERE lead_status = '${inDiscussionLead}' AND ${
      userFilter.length > 0 ? `${userFilter.join(" AND ")}` : ""
    }) AS inDiscussionLead
      `;

    try {
      let [rows] = await pool.promise().execute(query);
      if (!rows || !rows.length) {
        return {
          status: 200,
          success: false,
          msg: "Result not found.",
          data: null,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Results retrieved successfully.",
        data: rows[0],
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: "Something went wrong when retrieving lead counts.",
        data: error,
      };
    }
  }

  async updateLeadActivityService(req) {
    try {
      const { lead_activity_id, activity_id, comment } = req.body;

      let leadActivity;
      if (lead_activity_id) {
        [leadActivity] = await pool
          .promise()
          .execute("SELECT * FROM lead_activities WHERE _id = ?", [
            lead_activity_id,
          ]);

        if (leadActivity.length === 0) {
          return {
            status: 400,
            success: false,
            msg: "Lead activity not found",
            data: leadActivity,
          };
        }
      }

      if (leadActivity?.length && leadActivity[0].activity_id === activity_id) {
        return {
          status: 400,
          success: false,
          msg: "Lead activity already updated.",
          data: leadActivity,
        };
      }
      const [[activityStatus]] = await pool
        .promise()
        .execute("SELECT * FROM master_statuses WHERE _id = ?", [activity_id]);

      let followupDate = await generateFollowupDate();
      const dataId = uuidv4();
      const [data] = await pool
        .promise()
        .execute(
          "INSERT INTO lead_activities (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            dataId,
            activity_id ? activity_id : "",
            new Date(),
            "false",
            followupDate,
            leadActivity[0]?.lead_id ? leadActivity[0]?.lead_id : "",
            1,
            new Date(),
          ]
        );

      const [commentData] = await pool
        .promise()
        .execute(
          "INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
          [
            uuidv4(),
            req.user._id.toString(),
            comment ? comment : activityStatus.status_name,
            dataId,
            new Date(),
            new Date(),
          ]
        );
      return {
        status: 201,
        success: true,
        msg: "Activity updated successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update lead activity service.",
        data: error,
      };
    }
  }

  async addCommentLeadActivityService(req) {
    try {
      const { lead_activity_id, comment, type } = req.body;

      let leadActivity;
      if (lead_activity_id != "") {
        [leadActivity] = await pool
          .promise()
          .execute("SELECT * FROM lead_activities WHERE _id = ?", [
            lead_activity_id,
          ]);
        if (leadActivity.length === 0) {
          return {
            status: 400,
            success: false,
            msg: "Lead activity not found",
            data: leadActivity[0],
          };
        }
      }

      const [lead] = await pool
        .promise()
        .execute("SELECT * FROM leads WHERE _id = ?", [
          leadActivity[0]?.lead_id,
        ]);

      if (lead.length === 0) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found.",
          data: lead[0],
        };
      }

      const [data] = await pool
        .promise()
        .execute(
          "INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
          [
            uuidv4(),
            req.user._id.toString(),
            comment ? comment : activityStatus.status_name,
            leadActivity[0]._id,
            new Date(),
            new Date(),
          ]
        );
      return {
        status: 201,
        success: true,
        msg: "Comment successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update lead activity service.",
        data: error,
      };
    }
  }

  // async getLeadActivityService(req) {
  //   try {
  //     const { lead_id } = req.query;

  //     const matchQuery = {};

  //     matchQuery.lead_id = new mongoose.Types.ObjectId(lead_id);

  //     const leadActivity = await leadActivityModel.aggregate([
  //       {
  //         $match: matchQuery,
  //       },
  //       {
  //         $lookup: {
  //           from: "master_statuses",
  //           localField: "activity_id",
  //           foreignField: "_id",
  //           as: "activityData",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$activityData",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },
  //       {
  //         $unwind: "$comment",
  //       },
  //       {
  //         $lookup: {
  //           from: "logins",
  //           localField: "comment.comment_by_id",
  //           foreignField: "user_id",
  //           as: "comment.comment_by_data",
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           activityData: {
  //             _id: "$activityData._id",
  //             status_name: "$activityData.status_name",
  //           },
  //           comment_by_data: { $arrayElemAt: ["$comment.comment_by_data", 0] },
  //           comment: "$comment.comment",
  //           commentCreatedAt: "$comment.createdAt",
  //           commentUpdatedAt: "$comment.updatedAt",
  //           followup_date: 1,
  //           createdAt: 1,
  //           updatedAt: 1,
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           activityData: { $first: "$activityData" },
  //           comments: {
  //             $push: {
  //               comment_by: "$comment_by_data.username",
  //               comment_by_name: "$comment_by_data.name",
  //               comment: "$comment",
  //               _id: "$_id",
  //               createdAt: "$commentCreatedAt",
  //               updatedAt: "$commentUpdatedAt",
  //             },
  //           },
  //           followup_date: { $first: "$followup_date" },
  //           createdAt: { $first: "$createdAt" },
  //           updatedAt: { $first: "$updatedAt" },
  //         },
  //       },
  //       {
  //         $unwind: "$comments",
  //       },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           activityData: { $first: "$activityData" },
  //           comments: { $push: "$comments" },
  //           followup_date: { $first: "$followup_date" },
  //           createdAt: { $first: "$createdAt" },
  //           updatedAt: { $first: "$updatedAt" },
  //         },
  //       },
  //       {
  //         $sort: { createdAt: -1 },
  //       },
  //     ]);

  //     if (!leadActivity || leadActivity == "") {
  //       return {
  //         status: 400,
  //         success: true,
  //         msg: "leadActivity not found.",
  //         data: [],
  //       };
  //     }
  //     return {
  //       status: 200,
  //       success: true,
  //       msg: "leadActivity get successfully.",
  //       data: leadActivity,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 400,
  //       success: false,
  //       msg: error,
  //       data: error,
  //     };
  //   }
  // }

  async getAllLeadActivitiesService(req) {
    try {
      const [allLeadActivity] = await pool.promise().execute(
        `
        SELECT 
        la._id AS _id, 
        "lead_activity" AS type, 
        la.followup_date, 
        la.createdAt, 
        la.updatedAt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "_id", lac._id,
            "comment", lac.comment,
            "comment_by", lo.username,
            "comment_by_name", lo.name,
            "createdAt", lac.createdAt,
            "updatedAt", lac.updatedAt
          )
        ) AS comments,
        JSON_OBJECT(
          "_id", mas2._id,
          "status_name", mas2.status_name
        ) AS activityData
      FROM 
        leads AS l
        LEFT JOIN lead_activities AS la ON l._id = la.lead_id
        LEFT JOIN master_statuses AS mas2 ON la.activity_id = mas2._id
        LEFT JOIN lead_activity_comment AS lac ON lac.lead_activity_id = la._id
        LEFT JOIN logins AS lo ON lo.user_id = l.bd_id
      WHERE 
        l._id = ?
        AND mas2.status_type NOT IN ('call_status', 'rfp_status')
      GROUP BY
        la._id
        
        UNION ALL
        
      
      SELECT 
        ca._id AS _id, 
        "call_activity" AS type, 
         ca.createdAt AS  followup_date , 
        ca.createdAt, 
        ca.updatedAt,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "_id", cac._id,
            "comment", cac.comment,
            "comment_by", ll.username,
            "comment_by_name", ll.name,
            "createdAt", cac.createdAt,
            "updatedAt", cac.updatedAt
          )
        ) AS comments,
        JSON_OBJECT(
          "_id", mas4._id,
          "status_name", mas4.status_name
        ) AS activityData
      FROM 
        leads AS lee
        LEFT JOIN call_activities AS ca ON lee._id = ca.lead_id
        LEFT JOIN master_statuses AS mas4 ON ca.activity_id = mas4._id
        LEFT JOIN call_activity_comment AS cac ON cac.call_activity_id = ca._id
        LEFT JOIN logins AS ll ON ll.user_id = lee.bd_id
      WHERE 
        lee._id = ?
        AND mas4.status_type NOT IN ('lead_status', 'rfp_status')
      GROUP BY
        ca._id
        
        UNION ALL
        
        SELECT 
              ra._id AS _id, 
              "rfp_activity" AS type, 
               ra.createdAt AS  followup_date , 
              ra.createdAt, 
              ra.updatedAt,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  "_id", rac._id,
                  "comment", rac.comment,
                  "comment_by", llr.username,
                  "comment_by_name", llr.name,
                  "createdAt", rac.createdAt,
                  "updatedAt", rac.updatedAt
                )
              ) AS comments,
              JSON_OBJECT(
                "_id", mas6._id,
                "status_name", mas6.status_name
              ) AS activityData
            FROM 
              leads AS lr
              LEFT JOIN rfp_activities AS ra ON lr._id = ra.lead_id
              LEFT JOIN master_statuses AS mas6 ON ra.activity_id = mas6._id
              LEFT JOIN rfp_activity_comment AS rac ON rac.rfp_activity_id = ra._id
              LEFT JOIN logins AS llr ON llr.user_id = lr.bd_id
            WHERE 
              lr._id = ?
              AND mas6.status_type NOT IN ('call_status', 'lead_status')
            GROUP BY
              ra._id
      
              order by createdAt DESC
        `,
        [req.query.lead_id, req.query.lead_id, req.query.lead_id]
      );

      return {
        status: 200,
        success: true,
        msg: "Lead activity get successfully.",
        data: allLeadActivity,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead activity service.",
        data: error,
      };
    }
  }

  async getDropdownLeadsService(req) {
    try {
      const { page, limit, search } = req.query;

      let userFilter = [];

      userFilter.push(`l.bd_id = "${req.user._id}"`);

      if (search) {
        userFilter.push(
          `(l.client_name LIKE '%${search}%' OR l.client_email LIKE '%${search}%' OR l.client_country LIKE '%${search}%')`
        );
      }

      const [lead] = await pool.promise().execute(
        `SELECT
        l._id AS _id,
      l.client_name,
      l.client_email,
      l.client_country,
      ms1.status_name AS requirement_type,
      ms2.status_name AS lead_status
    FROM
      leads AS l
      INNER JOIN master_statuses AS ms1 ON l.lead_req_type_id = ms1._id
      INNER JOIN master_statuses AS ms2 ON l.lead_status = ms2._id
      ${userFilter.length > 0 ? `WHERE ${userFilter.join(" AND ")}` : ""}    
      AND ms2.status_name NOT IN ('Dead', 'Awarded', 'Lead Return')
    ORDER BY
      l.createdAt DESC;`,
        [req.user._id]
      );

      return {
        status: 200,
        success: true,
        msg: "Lead get successfully.",
        data: lead,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get dropdown lead service.",
        data: error,
      };
    }
  }

  async addLeadFollowupCallService(req) {
    try {
      let { body, user } = req;
      const leadQuery = ` SELECT * FROM leads WHERE _id = ?`;
      let [lead] = await pool.promise().execute(leadQuery, [body.lead_id]);
      if (lead.length === 0) {
        return {
          status: 400,
          success: false,
          msg: "Lead not found.",
          data: lead,
        };
      }

      const [data] = await pool.promise().execute(
        `INSERT INTO followup_calls 
          (_id, bd_id, comment, createdAt, deleted,
           lead_id, response, status, updatedAt) 
           VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          uuidv4(),
          String(user._id),
          body.comment,
          new Date(),
          false,
          body.lead_id,
          body.response ? body.response : "",
          1,
          new Date(),
        ]
      );

      return {
        status: 201,
        success: true,
        msg: "Lead followup call added successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when add lead followup call.",
        data: error,
      };
    }
  }

  async getLeadFollowupCallService(req) {
    try {
      let { body, user } = req;
      const { start_date, end_date, lead_id } = req.query;
      var date = new Date();
      let startDate = new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      ); //01

      // let startDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
      let endDate = new Date();

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(new Date(end_date).setHours(23, 59, 59, 999)); //new Date(end_date);
      }

      const query1 = `SELECT
                      fc._id AS _id,
                      fc.bd_id AS bd_id,
                      fc.lead_id AS lead_id,
                      fc.comment AS comment,
                      fc.response AS response,
                      fc.createdAt AS createdAt,
                      fc.updatedAt AS updatedAt
                    FROM
                      followup_calls AS fc
                    WHERE
                      fc.bd_id = ? 
                      AND fc.lead_id = ? 
                      ${
                        start_date &&
                        end_date &&
                        `AND (fc.createdAt BETWEEN ${start_date} AND ${end_date})`
                      }
                    ORDER BY
                      fc.createdAt DESC;`;

      const query2 = `SELECT
                    COUNT(*) AS count
                  FROM
                    followup_calls AS fc
                  WHERE
                  fc.bd_id = ? 
                  AND fc.lead_id = ? 
                  ${
                    start_date &&
                    end_date &&
                    `AND (fc.createdAt BETWEEN ${start_date} AND ${end_date})`
                  }`;

      const query3 = `SELECT
                      COUNT(*) AS count
                    FROM
                      followup_calls AS fc
                    WHERE
                    fc.bd_id = ? 
                    AND fc.lead_id = ? 
                    ${
                      start_date &&
                      end_date &&
                      `AND (fc.createdAt BETWEEN ${start_date} AND ${end_date})`
                    }
                      AND fc.response = 1;`;

      const query4 = `SELECT
                      COUNT(*) AS count
                    FROM
                      followup_calls AS fc
                    WHERE
                    fc.bd_id = ? 
                    AND fc.lead_id = ? 
                    ${
                      start_date && end_date
                        ? `AND (fc.createdAt BETWEEN ${start_date} AND ${end_date})`
                        : ""
                    }
                      AND fc.response = 2;`;

      const query5 = `SELECT
                      COUNT(*) AS count
                    FROM
                      followup_calls AS fc
                    WHERE
                    fc.bd_id = ? 
                    AND fc.lead_id = ? 
                    ${
                      start_date &&
                      end_date &&
                      `AND (fc.createdAt BETWEEN ${start_date} AND ${end_date})`
                    }
                      AND fc.response = 3;`;

      const [result1, result2, result3, result4, result5] = await Promise.all([
        pool.promise().execute(query1, [String(user._id), lead_id]),
        pool.promise().execute(query2, [String(user._id), lead_id]),
        pool.promise().execute(query3, [String(user._id), lead_id]),
        pool.promise().execute(query4, [String(user._id), lead_id]),
        pool.promise().execute(query5, [String(user._id), lead_id]),
      ]);

      const data = result1[0];
      const totalCalls = result2[0];
      const positiveCalls = result3[0];
      const negativeCalls = result4[0];
      const declinedCalls = result5[0];

      return {
        status: 201,
        success: true,
        msg: "Followup calls get successfully.",
        data: { data, totalCalls, positiveCalls, negativeCalls, declinedCalls },
      };

      return {
        status: 201,
        success: true,
        msg: "Followup calls get successfully.",
        data: result[0],
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when get followup calls.",
        data: error,
      };
    }
  }

  async addLeadResponseService(req) {
    try {
      let { body, user } = req;
      let date = new Date();
      let startDate = new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-01`
      );
      let endDate = new Date();
      let resp = body?.response == 1 ? "Positive" : "Negative";

      let [response] = await pool
        .promise()
        .execute(
          "SELECT * FROM lead_responses WHERE bd_id = ? AND lead_id = ? AND createdAt BETWEEN ? AND ?",
          [String(user._id), body.lead_id, startDate, endDate]
        );

      if (response && response.length > 0) {
        return {
          status: 400,
          success: false,
          msg: `Response already updated.`,
          data: response,
        };
      }

      const dataId = uuidv4();
      let [dataInsert] = await pool.promise().execute(
        `INSERT INTO lead_responses (_id, bd_id, lead_id, response, status, deleted, createdAt, updatedAt) 
           VALUES (?,?,?,?,?,?,?,?)`,
        [
          dataId,
          String(user._id),
          body.lead_id,
          body.response,
          "1",
          "false",
          new Date(),
          new Date(),
        ]
      );

      let [data] = await pool
        .promise()
        .execute(`SELECT * FROM lead_responses WHERE _id = ?`, [dataId]);

      console.log(data);
      if (data.length && data[0].response && data[0].response == "2") {
        let [leadStatus] = await pool
          .promise()
          .execute("SELECT * FROM master_statuses WHERE status_type = ?", [
            "lead_status",
          ]);

        let deadLead = leadStatus.filter((element) => {
          if (element.status_name == "Dead") {
            return element;
          }
        })[0];

        let [updateLeadStatus] = await pool
          .promise()
          .execute("UPDATE leads SET lead_status = ? WHERE _id = ?", [
            deadLead._id,
            body.lead_id,
          ]);

        if (updateLeadStatus.affectedRows > 0) {
          let followupDate = await generateFollowupDate();
          console.log(followupDate);
          const newDataId = uuidv4();
          let [leadactivityData] = await pool.promise().execute(
            `INSERT INTO lead_activities (_id, activity_id, followup_date, lead_id, status, createdAt, deleted, updatedAt)
               VALUES (?,?,?,?,?,?,?,?)`,
            [
              newDataId,
              deadLead._id,
              followupDate,
              body.lead_id,
              "1",
              new Date(),
              "false",
              new Date(),
            ]
          );

          const [addComment] = await pool
            .promise()
            .execute(
              "INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
              [
                uuidv4(),
                req.user._id.toString(),
                `A lead has been declared ${deadLead.status_name} by the ${req.user.name} after receiving Negative Response.`,
                newDataId,
                new Date(),
                new Date(),
              ]
            );
        }
      }

      return {
        status: 201,
        success: true,
        msg: `${resp} response updated successfully.`,
        data: data,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        success: false,
        msg: `Something went wrong when ${resp} response updated`,
        data: error,
      };
    }
  }

  async getLeadResponseService(req) {
    try {
      let { user } = req;
      const { page, limit, search, start_date, end_date, bd_id, lead_id } =
        req.query;

      let startDate = new Date();
      let endDate = new Date();

      if (start_date && end_date) {
        startDate = new Date(start_date);
        endDate = new Date(new Date(end_date).setHours(23, 59, 59, 999));
      }

      let match = "";
      let userFilter = [];

      if (user?._id) userFilter.push(`bd_id = "${user._id}"`);
      if (lead_id) userFilter.push(`lead_id = "${lead_id}"`);
      // if (start_date && end_date)
      //   userFilter.push(`createdAt BETWEEN '${startDate}' AND '${endDate}'`);

      if (userFilter.length > 0) match = ` ${userFilter.join(" AND ")}`;

      const [result] = await pool.promise().execute(
        `SELECT
               bd_id,
               lead_id,
               response,
               createdAt,
               updatedAt
        FROM lead_responses
               WHERE ${match}`
      );

      let [totalCalls] = await pool
        .promise()
        .execute(`SELECT COUNT(*) as count FROM lead_responses WHERE ${match}`);

      let [positiveCalls] = await pool
        .promise()
        .execute(
          `SELECT COUNT(*) as count FROM lead_responses WHERE response = 1 AND ${match}`
        );

      let [negativeCalls] = await pool
        .promise()
        .execute(
          `SELECT COUNT(*) as count FROM lead_responses WHERE response = 2 AND ${match}`
        );

      return {
        status: 201,
        success: true,
        msg: "Followup calls get successfully.",
        data: {
          data: result,
          totalCalls: totalCalls,
          positiveCalls: positiveCalls,
          negativeCalls: negativeCalls,
        },
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when get followup calls.",
        data: error,
      };
    }
  }

  async updateFollowupDatesService(req) {
    try {
      // const activities = await leadActivityModel.find();
      // const bulkOps = [];

      // for (const activity of activities) {
      //   const followupDate = await generateFollowupDate(activity.createdAt);
      //   bulkOps.push({
      //     updateOne: {
      //       filter: { _id: activity._id },
      //       update: { $set: { followup_date: followupDate } },
      //     },
      //   });
      // }

      // await leadActivityModel.bulkWrite(bulkOps);

      return {
        status: 201,
        success: true,
        msg: "Followups date updated successfully.",
        data: [],
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when get followup calls.",
        data: error,
      };
    }
  }

  async uploadLeadService(req) {
    const { body, file } = req;
    if (!body.bd_id) {
      return {
        status: 204,
        success: false,
        msg: `Bd Id is required`,
        data: {},
      };
    }
    const bd_id = body.bd_id;
    try {
      const rows = await readXlsxFile(file.path);
      rows.shift();
      let leadCount = 0;
      let duplicateLeadCount = 0;
      for (const row of rows) {
        // console.log(row);
        // return;
        let checkDate = row[20];
        // if (moment(row[20], "DD-MM-YYYY").isValid()) {
        //   checkDate = moment(row[20], "DD-MM-YYYY").format("YYYY-MM-DD"); // Format as ISO 8601
        // }
        let tutorial = {
          bd_id: String(bd_id),
          lead_req_type_id: await masterStatusCheck(row[1], "requirement_type"),
          lead_type_id: await masterStatusCheck(row[2], "lead_type"),
          lead_source_id: await masterStatusCheck(row[3], "lead_source"),
          client_name: row[4] ? row[4] : row[8],
          company_name: row[5] ? row[5] : "",
          client_number: row[6] ? row[6] : "",
          client_whatsapp_num: row[7] ? row[7] : "",
          client_email: row[8] ? row[8] : "",
          client_alternate_email: row[9] ? row[9] : "",
          skype_id: row[10] ? row[10] : "",
          client_country: row[11] ? row[11] : "",
          address: row[12] ? row[12] : "",
          client_linkedin: row[13] ? row[13] : "",
          upwork_job_url: row[14] ? row[14] : "",
          bid_url: row[15] ? row[15] : "",
          client_budget: row[16] ? row[16] : 0,
          proposal_amount: row[17] ? row[17] : 0,
          lead_status: await masterStatusCheck(row[18], "lead_status"),
          add_notes: row[19] ? row[19] : "",
          assign_date: new Date(checkDate),
          projection_status: await masterStatusCheck(
            "Not In Projection",
            "projection_status"
          ),
        };

        const leadValidKeys = [
          "client_name",
          "lead_req_type_id",
          "lead_type_id",
          "client_linkedin",
          "upwork_job_url",
        ];

        // Pick only the valid keys from the tutorial object
        const leadValid = _.pick(tutorial, leadValidKeys);

        // Omit any keys with null, undefined, or empty string values
        const filterLeadValid = _.omitBy(
          leadValid,
          (value) => _.isNil(value) || value === ""
        );

        // Constructing the SQL query
        const placeholders = Object.keys(filterLeadValid)
          .map((key) => `${key} = ?`)
          .join(" AND ");

        const query = `SELECT * FROM leads WHERE ${placeholders}`;

        // Executing the query with parameterized values
        const [[lead]] = await pool
          .promise()
          .execute(query, Object.values(filterLeadValid));

        // console.log(lead, query, Object.values(filterLeadValid));
        // return;
        let saveLead;

        if (lead) {
          [saveLead] = await pool.promise().execute(
            `INSERT INTO duplicate_leads 
                    (_id, add_notes, address, assign_date, bd_id, bid_url, client_budget, client_country, 
                      client_email, client_linkedin, client_name, client_number, client_whatsapp_num, company_name, 
                      follow_up, lead_id, lead_req_type_id, lead_source_id, lead_status, lead_type_id, proposal_amount,
                      skype_id, upwork_job_url, projection_status, status, deleted, createdAt, updatedAt) 
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              uuidv4(),
              tutorial?.add_notes || null,
              tutorial?.address || null,
              tutorial?.assign_date || null,
              String(bd_id),
              tutorial?.bid_url || null,
              tutorial?.client_budget || null,
              tutorial?.client_country || null,
              tutorial?.client_email || null,
              tutorial?.client_linkedin || null,
              tutorial?.client_name || null,
              tutorial?.client_number || null,
              tutorial?.client_whatsapp_num || null,
              tutorial?.company_name || null,
              "",
              String(lead._id),
              tutorial?.lead_req_type_id || null,
              tutorial?.lead_source_id || null,
              tutorial?.lead_status || null,
              tutorial?.lead_type_id || null,
              tutorial?.proposal_amount || null,
              tutorial?.skype_id || null,
              tutorial?.upwork_job_url || null,
              tutorial?.projection_status || null,
              "1",
              "false",
              new Date(),
              new Date(),
            ]
          );
          duplicateLeadCount += 1;
        } else {
          const leadId = uuidv4();
          [saveLead] = await pool.promise().execute(
            `INSERT INTO 
                      leads (_id, add_notes, address, assign_date, bd_id, bid_url, client_alternate_email, client_budget, client_country, 
                            client_email, client_linkedin, client_name, client_number, client_whatsapp_num, company_name, createdAt, deleted, 
                            follow_up, lead_req_type_id, lead_source_id, lead_status, lead_type_id, projection_status, proposal_amount, skype_id, 
                            status, transfer_lead, updatedAt, upwork_job_url, transfer_lead_date, transfer_lead_id) 
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              leadId,
              tutorial?.add_notes || null,
              tutorial?.address || null,
              tutorial?.assign_date || null,
              String(bd_id),
              tutorial?.bid_url || null,
              tutorial?.client_alternate_email || null,
              tutorial?.client_budget || null,
              tutorial?.client_country || null,
              tutorial?.client_email || null,
              tutorial?.client_linkedin || null,
              tutorial?.client_name || null,
              tutorial?.client_number || null,
              tutorial?.client_whatsapp_num || null,
              tutorial?.company_name || null,
              new Date(),
              "false",
              "",
              tutorial?.lead_req_type_id || null,
              tutorial?.lead_source_id || null,
              tutorial?.lead_status || null,
              tutorial?.lead_type_id || null,
              tutorial?.projection_status || null,
              tutorial?.proposal_amount || null,
              tutorial?.skype_id || null,
              "1",
              null,
              new Date(),
              tutorial?.upwork_job_url || null,
              null,
              null,
            ]
          );
          if (row[21] !== "Intro Mail") {
            let followupDate = await generateFollowupDate(checkDate);
            const LeadActId = uuidv4();
            const introMaster = await masterStatusCheck(
              "Intro Mail",
              "lead_follow_ups"
            );

            await pool.promise().execute(
              `insert into 
                                        lead_activities 
                                        (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) 
                                        values (?,?,?,?,?,?,?,?)`,
              [
                LeadActId,
                introMaster,
                new Date(),
                "false",
                followupDate,
                leadId,
                "1",
                new Date(),
              ]
            );

            await pool.promise().execute(
              `insert into 
                                        lead_activity_comment
                                        (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) 
                                        values (?,?,?,?,?,?)`,
              [
                uuidv4(),
                String(bd_id),
                "Intro Mail",
                LeadActId,
                new Date(),
                new Date(),
              ]
            );
          }

          let checkDate1 = row[22];
          let followupDate = await generateFollowupDate(checkDate1);
          // followup_date: followupDate,

          const LeadActId2 = uuidv4();
          const master = await masterStatusCheck(row[21], "lead_follow_ups");
          [
            LeadActId2,
            master,
            new Date(),
            "false",
            followupDate,
            leadId,
            "1",
            new Date(),
            row[21],
          ];
          await pool.promise().execute(
            `insert into 
                                        lead_activities 
                                        (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) 
                                        values (?,?,?,?,?,?,?,?)`,
            [
              LeadActId2,
              master,
              new Date(),
              "false",
              followupDate,
              leadId,
              "1",
              new Date(),
            ]
          );

          await pool.promise().execute(
            `insert into 
                                        lead_activity_comment
                                        (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) 
                                        values (?,?,?,?,?,?)`,
            [
              uuidv4(),
              String(bd_id),
              row[21],
              LeadActId2,
              new Date(),
              new Date(),
            ]
          );

          leadCount += 1;
        }
      }
      return {
        status: 201,
        success: true,
        msg: `${leadCount} leads Added and ${duplicateLeadCount} duplicate Leads Added`,
        data: {},
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when upload lead.",
        data: error,
      };
    }
  }

  async createManualDsrService(req) {
    try {
      const { date } = req.body;

      const [bdDataList] = await pool
        .promise()
        .execute(
          `select _id, cluster_head_id, cluster_lead_id from businesses where status = ? `,
          ["1"]
        );

      for (let i = 0; i < bdDataList.length; i++) {
        const element = bdDataList[i];
        console.log();
        const data = {
          bd_id: element._id,
          cluster_head_id: element.cluster_head_id,
          cluster_lead_id: element.cluster_lead_id,
          createdAt: new Date(moment.utc(date)),
        };

        await pool.promise().execute(
          `INSERT INTO bddsrs (_id, bd_id, calls_scheduled, cluster_head_id, 
              cluster_lead_id,  estimation_submitted, feature_list_shared, 
              follow_ups, lead_assigned, lead_negative_response, lead_positive_response, 
              linkedin_messages, linkedin_response, meeting_done, meeting_scheduled, 
              phone_call_done, proposal_amount, proposal_submitted, understamding_queries_submitted, 
              understanding_queries_submitted,  upwork_bids, upwork_positive_response, upwork_response, 
              createdAt, updatedAt) 
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            uuidv4(),
            element._id,
            0,
            element.cluster_head_id,
            element.cluster_lead_id,
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
            new Date(date + " 00:00:00"),
            new Date(),
          ]
        );
      }
      return {
        status: 201,
        success: true,
        msg: `DSR Created`,
        data: {},
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong when upload lead.",
        data: error,
      };
    }
  }
}

module.exports = new BusinessService();

const masterStatusCheck = async (status_name, type) => {
  try {
    const [[masterStatus]] = await pool
      .promise()
      .execute(
        `select * from master_statuses where status_type = ? AND status_name = ?`,
        [type, status_name]
      );
    return masterStatus?._id;
  } catch (err) {
    console.log(err);
  }
};
