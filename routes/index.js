const express = require('express');
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/', appController.appHome);
router.get('/add', authController.isLoggedIn, appController.addBar);
router.post('/add', catchErrors(appController.createBar));

router.get('/login', authController.isNotLoggedIn, userController.loginForm);
router.post('/login', authController.login);

router.get('/register', authController.isNotLoggedIn, userController.registerForm);
router.post('/register', userController.validateRegister, userController.register, authController.login);

router.get('/account', authController.isLoggedIn, authController.isLoggedIn, userController.account);

router.get('/logout', authController.logout);

router.get('/account', userController.account);

/*--------------
* API
---------------*/

router.get('/api/v1/bars', appController.apiBars);

module.exports = router;
