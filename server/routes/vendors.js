/* eslint-disable no-unused-vars */
const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');
const { userAuth, checkVendor } = require('../middlewares/authentication');

const { login } = require('../controllers/login');

const {
  createVendor,
  addVendorService,
  setVendorAbout,
  setVendorAddress,
  setVendorDetails,
  getVendors,
  loadVendor,
  setVendorCover,
  setVendorContact,
  loadServices,
  loadSingleServices
  // setVendorPassword
} = require('../controllers/vendors');

router.use(expressValidator());

router.post('/login', validate('login'), login);

router
  .route('/')
  .get(getVendors)
  .post(userAuth, validate('createVendor'), createVendor)
  .put(userAuth, checkVendor)
  .delete(userAuth, checkVendor);

router.post(
  '/create',
  userAuth,
  checkVendor,
  validate('createVendor'),
  createVendor
);
router.post(
  '/set-about',
  userAuth,
  checkVendor,
  validate('setVendorAbout'),
  setVendorAbout
);
router.post(
  '/set-details',
  userAuth,
  checkVendor,
  validate('setVendorDetails'),
  setVendorDetails
);
router.post(
  '/set-address',
  userAuth,
  checkVendor,
  validate('setVendorAddress'),
  setVendorAddress
);
// router.post('/set-cover', userAuth, checkVendor, validate('setVendorCover'), setVendorCover);
router.post(
  '/set-contact',
  userAuth,
  checkVendor,
  validate('setVendorContact'),
  setVendorContact
);
// router.post('/services/add', userAuth, checkVendor, validate('addVendorService'), addVendorService);
// router.post('/set-password', userAuth, checkVendor, validate('setVendorPassword'), setVendorPassword);

// router.get('/profile', userAuth, checkVendor, loadVendorProfile);
router.get('/services', userAuth, checkVendor, loadServices);
router.get('/services/:id', userAuth, checkVendor, loadSingleServices);
router.get('/preview/:username', checkVendor, loadVendor);
// router.get('/:id', loadVendors);

module.exports = router;
