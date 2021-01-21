'use strict';

const express = require('express');
const router = express.Router();

const finderController = require('../controllers/finder')

router.get('/finder', finderController.getBooks);

module.exports = router;
