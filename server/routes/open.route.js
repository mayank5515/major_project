const express = require('express');
const router = express.Router();
const openController = require('../controllers/open.controller.js');

router.route('/').get(openController.getRequest).post(openController.postRequest);

module.exports = router;
