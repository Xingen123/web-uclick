import Vue from 'vue'
import Router from 'vue-router'

//登录注册
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import Reset from '@/components/login/reset'
import Resetpsw from '@/components/login/resetpsw'
import Time from '@/components/login/time'

//主页
import Index from '@/components/index/index'
import Calendar from '@/components/index/calendar/calendar'
import Calendartwo from '@/components/index/calendar/Calendartwo'

//个人
import Home from '@/components/home/home'
import Self from '@/components/home/self'
import Verification from '@/components/home/verification'
//流程
import Flow from '@/components/flow/flow'
//步骤
import About from '@/components/flow/flowcontent/about'
import LastTime from '@/components/flow/flowcontent/lastTime'
import Cover from '@/components/flow/flowcontent/cover'
import Experience from '@/components/flow/flowcontent/experience'
import Gather from '@/components/flow/flowcontent/gather'
import Mapdepot from '@/components/flow/flowcontent/mapdepot'
import Peoplenum from '@/components/flow/flowcontent/peoplenum'
import Price from '@/components/flow/flowcontent/price'
import Remark from '@/components/flow/flowcontent/remark'
import Require from '@/components/flow/flowcontent/require'
import Slogan from '@/components/flow/flowcontent/slogan'
import Sort from '@/components/flow/flowcontent/sort'
import Moment from '@/components/flow/flowcontent/moment'
import Thing from '@/components/flow/flowcontent/thing'
import What from '@/components/flow/flowcontent/what'
import Submit from '@/components/flow/flowcontent/submit'
Vue.use(Router)


export default new Router({
  routes: [
  	//重定项
  	{
    	path:"/",
    	redirect:'/login'
    },
     // 登录
	  {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/reset',
      component: Reset,
      meta: {
        title: '重置'
      }
    },
    {
      path: '/resetpsw',
      component: Resetpsw,
      meta: {
        title: '重置密码'
      }
    },
    //主页
    {
      path: '/index',
      component: Index,
      meta: {
        title: '主页',
        requiresAuth: true
      }
    },
    {
      path:"/calendar/:id",
      component:Calendar,
      meta:{
        title:"日历",
        requiresAuth: true
      }
    },
    //截图
    {
      path:"/time",
      component:Time,
      meta:{
        title:"截图"
      }
    },
    {
      path:"/calendartwo",
      component:Calendartwo,
      meta:{
        title:"日历two",
        requiresAuth: true
      }
    },
    //个人中心
    {
      path: '/home',
      component: Home,
      meta: {
        title: '个人中心',
         requiresAuth: true
      }
    },
    {
      path:"/self",
      component:Self,
      meta:{
        title:"编辑个人资料",
        requiresAuth: true
      }
    },
    {
      path:"/verification",
      component:Verification,
      meta:{
        title:"上传身份证",
        requiresAuth: true
      }
    },
    //流程
    {
      path: '/flow',
      component: Flow,
      meta: {
        title: '流程',
        requiresAuth: true
      },
      children:[
            {
              path:"/",
              redirect:'/flow/sort'
            },
            { 
            	path: 'about', 
            	component: About,
              meta: {
                title: '关于您',
                requiresAuth: true
              }
            },
            { 
              path: 'sort', 
              component: Sort,
              meta: {
                  title: '类别',
                  requiresAuth: true
              }
            },
            { 
            	path: 'cover', 
            	component: Cover,
              meta: {
                title: '封面',
                requiresAuth: true
              }
            },
            { 
            	path: 'what', 
            	component: What,
              meta: {
                title: '我们会做些什么？',
                requiresAuth: true
              }  
            },
            { 
            	path: 'thing', 
            	component: Thing,
              meta: {
                title: '体验包括的东西',
                requiresAuth: true
              }
            },
            { 
            	path: 'slogan', 
            	component: Slogan,
              meta: {
                title: '标语',
                requiresAuth: true
              }
            },
            { 
            	path: 'require', 
            	component: Require,
              meta: {
                title: '对参与者的要求',
                requiresAuth: true
              }
            },
            { 
            	path: 'remark', 
            	component: Remark,
              meta: {
                title: '备注',
                requiresAuth: true
              }
            },
            { 
            	path: 'price', 
            	component: Price,
              meta: {
                title: '价格',
                requiresAuth: true
              }
            },
            { 
            	path: 'peoplenum', 
            	component: Peoplenum,
              meta: {
                title: '体验人数',
                requiresAuth: true
              }
            },
            { 
              path: 'lastTime', 
              component: LastTime,
              meta: {
                title: '最后报名时间',
                requiresAuth: true
              }
            },
            {
            	path: 'mapdepot', 
            	component: Mapdepot,
              meta: {
                title: '图库',
                requiresAuth: true
              }
            },
            { 
            	path: 'moment', 
            	component: Moment,
              meta: {
                title: '时间',
                requiresAuth: true
              }
            },
            { 
            	path: 'gather', 
            	component: Gather,
              meta: {
                title: '集合地点',
                requiresAuth: true
              }
            },
            { 
            	path: 'experience', 
            	component: Experience,
              meta: {
                title: '体验地点',
                requiresAuth: true
              }
            },
            { 
              path: 'submit', 
              component: Submit,
              meta: {
                title: '提交',
                requiresAuth: true
              }
            }
      ]
    }
  ]
})
