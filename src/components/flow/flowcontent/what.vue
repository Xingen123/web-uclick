<template>	
	<div class="slogan">
		<div style="font-size: 28px;">描述体验的内容</div>
		<p style="margin-top:25px;color:#505050;width:550px;">除了个人魅力，体验本身是另一个吸引体验者的主要因素。有趣的活动、详细的流程、贴心的提示以及体验中随机出现的小惊喜都能让每个体验者爱上此次体验。
</p>
		<el-input type="textarea"
  :rows="8"  placeholder="例：作为时尚博主，我认为的“高级”拍照大法除了时尚博主类型的街拍，就是在咖啡店或艺术展的高级摆拍了：） 这次体验我会带你去逛北京最适合拍照的3家咖啡店，喝咖啡吃甜点，享受的同时你也会收获一组时尚博主质感的街拍。
  ……
" style="margin-top:50px;width:500px;font-size:20px;" v-model="input"  :maxlength="1500"  @input="descInput"></el-input>
		<p v-show="button" style="line-height:40px;">还剩{{number}}个字</p>
		<el-button type="primary" plain style="width:100px;margin-top:50px;display:block;" @click="go" v-show="next">下一步</el-button>
		<div style="margin-top:50px;" v-show="button">
			<el-button type="primary"  style="width:100px;"  :disabled="disabled" @click="save">保存</el-button>
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
			revocation(){
				this.disabled=true
				this.input=""
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
			  param.append('sequence',"1");
			  this.$ajax.post('query/webRecommendItem',param).then(function (response) {
			  	if(response.data.webItemInfoList.length>0){
			  		global.$emit("tabsix",true)
			  		_this.input=response.data.webItemInfoList[0].brief
			  		_this.number=1500-response.data.webItemInfoList[0].brief.length
			  		_this.disabled=false
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
			   param.append('sequence',"1");
			  this.$ajax.post('create/webRecommendItem',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabsix",true)
			  		_this.button=false
					_this.next=true
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			//下一步跳转
			go(){
			this.$router.push({
		        path: '/flow/moment'
		      })
			}
		},
		computed:{

		},
		created () {
			this.what()
		},
		mounted () {},
	  	destroyed () {}
	} 
</script>
<style scoped>
	
</style>