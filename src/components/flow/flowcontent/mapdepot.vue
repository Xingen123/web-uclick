<template>	
	<div class="mapdepot">
		<div style="font-size: 28px;">用视频和图片描绘您的体验</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">数据证明，通过视频或更多图片展现您的体验内容，将会获得更高的人气。快来添加精彩的视频和图片，来获得更多预定吧！</p>		
		<!-- 提示 -->
		<p class="tishi"  @click="fun">更多解释{{msg}}</p>
		<div v-show="code" class="box">
			<div class="small">
				<div class="right"></span>视频时长1分钟之内，大小不超过10MB</div>
				<div class="right"></span>视频比例为3:4</div>
				<div class="right"></span>视频内容可辨别，最好同时展现达人与体验内容</div>
				<div class="right"></span>视频可添加配乐，让画面更有感染力</div>
				<div class="right"></span>上传与体验相关的图片</div>
				<div class="right"></span>图片尺寸比例为3:4，大小需小于1M</div>
				<div class="right"></span>图片以人物为主，人物+场景图片最佳</div>
				<div class="right"></span>画面轻松自然，更能让人产生好感</div>
			</div>
			<div class="smalltwo">
				<div class="not"></span>视频画面太暗，内容不可辨</div>
				<div class="not"></span>视频内容主体显示不全</div>
				<div class="not"></span>视频运用了重度滤镜或夸张的特效</div>
				<div class="not"></span>视频中含有裸露的人体元素</div>
				<div class="not"></span>视频中含有其它违反Befriend体验价值观的内容</div>
				<div class="not"></span>照片模糊或失真</div>
				<div class="not"></span>画面内容较为拥挤，无法辨别主体</div>
				<div class="not"></span>照片上添加水印或使用浓重的滤镜</div>
				<div class="not"></span>图片主题不可突出儿童、标识、酒类或裸体</div>
			</div>
		</div>
		<!-- 视频 -->
		<div style="margin-top:50px;color:#505050;font-size: 18px;">视频</div>
		<popup :hint="hint" :column="videoitem"></popup>

			<a  class="upVideo" style="margin-top:10px;">
				<!-- <el-container v-loading="loading"> -->
				<i :class="elicon"></i>
				<video class="videoB" :src="videoB"    autoplay loop id="video"></video>
	    		<input class="chVideo" type="file" v-show="videoBox" id="fileto" accept="video/*"  @change="upVideo($event)"/>
	    		<!-- 有视频悬浮 -->
	    		<div v-show="vid" class="smallVideo" @click="Videochange" >
					预览<div class="Videoremove" @click.stop="Videoremove()"></div>
				</div>

				<!-- </el-container> -->
			</a>	
			<!-- <video id="fixedvideo" :src="videoB"  autoplay loop></video> -->
		<!-- 图片 -->
		<div style="margin-top:50px;color:#505050;font-size: 18px;">图库</div>
		<!-- <popup :hint="hint" :column="column"></popup> -->
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
    		<input class="change"  name="file" type="file" accept="image/png,image/gif,image/jpeg,image/jpg" @change="update"/>
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
import popup from '@/components/flow/popup/popup'

	export default{
		components:{
			repertoire,
			popup,
			videodom:'<div></div>'
		},
		data(){
			return{
				elicon:"el-icon-upload",
				changevideo:"fill",
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
				exampleimg:'',
				hint:"提示和实例",
				videoitem:[
		          {
		            src:"../../../../static/popup/1.mp4",
		            content:'Blueglass为您整理了非常清晰明确的视频标准：',
		            content1:'1，时长：1分钟以内，',
		            content2:'2，大小：10MB，',

		            content4:'3，画质：清晰可辨画面内容，',
		            content5:'4，视频声音可以是原声，也可以是配乐，',
 					content6:'5，视频内容要与体验相关，最好要有人物出现。'
		          }
		        ],
				column:[
		          {
		            img:"../../../../static/popup/1.jpg",
		            content:'照片主体为体验达人本人，场景需与体验相关。如：您开展了篆刻体验，照片中最好出现篆刻相关的元素。',
		        
		          },
		          {
		            img:"../../../../static/popup/2.jpg",
		            content:"照片主体为体验达人本人，换一种拍摄角度展现您与所开展的体验。"
		          },
		          {
		            img:"../../../../static/popup/3.jpg",
		            content:"照片主体为体验开展现场、体验者或体验细节。"
		          },
		          {
		            img:"../../../../static/popup/4.jpg",
		            content:"照片主体为体验事物的特写细节，或体验最终创作的作品。"
		          },
		          {
		            img:"../../../../static/popup/5.jpg",
		            content:"照片主体为达人，展现达人生活与爱好、特长有关的一面。用图片来展现您个人介绍里的内容。"
		          },
		          {
		            img:"../../../../static/popup/6.jpg",
		            content:"照片主体为达人，展现达人生活与爱好、特长有关的另一面。用图片来展现您个人介绍里的内容。"
		          }
		        ]
			}
		},
		props: {},
		watch:{
  	
		},
		methods:{
			//获取用户传的图片
			photo(){  
			    let _this =this      
			    let param = new FormData();

			    let tokenone =sessionStorage.getItem('encryptToken');
			    let detailId =sessionStorage.getItem('detailId');

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
		    update(e){
		        let _this =this  
		        let file = e.target.files[0]
		        let isLt2M = file.size / 1024 / 1024 < 1;
		        document.getElementById('fileto').value = "";	
		        _this.createReader(file, function (w, h) {
		       
		         	if ( w < 300 || h <400 ) {
		               	_this.$message({
						   	message: '照片像素至少要达到300x400。请上传一张更高质量的照片。您的照片像素为'+ w +'x'+ h +'',
						    type: 'warning',
						    duration:2500
						});
		               return false;
		            } 
		            else if (!isLt2M) {
		            	_this.$message({
						    message: '上传图片大小不能超过 1MB!',
						    type: 'warning',
						    duration:2500
						});
		          		return false;
		        	}
		        	else{
		        		let param = new FormData(); //创建form对象
					    let tokenone =sessionStorage.getItem('encryptToken');
					    let detailId =sessionStorage.getItem('detailId');
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

					    let dolW = window.innerWidth;
		        		if (dolW > 600) {
		        			 _this.$store.commit('onOff')
		        			 _this.adaptation(w,h,1)
		        		}else{
		        			_this.imgfun(file)	
		        		}
		                // _this.$store.commit('onOff')
						// _this.adaptation(w,h,1) 		              
		            }
		          });
		    },
		    adaptation(x,y,than){

				 let _this = this;
				
			     let dolW = window.innerWidth / 3 ;     // 窗口的宽 / 3 是容器的宽
			     let dolH = window.innerHeight - 40;	// 窗口的高 -40 是容器的高

			     let XoY = (Math.round(x/y * 100) / 100);	//图片的宽高比值
			     
				if (XoY > than && x >= dolW) {
					_this.widthData  = dolW; 
				    _this.heightData = dolW/XoY;
				    _this.autoCropWidth  = dolW/XoY*0.75 - 2;
				    _this.autoCropHeight = dolW/XoY - 2;
				    
				}

				else if (XoY > than && x < dolW){
		
					_this.widthData  = x; 
				    _this.heightData = y;
				    _this.autoCropWidth  = y/0.75 - 2;
				    _this.autoCropHeight = y - 2;
				}
				else if(XoY < than && y >= dolH){
					if (XoY>0.75) {
						
						_this.widthData  = dolH*XoY; 
					    _this.heightData = dolH;
					    _this.autoCropWidth  = dolH*0.75 - 2;
					    _this.autoCropHeight = dolH - 2;
					}else{
						
						_this.widthData  = dolH*XoY; 
					    _this.heightData = dolH;
					    _this.autoCropWidth  = dolH*XoY - 2;
					    _this.autoCropHeight = dolH*XoY/0.75 - 2;
					}



				}

				else if (XoY < than && y < dolH){
					 if (XoY>0.75) {
					 	_this.widthData  = x; 
					    _this.heightData = y;
					    _this.autoCropWidth  = y*0.75 - 2;
					    _this.autoCropHeight = y - 2;
					 }else{
						_this.widthData  = x; 
					    _this.heightData = y;
					    _this.autoCropWidth  = x - 2;
					    _this.autoCropHeight = x/0.75 - 2;
					 }
				}

				else if (XoY == than && y >= dolH){
					_this.widthData  = dolH; 
				    _this.heightData = dolH;
				    _this.autoCropWidth  = dolH*0.75 - 2;
				    _this.autoCropHeight = dolH - 2;
				}

				else if (XoY == than && y < dolH){
					_this.widthData  = x; 
				    _this.heightData = y;
				    _this.autoCropWidth  = x*0.75 - 2;
				    _this.autoCropHeight = y - 2;
				}

			},
		    createReader(file, whenReady) {
		          let reader = new FileReader;
		          reader.onload = function (evt) {
		              let image = new Image();
		              image.onload = function () {
		                  let width = this.width+2;
		                  let height = this.height+2;
		                  if (whenReady) whenReady(width, height);
		              };
		              image.src = evt.target.result;
		          };          
		          reader.readAsDataURL(file);       
		    },
			//点击编辑
			cropper(header,img,pictureid){
           	 	let image = new Image();
           	 	image.src = header+'/'+img ;
           	 	let w = image.width;
           	 	let h = image.height
           	 	this.adaptation(w,h,1) 
				this.exampleimg = image.src;
				this.$store.commit('onOff')
				sessionStorage.setItem('pictureid',pictureid);	
			},
			//拿到截取到的图片
			imgfun(data){
				let _this = this
				let param = new FormData(); //创建form对象
				let tokenone =sessionStorage.getItem('encryptToken');
				let pictureid =sessionStorage.getItem('pictureid');
				param.append('id',pictureid); 
				param.append('token',tokenone);
				param.append('imageFile',data);//通过append向form对象添加数据
				this.$ajax.post('update/webRecommendPicture',param).then(function (response) {

					if (response.data.complete=="SUCCESS") {	
								let dolW = window.innerWidth;
				        		if (dolW > 600) {
				        			 _this.$store.commit('onOff')
						  		
						  		}	
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
				let docElm = document.getElementById('video'); 
			
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
				let _this =this     
				this.$alert('确认删除吗？', '删除', {
			        confirmButtonText: '确定',
			        callback: action => {
					    if (action=="confirm") {
					    	let param = new FormData();

						    let tokenone =sessionStorage.getItem('encryptToken');
						   
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
        		let _this=this  
		        let param = new FormData();
            	let itemsId = this.photoItem.map(item =>item.id)
		        param.append('pictureSort',itemsId);
				
    			this.$ajax.post('sort/webRecommendPicture',param).then(function (response) {

    				

    			}).catch(function (error) {

    				console.log(error)

    			});
		  	},
		  	next(){
		  		this.$message({
						type: 'success',
						message: '保存成功!',
						duration:1500
				});
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
/*#fixedvideo{
	width: 60%;
	height: 50%;
	position: absolute;
	top: 0;
	left: 300px;
}*/
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
	object-fit:contain;
}
/*.active{
	object-fit: contain !important;
}*/
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