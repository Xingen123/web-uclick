<template>	
	<div class="sort">
		<div style="font-size: 28px;">体验报名截止时间</div>
		<p style="margin-top: 25px;width:550px;" class="text_p">为给体验者提供一场高质、独一无二且印象深刻的体验，您可能会希望不同的体验能预留不同的时间提前准备。需要注意的是，体验者在购买体验的24小时之内有权利选择退款。因此，在设定体验报名截止时间时，您也需要将体验者的退款时间计算到其中。</p>	
		<div style="margin-top: 25px;font-size: 28px;">
			提前<el-input placeholder="0" style="width:80px;margin-top:25px;color:black;margin:0 10px;" @input="descInput" v-model="lasttime" :maxlength="3"></el-input>小时停止报名
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
			  	
			  	if (response.data.readyTime) {
			  		global.$emit("tabnine",true)
			  		_this.disabled=false
			  		_this.lasttime = response.data.readyTime
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			//像后台发送用户输入的内容
			thing(){		

			  var _this=this

		      let param = new FormData();

		      var tokenone =sessionStorage.getItem('encryptToken');
		      var detailId=sessionStorage.getItem('detailId');

			  param.append('token',tokenone);
		      
			  param.append('id',detailId);

			  param.append('readyTime',this.lasttime);
			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabnine",true)
			  		 _this.$router.push({
				        path: '/flow/price'
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
		created () {},
		mounted () {
			this.dabo()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-button{
		margin-top: 100px !important;
	}
	.sort{
		margin-bottom: 50px;
	}
}
</style>