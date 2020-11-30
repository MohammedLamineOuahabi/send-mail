const express = require('express');
const subscribeController = require('./../controllers/subscribeController');

const router = express.Router();

router.post('/', subscribeController.subscribe);

module.exports = router;
