const mongoose = require('mongoose');

const Bar = mongoose.model('Bar');

exports.appHome = (req, res) => {
  res.render('index', { title: 'Welcome Jamie' });
};

exports.addBar = (req, res) => {
  res.render('editBar', { title: 'Add Store' });
};

exports.createBar = async (req, res) => {
  const bar = new Bar(req.body);
  await bar.save();
  req.flash('success', 'Successfuly added bar.');
  console.log('Bar saved!');
  // @TODO add flash
  res.redirect('/add');
};

exports.apiBars = async (req, res) => {
  const bars = await Bar.find();
  res.json(bars);
};
