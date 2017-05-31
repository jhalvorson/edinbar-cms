const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', appController.appHome);
router.get('/add', appController.addBar);
router.post('/add', catchErrors(appController.createBar));

module.exports = router;
