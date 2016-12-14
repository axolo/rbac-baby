module.exports = function(req, res, next) {
  var config = require('../config/config');
  res.json(config.status.err600);
  return;
}