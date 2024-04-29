const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

class BdCallService {
  async getLeadCallTypeService(req) {
    try {
      // const callType = await masterStatusModel.find({ $and: [{ status_type: "call" }] }).select('status_code status_name');
      const [callType] = await pool
        .promise()
        .execute(
          `SELECT status_code, status_name FROM master_statuses WHERE status_type = ? ORDER BY status_code ASC`,
          ["call_type"]
        );

      if (callType.length === 0) {
        return {
          status: 200,
          success: true,
          msg: "Call type not found.",
          data: callType,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Call type get successfully.",
        data: callType,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get call type service.",
        data: error,
      };
    }
  }

  async getLeadCallStatusService(req) {
    try {
      const [callStatus] = await pool
        .promise()
        .execute(
          `SELECT status_code, status_name FROM master_statuses WHERE status_type = ? ORDER BY status_code ASC`,
          ["call_status"]
        );

      if (callStatus.length === 0) {
        return {
          status: 200,
          success: true,
          msg: "Call status not found.",
          data: callStatus,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Call status get successfully.",
        data: callStatus,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get call status service.",
        data: error,
      };
    }
  }

  async getAllCallCountsService(req) {
    const { start_date, end_date } = req.query;
    let startDate = new Date(moment().startOf("month"));
    let endDate = new Date();

    if (start_date && end_date) {
      startDate = new Date(start_date);
      endDate = new Date(end_date);
    }

    let [callStatus] = await pool
      .promise()
      .execute(`SELECT * FROM master_statuses WHERE status_type = ?`, [
        "call_status",
      ]);

    let meetingScheduled = callStatus.filter((element) => {
      if (element.status_name == "Meeting Scheduled") {
        return element._id;
      }
    })[0]._id;

    let meetingDone = callStatus.filter((element) => {
      if (element.status_name == "Meeting Done") {
        return element._id;
      }
    })[0]._id;

    let meetingReSchedule = callStatus.filter((element) => {
      if (element.status_name == "Meeting Re-Scheduled") {
        return element._id;
      }
    })[0]._id;

    let meetingCancled = callStatus.filter((element) => {
      if (element.status_name == "Meeting Cancelled") {
        return element._id;
      }
    })[0]._id;

    try {
      const [newRes] = await pool.promise().execute(
        `SELECT
                (SELECT COUNT(*) FROM calls WHERE bd_id = ? AND createdAt BETWEEN ? AND ?) AS totalcalls,
                (SELECT COUNT(*) FROM calls WHERE bd_id = ? AND call_status_id = ? AND createdAt BETWEEN ? AND ?) AS meetingScheduled,
                (SELECT COUNT(*) FROM calls WHERE bd_id = ? AND call_status_id = ? AND createdAt BETWEEN ? AND ?) AS meetingDone,
                (SELECT COUNT(*) FROM calls WHERE bd_id = ? AND call_status_id = ? AND createdAt BETWEEN ? AND ?) AS meetingReSchedule,
                (SELECT COUNT(*) FROM calls WHERE bd_id = ? AND call_status_id = ? AND createdAt BETWEEN ? AND ?) AS meetingCancled
                FROM calls
                LIMIT 1;`,
        [
          String(req.user._id),
          startDate,
          endDate,
          String(req.user._id),
          meetingScheduled,
          startDate,
          endDate,
          String(req.user._id),
          meetingDone,
          startDate,
          endDate,
          String(req.user._id),
          meetingReSchedule,
          startDate,
          endDate,
          String(req.user._id),
          meetingCancled,
          startDate,
          endDate,
        ]
      );

      if (newRes.length === 0) {
        return {
          status: 200,
          success: false,
          msg: "Call counts not found.",
          data: newRes,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "Call counts get successfully.",
        data: newRes[0],
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get call count service.",
        data: error,
      };
    }
  }

  async addCallService(req) {
    try {
      const { body } = req;

      let meetingDateTime = new Date(body.meeting_date_time);

      let [scheduleStatus] = await pool
        .promise()
        .execute(`SELECT * FROM master_statuses WHERE status_name = ?`, [
          "Meeting Scheduled",
        ]);

      let [[checkLead]] = await pool
        .promise()
        .execute(`SELECT * FROM leads WHERE _id = ?`, [body.lead_id]);

      if (!checkLead) {
        return {
          success: false,
          msg: "Lead not found.",
          status: 400,
          data: checkLead,
        };
      }

      let [meetingScheduled] = await pool
        .promise()
        .execute(
          ` SELECT * FROM calls WHERE bd_id = ? AND meeting_date_time = ? AND call_status_id = ?`,
          [String(req.user._id), meetingDateTime, scheduleStatus[0]._id]
        );

      if (meetingScheduled.length > 0) {
        return {
          success: false,
          msg: "You have already scheduled a call at that time.",
          status: 400,
          data: meetingScheduled[0],
        };
      }

      const [callFound] = await pool.promise().execute(
        `SELECT * FROM calls 
          left join businesses AS bd ON calls.bd_id = bd._id  
          left join master_statuses AS call_type ON calls.call_type_id = call_type._id  
          WHERE lead_id = ? AND call_type_id = ? AND call_status_id = ?`,
        [body.lead_id, body.call_type_id, scheduleStatus[0]._id]
      );

      if (callFound.length && callFound[0].bd_id === String(req.user._id)) {
        return {
          success: false,
          msg: "You have already scheduled this call.",
          status: 400,
          data: callFound,
        };
      }

      if (callFound.length > 0) {
        return {
          success: false,
          msg: `${callFound[0].name} already handling this ${callFound[0].status_name} type call.`,
          status: 400,
          data: callFound[0],
        };
      }

      const callDataId = uuidv4();
      const [data] = await pool.promise().execute(
        `INSERT INTO calls (_id, bd_id, call_mode_id, call_status_id, call_type_id, comment_remark, createdAt, 
                    deleted, lead_id, meeting_date_time, meeting_link, pe_name, recording_link, status, updatedAt) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          callDataId,
          String(req.user._id),
          body.call_mode_id ? body.call_mode_id : "",
          scheduleStatus[0]._id,
          body.call_type_id ? body.call_type_id : "",
          body.comment_remark ? body.comment_remark : "",
          new Date(),
          "false",
          body.lead_id ? body.lead_id : "",
          meetingDateTime,
          body.meeting_link ? body.meeting_link : "",
          body.pe_name ? body.pe_name : "",
          body.recording_link ? body.recording_link : "",
          "1",
          new Date(),
        ]
      );
      if (data) {
        const LeadActDataId = uuidv4();
        const [leadactivityData] = await pool
          .promise()
          .execute(
            "INSERT INTO lead_activities (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              LeadActDataId,
              scheduleStatus[0]._id,
              new Date(),
              "false",
              new Date(),
              body.lead_id,
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
              String(req.user._id),
              body.comment_remark
                ? body.comment_remark
                : scheduleStatus[0].status_name,
              LeadActDataId,
              new Date(),
              new Date(),
            ]
          );

        const CallActDataId = uuidv4();
        const [callActivitySave] = await pool
          .promise()
          .execute(
            "INSERT INTO call_activities (_id, activity_id, call_id, createdAt, deleted, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              CallActDataId,
              scheduleStatus[0]._id,
              callDataId,
              new Date(),
              "false",
              body.lead_id,
              1,
              new Date(),
            ]
          );

        const [callCommentData] = await pool
          .promise()
          .execute(
            "INSERT INTO call_activity_comment (_id, comment_by_id, comment, call_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
            [
              uuidv4(),
              String(req.user._id),
              body.comment_remark
                ? body.comment_remark
                : scheduleStatus[0].status_name,
              CallActDataId,
              new Date(),
              new Date(),
            ]
          );
      }
      return {
        status: 201,
        success: true,
        msg: "Call scheduled successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something went wrong",
        data: error,
      };
    }
  }

  async getLeadCallsService(req) {
    try {
      const {
        page,
        limit,
        search,
        lead_id,
        call_status_id,
        start_date,
        end_date,
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
      userFilter.push(`leads.bd_id = "${req.user._id}"`);
      // }

      if (call_status_id) {
        userFilter.push(`calls.call_status_id = '${call_status_id}'`);
      }
      if (lead_id) {
        userFilter.push(`calls.lead_id = '${lead_id}'`);
      }

      if (start_date && end_date) {
        userFilter.push(
          `calls.meeting_date_time BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`
        );
      }

      if (search) {
        userFilter.push(`( leads.client_name LIKE '%${search}%' OR
                            leads.client_email LIKE '%${search}%' 
                            )`);
      }

      const countQuery = `
              SELECT COUNT(*) AS totalDocs 
              FROM calls 
              LEFT JOIN leads ON leads._id = calls.lead_id
              LEFT JOIN master_statuses AS callType ON callType._id = calls.call_type_id
              LEFT JOIN master_statuses AS callMode ON callMode._id = calls.call_mode_id
              LEFT JOIN master_statuses AS callStatus ON callStatus._id = calls.call_status_id
              ${
                userFilter.length > 0 ? `WHERE ${userFilter.join(" AND ")}` : ""
              }
          `;

      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;

      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      const callsQuery = `SELECT 
                calls._id,
                calls.meeting_link,
                calls.meeting_date_time,
                calls.comment_remark,
                calls.pe_name,
                calls.recording_link,
                calls.status,
                calls.deleted,
                calls.createdAt,
                calls.updatedAt, 
                JSON_OBJECT(
                "_id" , leads._id, 
                "bd_id", leads.bd_id, 
                "lead_req_type_id", leads.lead_req_type_id, 
                "lead_type_id", leads.lead_type_id, 
                "lead_source_id", leads.lead_source_id, 
                "client_name", leads.client_name, 
                "assign_date", leads.assign_date, 
                "client_number", leads.client_number, 
                "client_whatsapp_num", leads.client_whatsapp_num, 
                "client_email", leads.client_email, 
                "client_alternate_email", leads.client_alternate_email, 
                "client_country", leads.client_country, 
                "address", leads.address, 
                "client_linkedin", leads.client_linkedin, 
                "upwork_job_url", leads.upwork_job_url, 
                "bid_url", leads.bid_url, 
                "skype_id", leads.skype_id, 
                "company_name", leads.company_name, 
                "proposal_amount", leads.proposal_amount, 
                "client_budget", leads.client_budget, 
                "follow_up", leads.follow_up, 
                "lead_status", leads.lead_status, 
                "add_notes", leads.add_notes, 
                "transfer_lead", leads.transfer_lead, 
                "status", leads.status, 
                "deleted", leads.deleted, 
                "createdAt", leads.createdAt, 
                "updatedAt", leads.updatedAt, 
                "projection_status", leads.projection_status
            ) AS leadData,
                JSON_OBJECT("_id", callType._id,
                "admin_id", callType.admin_id,
                "status_code", callType.status_code,
                "status_type", callType.status_type,
                "status_name", callType.status_name,
                "createdAt", callType.createdAt,
                "updatedAt", callType.updatedAt,
                "status_color", callType.status_color
            ) AS callTypeData,
                JSON_OBJECT("_id", callMode._id,
                "admin_id", callMode.admin_id,
                "status_code", callMode.status_code,
                "status_type", callMode.status_type,
                "status_name", callMode.status_name,
                "createdAt", callMode.createdAt,
                "updatedAt", callMode.updatedAt,
                "status_color", callMode.status_color
            ) AS callModeData,
                JSON_OBJECT("_id", callStatus._id,
                "admin_id", callStatus.admin_id,
                "status_code", callStatus.status_code,
                "status_type", callStatus.status_type,
                "status_name", callStatus.status_name,
                "createdAt", callStatus.createdAt,
                "updatedAt", callStatus.updatedAt,
                "status_color", callStatus.status_color
            ) AS callStatusData
      FROM calls
            LEFT JOIN leads ON leads._id = calls.lead_id
            LEFT JOIN master_statuses AS callType ON callType._id = calls.call_type_id
            LEFT JOIN master_statuses AS callMode ON callMode._id = calls.call_mode_id
            LEFT JOIN master_statuses AS callStatus ON callStatus._id = calls.call_status_id
            ${userFilter.length > 0 ? `WHERE ${userFilter.join(" AND ")}` : ""}
            ORDER BY createdAt DESC
            LIMIT ${pageSize}
            OFFSET ${skip};`;

      const [resultAggregate] = await pool.promise().execute(callsQuery);

      // if (!resultAggregate || resultAggregate == "") {
      //   return {
      //     status: 400,
      //     success: false,
      //     msg: "Lead calls not found.",
      //     data: [],
      //   };
      // }
      return {
        status: 200,
        success: true,
        msg: "Lead calls get successfully.",
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
        msg: error, //"Somethin went wrong when get lead calls service.",
        data: error,
      };
    }
  }

  async updateCallService(req) {
    try {
      const body = req.body;

      const [[call]] = await pool
        .promise()
        .execute(`SELECT * FROM calls WHERE _id = ?`, [body.call_id]);

      if (!call) {
        return {
          status: 400,
          success: false,
          msg: "Call not found",
          data: call,
        };
      }

      let meetingDateTime = new Date(body.meeting_date_time);

      const [scheduleStatus] = await pool
        .promise()
        .execute(`SELECT * FROM master_statuses WHERE status_name = ?`, [
          "Meeting Scheduled",
        ]);

      let meetingScheduled;
      if (meetingDateTime != call.meeting_date_time) {
        [meetingScheduled] = await pool
          .promise()
          .execute(
            ` SELECT * FROM calls WHERE lead_id = ? AND bd_id = ? AND meeting_date_time = ? AND call_status_id = ?`,
            [
              call.lead_id,
              String(req.user._id),
              meetingDateTime,
              scheduleStatus[0]._id,
            ]
          );
      }
      if (meetingScheduled.length > 0) {
        return {
          success: false,
          msg: "You have already scheduled a call at that time.",
          status: 400,
          data: meetingScheduled[0],
        };
      }

      const callValid = {};
      if (
        body.call_mode_id != call.call_mode_id ||
        body.meeting_link != call.meeting_link ||
        body.meeting_date_time != call.meeting_date_time
      ) {
        callValid["lead_id"] = body.lead_id;
        callValid["call_mode_id"] = body.call_mode_id;
        callValid["meeting_link"] = body.meeting_link;
        callValid["meeting_date_time"] = body.meeting_date_time;
        callValid["call_type_id"] = body.call_type_id;
      }

      if (Object.keys(callValid).length > 0) {
        const [[callFind]] = await pool.promise().execute(
          `SELECT c.*, 
                  json_object("_id", ct._id, "status_name", ct.status_name) AS call_type_id,
                  json_object("_id", bd._id, "emp_id", bd.emp_id, "name", bd.name, "email", bd.email) AS bd_id
           FROM calls AS c
           LEFT JOIN businesses AS bd ON c.bd_id = bd._id
           LEFT JOIN master_statuses AS ct ON c.call_type_id = ct._id
           WHERE 
              c._id NOT IN (?) AND 
              c.lead_id = ? AND c.call_mode_id = ? AND c.meeting_link = ? AND 
              c.meeting_date_time = ? AND c.call_type_id = ? 
          `,
          [
            body.call_id,
            body.lead_id,
            body.call_mode_id,
            body.meeting_link,
            body.meeting_date_time,
            body.call_type_id,
          ]
        );

        if (callFind && callFind.bd_id?._id === req.user?._id.toString()) {
          return {
            success: false,
            msg: "You have already added this call.",
            status: 400,
            data: callFind,
          };
        }

        if (callFind && callFind != "") {
          return {
            success: false,
            msg: `The ${callFind?.bd_id?.name} handling this call, ${call?.call_type_id?.status_name} type lead.`,
            status: 400,
            data: callFind,
          };
        }
      }

      let callStatus =
        call.call_status_id.toString() == body.call_status_id
          ? ""
          : body.call_status_id;
      let [[callMasterStatus]] = await pool
        .promise()
        .execute(`select * from master_statuses where _id = ?`, [
          body.call_status_id,
        ]);

      call.call_mode_id = body.call_mode_id;
      call.meeting_link = body.meeting_link;
      call.meeting_date_time = meetingDateTime;
      call.pe_name = body.pe_name;
      call.recording_link = body.recording_link;
      call.call_type_id = body.call_type_id;
      call.call_status_id = body.call_status_id;
      call.comment_remark = body.comment_remark;

      const query = `   UPDATE calls
                        SET
                            lead_id = IF(LENGTH(?) > 0, ?, lead_id),
                            call_mode_id = IF(LENGTH(?) > 0, ?, call_mode_id),
                            meeting_link = IF(LENGTH(?) > 0, ?, meeting_link),
                            meeting_date_time = IF(LENGTH(?) > 0, ?, meeting_date_time),
                            pe_name = IF(LENGTH(?) > 0, ?, pe_name),
                            recording_link = IF(LENGTH(?) > 0, ?, recording_link),
                            call_type_id = IF(LENGTH(?) > 0, ?, call_type_id),
                            call_status_id = IF(LENGTH(?) > 0, ?, call_status_id),
                            comment_remark = IF(LENGTH(?) > 0, ?, comment_remark)
                        WHERE
                            _id = ?`;

      //        client_alternate_email = IF(LENGTH(?) > 0, ?, client_alternate_email),

      const inputValues = [
        body.lead_id || null,
        body.lead_id || null,
        body.call_mode_id || null,
        body.call_mode_id || null,
        body.meeting_link || null,
        body.meeting_link || null,
        meetingDateTime || null,
        meetingDateTime || null,
        body.pe_name || null,
        body.pe_name || null,
        body.recording_link || null,
        body.recording_link || null,
        body.call_type_id || null,
        body.call_type_id || null,
        body.call_status_id || null,
        body.call_status_id || null,
        body.comment_remark || null,
        body.comment_remark || null,
        body.call_id,
      ];

      const [updatecall] = await pool.promise().execute(query, inputValues);

      if (updatecall && callStatus != "") {
        const LeadActDataId = uuidv4();
        const [leadactivityData] = await pool
          .promise()
          .execute(
            "INSERT INTO lead_activities (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              LeadActDataId,
              body?.call_status_id ? body?.call_status_id : body.call_type_id,
              new Date(),
              "false",
              new Date(),
              body.lead_id,
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
              String(req.user._id),
              body.comment_remark
                ? body.comment_remark
                : callMasterStatus.status_name,
              LeadActDataId,
              new Date(),
              new Date(),
            ]
          );

        const CallActDataId = uuidv4();
        const [callActivitySave] = await pool
          .promise()
          .execute(
            "INSERT INTO call_activities (_id, activity_id, call_id, createdAt, deleted, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              CallActDataId,
              body?.call_status_id ? body?.call_status_id : body.call_type_id,
              body.call_id,
              new Date(),
              "false",
              body.lead_id,
              1,
              new Date(),
            ]
          );

        const [callCommentData] = await pool
          .promise()
          .execute(
            "INSERT INTO call_activity_comment (_id, comment_by_id, comment, call_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
            [
              uuidv4(),
              String(req.user._id),
              body.comment_remark
                ? body.comment_remark
                : scheduleStatus[0].status_name,
              CallActDataId,
              new Date(),
              new Date(),
            ]
          );
      }
      return {
        status: 201,
        success: true,
        msg: "Call updated successfully.",
        data: updatecall,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update call service.",
        data: error,
      };
    }
  }

  async getCallActivityService(req) {
    try {
      const { call_id } = req.query;

      const [callActivity] = await pool.promise().execute(
        `SELECT 
                                            la._id AS _id,
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
                                            ) AS activityData,  
                                            la.createdAt, 
                                            la.updatedAt
                                        FROM 
                                            calls AS l
                                            LEFT JOIN call_activities AS la ON l._id = la.call_id
                                            LEFT JOIN master_statuses AS mas1 ON la.activity_id = mas1._id
                                            LEFT JOIN master_statuses AS mas2 ON la.activity_id = mas2._id
                                            LEFT JOIN (
                                                SELECT 
                                                    call_activity_id, 
                                                    _id, 
                                                    comment, 
                                                    createdAt, 
                                                    updatedAt
                                                FROM 
                                                    call_activity_comment
                                                ORDER BY 
                                                    createdAt ASC
                                            ) AS lac ON lac.call_activity_id = la._id
                                            LEFT JOIN logins AS lo ON lo.user_id = l.bd_id
                                        WHERE 
                                            l._id = ?
                                            group by la._id
                                        order by la.createdAt desc`,
        [call_id]
      );

      if (!callActivity || callActivity == "") {
        return {
          status: 400,
          success: false,
          msg: "callActivity not found.",
          data: [],
        };
      }
      return {
        status: 200,
        success: true,
        msg: "callActivity get successfully.",
        data: callActivity,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead call activities service.",
        data: error,
      };
    }
  }

  async updateCallActivityService(req) {
    try {
      const { call_activity_id, activity_id, comment } = req.body;

      let callActivity;
      if (call_activity_id != "") {
        [[callActivity]] = await pool
          .promise()
          .execute(`SELECT * FROM call_activities where _id = ? `, [
            call_activity_id,
          ]);

        if (!callActivity) {
          return {
            status: 400,
            success: false,
            msg: "callActivity not found",
            data: callActivity,
          };
        }
      }
      if (callActivity && callActivity?.activity_id == activity_id) {
        return {
          status: 400,
          success: false,
          msg: "call activity already updated.",
          data: callActivity,
        };
      }

      let [[call]] = await pool
        .promise()
        .execute(`select * from calls where _id = ?`, [callActivity?.call_id]);
      if (!call) {
        return {
          status: 400,
          success: false,
          msg: "call not found",
          data: call,
        };
      }

      let [[callActivityStatus]] = await pool
        .promise()
        .execute(`select * from call_activities where _id = ?`, [
          call.call_status_id,
        ]);

      let [[activityStatus]] = await pool
        .promise()
        .execute(`select * from master_statuses where _id = ?`, [activity_id]);

      const CallActDataId = uuidv4();
      const [data] = await pool
        .promise()
        .execute(
          "INSERT INTO call_activities (_id, activity_id, call_id, createdAt, deleted, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            CallActDataId,
            activity_id,
            callActivity?.call_id,
            new Date(),
            "false",
            callActivity.lead_id,
            1,
            new Date(),
          ]
        );

      const [callCommentData] = await pool
        .promise()
        .execute(
          "INSERT INTO call_activity_comment (_id, comment_by_id, comment, call_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
          [
            uuidv4(),
            String(req.user._id),
            comment && comment != ""
              ? comment
              : `${callActivityStatus.status_name} ${activityStatus.status_name}`,
            CallActDataId,
            new Date(),
            new Date(),
          ]
        );

      if (data) {
        let [updateStatus] = await pool
          .promise()
          .execute(`update calls set call_status_id = ? where _id = ?`, [
            activity_id,
            call._id,
          ]);

        const LeadActDataId = uuidv4();
        const [leadactivityData] = await pool
          .promise()
          .execute(
            "INSERT INTO lead_activities (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              LeadActDataId,
              activity_id,
              new Date(),
              "false",
              new Date(),
              callActivity.lead_id,
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
              String(req.user._id),
              comment && comment != ""
                ? comment
                : `${callActivityStatus.status_name} ${activityStatus.status_name}`,
              LeadActDataId,
              new Date(),
              new Date(),
            ]
          );
      }
      return {
        status: 201,
        success: true,
        msg: "Call Activity updated successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update call activity service.",
        data: error,
      };
    }
  }

  async addCommentCallActivityService(req) {
    try {
      const { call_activity_id, comment } = req.body;

      let callActivity;
      if (call_activity_id != "") {
        [[callActivity]] = await pool
          .promise()
          .execute(`SELECT * FROM call_activities where _id = ? `, [
            call_activity_id,
          ]);
        if (!callActivity) {
          return {
            status: 400,
            success: false,
            msg: "callActivity not found",
            data: callActivity,
          };
        }
      }
      const [[call]] = await pool
        .promise()
        .execute(`select * from calls where _id = ?`, [callActivity?.call_id]);
      if (!call) {
        return {
          status: 400,
          success: false,
          msg: "call not found.",
          data: call,
        };
      }

      const [data] = await pool
        .promise()
        .execute(
          "INSERT INTO call_activity_comment (_id, comment_by_id, comment, call_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
          [
            uuidv4(),
            String(req.user._id),
            comment ? comment : "",
            call_activity_id,
            new Date(),
            new Date(),
          ]
        );

      return {
        status: 201,
        success: true,
        msg: "Comment successfully on call activity.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update call activity service.",
        data: error,
      };
    }
  }
}
module.exports = new BdCallService();
