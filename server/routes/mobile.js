/* eslint-disable no-unused-vars */
const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');
const { userAuth } = require('../middlewares/authentication');

const { login } = require('../controllers/login');
const {
  createUser,
  setInterest,
  loadProfile
} = require('../controllers/users');
const {
  createVendor,
  addVendorService,
  setVendorAddress,
  setVendorDetails
} = require('../controllers/vendors');

router.use(expressValidator());

router.post('/login', validate('login'), login);

router.post('/user/create', validate('createUser'), createUser);
router.post(
  '/user/interest/add',
  userAuth,
  validate('setInterest'),
  setInterest
);
router.get('/user/profile', userAuth, loadProfile);

router.post('/vendor/create', validate('createVendor'), createVendor);
// router.post('/vendor/set-details', userAuth, validate('setVendorDetails'), setVendorDetails);
// router.post('/vendor/set-address', userAuth, validate('setVendorAddress'), setVendorAddress);
// router.post('/vendor/services/add', userAuth, validate('addVendorService'), addVendorService);

module.exports = router;
