const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.appHome);
router.get('/add', appController.addBar);
router.post('/add', appController.createBar);

module.exports = router;
