var express = require('express');
var router = express.Router();
const {
  getArticleList,
  getArticleById,
  getTypeInfo,
  getListById
} = require('../../controller/fronted/indexController')
// 文章首页列表
router.get("/getArticleList", function(req, res, next) {
  let sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, article.article_content as article_content, article.addTime as addTime, article.view_count as view_count, type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.Id`
  getArticleList(sql, res)
})
// 文章详细页面
router.post("/getArticleById", function(req, res, next) {
  let id = req.body.id
  let sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, article.article_content as article_content, article.addTime as addTime, article.view_count as view_count, type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id WHERE article.id = ${id}`
  getArticleById(sql, res)
})
// 得到类别名称和编号
router.post("/getTypeInfo", function(req, res, next) {
  let sql = `SELECT * FROM type`
  getTypeInfo(sql, res)
})
// 根据类别ID获得文章列表
router.post("/getListById", function(req, res, next) {
  let id = req.body.id
  let sql = `SELECT article.id as id, article.title as title, article.introduce as introduce, article.article_content as article_content, article.addTime as addTime, article.view_count as view_count, type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.id WHERE type_id = ${id}`
  getListById(sql, res)
})

module.exports = router;
