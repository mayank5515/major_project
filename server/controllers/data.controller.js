const logger = require('../config/logger');
const SensorReading = require('../models/sensor_readings.model');



exports.getLatestSensorReading = async (req, res) => {
    try {
        const latestReading = await SensorReading.findOne().sort({ timestamp: -1 });
        if (!latestReading) {
            return res.status(404).json({ message: "No readings found" });
        }
        logger.info(`Latest sensor reading  ${latestReading}`);
        res.json(latestReading);
    }
    catch (err) {
        logger.error(`Error fetching latest sensor reading: ${err}`);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error fetching latest sensor reading'
        })
    }
}

exports.getAllSensorReadings = async (req, res) => {
    try {
        const sensorReadings = await SensorReading.find().sort({ timestamp: -1 });
        logger.info(`Sensor readings fetched successfully: ${sensorReadings}`);
        res.json(sensorReadings);
        // res.status(200).json({
        //     message: 'Sensor readings fetched successfully',
        //     data: sensorReadings
        // })
    }
    catch (err) {
        logger.error(`Error fetching sensor readings: ${err}`);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error fetching sensor readings'
        })
    }
};

exports.catchSensorReading = async (req, res, io) => {
    try {
        const { temperature, humidity, aqi } = req.body;
        console.log('Recieved catchSensorReading: ', req.body);
        if (!temperature || !humidity || !aqi) {
            logger.error(`Missing required fields : ${req.body}`);
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Missing required fields'
            })
        }
        const sensorReading = new SensorReading({
            temperature,
            humidity,
            aqi,
            timestamp: new Date(),
        })
        // await sensorReading.save();
        logger.info(`Sensor reading saved successfully: ${sensorReading}`);
        if (io) {
            io.emit("sensorReading");
        }
        res.status(200).json({
            message: 'Sensor reading saved successfully',
            data: sensorReading
        })
        //send new sensor reading via socket.io to the client 
    }
    catch (err) {
        logger.error(`Error saving sensor reading: ${err}`);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error saving sensor reading'
        })
    }
}
exports.getLast24HoursReadings = async (req, res) => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const readings = await SensorReading.find({
            timestamp: { $gte: twentyFourHoursAgo }
        }).sort({ timestamp: 1 }); // ascending order by time

        res.json(readings);
        // res.status(200).json({ success: true, data: readings });
    } catch (error) {
        console.error('Error fetching last 24 hours readings:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
