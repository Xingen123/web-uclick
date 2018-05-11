<template>	
	<div class="index">
		<head-er></head-er>
		<div class="smallbox">
			<div class="title">
				<div class="text">
					<div style="font-size:25px;">欢迎来到Blueglass！</div>
					<p>点击按钮编辑您的体验信息，祝您在体验中交到好友！</p>
				</div>
				<el-button type="primary" class="newidea" @click="index">编辑体验
</el-button>
			</div>
		</div>
		<pro-ject></pro-ject>
	</div>
</template>
<script>
	import Header from "@/components/head/head"
	import Project from "@/components/index/project/project"
	export default{
		components:{
			"head-er":Header,
			"pro-ject":Project
		},
		data(){
			return{
			}
		},
		props: {},
		watch:{

		},
		methods:{
			index(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone); 
			  this.$ajax.post('create/date',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
				  	let recommendId = response.data.recommendId;
				  	let detailId = response.data.recommendDetailId;
				  	sessionStorage.setItem('detailId',detailId)
				  	sessionStorage.setItem('recommendId',recommendId)
				  	_this.$router.push({
				        path: '/flow'
				    })
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			}
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
	.index{
		width: 100%;
	}
	.smallbox{
		margin-top: 60px;
	}
	.title{
		width: 60%;
		padding-top: 70px;
		margin: 0 auto;
		overflow: hidden;
	}
	.title>.text>p{
		line-height: 40px;
	}
	.text{
		float: left;
	}
	.newidea{
		width: 150px;
		height:50px;
		font-size: 20px;
		float: right;
	}
</style>