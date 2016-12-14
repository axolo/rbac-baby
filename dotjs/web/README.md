## web.woodso.com

### TODO
- [ ] 这两天被文件上传插件给逼疯了，[blueimp-jquery-file-upload](https://github.com/arvindr21/blueimp-file-upload-expressjs)及其express插件[blueimp-file-upload-expressjs](https://github.com/arvindr21/blueimp-file-upload-expressjs)、[jquery-file-upload-middleware](https://github.com/aguidrevitch/jquery-file-upload-middleware)目前还不能吃透。其实可以更简单点，一个是ajax上传文件，一个是跨域，两个基本条件。
- [ ] common.js中统一实现错误机制。就授权情况来说，涉及的问题有两个：1、某一url调用了哪些api？需要读取授权表？提前告知权限可以避免用户做无用功，比如填了半天表单，提交时才发现未开放注册！避免官僚主义，要有服务意识啊。2、若授权通过，此api可能被执行两次！（问题严重！）。客户端实现express的next()功能？是否结合api端实现错误机制？判断目前夹杂在各自代码中，实在是太别扭！！
- [x] accounts创建和更新时同步创建和更新角色。在服务端考虑“外键”的使用。
- [x] 已采用按角色授权二维操作。authorization授权，所有角色所有资源统一授权三维操作(list)，单一角色所有资源授权二维操作(list/role)，算法比较复杂。先采用单一角色单一资源授权(list/role/resource)，单线操作。考虑以单线操为支点，迭代到单一角色所有资源授权二维操作。如此或许更符合API设计原则。
- [x] doT模板内部事件不被响应！jQuery文档没参透啊！`$(parents-selector).on(event, this-selector, function(){ console.log($this); });`~~请在模板`script`标签外层选择需要实施事件的标签。doT估计太小众了，幸好Handlebars存在类似问题，搜索Handlebars的解决方案用于doT居然迎刃而解，这绝壁是曲线救国啊。~~

### NOTE
- html
  - 提交
    - [x] 用button加js的click事件实现表单提交，可ajax，用户体验好。但是需要模拟按键事件。备选方案：jQuery自带、[Mousetrap](https://github.com/ccampbell/mousetrap)、[jQuery.Hotkeys](https://github.com/jeresig/jquery.hotkeys)。
    - [ ] ~~用submit提交，method="post"时，产生405 Not Allowed，阻止提交。要么修改web服务器配置可提交到静态页面；要么手动静态或者用js动态指定action；method="get"，长串的URL参数，而且不能上传文件。两种方法提交后默认会转向API所在URL。~~
  - 界面
    - [ ] [Semantic UI](http://semantic-ui.cn)：干掉[BootStrap](http://www.bootcss.com)!
  - 模板
    - [x] [doT](https://github.com/olado/doT)：精悍的js模版，自豪的采用吧。特别注意几个大坑：
      - 赋值{{=之间没有空格！没有空格！没有空格！
      - 事件麻烦在`<script id="dot" type="text/x-dot-template"></script>`之外选择，jQuery：`$(outer).on(event,inner,function(){})`。
    - [x] [Handlebars](https://github.com/wycats/handlebars.js)：其实Handlebars亮点也很多，超喜欢#each的，可惜的是各种Helper导致不够灵活。
  - 数据
    - [x] 尽量不要在HTML中组装复杂的数据和进行复杂的判断，判断尽量使用三目表达式。组装数据的工作应该在js里完成。
- js
  - 附件上传
    - [ ] [jQuery File Upload Plugin](https://github.com/blueimp/jQuery-File-Upload)（拟采用）
  - 加载管理
    - [ ] [RequireJS](https://github.com/jrburke/requirejs)：加载并统一管理js文件
  - 表单验证
    - [ ] [FormValidation](https://github.com/formvalidation/formvalidation)：自动豪华版表单验证，省心省力！
    - [ ] [validator.js](https://github.com/chriso/validator.js)：手动版表单验证，强悍！
    - [x] 尽量一次性取出后端数据，而不要多次循环取出类似的数据，比如数组。取出后利用前端的CPU计算来组装数据，避免后端无必要的计算造成压力。
- css
  - 图标
    - [x] [Font Awesome](https://github.com/FortAwesome/Font-Awesome)


----------
> 方跃明
