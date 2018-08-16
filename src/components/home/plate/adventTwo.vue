<template>	
	<div >
<el-collapse v-model="activeName" accordion>
  		<el-collapse-item v-if="tableData!=0" v-for="(item,index) in tableData" :key="index"  >
  			<span v-if="item[0].name" slot="title" style="padding-left:15px;">
		      {{item[0].name}}
		    </span>
		  	<el-table
		  	    v-loading="loading"
				border
		    :data="item"
		    style="width: 90%;min-width:600px;"
		    max-height="300" >
		    <el-table-column
		      prop="date"
		      label="日期"
		      >
		    </el-table-column>
		    <el-table-column

		      prop="startTime"
		      label="时间"
		      >
		    </el-table-column>
		    <el-table-column
		      label="参与人数"
		      >
		      	<template slot-scope="scope">
			      	<a  v-if="scope.row.personAmount==0" >{{scope.row.personAmount}}</a>
			      	<a v-else="scope.row.personAmount" >{{scope.row.personAmount}}</a>
			    </template>	
		    </el-table-column>
		    <!-- <el-table-column
		      prop="address"
		      label="体验地点"
		      width="300">
		    </el-table-column> -->
		    <el-table-column
		      prop="recommendAmount"
		      label="价格"
		      >
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作">
		      <template slot-scope="scope">
		      	<a  class="detaletime"  v-if="scope.row.isNotDelete==true" @click="deleteRow(scope)">删除时间</a>
			    <a  class="apply"		v-else="scope.row.isNotDelete==false" @click="details(scope)">报名信息</a>
		      </template>
		    </el-table-column>
		  </el-table>
  		</el-collapse-item>
          <el-collapse-item  v-else>
                <span slot="title" style="padding-left:15px;">
                    暂无数据
                </span>
          </el-collapse-item>
</el-collapse>
		<el-dialog
		
		  :visible.sync="dialogVisible"

		  width="30%">
		  <template>
			  <el-table
			    :data="tableData1"
			    height="250"
			    border
			    style="width: 100%;margin-top:10px;">
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
				 activeName:0,
				 tableData1: [],
				 tableData: [],
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
				this.dialogVisible = true
				var _this=this
			    let param = new FormData();
			    var tokenone =sessionStorage.getItem('encryptToken');
				param.append('token',tokenone);
				param.append('id',scope.row.id);
				this.$ajax.post('query/orderUserData',param).then(function (response) {
					
					if (response.data.complete=="SUCCESS"){
						_this.tableData1=response.data.orderUserList
					}
				}).catch(function (error) {
				      console.log(error);
				});
			},
			handleClose(done) {

		    },
			deleteRow(index){
				var _this=this
			
				this.$alert('确认删除吗？', '删除', {
		        confirmButtonText: '确定',
		        callback: action => {
				    if (action=="confirm") {

					        _this.removei(index.row.id)
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
      		sortArr(arr, str) {
                var _arr = [],
                    _t = [],
                    // 临时的变量
                    _tmp;
                // 按照特定的参数将数组排序将具有相同值得排在一起
                arr = arr.sort(function(a, b) {
                    var s = a[str],
                        t = b[str];

                    return s < t ? -1 : 1;
                });

                if ( arr.length ){
                    _tmp = arr[0][str];
                }
                // console.log( arr );
                // 将相同类别的对象添加到统一个数组
                for (var i in arr) {
                   
                    if ( arr[i][str] === _tmp ){
                        
                        _t.push( arr[i] );
                    } else {
                        _tmp = arr[i][str];
                        _arr.push( _t );
                        _t = [arr[i]];
                    }
                }
                // 将最后的内容推出新数组
                _arr.push( _t );
                return _arr;
            },
      		advent(){
      		  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webRecommendOrder',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS"){
			  		setTimeout(function(){_this.loading=false},500)
    				let arr = response.data.orderUnfinishedList;
                    _this.tableData=_this.sortArr(arr,'recommendId')
			  		
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
	
		width: 80%;
	}
	.detaletime{
      display: block;
      padding:5px 10px ;
      width:30%;
       min-width:60px;
      margin: 0 auto;
      cursor: pointer;
      border: 1px solid rgb(0,128,186);

      background-color:white;
      color:rgb(0,128,186);
      border-radius:3px;
	}

</style>