<template>  
    <div class="flownav">
        <div class="listfather"  >
<!--             <div class="list" @click="box=true,hasError=true,isActive=false">
                
            </div> -->
            
            <div id="list" @click="list_on"> 
                <div class="app fris" v-bind:class="{ frist_: listbox.isfrist_, frist_to: listbox.isfrist_to }"></div>
                <div class="app play" v-bind:class="{ play_: listbox.isplay_, play_to: listbox.isplay_to }"></div>
                <div class="app two"  v-bind:class="{ two_: listbox.istwo_, two_to: listbox.istwo_to }"></div>
            </div>    


            <div class="gohome" @click="gohome">
                
            </div>
        </div>
        <transition name="bounce">
            <ul class='box' v-show="box"  >
                <li class="frist">
                    <div class="fristdiv" style="font-size:28px;">
                        提交体验
                    </div>
                </li>

                <li>
                    <router-link to="/flow/sort">
                        <div>
                            <span>类别</span>
                            <span v-show="one" class="right"></span>
                        </div>
                    </router-link>
                </li>

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
                            <span v-show="three" class="right"></span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/flow/mapdepot">
                        <div>
                            <span>视频和图片</span>
                            <span v-show="four" class="right"></span>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/flow/about">
                        <div>
                            <span>介绍您自己</span>
                            <span v-show="five" class="right"></span>
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
              <!--   <li>
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
                </li> -->
                <li>
                    <router-link to="/flow/gather">
                        <div>
                            <span>体验地点</span>
                            <span v-show="seven" class="right"></span>
                        </div>
                    </router-link>
                </li>
                <!-- <li>
                    <router-link to="/flow/experience">
                        <div>
                            <span>体验地点</span>
                            <span v-show="eight" class="right"></span>
                        </div>
                    </router-link>
                </li> -->
                <li>
                    <router-link to="/flow/require">
                        <div>
                            <span>对体验者的需求</span>
                            <span v-show="eight" class="right"></span>
                        </div>
                    </router-link>
                </li>
               <!--  <li>
                    <router-link to="/flow/peoplenum">
                        <div>
                            <span>体验人数</span>
                            <span v-show="tenThree" class="right"></span>
                        </div>
                    </router-link>
                </li>  -->
                <li>
                    <router-link to="/flow/lastTime">
                        <div>
                            <span>最后报名时间</span>
                            <span v-show="nine"  class="right"></span>
                        </div>
                    </router-link>
                </li>                         
               <!--  <li>
                    <router-link to="/flow/remark">
                        <div>
                            <span>体验包含的独特东西</span>
                            <span v-show="ten" class="right"></span>
                        </div>
                    </router-link>
                </li> -->
                <li>
                    <router-link to="/flow/price">
                        <div>
                            <span>价格</span>
                            <span v-show="ten" class="right"></span>
                        </div>
                    </router-link>
                </li>
                <li v-if="status=='INITIALIZATION'" style="margin-bottom:50px;">
                    <router-link to="/flow/submit">
                        <div>
                            <span>提交</span>
                        </div>
                    </router-link>
                </li>          
                <!-- <div class="back"></div> -->
                <!-- <li >
                  
                </li>   -->
            </ul>
        </transition>

    </div>
