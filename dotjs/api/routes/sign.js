var accounts = require('../models/accounts');
var express = require('express');
var crypto = require('crypto');

var router = express.Router();

router.all('/up', function(req, res) {
  var request = req.query;
  accounts({
    id: request.id,
    mail: request.mail,
    phone: request.phone,
    password: crypto.createHash('sha1').update(request.password).digest('hex'),
    token: crypto.createHash('sha1').update(request.password + request.mail).digest('hex'),
    name: request.name
  }).save(function(err, doc){
    res.jsonp(err?err:doc);
  });
});

router.all('/in', function(req, res) {
  var request = req.query;
  accounts
  .findOne()
  .where({
    $or: [
      { id: request.id },
      { name: request.id },
      { mail: request.id },
      { phone: request.id }],
    password: crypto.createHash('sha1').update(request.password).digest('hex') })
  .exec(function(err, doc){
    if(doc){ res.cookie('token', doc.token); }
    res.jsonp(err?err:doc);
  });
});

router.all('/out', function(req, res) {
  res.clearCookie('token');
  res.jsonp('signout');
});

module.exports = router;