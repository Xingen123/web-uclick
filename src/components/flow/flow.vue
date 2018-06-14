<template>	
	<div class="flow">
		<head-er class="headnav"></head-er>
		<flow-nav ></flow-nav>
		<router-view class="content" ></router-view>
		<phone-ui class="ph-none"></phone-ui>	
	</div>
</template>
<script>
	import Flownav from "@/components/flow/flownav/flownav"
	import Header from "@/components/head/head"
	import Phone from "@/components/index/calendar/phone"
	export default{
		components:{
			"flow-nav":Flownav,
			"head-er":Header,
			"phone-ui":Phone
		},
		data(){
			return{

			}
		},
		props: {},
		watch:{

		},
		methods:{
		 // index(){
			//   var _this=this
		 //      let param = new FormData();
		 //      var tokenone =sessionStorage.getItem('encryptToken');
			//   console.log(tokenone)
			//   param.append('token',tokenone);  
			//   this.$ajax.post('create/date',param).then(function (response) {
			//   	console.log(response)
			//   	//存放登录的token
			//   	if (response.data.complete=="SUCCESS") {			  		
			//   		 _this.$message('开始创建您的体验')
			//   	}else{
			//   		// _this.$message('密码错误')
			//   	}
			//   }).catch(function (error) {
			//       console.log(error);
			//   });
			// }
		},
		computed:{

		},
		created () {
			// this.index()
		},
		mounted () {},
	  	destroyed () {}
	} 
</script>
<style scoped>
.flow{
	width: 100%;
}
.content{
    width:100%;
    /*height:100%;*/
    /*position:fixed;*/
    /*left:0px;*/
    padding:50px;
    padding-top: 80px;
    padding-left:300px;
}
.phone{
	position: fixed;
	top: 20px;
	right: 200px;
}

@media screen and (max-width: 1400px) {
    .ph-none{
		display: none
	}
}
@media screen and (max-width: 600px) {
    .content{
    	width: 90% !important;	
    	margin: 0 auto;
    	margin-top: 61px !important;	 
		padding:0px !important;	 
	}
	.headnav{
		display: none;
	}
}
.headnav{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
}
</style>