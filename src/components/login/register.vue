<template>	
	<div class="login">
		<div class="logoshow"  @click="$router.push({path: '/show'})"></div>
		<div class="box">
			<div style="font-size:25px;">注册</div>
			
			<input type="text" class="width" placeholder="请输入手机号" maxlength="11" v-model="phone">
			<div style="position:relative;">
				<input maxlength="4" class="yzminput" placeholder="验证码" v-model="verifyCode">
				<button class="yzm"  @click="disabled()"  :disabled="!show">
					<span v-show="show">获取验证码</span>
         			<span v-show="!show" class="count">{{count}} s</span>
				</button>
			</div>
			<input type="password" class="width" style="margin-top:20px;" placeholder="输入密码" :minlength="6" :maxlength="16" v-model="password" @keyup.enter.native="next">
			
			<el-button type="primary" class="submit" @click="next">提交</el-button>

			<div style="text-align:center;margin-top:20px;">已有账号？<span style="color:rgb(0,160,232);margin-left:5px;cursor:pointer;" @click="routerLogin">点击立即登录吧！</span></div>
			<div class="deal" @click="$router.push({path: '/deal'})">用户注册代表同意《Uclick平台体验活动发起人协议》</div>
		</div>
		
	</div>
</template>
<script>
const TIME_COUNT = 60;
import axios from 'axios'
	export default{
		components:{

		},
		data(){
			return{
				verifyCode:"",
				password:"",
				phone:"",
				show: true,
		        count: '',
		        timer: null,
			}
		},
		props: {},
		watch:{

		},
		methods:{
			routerLogin () {
				this.$router.push({
			        path: '/login'
			    })
			},	
			login () {
			  let param = new FormData();
			  param.append('mobile', this.phone);
			  this.$ajax.post('user/sendSMSRegiser',param).then(function (response) {

			  }).catch(function (error) {
			      console.log(error);
			  });
		    },	
		    getCode(){
	            if (!this.timer) {
	                this.count = TIME_COUNT;
	                this.show = false;
	                this.timer = setInterval(() => {
	                  if (this.count > 0 && this.count <= TIME_COUNT) {
	                    this.count--;
	                  } else {
	                    this.show = true;
	                    clearInterval(this.timer);
	                    this.timer = null;
	                  }
	                }, 1000)
	            }
        	},
        	disabled (){
        		let reg=11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/;
        		if(!this.phone){
                  	this.$message({
					    message: '请填写账号',
					    type: 'error',
					    duration:1000
					})	
                }else if(!reg.test(this.phone)){
                    this.$message({
					    message: '请填写账号',
					    type: 'error',
					    duration:1000
					})	
                }else{
                    this.TIME_COUNT=60;
                    this.disabled=true;
                    this.getCode();
                    this.login ();
                }
        	},
        	register(){
        		var _this=this  	 	
		        let param = new FormData();
		        	  param.append('verifyCode', this.verifyCode);
		        	  param.append('password', this.password);
					  param.append('mobile', this.phone);
					  this.$ajax.post('user/regiser',param).then(function (response) {
					  	console.log(response)
					  	if (response.data.complete=="SUCCESS") {
					  		_this.$message({
							    message: '注册成功',
							    type: 'success',
							    duration:1000
							})
							// let width = document.body.clientWidth;
			  	    
                			// if(width>600){
                				 _this.$router.push({
					        		path: '/login'
					        	})
               //  			}else{
               //  				_this.$router.push({
					         	// 	path: '/gohome'
					       	 	// })
               //  			}

			        		
					  	}else if(response.data.complete=="FAILED") {
					  	 _this.$message(response.data.errorMessage)
					  	}
					  }).catch(function (error) {
					  	 _this.$message('注册失败')
					      console.log(error);
					  });
			},
        	next(){
        		let reg=11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/;
        		if (!this.phone) {
		    		this.$message({
					    message: '请填写账号',
					    type: 'error',
					    duration:1000
					 })	
		    		return false;        			
        		}
        		else if(!reg.test(this.phone)){
                    this.$message('手机号码格式不正确')
                }
        		else if (!this.verifyCode){
        			this.$message({
					    message: '请输入验证码',
					    type: 'error',
					    duration:1000
					})	
		    		return false;  
        		}
        		else if (!this.password){
        			this.$message({
					    message: '请输入密码',
					    type: 'error',
					    duration:1000
					})	
		    		return false;  
        		}
        		else if (this.phone && this.verifyCode && this.password) {
        			this.register()
        		}
        	}
		},
		computed:{

		},
		beforeCreate() {

		},
		created () {

		},
		mounted () {

		},
	  	destroyed () {}
	} 
</script>
<style scoped>

	.box{
		width: 300px;
		height: 400px;
		    position: absolute;
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
	.el-input{
		margin-top: 20px;
		height: 50px;
		border:0;
	}
	.yzminput{
	width:100%;
	height: 42px;
	background: rgba(45,45,45,0);
	margin-top:20px;
	border: none;
	border-bottom: 1px solid white;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
	}

	.yzm{
		width: 100px;
		height: 50px;
		background-color: rgba(0,0,0,0);
		border: none;
		color: white;
		position: absolute;
    	bottom: 0;
    	right: 0px;
    	cursor: pointer;
	}
	 .yzm:focus{outline:0;} 
	@media screen and (max-width:1450px) {
	    .yzm{
	     margin-left: 0;
	     margin-top: 15px;
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
	margin-top:40px;
	border: none;

	border-bottom: 1px solid white;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
	}
	.deal{
	text-align:center;
	margin-top:20px;
	cursor:pointer;
	color:rgb(255,255,255);
	font-size:10px;
	}
.deal:hover{
	color:rgb(0,160,232);
}
.submit{
		width:100%;
		margin-top: 50px;
		/*font-weight: bold;*/
		font-size: 18px;
		text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
	} 
	@media screen and (max-width:600px) {
		.yzminput{
			width: 100%;
			height: 35px;
		}
		.yzm{
			width: 112px;
			height: 35px;
			margin-left: 12px;
	    	line-height: 10px;
		}
	    .width{
	    	height: 35px;
	    }
	    .submit{
	    	margin-top: 30px;
	    	width:100%;
	    	height: 35px;
	    	line-height: 10px;
	    }
	}
</style>