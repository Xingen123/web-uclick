<template>	
	<div class="experience">
		<div style="font-size: 28px;">添加详细体验地点</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">您将带大家去哪些地点？这些体验地点有哪些别人未发现的独特之处？细心地告诉大家乘车路线会为体验加分。</p>
		<el-input type="textarea"
  :rows="8"  placeholder="如果您能带体验者进入体验者无法自行找到或进入的地方，整个体验都会充满惊喜与快乐。" style="margin-top:50px;width:500px;font-size:20px;" v-model="input"  :maxlength="1500"  @input="descInput"></el-input>
		<p  style="line-height:40px;">还剩{{number}}个字</p>
		<div style="margin-top:50px;" >
			<el-button type="primary"  style="width:120px;" :disabled="disabled" @click="save">保存并继续</el-button>
		</div>
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
				number:1500
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){
				var txtVal = this.input.length;
 				this.number =1500 - txtVal;
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			//获取用户输入的值
			 what(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('sequence',"2");
			  this.$ajax.post('query/webRecommendItem',param).then(function (response) {
			  	if (response.data.webItemInfoList.length>0) {
			  		global.$emit("tabeight",true)
			  		_this.disabled=false
			  		_this.input=response.data.webItemInfoList[0].brief
			  		_this.number=1500-response.data.webItemInfoList[0].brief.length
			  	}	
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			//保存标题
			save(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('brief',this.input);
			   param.append('sequence',"2");
			  this.$ajax.post('create/webRecommendItem',param).then(function (response) {
			  	
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabeight",true)
			  		_this.$router.push({
		       			path: '/flow/require'
		     		})
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
			this.descInput()
			this.what()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
		@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-textarea{
		width: 100% !important;
	}
	.experience{
		margin-bottom: 50px;
	}
}
</style>