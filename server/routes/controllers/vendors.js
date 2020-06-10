/* eslint-disable no-unused-vars, no-undef */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { generatePassword } = require('../utils/PasswordGenerator');
const { validationHandler } = require('../middlewares/fieldValidation');
// const { categories } = require('./default'); // TODO: change this to category model

const User = require('../models/User.js');
const Vendor = require('../models/Vendor.js');
const Service = require('../models/Service.js');
const Category = require('../models/Category');

const SaltRounds = 10;

exports.createVendor = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const {
      username,
      businessName,
      shortDescription,
      category,
      subCategory,
      // package,

      businessEmail,
      address,
      city,
      state,
      country,
      coordinates
    } = req.body;

    const categ = await Category.findOne({
      name: category.toLowerCase(),
      isActive: true
    });
    const subCateg = await Category.findOne({
      'subs.name': subCategory.toLowerCase(),
      isActive: true
    });
    if (!categ && !subCateg) {
      return res.status(400).send({
        state: 'NO',
        message: 'Invalid category or sub category'
      });
    }

    const checkUsername = await Vendor.findOne({
      username,
      isActive: true
    });
    if (!checkUsername) {
      return res.status(409).send({
        state: 'NO',
        message: 'username exist'
      });
    }

    const user = await User.findOne({ _id: req.decoded.id });

    const vendor = await Vendor.create({
      user: req.decoded.id,
      username,
      businessName,
      shortDescription,
      category: category.toLowerCase(),
      subCategory: subCategory.toLowerCase(),
      // package,
      businessEmail,

      businessAddress: address,
      businessCity: city,
      businessState: state,
      businessCountry: country,
      coordinates
      // hash,
      // token: pass // this is the user access token. check for this before granting access
    });

    await user.updateOne({ isVendor: true, vendorId: vendor._id });

    res.status(200).send({
      state: 'OK',
      message: 'Vendor profile created successfully',
      payload: {
        businessName,
        username,
        shortDescription,
        // package,
        category,
        subCategory,
        isVendor: true,
        vendorId: vendor._id
      }
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.setVendorDetails = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ user: req.decoded.id });
    const {
      businessName,
      shortDescription,
      description,
      cover,
      address,
      country,
      coordinates,
      phone,
      category,
      // package,
      username
    } = req.body;

    const catgCheck = Category.findOne({
      $or: [
        { name: category.toLowerCase() },
        { 'subs.name': category.toLowerCase() }
      ],
      isActive: true
    });

    if (!catgCheck)
      return res.status(400).send({
        state: 'NO',
        message: 'invalid category'
      });

    if (username) {
      const checkUsername = await Vendor.find({ username });

      if (checkUsername.length >= 1)
        return res.status(409).send({
          state: 'NO',
          message: 'username exist'
        });
    }

    await vendor.updateOne({
      businessName,
      cover,
      businessPhone: phone,
      businessAddress: address,
      // businessCity: city,
      // businessState: state,
      businessCountry: country,
      shortDescription,
      description,
      coordinates,
      // package,
      username,
      category: categories[categoryIndex].name,
      subCategory: category
    });

    res.send({
      state: 'OK',
      message: 'vendor details updated'
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.setVendorAbout = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ user: req.decoded.id });
    const { businessName, shortDescription, description } = req.body;

    await vendor.updateOne({
      businessName,
      shortDescription,
      description
    });

    res.send({
      state: 'OK',
      payload: { businessName, shortDescription, description }
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.setVendorAddress = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ user: req.decoded.id });
    const { address, city, state, country, coordinates, postalcode } = req.body;

    await vendor.updateOne({
      businessAddress: address,
      businessCity: city,
      businessState: state,
      businessCountry: country,
      businessPostalcode: postalcode,
      coordinates
      // isActive: true
    });

    res.send({
      state: 'OK',
      payload: { address, city, state, country, coordinates, postalcode }
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.setVendorContact = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ user: req.decoded.id });
    const { email, phone, website } = req.body;

    await vendor.updateOne({
      businessEmail: email,
      businessPhone: phone,
      website,
      emailVerified: false,
      phoneVerified: false,
      websiteVerified: false
    });

    res.send({
      state: 'OK',
      payload: { email, phone, website }
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.setVendorCover = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ user: req.decoded.id });

    await vendor.updateOne({
      cover: req.body.cover
    });

    res.send({
      state: 'OK',
      message: 'cover updated'
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.getVendors = async (req, res, next) => {
  try {
    // if (req.query)

    const vendors =
      req.query && req.query.category && req.query.country
        ? await Vendor.find({
            category: req.query.category,
            country: req.query.country
          })
        : req.query && req.query.category
        ? await Vendor.find({ category: req.query.category })
        : req.query && req.query.country
        ? await Vendor.find({ country: req.query.country })
        : await Vendor.find();

    res.status(200).send({
      state: 'OK',
      payload: vendors
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.loadVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne(
      { username: req.params.username, isActive: true },
      {
        hash: 0,
        token: 0,
        isSuspended: 0,
        isApproved: 0,
        isActive: 0,
        emailVerified: 0,
        phoneVerified: 0,
        websiteVerified: 0,
        mailbox: 0,
        appointments: 0,
        package: 0,
        user: 0
      }
    ).populate('services');

    if (!vendor)
      return res.status(404).send({
        state: 'NO',
        message: 'vendor not found'
      });

    res.status(200).send({
      state: 'OK',
      payload: vendor
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.loadServices = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ user: req.decoded.id }).populate(
      'services'
    );

    res.status(200).send({
      state: 'OK',
      payload: vendor.services
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.loadSingleServices = async (req, res, next) => {
  try {
    const { id } = req.params;

    const service = await Service.findOne({
      _id: id,
      isActive: true
    });

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
