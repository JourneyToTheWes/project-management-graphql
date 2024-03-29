const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch(error) {
        console.error(error.message);
        process.exitCode = 1;
    }
};

module.exports = connectDB;