var mongoose = require('mongoose');
var config = require('../config');
var db = mongoose.createConnection(config.dsn);

/**
 * [accounts schema]
 * @type {mongoose}
 * @todo validator在此实现？可在此简单实现验证，期待插件。
 * id: 帐号，用于辅助登录、用户域名等
 * name: 姓名，用于友好显示，可以是昵称等
 * mail: 邮箱，用于验证、激活、通知、推送等等
 * phone: 手机，用于验证、短信、安全辅助等
 * token: 令牌，用于鉴权
 * created: 帐号创建日期
 * expired: 帐号到期日期
 * roles: 权限组，[admin, user, guest]，管理员、用户、访客
 * password: 密码，如密码变更token也变更
 * status: 状态，[active, limited, block]，正常、受限、屏蔽
 */
var schema = new mongoose.Schema({
  id: { type: String, required: true, trim: true, min: 3, max: 20 },
  name: { type: String, min: 2, max: 20 },
  mail: { type: String, trim: true, lowercase: true },
  phone: { type: String, },
  password: { type: String, required: true, min: 5 },
  token: { type: String },
  status: { type: String, enum: ['active', 'limited', 'block'] },
  roles: { type: Array, default: ['user'] },
  created: { type: Date, default: Date.now },
  expired: { type: Date }
});

module.exports = db.model('accounts', schema);