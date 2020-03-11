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

待完成
    后台开发：
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