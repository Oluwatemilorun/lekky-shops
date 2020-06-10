const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');

const { login, loginFB, loginGG } = require('../controllers/login');

router.use(expressValidator());

router.post('/', validate('login'), login);
router.post('/google', validate('loginGG'), loginGG);
router.post('/facebook', validate('loginFB'), loginFB);

module.exports = router;
