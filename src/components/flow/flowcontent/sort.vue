<template>	
	<div class="sort">
		<div class="sortp" style="font-size: 28px;">您提供的体验是什么类型的？</div>
		<p  class="text">一个清晰的体验类别可以帮助您交到更合拍的朋友。如果您的体验同时也属于其他类别，便请再添加一个类别。</p>
		<el-select v-model="value" placeholder="请选择" class="sortinput"  v-on:input="inputFunc">
	    <el-option
	      v-for="item in options"
	      :key="item.id"
	      :label="item.name"
	      :value="item.id">
	    </el-option>
	  </el-select>
	  <el-button type="primary"  style="display:block;margin-top:100px;width:100px;" :disabled="disabled" @click="cover">下一步</el-button>
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
				options:[],
		        value: ''
			}
		},
		watch: {  
		},  
		props: {

		},
		watch:{

		},
		methods:{
			inputFunc(){
				if (this.value!="") {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			//调取用户输入的value
			next () {
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var recommend =sessionStorage.getItem('recommendId');
			  param.append('id',recommend); 
			   
			  this.$ajax.post('query/webRecommend',param).then(function (response) {
			  	// 
			  	if (response.data.recommendType!=null) {
			  		global.$emit("tabone",true)
			  		_this.disabled=false
			  	}
			  	_this.value=response.data.recommendType
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			// 添加类型的option数据的获取
			sort () {
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone); 
			  this.$ajax.post('query/webRecommendType',param).then(function (response) {
			  	let webTypeInfoList=response.data.webTypeInfoList
			  	// console.log(webTypeInfoList)
			  	_this.options=webTypeInfoList	
			  }).catch(function (error) {
			      console.log(error);
			  })
			},

			//下一步提交按钮传用户选的value
			cover () {
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
		      //获取cookie里面的recommenid
		      var recommend =sessionStorage.getItem('recommendId');
		      // console.log(tokenone,recommend)

			  param.append('id',recommend);   
			  param.append('token',tokenone);
			  param.append('recommendType',this.value);
			  this.$ajax.post('create/webRecommend',param).then(function (response) {
			  	console.log(response)
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabone",true)
			  		_this.one=true
			  		_this.$router.push({
		        	  path: '/flow/cover'
		      		})
			  	}

			  	
			  }).catch(function (error) {
			      console.log(error);
			  });
		    }
		},
		computed:{
		},
		created () {
			this.next()
			this.sort()
		},
		mounted () {},
	  	destroyed () {}
	} 
</script>
<style scoped>
.text{
	color:#505050;
	width:550px;
}
.sortinput{
	margin-top:40px;
	width:400px;
}
@media screen and (max-width: 600px) {
    .content{
		 padding-left: 30px !important;

	}
	.sortp{
		font-size: 25px !important;
	}
	.text{	
		width:90% !important;
	}
	.sortinput{
		width:200px !important;
	}
}
</style>