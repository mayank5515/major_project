const express = require('express');
const openRouter = require('./routes/open.route');
const dataRouter = require('./routes/data.route');
const forecastRouter = require('./routes/forecast.route');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",  // or your deployed frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


//ROUTES
app.use('/api/v1/open', openRouter);
app.use('/api/v1/data', dataRouter);
app.use('/api/v1/forecast', forecastRouter);

module.exports = app;
