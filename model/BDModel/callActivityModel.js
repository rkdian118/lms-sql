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

let callActivitySchema = mongoose.Schema({
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead',
    },
    call_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'calls',
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

callActivitySchema.plugin(aggregatePaginate)


module.exports = mongoose.model('call_activity', callActivitySchema);