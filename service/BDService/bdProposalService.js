const { v4: uuidv4 } = require("uuid");

class BdProposalService {
  // async getAllProposalCountsService(req) {
  //   const { page, limit, search, start_date, end_date } = req.query;
  //   var date = new Date();
  //   let startDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`);
  //   // let startDate = new Date(moment(new Date()).format('YYYY-MM'));
  //   let endDate = new Date();

  //   if (start_date && end_date) {
  //     startDate = new Date(start_date);
  //     endDate = new Date(end_date);
  //   }
  //   let addDateField = {
  //     $addFields: {
  //       createdAtNew: {
  //         $toDate: {
  //           $dateToString: {
  //             format: "%Y-%m-%d",
  //             date: "$createdAt",
  //           },
  //         },
  //       },
  //     },
  //   };
  //   let match = {
  //     createdAt: {
  //       $gte: startDate,
  //       $lte: endDate,
  //     },
  //   };

  //   let matchQuery = {};
  //   let userFilter = [];

  //   req?.user?._id ? userFilter.push({ bd_id: req.user._id }) : "";
  //   startDate && endDate ? userFilter.push(match) : "";
  //   let rfpStatus = await masterStatusModel.find({
  //     status_type: "proposal_status",
  //   });
  //   let leadRfp = rfpStatus.filter((element) => {
  //     if (element.status_name == "Request For Proposal") {
  //       return element._id;
  //     }
  //   })[0]._id;
  //   let rfpPending = rfpStatus.filter((element) => {
  //     if (element.status_name == "RFP Pending") {
  //       return element._id;
  //     }
  //   })[0]._id;
  //   let rfpReceived = rfpStatus.filter((element) => {
  //     if (element.status_name == "RFP Received") {
  //       return element._id;
  //     }
  //   })[0]._id;
  //   let revisedRfp = rfpStatus.filter((element) => {
  //     if (element.status_name == "Revised RFP") {
  //       return element._id;
  //     }
  //   })[0]._id;
  //   let approvedRfp = rfpStatus.filter((element) => {
  //     if (element.status_name == "RFP Approved") {
  //       return element._id;
  //     }
  //   })[0]._id;

  //   try {
  //     const res = await proposalModel.aggregate([
  //       // addDateField,
  //       {
  //         $match: { $and: userFilter },
  //       },
  //       {
  //         $facet: {
  //           totalRfps: [{ $match: {} }, { $count: "count" }],
  //           leadRfp: [
  //             { $match: { $and: [{ lead_rfp_status: leadRfp }] } },
  //             { $count: "count" },
  //           ],
  //           rfpPending: [
  //             { $match: { $and: [{ lead_rfp_status: rfpPending }] } },
  //             { $count: "count" },
  //           ],
  //           rfpReceived: [
  //             { $match: { $and: [{ lead_rfp_status: rfpReceived }] } },
  //             { $count: "count" },
  //           ],
  //           revisedRfp: [
  //             { $match: { $and: [{ lead_rfp_status: revisedRfp }] } },
  //             { $count: "count" },
  //           ],
  //           approvedRfp: [
  //             { $match: { $and: [{ lead_rfp_status: approvedRfp }] } },
  //             { $count: "count" },
  //           ],
  //         },
  //       },
  //     ]);
  //     if (!res) {
  //       return {
  //         status: 200,
  //         success: false,
  //         msg: "RFP counts not found.",
  //         data: res,
  //       };
  //     }
  //     return {
  //       status: 200,
  //       success: true,
  //       msg: "RFP counts get successfully.",
  //       data: res,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 400,
  //       success: false,
  //       msg: error, //"Somethin went wrong when get rfp count service.",
  //       data: error,
  //     };
  //   }
  // }

