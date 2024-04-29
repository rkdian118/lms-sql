const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let adminSchema = mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    emp_id: {
      type: String,
      required: true,
      unique: true,
    },
    unique_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    country_code: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    profile_pic: {
      type: String,
      default: "",
    },
    secret_key: {
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

adminSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("admin", adminSchema);
