<template>	
	<div class="sort">
		<div style="font-size: 28px;">请确认将提供的内容</div>
		<p style="margin-top: 25px;width:550px;" class="text_p">如果您为体验者准备了详细的体验用品请在此页描述出来，如咖啡、小吃、住宿等。每一个细心之处都是体验者选择再次参加体验的原因。</p>
		<el-select v-model="value5" placeholder="请选择" multiple style="margin-top:40px;width:400px;"  @input="descInput">
	    <el-option
	      v-for="item in options"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	  </el-select>
	  <el-button type="primary"  style="display:block;margin-top:300px;width:100px;" class="next" :disabled="disabled" @click="thing">下一步</el-button>
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
				options: [{
		          value: '餐饮',
		          label: '餐饮'
		        }, {
		          value: '餐食',
		          label: '餐食'
		        }, {
		          value: '饮品',
		          label: '饮品'
		        }, {
		          value: '住宿',
		          label: '住宿'
		        }, {
		          value: '门票',
		          label: '门票'
		        }, {
		          value: '交通',
		          label: '交通'
		        }, {
		          value: '设备',
		          label: '设备'
		        }, {
		          value: '小吃',
		          label: '小吃'
		        }
		        ],
		        value5:[]
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){
				if (this.value5.length>0) {
					this.disabled=false
				}else{
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
			  	if (response.data.serverProvide){
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
				        path: '/flow/gather'
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
	.el-select{
		width: 100% !important;
	}
	.next{
		margin-top:150px !important;
	}
}
</style>