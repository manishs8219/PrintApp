const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
    
    },

    password: {
        type: String
    },

    appname: {
        type: String
    },

    state: {
        type: Number,   // 0 = disabled 1 = enabled
        default:1
    },

    status:{
        type:String,
        default:0             // 0 = offiline 1 = online
    },
     
    images: {
        type: String
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
    role: {
        type: Number,
        default: 0             // 0 = admin 1 = user
    },
    loginTime: {
        type: String
    }
},
    { timestamps: true })


const users = mongoose.model('users', userSchema);
module.exports = users;