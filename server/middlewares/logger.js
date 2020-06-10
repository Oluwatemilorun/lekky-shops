const Admin = require('../models/Admin');
const AdminLogs = require('../models/AdminLogs');

exports.adminLogger = async (req, res, next) => {
  try {
    const logData = {
      admin: req.decoded.id
    };

    const log = await AdminLogs.create(logData);
    await Admin.findByIdAndUpdate(req.decoded.id, {
      $addToSet: { logs: log._id }
    });

    next();
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error
    });
  }
};
