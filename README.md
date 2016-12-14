RBAC构思及相关实现
==================

### 一句话
- 用户(`account`)扮演(`mask`)的角色(`role`)对资源(`resource`)的操作(`method`)是否被授权(`access`)

### 多年前的参考
- http://www.woodso.com/#/note/rbac
- 当年的源码不可寻，估计PHPChina上还有，有兴趣的自行查找

### 几个实现
> 均只有片段，未完全实现，仅供参考，估计也不会更新，见谅。具体请参考各实现的README.md。  

- `dotjs`
  - `api: Node.js + Express + MongoDB(mongoose)`
  - `web: jQuery + doT.js`
- `easyui`
  - `api: Node.js + Express + MySQL(mysql) + SQLServer(mssql)`
  - `web: jQuery + jEasyUI`
- `php`
  - 一个演示，可以向略懂的同学解释清楚


> 方跃明