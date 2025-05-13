const Forecast = require('../models/forecast_data.model');
const { format } = require('date-fns');
const moment = require('moment');
const formatForecastData = (data, location = "Delhi (Central)") => {
    return {
        aqi: data.aqi,
        forecasted: true,
        formattedTime: format(new Date(data.timestamp), "hh:mm a"),
        location,
        timestamp: data.timestamp,
    }
}
exports.getLastHourForecast = async (req, res) => {
    try {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

        const data = await Forecast.findOne({
            timestamp: { $gte: oneHourAgo, $lte: now }
        }).sort({ timestamp: -1 });
        console.log("Last hour forecast data: ", data);
        const formattedData = formatForecastData(data);
        res.json(formattedData);
    } catch (err) {
        res.status(500).json({ error: err.message, stack: err.stack, err });
    }
};

exports.getLast24HoursForecast = async (req, res) => {
    try {
        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const data = await Forecast.find({
            timestamp: { $gte: twentyFourHoursAgo, $lte: now }
        }).sort({ timestamp: 1 });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getNextAndLast5HoursForecast = async (req, res) => {
    try {
        const now = new Date();
        const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000);
        const oneHourAhead = new Date(now.getTime() + 1 * 60 * 60 * 1000);

        const data = await Forecast.find({
            timestamp: { $gte: fiveHoursAgo, $lte: oneHourAhead }
        }).sort({ timestamp: 1 });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getDailyAvgAqiLast5Days = async (req, res) => {
    try {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

        const result = await Forecast.aggregate([
            {
                $match: {
                    timestamp: { $gte: fiveDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        day: { $dayOfMonth: "$timestamp" }
                    },
                    avgAqi: { $avg: "$aqi" }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllForecastedData = async (req, res) => {
    try {
        const forecasts = await Forecast.find({});

        const formattedData = forecasts.map(data => ({
            aqi: data.aqi,
            timestamp: data.timestamp,
            formattedTime: moment(data.timestamp).format('hh:mm A'),
            location: req.query.location || "Delhi (Central)", // or dynamically include if stored
            forecasted: true,
        }));

        res.status(200).json({
            message: 'Forecasted Data:',
            count: formattedData.length,
            data: formattedData,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching forecasted data',
            error: error.message,
        });
    }
};

exports.getDailyMedianAQI = async (req, res) => {
    try {
        const data = await Forecast.aggregate([
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    aqi: 1,
                },
            },
            {
                $group: {
                    _id: "$date",
                    aqis: { $push: "$aqi" },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);

        const result = data.map(day => {
            const sorted = day.aqis.sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            const median =
                sorted.length % 2 === 0
                    ? (sorted[mid - 1] + sorted[mid]) / 2
                    : sorted[mid];
            return { date: day._id, medianAQI: median };
        });

        res.json(result);
    } catch (err) {
        console.error("Error in getDailyMedianAQI:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
