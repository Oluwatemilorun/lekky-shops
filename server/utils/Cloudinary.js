const cloundinary = require('cloudinary');
const config = require('../config/cloudinary');

cloundinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret
});

module.exports = cloundinary;
