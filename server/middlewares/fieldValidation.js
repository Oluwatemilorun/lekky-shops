// eslint-disable-next-line no-unused-vars
const { body, header, oneOf, query } = require('express-validator/check');

export const validationHandler = (next) => (result) => {
  if (result.isEmpty()) return;

  if (!next)
    throw new Error(
      result
        .array()
        .map((i) => `'${i.param}' has ${i.msg}. Value => ${i.value}`)
        .join(' ')
    );
  else
    return next(
      new Error(
        result
          .array()
          .map((i) => `'${i.param}' has ${i.msg}. Value => ${i.value}`)
          .join('')
      )
    );
};

export const validate = (method) => {
  switch (method) {
    case 'createUser':
      return [
        body('email', 'invalid email')
          .exists()
          .isEmail(),
        body('name', 'no name').exists(),
        body('password', 'no password').exists(),
        body('avatar').optional()
      ];

    case 'setInterest':
      return [body('interest', 'no interest entered').exists()];

    case 'login':
      return [
        body('email', 'invalid email')
          .exists()
          .isEmail(),
        body('password', 'no password').exists()
      ];

    case 'loginGG':
      return [body('GG_accessToken', 'google access token required').exists()];

    case 'loginFB':
      return [
        body('FB_accessToken', 'facebook access token required').exists()
      ];

    case 'adminLogin':
      return [
        body('username', 'invalid username').exists(),
        body('password', 'no password').exists()
      ];

    case 'setPassword':
      return [
        body('password', 'no password').exists(),
        body('newPassword', 'no new password').exists()
      ];

    case 'createVendor':
      return [
        // body('password', 'no password').exists(),
        body('username', 'business username required').exists(),
        body('businessName', 'business name required').exists(),
        body('shortDescription', 'short description is required').exists(),
        body('category', 'category required').exists(),
        body('subCategory', 'sub category required').exists(),
        body('package', 'cartts package required').exists(),

        body('businessEmail', 'invalid email')
          .optional()
          .isEmail(),
        body('address', 'no address').optional(),
        body('city', 'no city').optional(),
        body('state', 'no state').optional(),
        body('country', 'no country').optional(),
        body('coordinates').optional()
      ];

    case 'setVendorAbout':
      return [
        body('businessName', 'no business name').exists(),
        body('description').exists()
      ];

    case 'setVendorDetails':
      return [
        body('businessName', 'no business name').exists(),
        body('address', 'no address').exists(),
        body('category', 'no category').exists(),
        body('country', 'no country').exists(),
        body('package', 'no package').exists(),
        body('username', 'no username').exists(),
        body('description').optional()
      ];

    case 'setVendorContact':
      return [
        body('phone', 'no phone').exists(),
        body('email', 'invalid email')
          .exists()
          .isEmail(),
        body('website', 'invalid url')
          .optional()
          .isURL()
      ];

    case 'setVendorAddress':
      return [
        body('address', 'no address').exists(),
        body('city', 'no city').exists(),
        body('state', 'no state').exists(),
        body('country', 'no country').exists(),
        body('coordinates', 'no coordinates').exists(),
        body('postalcode', 'no postalcode').exists()
      ];

    case 'setVendorCover':
      return [body('cover', 'no cover').exists()];

    case 'addVendorService':
      return [
        // body('services', 'no service').exists(),
        body('name', 'no service name').exists()
        // body('description','no service description').exists(),
        // body('cover','no service cover').exists(),
        // body('currency','no service currency').exists(),
        // body('amount','no service amount').exists().isNumeric(),
      ];

    case 'createVendorService':
      return [
        // body('services', 'no service').exists(),
        body('name', 'no service name').exists(),
        body('description', 'no service description').exists(),
        body('cover', 'no service cover').exists(),
        body('currency', 'no service currency').exists(),
        body('amount', 'no service amount')
          .exists()
          .isNumeric()
      ];

    case 'favouriteServiceAction':
      return [body('service', 'no service').exists()];

    case 'favouriteVendorAction':
      return [body('vendorId', 'no vendor').exists()];

    case 'createCategory':
      return [
        body('name', 'no category name').exists(),
        body('description', 'no category decription').exists(),
        body('tags', 'no tags added')
          .isArray()
          .exists()
      ];

    case 'createSubCategory':
      return [
        body('name', 'no category name').exists(),
        body('description', 'no category decription').exists()
        // body('tags', 'no tags added').isArray().exists()
      ];

    case 'updateSubCategory':
      return [
        body('subId', 'no category id').exists(),
        body('name', 'no category name').exists(),
        body('description', 'no category decription').exists()
        // body('tags', 'no tags added').isArray().exists()
      ];

    default:
      break;
  }
};
// abayomi
