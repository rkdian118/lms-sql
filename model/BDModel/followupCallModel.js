const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let followupCallSchema = mongoose.Schema({
    bd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses',
    },
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'leads' //'requirement_type',
    },
    comment: {
        type: String,
    },
    response: {
        type: Number,
        default: 0 /** 1 picked, 2 Note Picked, 3 Declined  */
    },
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
followupCallSchema.plugin(aggregatePaginate)


module.exports = mongoose.model('followup_calls', followupCallSchema);