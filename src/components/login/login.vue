<template>	
	<div class="login">
		<div class="logoshow"  @click="$router.push({
		        path: '/show'
		      })"></div>
		<div class="box">
			<div style="font-size:25px;">登录</div>			
			<el-form ref="form" :model="form">
				<input type="text" class="width" placeholder="输入账号" maxlength="11" v-model="phone" >
				<input type="password" class="width" style="margin-top:20px;" placeholder="输入密码"  v-model="password" @keyup.enter="next">
				<el-form-item>
					<el-checkbox style="font-weight:bold;" v-model="form.checked"><span style="color:white;">下次自动登录</span></el-checkbox>
					<span style="float:right;margin-right:0px;cursor:pointer;color:rgb(0,160,232);"  @click="reset">忘记密码</span>
				</el-form-item >
				
				<el-form-item>
					<el-button type="primary" class="submit" @click="next">登录</el-button>
				</el-form-item>
				<div style="text-align:center;">还没有账号？ <span style="color:rgb(0,160,232);margin-left:5px;cursor:pointer;" @click="register">点击立即注册吧</span></div>
			</el-form>
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
		    clientWidth(){

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
			  	console.log(response)
			  	if (response.data.complete=="SUCCESS") {
			  	    let width = document.body.clientWidth;
			  	    console.log(width)
                	if(width>600){
                		if (response.data.dataStatus==true) {
				  			 _this.$message({
							    message: 'UClick欢迎您的到来',
							    type: 'success',
							    duration:1000
							 })	  		
			        		 _this.$router.push({
					        	path: '/index'
					        })
				  		 }else{
				  		 	_this.$router.push({
					         	path: '/perfect'
					         })
				  		 }			  		
                	}else{
                			_this.$router.push({
					         	path: '/gohome'
					        })
                	}	
			  		
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
					    type: 'error',
					    duration:1000
					 })	
		    		return false;
		    	}
		    	else if(!reg.test(this.phone)){
		    		this.$message({
					    message: '手机号码格式不正确',
					    type: 'error',
					    duration:1000
					 })	
		    		return false;
                }
		    	else if(!this.password) {
		    		this.$message({
					    message: '请输入密码',
					    type: 'error',
					    duration:1000
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
		width: 300px;
		height: 400px;
		    position: fixed;
    top: 150px;
    right: 10%;
		background: rgba(0,0,0,0.4);
		color: white;

		border-radius: 5px;
		padding: 35px;
	}
	@media screen and (max-width:600px) {
	    .box{
	    	background: none;
	    	top: 60px;
	    	right: 0;
	    	left: 0;
	    	margin: 0 auto;
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
	width:100%;
	height: 42px;
	background: rgba(45,45,45,0);
	margin-top:50px;
	border: none;
	border-bottom: 1px solid white;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    
	}
	.submit{
			width:100%;
	    	height: 40px;
	}

</style>