  async addProposalService(req) {
    try {
      const { body, files, user } = req;

      let proposal = [];
      let wbs = [];
      let wireframe = [];
      let other_doc = [];
      if (files) {
        if (files?.proposal) {
          files.proposal.forEach((file) => proposal.push(file.path));
        }
        if (files?.wbs) {
          files.wbs.forEach((file) => wbs.push(file.path));
        }
        if (files?.wireframe) {
          files.wireframe.forEach((file) => wireframe.push(file.path));
        }
        if (files?.other_doc) {
          files.other_doc.forEach((file) => other_doc.push(file.path));
        }
      }

      const [[checkProposal]] = await pool
        .promise()
        .execute(`select * from proposals where bd_id = ? AND lead_id = ?`, [
          String(user._id),
          body.lead_id,
        ]);

      if (checkProposal) {
        return {
          success: false,
          msg: "You have already created proposal.",
          status: 400,
          data: checkProposal,
        };
      }
      const proposalId = uuidv4();
      const [data] = await pool.promise().execute(
        `INSERT INTO proposals (
            _id, bd_id, lead_id, man_hour, project_amount, upfront_amount,
            project_name, proposal_submitted, status, timeline_days, deleted, createdAt, updatedAt) 
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          proposalId,
          String(user._id),
          String(body.lead_id),
          body.man_hour || 0,
          body.project_amount || 0,
          body.upfront_amount || 0,
          body.project_name,
          body.proposal_submitted,
          "1",
          body.timeline_days || 0,
          "false",
          new Date(),
          new Date(),
        ]
      );

      if (data) {
        const [proData] = await pool.promise().execute(
          `INSERT INTO proposal_data (
                _id, proposal_type_id, other_doc, proposal, wbs, wireframe, 
                comment_remark, proposal_id, createdAt, updatedAt) 
              VALUES (?,?,?,?,?,?,?,?,?,?)`,
          [
            uuidv4(),
            body.proposal_type_id,
            other_doc,
            proposal,
            wbs,
            wireframe,
            body.comment_remark,
            proposalId,
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
              body.proposal_type_id,
              new Date(),
              "false",
              new Date(),
              body.lead_id,
              1,
              new Date(),
            ]
          );

        const [commentData] = await pool.promise().execute(
          `INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?)`,
          [
            uuidv4(),
            String(user._id),
            body.comment_remark,
            LeadActDataId,
            new Date(),
            new Date(),
          ]
        );
      }
      return {
        status: 201,
        success: true,
        msg: "Proposal created successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something went wrong when add proposal",
        data: error,
      };
    }
  }

  async updateProposalService(req) {
    try {
      const { body, files, user } = req;

      let proposal = [];
      let wbs = [];
      let wireframe = [];
      let other_doc = [];
      if (files) {
        if (files?.proposal) {
          files.proposal.forEach((file) => proposal.push(file.path));
        }
        if (files?.wbs) {
          files.wbs.forEach((file) => wbs.push(file.path));
        }
        if (files?.wireframe) {
          files.wireframe.forEach((file) => wireframe.push(file.path));
        }
        if (files?.other_doc) {
          files.other_doc.forEach((file) => other_doc.push(file.path));
        }
      }

      const [[checkProposal]] = await pool
        .promise()
        .execute(`select * from proposals where bd_id = ? AND lead_id = ?`, [
          String(user._id),
          body.lead_id,
        ]);

      if (!checkProposal) {
        return {
          success: false,
          msg: "proposal not found.",
          status: 400,
          data: checkProposal,
        };
      }

      const [[checklead]] = await pool
        .promise()
        .execute(`select * from leads where _id = ? AND bd_id = ?`, [
          body.lead_id,
          String(user._id),
        ]);

      if (!checklead) {
        return {
          success: false,
          msg: "lead not found.",
          status: 400,
          data: checklead,
        };
      }

      const [proData] = await pool.promise().execute(
        `INSERT INTO proposal_data (
              _id, proposal_type_id, other_doc, proposal, wbs, wireframe, 
              comment_remark, proposal_id, createdAt, updatedAt) 
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
        [
          uuidv4(),
          body.proposal_type_id,
          other_doc,
          proposal,
          wbs,
          wireframe,
          body.comment_remark,
          checkProposal._id,
          new Date(),
          new Date(),
        ]
      );

      let updateData = [];
      let updateLeadData = [];
      if (body.project_name) {
        updateData.push(
          `project_name = IF(LENGTH('${body.project_name}') > 0, '${body.project_name}', project_name)`
        );
      }
      if (body.upfront_amount) {
        updateData.push(
          `upfront_amount = IF(LENGTH('${body.upfront_amount}') > 0, '${body.upfront_amount}', upfront_amount)`
        );
      }
      if (body.project_amount) {
        updateData.push(
          `project_amount = IF(LENGTH('${body.project_amount}') > 0, '${body.project_amount}', project_amount)`
        );
        updateLeadData.push(
          `project_amount = IF(LENGTH('${body.project_amount}') > 0, '${body.project_amount}', project_amount)`
        );
      }
      if (body.proposal_submitted) {
        updateData.push(
          `proposal_submitted = IF(LENGTH('${body.proposal_submitted}') > 0, '${body.proposal_submitted}', proposal_submitted)`
        );
      }
      if (body.timeline_days) {
        updateData.push(
          `timeline_days = IF(LENGTH('${body.timeline_days}') > 0, '${body.timeline_days}', timeline_days)`
        );
      }
      if (body.man_hour) {
        updateData.push(
          `man_hour = IF(LENGTH('${body.man_hour}') > 0, '${body.man_hour}', man_hour)`
        );
      }
      const queryUpdate = `UPDATE proposals
                                SET
                                ${
                                  updateData.length > 0
                                    ? ` ${updateData.join(", ")}`
                                    : `_id = ?`
                                }
                                WHERE _id = ?`;

      const [data] = await pool
        .promise()
        .execute(queryUpdate, [checkProposal._id, checkProposal._id]);

      if (data) {
        const leadQueryUpdate = `   UPDATE leads
                                SET
                                ${
                                  updateLeadData.length > 0
                                    ? ` ${updateLeadData.join(", ")}`
                                    : `_id = ?`
                                }
                                WHERE
                                    _id = ?`;

        const [dataLead] = await pool
          .promise()
          .execute(leadQueryUpdate, [checklead._id, checklead._id]);

        const LeadActDataId = uuidv4();
        const [leadactivityData] = await pool
          .promise()
          .execute(
            "INSERT INTO lead_activities (_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              LeadActDataId,
              body.proposal_type_id,
              new Date(),
              "false",
              new Date(),
              body.lead_id,
              1,
              new Date(),
            ]
          );

        const [commentData] = await pool.promise().execute(
          `INSERT INTO lead_activity_comment (_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt) 
            VALUES (?, ?, ?, ?, ?, ?)`,
          [
            uuidv4(),
            String(req.user._id),
            body.comment_remark,
            LeadActDataId,
            new Date(),
            new Date(),
          ]
        );
      }

