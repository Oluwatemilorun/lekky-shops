const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  FB_APP_ID: process.env.FB_APP_ID,
  FB_SECRET: process.env.FB_SECRET,
  GG_CLIENT_ID: process.env.GG_CLIENT_ID,
  GG_CLIENT_SECRET: process.env.GG_CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_HEADER: {
    typ: 'JWT',
    alg: 'HS256'
  }
};
