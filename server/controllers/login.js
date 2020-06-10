/* eslint-disable camelcase */
const request = require('request');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const config = require('../config');

const { generatePassword, generateOtp } = require('../utils/PasswordGenerator');
const { validationHandler } = require('../middlewares/fieldValidation');

const Vendor = require('../models/Vendor.js');
const User = require('../models/User.js');
const Admin = require('../models/Admin');

const googleClient = new OAuth2Client(
  config.GG_CLIENT_ID,
  config.GG_CLIENT_SECRET
);

const rq = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) return reject(err);

      const json = JSON.parse(body);
      if (json.error) reject(json.error);
      else resolve(json);
    });
  });
};

exports.login = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const user = await User.findOne({ email: req.body.email, isActive: true });

    // let isUser = user && user.email ? true : false;
    // let isVendor = vendor && vendor.email ? true : false;

    // let match = isUser ? await bcrypt.compare(req.body.password, user.hash) :
    // 	isVendor ? await bcrypt.compare(req.body.password, vendor.hash) : null;
    const match = await bcrypt.compare(req.body.password, user.hash);

    if (!match) {
      return res.status(403).send({
        state: 'NO',
        message: 'incorrect password'
      });
    } else {
      const pass = generatePassword(10);

      await user.updateOne({ token: pass });

      const token = jwt.sign(
        {
          pass,
          email: req.body.email,
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

      res.send({
        state: 'OK',
        payload: {
          token,
          name: user.name,
          phone: user.phone,
          email: user.email,
          interest: user.interest,
          avatar: user.avatar,
          bookings: user.bookings,
          isVendor: user.isVendor,
          vendorId: user.vendorId,
          emailVerified: user.emailVerified,
          ...vendorDetails
        }
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

exports.loginFB = async (req, res) => {
  req
    .getValidationResult()
    .then(validationHandler())
    .catch((err) => {
      return res.status(400).send({
        state: 'NO',
        message: err.message,
        payload: err
      });
    });

  try {
    const { FB_accessToken } = req.body;

    const appUrl = `https://graph.facebook.com/v4.0/oauth/access_token?client_id=${config.FB_APP_ID}&client_secret=${config.FB_SECRET}&grant_type=client_credentials`;
    const appRes = await rq(appUrl);

    const idUrl = `https://graph.facebook.com/v4.0/debug_token?input_token=${FB_accessToken}&access_token=${appRes.access_token}`;
    const idRes = await rq(idUrl);

    const userId = idRes.data.user_id;

    const userUrl = `https://graph.facebook.com/v4.0/me/?fields=email,location,name,picture&access_token=${FB_accessToken}`;
    const userRes = await rq(userUrl);

    const email = userRes.email;

    let user = await User.findOne({ email, isActive: true });

    if (!user) {
      user = await User.create({
        email,
        emailVerified: true,
        name: userRes.name,
        avatar: userRes.picture.url,
        FB_userId: userId,
        address: userRes.location.name
      });
    }

    if (!user.FB_userId) {
      await user.updateOne({ FB_userId: userId });
    }

    const pass = generatePassword(10);

    await user.updateOne({ token: pass });

    const token = jwt.sign(
      {
        pass,
        email: user.email,
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

    res.send({
      state: 'OK',
      payload: {
        token,
        name: user.name,
        phone: user.phone,
        email: user.email,
        interest: user.interest,
        avatar: user.avatar,
        bookings: user.bookings,
        isVendor: user.isVendor,
        vendorId: user.vendorId,
        emailVerified: user.emailVerified,
        ...vendorDetails
      }
    });
  } catch (e) {
    console.log(e);

    res.status(400).send({
      state: 'ERROR',
      message: e
    });
  }
};

exports.loginGG = async (req, res) => {
  try {
    const { GG_accessToken } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: GG_accessToken,
      audience: config.GG_CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload();

    const userId = payload.sub;
    const email = payload.email;

    let user = await User.findOne({ email, isActive: true });

    if (!user) {
      user = await User.create({
        email,
        emailVerified: payload.email_verified,
        name: payload.name,
        avatar: payload.picture,
        GG_userId: userId
      });
    }

    if (!user.GG_userId) {
      await user.updateOne({ GG_userId: userId });
    }

    const pass = generatePassword(10);

    await user.updateOne({ token: pass });

    const token = jwt.sign(
      {
        pass,
        email: user.email,
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

    res.send({
      state: 'OK',
      payload: {
        token,
        name: user.name,
        phone: user.phone,
        email: user.email,
        interest: user.interest,
        avatar: user.avatar,
        bookings: user.bookings,
        isVendor: user.isVendor,
        vendorId: user.vendorId,
        emailVerified: user.emailVerified,
        ...vendorDetails
      }
    });

    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  } catch (e) {
    console.log(e);

    res.status(400).send({
      state: 'ERROR',
      message: e
    });
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const admin = await Admin.findOne({
      username: req.body.username,
      isActive: true
    });

    if (!admin) {
      return res.status(403).send({
        state: 'NO',
        message: 'admin not found'
      });
    }

    const match = await bcrypt.compare(req.body.password, admin.hash);

    if (!match) {
      return res.status(403).send({
        state: 'NO',
        message: 'incorrect password'
      });
    } else {
      const key = generateOtp(8);
      const pass = generatePassword(10);

      await admin.updateOne({ key, token: pass });

      const token = jwt.sign(
        {
          key,
          token: pass,
          type: 'admin'
        },
        config.JWT_ADMIN_SECRET,
        { expiresIn: '30 days' }
      );

      res.cookie('admin_token', token, {
        expires: new Date(Date.now() + 206400000),
        // signed: true,
        httpOnly: true
      });

      res.send({
        state: 'OK',
        payload: {
          name: admin.name,
          username: admin.username,
          email: admin.email,
          avatar: admin.avatar,
          role: admin.role,
          access: admin.access
        }
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
