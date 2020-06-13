/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

const User = require('../models/User.js');
const Vendor = require('../models/Vendor.js');
const Admin = require('../models/Admin');

const config = require('../config');
const { generatePassword } = require('../utils/PasswordGenerator');

exports.userAuth = async (req, res, next) => {
  try {
    const token =
      (req.body && req.body.access_token) ||
      (req.query && req.query.access_token) ||
      req.headers['x-access-token'] ||
      req.cookies.token;
    // req.signedCookies["token"];

    if (token) {
      await jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).send({
            state: 'NO',
            message: 'auth failed/invalid token'
          });
        }

        // let user = decoded.type === 'user' ?
        // 	await User.findOne({ email: decoded.email }) :
        // 		decoded.type === 'vendor' ?
        // 			await Vendor.find({ email: decoded.email }) : [];

        const user = await User.findOne({ email: decoded.email });

        // console.log(user);

        if (user && user.token === decoded.pass) {
          decoded.id = user._id;
          decoded.isVendor = user.isVendor;
          req.decoded = decoded;
          next();
        } else {
          return res.status(401).send({
            state: 'NO',
            message: 'auth failed/invalid token'
          });
        }
      });
    } else {
      return res.status(401).send({
        state: 'NO',
        message: 'auth failed/empty token'
      });
    }
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      message: error.message,
      payload: error
    });
  }
};

// eslint-disable-next-line require-await
exports.checkVendor = async (req, res, next) => {
  try {
    if (!req.decoded.id) {
      return res.status(400).send({
        state: 'NO',
        message: 'No user defined.'
      });
    }

    if (!req.decoded.isVendor) {
      return res.status(403).send({
        state: 'NO',
        message: 'No vendor profile found. Please register as a vendor'
      });
    }

    return next();
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      message: error.message,
      payload: error
    });
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
    const token =
      (req.body && req.body.admin_token) ||
      (req.query && req.query.admin_token) ||
      req.headers['x-access-admin-token'] ||
      req.cookies.admin_token;

    if (token) {
      await jwt.verify(token, config.JWT_ADMIN_SECRET, async (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(403).send({
            state: 'NO',
            message: 'auth failed/invalid token'
          });
        }

        const admin = await Admin.findOne({ key: decoded.key });

        // console.log(user);

        if (admin && admin.token === decoded.token) {
          decoded.id = admin._id;
          req.decoded = decoded;
          next();
        } else {
          return res.status(401).send({
            state: 'NO',
            message: 'auth failed/invalid token'
          });
        }
      });
    } else {
      return res.status(401).send({
        state: 'NO',
        message: 'auth failed/empty token'
      });
    }
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      message: error.message,
      payload: error
    });
  }
};
