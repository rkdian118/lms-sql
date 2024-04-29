const express = require("express");
const env = require("dotenv");
env.config(".env");
const db = require("./config/db");
const moment = require("moment");
global.pool = db.connection();
const app = express();
const mongoose = require("mongoose");
const leadActivityModel = require("./model/BDModel/leadActivityModel");
const callActivityModel = require("./model/BDModel/callActivityModel");
const dateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

const convString = (data) => {
  return data ? String(data) : null;
};

const adminSync = async () => {
  const adminModel = require("./model/AdminModel/adminModel");
  let admin = await adminModel.find({}, { __v: 0 });
  for (const data of admin) {
    let {
      _id,
      emp_id,
      unique_id,
      name,
      username,
      email,
      designation,
      mobile,
      profile_pic,
      secret_key,
      status,
      deleted,
      createdAt,
      updatedAt,
      country_code,
      created_by,
    } = data;

    let columns =
      "_id, emp_id, unique_id, name, username, email, designation, mobile, profile_pic, secret_key, status, deleted, createdAt, updatedAt, country_code, created_by";
    const [adminData] = await pool
      .promise()
      .execute(
        `INSERT INTO admins (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          emp_id,
          unique_id,
          name,
          username,
          email,
          designation,
          mobile,
          profile_pic,
          secret_key,
          status,
          deleted,
          dateFormat(createdAt),
          dateFormat(updatedAt),
          country_code,
          convString(created_by),
        ]
      );
  }
};

const masterStatusModelSync = async () => {
  const masterStatusModel = require("./model/CommonModel/masterStatusModel");
  let dataArr = await masterStatusModel.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      admin_id,
      createdAt,
      status_code,
      status_color,
      status_name,
      status_type,
      updatedAt,
    } = data;

    let columns =
      "_id, admin_id, createdAt, status_code, status_color, status_name, status_type, updatedAt";

    console.log(
      _id,
      admin_id,
      createdAt,
      status_code,
      status_color,
      status_name,
      status_type,
      updatedAt
    );
    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO master_statuses (${columns}) VALUES (?, ?, ?, ?, ? ,?, ?, ?)`,
        [
          convString(_id),
          convString(admin_id),
          dateFormat(createdAt),
          status_code,
          status_color,
          status_name,
          status_type,
          dateFormat(updatedAt),
        ]
      );
    console.log(sqlInfo);
  }
};

const branchesSync = async () => {
  const branchModel = require("./model/AdminModel/branchModel");
  let branch = await branchModel.find({}, { __v: 0 });

  for (const data of branch) {
    let {
      _id,
      address,
      admin_id,
      branch_name,
      city,
      cluster_id,
      country,
      createdAt,
      deleted,
      pincode,
      state,
      status,
      updatedAt,
    } = data;

    let columns =
      "_id, address, admin_id, branch_name, city, cluster_id, country, createdAt, deleted, pincode, state, status, updatedAt";
    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO branches (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          address,
          convString(admin_id),
          branch_name,
          city,
          convString(cluster_id),
          country,
          dateFormat(createdAt),
          deleted,
          pincode,
          state,
          status,
          dateFormat(updatedAt),
        ]
      );
    // console.log(sqlInfo)
  }
};

