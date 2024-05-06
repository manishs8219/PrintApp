const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
mongoose.set("strictQuery", false);

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_CONNECT)

        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;