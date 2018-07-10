<template>	
	<div class="mapdepot">
		<div style="font-size: 28px;">添加更多图片</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">根据数据显示，配有6张以上图片的体验往往更受欢迎。去添加更多图片让体验获得更多预定吧！</p>		
		<!-- 提示 -->
		<p class="tishi"  @click="fun">更多解释{{msg}}</p>
		<div v-show="code" class="box">
			<div class="small">
				<div class="right"></span>选择与标题描述一致的图片</div>
				<div class="right"></span>图片尺寸比例为3:4，大小需小于500KB</div>
				<div class="right"></span>图片以人物为主，人物场景图片最佳</div>
				<div class="right"></span>选择姿势自然的体验图片</div>
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
				<!-- <el-container v-loading="loading"> -->
				<i :class="elicon"></i>
				<video class="videoB" :src="videoB"   autoplay loop id="video"></video>
	    		<input class="chVideo" type="file" v-show="videoBox" accept="video/*"  @change="upVideo($event)"/>
	    		<!-- 有视频悬浮 -->
	    		<div v-show="vid" class="smallVideo" @click="Videochange" >
					预览<div class="Videoremove" @click.stop="Videoremove()"></div>
				</div>

				<!-- </el-container> -->
			</a>	

		<!-- 图片 -->
		<div style="margin-top:50px;color:#505050;font-size: 18px;">图库</div>
		<div class="photo" >
			<div  class="imgbox"  v-for="items in photoItem" v-dragging="{ item: items, list: photoItem, group: 'color' }" :key="items.id">
					<div class="smallbg" @click="cropper(items.fileServer,items.imgUrl,items.id)">
						编辑
						<div class="remove" @click.stop="remove(items.id)"></div>
					</div>
					<img v-lazy='items.fileServer +"/"+items.imgUrl' alt="" class="bottomimg">
			</div>
		</div>
		<a  class="upload" v-show="none"><i class="el-icon-picture-outline"></i>
    		<input class="change"  name="file" type="file" accept="image/png,image/gif,image/jpeg,image/jpg" @change="update($event, 1)"/>
		</a>				
		<el-button type="primary" plain style="margin:50px 0 ;font-size: 18px;" @click="next" :disabled="disabled">下一步</el-button>	
		<!-- 截图区域 -->
		<repertoire 
					v-on:imgfun="imgfun"
                    :bg="$store.state.isBg"                   
                    :autoCropWidth="autoCropWidth" 
                    :autoCropHeight="autoCropHeight" 
                    :widthData="widthData" 
                    :heightData="heightData" 
                    :img="exampleimg">
                      
       </repertoire>
	</div>
