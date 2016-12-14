## api.woodso.com

### TODO
-/
  - [ ] 该死的IE不能解析Content-Type:application/json，浏览直接变成文件下载！
- modules
  - [ ] node-gyp：卡在编译环境了，各种折腾，差不多装了各种版本的VC++、VS。Windows下真心伤不起。打算虚拟机一个win8试试。
- /
  - [ ] error设计：`{ error: String, code: Number, path: String }`
    - error: 错误说明（凡是请求返回error的就要进行错误处理，建议客户端统一错误）
    - code: 错误代码（参照HTTP状态码设计，系统级：1xx，应用级：2xx，用户级：3xx？）
    - path: 请求路径（考虑细致到具体调用那个模块产生）
    - 参照：[在API程序设计开发中错误码如何规划设计？](http://www.zhihu.com/question/24091286)、[HTTP状态码](http://baike.baidu.com/view/1790469.htm)以及各大开放平台错误设计。
- models
  - [ ] /: mongodb的_id不能参与$or等查询中？
  - [ ] /: 外键约束！使用ObjectId？若reourecs变动，roles.access不同步，会产生的冗余，但不影响运行。同理，如果roles变动，accounts.roles不同步，但不影响运行。
  - [x] rbac: 根据token获取roles鉴定对resource是否有method权限。
  - [x] roles: 合并authorizations.access到roles.access。
  - [x] roles: 不整合到reources。~~是否整合resources到`roles:{name:'default',access:[{resource:'sign',action:['in','out',...]},...]}`？~~
- routes
  - [ ] files: ajax upload
  - [ ] /: `request = req.query || req.body;`
  - [ ] /: `router.put = router.post = function(){}`;
  - [x] update: MongoDB的upsert和multi的使用。
- models
  - [ ] unique: name、id等统一更改为get方法，支持唯一字段的读取。如accounts可支持`get/_id || id || name || mail || phone`。
  - [ ] cors: 开启跨域支持PUT、DELETE方法跨域请求

### NOTE
- NoSQL非常灵活，尽量靠近NoSQL思维模式进行设计，同时借鉴传统RDBMS。

### Validator：model及resource数据校验
- 服务器端
  - model：[Mongoose Validation](http://mongoosejs.com/docs/validation.html)：自带验证，其中match支持正则，很好很强大！
  - resource：[validator.js](https://github.com/chriso/validator.js)：自豪的采用吧！
- 浏览器端
  - [FormValidation](https://github.com/formvalidation/formvalidation)：豪华自动版表单验证利器。
  - [validator.js](https://github.com/chriso/validator.js)：手动版也许更强悍，自豪的采用吧！

### RBAC：authorization结构
1. 树状多层结构（拟采用）
  - 缺点：实现逻辑复杂，鉴定权限时算法复杂
  - 优点：NoSQL模式（~~读难写易~~，实践证明其实读写都不难，关键还是思维和算法）
```javascript
authorization: [{
  role: 'admin',
  access: [{
    resource: 'accounts',
    action: ['create', 'list', 'update', 'delete', 'id']
  }, {
    resource: 'sign',
    action: ['up', 'in', 'out', 'info']
  }]
}, {
  role: 'guest',
  access: [{
    resource: 'sign',
    action: ['up', 'in', 'out', 'info']
  }]
}]
```

2. 平面二层结构
  - 缺点：稍有冗余，实现逻辑，鉴定权限时算法复杂
  - 优点：兼容RDBMS设计模式（role、resource联合唯一）
```javascript
authorization: [{
  role: 'admin',
  resource: 'accounts',
  action: ['create', 'list', 'update', 'delete', 'id']
}, {
  role: 'admin',
  resource: 'sign',
  action: ['up', 'in', 'out', 'info']
}, {
  role: 'guest',
  resource: 'sign',
  action: ['up', 'in', 'out', 'info']
}]
```

3. 线状单层结构
  - 缺点：更新权限时整体被更新，删除资源时容易错漏，分配权限时计算复杂
  - 优点：实现逻辑简单，特别是鉴定权限算法简单（读易写难）
```javascript
authorization: [{
  role: 'admin', access: ['accounts/create', 'accounts/delete', 'sign/up']
}, {
  role: 'guest', access: ['sign/in', 'sign/out', 'sign/info']
}]
```

### RBAC：resources结构
1. Resource/Action 混杂式（拟采用）
  - 缺点，难以兼容REST风格（但可以实现）
  - 优点：在resource层面接近REST，在action层面接近Controller/Actoion，利于精细权限控制
```javascript
resources: [{
  resource: 'accounts',
  action: [ '*', '/', 'create', 'list', 'id', 'update', 'delete' ]
}, {
  resource: 'sign',
  action: ['in', 'out', 'up', 'info']
}]
```

2. REST 纯净式
  - 缺点：过于简约，不利于精细授权
  - 优点：符合REST，利于REST风格设计（前提是解决CORS及支持PUT、DELETE）
```javascript
resources: [{
  resource: 'accounts',
  method: ['GET', 'POST', 'PUT', 'DELETE']
}, {
  resource: 'sign',
  method: ['GET', 'POST', 'PUT', 'DELETE']
}]
```

3. Controller/Action 传统式
  - 缺点：容易混杂各种资源，比如accounts和sign很容易被混杂在一起实现（人为因素可以避免）
  - 优点：符合传统，仅此而已，比较成熟（但容易掉入误区，第一种方法即此方法换个名字以提醒）
```javascript
resources:[{
  controller: 'accounts',
  action: ['create', 'list', 'id', 'update', 'delete']
}, {
  controller: 'sign',
  action: ['in', 'out', 'up', 'info']
}]
```

### REST：URI风格及Router设计
- 又在纠结REST风格，貌似已中了RESTful的毒，REST风格URL很简洁、很人性、很易读，实在最具B格，人文关怀的最佳体验啊！
- 之前考虑的类似纯REST权限控制太粗放，就算只有CRUD也有细分的部分，现实应用往往需要精细权限控制。因此，又考虑了Resource/Action方式实现（其实就是Controller/Action好吧？！连发明都不用重新发明，直接窃取。重命名轮子为轱辘有意义么？有意义么？有意义么？坚决抗议方跃明这种恶劣行为！），那么URI及Router分格也要对应改变。URI：`/resource[/action[/:params[?querystring]]]`，Router：`router.all('[action[/:params]]',function(req,res,next){});`。看上去更接近REST风格^o^。再纠结一下， 首参action必须是否可以减少系统开销且更容易实现？
- ~~考虑到RBAC，设计成REST风格利于鉴权。因此将一个`resource`确定为四种方法多个实现（类似java的重载？），比如：`/get`、`/get/:id`、`get/:where`同属于GET。折腾了很多办法，觉得还是要兼容目前的原生GET、POST请求方式，因此设计成显式体现method。算是搁置争议，继续开发么？URI风格：`/resource/METHOD/:params`；router设计：`router.all('/METHOD/:params', function(req,res,next){});`。~~
- 纯REST需要解决PUT、DELETE跨域提交问题！即使是支持HTML5的先进浏览器目前尚未在HTML文档中支持原生PUT和DELETE方法。需要在客户端使用xhr发送，若跨域需要在服务端使用cors跨域支持！有现成插件`npm install cors`。

----------
> 方跃明
