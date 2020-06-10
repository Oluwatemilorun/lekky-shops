/* eslint-disable no-unused-vars */
const config = require('../config');
const { validationHandler } = require('../middlewares/fieldValidation');
const { generatePassword } = require('../utils/PasswordGenerator');

const User = require('../models/User.js');
const Vendor = require('../models/Vendor.js');
const Service = require('../models/Service.js');
const Category = require('../models/Category');

const PopulateFields = [
  'businessName',
  // "businessEmail",
  'businessCountry',
  'businessAddress',
  'shortDescription',
  // "description",
  'businessRating',
  'businessReviews',
  'logo',
  // "cover",
  'username',
  'likedBy'
];

exports.addService = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ user: req.decoded.id });
    const { name } = req.body;

    const service = await Service.create({
      name,
      category: vendor.category,
      subCategory: vendor.subCategory,
      location: vendor.businessCountry,
      vendor: vendor._id
    });

    await vendor.updateOne({
      $addToSet: { services: service._id }
    });

    res.send({
      state: 'OK',
      payload: { serviceId: service._id }
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.createService = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ user: req.decoded.id });
    const {
      _id,
      name,
      shortDescription,
      description,
      cover,
      currency,
      amount
    } = req.body;

    const service = await Service.create({
      name,
      description,
      shortDescription,
      currency,
      amount,
      cover,
      category: vendor.category,
      subCategory: vendor.subCategory,
      location: vendor.businessCountry.toLowerCase(),
      vendor: vendor._id
    });

    await vendor.updateOne({
      $addToSet: { services: service._id }
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.updateService = async (req, res, next) => {
  try {
    // await req.getValidationResult().then(validationHandler());
    const { id } = req.params;
    const {
      name,
      shortDescription,
      description,
      currency,
      amount,
      unit,
      appointmentSchedule
    } = req.body;

    const service = await Service.findOne({ _id: id, isActive: true });

    if (!service)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    await service.updateOne({
      name,
      description,
      shortDescription,
      currency,
      amount,
      unit,
      appointmentSchedule
    });

    res.status(200).send({
      state: 'OK',
      message: 'service updated successfully'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.loadAllService = async (req, res, next) => {
  try {
    let { category, location, min, max } = req.query;
    const trending = req.query;
    let services = [];

    if (category || location || min || max) {
      category = category && category.replace(/-/g, ' ').toLowerCase();
      location = location && location.toLowerCase();
      min = min && parseInt(min);
      max = max && parseInt(max);

      if (category) {
        const checkCatg = await Category.findOne({
          $or: [{ name: category }, { 'subs.name': category }],
          isActive: true
        });

        if (!checkCatg) {
          return res.status(404).send({
            state: 'NO',
            message: 'category not found',
            payload: []
          });
        }

        services = await Service.find(
          location && min && max
            ? {
                isActive: true,
                isApproved: true,
                location,
                amount: { $gte: max, $lte: min },
                $or: [{ category }, { subCategory: category }]
              }
            : location && min
            ? {
                isActive: true,
                isApproved: true,
                location,
                amount: { $lte: min },
                $or: [{ category }, { subCategory: category }]
              }
            : location && max
            ? {
                isActive: true,
                isApproved: true,
                location,
                amount: { $gte: max },
                $or: [{ category }, { subCategory: category }]
              }
            : min && max
            ? {
                isActive: true,
                isApproved: true,
                amount: { $gte: max, $lte: min },
                $or: [{ category }, { subCategory: category }]
              }
            : location
            ? {
                isActive: true,
                isApproved: true,
                location,
                $or: [{ category }, { subCategory: category }]
              }
            : min
            ? {
                isActive: true,
                isApproved: true,
                amount: { $lte: min },
                $or: [{ category }, { subCategory: category }]
              }
            : max
            ? {
                isActive: true,
                isApproved: true,
                amount: { $gte: max },
                $or: [{ category }, { subCategory: category }]
              }
            : {
                isActive: true,
                isApproved: true,
                $or: [{ category }, { subCategory: category }]
              }
        ).populate('vendor', PopulateFields);

        services = {
          services,
          name: checkCatg.name,
          cover: checkCatg.cover,
          subs: checkCatg.subs
        };
      } else {
        services = await Service.find(
          location && min && max
            ? {
                isActive: true,
                isApproved: true,
                location,
                amount: { $gte: max, $lte: min }
              }
            : location && min
            ? {
                isActive: true,
                isApproved: true,
                location,
                amount: { $lte: min }
              }
            : location && max
            ? {
                isActive: true,
                isApproved: true,
                location,
                amount: { $gte: max }
              }
            : min && max
            ? {
                isActive: true,
                isApproved: true,
                amount: { $gte: max, $lte: min }
              }
            : location
            ? {
                isActive: true,
                isApproved: true,
                location
              }
            : min
            ? {
                isActive: true,
                isApproved: true,
                amount: { $lte: min }
              }
            : {
                isActive: true,
                isApproved: true,
                amount: { $gte: max }
              }
        ).populate('vendor', PopulateFields);
      }
    } else if (trending) {
      services = await Service.find({
        isActive: true,
        isApproved: true
      })
        .sort({ favourites: -1 })
        .limit(10)
        .populate('vendor', PopulateFields); // TODO: change businessEmail to username or path
    } else {
      services = await Service.find({
        isActive: true,
        isApproved: true
      }).populate('vendor', PopulateFields);
    }

    res.status(200).send({
      state: 'OK',
      message: 'service fetched successfully',
      payload: services
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      message: error.message,
      payload: error
    });
  }
};

exports.previewService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await Service.findOne({
      _id: id,
      isApproved: true,
      isActive: true
    }).populate('vendor', PopulateFields);

    if (!service)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    res.status(200).send({
      state: 'OK',
      payload: service
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.deactivateService = async (req, res, next) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });

    if (!service)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    await service.updateOne({
      isApproved: false
    });

    res.status(200).send({
      state: 'OK',
      message: 'service disapproved',
      payload: []
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};
