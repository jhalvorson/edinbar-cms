const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const promisify = require('es6-promisify');
const expressValidator = require('express-validator');

const routes = require('./routes/index');
const helpers = require('./helpers');

// @TODO errorsHandlers, passport etc.

const app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
// app.use(
//   session({
//     secret: process.env.SECRET,
//     key: process.env.KEY,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
//   })
// );

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.currentPath = req.path;
  next();
});

app.use('/', routes);

// @TODO add error handling

module.exports = app;
