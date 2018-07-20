
<template>	
	<div class="project">
		<div class="box" v-for="(item,index) in project" :key="index">
			<div class="status">
				<el-progress style="line-height:0;"  :text-inside="true" :stroke-width="17" :percentage="item.completeAmount" ></el-progress>
				<img style="position:absolute;top:0px;left0;z-index:-1;width:100%;height:100%;border-radius:5px;" v-if="!item.imageUrl" v-lazy="" alt="" :onerror="defaultImg">
				<img style="position:absolute;top:0px;left0;z-index:-1;width:100%;height:100%;border-radius:5px;" v-if="item.imageUrl" v-lazy="item.fileServer+'/'+item.imageUrl" alt="" :onerror="defaultImg">
			</div>
			<div class="content">
				<div style="font-size:25px;">{{item.title}}</div>
				<p>在您提交体验前,还需要完成几个步骤。</p>
				<div style="margin-top:25px;" class="phonenext">

					<!-- 创建中 -->
					<el-button type="primary"  class="next" v-if='item.examineType=="INITIALIZATION"' @click="nextFlow(item.id)">继续</el-button>

					<!-- 审核中 -->
					<el-button type="primary"  class="next" v-if='item.examineType=="SUBMIT_EXAMINE" && item.completeAmount==100' @click="nextFlow(item.id)">继续</el-button>
					<el-button type="primary" plain class="next" v-if='item.examineType=="SUBMIT_EXAMINE" && item.completeAmount==100' @click="$router.push({
			       	 path: '/verification'
			      	})">身份验证</el-button>


					<!-- 审核完成 -->		
					<el-button type="primary"  plain class="next" v-if='item.examineType=="EXAMINE_PASS"' @click="time(item.detailId)">体验时间</el-button>			
					<el-button type="primary" plain v-if='item.examineType=="EXAMINE_PASS"'  @click="Flow(item.id)">修改体验创意</el-button>


				</div>
			</div>
			
			<el-dropdown trigger="click" style="margin-top:25px;margin-left:90px;cursor: pointer;" class="phonetitle" :placement="localtion">
			      <span class="el-dropdown-link">
			       <i class="el-icon-more"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown" >
			        <el-dropdown-item v-if="item.isNotDelete==true" ><el-button type="text" @click="remove(item.id)">删除体验</el-button></el-dropdown-item>
			        <el-dropdown-item v-if='item.examineType=="EXAMINE_PASS"'><el-button type="text"  @click="revocation(item.id)">申请下架体验</el-button></el-dropdown-item>
			        <el-dropdown-item v-if="item.isNotDelete==false" :disabled="true" >无法删除体验</el-dropdown-item>
			      </el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
