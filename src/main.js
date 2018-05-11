//                       .::::.
//                     .::::::::.
//                    :::::::::::
//                 ..:::::::::::'
//              '::::::::::::'
//                .::::::::::
//           '::::::::::::::..
//                ..::::::::::::.
//              ``::::::::::::::::
//               ::::``:::::::::'        .:::.
//              ::::'   ':::::'       .::::::::.
//            .::::'      ::::     .:::::::'::::.
//           .:::'       :::::  .:::::::::' ':::::.
//          .::'        :::::.:::::::::'      ':::::.
//         .::'         ::::::::::::::'         ``::::.
//     ...:::           ::::::::::::'              ``::.
//    ```` ':.          ':::::::::'                  ::::..
//                       '.:::::'                    ':'````..

import Vuex from 'vuex'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import http from './http'
import router from './router'
import store from './store/store'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueLazyLoad,{
    error:'./static/loading.gif',
    loading:'./static/loading.gif'
})
Vue.prototype.$ajax = axios
Vue.config.productionTip = false
require('./assets/reset.css')
//登录验证
router.beforeEach((to, from, next) => {    
	//to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
	if(to.path === '/login')  {
	  next()  
	}  
	// 如果即将进入登录路由，则直接放行
	else {     
	//进入的不是登录路由
		if(to.meta.requiresAuth && !sessionStorage.getItem('encryptToken')) {
			next({ path: '/login' })
		}else { 
			next() //如果不需要登录验证，或者已经登录成功，则直接放行
		}
	}  
	
})  
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
new Vue({
  el: '#app',
  http,
  router,
  store,
  components: { App },
  template: '<App/>'
})


