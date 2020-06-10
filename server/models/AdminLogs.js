const mongoose = require('mongoose');

const LogsSchema = new mongoose.Schema({
  keyword: String, // specific key saying what admin did
  definition: String, // what the admin did in detail
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  path: String, // the url request was made
  data: Object, // the data sent
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminLogs', LogsSchema);
