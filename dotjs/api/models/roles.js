var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.createConnection(config.dsn);

var schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, lowercase: true, min: 3, max: 20 },
  nick: { type: String, min: 3, max: 20 },
  level: { type: String },
  access: { type: Array }
});

module.exports = db.model('roles', schema);