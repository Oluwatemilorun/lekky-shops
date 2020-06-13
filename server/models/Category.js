const mongoose = require('mongoose');

const SubSchema = new mongoose.Schema({
  name: String,
  cover: String,
  tags: Array,
  date: { type: Date, default: Date.now }
});

const CategorySchema = new mongoose.Schema({
  name: String,
  cover: String,
  description: String,
  subs: [SubSchema],
  tags: Array,
  isActive: { type: Boolean, default: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);