const clusterModelSync = async () => {
  const clusterModel = require("./model/ClusterModel/clusterModel");
  let dataArr = await clusterModel.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      admin_id,
      branch_id,
      country_code,
      createdAt,
      deleted,
      designation,
      email,
      emp_id,
      mobile,
      name,
      profile_pic,
      secret_key,
      status,
      unique_id,
      updatedAt,
      username,
    } = data;

    let columns =
      "_id, admin_id, branch_id, country_code, createdAt, deleted, designation, email, emp_id, mobile, name, profile_pic, secret_key, status, unique_id, updatedAt, username";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO clusters (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?,?)`,
        [
          convString(_id),
          convString(admin_id),
          convString(branch_id),
          country_code,
          dateFormat(createdAt),
          deleted,
          designation,
          email,
          emp_id,
          mobile,
          name,
          profile_pic,
          secret_key,
          status,
          unique_id,
          dateFormat(updatedAt),
          username,
        ]
      );
    // console.log(sqlInfo)
  }
};

const clusterLeadModelSync = async () => {
  const clusterLeadModel = require("./model/ClusterLeadModel/clusterLeadModel");
  let dataArr = await clusterLeadModel.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      cluster_head_id,
      country_code,
      createdAt,
      deleted,
      designation,
      email,
      emp_id,
      mobile,
      name,
      profile_pic,
      secret_key,
      status,
      unique_id,
      updatedAt,
      username,
    } = data;

    let columns =
      "_id, cluster_head_id, country_code, createdAt, deleted, designation, email, emp_id, mobile, name, profile_pic, secret_key, status, unique_id, updatedAt, username";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO cluster_leads (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)`,
        [
          convString(_id),
          convString(cluster_head_id),
          country_code,
          dateFormat(createdAt),
          deleted,
          designation,
          email,
          emp_id,
          mobile,
          name,
          profile_pic,
          secret_key,
          status,
          unique_id,
          dateFormat(updatedAt),
          username,
        ]
      );
    // console.log(sqlInfo)
  }
};

const branchTargetModelSync = async () => {
  const branchTargetModel = require("./model/AdminModel/branchTargetModel");
  let dataArr = await branchTargetModel.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      admin_id,
      branch_id,
      cluster_head_id,
      completed_target,
      confirm_business,
      createdAt,
      deleted,
      month_start_date,
      prev_month_target,
      remaining_target,
      status,
      target_month,
      target_year,
      targets,
      total_target,
      updatedAt,
    } = data;

    let columns =
      "_id, admin_id, branch_id, cluster_head_id, completed_target, confirm_business, createdAt, deleted, month_start_date, prev_month_target, remaining_target, status, target_month, target_year, targets, total_target, updatedAt";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO branch_targets (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)`,
        [
          convString(_id),
          convString(admin_id),
          convString(branch_id),
          convString(cluster_head_id),
          completed_target,
          confirm_business,
          dateFormat(createdAt),
          deleted,
          month_start_date,
          prev_month_target,
          remaining_target,
          status,
          target_month,
          target_year,
          targets,
          total_target,
          dateFormat(updatedAt),
        ]
      );
    // console.log(sqlInfo)
  }
};

const bdModelSync = async () => {
  const bdModel = require("./model/BDModel/bdModel");
  let dataArr = await bdModel.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      cluster_head_id,
      cluster_lead_id,
      country_code,
      createdAt,
      deleted,
      designation,
      email,
      emp_id,
      mobile,
      name,
      profile_pic,
      secret_key,
      status,
      unique_id,
      updatedAt,
      username,
    } = data;

    let columns =
      "_id, cluster_head_id, cluster_lead_id, country_code, createdAt, deleted, designation, email, emp_id, mobile, name, profile_pic, secret_key, status, unique_id, updatedAt, username";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO businesses (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)`,
        [
          convString(_id),
          convString(cluster_head_id),
          convString(cluster_lead_id),
          country_code,
          dateFormat(createdAt),
          deleted,
          designation,
          email,
          emp_id,
          mobile,
          name,
          profile_pic,
          secret_key,
          status,
          unique_id,
          dateFormat(updatedAt),
          username,
        ]
      );
    // console.log(sqlInfo)
  }
};

