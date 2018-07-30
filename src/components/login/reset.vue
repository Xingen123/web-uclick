<template>	
	<div class="login">
		<div class="logoshow"  @click="$router.push({path: '/show'})"></div>
		<div class="box">
			<div style="font-size:25px;">重置密码</div>
			<div style="margin-top:20px;font-size:18px;">请输入正确的账号绑定手机号码，以便第一时间获取验证码来重置密码。</div>
			
				<input type="text" class="width" placeholder="输入手机号" :maxlength="11" v-model="phone">
				<input type="text" class="widthtwo" placeholder="验证码" v-model="yzm" :maxlength="4" @keyup.enter.native="next">
				<button   class="yzm"  @click="disabled()" :disabled="!show">
					<span v-if="show">获取验证码</span>
	         		<span v-if="!show">{{count}} s</span>
				</button>
	
				<el-button type="primary" class="submit" style="margin-top:30px;" @click="next">下一步</el-button>
		
		</div>
		
	</div>
</template>
<script>
const TIME_COUNT =60;
	export default{
		components:{

		},
		data(){
			return{
				phone:"",
				show: true,
			    count: '',
			    yzm:"",
				timer: null
			}
		},
		props: {},
		watch:{

		},
		methods:{
			reset () {
			  var  _this = this
			  let param = new FormData();
			  param.append('mobile', this.phone);
			  this.$ajax.post('user/sendSMSUpdate',param).then(function (response) {
			  	
			  	if (response.data.complete=="SUCCESS") {
			  		_this.$message({
					    message: '验证码发送成功',
					    type: 'success',
					    duration:1000
					})
			  	}
			  }).catch(function (error) {
			 
			  
			     _this.$message("验证码发送失败")
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
					    message: '请输入手机号码',
					    type: 'error',
					    duration:1000
					})	
                }else if(!reg.test(this.phone)){
                    this.$message({
					    message: '手机号码格式不正确',
					    type: 'error',
					    duration:1000
					})	
                }else{
                    this.TIME_COUNT=60;
                    this.disabled=true;
                    this.getCode();
                    this.reset();
                }
        	},
        	
			nextReset(){
			  var  _this = this
			  let param = new FormData();
			  param.append('verifyCode', this.yzm);
			  param.append('mobile', this.phone);
			  this.$ajax.post('/user/verifyCode',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		sessionStorage.setItem('resetToken',response.data.updateToken)
			  		_this.$message({
					    message: '验证码输入正确,请填写新密码',
					    type: 'success'
					})
			  		_this.$router.push({
		        		path: '/resetpsw'
		     		})
			  	}else if (response.data.complete=="FAILED") {
			  		_this.$message(response.data.errorMessage)
			  	}
			  }).catch(function (error) {
			     _this.$message("服务器异常")
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
                    return false; 
                }
        		else if (!this.yzm){
        			this.$message({
					    message: '请输入验证码',
					    type: 'error'
					})	
		    		return false;  
        		}
        		else if (this.phone&& this.yzm) {
        			this.nextReset()
        		}
        	}
		},
		computed:{

		},
		created () {},
		mounted () {},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.login{
		width: 100%;
	}
	.box{
		width: 300px;
		height: 400px;
		    position:absolute;
    top: 150px;
    right:10%;
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
	.yzm:focus{outline:0;} 
	.el-input{
		height: 50px;
		border:0;
	}
	.widthtwo{
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
	.el-form{position: relative;}
	.yzm{
				width: 100px;
		height: 50px;
		position:absolute;
		 bottom:170px;
    	right: 20px;
		cursor: pointer;
		background: rgba(0,0,0,0);
   		 border: none;
    	color: white;

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
	background: rgba(0,0,0,0);
	margin-top:50px;
	border: none;
	border-bottom:1px solid white;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    
	}
	.submit{
			width:100%;
	    	height: 40px;
	}
.el-button+.el-button{margin-left: 0 !important;}
	@media screen and (max-width:1450px) {
			.yzm{
				width: 100px;
				margin-left: 0px;
				margin-top: 15px;
			}
	}
	@media screen and (max-width:600px) {
	    .width{
	    	height: 35px;
	    }
	    .widthtwo{
	    	width:100%;
	    	height: 35px;
	    }
	    .yzm{
			width: 100px;
			height: 35px;
			line-height: 10px;
			margin-left: 12px;
			bottom:190px;
    		right: 20px;
		}
	    .submit{
	    	width:100%;
	    	height: 35px;
	    	line-height: 10px;
	    }
	}
</style>