const mongoose = require('mongoose');

const CoordinatesSchema = new mongoose.Schema({
  lng: Number,
  lat: Number
});

const ReviewSchema = new mongoose.Schema({
  rating: String,
  review: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

// eslint-disable-next-line no-unused-vars
const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  cover: String,
  amount: Number
});

const GallerySchema = new mongoose.Schema({
  url: String,
  cloudinaryId: String,
  date: { type: Date, default: Date.now }
});

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

const VendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  // name: String,

  businessEmail: String,
  businessPhone: String,
  businessWebsite: String,

  category: String,
  subCategory: String,
  businessName: String,
  shortDescription: String,
  description: String,
  logo: String,
  cover: String,
  gallery: [GallerySchema],
  package: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],

  businessAddress: String,
  businessCity: String,
  businessState: String,
  businessCountry: String,
  businessPostalcode: String,
  coordinates: CoordinatesSchema,

  businessRating: Number,
  businessReviews: [ReviewSchema],
  likedBy: [LikeSchema],

  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  successfulSales: { type: Number, default: 0 },

  mailbox: [], // TODO: sketch a better way to store this.

  hash: String,
  token: String,

  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  websiteVerified: { type: Boolean, default: false },

  isActive: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },

  date: { type: Date, default: Date.now }
});

const VendorModel = mongoose.model('Vendor', VendorSchema);

VendorModel.ensureIndexes({ phone: 1, email: 1, user: 1, username: 1 });

module.exports = VendorModel;
