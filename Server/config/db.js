const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

