<template>	
	<div class="mapdepot">
		<div style="font-size: 28px;">添加更多照片</div>
		<p style="margin-top:25px;color:#505050;width:550px;">根据数据显示，配有6张以上图片的体验往往更受欢迎。去添加更多图片让体验获得更多预定吧！</p>

		
		
		<!-- 提示 -->
		<p class="tishi"  @click="fun">更多解释{{msg}}</p>
		<div v-show="code" class="box">
			<div class="small">
				<div class="right"></span>选择与标题描述一致的图片</div>
				<div class="right"></span>图片尺寸比例为3:4，大小需小于500KB</div>
				<div class="right"></span>图片以人物为主，人物场景图片最佳</div>
				<div class="right"></span>选择有感染力、姿势自然的图片</div>
			</div>
			<div class="smalltwo">
				<div class="not"></span>不要使用闪光灯或太厚重的滤镜</div>
				<div class="not"></span>请勿上传模糊或失真的照片</div>
				<div class="not"></span>为保证视觉效果，尽量不要使用内容过于拥挤的图片</div>
				<div class="not"></span>图片主题不可突出儿童、标识、酒类或裸体</div>
			</div>
		</div>
		<!-- 视频 -->
		<div style="margin-top:50px;color:#505050;font-size: 18px;">视频</div>


		<a  class="upVideo" style="margin-top:10px;">
			<i class="el-icon-upload"></i>
			<video class="videoB" :src="videoB"   autoplay loop id="video"></video>
    		<input class="chVideo" type="file" v-show="videoBox" accept="video/*"  @change="upVideo($event)"/>

    		<!-- 有视频悬浮 -->
    		<div v-show="vid" class="smallVideo" @click="Videochange" >
				预览<div class="Videoremove" @click.stop="Videoremove()"></div>
			</div>
		</a>
	




		<!-- 图片 -->
		<div style="margin-top:50px;color:#505050;font-size: 18px;">图库</div>
		<div class="photo" >
			<div  class="imgbox"  v-for="(item,index) in photoItem">
					<div class="smallbg" @click="cropper(item.fileServer,item.imgUrl,item.id)">
						编辑
						<div class="remove" @click.stop="remove(item.id)"></div>
					</div>
					<img v-lazy='item.fileServer +"/"+item.imgUrl' alt="">
			</div>
		</div>

		<a  class="upload" v-show="none"><i class="el-icon-picture-outline"></i>
    		<input class="change"  name="file" type="file" accept="image/png,image/gif,image/jpeg,image/jpg" @change="update($event, 1)"/>
		</a>
		
		
		<el-button type="primary" plain style="margin:50px 0 ;font-size: 18px;" @click="next" :disabled="disabled">下一步</el-button>
		<div class="bg" v-show="bg">
			<div class="back" @click="bg=false"></div>
			<div class="text">编辑图库照片</div>
			<div class="block">
			    <span class="demonstration">隐藏 Tooltip</span>
			    <button  class="btn3"  @click="fin(-1)" >-</button>
			   	 <!-- <el-slider  class="btn5"  @change="slider" v-model="value3"  :min="-10" :max='10' ></el-slider> -->
			    <button  class="btn4"  @click="fin(+1)" >+</button>
			</div>
			
			<div class="rotate" @click="rotateLeft">旋转90度</div>
			<button  class="btn" @click="finish('blob')" >保存</button>
			<button  class="btn2" @click="bg=false" >取消</button>
			<div class="wrapper">
					<vueCropper
					ref="cropper2"
					:img="example2.img"
					:full="example2.full"
					:outputSize="example2.size"
					:outputType="example2.outputType"
					:info="example2.info"
					:canScale="example2.canScale"
					:autoCrop="example2.autoCrop"
					:autoCropWidth="example2.autoCropWidth"
					:autoCropHeight="example2.autoCropHeight"
					:fixedBox="example2.fixedBox">
					</vueCropper>
			</div>			
		</div>

	</div>
