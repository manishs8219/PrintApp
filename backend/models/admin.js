const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    images:{
        type:String
    },
    userLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0], // Set default coordinates (e.g., [0, 0]) or handle undefined
        },
    },
    phoneNumber: {
        type: Number
    },
    OTPexp: { type: Date },
    // userLocation: {
    //     type: { type: String, enum: ['Point'], default: "Point" },
    //     coordinates: { type: [Number] }
    // },
    dob: { type: String },
role:{
    type:String,
    default:0             // 0 = admin 1 = user
},
   loginTime:{
    type:String
   }
},
    { timestamps: true })


const admin = mongoose.model('admin', userSchema);
module.exports = admin;