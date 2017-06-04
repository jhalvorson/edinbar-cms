const express = require('express');
const passport = require('passport');
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

router.get('/', appController.appHome);
router.get('/add', authController.isLoggedIn, appController.addBar);
router.post('/add', catchErrors(appController.createBar));
router.post('/add/:id', catchErrors(appController.updateBar));

router.get('/login', authController.isNotLoggedIn, userController.loginForm);
router.post('/login', authController.login);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
          successRedirect : '/account',
          failureRedirect : '/'
}));

router.get('/register', authController.isNotLoggedIn, userController.registerForm);
router.post('/register', userController.validateRegister, userController.register, authController.login);

router.get('/account', authController.isLoggedIn, userController.account);

router.get('/logout', authController.logout);

router.get('/manage-bars', authController.isLoggedIn, userController.manage);
router.get('/manage-bars/:id/edit', authController.isLoggedIn, appController.editBar);
/*--------------
* API
---------------*/

router.get('/api/v1/bars', catchErrors(appController.apiBars));
router.get('/api/v1/search', catchErrors(appController.searchBars));

module.exports = router;
