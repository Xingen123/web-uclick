<template>	
	<div class="login">
		<div class="box">
			<div style="font-size:25px;">手机号注册</div>
			<div>已有账号？ <span style="color:#409EFF;margin-left10px;cursor:pointer;font-weight:bold;" @click="routerLogin">登录</span></div>
			<input type="text" class="width" placeholder="手机号" v-model="phone">
			<div>
				<input type="text" class="yzminput" placeholder="请输入验证码" v-model="verifyCode">
				<el-button type="primary" class="yzm"  @click="disabled()"  :disabled="!show">
					<span v-show="show">获取验证码</span>
         			<span v-show="!show" class="count">{{count}} s</span>
				</el-button>
			</div>
			<input type="password" class="width" placeholder="请输入6-16位密码" :minlength="6" :maxlength="16" v-model="password" @keyup.enter.native="next">
			
			<el-button type="primary" class="submit" @click="next">Sign in</el-button>
		</div>
		<p class="bottomtext" style="color:white;font-size:3.5em;text-align:center;font-weight:bold;margin-top:80px;">去和有意思的人成为朋友</p>
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
        		let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        		if(!this.phone){
                   this.$message('请输入手机号码')
                }else if(!reg.test(this.phone)){
                    this.$message('手机号码格式不正确')
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
					  	if (response.data.complete=="SUCCESS") {
					  		_this.$message({
							    message: '注册成功',
							    type: 'success'
							})
			        		 _this.$router.push({
					        		path: '/login'
					        })
					  	}else if(response.data.complete=="FAILED") {
					  	 _this.$message(response.data.errorMessage)
					  	}
					  }).catch(function (error) {
					  	 _this.$message('注册失败')
					      console.log(error);
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
                    this.$message('手机号码格式不正确')
                }
        		else if (!this.verifyCode){
        			this.$message({
					    message: '请输入验证码',
					    type: 'error'
					})	
		    		return false;  
        		}
        		else if (!this.password){
        			this.$message({
					    message: '请输入密码',
					    type: 'error'
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
		width:33%;
		max-width: 500px;
		min-width: 300px;
		height: 350px;
		background: rgba(0,0,0,0.4);
		color: white;
		margin:0 auto;
		/*position: absolute;*/
		margin-top: 150px;
		border-radius: 5px;
		padding: 35px;
	}
	@media screen and (max-width:600px) {
	    .box{
	      height: 300px;
	    }
	}
	.el-input{
		margin-top: 20px;
		height: 50px;
		border:0;
	}
	.yzminput{
		width: 240px;
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

	.yzm{
		width: 170px;
		margin-left: 30px;
	}
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
		width:98%;
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
		.yzminput{
			width: 100px;
			height: 35px;
		}
		.yzm{
			width: 112px;
			height: 35px;
			margin-left: 50px;
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