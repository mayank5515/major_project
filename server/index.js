const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
const logger = require('./config/logger');
const dotenv = require('dotenv');
const { initSocket } = require('./utils/socket');

const dbConnection = require('./config/dbconfig');

dotenv.config({ path: './.env' });


dbConnection();

const server = http.createServer(app); //create a server instance

initSocket(server); //initialize socket io

mongoose.connection.once('open', () => {
    logger.info('MongoDB connection established successfully !');
    server.listen(process.env.PORT, () => {
        logger.info(`Server is running on port ${process.env.PORT} ⏩`);
    });
})


process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.message} stack:${err.stack}`);
    if (err instanceof AggregateError) {
        logger.error("Error :::: ", err.cause);
    }
    server.close(() => {
        logger.error("Shutting down server due to uncaught exception");
        process.exit(1);
    })
});

process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message} stack:${err.stack}`);
    server.close(() => {
        logger.error("Shutting down server due to unhandled rejection");
        process.exit(1);
    })
})