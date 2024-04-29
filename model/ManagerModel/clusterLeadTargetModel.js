const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let clusterLeadTargetSchema = mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    cluster_head_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cluster",
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
    },
    // manager_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'manager'
    // },
    cluster_lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cluster_leads",
    },
    targets: {
      type: Number,
    },
    confirm_business: {
      type: Number,
    },
    prev_month_target: {
      type: Number,
    },
    total_target: {
      type: Number,
    },
    completed_target: {
      type: Number,
    },
    remaining_target: {
      type: Number,
    },
    assigned_targets: {
      type: Number,
    },
    month_start_date: {
      type: Date,
    },
    target_month: {
      type: String,
    },
    target_year: {
      type: String,
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

clusterLeadTargetSchema.plugin(aggregatePaginate);

module.exports = mongoose.model(
  "cluster_lead_targets",
  clusterLeadTargetSchema
);
