/* eslint-disable no-unused-vars */
const User = require('../models/User.js');
const Vendor = require('../models/Vendor.js');
const Service = require('../models/Service.js');
const Category = require('../models/Category');

exports.userPicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        state: 'ERROR',
        message: 'no or invalid image'
      });
    }

    const imageUrl = req.file.url;
    const imageId = req.file.public_id;

    const user = await User.findOne({ _id: req.decoded.id, isActive: true });

    await user.updateOne({
      avatar: imageUrl
    });

    res.status(200).send({
      state: 'OK',
      message: 'avatar uploaded successfully',
      payload: imageUrl
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.vendorCover = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        state: 'ERROR',
        message: 'no or invalid image'
      });
    }

    const imageUrl = req.file.url;
    const imageId = req.file.public_id;

    const vendor = await Vendor.findOne({
      user: req.decoded.id,
      isActive: true
    });

    await vendor.updateOne({
      cover: imageUrl
    });

    res.status(200).send({
      state: 'OK',
      payload: imageUrl
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.vendorLogo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        state: 'ERROR',
        message: 'no or invalid image'
      });
    }

    const imageUrl = req.file.url;
    const imageId = req.file.public_id;

    const vendor = await Vendor.findOne({
      user: req.decoded.id,
      isActive: true
    });

    await vendor.updateOne({
      logo: imageUrl
    });

    res.status(200).send({
      state: 'OK',
      message: 'logo updated successfully',
      payload: imageUrl
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.vendorGallery = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        state: 'ERROR',
        message: 'no or invalid image'
      });
    }

    const imageUrl = req.file.url;
    const imageId = req.file.public_id;

    const vendor = await Vendor.findOne({
      user: req.decoded.id,
      isActive: true
    });
    const imageData = {
      url: imageUrl,
      cloudinaryId: imageId
    };

    await vendor.updateOne({
      $addToSet: { gallery: imageData }
    });

    res.status(200).send({
      state: 'OK',
      message: 'image added to gallery successfully',
      payload: imageData
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.serviceGallery = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).send({
        state: 'ERROR',
        message: 'service not found'
      });
    }

    const service = await Service.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!service)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    const imageUrl = req.file.url;
    const imageId = req.file.public_id;

    const imageData = {
      url: imageUrl,
      cloudinaryId: imageId
    };

    await service.updateOne({
      $addToSet: { gallery: imageData }
    });

    res.status(200).send({
      state: 'OK',
      message: 'image added to gallery successfully',
      payload: imageData
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.serviceCover = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).send({
        state: 'ERROR',
        message: 'service not found'
      });
    }

    const service = await Service.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!service)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    const imageUrl = req.file.url;
    const imageId = req.file.public_id;

    await service.updateOne({ cover: imageUrl });

    res.status(200).send({
      state: 'OK',
      payload: imageUrl
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.categoryCover = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).send({
        state: 'ERROR',
        message: 'category not found'
      });
    }

    const category = await Category.findOne({
      _id: req.params.id,
      isActive: true
    });

    if (!category)
      return res.status(404).send({
        state: 'NO',
        message: 'service not found'
      });

    const imageUrl = req.file.url;
    const imageId = req.file.public_id;

    await category.updateOne({ cover: imageUrl });

    res.status(200).send({
      state: 'OK',
      payload: imageUrl
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};
