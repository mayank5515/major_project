const logger = require('../config/logger');
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
        console.log(`Recieved postRequest: `, req.body);
        res.send('POST request received successfully');
        // res.status(200).json({ message: 'Request received successfully', data: req.body });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}