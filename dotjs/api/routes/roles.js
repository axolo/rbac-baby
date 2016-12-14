var roles = require('../models/roles');
var express = require('express');

var router = express.Router();

router.all('/list', function(req, res) {
  var request = req.query;
  var where = { };
  roles
  .find(where)
  .sort({ name: 1 })
  .exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/get/:name', function(req, res) {
  roles.findOne({ name: req.params.name })
  .exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/create', function(req, res) {
  var request = req.query;
  roles({
    name: request.name,
    nick: request.nick
  }).save(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/update/:name', function(req, res) {
  var request = req.query;
  roles.update({
    name: request.name
  }, {
    nick: request.nick
  }, function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/delete/:name', function(req, res) {
  roles.remove().where('name').in(req.params.name.split(',')).exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/access/:role', function(req, res) {
  var request = req.query;
  roles.update({
    name: request.role
  }, {
    access: request.access
  }, {
    upsert: true,
    multi: true
  }, function(err, doc){
    res.jsonp(err?err:doc);
  });
});

module.exports = router;