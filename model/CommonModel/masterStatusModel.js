const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let masterStatusSchema = mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    status_code: {
      type: Number,
    },
    status_color: {
      type: String,
      default: "#00c853",
    },
    status_type: {
      type: String,
      enum: [
        "requirement_type",
        "lead_source",
        "lead_type",
        "lead_status",
        "lead_follow_ups",
        "call_mode",
        "call_type",
        "call_status",
        "rfp_type",
        "rfp_status",
        "lead_rfp_status",
        "proposal_type",
        "proposal_status",
        "projection_status",
        "lead_proposal_status",
        "pre_define_notes",
      ],
    },
    // {
    //     type: String,
    //     required: true
    // },
    status_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

masterStatusSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("master_statuses", masterStatusSchema);
