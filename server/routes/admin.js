/* eslint-disable no-unused-vars */
const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');
const { adminAuth } = require('../middlewares/authentication');
const { adminLogger } = require('../middlewares/logger');

const { adminLogin } = require('../controllers/login');
const {
  loadProfile,
  updateProfile,
  loadOverview,
  loadAllUsers,
  loadSingleUser,
  updateUserField,
  activateUsers,
  deactivateUsers,
  activateSingleUser,
  deactivateSingleUser,
  loadAllServices,
  loadSingleService,
  updateServiceField,
  approveSingleService,
  disapproveSingleService,
  loadAllVendors,
  loadSingleVendor,
  updateVendorField,
  activateSingleVendor,
  deactivateSingleVendor,
  approveSingleVendor,
  disapproveSingleVendor
} = require('../controllers/admin');

router.post('/login', validate('adminLogin'), adminLogin);

router
  .route('/profile')
  .get(adminAuth, loadProfile)
  .put(adminAuth, updateProfile);

router.route('/users').get(adminAuth, loadAllUsers);

router
  .route('/users/:id')
  .get(adminAuth, loadSingleUser)
  .put(adminAuth, updateUserField);

router.post('/users/:id/activate', adminAuth, activateSingleUser);
router.post('/users/:id/deactivate', adminAuth, deactivateSingleUser);

router.route('/services').get(adminAuth, loadAllServices);

router
  .route('/services/:id')
  .get(adminAuth, loadSingleService)
  .put(adminAuth, updateServiceField);

router.post('/services/:id/approve', adminAuth, approveSingleService);
router.post('/services/:id/disapprove', adminAuth, disapproveSingleService);

router.route('/vendors').get(adminAuth, loadAllVendors);

router
  .route('/vendors/:id')
  .get(adminAuth, loadSingleVendor)
  .put(adminAuth, updateVendorField);

router.post('/vendors/:id/activate', adminAuth, activateSingleVendor);
router.post('/vendors/:id/deactivate', adminAuth, deactivateSingleVendor);
router.post('/vendors/:id/approve', adminAuth, approveSingleVendor);
router.post('/vendors/:id/disapprove', adminAuth, disapproveSingleVendor);

module.exports = router;
