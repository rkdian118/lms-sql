const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const commentSchema = mongoose.Schema({
    comment_by_id: {
        type: String,
    },
    comment: String,
  },{
    timestamps:true
  });

let rfpActivitySchema = mongoose.Schema({
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead',
    },
    rfp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rfp',
    },
    activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master_statuses',
    },
    comment: [commentSchema],
    status: {
        type: String,
        default: 1,
    },
    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

rfpActivitySchema.plugin(aggregatePaginate)


module.exports = mongoose.model('rfp_activities', rfpActivitySchema);