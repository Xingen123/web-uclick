<template>	
	<div style="margin-bottom: 150px;">
		<div class="advent">
		<div style="font-size:28px;">即将到来的体验</div>
		<div style="width:100%;margin-top:10px;">
		  	<el-table
		  	    v-loading="loading"

		    :data="tableData5"
		    style="width: 100%;border:1px solid #DCDFE6;"
		    max-height="300" >
		    <el-table-column
		      fixed
		      prop="name"
		      label="体验名称"
		      width="300">
		    </el-table-column>
		    <el-table-column
		      prop="date"
		      label="日期"
		      width="120">
		    </el-table-column>
		    <el-table-column

		      prop="endTime"
		      label="时间"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      label="参与人数"
		      width="120">
		      	<template slot-scope="scope">
			      	<a style="" v-if="scope.row.personAmount==0" >{{scope.row.personAmount}}</a>
			      	<a style="color:#409EFF;cursor:pointer;" v-else="scope.row.personAmount" @click="details(scope)">{{scope.row.personAmount}}</a>
			    </template>	
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="体验地点"
		      width="300">
		    </el-table-column>
		    <el-table-column
		      prop="recommendAmount"
		      label="价格"
		      width="150">
		    </el-table-column>
		    <el-table-column
		    	 
		         prop="amount"
		      label="预计收益"
		      width="300">
		     
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作">

		      <template slot-scope="scope">

		        <el-button
		         v-if="scope.row.isNotDelete==true"
		          @click.native.prevent="deleteRow(scope, tableData5)"
		          type="text"
		          size="small">
		          删除
		        </el-button>

 				<el-button
		          v-if="scope.row.isNotDelete==false"
		          type="text"
		          style="color:red;"
		          size="small">
		          无法删除
		        </el-button>

		      </template>
		    </el-table-column>
		  </el-table>
		</div>
		</div>


		<div class="record">
			<div style="font-size:28px;">已完成的体验</div>
			<div style="width:100%;margin-top:10px;overflow-x:hidden;">
			  	<el-table
			    :data="tableData4"
			    v-loading="loading"
			    style="width: 100%;border:1px solid #DCDFE6;"
			    max-height="300" >
				<el-table-column
			      fixed
			      prop="name"
			      label="体验名称"
			      width="300">
			    </el-table-column>
			    <el-table-column
			      prop="date"
			      label="日期"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="startTime"
			      label="时间"
			      width="120">
			    </el-table-column>
			    <el-table-column
			      label="参与人数"
			      width="120">
				 <template slot-scope="scope">
				 	<a style="" v-if="scope.row.personAmount==0" >{{scope.row.personAmount}}</a>
			      	<a style="color:#409EFF;cursor:pointer;" v-else="scope.row.personAmount" @click="details(scope)">{{scope.row.personAmount}}</a>
			    </template>	

			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="体验地点"
			      width="300">
			    </el-table-column>
			    <el-table-column
			      prop="recommendAmount"
			      label="价格"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="amount"
			      label="预计收益"
			      width="300">
			    </el-table-column>
		    	<el-table-column
				      fixed="right"
				     >
				 <template slot-scope="scope">
					       
				 </template>
		    	</el-table-column>
		  		</el-table>
			</div>
		</div>


		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <template>
			  <el-table
			    :data="tableData3"
			    height="250"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="name"
			      label="姓名"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="mobile"
			      label="电话"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="comment"
			      label="备注">
			    </el-table-column>
			  </el-table>
			</template>
		  
		</el-dialog>
	</div>
</template>
<script>
	export default{
		components:{
		},
		data(){
			return{
				 tableData3: [],
				 tableData4: [],
				 tableData5: [],
				 loading: true,
				 dialogVisible: false
			}
		},
		props: {},
		watch:{

		},
		methods:{
			//点击人数
			details(scope){
				console.log(scope)
				this.dialogVisible = true
				var _this=this
			    let param = new FormData();
			    var tokenone =sessionStorage.getItem('encryptToken');
				param.append('token',tokenone);
				param.append('id',scope.row.id);
				this.$ajax.post('query/orderUserData',param).then(function (response) {
					
					if (response.data.complete=="SUCCESS"){
						_this.tableData3=response.data.orderUserList
					}
				}).catch(function (error) {
				      console.log(error);
				});
			},
			handleClose(done) {

		    },
			deleteRow(index, rows){
				var _this=this
				
				this.$alert('确认删除吗？', '删除', {
		        confirmButtonText: '确定',
		        callback: action => {
				    if (action=="confirm") {
					        _this.removei(rows[index.$index].id)
				    }else{
				    	
				          	this.$message("取消删除成功");
				          }
		          	}
		        });
      		},
      		removei(id){
      		  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  param.append('id',id);
			  this.$ajax.post('delete/webRecommendTime',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS"){
			  		_this.$message("删除成功");
			  		_this.advent()
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
      		},
      		advent(){
      		  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webRecommendOrder',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS"){
			  		setTimeout(function(){_this.loading=false},500)
			  		
			  		_this.tableData5=response.data.orderUnfinishedList
			  		_this.tableData4=response.data.orderCompleteList
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
      		}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.advent()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.advent{
		margin: 0 auto;
		margin-top: 300px;
		width: 80%;
	}
	.record{
		margin: 0 auto;
        margin-top:30px;
		width: 80%;
	}
</style>