import store from '@/store/store'
	export default{
		components:{

		},
		data(){
			return{
				defaultImg: 'this.src="' + require('../img/loading.gif') + '"',
				project:[],
				smallbox:null,
				localtion:'bottom-end'
			}
		},
		props: {},
		watch:{
			project: function() {
				var _this=this
			    this.$nextTick(function(){
			        _this.$store.state.ischild = true
			    })
			}
		},
		methods:{
			revocation(id){
				var _this=this
				this.$confirm('再次修改体验内容将会导致您的体验暂时下架，并且，再对修改的内容审核通过之前，您都无法在app中看到此体验，参与者也无法购买，是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
			      let param = new FormData();
			      var tokenone =sessionStorage.getItem('encryptToken');
				  param.append('token',tokenone); 
				  param.append('id',id);  
				  _this.$ajax.post('update/recommendStatus',param).then(function (response) {
				  	if (response.data.complete=="SUCCESS") {
				  		_this.dsds()
				  		_this.$message({
						    type: 'success',
						    message: '申请下架成功，请等待...'
						});
				  	}
				  }).catch(function (error) {
				      console.log(error);
				  });
				}).catch(() => {
		          _this.$message({
		            type: 'info',
		            message: '已取消下架'
		          });          
		        });  
			},
			//查看用户创建完的体验
			Flow(id){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone); 
			  var recommend =sessionStorage.getItem('recommendId');
			  param.append('id',id);  
			  this.$ajax.post('query/webConvoy',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.$router.push({
			       	 path: '/flow/sort'
			      	})
				  	sessionStorage.setItem('detailId',response.data.detailId)
				  	sessionStorage.setItem('recommendId',response.data.id)
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			//继续用户的体验创建
			nextFlow(id){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone); 
			  param.append('id',id);  
			  this.$ajax.post('query/webConvoy',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.$router.push({
			       	 path: '/flow'
			      	})
				  	sessionStorage.setItem('detailId',response.data.detailId)
				  	sessionStorage.setItem('recommendId',response.data.id)
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			//查询用户的体验
			dsds(){
				const loading = this.$loading({
			      lock: true,
			      text: 'Loading',
			      target: document.querySelector('.box')
			    });

			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);  
			  this.$ajax.post('query/webRecommendByUser',param).then(function (response) {
			  	if (response.data.webRecommendInfoList!="") {
			  		loading.close();
			  		_this.project=response.data.webRecommendInfoList
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			remove(id){
				var _this=this
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	 let param = new FormData();
				      var tokenone =sessionStorage.getItem('encryptToken'); 
					  param.append('token',tokenone);  
					  param.append('id',id);
					  _this.$ajax.post('delete/recommend',param).then(function (response) {
					  	if (response.data.complete=="SUCCESS") {
					  		_this.dsds()
					  		_this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					  	}
					  }).catch(function (error) {
					      console.log(error);
					  });
		          
		        }).catch(() => {
		          _this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });	      
			},
			clientWidth(){
				let width = document.body.clientWidth;
				if(width<600){
					this.localtion='bottom-end'
				}
			},
			time(id){
				this.$router.push({
		       	 path: '/calendar/'+id
		      	})
			}

		},
		computed:{

		},
		created () {},
		mounted () {
			this.dsds()
			this.clientWidth()
			
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.project{
	width: 100%;
	
}
.box{
	width: 60%;
	margin: 20px auto;
	padding: 20px;
	overflow: hidden;
	border-bottom:1px solid #E4E7ED;
}
.box>div{
	float: left;
	
}

.status{
	width: 200px;
	height: 150px;
	border-radius: 5px;
	position: relative;
	background-repeat: no-repeat;
	background-size:100% 100%; 
	overflow: hidden;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px !important;
}
.status>img{

	border: none;
	transition: all 0.6s;
}
.status:hover>img{  	
   	transform: scale(1.2);
}  
.content{
	width: 480px;
	height: 170px;
	padding-left: 20px;
}
.el-icon-more{
	font-size: 28px;
}
.content>p{

}

.removebox{
	width: 200px;
	height: 100px;
	border: 1px solid red;
	
}
.newidea{
	width: 100px;
}
@media screen and (max-width:1167px) {
	.content{
		padding-left: 0px !important;
	}
}
@media screen and (max-width:600px) {
	.el-button+.el-button{
	margin-left: 0px !important;
	margin-top: 10px;
}
	.box{
		padding: 0px !important;
		position: relative;
	}
	.status{
		height: 180px;
	}
	.status,
	.content{
		width: 100% !important;
	}
	.phonenext{
		margin-top:30px !important;
		margin-left: 0 !important;
	}
	.phonetitle{
		position: absolute;
		margin-top: 0px !important;
	    top: 200px;
	    right: 0;
		margin-left: 0 !important;

	}
.project{
	border-top: 1px solid #E4E7ED;
	margin-top: 20px;
}
	.content{
		height: 180px;
		margin-top: 10px;
	    padding-left: 0;
	    padding-bottom: 50px;
	}
	.el-button--primary {
    width: 100%;
	}
}
</style>