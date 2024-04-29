const mongoose = require('mongoose');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

let loginSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    unique_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role_type: {
        type: String,
        enum : ['Admin', 'Cluster', 'Manager', 'ClusterLead', 'Business', 'CountryLead'],
    },
    secret_key: {
        required: true,
        type: String
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


loginSchema.pre("save", async function(next){
    if(!this.isModified("password")){
      next()
    }
    this.password = await bcrypt.hash(this.password,10)
  })

  loginSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
  }


module.exports = mongoose.model('logins', loginSchema);