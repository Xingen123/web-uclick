<template>	
	<div class="time">
		<div style="font-size: 28px;">您的体验最想要在哪个时间段开设？</div>
		<p style="margin-top:25px;color:#505050;width:500px;" class="text_p">为了保证您的体验能够给体验者带去更多快乐和幸福感，请提前设定您的意向体验时间。我们会帮您测试时间段与体验内容是否适配。
</p>

		<div class="box">
		  <el-time-select
		    placeholder="起始时间"
		    v-model="startTime"
		    :picker-options="{
		      start: '00:00',
		      step: '00:30',
		      end: '24:00'
		    }">
		  </el-time-select>
		  <span style="padding-left:10px;padding-right:10px;">至</span>
		  <el-time-select
		    placeholder="结束时间"
		    v-model="endTime"
		    :picker-options="{
		      start: '00:00',
		      step: '00:30',
		      end: '24:00',
		      minTime: startTime
		    }"  v-on:input="inputFunc" >
		  </el-time-select>
		</div>

		<el-button type="primary"  style="margin-top:50px;font-size: 18px;" :disabled="disabled" @click="next">下一步</el-button>
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
				startTime: '',
        		endTime: ''
			}
		},
		props: {},
		watch:{

		},
		methods:{
			inputFunc(){
				if (this.value=="") {
					this.disabled=true
				}else{
					this.disabled=false
				}
			},
			//获取用户输入的内容
			ment(){
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
			  		if (response.data.defaultTime!=null) {
			  			global.$emit("tabfour",true)
				  		_this.disabled=false
				  		var  defaultTime  = response.data.defaultTime
					  	var  sTime =defaultTime.substring(0,5)
					  	var  eTime =defaultTime.substring(6,12)
					  	_this.startTime=sTime
					  	_this.endTime=eTime
			  		}
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			next(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var detailId=sessionStorage.getItem('detailId');
			  param.append('id',detailId);
			  param.append('defaultTime',this.startTime+"-"+this.endTime);
			  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {
			  	
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabfour",true)
			  		_this.$router.push({
		        	  path: '/flow/thing'
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
			this.ment()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.box{
		margin-top: 50px;
	}
		@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-input{
		width: 40% !important;
	}
}
</style>