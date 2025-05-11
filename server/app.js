const express = require('express');
const openRouter = require('./routes/open.route');


const app = express();

app.use(express.json());


//ROUTES
app.use('/api/v1/open', openRouter);
// app.use('/api/v1/data');
// app.use('/api/v1/forecast') --> NOTE: Route for forecast is not implemented yet

module.exports = app;
