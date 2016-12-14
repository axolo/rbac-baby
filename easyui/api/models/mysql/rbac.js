/**
 * 简单实现RBAC
 * 默认role（访客）处理：未被数据库收录或者收录但未禁止来访(forbid!=1)的`资源/方法(resource/method)`视为允许来宾访问
 * app端api端均需要：cookie: { account: name, role: role.id, token: hash(mail+password)) }
 */
module.exports = {
  authorized: function(where, callback) {
    //callback(where);
    var config = require('../../config/config');
    var mysql = require('mysql');
    var db = mysql.createConnection(config.storage.dsn);
    var sql = `
      -- 权限判定（返回数组长度大于1，则说明有权限（算法可以再优化？））
      -- 情况1：未收录
      SELECT
        (CASE WHEN COUNT(*)>0 THEN 0 ELSE 1 END) AS authorized
      FROM method
        LEFT JOIN resource ON resource.id = method.resource
      WHERE
        LOWER(resource.path) = '` + where.resource + `' AND
        LOWER(method.name) = '` + where.method + `'
      UNION
      -- 情况2：放行访客
      SELECT 
        COUNT(*) AS authorized
      FROM method
        LEFT JOIN resource ON resource.id = method.resource
      WHERE
        (resource.disable IS NULL OR resource.disable != 1) AND
        (method.disable IS NULL OR method.disable != 1) AND
        method.guest = 1 AND
        LOWER(resource.path) = '` + where.resource + `' AND
        LOWER(method.name) = '` + where.method + `'` + (null === where.token ? ``: (`
      UNION
      -- 情况3：有权限
      SELECT
        COUNT(*) AS authorized
      FROM access
      LEFT JOIN method ON access.method = method.id
      LEFT JOIN resource ON method.resource = resource.id
      LEFT JOIN role ON access.role = role.id
      LEFT JOIN mask ON mask.role = role.id
      LEFT JOIN account ON mask.account = account.id
      WHERE
        -- role.id = 'roleid' AND -- 计算绝对权限
        (resource.disable IS NULL OR resource.disable != 1) AND
        (method.disable IS NULL OR method.disable != 1) AND
        (account.disable IS NULL OR account.disable != 1) AND
        account.password = '` + where.token + `' AND 
        LOWER(resource.path) = '` + where.resource + `' AND 
        LOWER(method.name) = '` + where.method + `'`)) + `
      ;`;

    //@debug
    config.debug && console.log(sql);

    db.query(sql, function(err, result){
      if(err) {
        console.log(err);
        return;
      } else {
        callback(result.length > 1 ? true : false);
      }
    });

  }
};