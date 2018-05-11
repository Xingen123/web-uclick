<template>	
	<div class="self">
		<head-er></head-er>
		<div style="padding:50px;padding-left:400px;">
			<div style="font-size:28px;">个人资料</div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">姓名</span><el-input style="margin-left:50px;width:200px;height:20px;" v-model="name"></el-input></div>
			<div style="margin-top:50px;">
				<span style="width:100px;display:inline-block;">头像</span>
				<img  class="imghead" :src="head" alt="">
				<a  class="upload">
				添加头像					
    				<input class="change"  name="file" ref="file" type="file"  accept="image/png,image/gif,image/jpeg" @change="update"/>
				</a>

			</div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">手机号码</span><el-input :disabled="true" v-model="phone" style="margin-left:50px;width:200px;height:20px;"></el-input></div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">身份验证</span><span style="margin-left:50px;color:#409EFF;cursor:pointer;" v-text="yz" @click="veri"></span></div>
			<div style="font-size:28px;margin-top:20px;">个人介绍</div>
			<el-input
			  type="textarea"
			  :rows="5" style="width:300px;margin-top:20px;"
			  placeholder="请输入内容"
			  v-model="myself">
			</el-input>
			<div style="font-size:28px;margin-top:20px;">希望通过体验传递什么</div>
			<el-input
			  type="textarea"
			  :rows="5"  style="width:300px;margin-top:20px;"
			  placeholder="请输入内容"
			  v-model="textarea">
			</el-input>

			<el-button type="primary" style="width:100px;margin-top:50px;display:block;" @click="submit">提交</el-button>
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
				head:"",
				name:"",
				phone:"",
				myself:"",
				textarea:"",
				yz:""
			}
		},
		props: {},
		watch:{

		},
		methods:{
			veri(){
				this.$router.push({
					path: '/verification'
				})
			},
			//上传用户头像
			update(e){
				var _this=this
			    let file = e.target.files[0];
			     this.head=window.URL.createObjectURL(file);  
			                      
			},
			//获取用户资料
			personage(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.name=response.data.name
			  		_this.phone=response.data.phone
			  		_this.myself=response.data.title
			  		_this.textarea=response.data.content
			  		_this.head=response.data.fileServer+"/"+response.data.weedfsId
			  		if (response.data.cardFront==null && response.data.cardBack==null) {
			  		  	_this.yz="未验证(点击验证)"
			  		}else if(response.data.cardFront!=null && response.data.cardBack!=null){
			  			_this.yz="已验证"
			  		}
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			submit(){
			  var _this=this
			  var headimg = this.$refs.file.files[0]
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  param.append('name',this.name);//姓名
			  param.append('nextImageFile',headimg);//头像
			  param.append('title',this.myself);//个人介绍
			  param.append('content',this.textarea);//体验传递什么
			  this.$ajax.post('update/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		 _this.$message({
					    message: '提交成功',
					    type: 'success'
					})  
			  		_this.$router.push({
					path: '/home'
					}) 
			  	}else{
			  		_this.$message("提交失败")
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
				
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
	.self{
		width: 100%;
	}
	.imghead{
		display: block;
		margin-left: 150px;
		width: 100px;
		height: 100px;
		border-radius: 50px;
		border: 1px solid gray;
	}
	.upload{
	cursor:pointer;	
	display: block;
	width: 100px;
	height: 40px;
	margin-top: 10px;
	margin-left: 150px;
	text-align: center;
    line-height: 40px;
    position: relative;
    border: 1px solid #999;
    text-decoration: none;
    color:white;
    background:gray;
}
.change{
	cursor:pointer;
	width: 100px;
	height: 40px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}
</style>