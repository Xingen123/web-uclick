<template>	
	<div class="slogan">
		<div style="font-size: 28px;">添加一句副标题</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">副标题可以用来进一步说明您体验活动的特色，或表达体验的精神和内涵，鼓励潜在的体验者报名您的体验。</p>
		<el-input  type="text" placeholder="例：绝对终身难忘，好胆你就来." style="margin-top:50px;width:500px;" v-model="input"  :maxlength="50"  @input="descInput"></el-input>
		<p v-show="button" style="line-height:40px;">最多50个字</p>
		<el-button type="primary" plain style="width:100px;margin-top:50px;display:block;" @click="what" v-show="next">下一步</el-button>
		<div style="margin-top:50px;" v-show="button">
			<el-button type="primary"  style="width:100px;" @click="slogan"  :disabled="disabled">保存</el-button>
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
				number:50	
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){
				var txtVal = this.input.length;
 				if(txtVal<51){
					this.number =50 - txtVal;
				}
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			revocation(){
				this.input=""
			},
			//获取用户输入的值
			inslogan(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  this.$ajax.post('query/webRecommendDetail',param).then(function (response) {
			  	if (response.data.title!=null) {
			  		global.$emit("tabthree",true)
			  		_this.disabled=false
			  		_this.input=response.data.title
			  		_this.number=50-response.data.title.length	
			  	}
			  
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			//保存标题
			slogan(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('title',this.input);
			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabthree",true)
			  		_this.button=false
					_this.next=true
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			//下一步跳转
			what(){
			this.$router.push({
		        path: '/flow/mapdepot'
		      })
			}
		},
		computed:{

		},
		created () {
			
		},
		mounted () {
			this.inslogan()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-input{
		width: 100% !important;
	}
}
</style>