/* eslint-disable no-unused-vars */
const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');
const { userAuth } = require('../middlewares/authentication');
const {
  vendorLogoUploader,
  vendorCoverUploader,
  vendorGalleryUploader,
  serviceAssetsUploader,
  categoryPictureUploader,
  userPictureUploader
} = require('../middlewares/uploader');

const {
  vendorLogo,
  vendorCover,
  vendorGallery,
  serviceGallery,
  serviceCover,
  categoryCover,
  userPicture
} = require('../controllers/upload');

router.post('/user-avatar', userAuth, userPictureUploader, userPicture);
router.post('/vendor-logo/:id', userAuth, vendorLogoUploader, vendorLogo);
router.post('/vendor-cover/:id', userAuth, vendorCoverUploader, vendorCover);
router.post(
  '/vendor-gallery/:id',
  userAuth,
  vendorGalleryUploader,
  vendorGallery
);
router.post(
  '/service-cover/:id',
  userAuth,
  serviceAssetsUploader,
  serviceCover
);
router.post(
  '/service-gallery/:id',
  userAuth,
  serviceAssetsUploader,
  serviceGallery
);
router.post(
  '/category-cover/:id',
  userAuth,
  categoryPictureUploader,
  categoryCover
);

module.exports = router;
