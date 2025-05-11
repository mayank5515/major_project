const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./logger');
dotenv.config({ path: '../.env' });

const dbConnection = async () => {
    try {
        const DB_URI = process.env.DB_CONNECTION_STRING.replace('<db_password>', process.env.DB_PASSWORD);
        const conn = await mongoose.connect(DB_URI, {
        });
        logger.info(`Database connected successfully  ✅`);
    }
    catch (err) {
        logger.error(`Database connection error: ${err.message}`);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = dbConnection;