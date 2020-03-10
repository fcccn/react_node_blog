const { query } = require('../../db/mysql')
const jwt = require('jsonwebtoken')
const secret = 'AllenFu'
const checkLogin = (sql, res) => {
  return query(sql, function(err, rows){
    console.log(rows)
      let getId = rows[0].id
      if (err){
          res.send(err)
      } else {
        let token = jwt.sign({id:  getId}, secret)
        let resultSuccess = {}
        resultSuccess.error = 0
        resultSuccess.message = '登录成功'
        resultSuccess.results = {token}
        res.json(resultSuccess)
      }
  })
}
const getTypeInfo = (sql, res) => {
  return query(sql, function(err, rows){
      if (err){
          res.send(err)
      } else {
          let resultSuccess = {}
          resultSuccess.error = 0
          resultSuccess.message = '文章类别和编号 请求成功'
          resultSuccess.results = rows
          res.json(resultSuccess)
      }
  })
}
const addArticle = (sql, res) => {
  return query(sql, function(err, rows){
      if (err){
          res.send(err)
      } else {
          let resultSuccess = {}
          resultSuccess.error = 0
          resultSuccess.message = '文章保存 请求成功'
          resultSuccess.results = {}
          res.json(resultSuccess)
      }
  })
}
const updateArticle = (sql, res) => {
  return query(sql, function(err, rows){
    if (err) {
      res.send(err)
    } else {
      let resultSuccess = {}
      resultSuccess.error = 0
      resultSuccess.message = '文章更新 请求成功'
      resultSuccess.results = {}
      res.json(resultSuccess)
    }
  })
}
const getArticleList = (sql, res) => {
  return query(sql, function(err, rows){
    if (err) {
      res.send(err)
    } else {
      let resultSuccess = {}
      resultSuccess.error = 0
      resultSuccess.message = '文章列表 请求成功'
      resultSuccess.results = rows
      res.json(resultSuccess)
    }
  })
}
module.exports = {
  checkLogin,
  getTypeInfo,
  addArticle,
  updateArticle,
  getArticleList
}