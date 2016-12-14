var config = require("../../config/config");
var mysql = require('mysql');

module.exports = {

  count: function(req, callback) {
    var db = mysql.createConnection(config.storage.dsn);
    var sql = `SELECT COUNT(*) AS account_count FROM account;`;
    db.query(sql, function(err, result){
      if(err) {
        console.log(err);
        return;
      } else {
        callback(result[0].account_count);
      }
    });
  },

  get: {
    easyui: function(req, callback) {
      var db = mysql.createConnection(config.storage.dsn);

      //计算总记录数：total
      var sql = `SELECT COUNT(*) AS account_count FROM account;`;

      db.query(sql, function(err, result){
        if(err) {
          console.log(err);
          return;
        } else {
          var data = { total: 0, rows: [] };
          data.total = result[0].account_count;
          if(data.total > 0) {
            //?page=2&rows=3&sort=name&order=asc
            var rows = req.rows;
            var page = req.page;
            var order = (req.sort ? (`ORDER BY ` + req.sort + ` ` + req.order) :``);
            // var where = '';
            var sql = `
              SELECT id, name, mail, disable 
              FROM account
              ` + order + `
              LIMIT `+ ((page - 1) * rows) +`, ` + rows + `
              ;`;

            //debug
            config.debug && console.log(sql);

            //获取对应记录集：rows
            db.query(sql, function(err, result) {
              if(err) {
                console.log(err);
                return;
              } else {
                data.rows = result;
                callback(data);
              }
            });
          } else {
            data.rows = [];
            callback(data);
          }
        }
      });
    },

    id: function(req, callback) {
      var db = mysql.createConnection(config.storage.dsn);

      var sql = `SELECT id, name, mail, disable 
      FROM account 
      WHERE id = '` + (parseInt(req) ? req : 0) + `';`;

      db.query(sql, function(err, result){
        if(err) {
          console.log(err);
          return;
        } else {
          callback(result);
        }
      });
    }
  },

  post: function(req, callback) {

  },

  put: function(req, callback) {

  },

  delete: function(req, callback) {

  }

};