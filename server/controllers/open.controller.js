const logger = require('../config/logger');
const SensorReading = require('../models/sensor_readings.model');
exports.getRequest = async (req, res) => {

    try {
        console.log('Recieved getRequest: ', req.body);
        res.send('GET request received successfully');
        // res.status(200).json({ message: 'Request received successfully', data: req.body });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.postRequest = async (req, res) => {
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
        res.status(200).json({
            message: 'Sensor reading saved successfully',
            data: sensorReading
        })
        // res.status(200).json({ message: 'Request received successfully', data: req.body });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}