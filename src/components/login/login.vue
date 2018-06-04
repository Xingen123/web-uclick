<template>	
	<div class="login">
		<div class="box">
			<div style="font-size:25px;">登录Blueglass</div>
			<div>还没有账号？ <span style="color:#409EFF;margin-left10px;cursor:pointer;font-weight:bold;" @click="register">注册</span></div>
			<el-form ref="form" :model="form">
				<input type="text" class="width" placeholder="手机号" v-model="phone" >
				<input type="password" class="width" placeholder="密码" v-model="password" @keyup.enter.native="next">
				<el-form-item>
					<el-checkbox style="font-weight:bold;" v-model="form.checked">记住我</el-checkbox>
					<span style="color:#409EFF;float:right;margin-right:30px;cursor:pointer;font-weight:bold;"  @click="reset">忘记密码</span>
				</el-form-item >
				
				<el-form-item>
					<el-button type="primary" class="submit" @click="next">Sign in</el-button>
				</el-form-item>
			</el-form>
		</div>
		<p class="bottomtext" style="color:white;font-size:3.5em;text-align:center;font-weight:bold;margin-top:80px;">去和有意思的人成为朋友</p>
	</div>
</template>
<script>
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
		width:33%;
		max-width: 500px;
		height: 350px;
		background: rgba(0,0,0,0.4);
		color: white;
		margin:0 auto;
		margin-top: 150px;
		border-radius: 5px;
		padding: 35px;
	}
	@media screen and (max-width:600px) {
	    .box{
	    	width:70%;
	    	margin-top: 100px;
	        height: 300px;
	    }
	}
	 input::-webkit-input-placeholder{
            color:#fff;
     }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#fff;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#fff;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#fff;
        }
	.width{
	width:90%;
	height: 42px;
	margin-top: 20px;
    padding: 0 15px;
    background: #2d2d2d;
    background: rgba(45,45,45,.5);
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #3d3d3d;
    border: 1px solid rgba(255,255,255,.15);
    -moz-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.1) inset;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
	}

	.submit{
		width:95%;
		margin-top: 10px;
		/*font-weight: bold;*/
		font-size: 18px;
		    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
	} 
	@media screen and (max-width:600px) {
	    .width{
	    	height: 35px;
	    }
	    .submit{
	    	height: 35px;
	    	line-height: 10px;
	    }
	}
</style>