const leadModelSync = async () => {
  const leadModel = require("./model/BDModel/leadModel");
  let dataArr = await leadModel.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      add_notes,
      address,
      assign_date,
      bd_id,
      bid_url,
      client_alternate_email,
      client_budget,
      client_country,
      client_email,
      client_linkedin,
      client_name,
      client_number,
      client_whatsapp_num,
      company_name,
      createdAt,
      deleted,
      follow_up,
      lead_req_type_id,
      lead_source_id,
      lead_status,
      lead_type_id,
      projection_status,
      proposal_amount,
      skype_id,
      status,
      transfer_lead,
      updatedAt,
      upwork_job_url,
      transfer_lead_date,
      transfer_lead_id,
    } = data;

    let columns =
      " _id, add_notes, address, assign_date, bd_id, bid_url, client_alternate_email, client_budget, client_country, client_email, client_linkedin, client_name, client_number, client_whatsapp_num, company_name, createdAt, deleted, follow_up, lead_req_type_id, lead_source_id, lead_status, lead_type_id, projection_status, proposal_amount, skype_id, status, transfer_lead, updatedAt, upwork_job_url, transfer_lead_date, transfer_lead_id";

    // console.log( _id, add_notes, address, assign_date, bd_id, bid_url, client_alternate_email, client_budget, client_country, client_email, client_linkedin, client_name, client_number, client_whatsapp_num, company_name, createdAt, deleted, follow_up, lead_req_type_id, lead_source_id, lead_status, lead_type_id, projection_status, proposal_amount, skype_id, status, transfer_lead, updatedAt, upwork_job_url, transfer_lead_date || null, transfer_lead_id || null)
    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO leads (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ? ,?, ?, ?)`,
        [
          convString(_id),
          add_notes,
          address,
          dateFormat(assign_date),
          convString(bd_id),
          bid_url,
          client_alternate_email,
          client_budget,
          client_country,
          client_email,
          client_linkedin,
          client_name,
          client_number,
          client_whatsapp_num,
          company_name,
          dateFormat(createdAt),
          deleted,
          follow_up,
          convString(lead_req_type_id),
          convString(lead_source_id),
          convString(lead_status),
          convString(lead_type_id),
          convString(projection_status),
          proposal_amount,
          skype_id,
          status,
          transfer_lead,
          dateFormat(updatedAt),
          upwork_job_url,
          dateFormat(transfer_lead_date) || null,
          convString(transfer_lead_id) || null,
        ]
      );
    // console.log(sqlInfo)
  }
};

const dsrModelSync = async () => {
  const dsrModel = require("./model/BDModel/dsrModel");
  let dataArr = await dsrModel.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      bd_id,
      calls_scheduled,
      cluster_head_id,
      cluster_lead_id,
      createdAt,
      estimation_submitted,
      feature_list_shared,
      follow_ups,
      lead_assigned,
      lead_negative_response,
      lead_positive_response,
      linkedin_messages,
      linkedin_response,
      meeting_done,
      meeting_scheduled,
      phone_call_done,
      proposal_amount,
      proposal_submitted,
      understamding_queries_submitted,
      understanding_queries_submitted,
      updatedAt,
      upwork_bids,
      upwork_positive_response,
      upwork_response,
    } = data;

    let columns =
      " _id, bd_id, calls_scheduled, cluster_head_id, cluster_lead_id, createdAt, estimation_submitted, feature_list_shared, follow_ups, lead_assigned, lead_negative_response, lead_positive_response, linkedin_messages, linkedin_response, meeting_done, meeting_scheduled, phone_call_done, proposal_amount, proposal_submitted, understamding_queries_submitted, understanding_queries_submitted, updatedAt, upwork_bids, upwork_positive_response, upwork_response ";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO bddsrs (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(bd_id),
          calls_scheduled || 0,
          convString(cluster_head_id),
          convString(cluster_lead_id),
          dateFormat(createdAt),
          estimation_submitted,
          feature_list_shared,
          follow_ups,
          lead_assigned,
          lead_negative_response,
          lead_positive_response,
          linkedin_messages,
          linkedin_response,
          meeting_done,
          meeting_scheduled,
          phone_call_done,
          proposal_amount,
          proposal_submitted,
          understamding_queries_submitted || 0,
          understanding_queries_submitted,
          dateFormat(updatedAt),
          upwork_bids,
          upwork_positive_response,
          upwork_response || 0,
        ]
      );

    // console.log(sqlInfo)
  }
};

const bdTargetModelSync = async () => {
  const model = require("./model/ManagerModel/bdTargetModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      admin_id,
      bd_id,
      branch_id,
      cluster_head_id,
      cluster_lead_id,
      completed_target,
      confirm_business,
      createdAt,
      deleted,
      month_start_date,
      prev_month_target,
      remaining_target,
      status,
      target_month,
      target_year,
      targets,
      total_target,
      updatedAt,
    } = data;

    let columns =
      " _id, admin_id, bd_id, branch_id, cluster_head_id, cluster_lead_id, completed_target, confirm_business, createdAt, deleted, month_start_date, prev_month_target, remaining_target, status, target_month, target_year, targets, total_target, updatedAt ";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO bd_targets (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(admin_id),
          convString(bd_id),
          convString(branch_id),
          convString(cluster_head_id),
          convString(cluster_lead_id),
          completed_target,
          confirm_business || 0,
          dateFormat(createdAt),
          deleted,
          dateFormat(month_start_date),
          prev_month_target,
          remaining_target,
          status,
          target_month,
          target_year,
          targets,
          total_target,
          dateFormat(updatedAt),
        ]
      );

    // console.log(sqlInfo)
  }
};

const callModelSync = async () => {
  const model = require("./model/BDModel/callModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      bd_id,
      call_mode_id,
      call_status_id,
      call_type_id,
      comment_remark,
      createdAt,
      deleted,
      lead_id,
      meeting_date_time,
      meeting_link,
      pe_name,
      recording_link,
      status,
      updatedAt,
    } = data;

    let columns =
      " _id, bd_id, call_mode_id, call_status_id, call_type_id, comment_remark, createdAt, deleted, lead_id, meeting_date_time, meeting_link, pe_name, recording_link, status, updatedAt ";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO calls (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(bd_id),
          convString(call_mode_id),
          convString(call_status_id),
          convString(call_type_id),
          comment_remark,
          dateFormat(createdAt),
          deleted,
          convString(lead_id),
          dateFormat(meeting_date_time),
          meeting_link,
          pe_name,
          recording_link,
          status,
          dateFormat(updatedAt),
        ]
      );

    // console.log(sqlInfo)
  }
};

const clusterLeadTargetModelSync = async () => {
  const model = require("./model/ManagerModel/clusterLeadTargetModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      admin_id,
      branch_id,
      cluster_head_id,
      cluster_lead_id,
      completed_target,
      confirm_business,
      createdAt,
      deleted,
      month_start_date,
      prev_month_target,
      remaining_target,
      status,
      target_month,
      target_year,
      targets,
      total_target,
      updatedAt,
    } = data;

    let columns =
      "_id, admin_id, branch_id, cluster_head_id, cluster_lead_id, completed_target, confirm_business, createdAt, deleted, month_start_date, prev_month_target, remaining_target, status, target_month, target_year, targets, total_target, updatedAt";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO cluster_lead_targets (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(admin_id),
          convString(branch_id),
          convString(cluster_head_id),
          convString(cluster_lead_id),
          completed_target,
          confirm_business || 0,
          dateFormat(createdAt),
          deleted,
          dateFormat(month_start_date),
          prev_month_target,
          remaining_target,
          status,
          target_month,
          target_year,
          targets,
          total_target,
          dateFormat(updatedAt),
        ]
      );

    // console.log(sqlInfo)
  }
};

const duplicateLeadModelSync = async () => {
  const model = require("./model/BDModel/duplicateLeadModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      add_notes,
      address,
      assign_date,
      bd_id,
      bid_url,
      client_budget,
      client_country,
      client_email,
      client_linkedin,
      client_name,
      client_number,
      client_whatsapp_num,
      company_name,
      createdAt,
      deleted,
      follow_up,
      lead_id,
      lead_req_type_id,
      lead_source_id,
      lead_status,
      lead_type_id,
      proposal_amount,
      skype_id,
      status,
      updatedAt,
      upwork_job_url,
      projection_status,
    } = data;

    let columns =
      "_id, add_notes, address, assign_date, bd_id, bid_url, client_budget, client_country, client_email, client_linkedin, client_name, client_number, client_whatsapp_num, company_name, createdAt, deleted, follow_up, lead_id, lead_req_type_id, lead_source_id, lead_status, lead_type_id, proposal_amount, skype_id, status, updatedAt, upwork_job_url, projection_status";

    console.log(
      _id,
      add_notes,
      address,
      assign_date,
      bd_id,
      bid_url,
      client_budget,
      client_country,
      client_email,
      client_linkedin,
      client_name,
      client_number,
      client_whatsapp_num,
      company_name,
      createdAt,
      deleted,
      follow_up,
      lead_id,
      lead_req_type_id,
      lead_source_id,
      lead_status,
      lead_type_id,
      proposal_amount,
      skype_id,
      status,
      updatedAt,
      upwork_job_url,
      projection_status
    );
    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO duplicate_leads (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          add_notes,
          address,
          dateFormat(assign_date),
          convString(bd_id),
          bid_url,
          client_budget,
          client_country,
          client_email,
          client_linkedin,
          client_name,
          client_number,
          client_whatsapp_num,
          company_name,
          dateFormat(createdAt),
          deleted,
          follow_up,
          convString(lead_id),
          convString(lead_req_type_id),
          convString(lead_source_id),
          convString(lead_status),
          convString(lead_type_id),
          proposal_amount,
          skype_id,
          status,
          dateFormat(updatedAt),
          upwork_job_url,
          projection_status || null,
        ]
      );

    // console.log(sqlInfo)
  }
};

const followupCallModelSync = async () => {
  const model = require("./model/BDModel/followupCallModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      bd_id,
      comment,
      createdAt,
      deleted,
      lead_id,
      response,
      status,
      updatedAt,
    } = data;

    let columns =
      "_id, bd_id, comment, createdAt, deleted, lead_id, response, status, updatedAt";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO followup_calls (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(bd_id),
          comment,
          dateFormat(createdAt),
          deleted,
          convString(lead_id),
          response,
          status,
          dateFormat(updatedAt),
        ]
      );

    // console.log(sqlInfo)
  }
};

const leadResponseModelSync = async () => {
  const model = require("./model/BDModel/leadResponseModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      bd_id,
      createdAt,
      deleted,
      lead_id,
      response,
      status,
      updatedAt,
    } = data;

    let columns =
      "_id, bd_id, createdAt, deleted, lead_id, response, status, updatedAt";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO lead_responses (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(bd_id),
          dateFormat(createdAt),
          deleted,
          convString(lead_id),
          response,
          status,
          dateFormat(updatedAt),
        ]
      );

    // console.log(sqlInfo)
  }
};

const loginsModelSync = async () => {
  const model = require("./model/loginsModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      createdAt,
      deleted,
      email,
      name,
      password,
      role_type,
      secret_key,
      status,
      unique_id,
      updatedAt,
      user_id,
      username,
    } = data;

    let columns =
      "_id, createdAt, deleted, email, name, password, role_type, secret_key, status, unique_id, updatedAt, user_id, username";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO logins (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          dateFormat(createdAt),
          deleted,
          email,
          name,
          password,
          role_type,
          secret_key,
          status,
          unique_id,
          dateFormat(updatedAt),
          user_id,
          username,
        ]
      );

    // console.log(sqlInfo)
  }
};

const transferLeadsModelSync = async () => {
  const model = require("./model/ClusterModel/transferLeadsModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      add_notes,
      address,
      assign_date,
      bd_id,
      bid_url,
      client_alternate_email,
      client_budget,
      client_country,
      client_email,
      client_linkedin,
      client_name,
      client_number,
      client_whatsapp_num,
      company_name,
      createdAt,
      deleted,
      follow_up,
      lead_req_type_id,
      lead_source_id,
      lead_status,
      lead_type_id,
      proposal_amount,
      skype_id,
      status,
      transfer_date,
      transfer_lead_id,
      transfer_to,
      updatedAt,
      upwork_job_url,
    } = data;

    let columns =
      "_id, add_notes, address, assign_date, bd_id, bid_url, client_alternate_email, client_budget, client_country, client_email, client_linkedin, client_name, client_number, client_whatsapp_num, company_name, createdAt, deleted, follow_up, lead_req_type_id, lead_source_id, lead_status, lead_type_id, proposal_amount, skype_id, status, transfer_date, transfer_lead_id, transfer_to, updatedAt, upwork_job_url";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO tranfered_leads (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          add_notes,
          address,
          dateFormat(assign_date),
          convString(bd_id),
          bid_url,
          client_alternate_email,
          client_budget,
          client_country,
          client_email,
          client_linkedin,
          client_name,
          client_number,
          client_whatsapp_num,
          company_name,
          dateFormat(createdAt),
          deleted,
          follow_up,
          convString(lead_req_type_id),
          convString(lead_source_id),
          convString(lead_status),
          convString(lead_type_id),
          proposal_amount,
          skype_id,
          status,
          dateFormat(transfer_date),
          convString(transfer_lead_id),
          convString(transfer_to),
          dateFormat(updatedAt),
          upwork_job_url,
        ]
      );

    // console.log(sqlInfo)
  }
};

const proposalModelSync = async () => {
  const model = require("./model/BDModel/proposalModel ");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      bd_id,
      createdAt,
      deleted,
      lead_id,
      man_hour,
      project_amount,
      project_name,
      proposal_submitted,
      status,
      timeline_days,
      updatedAt,
      upfront_amount,
      proposal,
    } = data;

    let columns =
      "_id, bd_id, createdAt, deleted, lead_id, man_hour, project_amount, project_name, proposal_submitted, status, timeline_days, updatedAt, upfront_amount";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO proposals (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(bd_id),
          dateFormat(createdAt),
          deleted,
          convString(lead_id),
          man_hour,
          project_amount,
          project_name,
          proposal_submitted,
          status,
          timeline_days,
          dateFormat(updatedAt),
          upfront_amount,
        ]
      );

    let proposal_id = convString(_id);
    let proposalArr = proposal;
    for (const key in proposalArr) {
      const proposalData = proposalArr[key];

      let {
        _id,
        proposal_type_id,
        other_doc,
        proposal,
        wbs,
        wireframe,
        comment_remark,
        createdAt,
        updatedAt,
      } = proposalData;

      let columns2 =
        "_id, proposal_type_id, other_doc, proposal, wbs, wireframe, comment_remark, proposal_id, createdAt, updatedAt";

      var sqlInfo1 = await pool
        .promise()
        .execute(
          `INSERT INTO proposal_data (${columns2}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            convString(_id),
            convString(proposal_type_id),
            JSON.stringify(other_doc),
            JSON.stringify(proposal),
            JSON.stringify(wbs),
            JSON.stringify(wireframe),
            comment_remark,
            proposal_id,
            dateFormat(createdAt),
            dateFormat(updatedAt),
          ]
        );
    }
  }
  console.log("Sync Done");
};

