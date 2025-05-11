const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
    temperature: { //from DHT11
        type: Number,
        required: true
    },
    humidity: { //from DHT11
        type: Number,
        required: true
    },
    aqi: { //optionally calculated AQI value
        type: Number,
        required: false
    },
    timestamp: { //timestamp of the reading
        type: Date,
        default: Date.now,
        required: true
    }
});

const SensorReading = mongoose.model('SensorReading', sensorReadingSchema);

module.exports = SensorReading;
// {
//     _id: ObjectId,
//         temperature: Number,     // from DHT11
//             humidity: Number,        // from DHT11
//                 pm1_0: Number,           // from PMS5003
//                     pm2_5: Number,           // from PMS5003
//                         pm10: Number,            // from PMS5003
//                             gas_level: Number,       // from MQ135
//                                 aqi: Number,             // optionally calculated AQI value
//                                     location: {
//         lat: Number,
//             lon: Number,
//                 city: String           // optional, for mapping
//     },
//     timestamp: Date
// }