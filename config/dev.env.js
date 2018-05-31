'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//开发api
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: 'http://101.200.156.70:9086/webclick'   //测试
  // API_ROOT: 'http://192.168.1.111:9086/webclick'  //本地
  // API_ROOT: 'http://wb.clicksdiy.com/webclick'   //线上
  
})
