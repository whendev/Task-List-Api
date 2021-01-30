const express = require('express');

const router = express.Router();

const controllerIndex = require('../controllers/index');

router.get('/', controllerIndex.index);

module.exports = router;
