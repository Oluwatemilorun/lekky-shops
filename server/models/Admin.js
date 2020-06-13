const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    email: String,
    username: String,
    role: String,
    access: [],
    logs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AdminLogs' }],

    hash: String,
    isActive: { type: Boolean, default: true },
    key: String,
    token: String,
    tokenWillExpire: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Admin', AdminSchema);
