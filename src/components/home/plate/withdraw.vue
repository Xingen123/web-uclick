<template>	
	<div class="money">
		<!-- 可提现金额 -->
		<div class="withdraw">
			<div style="height:10%;padding:10px 10px;font-weight:bold;">可提现金额</div>
		
			<div style="height:70%;text-align:center;line-height: 270px;font-size: 30px;">
				{{input|inputamount}}
			</div>
			<div style="height:20%;text-align:center;">
				 <el-button v-if="drawbotton" type="primary" style="width:120px;font-size:17px;height:35px;padding:0;line-height:5px;background:rgb(0,128,186);" @click="dialog=true">提现</el-button>
				 <el-button type="primary" disabled style="width:120px;font-size:17px;height:35px;padding:0;line-height:5px;background:rgb(214,214,214);color:rgb(131,131,131);border:none;" v-else>提现</el-button>
			</div>
		</div>
		<!-- 支持体现方式 -->
		<div class="payment">
			<div style="height:10%; padding:10px 10px;font-weight:bold;">支持提现方式</div>
			<div style="height:70%;text-align:center; position: relative;">
				<img style="width:75%;position: absolute;left: 0;top:36%;right: 0;margin: 0 auto;" src="../../../../static/img/zfb.png" alt="">
				<div style="position: relative;top:85%;">绑定账号：{{number}}</div>
			</div>
			<div style="height:20%;text-align:center;">
				<el-button v-if="drawbotton" type="primary" disabled style="width:120px;font-size:17px;height:35px;padding:0;line-height:5px;background:rgb(214,214,214);color:rgb(131,131,131);border:none;">已绑定</el-button>
				 <el-button type="primary" style="width:120px;text-align:center;font-size:17px;height:35px;line-height:5px;padding:0;background:rgb(0,128,186);" v-else @click="tiao">绑定支付宝</el-button>
			</div>
		</div>
		<!-- 钱包明细 -->
		<div class="detail">
			<div style="height:10%;font-weight:bold;padding:10px 10px;">钱包明细</div>
			<ul class="recordItem">
				<li v-for="item in recordItem">
					<span style="display:inline-block;text-align:left; width:200px;">{{item.created }}</span>
					
					<span style="display:inline-block;text-align:center; width:200px;">{{item.type}}</span>

					<span style="display:inline-block;text-align:center; width:200px;">{{item.actualAmount | amount}}</span>
				</li>
			</ul>
		</div>


		<!-- 提现 -->
		<el-dialog
		  :closeOnClickModal="true"	
		  :visible.sync="dialog"
		  :width="width"
		  style="width:30%;min-width:300px;margin: 0 auto;">
			<!-- 提现确认 -->
			<div >
			   <div style="font-weight: bold;font-size:17px;">提现金额</div>
			   <div style="text-align:center; ">
			   		  <input v-model="money"  style="width:80%;font-size:15px; margin-top:20px;border:none;text-align:center;opcity:0.5; border-bottom:1px solid rgb(241,241,241);" placeholder="请输入提现金额" />
			  <div style="margin-top:5px;font-size:16px;">当前可提现:<span style="color:rgb(72,72,72)">￥{{input}}</span></div>
			   </div>
			  <!-- <p style="color:#00A0E8;">根据相关条款，Blueglass 扣除 20% 服务费，<br>预计到账金额 ￥{{inputtwo|capitalize}}</p> -->
			   <div style="font-weight: bold;margin-top:20px;font-size:17px;">提现账号</div>
			   <div style="font-weight: bold;margin-top:20px;text-align:center;font-size:15px;">{{number}}</div>
			   <!-- <div style="text-align:center;"> -->
			   	 <!-- <el-button  style="padding: 5px 10px;" type="danger" icon="el-icon-delete" circle @click="open">删除</el-button> -->
			   <!-- </div> -->
			 	<div style="text-align:center;">
			 		 <button  style=" margin-top:30px;border:none;color:white;width:80%;font-size:18px;height:35px;background:rgb(0,128,186);border-radius:5px;"  @click="withdraw">提现</button>
			 	</div>
			</div>
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
				dialog:false,//提现绑定的弹出框
				drawbotton:false
			}
		},
		filters: { 
            capitalize: function (value) { 
            	value = Number(value)
                return value.toFixed(2)
            },
            inputamount:function (value) {
            if (value) {
           	 return	value = Number(value)
            } else{
            	 return	value = "￥" + 0
            }
            	
               
            },
            amount:function (value) { 
            	value = Number(value)
                return  "￥" + value + "元"
            },
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
			  	_this.drawbotton=response.data.flag
			  	_this.number=response.data.name 
			  	sessionStorage.setItem('link',response.data.alipayUrl)
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			//点击绑定按钮
			tiao(){
				var link =sessionStorage.getItem('link');
				 window.location.href=link
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
			  		_this.$message({
			          message: '提现成功',
			          type: 'success'
			        })
			        _this.dialog=false
			  		_this.personage()
			  	}else{
			  		_this.$message.error('提现失败');
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
			this.record()
			this.withdOne()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.money{
		width: 35%;
		min-width: 650px;
		overflow: hidden;
		color: rgb(72,72,72);
		box-sizing: border-box;
	}
	.withdraw{
		width: 48%;
		height: 400px;
		border-radius: 5px;
		float: left;
		border:1px solid rgb(232,232,232);
		box-sizing: border-box;
	}
	.payment{
		width: 48%;
		height: 400px;
		border-radius: 5px;
		float:left;
		margin-left: 4%;
		border:1px solid rgb(232,232,232);
		box-sizing: border-box;
	}
	.el-input__inner{
		border: none !important;
	}
	.detail{
		width: 100%;
		float:left;
		padding-bottom: 50px;
		color: rgb(72,72,72);
		border-radius: 5px;
		margin-top: 10px;
		border:1px solid rgb(232,232,232);
		box-sizing: border-box;
	}
	.recordItem{
		padding: 20 25px;
	}
	.recordItem>li{
		color: rgb(72,72,72);
		margin-top: 10px;
		font-weight: bold;
		margin-left: 20px;
	}
    @media screen and (max-width:600px) {
	    
	}
</style>