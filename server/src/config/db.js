const mongoose = require('mongoose');
const { options } = require('../app');
const connectDB = async ()=>{
    try {
        const uri = process.env.MONGODB_URI
        await mongoose.connect(uri);
        console.log("Mongoose connection is open");
    } catch (error) {
        console.log("Mongoose connection error");
    }
}
module.exports = connectDB