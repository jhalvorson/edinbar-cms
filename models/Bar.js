const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const barSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter you bar\'s name',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
});

module.exports = mongoose.model('Bar', barSchema);
