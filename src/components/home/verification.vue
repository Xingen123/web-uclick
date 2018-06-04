<template>	
	<div class="verr">
		<head-er></head-er>
		<div class="card">
			
			<div style="font-size:28px;">{{msg}}</div>
			<div style="font-size:18px;margin-top:20px;">{{title}}</div>

			<a  class="upload">
				<img v-lazy="front"  style="width:360px;height:240px;"   alt="">
				<span v-show="frText">添加正面身份证照片</span>				
    			<input class="change"  name="file" ref="file" type="file"  accept="image/png,image/gif,image/jpeg" @change="update"/>
			</a>
			
			<a  class="upload uploadtwo" >
				<img v-lazy="reverse"  style="width:360px;height:240px;" alt="">
				<span v-show="reText">添加反面身份证照片</span>				
    			<input class="change"  name="file" ref="file" type="file"  accept="image/png,image/gif,image/jpeg" @change="updat"/>
			</a>
			<div style=" position:absolute;top:500px;margin-top:20px;" v-show="again"><span>重新上传正面照片</span><span style="margin-left:260px;">重新上传反面照片</span></div>
			<div style="position:absolute;top:550px;">
				<el-button  type="primary"  style="display:block; width:150px; margin-top:50px;" :disabled="disabled" @click="next">下一步  ＞</el-button>
			</div>
		</div>
	</div>	
</template>
<script>

import Header from "@/components/head/head"
	export default{
		components:{
			"head-er":Header
		},
		data(){
			return{
				disabled:true,
				frText:true,
				reText:true,
				front:"",
				reverse:"",
				again:false,
				msg:"上传您的身份证照片",
				title:'上传您的身份证（中国）正面照片,确保您的照片不会模糊不清，能够清楚地显示您的脸部。',
				imageUrl: ''
			}
		},
		props: {},
		watch:{

		},
		methods:{
			action(){
				var _this=this
				let param = new FormData();
			      	var tokenone =sessionStorage.getItem('encryptToken');
				  	param.append('token',tokenone);
				  	this.$ajax.post('query/webUser',param).then(function (response) {
					  	if (response.data.complete=="SUCCESS") {
					  			_this.front=response.data.fileServer+"/"+response.data.cardFront
						  		_this.reverse=response.data.fileServer+"/"+response.data.cardBack
					  		if (response.data.cardFront!=null && response.data.cardBack!=null) {
					  			_this.disabled=false
						  		_this.frText=false 
						  		_this.reText=false 
						  		
					  		}else{
					  			_this.frText=true
						  		_this.reText=true
					  		}
					  		
					  	}
					}).catch(function (error) {
					      console.log(error);
					});  		
			},
			update(e){
				var _this=this
			    let file = e.target.files[0];
		        const isLt2M = file.size / 1024 / 1024 < 1;
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 1MB!');
		        }else{
		        	let param = new FormData();
			      	var tokenone =sessionStorage.getItem('encryptToken');
				  	
				  	param.append('token',tokenone);
				  	param.append('imageFile',file);//身份证正面
				  	this.$ajax.post('update/webUser',param).then(function (response) {
					  	if (response.data.complete=="SUCCESS") {
					  		_this.frText=false 
					  		_this.action()
					  		if (_this.front!="" && _this.reverse!="" ) {
					  			_this.disabled=false 
					  		}
					  	}
					}).catch(function (error) {
					      console.log(error);
					});  		 
		        }                       
			},
			updat(e){
				var _this=this
			    let file = e.target.files[0];
			    const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 1;
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 1MB!');
		        }else{
		        	let param = new FormData();
			      	var tokenone =sessionStorage.getItem('encryptToken');
				  	param.append('token',tokenone);
				  	param.append('otherImageFile',file);//身份证反面
				  	this.$ajax.post('update/webUser',param).then(function (response) {
					  	if (response.data.complete=="SUCCESS") {
					  		_this.action()				  		
					  		_this.reText=false  
					  		if (_this.front!="" && _this.reverse!="" ) {
					  			_this.disabled=false 
					  		} 
					  	}
					}).catch(function (error) {
					      console.log(error);
					});  		 
		        }  
			                
			},
		    next(){
		    	if (this.msg=="上传您的身份证照片") {
			    	this.msg="这看起来行吗？"
			      	this.title="确保您的照片不会模糊不清，能够清楚地显示您的脸部。"
			      	this.again=true
		    	}else{
		      		this.$router.push({
			        	path: '/self'
			     	})
		      	}
		    }
		},
		computed:{

		},
		created () {},
		mounted () {
			this.action()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.verr{
	width: 100%;
}
.card{
		width: 100%;
		padding-top: 150px;
		padding-left: 300px;
		position: relative;
	}
	  .avatar-uploader{
	  	display: inline-block;
	  	margin-top: 20px;
	  }
	  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
  	width: 360px;
  	height: 230px;
    font-size: 28px;
    color: #8c939d;
    line-height: 230px;
    border: 1px solid gray;
    text-align: center;
  }
  .avatar {
  	width: 360px;
  	height: 230px;
  }
  	.upload{
	float: left;
	width:360px;
	height:240px;
	margin-top: 10px;
	/*margin-left: 150px;*/
	text-align: center;
    line-height:240px;
    position: relative;
    border: 1px solid #999;
    text-decoration: none;
}
.change{
	/*display: none;*/
	width:360px;
	height:240px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}
.uploadtwo{
	margin-left: 20px;
}
</style>