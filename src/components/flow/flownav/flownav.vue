<template>  
    <div class="flownav">
        <ul class="box">
            <li class="frist">
                <div class="fristdiv" style="font-size:28px;">
                    提交体验
                </div>
            </li>
<!--             <li>
                <div class="name">基本信息</div>
            </li> -->
            <li>
                <router-link to="/flow/sort">
                    <div>
                        <span>类别</span>
                        <span v-show="one" class="right"></span>
                    </div>
                </router-link>
            </li>
<!--             <li>
                <div class="name">黄淘淘是只鸭子</div>
            </li> -->
            <li>
                <router-link to="/flow/cover">
                    <div>
                        <span>封面与标题</span>
                        <span v-show="two" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/slogan">
                    <div>
                        <span>副标题</span>
                        <span v-show="five" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/mapdepot">
                    <div>
                        <span>图库</span>
                        <span v-show="three" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/about">
                    <div>
                        <span>介绍您自己</span>
                        <span v-show="tenOne" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/what">
                    <div>
                        <span>体验内容</span>
                        <span v-show="six" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/moment">
                    <div>
                        <span>意向时间</span>
                        <span v-show="four" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/thing">
                    <div>
                        <span>体验包含的东西</span>
                        <span v-show="nine" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/gather">
                    <div>
                        <span>集合地点</span>
                        <span v-show="seven" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/experience">
                    <div>
                        <span>体验地点</span>
                        <span v-show="eight" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/require">
                    <div>
                        <span>对体验者的要求</span>
                        <span v-show="tenTwo" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/peoplenum">
                    <div>
                        <span>体验人数</span>
                        <span v-show="tenThree" class="right"></span>
                    </div>
                </router-link>
            </li> 
            <li>
                <router-link to="/flow/lastTime">
                    <div>
                        <span>最后报名时间</span>
                        <span v-show="tenFive"  class="right"></span>
                    </div>
                </router-link>
            </li>                         
            <li>
                <router-link to="/flow/remark">
                    <div>
                        <span>体验前的叮嘱</span>
                        <span v-show="ten" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li>
                <router-link to="/flow/price">
                    <div>
                        <span>价格</span>
                        <span v-show="tenFour" class="right"></span>
                    </div>
                </router-link>
            </li>
            <li style="margin-bottom:50px;">
                <router-link to="/flow/submit">
                    <div>
                        <span>提交</span>
                    </div>
                </router-link>
            </li>          
             <li>
               
            </li>
        </ul>
    </div>
</template>
<script>
import global from '@/components/flow/global/global'
    export default{
        components:{
        },
        data(){
            return{
              one:false,
              two:false,
              three:false,
              four:false,
              five:false,
              six:false,
              seven:false,
              eight:false,
              nine:false,
              ten:false,
              tenOne:false,
              tenTwo:false,
              tenThree:false,
              tenFour:false,
              tenFive:false
            }
        },
        props: { },
        watch:{

        },
        methods:{
            index (){
                this.$router.push({
                path: '/index'
                })
            },
            allState(){
              var _this=this
              let param = new FormData();
              var tokenone =sessionStorage.getItem('encryptToken');
              param.append('token',tokenone);
              var recommend =sessionStorage.getItem('recommendId');
              param.append('id',recommend);  
              this.$ajax.post('query/webConvoySelected',param).then(function (response) {

                if (response.data.complete=="SUCCESS"){
                    _this.one=response.data.completeAmount[0]
                    _this.two=response.data.completeAmount[1] 
                    _this.three=response.data.completeAmount[2] 
                    _this.four=response.data.completeAmount[3] 
                    _this.five=response.data.completeAmount[4] 
                    _this.six=response.data.completeAmount[5] 
                    _this.seven=response.data.completeAmount[6] 
                    _this.eight=response.data.completeAmount[7] 
                    _this.nine=response.data.completeAmount[8] 
                    _this.ten=response.data.completeAmount[9]     
                    _this.tenOne=response.data.completeAmount[10] 
                    _this.tenTwo=response.data.completeAmount[11] 
                    _this.tenThree=response.data.completeAmount[12] 
                    _this.tenFour=response.data.completeAmount[13]     
                    _this.tenFive=response.data.completeAmount[14]   
                }
              }).catch(function (error) {
                  console.log(error);
              });
            }
        },
        computed:{

        },
        created () {},
        mounted () {
            var _this =this
            global.$on("tabone",function(one) {
               _this.one=one
            })
            global.$on("tabtwo",function(two) {
               _this.two=two
            })
            global.$on("tabthree",function(three) {
               _this.three=three
            })
            global.$on("tabfour",function(four) {
               _this.four=four
            })
            global.$on("tabfive",function(five) {
               _this.five=five
            })
            global.$on("tabfive",function(five) {
               _this.five=five
            })
            global.$on("tabsix",function(six) {
               _this.six=six
            })
            global.$on("tabseven",function(seven) {
               _this.seven=seven
            })
            global.$on("tabeight",function(eight) {
               _this.eight=eight
            })
            global.$on("tabnine",function(nine) {
               _this.nine=nine
            })
            global.$on("tabten",function(ten) {
               _this.ten=ten
            })
            global.$on("tabtenO",function(tenOne) {
               _this.tenOne=tenOne
            })
            global.$on("tabtenT",function(tenTwo) {
               _this.tenTwo=tenTwo
            })
            global.$on("tabtenTR",function(tenThree) {
               _this.tenThree=tenThree
            })
            global.$on("tabtenF",function(tenFour) {
               _this.tenFour=tenFour
            })
            global.$on("tabtenFive",function(tenFive) {
               _this.tenFive=tenFive
            })
           this.allState()
        },
        destroyed () {}
    } 
</script>
<style scoped>
    .box{
        animation-duration: 0.5s;
        animation-name: key;
        animation-fill-mode: both;
    }
    @keyframes key{
        0% {
            -webkit-transform: translate3d(-100%,0,0);
            transform: translate3d(-100%,0,0);
            visibility: visible;
            }
            100% {
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
    }
    .box{
        width:230px;
        height:100%;
        position: fixed;
        left: 0;
        z-index: 1;
        top:60px;
        overflow:scroll;
        overflow-x:hidden;
        padding-left: 40px;
    }


    .right{
        width:25px;
        height:25px;
        margin-right: 15px;
        display: block;
        float: right;
        background: url(../img/right.png) no-repeat;
        background-size: 100% 100%;
    }
    .content{
        width:1000px;
        height:100%;
        position:fixed;
        left:270px;
        border:1px solid red;
        float: left;
        padding:20px;
    }
    .box>li{
        height: 50px;
    }
    .box>li>a{
        padding-top: 10px;
        display: block;
        color: #999999;
        text-decoration: none;
    }
    .box>li>a:hover{
        color:rgb(0,159,255);
    }
    .frist{
        width: 100%;
        height:50px;
        margin: 20px auto;
        margin-left: -5px;
    }
/*    .fristdiv{
        cursor:pointer;
        width: 80%;
        height: 50px;
        margin:0 auto;
        background: url(../img/logo.png) no-repeat;
        background-size: 80% 50px;
    }*/
    .name{
        font-size: 20px;
        color: #BBBBBB;
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-left: -20px;
    }
    .router-link-active>div>span{
        color: black;
        font-weight: bold;
    }
</style>