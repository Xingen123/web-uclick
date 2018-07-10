<template>
<div class="phone">
	<div class="box">
		<div >
			<div class="small">
				<div style="width:100%;height:30px;line-height:30px; background:#333237;text-align:center; color:white;">
					<i class="el-icon-arrow-left" style="float:left;margin-left:10px;line-height:30px;"></i>
					{{obj}} 
					<i class="el-icon-more" style="float:right;margin-right:10px;line-height:30px;"></i>
				</div>
				<el-carousel v-if="imglist.length>0" indicator-position="outside" height="400px" style="width:100%;">
					<el-carousel-item  v-for="(item,index) in imglist" :key="index">
					    <img v-lazy="imghead +'/'+ item.imgUrl" alt="" width="100%">
					</el-carousel-item>
				</el-carousel>
				<div class="active">
					<div style="font-weight: bold;padding-top:10px;border-top:1px solid #E4E7ED;">{{name}}</div>
					<p v-if="title" style="color:gray;padding-bottom:10px; border-bottom:1px solid #E4E7ED;">{{title}}</p>
					<div v-for="item in webItemInfoList" style="padding-top:10px; padding-bottom:10px;border-bottom:1px solid #E4E7ED;">
						<div style="font-size:16px;">体验内容</div>
						<p style="font-size:14px;margin-top:5px; color:#909399;">{{item.brief}}</p>
					</div>
					<div style="width:100%;border-bottom:1px solid #E4E7ED;padding-bottom:10px;" v-show="mapA">
						<div  style="margin-top:5px;font-size:16px;">体验地点</div>
						<div  style="margin-top:5px;font-size:14px;color:#909399;">{{addressDetail}}</div>
						<div  style="width:100%;height:250px;" id="dituContent"></div>
					</div>
					
					<div  v-if="price" style="padding-top:10px;">价格</div>
					<p    v-if="price" style="font-size:14px;margin-top:5px; color:#909399;border-bottom:1px solid #E4E7ED;padding-bottom:10px;">￥{{price}}</p>
					<div  v-if="serverAmount" style="padding-top:10px;">最多参加人数</div>
					<p    v-if="serverAmount" style="font-size:14px;margin-top:5px; color:#909399;border-bottom:1px solid #E4E7ED;padding-bottom:10px;">{{serverAmount}}人</p>
					<div  v-if="age" style="padding-top:10px;">参加者最低年龄</div>
					<p    v-if="age" style="font-size:14px;margin-top:5px; color:#909399;border-bottom:1px solid #E4E7ED;padding-bottom:10px;">{{age}}岁</p>
					<div  v-if="defaultTime" style="padding-top:10px;">体验时间</div>
					<p    v-if="defaultTime" style="font-size:14px;margin-top:5px; color:#909399;border-bottom:1px solid #E4E7ED;padding-bottom:10px;">{{defaultTime}}</p>
					<div  v-if="joinerReqire" style="padding-top:10px;">参加者要求</div>
					<p    v-if="joinerReqire" style="font-size:14px;margin-top:5px; color:#909399;border-bottom:1px solid #E4E7ED;padding-bottom:10px;">{{joinerReqire}}</p>

				</div>
				
			</div>
		</div>
	</div>
</div>	
</template>
<script>
	export default{
		components:{
		},
		data(){
			return{
			  obj:"",
			  head:"",
			  name:"",
			  title:"",
			  defaultTime:"",
			  age:"",
			  price:"",
			  joinerReqire:"",
			  webItemInfoList:[],
			  serverProvide:"",
			  //地点
			  serverAmount:"",
			  addressDetail:"",
			  imglist:[],
			  imghead:"",
			  mapA:false
			}
		},
		props: {

		},
		watch:{ 
		  '$route' (to, from) {  
		    // data数据操作  
		    this.allState()
		  }  
		},
		methods:{
		    allState(){
              var _this=this
              let param = new FormData();
              var tokenone =sessionStorage.getItem('encryptToken');
              param.append('token',tokenone);
              var recommend =sessionStorage.getItem('recommendId');
              param.append('id',recommend);  
              this.$ajax.post('query/webConvoy',param).then(function (response) {
                if (response.data.complete=="SUCCESS"){
                	if (response.data.addressDetail) {
                		_this.addressDetail=response.data.addressDetail
                		_this.mapA=true
                	}
                		_this.imghead=response.data.fileServer
                		_this.obj=response.data.recommendTypeName
                		_this.name=response.data.name
                		_this.title=response.data.title
                		_this.age=response.data.age
                		_this.defaultTime=response.data.defaultTime
                		_this.webItemInfoList=response.data.webItemInfoList
                		_this.serverProvide=response.data.serverProvide
                		_this.joinerReqire=response.data.joinerReqire
                		_this.price=response.data.price
                		_this.serverAmount=response.data.serverAmount    		
                		
                		// //封面图片
                		let b = response.data.recomemndPictureInfoList
                		_this.imglist=b
                		_this.createMap(response.data.longitude,response.data.latitude)
                }
              }).catch(function (error) {
                  console.log(error);
              });
            },
		    createMap(lat,log){
		        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
		        var point = new BMap.Point(lat,log);//定义一个中心点坐标
		        map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
				var marker = new BMap.Marker(point);  // 创建标注
				map.addOverlay(marker);               // 将标注添加到地图中
		    }       
		},
		computed:{

		},
		created () {
			
		},
		mounted () {			
			this.allState()

		},
	  	destroyed () {}
	} 
</script>
<style scoped>

    .phone{
        animation-duration: 1s;
        animation-name: key;
        animation-fill-mode: both;

    }
    @keyframes key{
		0% {
		    -webkit-transform: perspective(400px) rotateX(90deg);
		    transform: perspective(400px) rotateX(90deg);
		    opacity: 0;
		}

		0%, 40% {
		    -webkit-animation-timing-function: ease-in;
		    animation-timing-function: ease-in;
		}
		40% {
		    -webkit-transform: perspective(400px) rotateX(-20deg);
		    transform: perspective(400px) rotateX(-20deg);
		}
		60% {
		    -webkit-transform: perspective(400px) rotateX(10deg);
		    transform: perspective(400px) rotateX(10deg);
		    opacity: 1;
		}
		80% {
		    -webkit-transform: perspective(400px) rotateX(-5deg);
		    transform: perspective(400px) rotateX(-5deg);
		}
		100% {
		    -webkit-transform: perspective(400px);
		    transform: perspective(400px);
		    }
    }
.phone{
 	width: 330px;
 	height: 550px;
 	padding-top: 70px;
 	background:url(../img/phone.png) no-repeat;
	background-size: 100% 100%;
	margin: 10px auto;
	margin-top: 80px;
	    border-radius: 28px;
    -moz-box-shadow: 4px 5px 20px #8C8C8C;
    box-shadow: 4px 5px 20px #8C8C8C;
}
.small{	
	width:300px;
	height: 450px;
	border:1px solid #E4E7ED;
	margin:0 auto;
	overflow:auto;
}
 .small::-webkit-scrollbar {
    display: none;
}
.active{
	padding-left: 10px;
	padding-right: 10px;
	padding-bottom: 20px;
} 
.BMap_Marker>div>img {width:50px;position:relative;top:60px;left:50%;}
/*.el-carousel__container{
	height: 200px !important;
}*/
/*  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }*/
</style>
