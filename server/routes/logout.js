const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { logout } = require('../controllers/logout');

router.use(expressValidator());

router.post('/', logout);

module.exports = router;
