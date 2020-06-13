const config = require('./index');

module.exports = {
  cloudName: config.CLOUDINARY_NAME,
  apiKey: config.CLOUDINARY_KEY,
  apiSecret: config.CLOUDINARY_SECRET
};
