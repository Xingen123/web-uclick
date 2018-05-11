<template>	
	<div class="login">
		<div class="box">
			<div style="font-size:25px;">手机号注册</div>
			<div>已有账号？ <span style="color:#409EFF;margin-left10px;cursor:pointer;" @click="routerLogin">登录</span></div>
			<el-input type="text" class="width" placeholder="手机号" v-model="phone"></el-input>
			<div>
				<el-input type="text" class="yzminput" placeholder="请输入验证码" v-model="verifyCode"></el-input>
				<el-button type="primary" plain class="yzm"  @click="disabled()" :plain="true" :disabled="!show">
					<span v-show="show">获取验证码</span>
         			<span v-show="!show" class="count">{{count}} s</span>
				</el-button>
			</div>
			<el-input type="password" class="width" placeholder="请输入6-16位密码" :minlength="6" :maxlength="16" v-model="password" @keyup.enter.native="next"></el-input>
			
			<el-button type="primary" class="submit" @click="next">注册</el-button>
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
		width: 500px;
		height: 400px;
		background: white;
		margin: 150px auto;
		border-radius: 5px;
		padding: 35px;
	}
	.el-input{
		margin-top: 20px;
		height: 50px;
		border:0;
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
	}
	.submit{
		width: 470px;
		margin-top: 30px;
	}
</style>