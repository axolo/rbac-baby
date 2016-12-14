## oa.woodso.com
oa.woodso.com

### todo
- web
  - [ ] Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.

- api
  - [ ] 多库（帐套）支持：？
  - [ ] 多条件查询，WHERE、ORDER等组装问题？使用纯对象{}，还是简单粗暴纯String，还是混合？
  - [x] 状态统一处理：`require('plugin/status')(code, path, method)`，参考HTTP Status Code，统一设计。
  - [x] 二级资源权限计算。
    - ***权宜解决办法：一律不用/account/:id，改用/account/id?id=:id，使用`req.param('id')`。***
    - 模型里加一个UNIQUE的`resource.path`简单粗暴。
    - 但问题来了：/account/:id这样的path如何判定:id为非resource？全部采用req.query.:id？
    - ~~api地址`account/count`对应数据库`resource.resource_id/reource.name`对应rbac计算`req.path.split('/')`。~~
  - [x] 多数据引擎（mysql、mssql、nosql...）支持：根据config.storage.engine加载对应models。
  - [x] rbac权限判断：资源/方法1、未收录；2、已收录来宾可访问3、当前用户综合角色有权限。UNION查询记录>1条，即有权。

- model
  - [x] rbac模型设计。解决方案：account -> mask -> role -> resource -> method -> access。

### note
- web
  - `EasyUI`：注意两次重复请求问题！如：js里定义了`datagrid`，就不要在datagrid的div里面加`class="easyui-datagrid"`。
  - `app.js`：点击`tree.node`打开`tabs`前做权限（`passport`）检查：`Config.apiurl + 'passport/' + node.href + '/' + node.method`；
  - 是否直接做在addTab方法里？造成污染？新增、编辑和删除操作（按钮、对话框）也有类似权限判断！
  - 解决跨域（特别是IE）问题：`jQuery.support.cors = true`

- api
  - `plugins/rabc`： 系统级入口权限检查，避免不正常渠道存取
  - `routes/passport`： 应用级别权限检查，避免有权限时重复请求数据
  - `plugins/rabc`：`'property' in Object` 和 `Object.hasOwnProperty` 不如 `!Object || !Object.property ? false : true`简单粗暴。
  - `Node.js`: 温习一下`module.exports`的回调：
```js
//callback.js
module.exports = {
  get: function(params, callback) {
    callback(JSON.stringify(params));
  }
};
//request.js
require('./callback').get(params, function(result) {
  console.log(result);
});
```

- model
  - `SQLServer`：没有`LIMIT offset, rows`语法的sqlserver简直是灭绝人性，NOT IN里面where和order by都得自带啊！
  - `SQLServer`：NULL值计算，比如定义`col bit NULL`要计算!=1得`(col IS NULL OR col != 1) AND ...`，这……也是无语。

- node
  - 国内NPM加速
```
npm config set registry https://registry.npm.taobao.org 
npm info underscore
```

### powered by
- api
  - [Node.js](https://github.com/nodejs/node)
  - [Express](https://github.com/expressjs/express)

- web
  - [jQuery EasyUI](http://www.jeasyui.com/)
  - [jQuery-Tags-Input](https://github.com/xoxco/jQuery-Tags-Input)
  - [jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload)
  - [querystring](https://github.com/jgallen23/querystring)

- datastore
  - [Microsoft SQL Server](http://www.microsoft.com/zh-cn/server-cloud/products/sql-server/)

> Yueming Fang