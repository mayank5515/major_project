const logger = require('../config/logger');
const SensorReading = require('../models/sensor_readings.model');

exports.getAllSensorReadings = async (req, res) => {

};

exports.catchSensorReading = async (req, res) => {
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
        await sensorReading.save();
        logger.info(`Sensor reading saved successfully: ${sensorReading}`);

        //send new sensor reading via socket.io to the client 
    }
    catch (err) {

    }
}