</template>
<script>
import global from '@/components/flow/global/global'
import vueCropper from '@/components/login/vue-cropper'
	export default{
		components:{
			vueCropper
		},
		data(){
			return{
				vid:false,
				videoBox:true,
				videoB:"",
				code:false,
				msg:"...",
				value3:0,
				bg:false,
				disabled:true,
				none:true,
				photoItem:[],
				example2: {
					full:true,
					img:"",
					info: true,
					size:1,
					outputType: 'jpeg',
					canScale:true,
					autoCrop: true,
					// 只有自动截图开启 宽度高度才生效
					autoCropWidth: 300,
					autoCropHeight: 400,
					fixedBox:true
					// fixed: true,
					// fixedBox:true,
					// fixedNumber: [3,4],
					// original:true
				}
			}
		},
		props: {},
		watch:{

		},
		methods:{
			// 点击预览

			Videochange(){
				var docElm = document.getElementById('video'); 
				console.log(docElm)
				//W3C
				if(docElm.requestFullscreen){

				docElm.requestFullscreen();

				}
				//FireFox
				else if (docElm.mozRequestFullScreen) {

				docElm.mozRequestFullScreen();

				}
				//Chrome等
				else if (docElm.webkitRequestFullScreen) {

				docElm.webkitRequestFullScreen();

				}
				//IE11
				else if (elem.msRequestFullscreen) {

				elem.msRequestFullscreen();

				}
			},
			//点击删除视频
			Videoremove(){
				console.log("删除")
				let _this = this

				let param = new FormData(); //创建form对象

				let tokenone =sessionStorage.getItem('encryptToken')
				let detailId =sessionStorage.getItem('detailId')

			    param.append('id',detailId) 

				param.append('token',tokenone)

				_this.$ajax.post('delete/webRecommendVideo',param).then(response=>{
					if (response.data.complete=="SUCCESS") {
						_this.videoB = ""
						_this.videoBox = true

						_this.$message({
								    message: '删除成功',
								    type: 'success'
						})	  
						_this.vid=false
					}
				})  
			},
			upVideo(e){
				let file = e.target.files[0]
				// this.videoB =  window.URL.createObjectURL(file)
				// this.videoBox = false
				this.Up(file)
				 console.log("选择视频成功")
			},

			//上传视频
			Up(videoFile){
console.log("调用上传接口")
				let _this = this

				let param = new FormData(); //创建form对象

				let tokenone =sessionStorage.getItem('encryptToken');
				let detailId =sessionStorage.getItem('detailId');

			    param.append('id',detailId); 
			   
				param.append('token',tokenone);

				param.append('videoFile',videoFile);

				console.log('id',detailId,'token',tokenone,'videoFile',videoFile)	
				_this.$ajax.post('create/webRecommendVideo',param).then(response=>{
					
					if (response.data.complete=="SUCCESS") {
						_this.videoB = response.data.videoUrl
						_this.vid=true
					}
				})  

			},
			slider(){
					this.fin(this.value3)
			},
			fin(val){
				this.$refs.cropper2.changeScale(val)
			},
			//点击编辑
			cropper(header,img,pictureid){
				sessionStorage.removeItem('pictureid');
				this.bg=true
				this.example2.img=header+'/'+img
				sessionStorage.setItem('pictureid',pictureid);	
			},
			next(){
				this.$router.push({
				   path: '/flow/about'
				})
			},
			//旋转
			rotateLeft(){
				this.$refs.cropper2.rotateLeft()
			},
			//截图确认
			finish (type) {
			// 输出
			var _this=this
			if (type === 'blob') {
					this.$refs.cropper2.getCropBlob((data) => {
						// _this.example2.img = window.URL.createObjectURL(data)		
							let param = new FormData(); //创建form对象
						    var tokenone =sessionStorage.getItem('encryptToken');
						    var pictureid =sessionStorage.getItem('pictureid');
						    console.log(data)
						    param.append('id',pictureid); 
						  	param.append('token',tokenone);
						    param.append('imageFile',data);//通过append向form对象添加数据
						    _this.$ajax.post('update/webRecommendPicture',param).then(response=>{
						    	
						    	if (response.data.complete=="SUCCESS") {
						    		_this.bg=false
						       		_this.photo()
						    	}
						    })  
						})
					}
			},
			//点击显示隐藏
			fun () {
				this.str=!this.str
				if(this.str==true){this.code=true;this.msg=""}
		        if(this.str==false){this.code=false;this.msg="..."}
			},
			//删除用户上传的图片
			remove(id){
				var _this =this     
				this.$alert('确认删除吗？', '删除', {
			        confirmButtonText: '确定',
			        callback: action => {
					    if (action=="confirm") {
					    	let param = new FormData(); //创建form对象
						    var tokenone =sessionStorage.getItem('encryptToken');
						    param.append('id',id); 
						  	param.append('token',tokenone);
						    _this.$ajax.post('delete/webRecommendPicture',param).then(response=>{
						    	
						    	 _this.photo() 
						    	 _this.none=true
						    	 _this.$message({
								    message: '删除成功',
								    type: 'success'
								 })	  
						    })  	      
					    }else{
					    	 _this.$message({
							    message: '取消删除成功',
							    type: 'success'
							 })	  
					          }
			          	}
			    })

			},
			//获取用户传的图片
			photo(){  
			    var _this =this      
			    let param = new FormData(); //创建form对象
			    var tokenone =sessionStorage.getItem('encryptToken');
			    var detailId =sessionStorage.getItem('detailId');
			    param.append('id',detailId); 
			  	param.append('token',tokenone);
			    this.$ajax.post('query/webRecommendPicture',param).then(response=>{
			    	if (response.data.videoUrl) {
			    		_this.videoB = response.data.videoUrl
			    		_this.vid = true
			    	}
			    	
					if(response.data.recomemndPictureInfoList.length>0){
			       	global.$emit("tabthree",true)
			       	_this.photoItem=response.data.recomemndPictureInfoList
			        _this.disabled=false
			       }else if(response.data.recomemndPictureInfoList.length==0){
			       		global.$emit("tabthree",false)
			       		_this.photoItem=response.data.recomemndPictureInfoList
			        	_this.disabled=true
			       }else{
			       	_this.disabled=true
			       	_this.none=true
			       }	
			       if(response.data.recomemndPictureInfoList.length==6){
			       		_this.none=false
			       }
			       		       
			    })     
			},

			update(e, num){
				var _this =this  
				var file = e.target.files[0]
				var imgSize = e.target.files[0].size
				var size = imgSize / 1024;
				if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) { 				
					 _this.$message('图片类型必须是jpeg,jpg,png中的一种并且小于500KB')
					 return false
				}
				else if(size > 500){
					 _this.$message('图片大于500KB')
					 return false
				}else{
					_this.bg=true	
					_this.example2.img=window.URL.createObjectURL(file); 
					let param = new FormData(); //创建form对象
				    var tokenone =sessionStorage.getItem('encryptToken');
				    var detailId =sessionStorage.getItem('detailId');
				    param.append('id',detailId); 
				  	param.append('token',tokenone);
				    param.append('imageFile',file);//通过append向form对象添加数据

				 //    var config= {
					//  onUploadProgress:function (progressEvent){
					//   var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
					//   // _this.progress = complete
					 
					//  }
					// }


					// this.$ajax.post(`create/webRecommendPicture`,param, config).then((res) => {
				 //        // if (res.data.status === 'success') {
				 //            console.log(res)
				 //        // }
				 //    })
				    this.$ajax.post('create/webRecommendPicture',param).then(response=>{
				    	console.log(response.loaded)
				    	if (response.data.recomemndPictureInfoList.length==6) {
				    		_this.none=false
				    	}
				    	if (response.data.complete=="SUCCESS") {
				    		sessionStorage.setItem('pictureid',response.data.recommendPictureInfo.id); 					    		 				    		
				    	}
				      	_this.photo()
				    })  
				}        
      
			}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.photo()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.bg{
	z-index: 2;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: black;
}
.back{
	width: 25px;
	height: 25px;
	position: absolute;
	top: 50px;
	left: 100px;
	background: url(img/back.png) no-repeat;
	background-size: 100% 100%;
}
.text{
	position: absolute;
	top: 100px;
	left: 100px;
	color:white;
	font-size:28px;
}
.rotate{
	width: 150px;
	height: 50px;
	color: white;
	line-height: 50px;
	text-align: right;
	font-size: 20px;
	background: url(img/rote.png) no-repeat;
	background-size: 50px 50px;
	position: absolute;
	top:200px;
	left: 200px;
}
	.tishi{
		font-size: 16px;
		margin-top:15px;
		color:#409EFF;
		padding-bottom: 5px;
		transition: 0.4s all;
	}
	.tishi:hover{
		text-decoration: underline;
	}
	.box{
		overflow: hidden;
		color:#505050;
	}
	.small{
		float: left;
	}
	.smalltwo{
		float: left;
	}
	.right{
		background: url(img/right.png) no-repeat;
		background-size: 15px 15px;
		background-position: 5px; 
		padding-left: 30px;
		line-height: 30px;
	}
	.not{
		background: url(img/not.png) no-repeat;
		background-size: 15px 15px;
		background-position: 5px;	
		padding-left: 30px;
		line-height: 30px;
	}
.btn{
	width: 100px;
	height: 50px;
	font-size: 20px;
	background: white;
	line-height: 50px;
	border-radius: 5px;
	outline:none;
	border:none;
	position: absolute;
	top: 650px;
	left: 100px;
}
.btn2{
	width: 100px;
	height: 50px;
	font-size: 20px;
	background:black;
	line-height: 50px;
	outline:none;
	color: white;
	border-radius: 5px;
	border:2px solid white;
	position: absolute;
	top:650px;
	left: 210px;
}
.btn3{
	width: 50px;
	height: 50px;
	font-size: 20px;
	background:black;
	line-height: 50px;
	outline:none;
	color: white;
	border-radius: 5px;
	border:2px solid white;
	position: absolute;
	top: 450px;
	left: 200px;
}
.btn4{
	width: 50px;
	height: 50px;
	font-size: 20px;
	background:black;
	line-height: 50px;
	outline:none;
	color: white;
	border-radius: 5px;
	border:2px solid white;
	position: absolute;
	top: 450px;
	left: 270px;
}
.btn5{
	width: 280px;
	position: absolute;
	top: 550px;
	left: 280px;
}
.wrapper{
	width:400px;
	height:550px;
	float: right;
	margin-top: 100px;
	margin-right: 200px;
	}
    .mapdepot{
    	position: absolute;
    }
	.photo{
		margin-top: 10px;
		width: 650px;
		overflow: hidden;


	}
	.photo>div{
		float: left;
	}
	.photo>div>img{
		width: 200px;
		height: 260px;
		margin-left: 10px;
		border-radius: 5px;
	}
	.photo>div>img:last-child{
		
		/*clear: both;*/
	}
	.imgbox{
		position: relative;
	}
	.imgbox:hover .smallbg{
		cursor:pointer;
		display: block;
	}
	.smallbg{
		color: white;
		line-height:260px;
		text-align: center;
		transition: 0.4s all;
		border-radius: 5px;
		display: none;
		width: 200px;
		height: 260px;
		background: rgba(0,0,0,0.5);
		position: absolute;
		left: 10px;
	}
/*	.smallVideo{
		position: relative;
	}*/
	.smallVideo{
		color: white;
		line-height:260px;
		text-align: center;
		transition: 0.4s all;
		display: none;
		width: 200px;
		height: 260px;
		background: rgba(0,0,0,0.5);
		position: absolute;
		top: 0;
		left: 0;
	}
	.Videoremove{
		width: 25px;
		height: 25px;
		position: absolute;
		z-index: 1;
		top: 10px;
		right: 5px;
		background: url(img/remove.png) no-repeat;
		background-size: 100% 100%; 
	}
	.upVideo:hover .smallVideo{
		cursor:pointer;
		display: block;
	}
	.remove{
		width: 25px;
		height: 25px;
		position: absolute;
		z-index: 1;
		top: 10px;
		right: 5px;
		background: url(img/remove.png) no-repeat;
		background-size: 100% 100%; 
	}
	.upload{
	display: block;
	width: 200px;
	height: 260px;
	border-radius:5px; 
	margin-left: 10px;
	text-align: center;
    line-height: 260px;
    position: relative;
    border: 1px solid #999;
    text-decoration: none;
    color: #666;
}
.chVideo{
		width: 200px;
	height: 260px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}

.videoB{
	display: block;
	position: absolute;
	right: 0;
    top: 0;
	width: 200px;
	height: 260px;
	object-fit: fill;
}
.upVideo{
		display: block;
	width: 200px;
	height: 260px;
	border-radius:5px; 
	margin-left: 10px;
	text-align: center;
    line-height: 260px;
    position: relative;
    border: 1px solid #999;
    text-decoration: none;
    color: #666;
}
.change{
	width: 200px;
	height: 260px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}

</style>