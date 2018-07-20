// vuex 
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)



var state = {
  isBg:false,     //初始时候给一个 isLogin=0 表示用户未登录
  value:0,
  ischild:false
};

const mutations = {
 		onOff(state){
            state.isBg = !state.isBg;
            if (!state.isBg) {
            	state.value=0
            }
        }

};
 // 下面这个相当关键了，所有模块，记住是所有，注册才能使用
 export default new Vuex.Store({
    state,
    mutations
 })
