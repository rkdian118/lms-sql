const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let branchTargetSchema = mongoose.Schema(
  {
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branch",
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    cluster_head_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cluster",
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

branchTargetSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("branch_targets", branchTargetSchema);
