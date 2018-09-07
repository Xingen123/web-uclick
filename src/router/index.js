import Vue from 'vue'
import Router from 'vue-router'

//登录注册
const Show = resolve => require(['@/components/login/show'], resolve)
const Login = resolve => require(['@/components/login/login'], resolve)
const Register = resolve => require(['@/components/login/register'], resolve)
const Reset = resolve => require(['@/components/login/reset'], resolve)
const Resetpsw = resolve => require(['@/components/login/resetpsw'], resolve)
const Time = resolve => require(['@/components/login/time'], resolve)
const Perfect = resolve => require(['@/components/login/perfect'], resolve)
const Gohome = resolve => require(['@/components/login/gohome'], resolve)
const Deal = resolve => require(['@/components/login/deal'], resolve)
//主页
const Index = resolve => require(['@/components/index/index'], resolve)
const Calendar = resolve => require(['@/components/index/calendar/calendar'], resolve)
const Calendartwo = resolve => require(['@/components/index/calendar/Calendartwo'], resolve)

//问题

const Question = resolve => require(['@/components/question/question'], resolve)
//个人
const Home = resolve => require(['@/components/home/home'], resolve)
const Self = resolve => require(['@/components/home/self'], resolve)
const Verification = resolve => require(['@/components/home/verification'], resolve)
//流程
const Flow = resolve => require(['@/components/flow/flow'], resolve)
//步骤

const repertoire = resolve => require(['@/components/flow/flowcontent/repertoire'], resolve)
const About = resolve => require(['@/components/flow/flowcontent/about'], resolve)
const LastTime = resolve => require(['@/components/flow/flowcontent/lastTime'], resolve)
const Cover = resolve => require(['@/components/flow/flowcontent/cover'], resolve)
const Experience = resolve => require(['@/components/flow/flowcontent/experience'], resolve)
const Gather = resolve => require(['@/components/flow/flowcontent/gather'], resolve)
const Mapdepot = resolve => require(['@/components/flow/flowcontent/mapdepot'], resolve)
const Peoplenum = resolve => require(['@/components/flow/flowcontent/peoplenum'], resolve)
const Price = resolve => require(['@/components/flow/flowcontent/price'], resolve)
const Remark = resolve => require(['@/components/flow/flowcontent/remark'], resolve)
const Require = resolve => require(['@/components/flow/flowcontent/require'], resolve)
const Slogan = resolve => require(['@/components/flow/flowcontent/slogan'], resolve)
const Sort = resolve => require(['@/components/flow/flowcontent/sort'], resolve)
const Moment = resolve => require(['@/components/flow/flowcontent/moment'], resolve)
const Thing = resolve => require(['@/components/flow/flowcontent/thing'], resolve)
const What = resolve => require(['@/components/flow/flowcontent/what'], resolve)
const Submit = resolve => require(['@/components/flow/flowcontent/submit'], resolve)
Vue.use(Router)


export default new Router({
  routes: [
  	//重定项
  	{
    	path:"/",
    	redirect:'/show'
    },
    {
      path: '/repertoire',
      component: repertoire,
      meta: {
        title: 'demo'
      }
    },
    //展示
    {
      path: '/show',
      component:Show,
      meta: {
        title: '展示'
      }
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
      path: '/deal',
      component:Deal,
      meta: {
        title: '协议'
      }
    },
    //常见问题 
    {
      path: '/question',
      component:Question,
      meta: {
        title: '常见问题',
        requiresAuth: true
      }
    },
    // 移动端点击登录
    {
      path: '/gohome',
      component: Gohome,
      meta: {
        title: '通往世界的大门'
      }
    },
    {
      path: '/perfect',
      component: Perfect,
      meta: {
        title: '完善个人信息'
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
        title:"截图",
        requiresAuth: true
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
                requiresAuth: true,
                keepAlive: true
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
