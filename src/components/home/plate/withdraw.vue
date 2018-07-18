<template>	
	<div class="with">
		<div style="font-size:28px;">我的钱包</div>
		<div style="width:100%;height:200px;border:1px solid #DCDFE6;margin-top:10px;overflow: hidden;">
			<p style="border-bottom:1px solid #DCDFE6;text-align:right;padding-right:15px;color:#409EFF;cursor:pointer;" @click="record">提现记录</p>
			<div style="padding:20px;">
				<div style="font-size:17px;">当前收益</div>
				<div style="font-size:27px;">￥{{input}}</div>
				<div class="withdOne" style="margin-top:70px;">提现方式：支付宝<span style="color:#409EFF;float:right;cursor:pointer;" @click="withdOne">提现</span></div>
			</div>
		</div>


		<!-- 提现记录 -->
			<el-dialog
		  title="提现记录"
		  :visible.sync="dialogVisible"
		  :width="width">
		  <div style="margin-top:-30px;font-weight: bold;"><span>时间</span><span style="margin-left:240px;">提现金额</span></div>

		  <div v-for="(item,index) in recordItem">
		  	<div><span>{{item.created}}</span>	<span style="margin-left:150px;">{{item.actualAmount}}</span></div>
		  </div>
		</el-dialog>

		<!-- 提现 -->
		<el-dialog
		  :visible.sync="dialog"
		  :width="width"
		  style="text-align:center;width:55%;margin: 0 auto;">
		 
		 	<!--未绑定  -->
		 	<div v-show="noBinding">
		 		<div style="font-weight: bold;">您尚未完成绑定</div>
				<el-button  style="margin-top:30px;width:250px;" @click="tiao">点击绑定</el-button> 
		 	</div>

			<!-- 完成绑定 -->
			<div v-show="yesBinding">
		 		<div style="font-weight: bold;">跳转支付宝页面完成操作</div>
				<el-button  style="margin-top:30px;width:250px;" @click="">完成绑定</el-button> 
		 	</div>
			
			<!-- 提现确认 -->
			<div v-show="yesWithraw" >
			   <div style="margin-top:-30px;font-weight: bold;">提现金额</div>
			  <el-input v-model="money" type="number" style="width:250px;" placeholder="请输入内容"></el-input>
			  <div>当前可提现￥{{input}}</div>
			  <!-- <p style="color:#00A0E8;">根据相关条款，Blueglass 扣除 20% 服务费，<br>预计到账金额 ￥{{inputtwo|capitalize}}</p> -->
			   <div style="font-weight: bold;margin-top:20px;">提现账号</div>
			  <el-input v-model="number" placeholder="请输入内容"  style="width:200px;"></el-input><el-button style="margin-left:20px;color:red;" type="text" @click="open">删除</el-button>
			  <el-button  style="margin-top:30px;width:250px;" @click="withdraw">提现</el-button>
			</div>



		  <!-- 提现成功 -->
		  	<div v-show="over" style="font-weight: bold;">恭喜您提现成功</div>
		</el-dialog>
	</div>
</template>
<script>

	export default{
		components:{

		},
		data(){
			return{
				width:"50%",
				number:"",//支付宝名字
				input:"",//余额
				inputtwo:"",
				money:"",//输入的提现金额
				recordItem:[],//提现记录
				over:false,//提现成功
				yesWithraw:false,  //提现确认
				yesBinding:false, //绑定完成
				noBinding:false,  //绑定流程
				dialog:false,//提现绑定的弹出框
				dialogVisible:false//提现记录的弹出框
			}
		},
		filters: {  
            capitalize: function (value) { 
            	value = Number(value)
                return value.toFixed(2)
            }  
        },  
		props: {},
		watch:{

		},
		methods:{	
			//个人资料
			personage(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
		      param.append('token',tokenone);
			  this.$ajax.post('query/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.input=response.data.fundAmount
			  		_this.inputtwo=response.data.fundAmount*0.8
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},	
			//提现记录
			record(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/transferFundRecord',param).then(function (response) {
			  	if (response.data.fundRecordList.length>0) {
			  		_this.recordItem=response.data.fundRecordList
			  	}
			  	_this.dialogVisible=true	  	
			  }).catch(function (error) {
			      console.log(error);
			  });
			},

			//点击 提现  查询用户是否绑定支付宝
			withdOne(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webUserAlipay',param).then(function (response) {
			  	_this.dialog=true
			  	if (response.data.flag==false){ //如果用户没绑定
			  		_this.yesBinding=false
			  		_this.noBinding=true //弹出绑定弹框
			  		sessionStorage.setItem('link',response.data.alipayUrl) //跳转支付宝链接存入cookie
			  	}else if (response.data.flag==true){ //如果用户绑定

			  		_this.yesWithraw=true //弹出提现弹框
			  		_this.over=false //提现成功弹框关闭
			  		_this.number=response.data.name  //支付宝的名字
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},



			//点击绑定按钮
			tiao(){
				var link =sessionStorage.getItem('link');
				 window.location.href=link
				 this.noBinding=false
				 this.yesBinding=true
				 sessionStorage.removeItem("link");
			},


			//点击立即提现按钮
			withdraw(){
				//判断用户输入的提现金额 是否大于0并且小于等于可提现金额
				if (this.money>0 && this.money<= this.input){
					this.draw()//发出提现请求
				}else{
					this.$message("输入有误，请重新输入");
				}
			},
			
			//发出提现请求
			draw(){
      		  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  param.append('amount',_this.money);
			  this.$ajax.post('trans/webUserAlipay',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS"){		  		
			  		_this.yesWithraw=false //提现成功 关闭 提现框
			  		_this.over=true // 打开提现成功提示
			  		_this.personage()
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},


			//删除绑定账号
			remove(){
				var _this=this  
				      let param = new FormData();
				      var tokenone =sessionStorage.getItem('encryptToken');
					  param.append('token',tokenone);
					  _this.$ajax.post('delete/webUserAlipay',param).then(function (response) {
					  	if (response.data.complete=="SUCCESS"){
					  		_this.$message("删除成功");
					  		_this.yesWithraw=false //关闭提现弹框
					  		_this.withdOne()
					  	}
					  }).catch(function (error) {
					      console.log(error);
					  });
			},
			clientWidth(){
                let width = document.body.clientWidth;
                if(width<600){
                    this.width="95%"
                }
            },
			open() {	
			var _this=this 	
	        this.$alert('删除后您需要重新绑定才能提现', '确认删除', {
	          confirmButtonText: '删除',
	          callback: action => {
	          	if (action=="confirm") {	
	          			_this.remove()
	          	}else{
	          		_this.$message("取消删除");
	          	}
	          
	            
	          }
	        });
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
	.with{
		

		position: absolute;
	    top: 80px;
		left:60%;
		width: 30%;
		height: 250px;
	}
	.el-dialog{
		width: 25% !important;
	}
    @media screen and (max-width:600px) {
	    .with{
	    	left: 55%;
   			width: 40%;
	    }
	    .withdOne{
	    	margin-top: 20px !important;
	    }

	}
</style>