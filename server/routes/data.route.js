const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');
const { getSocket } = require('../utils/socket');

router.route('/latest').get(dataController.getLatestSensorReading);
router.route('/last24hours').get(dataController.getLast24HoursReadings);
router.route('/').post((req, res) => {
    const io = getSocket();
    dataController.catchSensorReading(req, res, io);
}).get(dataController.getAllSensorReadings);

module.exports = router;