const mongoose = require('mongoose');

const forecastSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
        unique: true,
    },
    aqi: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: false,
});

const Forecast = mongoose.model('Forecast', forecastSchema);
module.exports = Forecast;