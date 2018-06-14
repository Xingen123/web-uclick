<template>	
	<div class="sort">
		<div style="font-size: 28px;">体验最多参与人数</div>
		<p style="line-height:55px;">此次体验您最多能接待多少体验者？</p>

		<el-input v-model="input" @input="descInput" type="number"  onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" :maxlength="2" style="display:block;margin-top:20px;width:400px;" placeholder="请输入100以内的人数"></el-input>
	  <el-button type="primary"  style="display:block;margin-top:200px;width:100px;" :disabled="disabled" @click="go">下一步</el-button>
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
				input:""	
			}
		},
		props: {},
		watch:{

		},
		methods:{
		    descInput(){
				var txtVal = this.input.length;
 				if (txtVal>0) {
					this.disabled=false
					if(this.input<0){
						this.input=""
					}else if(this.input>99){
						this.input=""
					}
				}else{
					this.disabled=true
				}
			},
		    peoplenum(){
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
				  	if (response.data.serverAmount!=null) {
				  		global.$emit("tabtenTR",true)
				  		_this.disabled=false
				  		_this.input=response.data.serverAmount
				  	}
			  	}		  	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			go(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommendetailId
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('serverAmount',this.input);
			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {			
			  	if (response.data.complete=="SUCCESS") {
				  	global.$emit("tabtenTR",true)		
				  	_this.$router.push({
				        path: '/flow/lastTime'
				    })
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
			this.peoplenum()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
@media screen and (max-width: 600px) {
	.text_p,.el-input{
		width: 100% !important;
	}
}
</style>