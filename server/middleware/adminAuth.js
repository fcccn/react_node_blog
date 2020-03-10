/**
 * @name checklogin
 * @description 检查用户是否登录的中间件
 * @author postbird
 */
const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
  if (req.get("Authorization")) {
    next()
  } else {
    let resultSuccess = {}
    resultSuccess.error = 1
    resultSuccess.message = '没有登录'
    res.json(resultSuccess)
  }
}