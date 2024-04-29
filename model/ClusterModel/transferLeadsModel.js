const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let leadSchema = mongoose.Schema(
  {
    bd_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
    },
    lead_req_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses", //'requirement_type',
    },
    lead_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses", //'lead_type',
    },
    lead_source_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses", //'lead_source',
    },
    pre_defined_note_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses", //'predefine_note',
    },
    client_name: {
      type: String,
      required: true,
      default: "",
    },
    assign_date: {
      type: Date,
    },
    client_number: {
      type: String,
      // required: true,
      default: "",
    },
    client_whatsapp_num: {
      type: String,
      default: "",
    },
    client_email: {
      type: String,
      default: "",
    },
    client_alternate_email: {
      type: String,
      default: "",
    },
    client_country: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    client_linkedin: {
      type: String,
      default: "",
    },
    upwork_job_url: {
      type: String,
      default: "",
    },
    bid_url: {
      type: String,
      default: "",
    },
    skype_id: {
      type: String,
      default: "",
    },
    company_name: {
      type: String,
      default: "",
    },
    proposal_amount: {
      type: Number,
      default: 0,
    },
    client_budget: {
      type: Number,
      default: 0,
    },
    follow_up: {
      type: String,
      default: "",
    },
    lead_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses",
    },
    add_notes: {
      type: String,
      default: "",
    },
    transfer_lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leads",
    },
    transfer_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
    },
    transfer_date: {
      type: Date,
    },
    status: {
      type: String,
      default: 1,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("tranfered_leads", leadSchema);