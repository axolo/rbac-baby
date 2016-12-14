//状态处理函数

module.exports = function(code, path, method) {
  path = (typeof path === 'undefined') ? null : path;
  method = (typeof method === 'undefined') ? null : method;
  var stauts = {};
  switch(code) {
    case 200: status = {}; break; 
    default:  status = {}
  }
  return status;
};