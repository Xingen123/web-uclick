<template>
<div>
  <div @click="popup=!popup" style="cursor:pointer;font-size:20px;margin-top:25px;color:#00A0E8;">
   <i class="icon"></i> <span class="hint">{{hint}}</span>
  </div>
  <div class="popup" v-show="popup" @click="aaa">
    <div class="swiper-container swiper-no-swiping" :style="{height:height+'px'}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in column">
                <img v-if="item.img"  :src="item.img" alt="" :style="{width:imgwidth+'px'}">
                <video v-if="item.src" controls="controls" :src="item.src"></video>
                <div :style="{paddingTop:top+'px',paddingLeft:left+'px'}">
                  <div style="font-size:25px;color:#484848;">建议</div>
                  <div style="font-size:16px;margin-top:30px;line-height:35px; color:#484848;">{{item.content}}</div>
                  <div style="font-size:16px;margin-top:10px; color:#484848;" v-if="item.text">{{item.text}}</div>
                  <div style="font-size:16px;margin-top:10px; color:#484848;" v-if="item.content1">{{item.content1}}</div>
                  <div style="font-size:16px;margin-top:10px; color:#484848;" v-if="item.content2">{{item.content2}}</div>
                  <div style="font-size:16px;margin-top:10px; color:#484848;" v-if="item.content3">{{item.content3}}</div>
                  <div style="font-size:16px;margin-top:10px; color:#484848;" v-if="item.content4">{{item.content4}}</div>
                  <div style="font-size:16px;margin-top:10px; color:#484848;" v-if="item.content5">{{item.content5}}</div>  
                  <div style="font-size:16px;margin-top:10px; color:#484848;" v-if="item.content6">{{item.content6}}</div>  
                 

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
    top:{
      type:Number,
      default: 80
    },
    left:{
      type:Number,
      default: 60
    },
    hint:{
      type:String,
      default: '' 
    },
    column:{
      type:Array,
      default: '' 
    },
    height:{
      type:Number,
      default: 500
    },
    imgwidth:{
      type:Number,
      default: 375
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
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
       
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
  .swiper-slide>img{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .swiper-slide>img,.swiper-slide>video{
    /*width:375px;*/
    /*height: 100%;*/
    float: left;
  }
  .swiper-slide>video{
        height: 100%;
        object-fit: cover;
  }
  .swiper-slide>div{
    width: 460px;

    float: left;

  }
  .hint:hover{
    color: rgb(0,162,232);
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
