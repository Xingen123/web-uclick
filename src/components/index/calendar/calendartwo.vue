<template>	
	<div class="box">
		<head-er></head-er>
		<phone-ui ></phone-ui>	
	</div>
</template>
<script>
import Header from "@/components/head/head"
import Phone from "@/components/index/calendar/phone"
	export default{
		components:{
			"head-er":Header,
			"phone-ui":Phone
		},
		data(){
			return{
			 
			}
		},
		props: {

		},
		watch:{

		},
		methods:{
		 
             
		},
		computed:{

		},
		created () {
			
		},
		mounted () {			
		},
	  	destroyed () {}
	} 
</script>
<style scoped>

.small{	
	width:340px;
	height: 550px;
	border:1px solid #E4E7ED;
	margin:0 auto;
	overflow:auto
} 
.active{
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 20px;
} 
.BMap_Marker>div>img {width:50px;position:relative;top:60px;left:50%;}
/*.el-carousel__container{
	height: 200px !important;
}*/
/*  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }*/
</style>
