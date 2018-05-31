<template>	
	<div class="login">
		<div class="box">
			<div style="font-size:25px;">重置您的密码</div>
			<el-form ref="form" :model="form">
				<input type="password" class="width" v-model="form.psw" placeholder="请输入6-16位密码">
				<input type="password" class="width" v-model="form.password" placeholder="请再输入一次密码" @keyup.enter.native="next">
				<el-form-item>
					<el-button type="primary" class="submit" @click="next">保存并继续</el-button>
				</el-form-item>
			</el-form>
			<p style="margin-top:20px;text-align:center;">点击“保存并继续”,即表示您确认接收服务条款喝隐私政策。</p>
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