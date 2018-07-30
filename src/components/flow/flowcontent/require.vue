<template>	
	<div class="require">
		<div style="font-size: 28px;">您对体验者有哪些特殊要求？</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">预定此次体验的体验者可能会为他人预定名额，为保证这个体验的安全，请您添加此次体验参与者的需求。例如年龄、技能水平、证书证明或需自带物品等需求。</p>
		<div class="age">
			<div style="font-size:18px;">体验最多参与人数</div>
			<p style="line-height:40px;">为参与者设定年龄限制，未成年人必须有监护人的陪同下可参加。</p>
			<el-input v-model="age"  type="number"  onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" style="display:block;margin-top:20px;width:400px;"  @input="desage"></el-input>
		</div>
		<div style="margin-top:80px;">
			<div style="font-size:18px;">其他要求(选填)</div>
			<el-input v-model="exet" type="textarea"
  :rows="5"
  placeholder="例：为保障您的安全，登山体验需体验者穿着登山装和运动鞋。" style="margin-top:10px;width:500px;" :maxlength="300"  @input="descInput"></el-input>
		</div>
		<p  style="line-height:40px;">最多300个字</p>
		<el-button type="primary " plain style="margin-top:50px;width:120px;" :disabled="disabled" @click="sort">下一步</el-button>
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
				age:"",
				exet:"",
				number:300,
				min:0,
				max:70
			}
		},
		props: {},
		watch:{

		},
		methods:{
			desage(){
				var txtVal = this.age.length;
 				if (txtVal>0) {
 				
					this.disabled=false
				}else{
					
					this.disabled=true
				}
			},
			descInput(){
				var txtVal = this.exet.length;
				if (txtVal<301) {
					this.number = 300 - txtVal;
				}
 				
			},
			require(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  this.$ajax.post('query/webRecommendDetail',param).then(function (response) {	
			  	console.log(response)	
			  	if (response.data.complete=="SUCCESS") {
			  		if (response.data.serverAmount) {
			  			global.$emit("tabeight",true)
				  		_this.disabled=false
				  		_this.age=response.data.serverAmount
				  		_this.exet=response.data.joinerReqire
				  		
			  		}
			  		if (response.data.joinerReqire) {
			  			_this.number=300-response.data.joinerReqire.length
			  		}
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			sort(){
			  var _this=this
		      let param = new FormData();

		      var tokenone =sessionStorage.getItem('encryptToken');
		      var detailId=sessionStorage.getItem('detailId');

		      param.append('token',tokenone);
			  param.append('id',detailId);
			  param.append('serverAmount',this.age);

			  if (this.exet!="") {
			  	param.append('joinerReqire',this.exet);
			  }

			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {	
			  console.log(response)	
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabeight",true)
				  	_this.$router.push({
				        path: '/flow/lastTime'
				    })
				    _this.$message({
							type: 'success',
							message: '保存成功!',
							duration:1500
					});
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			}
		},
		computed:{

		},
		created () {
			
		},
		mounted () {
			this.require()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.age{
		margin-top: 50px;
	}
			@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-textarea{
		width: 100% !important;
	}
	.require{
		margin-bottom: 50px;
	}
}
</style>