/**
 * axios 拦截器
 */
 import md5 from 'js-md5';
const config = require('../config')
import axios from 'axios'
import { Loading } from 'element-ui'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = config.dev.env.API_ROOT
   // console.log("开发环境")
} else {
  axios.defaults.baseURL = config.build.env.API_ROOT
 // console.log("生产环境")

}



// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers = {'Content-Type': 'multipart/form-data'}

// axios.defaults.timeout = 9000

// http请求拦截器
let loadinginstace

axios.interceptors.request.use(config => {

let httpItem = ["sort/webRecommendPicture","user/sendSMSUpdate"]


if (httpItem.indexOf(config.url) == -1) {
loadinginstace = Loading.service({ fullscreen: true ,text:"loading..."})

}
	

 return config;
}, error => {

 loadinginstace.close()
 Message.error({
 message: '加载超时'
 })
 return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
 loadinginstace.close()
	
 return data
}, error => {

 loadinginstace.close()
 Message.error({
 message: '加载失败'
 })
 return Promise.reject(error)
})
 
export default axios
