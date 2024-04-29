const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let BdDsrSchema = mongoose.Schema(
  {
    bd_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
    },
    cluster_head_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cluster",
    },
    cluster_lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cluster_leads",
    },
    lead_assigned: {
      type: Number,
      default: 0,
    },
    proposal_amount: {
      type: Number,
      default: 0,
    },
    lead_positive_response: {
      type: Number,
      default: 0,
    },
    lead_negative_response: {
      type: Number,
      default: 0,
    },
    follow_ups: {
      type: Number,
      default: 0,
    },
    linkedin_messages: {
      type: Number,
      default: 0,
    },
    linkedin_response: {
      type: Number,
      default: 0,
    },
    upwork_bids: {
      type: Number,
      default: 0,
    },
    proposal_submitted: {
      type: Number,
      default: 0,
    },
    estimation_submitted: {
      type: Number,
      default: 0,
    },
    understanding_queries_submitted: {
      type: Number,
      default: 0,
    },
    feature_list_shared: {
      type: Number,
      default: 0,
    },
    meeting_scheduled: {
      type: Number,
      default: 0,
    },
    meeting_done: {
      type: Number,
      default: 0,
    },
    upwork_positive_response: {
      type: Number,
      default: 0,
    },
    phone_call_done: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
BdDsrSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("bddsr", BdDsrSchema);
