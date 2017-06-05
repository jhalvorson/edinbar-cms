const mongoose = require('mongoose');

const Bar = mongoose.model('Bar');

exports.appHome = (req, res) => {
  res.render('index', { title: 'Welcome Jamie' });
};

exports.addBar = (req, res) => {
  res.render('editBar', { title: 'Add Store' });
};

exports.createBar = async (req, res) => {
  req.body.author = req.User._id;
  const bar = new Bar(req.body);
  await bar.save();
  req.flash('success', 'Successfuly added bar.');
  console.log('Bar saved!');
  // @TODO add flash
  res.redirect('/add');
};

const confirmOwner = (bar, User) => {
  if(!bar.author.equals(User._id)) {
    throw Error('You must own the bar in order to edit it!');
  }
}

exports.editBar = async (req, res) => {
  const bar = await Bar.findOne({ _id: req.params.id });

  // confirmOwner(bar, req.User);

  res.render('editBar', { title: `Edit Bar`, bar});
}

exports.updateBar = async (req, res) => {
  const bar = await Bar.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    runValidators: true
  }).exec();

  req.flash('success', `Successfuly updated ${bar.name}.`);
  res.redirect('/manage-bars');
}

exports.findAuthorBars = async (req, res) => {
  const bars = await Bar.find();
  res.render(bars);
}

exports.apiBars = async (req, res) => {
  const bars = await Bar.find();
  res.json(bars);
};

exports.apiBarsId = async (req, res) => {
  const bars = await Bar.find({ _id: req.params.id });
  res.json(bars);
};

exports.searchBars = async (req, res) => {
  const bars = await Bar.find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  })
  .sort({
    score: { $meta: 'textScore' }
  })
  .limit(10);
  res.json(bars);
}