const leadActivityModelSync = async () => {
  const model = require("./model/BDModel/leadActivityModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      activity_id,
      createdAt,
      deleted,
      followup_date,
      lead_id,
      status,
      updatedAt,
      comment,
    } = data;

    let columns =
      "_id, activity_id, createdAt, deleted, followup_date, lead_id, status, updatedAt";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO lead_activities (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(activity_id),
          dateFormat(createdAt),
          deleted,
          dateFormat(followup_date),
          convString(lead_id),
          status,
          dateFormat(updatedAt),
        ]
      );

    let lead_activity_id = convString(_id);
    let commentArr = comment;
    for (const key in commentArr) {
      const commentData = commentArr[key];

      let { _id, comment_by_id, comment, createdAt, updatedAt } = commentData;

      let columns2 =
        "_id, comment_by_id, comment, lead_activity_id, createdAt, updatedAt";

      var sqlInfo1 = await pool
        .promise()
        .execute(
          `INSERT INTO lead_activity_comment (${columns2}) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            convString(_id),
            convString(comment_by_id),
            comment,
            lead_activity_id,
            dateFormat(createdAt),
            dateFormat(updatedAt),
          ]
        );
    }
  }
  console.log("leadActivityModelSync Sync Done");
};

const callActivityModelSync = async () => {
  const model = require("./model/BDModel/callActivityModel");
  let dataArr = await model.find({}, { __v: 0 });

  for (const data of dataArr) {
    let {
      _id,
      activity_id,
      call_id,
      createdAt,
      deleted,
      lead_id,
      status,
      updatedAt,
      comment,
    } = data;

    let columns =
      "_id, activity_id, call_id, createdAt, deleted, lead_id, status, updatedAt";

    var sqlInfo = await pool
      .promise()
      .execute(
        `INSERT INTO call_activities (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          convString(_id),
          convString(activity_id),
          convString(call_id),
          dateFormat(createdAt),
          deleted,
          convString(lead_id),
          status,
          dateFormat(updatedAt),
        ]
      );

    let call_activity_id = convString(_id);
    let commentArr = comment;
    for (const key in commentArr) {
      const commentData = commentArr[key];

      let { _id, comment_by_id, comment, createdAt, updatedAt } = commentData;

      let columns2 =
        "_id, comment_by_id, comment, call_activity_id, createdAt, updatedAt";

      var sqlInfo1 = await pool
        .promise()
        .execute(
          `INSERT INTO call_activity_comment (${columns2}) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            convString(_id),
            convString(comment_by_id),
            comment,
            call_activity_id,
            dateFormat(createdAt),
            dateFormat(updatedAt),
          ]
        );
    }
  }
  console.log("callActivityModelSync Sync Done");
};

const rfpModelSync = async () => {
    const model = require("./model/BDModel/rfpModel");
    let dataArr = await model.find({}, { __v: 0 });
  
    for (const data of dataArr) {
      let {_id, bd_id, createdAt, deleted, lead_id, lead_rfp_status, proposal_value, status, updatedAt, rfp} = data;
  
      let columns =
        "_id, bd_id, createdAt, deleted, lead_id, lead_rfp_status, proposal_value, status, updatedAt";
  
      console.log(convString(_id), convString(bd_id), dateFormat(createdAt), deleted, convString(lead_id), convString(lead_rfp_status), proposal_value, status,dateFormat(updatedAt))
      var sqlInfo = await pool
        .promise()
        .execute(
          `INSERT INTO rfps (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            convString(_id), convString(bd_id), dateFormat(createdAt), deleted, convString(lead_id), convString(lead_rfp_status), proposal_value, status,dateFormat(updatedAt)
          ]
        );
  
      let rfp_id = convString(_id);
      let rfpArr = rfp;
      for (const key in rfpArr) {
        const rfpData = rfpArr[key];
  
        let { _id, rfp_type, pe_name, pe_email, remarks, activity_id, minutes_of_meeting, attachments, createdAt, updatedAt } = rfpData;
  
        let columns2 =
          "_id, rfp_type, pe_name, pe_email, remarks, activity_id, minutes_of_meeting, attachments, rfp_id, createdAt, updatedAt";
        console.log(convString(_id), convString(rfp_type), pe_name, pe_email, remarks, convString(activity_id), minutes_of_meeting, JSON.stringify(attachments), rfp_id, dateFormat(createdAt), dateFormat(updatedAt))
        var sqlInfo1 = await pool
          .promise()
          .execute(
            `INSERT INTO rfp_data (${columns2}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [ convString(_id), convString(rfp_type), pe_name || null, pe_email || null, remarks || null, convString(activity_id), minutes_of_meeting, JSON.stringify(attachments), rfp_id, dateFormat(createdAt), dateFormat(updatedAt) ]
          ); 
      }
    }
    console.log("rfpModelSync Sync Done");
  };

  const rfpActivityModelSync = async () => {
    const model = require("./model/BDModel/rfpActivityModel");
    let dataArr = await model.find({}, { __v: 0 });
  
    for (const data of dataArr) {
      let {_id, activity_id, createdAt, deleted, lead_id, rfp_id, status, updatedAt, comment} = data;
  
      let columns =
        "_id, activity_id, createdAt, deleted, lead_id, rfp_id, status, updatedAt";
  
      var sqlInfo = await pool
        .promise()
        .execute(
          `INSERT INTO rfp_activities (${columns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            convString(_id),
            convString(activity_id),
            dateFormat(createdAt),
            deleted,
            convString(lead_id),
            convString(rfp_id),
            status,
            dateFormat(updatedAt),
          ]
        );
  
      let rfp_activity_id = convString(_id);
      let commentArr = comment;
      for (const key in commentArr) {
        const commentData = commentArr[key];
  
        let { _id, comment_by_id, comment, createdAt, updatedAt } = commentData;
   
        let columns2 =
          "_id, comment_by_id, comment, rfp_activity_id, createdAt, updatedAt";
  
        var sqlInfo1 = await pool
          .promise()
          .execute(
            `INSERT INTO rfp_activity_comment (${columns2}) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              convString(_id),
              convString(comment_by_id),
              comment,
              rfp_activity_id,
              dateFormat(createdAt),
              dateFormat(updatedAt),
            ]
          );
      }
    }
    console.log("rfpActivityModelSync Sync Done");
  };

(async () => {
  // admin import query
  // await adminSync(); // admins
  // await masterStatusModelSync(); // master_statuses
  // await branchesSync(); // branches
  // await clusterModelSync(); // clusters
  // await clusterLeadModelSync(); // cluster_leads
  // await branchTargetModelSync(); // branch_targets
  // await bdModelSync(); // businesses
  // await leadModelSync(); // leads
  // await dsrModelSync(); // bddsrs
  // await bdTargetModelSync(); // bd_targets
  // await callModelSync(); // calls
  // await clusterLeadTargetModelSync(); // cluster_lead_targets
  // await duplicateLeadModelSync(); // duplicate_leads
  // await followupCallModelSync(); // followup_calls
  // await leadResponseModelSync(); //
  // await loginsModelSync(); // logins
  // await transferLeadsModelSync(); // tranfered_leads

  // await proposalModelSync(); // proposals
  // await leadActivityModelSync(); // lead_activities && lead_activity_comment
  // await callActivityModelSync(); // call_activities && call_activity_comment
  // await rfpModelSync(); // rfps && rfp_data
  // await rfpActivityModelSync(); // rfp_activities && rfp_activity_comment

  //   let act = await leadActivityModel
  //     .aggregate([
  //       {
  //         $sort: { createdAt: 1 },
  //       },
  //     //   { $limit: 10 },
  //       {
  //         $lookup: {
  //           from: "leads",
  //           localField: "lead_id",
  //           foreignField: "_id",
  //           as: "leadData",
  //         },
  //       },
  //     //   { $unwind: "$leadData" },
  //     ]);

  //   for (let i = 0; i < act.length; i++) {
  //     const element = act[i];
  //     if (element.leadData.length === 0) {
  //       await leadActivityModel.findByIdAndDelete(element._id)
  //     }

  //   }
  //   console.log("done");

//   let act = await callActivityModel.aggregate([
//     {
//       $sort: { createdAt: 1 },
//     },
//     //   { $limit: 10 },
//     {
//       $lookup: {
//         from: "leads",
//         localField: "lead_id",
//         foreignField: "_id",
//         as: "leadData",
//       },
//     },
//     {
//       $lookup: {
//         from: "calls",
//         localField: "call_id",
//         foreignField: "_id",
//         as: "callData",
//       },
//     },
//     //   { $unwind: "$leadData" },
//   ]);
//   let delCount = 0;
//   let callCount = 0;
//   for (let i = 0; i < act.length; i++) {
//     const element = act[i];
//     if (element.leadData.length === 0) {
//       await callActivityModel.findByIdAndDelete(element._id);
//       console.log("yes");
//       delCount += 1;
//     }
//     if (element.callData.length === 0) {
//       await callActivityModel.findByIdAndDelete(element._id);
//       console.log("yes");
//       callCount += 1;
//     }
//   }
//   console.log("done", delCount, callCount);
})();

app.listen(1000, () => {
  console.log(`Server running on http://52.22.241.165`);
});
