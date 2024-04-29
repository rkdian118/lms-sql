const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const transfer_data = mongoose.Schema({
  old_bd_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "businesses",
  },
  transfer_date: {
    type: Date,
  },
});
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
    projection_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses", //'predefine_note',
      required: false,
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
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses",
      // default: ""
    },
    add_notes: {
      type: String,
      default: "",
    },
    transfer_lead: {
      //When we added duplecate lead the original lead is dead in this condition transfer lead is true.
      type: Boolean,
      default: false,
    },
    transfer_lead_id: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "lead",
      // default: ""
    },
    transfer_lead_date: {
      //Connected to transfer lead transfer_lead
      type: Date,
      required: false,
    },
    bde_transfer_section: [transfer_data],
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

module.exports = mongoose.model("lead", leadSchema);
