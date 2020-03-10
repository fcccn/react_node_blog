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