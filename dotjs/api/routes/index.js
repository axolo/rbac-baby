var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.jsonp({
    project: 'api.woodso.com',
    version: '0.0.1',
    support: 'zergdo@gmail.com'
  });
});

module.exports = router;
