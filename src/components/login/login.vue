<template>	
	<div class="login">
		<div class="box">
			<div style="font-size:25px;">登录Blueglass</div>
			<div>还没有账号？ <span style="color:#409EFF;margin-left10px;cursor:pointer;" @click="register">注册</span></div>
			<el-form ref="form" :model="form">
				<el-form-item>
					<el-input type="text" class="width" placeholder="手机号" v-model="phone" ></el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="password" class="width" placeholder="密码" v-model="password" @keyup.enter.native="next"></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="form.checked">记住我</el-checkbox><span style="color:#409EFF;float:right;margin-right:30px;cursor:pointer;"  @click="reset">忘记密码</span>
				</el-form-item >
				
				<el-form-item>
					<el-button type="primary" class="submit" @click="next">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
// import md5 from 'js-md5';
// const a = "sdadsa";
// console.log(`####${md5(a)}`) 
	export default{
		components:{

		},
		data(){
			return{
				phone:"",
				password:"",
				form:{
					checked:true
				}
			}
		},
		props: {},
		watch:{
		},
		methods:{
			register () {
		      this.$router.push({
		        path: '/register'
		      })
		    },
		   	reset () {
		      this.$router.push({
		        path: '/reset'
		      })
		    },
		    cookie(){
		    	 var cookiePhone =sessionStorage.getItem('phone');
		    	 var cookiePsw =sessionStorage.getItem('password');
		    	 if (cookiePhone!='null' && cookiePsw!='null') {
			    	 this.phone=cookiePhone
			    	 this.password=cookiePsw
		    	 }else{
		    	 	 this.phone=""
			    	 this.password=""
		    	 }	    	 
		    },
		    //登录
		    login(){
		    	var _this=this
		      let param = new FormData();
			  param.append('mobile', this.phone);
			  param.append('password', this.password);
			  if (this.form.checked==true) {
			  	sessionStorage.setItem('phone',this.phone)
			  	sessionStorage.setItem('password',this.password)
			  }else{
			  	sessionStorage.removeItem('phone')
			  	sessionStorage.removeItem('password')
			  }
			  this.$ajax.post('user/login',param).then(function (response) {
			  	var token =response.data.token;
			  	sessionStorage.setItem('encryptToken',token)
			  	//存放登录的token
			  	if (response.data.complete=="SUCCESS") {	
			  		 _this.$message({
					    message: 'UClick欢迎您的到来',
					    type: 'success'
					 })	  		
	        		 _this.$router.push({
			        	path: '/index'
			        })
			  	}
			  	else if(response.data.complete=="FAILED"){
			  		_this.$message({
			          message: response.data.errorMessage,
			          type: 'error'
			        });
			  	}

			  }).catch(function (error) {
			  	  _this.$message('登录失败,服务器异常')
			  });
		    },
		    next(){
		    	let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
		    	if (!this.phone) {
		    		this.$message({
					    message: '请填写账号',
					    type: 'error'
					 })	
		    		return false;
		    	}
		    	else if(!reg.test(this.phone)){
		    		this.$message({
					    message: '手机号码格式不正确',
					    type: 'error'
					 })	
		    		return false;
                }
		    	else if(!this.password) {
		    		this.$message({
					    message: '请输入密码',
					    type: 'error'
					 })	
		    		return false;
		    	}
			    else if(this.phone && this.password){
			    	this.login()
			    }
		      
        	}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.cookie()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.box{
		width: 500px;
		height: 400px;
		background: white;
		margin:0 auto;
		/*position: absolute;*/
		margin-top: 150px;
		border-radius: 5px;
		padding: 35px;
	}

	.yzminput{
		width: 270px;
	}
	.yzm{
		width: 170px;
		margin-left: 30px;
	}
	.width{
		width: 470px;
		margin-top: 20px;
	}
	.submit{
		width: 470px;
		margin-top: 10px;
	}
</style>