      return {
        status: 201,
        success: true,
        msg: "Proposal update successfully.",
        data: data,
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        msg: "Something went wrong when add proposal",
        data: error,
      };
    }
  }

  async getProposalService(req) {
    try {
      const { page, limit, search, lead_id, proposal_type_id, start_date, end_date } = req.query;

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

      userFilter.push(`p.bd_id = "${req.user._id}"`);

      if (lead_id) {
        userFilter.push(`p.lead_id = '${lead_id}'`);
      }
      
      if (proposal_type_id) {
        userFilter.push(`p.proposal_type_id = '${proposal_type_id}'`);
      }

      if (search) {
        userFilter.push(`(l.client_name LIKE '%${search}%' OR
                            l.client_email LIKE '%${search}%' 
                            )`);
      }
      if (start_date && end_date) {
        userFilter.push(
          `p.createdAt BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`
        );
      }

      const countQuery = `
              SELECT COUNT(*) AS totalDocs 
              FROM proposals as p
              LEFT JOIN leads as l ON l._id = p.lead_id
              ${
                userFilter.length > 0 ? `WHERE ${userFilter.join(" AND ")}` : ""
              }
          `;

      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;

      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      const [resultAggregate] = await pool.promise().execute(`SELECT 
                                                            p.*,
                                                            JSON_OBJECT('_id',
                                                                    bd._id,
                                                                    'cluster_head_id',
                                                                    bd.cluster_head_id,
                                                                    'cluster_lead_id',
                                                                    bd.cluster_lead_id,
                                                                    'emp_id',
                                                                    bd.emp_id,
                                                                    'unique_id',
                                                                    bd.unique_id,
                                                                    'name',
                                                                    bd.name,
                                                                    'username',
                                                                    bd.username,
                                                                    'email',
                                                                    bd.email,
                                                                    'designation',
                                                                    bd.designation,
                                                                    'mobile',
                                                                    bd.mobile,
                                                                    'profile_pic',
                                                                    bd.profile_pic,
                                                                    'secret_key',
                                                                    bd.secret_key,
                                                                    'status',
                                                                    bd.status,
                                                                    'deleted',
                                                                    bd.deleted,
                                                                    'createdAt',
                                                                    bd.createdAt,
                                                                    'updatedAt',
                                                                    bd.updatedAt,
                                                                    'country_code',
                                                                    bd.country_code) AS bdData,
                                                            JSON_OBJECT('_id',
                                                                    l._id,
                                                                    'bd_id',
                                                                    l.bd_id,
                                                                    'lead_type_id',
                                                                    l.lead_type_id,
                                                                    'lead_source_id',
                                                                    l.lead_source_id,
                                                                    'client_name',
                                                                    l.client_name,
                                                                    'client_number',
                                                                    l.client_number,
                                                                    'client_whatsapp_num',
                                                                    l.client_whatsapp_num,
                                                                    'client_email',
                                                                    l.client_email,
                                                                    'client_country',
                                                                    l.client_country,
                                                                    'address',
                                                                    l.address,
                                                                    'client_linkedin',
                                                                    l.client_linkedin,
                                                                    'upwork_job_url',
                                                                    l.upwork_job_url,
                                                                    'bid_url',
                                                                    l.bid_url,
                                                                    'proposal_amount',
                                                                    l.proposal_amount,
                                                                    'client_budget',
                                                                    l.client_budget,
                                                                    'follow_up',
                                                                    l.follow_up,
                                                                    'lead_status',
                                                                    l.lead_status,
                                                                    'add_notes',
                                                                    l.add_notes,
                                                                    'status',
                                                                    l.status,
                                                                    'deleted',
                                                                    l.deleted,
                                                                    'createdAt',
                                                                    l.createdAt,
                                                                    'updatedAt',
                                                                    l.updatedAt,
                                                                    'company_name',
                                                                    l.company_name,
                                                                    'client_alternate_email',
                                                                    l.client_alternate_email,
                                                                    'skype_id',
                                                                    l.skype_id,
                                                                    'reqTypeData',
                                                                    JSON_OBJECT('_id',
                                                                            rtd._id,
                                                                            'status_name',
                                                                            rtd.status_name,
                                                                            'status_color',
                                                                            rtd.status_color)) AS leadData
                                                        FROM
                                                            proposals AS p
                                                                LEFT JOIN
                                                            proposal_data AS pd ON p._id = pd.proposal_id
                                                                LEFT JOIN
                                                            master_statuses AS ptd ON ptd._id = pd.proposal_type_id
                                                                LEFT JOIN
                                                            businesses AS bd ON bd._id = p.bd_id
                                                                LEFT JOIN
                                                            leads AS l ON l._id = p.lead_id
                                                                LEFT JOIN
                                                            master_statuses AS rtd ON rtd._id = l.lead_req_type_id
                                                            ${
                                                              userFilter.length >
                                                              0
                                                                ? `WHERE ${userFilter.join(
                                                                    " AND "
                                                                  )}`
                                                                : ""
                                                            }
                                                        GROUP BY p._id
                                                        ORDER BY p.createdAt DESC
                                                        LIMIT ${pageSize}
                                                        OFFSET ${skip}`);

      for (let i = 0; i < resultAggregate.length; i++) {
        const element = resultAggregate[i];
        const queryPro = `select * from proposal_data where proposal_id = ? order by createdAt desc`;
        const [proData] = await pool.promise().execute(queryPro, [element._id]);
        console.log(proData);
        if (proData.length) {
          element.proposal = await proData;
          for (let j = 0; j < element.proposal.length; j++) {
            const element1 = element.proposal[j];
            const queryStatus = `select* from master_statuses where _id = ?`;
            const [[dataStatus]] = await pool
              .promise()
              .execute(queryStatus, [element1.proposal_type_id]);
            element1.proposal_type_data = dataStatus;

            const wireframe = element1?.wireframe
              ? JSON.parse(element1?.wireframe)
              : [];
            const wbs = element1?.wbs ? JSON.parse(element1?.wbs) : [];
            const proposal = element1?.proposal
              ? JSON.parse(element1?.proposal)
              : [];
            const other_doc = element1?.other_doc
              ? JSON.parse(element1?.other_doc)
              : [];

            element1.wireframe = wireframe;
            element1.wbs = wbs;
            element1.proposal = proposal;
            element1.other_doc = other_doc;
          }
        }
      }

      return {
        status: 200,
        success: true,
        msg: "Proposals get successfully.",
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
        msg: error, //"Somethin went wrong when get proposal service.",
        data: error,
      };
    }
  }
}

module.exports = new BdProposalService();
