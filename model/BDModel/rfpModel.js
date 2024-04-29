const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const momSchema = mongoose.Schema({
    rfp_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master_statuses',
    },
    pe_name: {
        type: String,
    },
    pe_email: {
        type: String,
    },
    remarks: {
        type: String,
    },
    activity_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master_statuses',
    },
    minutes_of_meeting: {
        type: String,
    },
    attachments: [
        {
            type: String,
            default: "0"
        }
    ],
}, {
    timestamps: true
});

let rfpSchema = mongoose.Schema({
    bd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses'
    },
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lead'
    },
    proposal_value: {
        type: Number,
        default: 0
    },
    rfp: [momSchema],
    lead_rfp_status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master_statuses',
    },
    // minutes_of_meeting: {
    //     type: String,
    // },
    // attachments: [
    //     {
    //         type: String,
    //         default: "0"
    //     }
    // ],
    status: {
        type: String,
        default: 1
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

rfpSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('rfp', rfpSchema);