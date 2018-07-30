<template>
    <div >
      <div @click="onn=!onn">dsads</div>
     <div class="swiper-container" v-show="onn">
    <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
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
         onn:false
        }
    },
    methods: {

    
    },

    mounted () {
        var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  }) 
    }
}
</script>
<style>
.swiper-container {
    width: 600px;
    height: 300px;
}  
</style>