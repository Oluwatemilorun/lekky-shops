const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const ServiceSchema = new mongoose.Schema({
  name: String,
  // description: String,
  amount: Number
});

const BookingSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  appointmentDate: String,
  appointmentTime: String,
  amountDue: Number,
  amountPaid: { type: Number, default: 0 },
  isCancelled: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
