/**
 * 同一个物理存储的文件可对应多个不同的主题。
 * 比如，主题1附件1对应物理存储文件1，主题2的附件1也可能对应物理存储文件1，
 * 因此，数据库记录跟物理存储关系为N:1。
 * 1、跨域：采用cors
 * 2、去重（HASH、MD5）
 * @todo  3、进度（客户端可见上传下载实时进度、可后台进行）
 * @todo  4、权限（读、写、积分、付费等）
 * @todo  5、限流（字节数、次数等）
 * @todo  6、CDN存取（AWS、七牛、或者自制）
 * @todo  7、自动分目录（按用户、按日期、按类型？）
 * @todo  8、无引用文件清理、删除
 * @todo  9、断点续传
 * @todo  10、下载线程控制
 */

var files = require('../models/files');
var upload = require('../plugins/upload');
var fs = require('fs');
var crypto = require('crypto');
var express = require('express');
var router = express.Router();

router.all('/count', function(req, res) {
  files.count({}, function(err, count) {
    res.jsonp(err ? err : count);
  });
});

router.all('/list', function(req, res){
  files
  .find({})
  .sort({ update: -1 })
  .limit(10)
  .skip(0)
  .exec(function(err, doc){
    res.jsonp(err ? err : doc);
  });
});

router.all('/download/:id', function(req, res){
  files
  .findOne()
  .where({ _id: req.params.id })
  .exec(function(err, doc) {
    if(err) {
      res.jsonp(err);
    } else {
      res.download(doc.destination + '/' + doc.filename, doc.originalname, function(err) {
        if(err){
          res.jsonp(err);
        }
      });
    }
  })
});

router.all('/upload', upload.single('file'), function(req, res) {
  var rs = fs.createReadStream(req.file.path);
  var hash = crypto.createHash('md5');
  rs.on('data', hash.update.bind(hash));
  rs.on('end', function() {
    var md5 = hash.digest('hex');
    var filename = md5 + /\.[^\.]+$/.exec(req.file.originalname.toLowerCase()); //md5.ext
    fs.rename(req.file.path, req.file.destination + '/' + filename, function(err) {
      if(err) {
        //@todo  处理错误
        res.jsonp(err);
      } else {
        files({
          filename: filename,
          destination: req.file.destination,
          encoding: req.file.encoding,
          mimetype: req.file.mimetype,
          size: req.file.size,
          hash: md5,
          originalname: req.file.originalname,
          description: req.body.description
        }).save(function(err, doc) {
          res.jsonp(err?err:doc);
        });
      }
    });
  });
});

module.exports = router;