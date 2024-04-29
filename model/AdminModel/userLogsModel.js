const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let userLogsSchema = mongoose.Schema({
    user_id: {
        type: String,
    },
    role_type: {
        type: String,
    },
    req_type: {
        type: String,
    },
    req_host: {
        type: String,
    },
    req_url: {
        type: String,
    },
    req_method: {
        type: String,
    },
    req_ip: {
        type: String,
    },
    
    res_status: {
        type: String,
    },
    res_msg: {
        type: String,
    },
    res_data: {
        type: Array,
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

userLogsSchema.plugin(aggregatePaginate)

module.exports = mongoose.model('userLogs', userLogsSchema);