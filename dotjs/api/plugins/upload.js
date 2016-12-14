/**
 * @todo MD5去重，crypto、md5、md5-file纠结中
 * @type {[type]}
 */
var config = require('../config');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: config.upload.path
});

var upload = multer({ storage: storage });

module.exports = upload;