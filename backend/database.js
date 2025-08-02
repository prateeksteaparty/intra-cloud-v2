const mongoose = require('mongoose');
const {MONGO_URL} = process.env;

const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Connection to MongoDB failed", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;