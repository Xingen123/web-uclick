<template>	
	<div class="per">
		<div style="font-size:28px;">个人资料</div>
		<div style="width:100%;height:200px;border:1px solid #DCDFE6;margin-top:10px;">
			<p style="border-bottom:1px solid #DCDFE6;text-align:right;padding-right:15px;color:#409EFF;cursor:pointer;" @click="myself">编辑</p>
			<div style="padding:20px;">
				<div style="margin-top:5px;"><span style="width:100px;display:inline-block;">姓名</span ><span v-text="name"></span></div>
				<div style="margin-top:5px;"><span style="width:100px;display:inline-block;">手机号</span><span v-text="phone"></span></div>
				<div style="margin-top:5px;"><span style="width:100px;display:inline-block;">身份验证</span><span v-text="sfz"></span></div>
			<!-- 	<div>希望通过体验传递什么</div>
				<div style="text-indent:2em;margin-top:5px;height:50px;position:relative;overflow-x:auto;width:100%;" v-text="title"> -->
					<!-- <span style="float:left;width:50px;" v-text="title"></span><span style="font-size:20px;float:left;width:20%;text-align:left;">......</span> -->
				</div>

			</div>
		</div>
	</div>
</template>
<script>

	export default{
		components:{
		},
		data(){
			return{
				phone:"",
				name:"",
				title:"",
				sfz:""
			}
		},
		props: {},
		watch:{

		},
		methods:{
			//用户资料获取
			personage(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.name=response.data.name
			  		_this.phone=response.data.phone
			  		_this.title=response.data.title
			  		if (response.data.cardFront==null && response.data.cardBack==null) {
			  		  	_this.sfz="未验证"
			  		}else{
			  			_this.sfz="已验证"
			  		}
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			myself(){
				this.$router.push({
		        path: '/self'
		      })
			}	
		},
		computed:{

		},
		created () {},
		mounted () {
			this.personage()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.per{
		position: absolute;
	    top: 80px;
		left:10%;
		width:30%;
		height: 250px;
	}
</style>