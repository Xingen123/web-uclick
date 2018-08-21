<template>
<div>
  <div @click="popup=!popup" style="cursor:pointer;font-size:20px;margin-top:25px;color:#00A0E8;">
   <i class="icon"></i><span class="hint">{{hint}}</span>
  </div>
  <div class="popup" v-show="popup" @click="aaa">
    <div class="swiper-container swiper-no-swiping" >
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in column">

                <div class="bgblue">
                  <div>
                    <div style="font-size:25px;">建议</div>
                    <div style="font-size:22px;margin-top:30px;line-height:35px;">{{item.content}}</div>
                    <div style="font-size:16px;margin-top:10px;" >{{item.text}}</div>
                    <div style="font-size:22px;margin-top:30px;line-height:35px;">{{item.content2}}</div>
                    <div style="font-size:16px;margin-top:10px;" >{{item.text2}}</div>
                  </div>
                </div>
                
                <div class="suggest">
                    <div>
                      <img style="width:60px;height:60px;border-radius:30px;" :src="item.img" alt="">
                      <div>
                        <span style="font-size:20px;color:#484848;">{{item.name}}</span><br>
                        <span style="color:#767676;">{{item.profession}}</span>
                      </div>
                    </div>
                    <section style="margin-top:30px;color:#484848;font-size:18px;">
                      <div>{{item.introduce}}</div>
                      <div style="margin-top:30px;">{{item.motto}}</div>
                    </section>
                </div>
            </div>
               
        </div>
        <div class="offon" @click="popup=!popup"></div>
        <!-- 如果需要分页器 -->
        <div v-if="column.length>1" class="swiper-pagination"></div>
        
        <!-- 如果需要导航按钮 -->
        <div v-if="column.length>1" class="swiper-button-prev"></div>
        <div v-if="column.length>1" class="swiper-button-next"></div>
    </div>
  </div>
</div>  
</template>

<script>
import  Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css';
export default {
  components:{
    
  },
  data () {
    return {
        popup:false

    }
  },
  props: {  
    hint:{
      type:String,
      default: '' 
    },
    column:{
      type:Array,
      default: '' 
    }
  },
  methods:{
    aaa(event){
      var el1 = event.currentTarget;
       var el2 = event.target;
      
       if(el1 == el2){
           this.popup=!this.popup
       }  
     
    }
  },
  mounted() {

      let mySwiper = new Swiper ('.swiper-container', {
      // 如果需要分页器
        pagination: '.swiper-pagination',
       paginationType: 'fraction',
        // },
        // navigation: {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // },
        observer:true,/*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/
        observeParents:true
        // 如果需要前进后退按钮

      })  
 
  } 
}
</script>

<style scoped>
  .popup{
    
    width: 100%;
    height: 100%;
    position: fixed;
    background:rgba(0,0,0,0.6);
    top: 0;
    left: 0;
    z-index: 100000000;
  }
  .swiper-container{
    width: 967px;
    height: 500px;
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
    background:white;
    margin: 0 auto;
    border-radius: 5px;
  }
  .icon{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(img/icon.png) no-repeat;
    background-size: 100%;

  }
  .swiper-slide{

    overflow: hidden;
  }
  .bgblue{
    width: 315px;
    height: 100%;
    background-color: rgb(0,162,232);
    color:white;
  }
   .bgblue>div{
    width: 250px;
    text-align: justify;
    padding-top: 20px;
    margin-left:40px;
  }
  .swiper-slide>div{
    
    float: left;

  }

    .swiper-slide>.suggest{
    width: 460px;
    margin: 40px;
    float: left;

  }
   .suggest>div{
    overflow: hidden;
   }
  .suggest>div>img{
    float: left;
   } 
  .suggest>div>div{
    float: left;
    padding-left: 10px;
    padding-top: 10px;
   } 
.swiper-button-prev,.swiper-button-next{
    top: 98% !important;
    width: 20px !important;
    height: 20px !important;
    background-size: 20px 20px !important;
    outline:none;
}
.swiper-button-prev{
   left: 83%  !important;
}
.offon{
  width: 20px;
  height: 20px;
  background: url(img/gb.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 30px;
  right: 20px;
  z-index: 1;
  cursor: pointer;
}
.swiper-pagination-fraction {
    left: 85% !important;
    width: 100px !important;
  }
  .swiper-button-next{
    right: 20px!important;
  }
</style>
