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
  created: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  beers: [String],
  wines: [String],
  spirits: [String],
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        required: 'You must supply coordinates',
      },
    ],
    address: {
      type: String,
      required: 'You must supply an address',
    },
  },
});

barSchema.pre('save', async function (next) {
  if (this.beers[0].length) {
    const beers = this.beers[0].split(', ');
    this.beers = beers;
  }

  if (this.wines[0].length) {
    const wines = this.wines[0].split(', ');
    this.wines = wines;
  }

  if (this.spirits[0].length) {
    const spirits = this.spirits[0].split(', ');
    this.spirits = spirits;
  }
  next();
});

module.exports = mongoose.model('Bar', barSchema);
