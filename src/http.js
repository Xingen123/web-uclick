/**
 * axios 拦截器
 */
 import md5 from 'js-md5';
const config = require('../config')
import axios from 'axios'
import { Loading } from 'element-ui'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = config.dev.env.API_ROOT
   console.log("开发环境")
} else {
  axios.defaults.baseURL = config.build.env.API_ROOT
 console.log("生产环境")

}

// axios 配置
// axios.defaults.baseURL = 'http://192.168.199.240:8080/clicks/diy'
// axios.defaults.baseURL = 'http://wechat.clicksdiy.com/clicks/diy'

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers = {'Content-Type': 'multipart/form-data'}
axios.defaults.timeout = 9000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
 // element ui Loading方法
 loadinginstace = Loading.service({ fullscreen: true ,text:"loading..."})
// if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `token ${store.state.token}`;
//         }
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
// http request 拦截器
// axios.interceptors.request.use(
//   config => {
// //     if (store.state.token){
// //       config.headers.Authorization = 'token ${store.state.token}';
// //     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });

// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
    // if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 401 清除token信息并跳转到登录页面
//           store.commit(types.LOGOUT);
//           router.replace({
//             path: 'login',
//             query: {redirect: router.currentRoute.fullPath}
//           })
//       }
//     }
//     // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    // return Promise.reject(error.response.data)
  // });

// export default axios
