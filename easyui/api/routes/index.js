var config = require('../config/config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    "name": config.name,
    "version": config.version,
    "support": config.support
  });
});

module.exports = router;
