<template>	
	<div class="index">
		<head-er class="header_index"></head-er>
		<div class="smallbox">
			<div class="title">
				<div class="text">
					<div style="font-size:25px;">欢迎来到Blueglass！</div>
					<p>点击按钮编辑您的体验信息，祝您在体验中交到好友！</p>
				</div>
				<el-button type="primary" class="newidea" @click="index">新增体验</el-button>
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
.header_index{
	position: fixed;
	top: 0;
	z-index: 10;
}
	@media screen and (max-width:600px) {

	    .newidea{
	    	float: none;
			clear: both;			
			margin: 0 auto;
			
	    }
	    	.smallbox{
     margin-top: 0px !important; 
	}
.title{
	text-align: center;
	justify-content: center;
	    width: 90% !important; 
     margin-top: 0px !important; 
	}
	}
</style>