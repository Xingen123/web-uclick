<template>	
	<div class="flow">
		<head-er></head-er>
		<flow-nav ></flow-nav>
		<router-view class="content" ></router-view>
		<phone-ui ></phone-ui>	
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
    height:100%;
    position:fixed;
    left:0px;
    padding:50px;
    padding-top: 80px;
    padding-left:300px;
}
.phone{
	position: fixed;
	top: 20px;
	right: 200px;
}
</style>