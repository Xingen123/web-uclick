<template>
<div class="phone">
	<div class="box">
		<div >
			<div class="small">
				<div style="width:100%;height:30px;line-height:30px; background:#333237;text-align:center; color:white;"><div style="float:left;margin-left:10px;font-size:20px;line-height:30px;"> < </div>{{title}} <div style="float:right;margin-right:10px;font-size:30px;line-height:10px;">...</div></div>
				<div style="width:100%;"><img width="100%" v-lazy="head" alt=""></div>
				<div class="active">
					<div style="font-weight: bold;margin-top:5px;">{{name}}</div>
					<p style="margin-top:5px;color:gray;padding-bottom:10px; border-bottom:1px solid #E4E7ED;">{{title}}</p>
					<div v-for="item in webItemInfoList" style="padding-top:10px; padding-bottom:10px;border-bottom:1px solid #E4E7ED;">
						<div style="font-size:16px;">{{item.name}}</div>
						<p style="font-size:14px;margin-top:5px; color:#909399;">{{item.brief}}</p>
					</div>
					<div style="margin-top:5px;font-size:16px;">体验地点</div>
					<div style="margin-top:5px;font-size:14px;color:#909399;">{{addressDetail}}</div>
					 <div style="width:100%;height:250px;margin-top:10px;" id="dituContent"></div>
					<div style="padding-top:10px;border-top:1px solid #E4E7ED;margin-top:10px;">价格</div>
					<p style="font-size:14px;margin-top:5px; color:#909399;">￥{{age}}</p>
					<div style="padding-top:10px;border-top:1px solid #E4E7ED;margin-top:10px;">最多参加人数</div>
					<p style="font-size:14px;margin-top:5px; color:#909399;">{{serverAmount}}</p>
					<div style="padding-top:10px;border-top:1px solid #E4E7ED;margin-top:10px;">参加者最低年龄{{age}}岁</div>
					<div style="padding-top:10px;border-top:1px solid #E4E7ED;margin-top:10px;">体验时间</div>
					<p style="font-size:14px;margin-top:5px; color:#909399;">{{defaultTime}}</p>
					<div style="padding-top:10px;border-top:1px solid #E4E7ED;margin-top:10px;">参加者要求</div>
					<p style="font-size:14px;margin-top:5px; color:#909399;">{{joinerReqire}}</p>
					<el-carousel indicator-position="outside" height="220px" style="margin-top:10px;">
					    <el-carousel-item v-for="(item,index) in imglist" :key="index">
					      <img v-lazy="imghead +'/'+ item.imgUrl" alt="" width="100%">
					    </el-carousel-item>
					</el-carousel>
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
			  imghead:""
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
                		_this.imghead=response.data.fileServer
                		_this.head=response.data.fileServer+'/'+response.data.imageUrl
                		_this.name=response.data.recommendTypeName
                		_this.title=response.data.title
                		_this.age=response.data.age
                		_this.defaultTime=response.data.defaultTime
                		_this.webItemInfoList=response.data.webItemInfoList
                		_this.serverProvide=response.data.serverProvide
                		_this.joinerReqire=response.data.joinerReqire
                		_this.price=response.data.price
                		_this.serverAmount=response.data.serverAmount    		
                		_this.addressDetail=response.data.addressDetail
                		_this.imglist=response.data.recomemndPictureInfoList
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
 	width: 370px;
 	height: 650px;
 	padding-top: 70px;
 	background:url(../img/phone.png) no-repeat;
	background-size: 100% 100%;
	margin: 10px auto;
	margin-top: 100px;
}
.small{	
	width:340px;
	height: 550px;
	border:1px solid #E4E7ED;
	margin:0 auto;
	overflow:auto
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
