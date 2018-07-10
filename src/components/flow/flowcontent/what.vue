<template>	
	<div class="what">
		<div style="font-size: 28px;">描述体验的内容</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">	除了个人魅力，体验本身是另一个吸引体验者的主要因素。有趣的活动、详细的流程、贴心的提示以及体验中随机出现的小惊喜都能让每个体验者爱上此次体验。
		</p>
		<el-input type="textarea"
		     :rows="8"  placeholder="例：作为时尚博主，我认为的“高级”拍照大法除了时尚博主类型的街拍，就是在咖啡店或艺术展的高级摆拍了：） 这次体验我会带你去逛北京最适合拍照的3家咖啡店，喝咖啡吃甜点，享受的同时你也会收获一组时尚博主质感的街拍。" 
		     style="margin-top:50px;width:500px;font-size:20px;" 
		     v-model="itemContent"  
		     @input="descInput"
		    >
		</el-input>

			<div style="font-size: 28px;margin-top:25px;">填写体验中您提供的独特东西(选填)</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">如果您还为体验者准备了其他贴心且特殊的东西，请在此页描述出来。如一份独特的甜品、能带走收藏的小惊喜等，每一个细心之处都是体验者选择再次参加体验的原因。</p>
		<el-input type="textarea"
  :rows="8"  placeholder="例：本次体验还包含一杯北京最大杯酸奶、一套精致优雅的餐具、一份专门为你准备的甜品，还有能为你拍出最美照片的专业设备。" style="margin-top:50px;width:500px;font-size:20px;" :maxlength="250"  v-model="itemProvide"></el-input>
		<p  style="line-height:40px;">最多250个字</p>
		<el-button type="primary" plain style="width:100px;margin-top:50px;display:block;" @click="go" v-show="next">下一步</el-button>
		<div style="margin-top:50px;" v-show="button">
			<el-button type="primary"  style="width:100px;"  :disabled="disabled" @click="save">保存</el-button>
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
				itemContent:"",
				itemProvide:"",
				number:1500
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){
				var txtVal = this.itemContent.length;
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},

			//获取用户输入的值
			what(){
			  var _this = this
 
		      let param = new FormData();

		      var tokenone = sessionStorage.getItem('encryptToken');
			  
		      var detailId = sessionStorage.getItem('detailId');

		      param.append('token',tokenone);
			  param.append('id',detailId);

			  this.$ajax.post('query/webRecommendItem',param).then(function(response){
			  	
			  	if(response.data.webItemInfoList.length>0){
			  		global.$emit("tabsix",true)
			  		_this.disabled=false
			  		_this.itemContent=response.data.webItemInfoList[0].brief
			  		_this.itemProvide=response.data.webItemInfoList[1].brief
			  	}else{
			  		_this.disabled=true
			  	}

			  }).catch(function (error) {

			      console.log(error);

			  })
			},
			//保存标题
			save(){
			  var _this = this

		      let param = new FormData();
		
		      var tokenone = sessionStorage.getItem('encryptToken');
			  
		      var detailId = sessionStorage.getItem('detailId');


		      param.append('token',tokenone);
			  param.append('id',detailId);
			  param.append('itemContent',this.itemContent);
			  param.append('itemProvide',this.itemProvide);
			  

			  this.$ajax.post('create/webRecommendItem',param).then(function (response) {
			  	console.log(response)
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

		       	 	path: '/flow/gather'

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
	  	@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-textarea{
		width: 100% !important;
	}
	.what{
		margin-bottom: 50px;
	}
}
</style>