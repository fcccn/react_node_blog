# react_node_blog
项目名称：个人博客

技术栈：React、Next、Node、Express、Mysql

项目介绍：

    项目主要是完成一个个人博客，blog前后台使用react技术栈，前端主要完成功能就是用户的访问，文章列表和文章详情页面，后台主要是对文章进行增删改查。
    因为Blog的前台需要SEO操作，所以我们一定会选用Next.js框架来辅助我们开发。
    然后减少CSS和各种组件的重复开发，选用阿里的Ant Desgin来作为UI交互库。
    后台主要采用node+express+mysql，为了学习一些服务端的知识。

文件说明：

    admin: 前端-后台  
    blog: 前端-前台  
    server: 后端  

后台待完成开发：
    
    文章列表展示页面布局
    修改文章功能
    文章列表分页功能

## 一、项目结构

### 1.1、基础环境

express 服务端项目，相关运行环境配置如下：

工具名称 | 版本号
------- | -----
node.js | 12.13.0
npm     | 6.13.1
express | 4.16.1
mysql   | 2.17.1
nodemon | 2.0.1

### 1.2、运行项目

（1）安装插件  

    npm install

（2）开发环境启动  

    后台 nodemon run dev
    前端 npm run start

## 二、常用功能

### 2.1 安装配置数据库

我们在 server/config/db.default.js 文件中配置 mysql 的基本信息，相关配置项如下，可以对应更改配置项，改成你自己的配置。

```
MYSQL_CONF = {
  host: 'localhost',
  port: 3306,
  database: 'react_blog',
  user: 'root',
  password: '12345678',
  multipleStatements: true
}

module.exports = {
  MYSQL_CONF
}
````

### 2.2 数据库连接及操作

对数据进行基本的增、删、改、查操作，可以通过已经配置好的文件以及逻辑进行照搬，在 server/db/mysql.js 文件中：
```
const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db.default')
const pool = mysql.createPool(MYSQL_CONF)

// 统一执行 sql 函数
function query(sql, params, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(err)
        } else {
            connection.query(sql, params, function (err, rows) {
              console.log(rows)
                callback(err, rows)
            })
        }
        pool.releaseConnection(connection)
    })
}

module.exports = {
    query
}
```

### 2.3 跨域配置

我们已经在项目的 app.js 中进行项目的跨域配置，这样一些客户端例如：单页面应用开发、移动应用等， 就可以跨域访问服务端对应的接口。我们在 app.js 文件中进行相关跨域配置：

```
app.use("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})
```

### 2.4 请求路由配置
我们在项目中按模块划分请求处理，我们在 routes 目录下分别新建每个模块路由配置，例如后台模块，则为 admin.js 文件，我们在 app.js 主入口文件中引入每个模块的路由，以用户模块进行举例，相关代码逻辑如下：
```
// 引入后台模块路由配置
var adminRouter = require('./routes/admin/admin');
// 使用后台模块的路由配置
app.use('/admin', adminRouter);
```
其中 routes/admin/admin.js 文件中的路由配置如下：
```
// 登录
router.post("/checkLogin", function(req, res, next) {
  let userName = req.body.userName
  let password = req.body.password
  let sql = `SELECT id, userName FROM admin_user WHERE userName='${userName}' AND password=${password}`
  checkLogin(sql, res)
})
...
```
通过这种规范和配置，这时如果增加一个新的模块，只需按照原有的规范，新增一个模块路由文件，进行相关的路由配置处理，不会影响到原有的模块路由配置，也不会出现路由冲突等。
