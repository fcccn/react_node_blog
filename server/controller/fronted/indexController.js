const { query } = require('../../db/mysql')
const getArticleList = (sql, res) => {
  return query(sql, function(err, rows){
      if (err){
          res.send(err)
      } else {
          let resultSuccess = {}
          resultSuccess.error = 0
          resultSuccess.message = '文章首页列表 请求成功'
          resultSuccess.results = rows
          res.json(resultSuccess)
      }
  })
}
const getArticleById = (sql, res) => {
  return query(sql, function(err, rows){
      if (err){
          res.send(err)
      } else {
          let resultSuccess = {}
          resultSuccess.error = 0
          resultSuccess.message = '文章详细页面 请求成功'
          resultSuccess.results = rows
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
const getListById = (sql, res) => {
    return query(sql, function(err, rows){
        if (err){
            res.send(err)
        } else {
            let resultSuccess = {}
            resultSuccess.error = 0
            resultSuccess.message = '文章分类列表 请求成功'
            resultSuccess.results = rows
            res.json(resultSuccess)
        }
    })
  }
module.exports = {
  getArticleList,
  getArticleById,
  getTypeInfo,
  getListById
}