</template>
<script>
import global from '@/components/flow/global/global'
import repertoire from '@/components/flow/flowcontent/repertoire'
	export default{
		components:{
			repertoire
		},
		data(){
			return{
				elicon:"el-icon-upload",
				// loading:true,
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
				autoCropWidth:300,
            	autoCropHeight:400,
            	widthData:0,
           	 	heightData:0,
				exampleimg:''
			}
		},
		props: {},
		watch:{

		},
		methods:{
			//获取用户传的图片
			photo(){  
			    var _this =this      
			    let param = new FormData();

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
			       	global.$emit("tabfour",true)
			       	_this.photoItem=response.data.recomemndPictureInfoList
			        _this.disabled=false
			       }else if(response.data.recomemndPictureInfoList.length==0){
			       		if (_this.videoB=="") {
			       			global.$emit("tabfour",false)
			       		}
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
			//点击上传图片
		   update(e, num){
		          var _this =this  
		          var file = e.target.files[0]
		          if (file) {
		          	var isLt2M = file.size / 1024 / 1024 < 1;
		         
		          
		          _this.createReader(file, function (w, h) {
		            let pictureWidth;     //图片长度
		            let pictureHeight;    //图片高度
		            let picturescale;     //图片长度 / 高度
		            if ( w < 480 || h <720 ) {
		               	_this.$message({
						   	message: '照片像素至少要达到480x720。请上传一张更高质量的照片。您的照片像素为'+ w +'x'+ h +'',
						    type: 'warning',
						    duration:1500
						});
		               return false;
		            } else if (!isLt2M) {
		            	_this.$message({
						    message: '上传图片大小不能超过 1MB!',
						    type: 'warning',
						    duration:1500
						});
		          		return false;
		        	}else{
		        		let param = new FormData(); //创建form对象
					    var tokenone =sessionStorage.getItem('encryptToken');
					    var detailId =sessionStorage.getItem('detailId');
					    param.append('id',detailId); 
					  	param.append('token',tokenone);
					    param.append('imageFile',file);//通过append向form对象添加数据
					    _this.$ajax.post('create/webRecommendPicture',param).then(response=>{
					    	_this.exampleimg=window.URL.createObjectURL(file)
					    	if (response.data.recomemndPictureInfoList.length==6) {
					    		_this.none=false
					    	}
					    	if (response.data.complete=="SUCCESS") {
					    		sessionStorage.setItem('pictureid',response.data.recommendPictureInfo.id); 					    		 				    		
					    	}
					      	_this.photo()
					    })  
		                _this.$store.commit('onOff')
		                if (w > 600 ){		                	
		                	picturescale = w/h;
			                if (picturescale < 0.76) {
			                	
				                _this.widthData = 600   
				            	_this.heightData = 800	
				                _this.autoCropWidth =  600-2        //截图框_长度 = 图片长度
				                _this.autoCropHeight = 800-2  //截图框_高度/固定比例
			                }else{
			                	// console.log(2)
			                	_this.widthData = 600   
			            		_this.heightData = 600*picturescale 
			               		_this.autoCropWidth =  450  //截图框_长度 = 图片长度
			                	_this.autoCropHeight = 600*picturescale-2
			                  }
		                }else{
		                	
		                  picturescale = w/h;
		                  if (picturescale < 0.75 ) {
		                  		_this.widthData = 800*picturescale   
				           		_this.heightData = 800	
				           		_this.autoCropWidth =  800*picturescale-2     //截图框_长度 = 图片长度
				          		_this.autoCropHeight = 800*picturescale/0.75  //截图框_高度/固定比例
		                  }else{  
		                     	_this.widthData = w   
				            	_this.heightData = h 
		                  }
		              } 
		            }

		          });
		      }
		          
		    },
		    createReader(file, whenReady) {
		          var reader = new FileReader;
		          reader.onload = function (evt) {
		              var image = new Image();
		              image.onload = function () {
		                  var width = this.width+2;
		                  var height = this.height+2;
		                  if (whenReady) whenReady(width, height);
		              };
		              image.src = evt.target.result;
		          };          
		          reader.readAsDataURL(file);       
		    },
			//点击编辑
			cropper(header,img,pictureid){
				let _this = this
				
				// sessionStorage.removeItem('pictureid');
				let autoCropWidth = this.autoCropWidth
            	let autoCropHeight = this.autoCropHeight
            	let widthData = this.widthData
           	 	let heightData = this.heightData
           	 	
           	 	let image = new Image();
           	 	image.src = header+'/'+img ;
           	 	
           	 	let w = image.width;
           	 	let h = image.height
           	 	let picturescale;
           	 	
           	 	if (w > 600 ){		                	
		                	picturescale = w/h;
			                if (picturescale < 0.76) {
			                	
				                _this.widthData = 600   
				            	_this.heightData = 800	
				                _this.autoCropWidth =  600-2        //截图框_长度 = 图片长度
				                _this.autoCropHeight = 800-2  //截图框_高度/固定比例
			                }else{
			                	// console.log(2)
			                	_this.widthData = 600   
			            		_this.heightData = 600*picturescale 
			               		_this.autoCropWidth =  450  //截图框_长度 = 图片长度
			                	_this.autoCropHeight = 600*picturescale-2
			                  }
		        }else{
		                	
		                  picturescale = w/h;
		                  if (picturescale < 0.75 ) {
		                  		_this.widthData = 800*picturescale   
				           		_this.heightData = 800	
				           		_this.autoCropWidth =  800*picturescale-2     //截图框_长度 = 图片长度
				          		_this.autoCropHeight = 800*picturescale/0.75  //截图框_高度/固定比例
		                  }else{  
		                     	_this.widthData = w   
				            	_this.heightData = h 
		                  }
		        } 
		        
				this.exampleimg = image.src;
				this.$store.commit('onOff')

				sessionStorage.setItem('pictureid',pictureid);	
			},
			//拿到截取到的图片
			imgfun(data){
				let _this = this
				let param = new FormData(); //创建form对象
				var tokenone =sessionStorage.getItem('encryptToken');
				var pictureid =sessionStorage.getItem('pictureid');
						    
				param.append('id',pictureid); 
				param.append('token',tokenone);
				param.append('imageFile',data);//通过append向form对象添加数据
				this.$ajax.post('update/webRecommendPicture',param).then(function (response) {

					if (response.data.complete=="SUCCESS") {	

						_this.$store.commit('onOff')
						_this.photo()  

					}

				})
			},
			//点击显示隐藏
			fun () {
				this.str=!this.str
				if(this.str==true){this.code=true;this.msg=""}
		        if(this.str==false){this.code=false;this.msg="..."}
			},
			// 点击预览
			Videochange(){
				var docElm = document.getElementById('video'); 
			
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
						if (_this.photoItem.length==0) {
							global.$emit("tabfour",false)
						}
						_this.$message({
								    message: '删除成功',
								    type: 'success'
						})	  
						_this.vid=false
						_this.disabled=true
					}
				})  
			},
			upVideo(e){
				if(e){
					let file = e.target.files[0]
					this.Up(file)
				}
								
			},
			//上传视频
			Up(videoFile){
				this.elicon= "el-icon-loading"
				let _this = this

				let param = new FormData(); //创建form对象

				let tokenone =sessionStorage.getItem('encryptToken');
				let detailId =sessionStorage.getItem('detailId');

			    param.append('id',detailId); 			   
				param.append('token',tokenone);
				param.append('videoFile',videoFile);

				_this.$ajax.post('create/webRecommendVideo',param).then(response=>{
					
					if (response.data.complete=="SUCCESS") {
						global.$emit("tabfour",true)
						_this.videoB = response.data.videoUrl
						_this.vid=true
						_this.disabled=false
						_this.elicon = "el-icon-upload"
					}

				})  

			},

			//删除用户上传的图片
			remove(id){
				var _this =this     
				this.$alert('确认删除吗？', '删除', {
			        confirmButtonText: '确定',
			        callback: action => {
					    if (action=="confirm") {
					    	let param = new FormData();

						    var tokenone =sessionStorage.getItem('encryptToken');
						   
						    param.append('id',id); 
						  	param.append('token',tokenone);
						    _this.$ajax.post('/delete/webRecommendPicture',param).then(response=>{
						    	
						    	if (response.data.complete==false) {
						    		 _this.$message({
									    message: response.data.errorMessage,
									    type: 'error',
					    				duration:1000
									 })	
						    	}else{
							    	 _this.photo() 
							    	 _this.none=true
							    	 _this.$message({
									    message: '删除成功',
									    type: 'success'
									 })	
						    	}
  
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
			register(){
        		var _this=this  
		        let param = new FormData();
            	let itemsId = this.photoItem.map(item =>item.id)
		        param.append('pictureSort',itemsId);
				
    			this.$ajax.post('sort/webRecommendPicture',param).then(function (response) {

    				

    			}).catch(function (error) {

    				console.log(error)

    			});
		  	},
		  	next(){
				this.$router.push({
				   path: '/flow/about'
				})
			}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.photo()
			this.$dragging.$on('dragend', () => {
	          this.register()
	        })
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.bg{
	z-index:100;
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
		cursor: pointer;
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
    	/*position: absolute;*/
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
		
		border-radius: 5px;
	}

	.imgbox{
		position: relative;
		overflow: hidden;
		width: 200px;
		height: 260px;
		margin-left: 10px;
		margin-bottom: 10px;
		border-radius: 5px;


	}
	.imgbox:hover .smallbg{
		cursor:pointer;
		display: block;
	}
	.bottomimg{
		transition: all .4s;
	}
/*	.imgbox:hover .bottomimg{
		transform: scale(1.2);
	}*/
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
		right: 15px;
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
    -moz-box-shadow: 4px 5px 20px #8C8C8C;
    box-shadow: 4px 5px 20px #8C8C8C;
    text-decoration: none;
    color: #666;
    cursor: pointer;
}
.chVideo{
		width: 200px;
	height: 260px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
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
    text-decoration: none;
    color: #666;
    -moz-box-shadow: 4px 5px 20px #8C8C8C;
    box-shadow: 4px 5px 20px #8C8C8C;
}
.change{
	width: 200px;
	height: 260px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.photo{
		width: 100%;
	}
	.text,.rotate,.back{
		display: none;
	}
	.btn,.btn2{
		top: 2px;
	}
	.wrapper{
		width: 100% !important;
		height: 500px !important;
		float: left;
		margin-top: 100px;
	}
	.btn3{
		left:270px !important;
	}
	.btn4{
		left: 100px;	
	}
	.btn3,.btn4{
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    top: 85px;
	    z-index: 100;
	}
}
</style>