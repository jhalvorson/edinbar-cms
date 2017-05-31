const mongoose = require('mongoose');

const Bar = mongoose.model('Bar');

exports.appHome = (req, res) => {
  res.render('index', { title: 'Welcome Jamie' });
  console.log(process.env.SECRET);
};

exports.addBar = (req, res) => {
  res.render('editBar', { title: 'Add Store' });
};

exports.createBar = async (req) => {
  const bar = new Bar(req.body);
  await bar.save();
  console.log('Bar saved!');
};
