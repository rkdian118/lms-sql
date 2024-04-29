const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let leadResponseSchema = mongoose.Schema({
    bd_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'businesses',
    },
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'leads' //'requirement_type',
    },
    response: {
        type: Number,
        default: 0
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
leadResponseSchema.plugin(aggregatePaginate)


module.exports = mongoose.model('lead_responses', leadResponseSchema);