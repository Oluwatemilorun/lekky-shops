/* eslint-disable no-unused-vars */
const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');

const { getCategories, loadServices } = require('../controllers/default');

router.use(expressValidator());

// router.get('/categories', getCategories);
// router.get('/category/:name', loadServices);

module.exports = router;
