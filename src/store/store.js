// vuex 
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)



var state = {
  isLogin:0,     //初始时候给一个 isLogin=0 表示用户未登录
};

const mutations = {
  changeLogin(state,data){
    state.isLogin = data;
  }

};
 // 下面这个相当关键了，所有模块，记住是所有，注册才能使用
 export default new Vuex.Store({
    state,
    mutations
 })
