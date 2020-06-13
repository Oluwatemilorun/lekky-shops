const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: String,
  vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }],
  dateCreate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', LocationSchema);
