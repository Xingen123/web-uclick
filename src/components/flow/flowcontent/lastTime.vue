<template>	
	<div class="sort">
		<div style="font-size: 28px;">最后报名时间</div>
		<p style="margin-top: 25px;width:550px;">对于不同的体验，您可能会希望预留不同得时间准备。以求给参与者提供一场最完美得体验。需要注意的是，参与者在购买体验的24小时之内有权利选择退款。因此在设定报名截止日期时，您也需要将这个考虑到其中。</p>	
		<div style="margin-top: 25px;font-size: 28px;">
			提前<el-input placeholder="0" style="width:100px;margin-top:25px;color:black;margin:0 10px;" @input="descInput" v-model="lasttime" :maxlength="3"></el-input>小时停止报名
		</div>	
	  <el-button type="primary"  style="display:block;margin-top:300px;width:100px;" :disabled="disabled" @click="thing">下一步</el-button>
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
				lasttime:""
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){
				if (this.lasttime.length>0) {
					this.disabled=false
				}
				else{
					this.disabled=true
				}
			},
			//获取用户输入的内容
			dabo(){
				var _this=this
		     	let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  this.$ajax.post('query/webRecommendDetail',param).then(function (response) {
			  	if (response.data.serverProvide!=null) {
			  		global.$emit("tabnine",true)
			  		_this.disabled=false
			  		_this.value5=response.data.serverProvide
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			//像后台发送用户输入的内容
			thing(){			
			  var _this=this
		      let param = new FormData();
		      console.log(this.value5)
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('serverProvide',this.value5);
			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabnine",true)
			  		 _this.$router.push({
				        path: '/flow/remark'
				    })
			  	}
			  	console.log(response)
			  }).catch(function (error) {
			      console.log(error);
			  })
			}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.dabo()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
</style>