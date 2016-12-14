var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.createConnection(config.dsn);

//附件下载权限、角色、积分、次数、防重复、防盗链等等
var schema = new mongoose.Schema({
  filename: { type: String, required: true },
  destination: { type: String },
  encoding: { type: String },
  mimetype: { type: String },
  size: { type: Number, required: true },
  hash: { type: String, required: true },
  originalname: { type: String, required: true },
  description: { type: String },
  // path: { type: String, required: true },
  status: { type: String, enum: ['active', 'audit', 'locked'] },
  created: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now },
  hits: { type: Number, default: 0 },
  subject: { type: String },
  owner: { tpye: String }
});

module.exports = db.model('files', schema);