<template>	
	<div class="submit">
		<div style="font-size: 28px;">别粗心，提交体验之前最后再检查一遍吧！</div>

		 <el-button type="primary" style="margin-top:200px;width:150px;" :disabled="disabled" @click="next">提交</el-button>
	</div>
</template>
<script>
	export default{
		components:{
		},
		data(){
			return{
				disabled:true
			}
		},
		props: {},
		watch:{

		},
		methods:{
			next(){			
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var recommend =sessionStorage.getItem('recommendId');
			  param.append('id',recommend);
			  param.append('examineType',true);  
			  this.$ajax.post('create/webRecommend',param).then(function (response) {		
			  	if (response.data.complete=="SUCCESS") {
			  		//判断用户是否填写完14个input
			  		_this.$notify({
		          title: '提交成功',
		          message: '请等待审核',
		          duration: 2000,
		          type: 'success'
			        });
					_this.$router.push({
			        	  path: '/index'
			      	})
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })			
			},
			submit(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var recommend =sessionStorage.getItem('recommendId');
			  param.append('id',recommend);  
			  this.$ajax.post('query/webConvoySelected',param).then(function (response) {		
			  	if (response.data.complete=="SUCCESS") {

			  		//判断用户是否填写完14个input
			  		if(response.data.completeStatus==true){
			  			_this.disabled=false
			  		}else{
			  			_this.disabled=true
			  		}
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })
			}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.submit()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	
</style>