const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let clusterHeadSchema = mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    emp_id: {
        type: String,
        required: true,
    },
    unique_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch'
    },
    profile_pic: {
        type: String,
        default: ""
    },
    secret_key: {
        type: String
    },
    status: {
        type: String,
        default: 1
    },
    deleted: {
        type: Boolean,
        default: false
    },
    country_code:{
        type: String,
        default: 91
    }
},{
    timestamps: true
});

clusterHeadSchema.plugin(aggregatePaginate)



module.exports = mongoose.model('cluster', clusterHeadSchema);