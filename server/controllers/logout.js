// eslint-disable-next-line no-unused-vars
const Vendor = require('../models/Vendor.js');
const User = require('../models/User.js');

exports.logout = async (req, res, next) => {
  try {
    await User.findOneAndUpdate({ email: req.decoded.email }, { token: null });

    res.clearCookie('token', {
      expires: new Date(Date.now() + 206400000),
      // signed: true,
      httpOnly: true
    });

    res.send({
      state: 'OK',
      message: 'logged out'
    });
  } catch (error) {
    res.clearCookie('token', {
      expires: new Date(Date.now() + 206400000),
      signed: true,
      httpOnly: true
    });

    res.send({
      state: 'ERROR',
      payload: error.message
    });
  }
};
