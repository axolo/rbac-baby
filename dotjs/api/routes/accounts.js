/**
 * 注意加密方式
 */

var accounts = require('../models/accounts');
var express = require('express');
var crypto = require('crypto');

var router = express.Router();

router.all('/count', function(req, res) {
  accounts.count({}, function(err, count) {
    res.jsonp(err ? err : count);
  });
});

router.all('/list', function(req, res) {
  accounts
  .find({})
  .sort({ id: 1 })
  .limit(10)
  .skip(0)
  .exec(function(err, doc){
    res.jsonp(err ? err : doc);
  });
});

router.all('/get/:id', function(req, res) {
  accounts
  .findOne()
  .where({ $or: [
    { id: req.params.id },
    { phone: req.params.id },
    { mail: req.params.id } ]})
  .exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

// var request = req.body;
// 此举考虑通配使用其他途径传人比如req.body
router.all('/create', function(req, res) {
  var request = req.query;
  accounts({
    id: request.id,
    mail: request.mail,
    phone: request.phone,
    password: crypto.createHash('sha1').update(request.password).digest('hex'),
    token: crypto.createHash('sha1').update(request.password + request.mail).digest('hex'),
    name: request.name,
    roles: request.roles
  }).save(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/update/:id', function(req, res) {
  var request = req.query;
  accounts.update({
    id: request.id
  }, {
    mail: request.mail,
    phone: request.phone,
    password: crypto.createHash('sha1').update(request.password).digest('hex'),
    token: crypto.createHash('sha1').update(request.password + request.mail).digest('hex'),
    name: request.name,
    roles: request.roles
  }, function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/delete/:id', function(req, res) {
  accounts.remove().where('id').in(req.params.id.split(',')).exec(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

module.exports = router;