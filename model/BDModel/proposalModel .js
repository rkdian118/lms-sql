const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const proposalObjSchema = mongoose.Schema(
  {
    proposal_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "master_statuses",
    },
    other_doc: [
      {
        type: String,
        default: "0",
      },
    ],
    proposal: [
      {
        type: String,
        default: "0",
      },
    ],
    wbs: [
      {
        type: String,
        default: "0",
      },
    ],
    wireframe: [
      {
        type: String,
        default: "0",
      },
    ],
    comment_remark: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let proposalSchema = mongoose.Schema(
  {
    bd_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
    },
    lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lead",
    },
    project_name: {
      type: String,
    },
    upfront_amount: {
      type: Number,
    },
    project_amount: {
      type: Number,
    },
    proposal_submitted: {
      type: String,
    },
    timeline_days: {
      type: Number,
    },
    man_hour: {
      type: Number,
    },
    // proposal_status: {
    //     type: String,
    //     default: 1
    // },
    proposal: [proposalObjSchema],
    // amount: {
    //     type: Number,
    // },
    // timeline: {
    //     type: String,
    // },
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

proposalSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("proposal", proposalSchema);