</template>
<script>
import global from '@/components/flow/global/global'
    export default{
        components:{
        },
        data(){
            return{
                status:"",
                listbox:{
                    isfrist_:false,
                    isplay_:false,
                    istwo_:false,
                    isfrist_to:false,
                    isplay_to:false,
                    istwo_to:false,
                },    
                isActive:false,
                hasError:false,
           
              box:false,
              one:false,
              two:false,
              three:false,
              four:false,
              five:false,
              six:false,
              seven:false,
              eight:false,
              nine:false,
              ten:false
              // tenOne:false,
              // tenTwo:false,
              // tenThree:false,
              // tenFour:false,
              // tenFive:false
            }
        },
        props: { },
        watch:{
            '$route' (to, from) {  
                let width = document.body.clientWidth;
                if(width<600){
                    this.box=false
                    this.listbox.isplay_to=true
                    this.listbox.istwo_to=true
                    this.listbox.isfrist_to=true
                    this.listbox.isplay_=false
                    this.listbox.istwo_=false
                    this.listbox.isfrist_=false
                }   
            }  
        },
        methods:{
            list_on(){
                if (this.box==true) {
                    this.listbox.isplay_to=true
                    this.listbox.istwo_to=true
                    this.listbox.isfrist_to=true
                    this.listbox.isplay_=false
                    this.listbox.istwo_=false
                    this.listbox.isfrist_=false
                    this.box=false
                }else{
                    this.box=true
                    this.listbox.isplay_to=false
                    this.listbox.istwo_to=false
                    this.listbox.isfrist_to=false
                    this.listbox.isplay_=true
                    this.listbox.istwo_=true
                    this.listbox.isfrist_=true
                }
            },

            gohome(){
                this.$router.push({
                    path: '/index'
                })
            },
            clientWidth(){
                let width = document.body.clientWidth;
                if(width>600){
                    this.box=true
                }
            },
            allState(){
              var _this=this
              let param = new FormData();
              var tokenone =sessionStorage.getItem('encryptToken');
              
              var recommend =sessionStorage.getItem('recommendId');


              param.append('id',recommend); 
              param.append('token',tokenone);

              this.$ajax.post('query/webConvoySelected',param).then(function (response) {
               
                if (response.data.complete=="SUCCESS"){
                    sessionStorage.setItem('status',response.data.status)
                    _this.status = response.data.status
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
                    // _this.tenOne=response.data.completeAmount[10] 
                    // _this.tenTwo=response.data.completeAmount[11] 
                    // _this.tenThree=response.data.completeAmount[12] 
                    // _this.tenFour=response.data.completeAmount[13]     
                    // _this.tenFive=response.data.completeAmount[14]   
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
            // global.$on("tabtenO",function(tenOne) {
            //    _this.tenOne=tenOne
            // })
            // global.$on("tabtenT",function(tenTwo) {
            //    _this.tenTwo=tenTwo
            // })
            // global.$on("tabtenTR",function(tenThree) {
            //    _this.tenThree=tenThree
            // })
            // global.$on("tabtenF",function(tenFour) {
            //    _this.tenFour=tenFour
            // })
            // global.$on("tabtenFive",function(tenFive) {
            //    _this.tenFive=tenFive
            // })
           this.allState()
           this.clientWidth()
        },
        destroyed () {}
    } 
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
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
        z-index:9;
        top:61px;
        overflow:scroll;
        overflow-x:hidden;
        padding-left: 40px;
        background: white;
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
    .name{
        font-size: 20px;
        color: #BBBBBB;
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-left: -20px;
    }
    .router-link-active>div>span{
        /*width: 20px;*/
        color: black;
        font-weight: bold;
    }
    @media screen and (max-width: 600px) {
        .right{
            width: 20px;
            height: 20px;
            position:absolute;
            right: 0;
            left: 0;
            margin: 0 auto;
        }
        .box{
            width: 100%;
            top: 51px !important;
            padding-left:0px !important;
            overflow-y: hidden;
        }
        .box>li{
            float: left;
            width: 25%;
            /*padding: 5px;*/
            border: 1px solid gray;
            margin-left: 20px;
            margin-top: 10px;
            font-size: 10px;


            text-align: center;
        }
        .frist{
            width: 100% !important;
            text-align:left !important;
            border: none !important;
            margin: 0 ;
            margin-top: 30px !important;
        }
        .box>li>a>div{
            position: relative;
        }
       
        .back{
    clear: both;
    position: relative;
    bottom:20px;
    left: 0;
    right: 0;
    z-index: 5;
    margin: 0 auto;
    width: 30px !important;
    height: 30px !important;
    background: url(../img/back.png) no-repeat;
    background-size: 100% 100%;
    border: none !important;
}
.listfather{
        background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    z-index:4;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #DCDFE6;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px !important;

    display: flex;
    align-items: center;
    justify-content: space-between;
}
#list{
    height: 30px;
    margin-left: 10px;
}
.gohome{
    width:35px;
    height: 35px;
    margin-right: 10px;
    background: url(../img/home.png) no-repeat;
    background-size: 100% 100%;
}
}

        .app{
            width:30px;
            height: 3px;
            background-color: black;
            margin-top:5px;   
        }

        @keyframes myfirst{
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(32deg);

            }
        }
        @keyframes myfirst-over{
            from {
                transform: rotate(32deg);
            }
            to {
                transform: rotate(0deg);

            }
        }

        @keyframes myfirst—two{
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(-32deg);

            }
        }
        @keyframes myfirst-fist{
            from {
                transform: rotate(-32deg);
            }
            to {
                transform: rotate(0deg);

            }
        }
        .frist_{
            animation: myfirst .4s;
            animation-fill-mode:forwards;
            transform-origin:0% 50%;
        }
        .play_{
            visibility:hidden;
        }
        .two_{
           animation:myfirst—two  .4s;
           animation-fill-mode:forwards;
           transform-origin:0% 50%;
        }

        .frist_to{
            animation: myfirst-over .4s;
            animation-fill-mode:forwards;
            transform-origin:0% 50%;
        }
        .play_to{
            visibility:visible;
        }
        .two_to{
           animation:myfirst-fist  .4s;
           animation-fill-mode:forwards;
           transform-origin:0% 50%;
        }
</style>