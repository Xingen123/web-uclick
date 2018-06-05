<template>	
	<div class="slogan">
		<div style="font-size: 28px;">您对体验者有哪些特殊需要？</div>
		<p style="margin-top:25px;color:#505050;width:550px;">预定此次体验的体验者可能会为他人预定名额，为保证这个体验的安全，请您添加此次体验参与者的需求。例如年龄、技能水平、证书证明或需自带物品等需求。</p>
		<div class="age">
			<div style="font-size:18px;">最低年龄</div>
			<p style="line-height:40px;">为参与者设定年龄限制，未成年人必须有监护人的陪同下可参加。</p>
			<el-input v-model="age" placeholder="请输入0~70以内的年龄" :maxlength="2" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"  :min="min"  :max="max"  style="width:200px;" @input="desage" type="number"></el-input>
		</div>
		<div style="margin-top:80px;">
			<div style="font-size:18px;">其他要求</div>
			<el-input v-model="exet" type="textarea"
  :rows="5"
  placeholder="例：记得穿你最好看的衣服来。" style="margin-top:10px;width:500px;" :maxlength="100"  @input="descInput"></el-input>
		</div>
		<p  style="line-height:40px;">还剩{{number}}个字</p>
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
				number:100,
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
	 				if(this.age<0){
						this.age=""
					}else if(this.age>70){
						this.age=""
					}
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			descInput(){
				var txtVal = this.exet.length;
				if (txtVal<101) {
					this.number = 100 - txtVal;
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
			  	if (response.data.complete=="SUCCESS") {
			  		if (response.data.age!=null) {
			  			global.$emit("tabtenT",true)
				  		_this.disabled=false
				  		_this.age=response.data.age
				  		_this.exet=response.data.joinerReqire
				  		
			  		}
			  		if (response.data.joinerReqire) {
			  			_this.number=100-response.data.joinerReqire.length
			  		}
			  	}
			  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			sort(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('age',this.age);
			  if (this.exet!="") {
			  	param.append('joinerReqire',this.exet);
			  }
			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {		
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabtenT",true)
			  	_this.$router.push({
			        path: '/flow/peoplenum'
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
			this.require()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.age{
		margin-top: 50px;
	}
</style>