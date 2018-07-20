<template>	
	<div class="index">
		<div class="header">

			<div class="logo" @click="$router.push({
		        	path: '/index'
		     	})"></div>
			<ul class="link">
				<li >
					<router-link to="/index">
                        体验
                    </router-link>
				</li>
				<li >
					<router-link to="/question">
						白皮书
					</router-link>
				</li>
				<li>
					<router-link to="/home">
                      个人信息
                    </router-link>
				</li>
			</ul>
			
			<div class="head">	
				<div class="headimg" @click="funon" @mouseenter="enter" @mouseleave="leave">
					<img  :src="logohead" alt="" :onerror="logoerror"  class="headimgicon">
				</div>
			</div>

			<div class="aside" v-show="aside" @mouseenter="enter" @mouseleave="leave">
				<div @click="myself">个人资料</div>
				<div @click="login">登出</div>
			</div>

		</div>
		<!-- 确认退出 -->

			<el-dialog
					:modal="false"
		  title="提示"
		  :visible.sync="dialogVisible"
		   :width="width" 
		  :before-close="handleClose">
		  <span>确认退出吗？</span>
		  <span slot="footer" class="dialog-footer">   
		    <el-button type="primary" @click="yes">确 定</el-button>
		     <el-button @click="no">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		components:{
		},
		data(){
			return{
				width:"30%",
				logohead:"",
				logoerror: 'this.src="' + require('./img/imghead.png') + '"',
				seen:false,
				aside:false,
				dialogVisible: false
			}
		},
		props: {},
		watch:{

		},
		methods:{
			//弹框确认按钮
			yes(){
				this.dialogVisible = true
				// sessionStorage.removeItem("phone");
				// sessionStorage.removeItem("password");
				sessionStorage.removeItem("recommendId");
				sessionStorage.removeItem("detailId");
				sessionStorage.removeItem("encryptToken");
				this.$router.push({
		        	path: '/show'
		     	})	
			},
			no(){
				this.dialogVisible = false
			},
			//弹框x号
			handleClose(done) {
				this.dialogVisible = false
		     },
		     //点击退出
			login(){
				this.dialogVisible = true
			},
			myself(){
				this.$router.push({
		        	path: '/home'
		     	})
			},

			funon (){
		        this.seen=!this.seen;
		        if(this.seen==true){this.aside=true;}
		        if(this.seen==false){this.aside=false;}
		    },
		    enter (){
            this.aside=true;
	        },
	        leave (){
	            this.aside=false;
	        },
	        //获取用户资料
			personage(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		if (response.data.weedfsId!=null) {
			  			_this.logohead=response.data.fileServer+"/"+response.data.weedfsId
			  		}	  		
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			clientWidth(){
                let width = document.body.clientWidth;
                if(width<600){
                    this.width="80%"
                }
            }
		},
		computed:{

		},
		created () {},
		mounted () {
			this.personage()
			this.clientWidth()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.index{
width: 100%;
background: white;
/*position: fixed;*/
/*top:0;*/
/*left: 0;*/
z-index: 12;
}
.link{
float:left;
margin-left: 113px;
margin-top: -43px; 
font-size: 20px;
}
.el-dialog__wrapper{
	background: rgba(0,0,0,0.5);
}
	.header{
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #DCDFE6;
		    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px !important;
	}

	.logo{
		width:135px;
		height: 60px;
		cursor:pointer;
		border-right: 1px solid #DCDFE6;
		background: url(img/logo.png) no-repeat;
		background-size:80% 80%;
		background-position: 10px;
	}
	.head{
		position:absolute;
		right: 0;
		top: 0;
	}
	.tiyan{
		cursor:pointer;
		/*padding-bottom: 13px;*/
	}
	.headimg{
		width: 50px;
		height: 50px;
		float: right;
		position: absolute;
		right: 50px;
		top: 5px;
		cursor:pointer;
		padding-bottom: 3px;
	}
	.link{
		overflow: hidden;
	}
	.link>li{
		float: left;
		margin-left: 40px;
	}
	.link>li>a{
		color: rgb(72,72,72);
		text-decoration: none;
	}
	.link>li:hover{

		padding-bottom: 13px;	
		border-bottom: 2px solid rgb(0,162,232);
	}
.router-link-active{
	color:rgb(0,162,232) !important;
}
	.headimgicon{
		display: block;
		width: 50px;
		height: 50px;
		border-radius: 25px;
	}
	.aside{
		width: 100px;
		height: 100px;
		z-index: 1;
		border:1px solid #DCDFE6;
		background: white;
		position: absolute;
		top: 60px;
		right:60px;
	}
	.headimg:hover{
		border-bottom: 2px solid #DCDFE6;
	}
	.aside>div{
		cursor:pointer;
		width: 100px;
		height:25px;
		line-height: 25px;
		margin-top: 20px;
		font-size: 14px;
		text-align: center;
	}
	.aside>div:hover{
		color: red;
	}
	@media screen and (max-width:600px) {
    .link{
		width: 100%;
		height:50px;
		background: white;
		border-top: 1px solid #E4E7ED;
		position: fixed !important;
		right: 0;
	    left: 0;
	    bottom: 0;
	    margin: 0 auto;
	    z-index: 100000;
	    display: flex;
	    justify-content: center;
    }
	.link>li:nth-child(1){
		margin-left:0!important;
	}
    .link>li{
		float:left;
		margin-left:40px;
		margin-top:10px;
		border:none;
		text-align: center;
	}
	.link>li>a{
		text-align: center;
	}
	.headimg{
		right:10px;
	}
	.aside{
		right: 10px;
	}

}
</style>