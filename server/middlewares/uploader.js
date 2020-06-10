const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

const cloudinary = require('../utils/Cloudinary');

// TODO: do a try catch for all methods
// TODO: return error
function throwError(error, res) {
  console.log(error);
  res.status(400).send({
    state: 'ERROR',
    message: error.message,
    payload: error
  });
}

exports.serviceAssetsUploader = async (req, res, next) => {
  try {
    const uploader = await multer({
      storage: cloudinaryStorage({
        cloudinary,
        folder: `service-assets/${req.params.id}`,
        allowedFormats: ['jpg', 'png']
        // transformation: [
        // 	{
        // 		width: 500,
        // 		height: 500,
        // 		crop: "limit"
        // 	}
        // ]
      }),
      limits: {
        fileSize: 600000
      }
    }).single('image');

    uploader(req, res, next);
  } catch (error) {
    throwError(error, res);
  }
};

exports.vendorLogoUploader = async (req, res, next) => {
  try {
    const uploader = await multer({
      storage: cloudinaryStorage({
        cloudinary,
        folder: `vendor-logo/${req.decoded.id}`,
        allowedFormats: ['jpg', 'png']
        // transformation: [
        // 	{
        // 		width: 500,
        // 		height: 500,
        // 		crop: "limit"
        // 	}
        // ]
      }),
      limits: {
        fileSize: 600000
      }
    }).single('image');

    uploader(req, res, next);
  } catch (error) {
    throwError(error, res);
  }
};

exports.vendorCoverUploader = async (req, res, next) => {
  try {
    const uploader = await multer({
      storage: cloudinaryStorage({
        cloudinary,
        folder: `vendor-cover/${req.decoded.id}`,
        allowedFormats: ['jpg', 'png']
        // transformation: [
        // 	{
        // 		width: 500,
        // 		height: 500,
        // 		crop: "limit"
        // 	}
        // ]
      }),
      limits: {
        fileSize: 600000
      }
    }).single('image');

    uploader(req, res, next);
  } catch (error) {
    throwError(error, res);
  }
};

exports.vendorGalleryUploader = async (req, res, next) => {
  try {
    const uploader = await multer({
      storage: cloudinaryStorage({
        cloudinary,
        folder: `vendor-gallery/${req.decoded.id}`,
        allowedFormats: ['jpg', 'png']
        // transformation: [
        // 	{
        // 		width: 500,
        // 		height: 500,
        // 		crop: "limit"
        // 	}
        // ]
      }),
      limits: {
        fileSize: 600000
      }
    }).single('image');

    uploader(req, res, next);
  } catch (error) {
    throwError(error, res);
  }
};

exports.userPictureUploader = async (req, res, next) => {
  const uploader = await multer({
    storage: cloudinaryStorage({
      cloudinary,
      folder: `user-picture/${req.decoded.id}`,
      allowedFormats: ['jpg', 'png']
      // transformation: [
      // 	{
      // 		width: 500,
      // 		height: 500,
      // 		crop: "limit"
      // 	}
      // ]
    }),
    limits: {
      fileSize: 600000
    }
  }).single('image');

  uploader(req, res, next);
};

exports.categoryPictureUploader = async (req, res, next) => {
  const uploader = await multer({
    storage: cloudinaryStorage({
      cloudinary,
      folder: `category/${req.decoded.id}`,
      allowedFormats: ['jpg', 'png']
      // transformation: [
      // 	{
      // 		width: 500,
      // 		height: 500,
      // 		crop: "limit"
      // 	}
      // ]
    }),
    limits: {
      fileSize: 600000
    }
  }).single('image');

  uploader(req, res, next);
};
