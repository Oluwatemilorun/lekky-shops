const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: String,
  review: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

const RequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

const AppointmentScheduleSchema = new mongoose.Schema({
  day: String,
  from: String,
  to: String
});

const GallerySchema = new mongoose.Schema({
  url: String,
  cloudinaryId: String,
  date: { type: Date, default: Date.now }
});

const ServiceSchema = new mongoose.Schema(
  {
    name: String,
    shortDescription: String,
    description: String,
    cover: String,
    gallery: [GallerySchema],
    amount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    currency: {},
    unit: { type: String, default: 'day' },
    reviews: [ReviewSchema],
    favourites: { type: Number, default: 0 },
    likedBy: [LikeSchema],
    requestedBy: [RequestSchema],
    rating: Number,
    category: String,
    subCategory: String,
    location: String,
    appointmentSchedule: [AppointmentScheduleSchema],

    isApproved: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },

    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Service', ServiceSchema);
