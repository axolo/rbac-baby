/**
 * 简单实现RBAC
 * @todo  roles合法性判断
 * @todo  默认role目前采用硬编码，需要深入考虑
 */
module.exports = function(req, res, next) {
  var accounts = require('../models/accounts');
  var token = req.cookies.token || req.query.token || req.body.token || null;
  var where = { token: token };
  accounts.findOne(where).exec(function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      var role = (!doc || doc.roles.length == 0) ? ['guest'] : doc.roles;
      //@todo: 此处应通过数据库判断roles是否合法
      var access = req.path.split('/');
      var roles = require('../models/roles');
      roles
      .count()
      .where({ 'name': { $in: role }})
      .where({ 'access.resource': access[1] })
      .where({ 'access.action': access[2] })
      .exec(function(err, doc){
        if(doc) {
          next();
        } else {
          res.jsonp({
            error: 'Unauthorized',
            code: 401,
            path: req.path });
          return;
        }
      });
    }
  });
};