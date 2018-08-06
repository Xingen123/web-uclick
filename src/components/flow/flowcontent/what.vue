<template>	
	<div class="what">
		<div style="font-size: 28px;">描述体验的内容</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">	除了个人魅力，体验本身是另一个吸引体验者的主要因素。有趣的活动、详细的流程、贴心的提示以及体验中随机出现的小惊喜都能让每个体验者爱上此次体验。
		</p>
		<el-input type="textarea"
		     :rows="8"  placeholder="喝过酸奶，但你喝过原料超超超超超丰富的酸奶吗？喝过大杯酸奶，但你喝过巨巨巨巨巨大杯的有料酸奶吗？

作为一枚吃货和猎奇家，我有。

不仅有料，超大杯（有一种大，叫做不亲眼见证感受不到到底有多大），它还有一系列的优点：颜值高、very上镜、自带吸睛属性、yummy、低脂（这个词可以默念三遍）、原料高级……可以说是酸奶界中的米其林三星了！吃货萌还在等什么？难得一见的极品酸奶，快来与我一起瓜分！
正文：除了个人魅力，体验本身是另一个吸引体验者的主要因素。有趣的活动、详细的流程、贴心的提示以及体验中随机出现的小惊喜都能让每个体验者爱上此次体验。" 
		     style="margin-top:50px;width:500px;font-size:20px;" 
		     v-model="itemContent"  
		     @input="descInput"
		    >
		</el-input>

			<div style="font-size: 28px;margin-top:25px;">此次活动体验者将获得什么？(选填)</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">建议站在体验者的角度，把本次体验您提供的东西尽可能多地逐条描述，更有条理的描述有助于提高体验的购买量。体验者获得的东西不仅可以是具象的实物，还可以是抽象的，比如：收获一些志同道合的朋友以及一场刺激惊艳的视觉体验。
Tips：为体验者准备一份额外的“秘密小惊喜”，会更容易获得好评哦！</p>
		<el-input type="textarea"
  :rows="8"  placeholder="例：1，帝都巨大杯酸奶（原料：新鲜进口水果、酸奶鲜果乐、希腊酸奶冰激凌……）
2，精致优雅的餐具
3，甜品
4，有鲜花、绿植、懒人沙发、电视机……的超美环境
5，单反相机" style="margin-top:50px;width:500px;font-size:20px;" :maxlength="250" v-model="itemProvide"  @input="descInputTO"></el-input>
		<el-button type="primary" plain style="width:100px;margin-top:50px;display:block;" @click="go" v-show="next">下一步</el-button>
		<div style="margin-top:50px;" v-show="button">
			<el-button type="primary"  style="width:100px;"  :disabled="disabled" @click="save(1)">保存</el-button>
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
				number:1500,
				timer:""
			}
		},
		props: {},
		watch:{

		},
		methods:{

			descInput(){
				var _this = this
				clearTimeout(this.timer)
				var txtVal = this.itemContent.length;
				this.timer =  setTimeout(function(){
					 _this.save('2')		  		
				},5000);
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			descInputTO(){
				var _this = this
				clearTimeout(this.timer)
				this.timer =  setTimeout(function(){
					 _this.save('2')		  		
				},5000);
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
			save(num){
			  var _this = this

		      let param = new FormData();
		
		      var tokenone = sessionStorage.getItem('encryptToken');
			  
		      var detailId = sessionStorage.getItem('detailId');


		      param.append('token',tokenone);
			  param.append('id',detailId);
			  param.append('itemContent',this.itemContent);
			  param.append('itemProvide',this.itemProvide);
			  

			  this.$ajax.post('create/webRecommendItem',param).then(function (response) {
			  	
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabsix",true)
			  		if (num == 1 ) {
			  		 _this.button=false
					 _this.next=true
			  		}
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

			

		},
		mounted () {
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
	.what{
		margin-bottom: 50px;
	}
}
</style>