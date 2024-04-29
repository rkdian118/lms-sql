const moment = require("moment");
const nodemailer = require("nodemailer");
require("dotenv").config();
// async function SendMail() {
exports.SendMail = async (to, subject, date, dsrData, type) => {
  try {
    let messageBody = await sendBDDSRDailyEmail(date, dsrData);
    if (type == 2) {
      messageBody = await sendCLDSRDailyEmail(date, dsrData);
    }
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER_EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: process.env.FROM, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      html: messageBody, // html body
    });
    console.log(info);
    return info;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendBDDSRDailyEmail = async (date, dsrData) => {
  try {
    // Replace placeholders with dynamic data
    const emailBody = ` <body style="width: 100%; padding: 0; margin: 0">
    <div
      style="width: 100%; padding: 0 15px; margin: 0 auto; text-align: center"
    >
      <h2>Daily Status Report</h2>
      <h4>${moment(date).format("DD MMM YYYY")}</h4>
    </div>

    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0;
      "
    >
      
      <div
        style="
          flex: 0 0 auto;
          width: 33.33333333%;
          margin-top: 3rem;
          margin-left: 1px;
        "
      >
        <table
          style="
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          "
        >
          <tr>
            <th
              style="
                border: 1px solid #000;
                text-align: center;
                padding: 8px;
                width: 80px;
                font-size: 18px;
              "
              colspan="2"
            >
              ${dsrData?.bd_id?.name} (${dsrData?.bd_id?.emp_id})
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Leads Assigned
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.lead_assigned}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Positive Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.lead_positive_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Negative Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.lead_negative_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Follow-Ups
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.follow_ups}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Bids (Upwork)
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.upwork_bids}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Upwork Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.upwork_positive_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of LinkedIn Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.linkedin_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of LinkedIn Messages
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.linkedin_messages}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Meeting Scheduled
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.meeting_scheduled}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Meeting Done
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.meeting_done}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Follow-Ups Calls Done
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.phone_call_done}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Propsal Submitted
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.proposal_submitted}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Proposal Submitted Amount
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.proposal_amount}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Estimation Submitted
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.estimation_submitted}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Understand and Queries Submitted
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.understanding_queries_submitted}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Features List Shared
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.feature_list_shared}
            </th>
          </tr>
        </table>
      </div>
    </div>
  </body>`;

    return emailBody;
  } catch (error) {
    throw error;
  }
};

const sendCLDSRDailyEmail = async (date, allDsrData) => {
  try {
    // Replace placeholders with dynamic data
    const emailBody = ` <body style="width: 100%; padding: 0; margin: 0">
    <div
      style="width: 100%; padding: 0 15px; margin: 0 auto; text-align: center"
    >
      <h2>Daily Status Report</h2>
      <h4>${moment(date).format("DD MMM YYYY")}</h4>
    </div>

    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0;
      "
    >
      ${allDsrData?.map(
        (dsrData) => `
      <div
        style="
        flex: 0 0 100%; max-width: calc(33.33333333% - 2px); margin-top: 3rem; margin-left: 1px;
        "
      >
        <table
          style="
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          "
        >
          <tr>
            <th
              style="
                border: 1px solid #000;
                text-align: center;
                padding: 8px;
                width: 80px;
                font-size: 18px;
              "
              colspan="2"
            >
              ${dsrData?.bd_id?.name} (${dsrData?.bd_id?.emp_id})
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Leads Assigned
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.lead_assigned}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Positive Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.lead_positive_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Negative Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.lead_negative_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Follow-Ups
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.follow_ups}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Bids (Upwork)
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.upwork_bids}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Upwork Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.upwork_positive_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of LinkedIn Response
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.linkedin_response}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of LinkedIn Messages
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.linkedin_messages}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Meeting Scheduled
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.meeting_scheduled}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Meeting Done
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.meeting_done}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Follow-Ups Calls Done
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.phone_call_done}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Propsal Submitted
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.proposal_submitted}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Proposal Submitted Amount
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.proposal_amount}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Estimation Submitted
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.estimation_submitted}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Understand and Queries Submitted
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.understanding_queries_submitted}
            </th>
          </tr>
          <tr>
            <td
              style="
                border: 1px solid #000;
                text-align: left;
                padding: 8px;
                width: 300px;
              "
            >
              Number Of Features List Shared
            </td>
            <th
              style="
                border: 1px solid #000;
                text-align: right;
                padding: 8px;
                width: 80px;
              "
            >
              ${dsrData?.feature_list_shared}
            </th>
          </tr>
        </table>
      </div>
      <br />
      `
      )}
    </div>
  </body>
  `;

    return emailBody;
  } catch (error) {
    throw error;
  }
};
