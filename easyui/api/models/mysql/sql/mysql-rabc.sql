-- ----------------------- --
--          MariaDB        --
-- Writen by Yueming Fang  --
-- ----------------------- --

-- 帐号
CREATE TABLE account (
  id        int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name      varchar(30) UNIQUE NOT NULL,
  mail      varchar(30) UNIQUE NOT NULL,
  password  char(40) NOT NULL,
  disable   boolean NULL
);
-- 必要帐号（admin:password）
INSERT INTO account (name, mail, password) VALUES
('admin', 'admin@local.host', '56c3c9e7691c4e20d3a43f02c71e1498740a3219');

-- 角色
CREATE TABLE role (
  id        int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  parent    int NULL,
  name      varchar(30) UNIQUE NOT NULL,
  nick      varchar(30) NULL,
  disable   boolean NULL,
  queue     int NULL, -- 排序
  FOREIGN KEY (parent) REFERENCES role(id) ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- 必要角色
INSERT INTO role (name, nick, queue) VALUES
('admin', '管理员', 1);

-- 面具（帐号拥有的角色）
CREATE TABLE mask (
  account int NOT NULL,
  role int NOT NULL,
  UNIQUE (account, role),
  FOREIGN KEY (account) REFERENCES account(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (role) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- 必要面具
INSERT INTO mask (account, role) VALUES
(1, 1);

-- 资源
CREATE TABLE resource (
  id        int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  parent    int NULL,
  path      varchar(30) UNIQUE NOT NULL,
  name      varchar(30) NOT NULL,
  nick      varchar(30) NOT NULL,
  disable   boolean NULL,
  FOREIGN KEY (parent) REFERENCES resource(id) ON UPDATE NO ACTION ON DELETE NO ACTION
);
-- 必要资源
INSERT INTO resource (path, name, nick) VALUES
('/account', 'account', '帐号'),
('/role', 'role', '角色'),
('/resource', 'resource', '资源'),
('/access', 'access', '权限');

-- 方法（资源拥有的方法，是否并入resource？）
CREATE TABLE method (
  id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  resource int NOT NULL,
  name  varchar(30) NOT NULL,
  nick varchar(30),
  disable boolean NULL,   -- 禁用：谁都不能用
  guest   boolean NULL,   -- 来宾：访客通行
  UNIQUE (name, resource),
  FOREIGN KEY (resource) REFERENCES resource(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- 必要方法
INSERT INTO method (resource, name, nick) VALUES
('1', 'get', '读取帐号'),
('1', 'post', '新增帐号'),
('1', 'put', '更新帐号'),
('1', 'delete', '删除帐号'),
('2', 'get', '读取角色'),
('2', 'post', '新增角色'),
('2', 'put', '更新角色'),
('2', 'delete', '删除角色'),
('3', 'get', '读取资源'),
('3', 'post', '新增资源'),
('3', 'put', '更新资源'),
('3', 'delete', '删除资源'),
('4', 'get', '读取权限'),
('4', 'post', '新增权限'),
('4', 'put', '更新权限'),
('4', 'delete', '删除权限');


-- 权限（`角色`可使用的`资源/方法`）
CREATE TABLE access (
  role   int NOT NULL,
  method int NOT NULL,
  UNIQUE (role, method),
  FOREIGN KEY (role) REFERENCES role(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (method) REFERENCES method(id) ON UPDATE CASCADE ON DELETE CASCADE
);
-- 必要权限
INSERT INTO access(role, method) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16);

-- 计算权限
-- 描述：当前用户拥有的角色对当前资源方法是否拥有权限
-- 1、未收录的资源方法（方法未收录在method表中）
-- 2、或 当前方法具有来宾权限（guest = 1）
-- 3、或 综合权限（全部角色）绝对权限（当前角色）已授权
-- 4、如果返回数组长度大于1，则说明有权限（算法可以再优化）？

-- 权限判定（返回数组长度大于1，则说明有权限（算法可以再优化？））
-- 情况1：未收录
SELECT
  (CASE WHEN COUNT(*)>0 THEN 0 ELSE 1 END) AS authorized
FROM method
  LEFT JOIN resource ON resource.id = method.resource
WHERE
  LOWER(resource.path) = '/account' AND
  LOWER(method.name) = 'get'
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
  LOWER(resource.path) = '/account' AND
  LOWER(method.name) = 'get'
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
  account.password = '56c3c9e7691c4e20d3a43f02c71e1498740a3219' AND
  LOWER(resource.path) = '/account' AND
  LOWER(method.name) = 'get'
;