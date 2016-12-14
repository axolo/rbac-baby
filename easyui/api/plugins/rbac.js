/**
 * 简单实现RBAC
 * plugins/rabc:    系统级入口权限检查
 * routes/passport: 应用级别权限检查，避免有权限时重复请求数据  
 * @todo 二级资源及计算req.path.split('/')
 */

module.exports = function(req, res, next) {

  var config = require('../config/config');
  var rbac = require('../models/' + config.storage.engine + '/rbac');
  var where = {
    // resource: req.path.split('/').slice(1,2).pop(),
    resource: req.path, 
    method:   req.method.toLowerCase(),
    token:    ((!req.query || !req.query.token) ? null : req.query.token) || 
              ((!req.body || !req.body.token) ? null : req.body.token) || 
              ((!req.cookies || !req.cookies.token) ? null : req.cookies.token) || null
  };

  //授权判断
  rbac.authorized(where, function(result){
    if(result) {
      //passport: 仅检查权限
      if(undefined === req.query.passport && undefined === req.query.passport) {
        next();
      } else {
        // console.log('check passport ok: ' + req.query.passport);
        res.json(200);
      }
    } else {
      res.json(401);
      return;
    }
  });

};