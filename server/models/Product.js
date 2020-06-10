const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: String,
  review: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  name: String,
  description: String,
  category: String,
  amount: Number,
  cover: String,
  gallery: Array, // array of pictures
  reviews: [ReviewSchema],
  isAvailable: { type: Boolean, default: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
