const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let callSchema = mongoose.Schema({
    bd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses'
    },
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead'
    },
    call_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master_statuses'
    },
    call_mode_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master_statuses'//call_mode'
    },
    meeting_link: {
        type: String,
    },
    meeting_date_time: {
        type: Date,
    },
    comment_remark: {
        type: String,
    },
    pe_name: {
        type: String,
    },
    recording_link: {
        type: String,
    },
    call_status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master_statuses',
    },
    status: {
        type: String,
        default: 1
    },
    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});
callSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('call', callSchema);