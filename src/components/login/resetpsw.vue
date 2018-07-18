<template>	
	<div class="login">
		<div class="logoshow"  @click="$router.push({path: '/show'})"></div>
		<div class="box">
			<div style="font-size:25px;">重置密码</div>
			<el-form ref="form" :model="form">
				<input type="password" class="width" v-model="form.psw" placeholder="输入新密码">
				<input type="password" class="width" style="margin-top:20px;" v-model="form.password" placeholder="确认新密码" @keyup.enter.native="next">
				<el-form-item>
					<el-button type="primary" class="submit" @click="next">完成</el-button>
				</el-form-item>
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
				form:{
					psw:"",
					password:""
				}
			}
		},
		props: {},
		watch:{

		},
		methods:{
			next(){
				var  _this = this
				if (this.form.psw==this.form.password && this.form.psw.length>=6 && this.form.password.length>=6 && this.form.psw.length<16 && this.form.password.length<16) {
					let param = new FormData();
					  let resetToken =sessionStorage.getItem('resetToken');
					  
					  param.append('password', this.form.password);
					  param.append('updateToken',resetToken);
					  this.$ajax.post('/user/updatePassword',param).then(function (response) {
					  	if (response.data.complete=="SUCCESS") {
					  		_this.$message({
					          message: '恭喜你，修改密码成功',
					          type: 'success'
					        })
					  		_this.$router.push({
				        		path: '/login'
				     		})
					  	}					  	
					  }).catch(function (error) {
					     _this.$message("服务器异常")
					  });
				}else if (!this.form.psw || !this.form.password){
					_this.$message("输入密码不能为空")
				}else if (this.form.psw != this.form.password){
					_this.$message("两次输入密码不一致")
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
		    position: absolute;
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
	    .width{
	    	height: 35px;
	    }
	    .submit{
	    	width:100%;
	    	height: 35px;
	    	margin-top: 30px;
	    	line-height: 10px;
	    }
	}
</style>