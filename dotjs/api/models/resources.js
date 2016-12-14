var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.createConnection(config.dsn);

var schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, min: 3, max: 20, lowercase: true },
  nick: { type: String },
  action: { type: Array, trim: true, lowercase: true },
  level: { type: String }
});

module.exports = db.model('resources', schema);