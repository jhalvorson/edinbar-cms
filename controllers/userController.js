const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const Bar = mongoose.model('Bar');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.account = (req, res) => {
  res.render('account', { title: 'Account' });
};

const confirmOwner = (bar, User) => {
  if(!bar.author.equals(User._id)) {
    console.log('Access denied');
  }
};

exports.manage = async (req, res) => {
  const bars = await Bar.find({ author: req.user._id});
  res.render('manage', { title: 'Manage Bars', bars });
};

// exports.editBar = (req, res) => {
//   res.render('editBar', bar);
// };

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req
    .checkBody('password-confirm', 'Confirmed password cannot be blank')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }
  next(); // there were no errors!
};

exports.register = async (req, res, next) => {
  const User = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(User, req.body.password);
  next();
};

exports.account = (req, res) => {
  res.render('account', { title: 'Edit your account' });
};

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const User = await User.findOneAndUpdate(
    { _id: req.User._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );
  req.flash('success', 'Updated your profile!');
  res.redirect('back');
};
