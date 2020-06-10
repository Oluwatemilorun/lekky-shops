/* eslint-disable require-await */
const Admin = require('../models/Admin');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Service = require('../models/Service');

exports.loadProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ _id: req.decoded.id, isActive: true });

    if (!admin)
      return res.status(404).send({
        state: 'NO',
        message: 'admin not found'
      });

    res.status(200).send({
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
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ _id: req.decoded.id });

    if (!admin)
      return res.status(404).send({
        state: 'NO',
        message: 'admin not found'
      });

    const { name, username, email, avatar } = req.body;

    await admin.updateOne({
      name,
      username,
      email,
      avatar
    });

    res.status(200).send({
      state: 'NO',
      message: 'profile updated successfully'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.loadOverview = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.loadAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { hash: 0, token: 0 });

    res.status(200).send({
      state: 'OK',
      payload: users
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.loadSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      { hash: 0, token: 0 }
    );

    if (!user)
      return res.status(404).send({
        state: 'NO',
        message: 'user not found'
      });

    res.status(200).send({
      state: 'OK',
      payload: user
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.deactivateUsers = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.deactivateSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      { hash: 0, token: 0 }
    );

    if (!user)
      return res.status(404).send({
        state: 'NO',
        message: 'user not found'
      });

    await user.updateOne({
      isActive: false
    });

    res.status(200).send({
      state: 'OK',
      message: 'user deactivated'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.activateUsers = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.activateSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      { hash: 0, token: 0 }
    );

    if (!user)
      return res.status(404).send({
        state: 'NO',
        message: 'user not found'
      });

    await user.updateOne({
      isActive: true
    });

    res.status(200).send({
      state: 'OK',
      message: 'user activated'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.loadAllVendors = async (req, res, next) => {
  try {
    const vendor = await Vendor.find({}, { hash: 0, token: 0 });

    res.status(200).send({
      state: 'OK',
      payload: vendor
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.loadSingleVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne(
      { _id: req.params.id },
      { hash: 0, token: 0 }
    )
      .populate('service')
      .populate('product')
      .populate('booking');

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
      payload: error
    });
  }
};

exports.deactivateSingleVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne(
      { _id: req.params.id },
      { hash: 0, token: 0 }
    );

    if (!vendor)
      return res.status(404).send({
        state: 'NO',
        message: 'vendor not found'
      });

    await vendor.updateOne({
      isActive: false
    });

    res.status(200).send({
      state: 'OK',
      message: 'vendor deactivated'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.activateSingleVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne(
      { _id: req.params.id },
      { hash: 0, token: 0 }
    );

    if (!vendor)
      return res.status(404).send({
        state: 'NO',
        message: 'vendor not found'
      });

    await vendor.updateOne({
      isActive: true
    });

    res.status(200).send({
      state: 'OK',
      message: 'vendor activated'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.disapproveSingleVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ _id: req.params.id });

    if (!vendor)
      return res.status(404).send({
        state: 'NO',
        message: 'vendor not found'
      });

    await vendor.updateOne({
      isApproved: false
    });

    res.status(200).send({
      state: 'OK',
      message: 'vendor disapproved'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.approveSingleVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ _id: req.params.id });

    if (!vendor)
      return res.status(404).send({
        state: 'NO',
        message: 'vendor not found'
      });

    await vendor.updateOne({
      isApproved: true,
      isActive: true
    });

    res.status(200).send({
      state: 'OK',
      message: 'vendor approved'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.loadAllServices = async (req, res, next) => {
  try {
    const service = await Service.find();

    res.status(200).send({
      state: 'OK',
      payload: service
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.loadSingleService = async (req, res, next) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });

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
      payload: error
    });
  }
};

exports.disapproveSingleService = async (req, res, next) => {
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
      message: 'service disapproved'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.approveSingleService = async (req, res, next) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });

    if (!service)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    await service.updateOne({
      isApproved: true,
      isActive: true
    });

    res.status(200).send({
      state: 'OK',
      message: 'service approved'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.updateUserField = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.updateVendorField = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};

exports.updateServiceField = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};
