const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let branchSchema = mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    cluster_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cluster'
    },
    branch_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});

branchSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('branch', branchSchema);