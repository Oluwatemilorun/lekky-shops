const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');
const { userAuth } = require('../middlewares/authentication');

const {
  addService,
  updateService,
  previewService,
  loadAllService,
  deactivateService
} = require('../controllers/services');

router.use(expressValidator());

router
  .route('/')
  .get(loadAllService)
  .post(userAuth, validate('addVendorService'), addService);

router
  .route('/:id')
  .get(previewService)
  .put(userAuth, updateService)
  .delete(userAuth, deactivateService);

router.post('/new', userAuth, validate('addVendorService'), addService);

module.exports = router;
