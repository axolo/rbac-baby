/**
 * 帐号
 * 密码策略：SHA1(密码+邮箱)？SHA1（帐号+密码+安全码）？写入config？
 */

var config = require("../config/config");
var mssql = require('mssql');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();

//总记录数
router.get('/count', function(req, res, next) {
  var account = require('../models/' + config.storage.engine + '/account');
  account.count(null, function(result){
    res.json(result);
  });
});

//列表
router.get('/', function(req, res, next) {
  //简单粗暴的判定：非正整数直接使用初始值？
  //没有limit语法的sqlserver简直是灭绝人性！
  var rows = /(^[1-9]\d*$)/.test(req.query.rows) ? req.query.rows : config.page.rows;
  var page = /(^[1-9]\d*$)/.test(req.query.page) ? req.query.page : 1;
  var account = require('../models/' + config.storage.engine + '/account');
  account.get.easyui({
    rows: rows,
    page: page,
    order: req.query.order,
    sort: req.query.sort }, function(result){
    res.json(result);
  });

});

//查询
router.get('/id', function(req, res, next) {
  var account = require('../models/' + config.storage.engine + '/account')
  account.get.id(req.param('id'), function(result){
    res.json(result);
  });
});

//新增
router.post('/', function(req, res, next){
  res.json('post');
});

//删除
router.delete('/:id', function(req, res, next){
  //req.params.id分个体和集合（checkbox多选）
  res.json('delete: ' + req.params.id);
});

//修改
router.put('/:id', function(req, res, next){
  res.json('put: ' + req.params.id);
  // mssql.connect(config.storage.dsn).then(function(){
  //   var db = new mssql.Request();

  //   var password = crypto.createHash('sha1').update(req.query.password + req.query.mail).digest('hex');
  //   var sql = `UPDATE account
  //   SET 
  //     name='` + req.query.name + `',
  //     mail='` + req.query.mail + `',
  //     password='` + password + `'
  //   WHERE id='` + req.params.id + `'`;

  //   db.query(sql).then(function(result){
  //     console.log(password);
  //     res.json(result);
  //   }).catch(function(err){
  //     res.json(err);
  //   });

  // });
});

module.exports = router;