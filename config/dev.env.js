'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//开发api
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: 'http://101.200.156.70:9086/webclick'  //测试服
  // 'http://wb.clicksdiy.com/webclick'   //正式服
  // 'http://101.200.156.70:9086/webclick'   //测试服
  // API_ROOT: 'http://192.168.1.22:9086/webclick'  //本地
  // 
  
})
