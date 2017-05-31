const mongoose = require('mongoose');

exports.appHome = (req, res) => {
  res.render('index', { title: 'Welcome Jamie' });
  console.log(process.env.SECRET);
};
