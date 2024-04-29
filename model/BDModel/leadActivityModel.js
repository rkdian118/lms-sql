const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const commentSchema = mongoose.Schema(
  {
    comment_by_id: {
      type: String,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

let leadActivitySchema = mongoose.Schema(
  {
    lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leads",
    },
    activity_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses",
    },
    comment: [commentSchema],
    status: {
      type: String,
      default: 1,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    followup_date: {
      type: Date,
      default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      //   required: false,
    },
  },
  {
    timestamps: true,
  }
);

leadActivitySchema.plugin(aggregatePaginate);

module.exports = mongoose.model("lead_activity", leadActivitySchema);
