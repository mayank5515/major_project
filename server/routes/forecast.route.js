const express = require('express');
const router = express.Router();
const { getLastHourForecast, getLast24HoursForecast, getNextAndLast5HoursForecast, getDailyAvgAqiLast5Days, getAllForecastedData, getDailyMedianAQI } = require('../controllers/forecastData.controller');

router.get('/', getAllForecastedData);

// GET /api/v1/forecast/lasthour
// → Gets forecast data for the last hour
router.get("/lasthour", getLastHourForecast);
router.get("/dailyMedianAQI", getDailyMedianAQI);
// GET /api/v1/forecast/last24hours
// → Gets hourly forecast data for the last 24 hours
router.get("/last24hours", getLast24HoursForecast);

// GET /api/v1/forecast/next1hr-last5hr
// → Gets next 1 hour forecast + last 5 hours historical
router.get("/next1hr-last5hr", getNextAndLast5HoursForecast);

// GET /api/v1/forecast/daily-avg
// → Gets daily average AQI for last 5 days
router.get("/daily-avg", getDailyAvgAqiLast5Days);
module.exports = router;