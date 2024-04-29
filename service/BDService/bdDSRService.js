const moment = require("moment");
const _ = require("lodash");
class BdDSRService {
  async getDSRReportService(req) {
    try {
      const { page, limit, search, start_date, end_date } = req.query;

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

      userFilter.push(`bd_id = "${req.user._id}"`);

      if (start_date && end_date) {
        userFilter.push(
          `createdAt BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`
        );
      }

      const countQuery = `
                        SELECT COUNT(*) AS totalDocs 
                        FROM bddsrs 
                        ${
                          userFilter.length > 0
                            ? `WHERE ${userFilter.join(" AND ")}`
                            : ""
                        }
                      `;

      const [totalDocsResult] = await pool.promise().execute(countQuery);
      const totalDocs = totalDocsResult[0].totalDocs;

      const totalPages = Math.ceil(totalDocs / pageSize);
      const skip = (pageNumber - 1) * pageSize;

      const dsrQuery = `SELECT
                        dsr._id,
                        dsr.bd_id,
                        dsr.cluster_head_id,
                        dsr.cluster_lead_id,
                        dsr.lead_assigned,
                        dsr.lead_positive_response,
                        dsr.lead_negative_response,
                        dsr.follow_ups,
                        dsr.linkedin_messages,
                        dsr.linkedin_response,
                        dsr.upwork_bids,
                        dsr.proposal_submitted,
                        dsr.estimation_submitted,
                        dsr.understanding_queries_submitted,
                        dsr.feature_list_shared,
                        dsr.meeting_scheduled,
                        dsr.meeting_done,
                        dsr.upwork_positive_response,
                        dsr.phone_call_done,
                        dsr.createdAt
                      FROM
                        bddsrs AS dsr
                        ${
                          userFilter.length > 0
                            ? `WHERE ${userFilter.join(" AND ")}`
                            : ""
                        }
                        ORDER BY createdAt DESC
                        LIMIT ${pageSize}
                        OFFSET ${skip};`;

      const [resultAggregate] = await pool.promise().execute(dsrQuery);

      for (let i = 0; i < resultAggregate.length; i++) {
        const element = resultAggregate[i];
        const bdTargetQuery = `
            SELECT
              completed_target
            FROM
              bd_targets
            WHERE
              bd_id = ? AND
              target_month = ? AND
              target_year = ?
          `;
        const [[bdTarget]] = await pool
          .promise()
          .execute(bdTargetQuery, [
            element.bd_id,
            moment(element.createdAt).format("MMMM"),
            moment(element.createdAt).format("YYYY"),
          ]);
        element.bd_target = bdTarget ? bdTarget.completed_target : 0;
      }

      return {
        status: 200,
        success: true,
        msg: "Dashboard data get successfully.",
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
        msg: error, //"Somethin went wrong when get DSR service.",
        data: error,
      };
    }
  }

  async getDSRReportDetailsService(req) {
    try {
      const { body } = req;
      const [[dsrCheck]] = await pool
        .promise()
        .execute(`select * from bddsrs where _id = ?`, [body.dsr_id]);

      const startDate = moment(dsrCheck.createdAt)
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      const endDate = moment(dsrCheck.createdAt)
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss");

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
                              l.bd_id = '${String(req.user._id)}' AND
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
          String(req.user._id),
          startDate,
          endDate,
        ]);

      const [followups] = await pool.promise().execute(
        `select * from lead_activities as la 
      left join master_statuses as ad on la.activity_id = ad._id
      left join leads as l on la.lead_id = l._id
      where l.bd_id = ? and ad.status_type = "lead_follow_ups" and la.createdAt BETWEEN (?) AND (?)`,
        [String(req.user._id), startDate, endDate]
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
          String(req.user._id),
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
        .execute(proposalDataQuery, [String(req.user._id), startDate, endDate]);

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
        .execute(callsDataQuery, [String(req.user._id), startDate, endDate]);

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
          body.dsr_id,
        ]
      );

      const [[result]] = await pool
        .promise()
        .execute(`select * from bddsrs where _id = ?`, [body.dsr_id]);
      return {
        status: 200,
        success: true,
        msg: "DSR Detail get successfully.",
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

  async updateDSRReportService(req) {
    try {
      const { body } = req;

      const updateDSRQuery = `
                            UPDATE
                              bddsrs
                            SET
                              linkedin_messages = ?
                            WHERE
                              _id = ?
                          `;

      await pool.execute(updateDSRQuery, [body.linkedin_messages, body.dsr_id]);

      return {
        status: 200,
        success: true,
        msg: "DSR Update successfully.",
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
}

module.exports = new BdDSRService();


