<template>	
	<div class="gather">
		<div style="font-size: 28px;">添加体验地点</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">告诉大家体验地点在哪里，让体验者提前了解情况、查找路线，更好地为
体验做准备。</p>

	<!-- 	<div style="margin-top:25px;color:#505050;">第一步：提供地址</div>
		<div style="margin-top:25px;color:#505050;">地点名称</div>
		<el-input placeholder="办公室" style="width:500px;margin-top:25px;color:black;display:block;" v-model="specificAddress" ></el-input>
		<el-input placeholder="城市" style="width:500px;margin-top:25px;color:black;" v-model="form.city" ></el-input> -->
		<div style="margin-top:25px;color:#505050;">详细地址</div>
		<!-- <el-input ></el-input> -->


		<input type="text" placeholder="请输入地址" id="suggestId" name="address_detail"   v-model="address_detail" @input="descInput" class="input_style" style="width: 465px;
    border-radius: 5px; margin-top:25px;outline:none;height:40px;background:none;border:0px;border:1px solid #dcdfe6;" :class="{'active':tive==true,'unactive':tive==false}">
		<div style="margin-top:25px;color:#505050;">地点备注</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">如果您的体验地址不太好找，可以告诉它们一些找到的小技巧，如“在一家
咖啡馆对面”；您也可以在这里设定一个易于找到的集合地点，然后带领大家一起
到体验地点。</p>
		<el-input placeholder="街道"  style="width:500px;margin-top:25px;color:black;" v-model="specificAddress"></el-input>

		<div class="box">
			<!-- <div style="margin-top:25px;color:#505050;">第二步：在地图上标记</div>	 -->
			<div style="margin-top:25px;color:#505050;">地图针<br>拖动地图查看位置</div>
			<div id="allmap"></div>
		</div>

		<el-button type="primary" plain style="width:100px;margin-top:50px;display:block;" :disabled="disabled" @click="next">下一步</el-button>
	</div>
</template>
<script>
import global from '@/components/flow/global/global'
	export default{
		components:{
			
		},
		data(){
			return{
				tive:false,
				disabled:true,
				specificAddress:"",//办公室地址
				address_detail:null,//定位地址
               	userlocation:{lng:116.404,lat:39.915}
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){  
				var txtVal = this.address_detail.length;
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			//获取用户输入的值
			gather(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
 			  var detailId=sessionStorage.getItem('detailId');   

 			  param.append('token',tokenone);
 			  param.append('id',detailId);  
 			  
			  this.$ajax.post('query/webRecommendDetail',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		if (response.data.addressDetail!=null){
			  			global.$emit("tabseven",true)
			  			_this.disabled=false
			  			_this.address_detail=response.data.addressDetail
			  			_this.userlocation.lng=response.data.longitude
			  			_this.userlocation.lat=response.data.latitude  	
			  		}
			  		if(response.data.specificAddress!="undefined") {
			  			_this.specificAddress=response.data.specificAddress
			  		}		
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })
			},

			mapgo(){
				  var _this=this
			      let param = new FormData();
			      //获取cookie里面的token
			      var tokenone =sessionStorage.getItem('encryptToken');
			      var detailId=sessionStorage.getItem('detailId');

				  param.append('id',detailId);
				  param.append('token',tokenone);
				  param.append('specificAddress',this.specificAddress);
				  param.append('addressDetail',this.address_detail);
				  param.append('longitude',this.userlocation.lng);
				  param.append('latitude',this.userlocation.lat);

				  this.$ajax.post('create/webRecommendDetail',param).then(function (response) {

				  	if (response.data.complete=="SUCCESS") {
				  		global.$emit("tabseven",true)
				  		_this.$router.push({
			       			 path: '/flow/require'
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
			},
			//保存标题
			next(){
				
				// alert(this.userlocation.lat)
				if (this.tive==true) {
					this.mapgo()	
				}else{
					this.$message('请重新选择街道地址');  
				}
			}
		},
		computed:{

		},
		beforeCreate() {
			
		},
		created () {},
		mounted () {
			this.gather()
			this.$nextTick(function () {
					// console.log(2)
                   var th = this
                   // 创建Map实例
                   var map = new BMap.Map("allmap");
                   // 初始化地图,设置中心点坐标，
		    	   var point = new BMap.Point(th.userlocation.lng,th.userlocation.lat); // 创建点坐标，汉得公司的经纬度坐标
                   map.centerAndZoom(point, 15);
                   map.enableScrollWheelZoom();
                   var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                       {
                           "input": "suggestId"
                           , "location": map
                       })
                   var myValue
                   ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
                       var _value = e.item.value;
                       th.tive=true
                       myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                       th.address_detail = myValue
                       setPlace();
                   });
                   function setPlace() {
                       map.clearOverlays();    //清除地图上所有覆盖物
                       function myFun() {
                           th.userlocation = local.getResults().getPoi(0).point;
                           map.centerAndZoom(th.userlocation, 18);
                           map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
                       }
                       var local = new BMap.LocalSearch(map, { //智能搜索
                           onSearchComplete: myFun
                       });
                       local.search(myValue);
                       //测试输出坐标（指的是输入框最后确定地点的经纬度）
                       map.addEventListener("click",function(e){
                           //经度
                           //维度
                           // console.log(e.userlocation.lat);

                       })
                   }
                   
           })
			
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-input,#suggestId{
		width: 100% !important;
	}
	.gather{
		margin-bottom: 50px;
	}
}
	#allmap{
		margin-top: 10px;
		width: 350px;
		height: 300px;
	}
	/*.input_style{
		border-radius: 4px;
		display: inline-block;
	    font-size: inherit;
	    height: 40px;
	    padding: 0 15px;
	}*/
	.active{
		color: black;
	}
	.unactive{
		color:gray;
	}
	.el-input__inner{
		color: none;
	}
</style>