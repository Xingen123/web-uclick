<template>	
	<div class="remark">
		<div style="font-size: 28px;">填写体验中您提供的独特东西</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">如果您还为体验者准备了其他贴心且特殊的东西，请在此页描述出来。如一份独特的甜品、能带走收藏的小惊喜等，每一个细心之处都是体验者选择再次参加体验的原因。</p>
		<el-input type="textarea"
  :rows="8"  placeholder="例：本次体验还包含一杯北京最大杯酸奶、一套精致优雅的餐具、一份专门为你准备的甜品，还有能为你拍出最美照片的专业设备。" style="margin-top:50px;width:500px;font-size:20px;" v-model="input"  :maxlength="250"  @input="descInput"></el-input>
		<p v-show="button" style="line-height:40px;">最多250个字</p>
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
					_this.$message({
							type: 'success',
							message: '保存成功!',
							duration:1500
					});
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
	@media screen and (max-width: 600px) {
	.text_p,.el-textarea{
		width: 100% !important;
	}
	.el-button{
		margin-top: 100px !important;
	}
	.remark{
		margin-bottom: 50px;
	}
}
</style>