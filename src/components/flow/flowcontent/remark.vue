<template>	
	<div class="slogan">
		<div style="font-size: 28px;">体验前的叮嘱</div>
		<p style="margin-top:25px;color:#505050;width:550px;">对于此次体验，您还需要体验者提前做好什么准备？提前告知体验者体验中可能遇到的问题，体验者会切身感受到被重视。</p>
		<el-input type="textarea"
  :rows="8"  placeholder="例： 1、本次体验费用不包含探店时的餐饮消费哦。2、参加体验的途中注意行车安全，你的安全比手作皮具更让我关心。" style="margin-top:50px;width:500px;font-size:20px;" v-model="input"  :maxlength="250"  @input="descInput"></el-input>
		<p v-show="button" style="line-height:40px;">还剩{{number}}个字</p>
		<el-button type="primary" plain style="width:100px;margin-top:50px;display:block;" @click="go" v-show="next">下一步</el-button>
		<div style="margin-top:50px;" v-show="button">
			<el-button type="primary"  style="width:100px;" :disabled="disabled" @click="save">保存</el-button>
			<el-button type="primary" plain style="width:100px;" @click="revocation">撤销</el-button>
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
				next:false,
				button:true,
				input:"",
				number:250
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){
				var txtVal = this.input.length;
				if (txtVal<251) {
					this.number =250 - txtVal;
				}
 				
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			revocation(){
				this.input=""
				this.disabled=true
			},
			remark(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('sequence',"3");
			  this.$ajax.post('query/webRecommendItem',param).then(function (response) {			
			  	if (response.data.complete=="SUCCESS") {
			  		if (response.data.webItemInfoList.length>0) {
			  			global.$emit("tabten",true)
			  			_this.input=response.data.webItemInfoList[0].brief
			  			_this.number=190-response.data.webItemInfoList[0].brief.length
			  			_this.disabled=false
			  		}
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
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
			  param.append('sequence',"3");
			  this.$ajax.post('create/webRecommendItem',param).then(function (response) {			
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabten",true)
			  		_this.button=false
					_this.next=true
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			go(){
			  this.$router.push({
		        path: '/flow/price'
		      })
			}
		},
		computed:{

		},
		created () {
			
		},
		mounted () {
			this.remark()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	
</style>