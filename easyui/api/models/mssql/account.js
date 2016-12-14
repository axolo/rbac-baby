var config = require("../../config/config");
var mssql = require('mssql');

module.exports = {

  count: function(req, callback) {
    mssql.connect(config.storage.dsn).then(function(){
      var db = new mssql.Request();
      //@todo 组装条件语句    
      var sql = `SELECT COUNT(*) AS account_count FROM account;`;

      db.query(sql).then(function(result) {
        callback(result[0].account_count);
      });
    }).catch(function(err){
        console.log(err);
        return;
    });
  },

  //优化？
  get: {
    easyui: function(req, callback) {
      var db = new mssql.Request();

      //计算总记录数：total
      var sql = `SELECT COUNT(*) AS account_count FROM account;`;

      db.query(sql).then(function(result) {

        //TODO: 根据jQuery EasyUI需要的格式来组装数据，也是醉了
        //优点：查询条件不用另外带入，无记录则无需再查询
        //缺点：这格式实在太生硬，可考虑在客户端格式化并组装数据
        var data = { total: 0, rows: [] };

        data.total = result[0].account_count;
        
        if(data.total > 0) {
          //?page=2&rows=3&sort=name&order=asc
          var rows = req.rows;
          var page = req.page;
          var order = (req.sort ? (`ORDER BY ` + req.sort + ` ` + req.order) :``);
          // var where = '';
          var sql = `
            SELECT TOP ` + rows + ` id, name, mail, disable 
            FROM account
            WHERE id NOT IN (
              SELECT TOP `+ (page - 1) * rows +` id 
              FROM account 
              ` + order + `) 
            ` + order + ` ;`;

          config.debug && console.log(sql);

          //获取对应记录集：rows
          db.query(sql).then(function(result) {
            data.rows = result;
            callback(data);
          });
        } else {
          data.rows = [];
          callback(data);
        }
      }).catch(function(err){
        res.json(err);
      });

    },

    id: function(req, callback) {
      mssql.connect(config.storage.dsn).then(function(){
        var db = new mssql.Request();

        var sql = `SELECT id, name, mail, disable 
        FROM account 
        WHERE id = '` + (parseInt(req) ? req : 0) + `';`;

        db.query(sql).then(function(result){
          callback(result);
        }).catch(function(err){
          console.log(err);
          return;
        });
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