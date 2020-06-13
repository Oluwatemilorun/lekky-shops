const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');
const { userAuth } = require('../middlewares/authentication');

const { login } = require('../controllers/login');
const {
  createUser,
  setInterest,
  loadProfile,
  setPassword,
  addFavouriteService,
  removeFavouriteService,
  getFavouriteService,
  addFavouriteVendor,
  removeFavouriteVendor,
  getFavouriteVendor
} = require('../controllers/users');

router.use(expressValidator());

router.post('/login', validate('login'), login);

router.post('/create', validate('createUser'), createUser);

router.post('/interest/add', userAuth, validate('setInterest'), setInterest);
router.post('/set-password', userAuth, validate('setPassword'), setPassword);
router.post(
  '/favourites/service/add',
  userAuth,
  validate('favouriteServiceAction'),
  addFavouriteService
);
router.post(
  '/favourites/service/remove',
  userAuth,
  validate('favouriteServiceAction'),
  removeFavouriteService
);
router.post(
  '/favourites/vendor/add',
  userAuth,
  validate('favouriteVendorAction'),
  addFavouriteVendor
);
router.post(
  '/favourites/vendor/remove',
  userAuth,
  validate('favouriteVendorAction'),
  removeFavouriteVendor
);

router.get('/profile', userAuth, loadProfile);
router.get('/favourites/service', userAuth, getFavouriteService);
router.get('/favourites/vendor', userAuth, getFavouriteVendor);

// router.route('/route')
// 	.get()
// 	.post()
// 	.put()
// 	.delete()

module.exports = router;
