const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: String,
  review: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  avatar: String,

  address: String,
  city: String,
  state: String,
  country: String,

  interest: Array,
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  reviews: [ReviewSchema],
  likedVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }],
  likedService: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],

  FB_userId: String, // facebook user id
  GG_userId: String, // google user id
  TW_userId: String, // twitter user id

  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isVendor: { type: Boolean, default: false },
  vendorId: mongoose.Schema.Types.ObjectId,
  hash: String,
  token: String,
  date: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', UserSchema);

UserModel.ensureIndexes({ username: 1, email: 1 });

module.exports = UserModel;
