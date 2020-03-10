var express = require('express');
var router = express.Router();
// var moment = require('moment');
const adminAuth  = require('../../middleware/adminAuth');
const {
  checkLogin,
  getTypeInfo,
  addArticle
} = require('../../controller/admin/adminController')
// 文章首页列表
router.post("/checkLogin", function(req, res, next) {
  let userName = req.body.userName
  let password = req.body.password
  let sql = `SELECT id, userName FROM admin_user WHERE userName='${userName}' AND password=${password}`
  checkLogin(sql, res)
})
router.use(adminAuth);
// 得到类别名称和编号
router.post("/getTypeInfo", function(req, res, next) {
  let sql = `SELECT * FROM type`
  getTypeInfo(sql, res)
})
// 添加文章
router.post("/addArticle", function(req, res, next) {
  let params = req.body.dataProps
  let sql = `INSERT INTO article(type_id, title, article_content, introduce, addTime, view_count) VALUES(${params.type_id}, '${params.title}', '${params.article_content}', '${params.introduce}', '${params.addTime}', ${params.view_count})`
  addArticle(sql, res)
})
// 修改文章
router.post("/updateArticle", function(req, res, next) {
  let params = req.body.dataProps
  let sql = `UPDATE article(type_id, title, article_content, introduce, addTime, view_count) VALUES(${params.type_id}, '${params.title}', '${params.article_content}', '${params.introduce}', '${params.addTime}', ${params.view_count})`
  updateArticle(sql, res)
})
module.exports = router;
