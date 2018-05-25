<template>	
	<div class="login">
		<div class="box">
			<div style="font-size:25px;">重置密码</div>
			<div style="margin-top:20px;font-size:18px;">请输入与您的账号相关的手机号码,我们会给您发送验证码来重置密码</div>
			<el-form ref="form" :model="form">
				<input type="text" class="width" placeholder="手机号" v-model="form.phone">
				<input type="text" class="widthtwo" placeholder="请输入验证码" v-model="form.yzm" @keyup.enter.native="next">
				<el-button type="primary"  class="yzm"  @click="disabled()" :disabled="!form.show">
					<span v-show="form.show">获取验证码</span>
	         		<span v-show="!form.show">{{form.count}} s</span>
				</el-button>
	
				<el-button type="primary" style="width:502px;margin-top:30px;margin-left:-2px; display:block;font-sizefont-size: 18px;" @click="next">下一步</el-button>
			</el-form>
		</div>
	</div>
</template>
<script>
const TIME_COUNT = 60;
	export default{
		components:{

		},
		data(){
			return{
				form:{
					phone:"",
					show: true,
			        count: '',
			        yzm:""
				},
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
			  param.append('mobile', this.form.phone);
			  this.$ajax.post('user/sendSMSUpdate',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.$message({
					    message: '验证码发送成功',
					    type: 'success'
					})
			  		
			  	}else{
			  		_this.$message("验证码发送失败")
			  	}
			  }).catch(function (error) {
			     _this.$message("验证码发送失败")
			  });
		    },
		    getCode(){
	            if (!this.timer) {
	                this.form.count = TIME_COUNT;
	                this.form.show = false;
	                this.timer = setInterval(() => {
	                  if (this.form.count > 0 && this.form.count <= TIME_COUNT) {
	                    this.form.count--;
	                  } else {
	                    this.form.show = true;
	                    clearInterval(this.timer);
	                    this.timer = null;

	                  }
	                }, 1000)
	            }
        	},
        	disabled (){
        		let reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        		if(this.form.phone==''){
                   this.$message('请输入手机号码')
                }else if(!reg.test(this.form.phone)){
                    this.$message('手机号码格式不正确')
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
			  param.append('verifyCode', this.form.yzm);
			  param.append('mobile', this.form.phone);
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
        		if (!this.form.phone) {
        			console.log(1)
		    		this.$message({
					    message: '请填写账号',
					    type: 'error'
					 })	
		    		return false;        			
        		}
        		else if(!reg.test(this.form.phone)){
                    this.$message('手机号码格式不正确')
                    return false; 
                }
        		else if (!this.form.yzm){
        			this.$message({
					    message: '请输入验证码',
					    type: 'error'
					})	
		    		return false;  
        		}
        		else if (this.form.phone&& this.form.yzm) {
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
		width: 500px;
		height: 350px;
		background: rgba(0,0,0,0.4);
		color: white;
		margin: 150px auto;
		border-radius: 5px;
		padding: 35px;
	}
	.el-input{
		height: 50px;
		border:0;
	}
	.widthtwo{
		width:200px;
		height: 42px;
		line-height: 42px;
		display:inline-block;
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
		margin-left: 90px;
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
	width: 470px;
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
</style>