const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const redirectSSL = require('redirect-ssl');
const config = require('./config');

const indexRouter = require('./routes/default');
// const mobileRouter = require('./routes/mobile');
const loginRouter = require('./routes/login');
const logout = require('./routes/logout');
const userRouter = require('./routes/user');
const vendorRouter = require('./routes/vendors');
const serviceRouter = require('./routes/services');
const uploadRouter = require('./routes/upload');
const adminRouter = require('./routes/admin');
const categoryRouter = require('./routes/category');

const app = express();

// connect mongo
mongoose.Promise = global.Promise;
(async function DBConnect() {
  try {
    if (process.env.NODE_ENV === 'production')
      await mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true
      });
    else
      await mongoose.connect('mongodb://localhost:27017/cartts', {
        useNewUrlParser: true
      });

    console.log('connected to db successfully');
  } catch (err) {
    console.log(err);
    // await DBConnect();
  }
})();

app.use(redirectSSL);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.COOKIE_SECRET));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logout);
app.use('/user', userRouter);
app.use('/vendor', vendorRouter);
app.use('/services', serviceRouter);
app.use('/upload', uploadRouter);
app.use('/admin', adminRouter);
app.use('/categories', categoryRouter);
// app.use(mobileRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
};
