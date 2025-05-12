const fs = require('fs');
const path = require('path');
const Forecast = require('./models/forecast_data.model'); // adjust the path if needed
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: '../.env' }); // Load environment variables from .env file

const db_connection = process.env.DB_CONNECTION_STRING.replace('<db_password>', process.env.DB_PASSWORD);
// Connect to MongoDB
mongoose.connect(db_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Read JSON file
const filePath = path.join(__dirname, './utils/forecast_10_days.json'); // your local file
const forecastData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

async function insertData() {
    try {
        await Forecast.deleteMany({}); // optional: clear old data
        await Forecast.insertMany(forecastData);
        console.log('Forecast data inserted successfully');
    } catch (err) {
        console.error('Error inserting forecast data:', err.message);
    } finally {
        mongoose.disconnect();
    }
}

insertData();