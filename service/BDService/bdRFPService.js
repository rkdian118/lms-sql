const { v4: uuidv4 } = require("uuid");
const moment = require("moment")

class BdRfpService {
  async getLeadRFPTypeService(req) {
    try {
      const [rfpType] = await pool
        .promise()
        .execute(
          `select _id, status_code, status_name from master_statuses where status_type = ?`,
          ["rfp_type"]
        );
      if (rfpType.length <= 0) {
        return {
          status: 400,
          success: false,
          msg: "RFP type not found.",
          data: rfpType,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "RFP type get successfully.",
        data: rfpType,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get rfp type service.",
        data: error,
      };
    }
  }

  async getLeadRFPStatusService(req) {
    try {
      const [rfpStatus] = await pool
        .promise()
        .execute(
          `select _id, status_code, status_name from master_statuses where status_type = ?`,
          ["rfp_status"]
        );
      if (rfpStatus.length <= 0) {
        return {
          status: 400,
          success: false,
          msg: "RFP status not found.",
          data: rfpStatus,
        };
      }
      return {
        status: 200,
        success: true,
        msg: "RFP status get successfully.",
        data: rfpStatus,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get rfp status service.",
        data: error,
      };
    }
  }

  async addRFPService(req) {
    try {
      const { body, files, user } = req;

      let attachment = [];
      if (files && files.attachment) {
        files.attachment.forEach((file) => attachment.push(file.path));
      }

      let [[rfpActivityData]] = await pool
        .promise()
        .execute(`select * from master_statuses where status_name = ? `, [
          "Request For Proposal",
        ]);

      const rfpQuery = `select r.*, 
                          json_object(
                          "_id", l._id,
                          "client_name", l.client_name,
                          "client_number", l.client_number,
                          "client_email", l.client_email
                          ) as lead_id,
                          json_object(
                          "_id", bd._id,
                          "emp_id", bd.emp_id,
                          "name", bd.name,
                          "email", bd.email
                          ) as bd_id 
                          from rfps as r
                          left join businesses as bd on r.bd_id = bd._id
                          left join leads as l on l._id = r.lead_id
                          where r.bd_id = ? AND r.lead_id = ?`;

      const [rfp] = await pool
        .promise()
        .execute(rfpQuery, [String(user._id), body.lead_id]);

      if (rfp.length) {
        return {
          success: false,
          msg: "You have already request for proposal.",
          status: 400,
          data: rfp,
        };
      }

      const rfpId = uuidv4();
      const [data] = await pool.promise().execute(
        `insert into rfps (_id, bd_id, lead_id, lead_rfp_status, 
            proposal_value, status, deleted, createdAt, updatedAt) values (?,?,?,?,?,?,?,?,?)`,
        [
          rfpId,
          String(user._id),
          body.lead_id,
          rfpActivityData._id,
          body.proposal_value,
          "1",
          "false",
          new Date(),
          new Date(),
        ]
      );

      if (data) {
        const rfpDataId = uuidv4();

        const [rfpData] = await pool.promise().execute(
          `insert into rfp_data (_id, rfp_type, pe_name, pe_email, remarks, activity_id, 
            minutes_of_meeting, attachments, rfp_id, createdAt, updatedAt) values (?,?,?,?,?,?,?,?,?,?,?)`,
          [
            rfpDataId,
            body.rfp_type,
            body.pe_name,
            body.pe_email,
            body.remarks,
            rfpActivityData._id,
            body.minutes_of_meeting,
            attachment,
            rfpId,
            new Date(),
            new Date(),
          ]
        );

        const LeadActDataId = uuidv4();
        const [leadactivityData] = await pool
          .promise()
          .execute(
            "INSERT INTO lead_activities (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              LeadActDataId,
              rfpActivityData._id,
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
              String(user._id),
              body?.remarks ? body.remarks : rfpActivityData.status_name,
              LeadActDataId,
              new Date(),
              new Date(),
            ]
          );

        const rfpActDataId = uuidv4();
        const [rfpActivitySaveData] = await pool
          .promise()
          .execute(
            "INSERT INTO rfp_activities (_id, activity_id, createdAt, deleted, lead_id, rfp_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              rfpActDataId,
              rfpActivityData._id,
              new Date(),
              "false",
              body.lead_id,
              rfpDataId,
              1,
              new Date(),
            ]
          );

        const [rfpCommentData] = await pool
          .promise()
          .execute(
            "INSERT INTO rfp_activity_comment (_id, comment_by_id, comment, rfp_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
            [
              uuidv4(),
              String(user._id),
              body.remarks ? body.remarks : rfpActivityData.status_name,
              rfpActDataId,
              new Date(),
              new Date(),
            ]
          );
      }
      return {
        status: 201,
        success: true,
        msg: "Proposal requested successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: error, //"Something went wrong",
        data: error,
      };
    }
  }

  async updateRFPService(req) {
    try {
      const { body, files, user } = req;

      const rfpQuery = `select r.*, 
        json_object(
        "_id", l._id,
        "client_name", l.client_name,
        "client_number", l.client_number,
        "client_email", l.client_email
        ) as lead_id,
        json_object(
        "_id", bd._id,
        "emp_id", bd.emp_id,
        "name", bd.name,
        "email", bd.email
        ) as bd_id 
        from rfps as r
        left join businesses as bd on r.bd_id = bd._id
        left join leads as l on l._id = r.lead_id
        where r._id = ?`;

      const [[checkRfp]] = await pool
        .promise()
        .execute(rfpQuery, [body.rfp_id]);

      if (!checkRfp) {
        return {
          success: false,
          msg: "RFP not found.",
          status: 400,
          data: checkRfp,
        };
      }

      let attachment = [];
      if (files && files.attachment) {
        files.attachment.forEach((file) => attachment.push(file.path));
      }
      let [[rfpActivityBody]] = await pool
        .promise()
        .execute(`select * from master_statuses where _id = ?`, [
          body.activity_id,
        ]);
      let [[rfpActivityData]] = await pool
        .promise()
        .execute(`select * from master_statuses where status_name = ? `, [
          "Revised RFP",
        ]);

      if (!rfpActivityData) {
        return {
          success: false,
          msg: "RFP activity not found.",
          status: 400,
          data: rfpActivityData,
        };
      }
      const rfpDataId = uuidv4();

      const [rfpData] = await pool.promise().execute(
        `insert into rfp_data (_id, rfp_type, pe_name, pe_email, remarks, activity_id, 
          minutes_of_meeting, attachments, rfp_id, createdAt, updatedAt) values (?,?,?,?,?,?,?,?,?,?,?)`,
        [
          rfpDataId,
          body.rfp_type,
          body.pe_name || null,
          body.pe_email || null,
          body.remarks || null,
          body.activity_id,
          body.minutes_of_meeting,
          attachment,
          body.rfp_id,
          new Date(),
          new Date(),
        ]
      );

      const query = `UPDATE rfps
        SET
            lead_rfp_status = IF(LENGTH(?) > 0, ?, lead_rfp_status),
            proposal_value = IF(LENGTH(?) > 0, ?, proposal_value)
        WHERE
            _id = ?`;

      const inputValues = [
        rfpActivityData._id,
        rfpActivityData._id,
        body.proposal_value || null,
        body.proposal_value || null,
        body.rfp_id,
      ];

      const [data] = await pool.promise().execute(query, inputValues);

      if (data) {
        const LeadActDataId = uuidv4();
        const [leadactivityData] = await pool
          .promise()
          .execute(
            "INSERT INTO lead_activities (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              LeadActDataId,
              body.activity_id,
              new Date(),
              "false",
              new Date(),
              checkRfp.lead_id?._id,
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
              String(user._id),
              checkRfp?.remarks
                ? checkRfp?.remarks
                : rfpActivityBody.status_name,
              LeadActDataId,
              new Date(),
              new Date(),
            ]
          );

        const rfpActDataId = uuidv4();
        const [rfpActivitySaveData] = await pool
          .promise()
          .execute(
            "INSERT INTO rfp_activities (_id, activity_id, createdAt, deleted, lead_id, rfp_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              rfpActDataId,
              body.activity_id,
              new Date(),
              "false",
              checkRfp.lead_id?._id,
              rfpDataId,
              1,
              new Date(),
            ]
          );

        const [rfpCommentData] = await pool
          .promise()
          .execute(
            "INSERT INTO rfp_activity_comment (_id, comment_by_id, comment, rfp_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
            [
              uuidv4(),
              String(user._id),
              body.comment && body.comment != ""
                ? data.comment
                : rfpActivityBody.status_name,
              rfpActDataId,
              new Date(),
              new Date(),
            ]
          );
      }
      return {
        status: 201,
        success: true,
        msg: "RFP Request updated successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update rfp service.",
        data: error,
      };
    }
  }

  async updateRFPProposalValueService(req) {
    try {
      const { body, files, user } = req;

      const rfpQuery = `select r.*, 
        json_object(
        "_id", l._id,
        "client_name", l.client_name,
        "client_number", l.client_number,
        "client_email", l.client_email
        ) as lead_id,
        json_object(
        "_id", bd._id,
        "emp_id", bd.emp_id,
        "name", bd.name,
        "email", bd.email
        ) as bd_id 
        from rfps as r
        left join businesses as bd on r.bd_id = bd._id
        left join leads as l on l._id = r.lead_id
        where r._id = ?`;

      const [[checkRfp]] = await pool
        .promise()
        .execute(rfpQuery, [body.rfp_id]);

      if (!checkRfp) {
        return {
          success: false,
          msg: "RFP not found.",
          status: 400,
          data: checkRfp,
        };
      }

      const query = `UPDATE rfps
        SET
            proposal_value = IF(LENGTH(?) > 0, ?, proposal_value)
        WHERE
            _id = ?`;

      const inputValues = [
        body.proposal_value,
        body.proposal_value,
        body.rfp_id,
      ];

      const [data] = await pool.promise().execute(query, inputValues);

      return {
        status: 201,
        success: true,
        msg: "RFP Proposal value updated successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update rfp service.",
        data: error,
      };
    }
  }

  async updateRfpStatusService(req) {
    try {
      const body = req.body;
      // const profilePic = req.file;
      const rfpQuery = `select *
                      from rfps
                      where _id = ?`;

      const [[rfp]] = await pool.promise().execute(rfpQuery, [body.rfp_id]);
      if (!rfp) {
        return {
          status: 400,
          success: false,
          msg: "rfp not found",
          data: rfp,
        };
      }
      const query = `UPDATE rfps
                    SET
                        lead_rfp_status = IF(LENGTH(?) > 0, ?, lead_rfp_status)
                    WHERE _id = ?`;

      const inputValues = [body.rfp_status, body.rfp_status, body.rfp_id];

      const [updaterfpStatus] = await pool
        .promise()
        .execute(query, inputValues);

      return {
        status: 201,
        success: true,
        msg: "RFP status updated successfully.",
        data: updaterfpStatus,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update rfp status service.",
        data: error,
      };
    }
  }

  async getRFPService(req) {
    try {
      const {
        page,
        limit,
        search,
        lead_rfp_status_id,
        lead_id,
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
      userFilter.push(`r.bd_id = "${req.user._id}"`);
      // }

      if (lead_rfp_status_id) {
        userFilter.push(`r.lead_rfp_status = '${lead_rfp_status_id}'`);
      }

      if (lead_id) {
        userFilter.push(`r.lead_id = '${lead_id}'`);
      }

      if (start_date && end_date) {
        userFilter.push(
          `r.createdAt BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`
        );
      }

      if (search) {
        userFilter.push(`( l.client_name LIKE '%${search}%' OR
                            l.client_email LIKE '%${search}%' 
                            )`);
      }

      const countQuery = `
              SELECT COUNT(*) AS totalDocs 
              FROM rfps as r
              LEFT JOIN leads as l ON l._id = r.lead_id
             ${userFilter.length > 0 ? `WHERE ${userFilter.join(" AND ")}` : ""}
          `;

      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;

      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      const [rfp] = await pool.promise().execute(`
      SELECT 
    r._id, r.proposal_value, JSON_OBJECT('bd_id', bd._id,
        "emp_id", bd.emp_id,
        "name", bd.name,
        "email", bd.email,
        "designation", bd.designation) as bdData,
        JSON_OBJECT("lead_id", l._id,
        "client_name", l.client_name,
        "client_number", l.client_number,
        "client_email", l.client_email) as leadData,
        JSON_OBJECT("_id", lrs._id,
        "status_type", lrs.status_type,
        "status_name", lrs.status_name,
        "status_color", lrs.status_color) as leadRfpStatusData,
         r.status, r.deleted, r.createdAt, r.updatedAt
FROM
    rfps AS r
        LEFT JOIN
    businesses AS bd ON r.bd_id = bd._id
		LEFT JOIN
    leads AS l ON l._id = r.lead_id
		LEFT JOIN
    master_statuses AS lrs ON lrs._id = r.lead_rfp_status
    ${userFilter.length > 0 ? `WHERE ${userFilter.join(" AND ")}` : ""}
    ORDER BY createdAt DESC
    LIMIT ${pageSize}
    OFFSET ${skip};`);

      for (let i = 0; i < rfp.length; i++) {
        const element = rfp[i];
        const [rfpData] = await pool.promise().execute(
          `
        select rd._id as _id, rt.status_name as rfp_type_data, rt._id as rfp_type_data_id,
          ad.status_name as activity_data, ad.status_color, ad._id as activity_data_id,
          pe_name, pe_email, remarks, minutes_of_meeting, attachments,
          rd.createdAt, rd.updatedAt
         from rfp_data as rd
        left join master_statuses as rt on rt._id = rd.rfp_type
        left join master_statuses as ad on ad._id = rd.activity_id
        where rfp_id = ? order by createdAt desc
        `,
          [element._id]
        );

        element.rfps = rfpData;

        for (let j = 0; j < rfpData.length; j++) {
          const element1 = rfpData[j];
          let attach = JSON.parse(element1.attachments);
          element1.attachments = attach;
        }
      }
      return {
        status: 200,
        success: true,
        msg: "Proposals requests get successfully.",
        data: {
          docs: rfp,
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
        msg: error, //"Somethin went wrong when get proposal request service.",
        data: error,
      };
    }
  }

  // async getRfpMomService(req) {
  //   try {
  //     const { rfp_id } = req.query;

  //     const resultAggregate = await rfpModel.aggregate([
  //       {
  //         $match: { _id: new mongoose.Types.ObjectId(rfp_id) },
  //       },
  //       {
  //         $lookup: {
  //           from: "businesses",
  //           localField: "bd_id",
  //           foreignField: "_id",
  //           as: "bdData",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$bdData",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "leads",
  //           localField: "lead_id",
  //           foreignField: "_id",
  //           as: "leadData",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$leadData",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "master_statuses",
  //           localField: "lead_rfp_status",
  //           foreignField: "_id",
  //           as: "leadRfpStatusData",
  //         },
  //       },
  //       {
  //         $unwind: {
  //           path: "$leadRfpStatusData",
  //           preserveNullAndEmptyArrays: true,
  //         },
  //       },

  //       {
  //         $unwind: "$rfp",
  //       },
  //       {
  //         $lookup: {
  //           from: "rfp_activities",
  //           localField: "rfp._id",
  //           foreignField: "rfp_id",
  //           as: "rfpRfpActivities",
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
  //               $unwind: {
  //                 path: "$activityData",
  //                 preserveNullAndEmptyArrays: true,
  //               },
  //             },
  //             {
  //               $unwind: "$comment",
  //             },
  //             {
  //               $lookup: {
  //                 from: "logins",
  //                 localField: "comment.comment_by_id",
  //                 foreignField: "user_id",
  //                 as: "comment.comment_by_data",
  //               },
  //             },
  //             {
  //               $project: {
  //                 _id: 1,
  //                 rfp_id: 1,
  //                 lead_id: 1,
  //                 activityData: {
  //                   _id: "$activityData._id", //{ $arrayElemAt: ['$activityData.status_name', 0] }
  //                   status_name: "$activityData.status_name", //{ $arrayElemAt: ['$activityData.status_name', 0] }
  //                 },
  //                 comment_by_data: {
  //                   $arrayElemAt: ["$comment.comment_by_data", 0],
  //                 },
  //                 comment: "$comment.comment",
  //                 comment_id: "$comment._id",
  //                 createdAt: "$comment.createdAt",
  //                 updatedAt: "$comment.updatedAt",
  //                 createdAt: 1,
  //                 updatedAt: 1,
  //               },
  //             },
  //             {
  //               $group: {
  //                 _id: "$_id",
  //                 rfp_id: { $first: "$rfp_id" },
  //                 lead_id: { $first: "$lead_id" },
  //                 activityData: { $first: "$activityData" },
  //                 comments: {
  //                   $push: {
  //                     comment_by: "$comment_by_data.username",
  //                     comment_by_name: "$comment_by_data.name",
  //                     comment: "$comment",
  //                     _id: "$comment_id",
  //                     createdAt: "$createdAt",
  //                     updatedAt: "$updatedAt",
  //                   },
  //                 },
  //                 createdAt: { $first: "$createdAt" },
  //                 updatedAt: { $first: "$updatedAt" },
  //               },
  //             },
  //             {
  //               $unwind: "$comments",
  //             },
  //             {
  //               $group: {
  //                 _id: "$_id",
  //                 rfp_id: { $first: "$rfp_id" },
  //                 lead_id: { $first: "$lead_id" },
  //                 activityData: { $first: "$activityData" },
  //                 comments: { $push: "$comments" },
  //                 createdAt: { $first: "$createdAt" },
  //                 updatedAt: { $first: "$updatedAt" },
  //               },
  //             },
  //             {
  //               $sort: { createdAt: -1 },
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         $unwind: "$rfpRfpActivities",
  //       },
  //       {
  //         $lookup: {
  //           from: "master_statuses",
  //           localField: "rfp.rfp_type",
  //           foreignField: "_id",
  //           as: "rfp.rfp_type_data",
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: "master_statuses",
  //           localField: "rfp.activity_id",
  //           foreignField: "_id",
  //           as: "rfp.activity_data",
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 1,
  //           bdData: {
  //             bd_id: "$bdData._id",
  //             emp_id: "$bdData.emp_id",
  //             name: "$bdData.name",
  //             email: "$bdData.email",
  //             designation: "$bdData.designation",
  //           },
  //           leadData: {
  //             lead_id: "$leadData._id",
  //             client_name: "$leadData.client_name",
  //             client_number: "$leadData.client_number",
  //             client_email: "$leadData.client_email",
  //           },
  //           leadRfpStatusData: {
  //             status_name: "$leadRfpStatusData.status_name",
  //           },
  //           rfp_type_data: { $arrayElemAt: ["$rfp.rfp_type_data", 0] },
  //           activity_data: { $arrayElemAt: ["$rfp.activity_data", 0] },
  //           rfpRfpActivities: 1,
  //           minutes_of_meeting: "$rfp.minutes_of_meeting",
  //           rfp_id: "$rfp._id",
  //           attachments: "$rfp.attachments",
  //           createdAt: "$rfp.createdAt",
  //           updatedAt: "$rfp.updatedAt",
  //           status: 1,
  //           deleted: 1,
  //           createdAt: 1,
  //           updatedAt: 1,
  //         },
  //       },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           bdData: { $first: "$bdData" },
  //           leadData: { $first: "$leadData" },
  //           leadRfpStatusData: { $first: "$leadRfpStatusData" },
  //           rfp: {
  //             $push: {
  //               rfp_type_data: "$rfp_type_data.status_name",
  //               activity_data: "$activity_data.status_name",
  //               rfpRfpActivities: "$rfpRfpActivities",
  //               minutes_of_meeting: "$minutes_of_meeting",
  //               attachments: "$attachments",
  //               _id: "$rfp_id",
  //               createdAt: "$createdAt",
  //               updatedAt: "$updatedAt",
  //             },
  //           },
  //           status: { $first: "$status" },
  //           deleted: { $first: "$deleted" },
  //           createdAt: { $first: "$createdAt" },
  //           updatedAt: { $first: "$updatedAt" },
  //         },
  //       },
  //       {
  //         $unwind: "$rfp",
  //       },
  //       {
  //         $group: {
  //           _id: "$_id",
  //           bdData: { $first: "$bdData" },
  //           leadData: { $first: "$leadData" },
  //           leadRfpStatusData: { $first: "$leadRfpStatusData" },
  //           rfps: { $push: "$rfp" },
  //           status: { $first: "$status" },
  //           deleted: { $first: "$deleted" },
  //           createdAt: { $first: "$createdAt" },
  //           updatedAt: { $first: "$updatedAt" },
  //         },
  //       },
  //       {
  //         $sort: { "rfps.createdAt": -1 },
  //       },
  //     ]);

  //     return {
  //       status: 200,
  //       success: true,
  //       msg: "Proposals requests get successfully.",
  //       data: resultAggregate,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 400,
  //       success: false,
  //       msg: error, //"Somethin went wrong when get proposal request service.",
  //       data: error,
  //     };
  //   }
  // }

  async getRFPActivitiesService(req) {
    try {
      const { rfp_id } = req.query;

      const [activities] = await pool.promise().execute(
        `select ra._id,
                                                            json_object("_id", a._id, "status_name", a.status_name) as activityData,
                                                            ra.createdAt,
                                                            ra.updatedAt
                                                      from rfp_activities ra
                                                        left join master_statuses as a
                                                            on a._id = ra.activity_id 
                                                      WHERE rfp_id = ? order by ra.createdAt desc`,
        [rfp_id]
      );

      for (let i = 0; i < activities.length; i++) {
        const element = activities[i];
        const [comments] = await pool.promise().execute(
          `select 
          l.username as comment_by, l.name as comment_by_name, rac.comment, rac._id, rac.createdAt, rac.updatedAt
           from rfp_activity_comment rac
          left join logins as l on l.user_id = rac.comment_by_id 
           WHERE rac.rfp_activity_id = ? 
           order by rac.createdAt DESC`,
          [element._id]
        );
        element.comments = comments;
      }

      // console.log(activities[0]);

      // const rfpActivity = await rfpActivityModel.aggregate([
      //   {
      //     $match: {
      //       rfp_id: new mongoose.Types.ObjectId(rfp_id),
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "master_statuses",
      //       localField: "activity_id",
      //       foreignField: "_id",
      //       as: "activityData",
      //     },
      //   },
      //   {
      //     $unwind: {
      //       path: "$activityData",
      //       preserveNullAndEmptyArrays: true,
      //     },
      //   },
      //   {
      //     $unwind: "$comment",
      //   },
      //   {
      //     $lookup: {
      //       from: "logins",
      //       localField: "comment.comment_by_id",
      //       foreignField: "user_id",
      //       as: "comment.comment_by_data",
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 1,
      //       activityData: {
      //         _id: "$activityData._id", //{ $arrayElemAt: ['$activityData.status_name', 0] }
      //         status_name: "$activityData.status_name", //{ $arrayElemAt: ['$activityData.status_name', 0] }
      //       },
      //       comment_by_data: { $arrayElemAt: ["$comment.comment_by_data", 0] },
      //       comment: "$comment.comment",
      //       comment_id: "$comment._id",
      //       createdAt: "$comment.createdAt",
      //       updatedAt: "$comment.updatedAt",
      //       createdAt: 1,
      //       updatedAt: 1,
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$_id",
      //       activityData: { $first: "$activityData" },
      //       comments: {
      //         $push: {
      //           comment_by: "$comment_by_data.username",
      //           comment_by_name: "$comment_by_data.name",
      //           comment: "$comment",
      //           _id: "$comment_id",
      //           createdAt: "$createdAt",
      //           updatedAt: "$updatedAt",
      //         },
      //       },
      //       createdAt: { $first: "$createdAt" },
      //       updatedAt: { $first: "$updatedAt" },
      //     },
      //   },
      //   {
      //     $unwind: "$comments",
      //   },
      //   {
      //     $group: {
      //       _id: "$_id",
      //       activityData: { $first: "$activityData" },
      //       comments: { $push: "$comments" },
      //       createdAt: { $first: "$createdAt" },
      //       updatedAt: { $first: "$updatedAt" },
      //     },
      //   },
      //   {
      //     $sort: { createdAt: -1 },
      //   },
      // ]);

      if (!activities || activities == "") {
        return {
          status: 201,
          success: true,
          msg: "rfpActivity not found.",
          data: [],
        };
      }
      return {
        status: 200,
        success: true,
        msg: "rfpActivity get successfully.",
        data: activities,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when get lead rfp activities service.",
        data: error,
      };
    }
  }

  async updateRFPActivityService(req) {
    try {
      const { rfp_activity_id, activity_id, comment } = req.body;

      let rfpActivity;
      if (rfp_activity_id != "") {
        [[rfpActivity]] = await pool
          .promise()
          .execute(
            `select * from rfp_activities where _id = ? order by createdAt desc limit 1`,
            [rfp_activity_id]
          );

        if (!rfpActivity) {
          return {
            status: 400,
            success: false,
            msg: "rfpActivity not found",
            data: rfpActivity,
          };
        }
      }
      if (rfpActivity && rfpActivity.activity_id == activity_id) {
        return {
          status: 400,
          success: false,
          msg: "rfp activity already updated.",
          data: rfpActivity,
        };
      }

      let [[rfp]] = await pool
        .promise()
        .execute(
          `select * from rfp_data as rd left join rfps as r on r._id = rd.rfp_id where rd._id = ?`,
          [rfpActivity.rfp_id]
        );

      if (!rfp._id) {
        return {
          status: 400,
          success: false,
          msg: "rfp not found",
          data: rfp,
        };
      }

      let [[rfpActivityStatus]] = await pool
        .promise()
        .execute(`select * from master_statuses where _id = ?`, [
          rfp.lead_rfp_status,
        ]);

      let [[activityStatus]] = await pool
        .promise()
        .execute(`select * from master_statuses where _id = ?`, [activity_id]);

      const rfpActDataId = uuidv4();
      const [data] = await pool
        .promise()
        .execute(
          "INSERT INTO rfp_activities (_id, activity_id, createdAt, deleted, lead_id, rfp_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            rfpActDataId,
            activity_id,
            new Date(),
            "false",
            rfp.lead_id,
            rfpActivity.rfp_id,
            1,
            new Date(),
          ]
        );

      const [rfpCommentData] = await pool
        .promise()
        .execute(
          "INSERT INTO rfp_activity_comment (_id, comment_by_id, comment, rfp_activity_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
          [
            uuidv4(),
            String(req.user._id),
            comment && comment != ""
              ? comment
              : `${rfpActivityStatus.status_name} ${activityStatus.status_name}`,
            rfpActDataId,
            new Date(),
            new Date(),
          ]
        );

      if (data) {
        let [rfpUpdate] = await pool
          .promise()
          .execute(`update rfp_data set activity_id = ? where _id = ?`, [
            activity_id,
            rfpActivity.rfp_id,
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
              rfp.lead_id,
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
              comment && comment != "" ? comment : activityStatus.status_name,
              LeadActDataId,
              new Date(),
              new Date(),
            ]
          );
      }
      return {
        status: 201,
        success: true,
        msg: "rfp Activity updated successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update rfp activity service.",
        data: error,
      };
    }
  }

  async addCommentRFPActivityService(req) {
    try {
      const { rfp_activity_id, comment } = req.body;

      let rfpActivity;
      if (rfp_activity_id != "") {
        [[rfpActivity]] = await pool
          .promise()
          .execute(
            `select * from rfp_activities where _id = ? order by createdAt desc limit 1`,
            [rfp_activity_id]
          );

        if (!rfpActivity) {
          return {
            status: 400,
            success: false,
            msg: "rfpActivity not found",
            data: rfpActivity,
          };
        }
      }
      let [[rfp]] = await pool
        .promise()
        .execute(`select * from rfps where _id = ?`, [rfpActivity.rfp_id]);

      if (!rfp) {
        return {
          status: 400,
          success: false,
          msg: "rfp not found.",
          data: rfp,
        };
      }

      const [data] = await pool.promise().execute(
        `INSERT INTO rfp_activity_comment 
          (_id, comment_by_id, comment, rfp_activity_id, createdAt, updatedAt) 
          VALUES (?,?,?,?,?,?)`,
        [
          uuidv4(),
          String(req.user._id),
          comment ? comment : "",
          rfp_activity_id,
          new Date(),
          new Date(),
        ]
      );
      return {
        status: 201,
        success: true,
        msg: "Comment successfully on rfp activity.",
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        success: false,
        msg: error, //"Somethin went wrong when update rfp activity service.",
        data: error,
      };
    }
  }
}

module.exports = new BdRfpService();
