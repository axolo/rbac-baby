/**
 * @todo  authorization 同步修改？
 */

var resources = require('../models/resources');
var express = require('express');

var router = express.Router();

router.all('/list', function(req, res) {
  var request = req.query;
  var where = { };
  resources
  .find(where)
  .sort({ level: 1, name: 1 })
  .exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/get/:name', function(req, res) {
  resources
  .findOne({ name: req.params.name })
  .exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/create', function(req, res) {
  var request = req.query;
  resources({
    name: request.name,
    level: request.level,
    nick: request.nick,
    action: request.action.split(',')
  }).save(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/update/:name', function(req, res) {
  var request = req.query;
  resources.update({
    name: request.name
  }, {
    nick: request.nick,
    level: request.level,
    action: request.action.split(',')
  }, function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/delete/:name', function(req, res) {
  resources.remove().where('name').in(req.params.name.split(',')).exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

module.exports = router;