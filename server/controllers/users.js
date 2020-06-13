const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { generatePassword } = require('../utils/PasswordGenerator');
const { validationHandler } = require('../middlewares/fieldValidation');

const User = require('../models/User.js');
const Vendor = require('../models/Vendor.js');
const Service = require('../models/Service.js');

const SaltRounds = 10;

exports.createUser = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const { name, email, avatar, password } = req.body;

    const findUser = await User.find({ email });

    if (findUser.length >= 1) {
      res.status(409).send({ state: 'NO', message: 'email exist' });
      return;
    }

    // hash password
    const salt = await bcrypt.genSalt(SaltRounds);
    const hash = await bcrypt.hash(password, salt);
    const pass = generatePassword(10);

    await User.create({
      name,
      email,
      avatar,
      hash,
      token: pass // this is the user access token. check for this before granting access
    });

    const token = jwt.sign(
      {
        pass,
        email,
        type: 'user'
      },
      config.JWT_SECRET,
      { expiresIn: '30 days' }
    );

    res.cookie('token', token, {
      expires: new Date(Date.now() + 206400000),
      // signed: true,
      httpOnly: true
    });

    res.status(200).send({
      state: 'OK',
      payload: { token, email, name, avatar }
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.setInterest = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    for (let i = 0; i < req.body.interest.length; i++) {
      const interest = req.body.interest[i];

      await User.findOneAndUpdate(
        { email: req.decoded.email },
        { $addToSet: { interest } }
      );
    }

    res.status(200).send({
      state: 'OK',
      message: 'interest added'
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.setPassword = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const vendor = await Vendor.findOne({ email: req.decoded.email });
    const { password, newPassword } = req.body;

    const match = await bcrypt.compare(password, vendor.hash);

    if (!match) {
      return res.status(403).send({
        state: 'NO',
        message: 'incorrect password'
      });
    } else {
      // hash password
      const salt = await bcrypt.genSalt(SaltRounds);
      const hash = await bcrypt.hash(newPassword, salt);

      await vendor.updateOne({
        hash
      });

      // TODO: send email to verify password

      res.status(200).send({
        state: 'OK',
        message: 'password updated successfully'
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.loadProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.decoded.email });

    const vendorDetails = user.isVendor
      ? (
          await Vendor.findById(user.vendorId, {
            hash: 0,
            isActive: 0,
            token: 0,
            isVerified: 0
          })
        )._doc
      : {};

    res.status(200).send({
      state: 'OK',
      payload: {
        userId: user._id,
        token: user.token,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        phone: user.phone,
        interest: user.interest,
        bookings: user.bookings,
        isVendor: user.isVendor,
        vendorId: user.vendorId,
        emailVerified: user.emailVerified,
        ...vendorDetails
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.addFavouriteService = async (req, res, next) => {
  try {
    const { service } = req.body;

    const serviceCheck = await Service.findOne({
      _id: service,
      isActive: true
    });

    if (!serviceCheck)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    await serviceCheck.updateOne({
      $addToSet: { likedBy: { user: req.decoded.id } }
    });

    await User.updateOne(
      { email: req.decoded.email },
      {
        $addToSet: { likedService: service }
      }
    );

    res.status(200).send({
      state: 'OK',
      message: 'favourite updated'
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.removeFavouriteService = async (req, res, next) => {
  try {
    const { service } = req.body;

    const serviceCheck = await Service.findOne({
      _id: service,
      isActive: true
    });

    if (!serviceCheck)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    await serviceCheck.updateOne({
      $pull: { likedBy: { user: req.decoded.id } }
    });

    await User.updateOne(
      { email: req.decoded.email },
      {
        $pull: { likedService: service }
      }
    );

    res.status(200).send({
      state: 'OK',
      message: 'favourite updated'
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.getFavouriteService = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.decoded.id }).populate(
      'likedService'
    );

    res.status(200).send({
      state: 'OK',
      payload: user.likedService
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.addFavouriteVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.body;

    const vendor = await Vendor.findOne({ _id: vendorId, isActive: true });

    if (!vendor)
      return res.status(404).send({
        state: 'NO',
        message: 'vendor not found'
      });

    await vendor.updateOne({
      $addToSet: { likedBy: { user: req.decoded.id } }
    });

    await User.updateOne(
      { email: req.decoded.email },
      {
        $addToSet: { likedVendors: vendorId }
      }
    );

    res.status(200).send({
      state: 'OK',
      message: 'favourite updated'
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.removeFavouriteVendor = async (req, res, next) => {
  try {
    const { vendorId } = req.body;

    const vendor = await Vendor.findOne({ _id: vendorId, isActive: true });

    if (!vendor)
      return res.status(404).send({
        state: 'NO',
        message: 'vendor not found'
      });

    await vendor.updateOne({
      $pull: { likedBy: { user: req.decoded.id } }
    });

    await User.updateOne(
      { email: req.decoded.email },
      {
        $pull: { likedService: vendorId }
      }
    );

    res.status(200).send({
      state: 'OK',
      message: 'favourite updated'
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.getFavouriteVendor = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.decoded.id }).populate(
      'likedVendors'
    );

    res.status(200).send({
      state: 'OK',
      payload: user.likedVendors
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};
