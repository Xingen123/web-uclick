<template>	
	<div class="price">
		<div style="font-size: 28px;">设置每位体验者的体验价格</div>
		<el-input type="number"  v-model="input" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" style="display:block;margin-top:50px;width:300px;" @input="descInput" placeholder="请输入价格"></el-input>
	 

	  <div class="counter">
	  	<div style="font-size:28px;">价格计算器</div>
	  	<div class="apiece"><span style="color:#606266;font-size:18px;">每位价格</span><span style="float:right;padding-right:10px;">￥{{input}}</span></div>
	  	<div class="peoplenum"><span style="color:#606266;font-size:18px;">参与者人数</span><el-input style="width:70px;float:right;margin-top:-10px;padding-right:10px;" v-model="num" type="number"></el-input></div>
	  	<div style="line-height:50px;"><span style="font-size:18px;">您将获得</span><span style="float:right;padding-right:10px;">￥{{input*num*0.8 | priceNumber}}</span></div>
	  	<p>这是免去20%服务费之后，您收获的金额
<!-- <el-tooltip content="这是免去20%服务费之后，您收获的金额
" placement="bottom" effect="light"> -->

<!-- </el-tooltip> -->

</p>

	  </div>

	   <el-button type="primary"  style="display:block;margin-top:150px;width:120px;" class="next" :disabled="disabled" @click="cover">保存并继续</el-button>
	</div>
</template>
<script>
import global from '@/components/flow/global/global'
	export default{
		components:{
		},
		data(){
			return{
				disabled:true,
				input:"",
				num:3
			}
		},
		props: {},
		watch:{

		},
		filters: {
		    //保留2位小数点过滤器 不四舍五入
		    priceNumber(value) {
		      var toFixedNum = Number(value).toFixed(3);
		      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
		      return realVal;
		    }
		},
		methods:{
			descInput(){
				var txtVal = this.input.length;
 				this.number =50 - txtVal;
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
		    price(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  this.$ajax.post('query/webRecommendDetail',param).then(function (response) {
			     	
			  	if (response.data.complete=="SUCCESS") {
			  		if (response.data.price!=null) {
				  		var pric = response.data.price.split(".0");	
				  		global.$emit("tabten",true)
				  		_this.input=pric[0]
				  		_this.disabled=false
			  		}
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			cover(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('price',this.input);
			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {			
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabten",true)
			  	_this.$router.push({
			        path: '/flow/submit'
			    })
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.price()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.price{
	margin-bottom: 50px;
}

.counter{
	width: 380px;
	height:310px;
	box-shadow: 4px 5px 20px #8C8C8C;
	-moz-box-shadow: 4px 5px 20px #8C8C8C;
	border-radius: 5px;
	padding: 20px;
	margin-top: 50px;
}
@media screen and (max-width: 600px) {
     .counter{
     	width: 90%;
       top: 500px;
    }
   
	.next{
		margin-top: 50px;
	}
}
.apiece{
	margin-top: 30px;
	padding-bottom: 10px;
	border-bottom: 1px solid #DBDBDB;
}
.peoplenum{
	margin-top: 20px;
	padding-bottom: 10px;
	border-bottom: 1px solid #DBDBDB;
}
</style>