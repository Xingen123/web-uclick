<template>	
	<div class="cover">
		<div style="font-size: 28px;">体验封面</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">清晰且独特的封面可以帮助您吸引更多的朋友，以下一些建议能帮助您为创造良好的第一印象。</p>
		<p class="tishi"  @click="fun">提示和实例 {{msg}}</p>
		<div v-show="code" class="box">
			<div class="small">
				<div class="right"></span>选择与标题描述一致的图片</div>
				<div class="right"></span>图片尺寸比例为3:2，大小需小于1M</div>
				<div class="right"></span>图片以人物为主，人物场景图片最佳</div>
				<div class="right"></span>面带笑容的照片是最佳的社交利器</div>
			</div>
			<div class="smalltwo">
				<div class="not"></span>不要使用闪光灯或太厚重的滤镜</div>
				<div class="not"></span>请勿上传模糊或失真的照片</div>
				<div class="not"></span>为保证视觉效果，尽量不要使用内容过于拥挤的图片</div>
				<div class="not"></span>照片主体不要残缺</div>
				<div class="not"></span>图片主题不可突出儿童、标识、酒类或裸体</div>
			</div>
		</div>
		<!-- 标题 -->
		<div style="margin-top:60px;font-size: 20px;">体验标题</div>
		<p style="margin-top:5px;color:#505050;">一个能吸引更多目光的标题应当简介清晰且描述性强，标题中尽量含有明确的动词。
<br>例如：去童话般四层玻璃楼房，瓜分京城超大杯酸奶</p>
		<el-input v-model="input" @input="descInput" :maxlength="30" style="margin-top:20px;width:500px;"></el-input>
		<p  style="line-height:40px;">最多30个字</p>
		<div style="margin-top:60px;font-size: 20px;">封面照片</div>
		<popup :hint="hint" :column="column" :height="285" :imgwidth="470" :top="50" :left="30"></popup>
		<!-- 图片 -->

		<div v-show="photo" style="width:300px;height:200px;position:relative;" class="bigbox">
			<img v-lazy="img"   style="width:300px;height:200px;position:absolute;top:0;left:0;border:none;border-radius:5px;" alt="" >
			<div class="smallbox" @click="compile"><div class="remove" @click.stop="dialogVisible=true"></div>编辑</div>
		</div>

		<!-- 确认删除上传图片的弹框 -->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <span>已删除的照片将无法还原，需重新上传。</span>
		  <span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="removeto">确 定</el-button>
		    <el-button @click="dialogVisible = false">取 消</el-button> 
		  </span>
		</el-dialog>


		<div class="file">
			<input class="change"  name="file" ref="file" type="file" id="fileto" accept="image/png,image/gif,image/jpeg" @change="update($event, 1)"/>
			选择图片
		</div>

		<el-button type="primary"  @click="cover" style="display:block;margin-top:50px;">保存并继续</el-button>


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
import store from '@/store/store'
import popup from '@/components/flow/popup/popup'
import repertoire from '@/components/flow/flowcontent/repertoire'
import axios from 'axios'
	export default{
		components:{
			repertoire,
			popup
		},
		data(){
			return{
				hint:"提示和实例",
				column:[
					{
					img:"../../../../static/popup/cover.png",
		            content:'封面是用户第一眼看到的照片，封面图片需要同时展现您本人的魅力及您所开展体验的独特性。让潜在的体验者对您及体验产生更多兴趣和信赖。',
		            text:"数据证明，富有创意或魅力的照片能够带来更多预订。"
					}
				],
				
				number:30,
				imageData:"",
				//标题
				dialogVisible: false,
				photo:false,
				input:"",
				//提示和实列
				msg:"...",
				code:false,
				str:false,
				img:"",
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

			//拿到截取到的图片
			imgfun(data){
					var _this=this
					let param = new FormData();
					var tokenone =sessionStorage.getItem('encryptToken');
					var recommend =sessionStorage.getItem('recommendId');

					param.append('token',tokenone);
					param.append('id',recommend);
					param.append("imageFile",data);

					_this.$ajax.post('create/webRecommend',param).then(function (response) {
						
						if (response.data.complete=="SUCCESS") {
								let dolW = window.innerWidth;
				        		if (dolW > 600) {
				        			 _this.$store.commit('onOff')
						  		
						  		}	
						  		_this.img = window.URL.createObjectURL(data)
						  		_this.photo=true		  		
						}

					})
			},
			//编辑
			compile(){
           	 	let image = new Image();
           	 	image.src = this.img ;
           	 	let w = image.width;
           	 	let h = image.height
				this.adaptation(w,h,1)
				this.exampleimg = image.src;
				this.$store.commit('onOff')
			},
			descInput(){
				var txtVal = this.input.length;
				if (txtVal<31) {
					this.number =30 - txtVal;
				}
 				
 				if (txtVal>0) {
					this.disabled=false
				}else{
					this.disabled=true
				}
			},
			//提示点击与关闭
			fun () {
				this.str=!this.str
				if(this.str==true){this.code=true;this.msg=""}
		        if(this.str==false){this.code=false;this.msg="..."}
			},
			//进入页面获取标题和图片
			next () {			  
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
		      var recommend =sessionStorage.getItem('recommendId');

			  param.append('token',tokenone);   
			  param.append('id',recommend);

			  this.$ajax.post('query/webRecommend',param).then(function (response) { 
			  		
			  	if (response.data.complete=="SUCCESS") { 
			  		if (response.data.title) {
			  			_this.input=response.data.title
			  		} 
			  		
			  		if (response.data.imageUrl!=null && response.data.title!="") {
			  			let imgUrl =  response.data.fileServer+'/'+response.data.imageUrl;
			  			global.$emit("tabtwo",true)
			  			_this.photo=true			  
        				_this.img = imgUrl   											  			
			  		}		  
			  	}
			  
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
		    //删除确认
		    removeto() {
		    	this.photo=false
		    	this.exampleimg = ""
		    	this.dialogVisible=false
		    	var _this=this
			    let param = new FormData();

			    var tokenone =sessionStorage.getItem('encryptToken');
			    var recommend =sessionStorage.getItem('recommendId');

			    param.append('token',tokenone);
				param.append('id',recommend);
				param.append("longPicture",true)
				param.append("hrizontalPicture",true)   

				this.$ajax.post('delete/recommendDate',param).then(function (response) {
					if (response.data.complete=="SUCCESS") {
						global.$emit("tabtwo",false)
					}
				}).catch(function (error) {
				    console.log(error);
				})
		    },
			handleClose(done) {
		      	this.dialogVisible=false
		    },
		   //点击上传图片
		   update(e, num){
		          var _this =this  
		          var file = e.target.files[0]
		          const isLt2M = file.size / 1024 / 1024 < 1;
		          document.getElementById('fileto').value = "";
		          this.createReader(file, function (w, h) {
		          	if ( w < 300 || h <200 ) {
		               	_this.$message({
						   	message: '照片像素至少要达到300x200。请上传一张更高质量的照片。您的照片像素为'+ w +'x'+ h +'',
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
		        		let dolW = window.innerWidth;
		        		if (dolW > 600) {
		        			 _this.$store.commit('onOff')
		        			 _this.adaptation(w,h,1)
		        		}else{
		        			_this.imgfun(file)	
		        		}
		               
		                
		            }
   
		        })      
		          this.exampleimg=window.URL.createObjectURL(file)
		    },
		    adaptation(x,y,than){

				 let _this = this;
				
			     let dolW = window.innerWidth / 3 ;     // 窗口的宽 / 3 是容器的宽
			     let dolH = window.innerHeight - 40;	// 窗口的高 -40 是容器的高

			     var XoY = x/y;	//图片的宽高比值

			     
			     //长
				if (XoY > than && x >= dolW) {
					
					_this.widthData  = dolW; 
				    _this.heightData = dolW/XoY;
				    _this.autoCropWidth  = dolW/XoY/0.67 - 2;
				    _this.autoCropHeight = dolW/XoY - 2;
				    
				}

				else if (XoY > than && x < dolW){
					
					_this.widthData  = x; 
				    _this.heightData = y;
				    _this.autoCropWidth  = x/0.67 - 2;
				    _this.autoCropHeight = x - 2;
				}

				//竖
				else if(XoY < than && y >= dolH){
					_this.widthData  = dolH*XoY; 
				    _this.heightData = dolH;
				    _this.autoCropWidth  = dolH*XoY - 2;
				    _this.autoCropHeight = dolH*XoY*0.67 - 2;
				}

				else if (XoY < than && y < dolH){
					_this.widthData  = x; 
				    _this.heightData = y;
				    _this.autoCropWidth  = x - 2;
				    _this.autoCropHeight = x*0.67 - 2;
				}

				//方
				else if (XoY == than && y >= dolH){
					_this.widthData  = dolH; 
				    _this.heightData = dolH;
				    _this.autoCropWidth  = dolH - 2;
				    _this.autoCropHeight = dolH*0.67 - 2;
				}

				else if (XoY == than && y < dolH){
					_this.widthData  = x; 
				    _this.heightData = y;
				    _this.autoCropWidth  = x - 2;
				    _this.autoCropHeight = y*0.67 - 2;
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
			//点击保存并继续
			cover(){
				var _this=this
				//如果显示图片不等于空并且标题大于0
				if(this.img!="" && this.input.length>0) {

				  let param = new FormData();
			      var tokenone =sessionStorage.getItem('encryptToken');
			      var recommend =sessionStorage.getItem('recommendId');

			      param.append('token',tokenone);
				  param.append('id',recommend);
				  param.append("title",this.input)  
				  _this.$ajax.post('create/webRecommend',param).then(function (response) {
				  	if (response.data.complete=="SUCCESS"){
				  		global.$emit("tabtwo",true)
				  		_this.$router.push({
			        	  path: '/flow/slogan'
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
					
				}else{
					global.$emit("tabtwo",false)
					_this.$message('请填写标题并上传图片')	  
					return false;
				}								
			}
		},
		computed:{
			
		},
		created () {
			
		},
		mounted () {
			this.next()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.el-message{
	top: 500px !important;
}
.remove{
	z-index: 2;
	position: absolute;
	cursor:pointer;
	top: 10px;
	right: 10px;
	width: 25px;
	height: 25px;
	background: url(img/remove.png) no-repeat;
	background-size: 100% 100%;
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
.smallbox{
	display: none;
	width:300px;
	height:200px;
	background:black;
	color:white;
	text-align:center;
	line-height:200px;
	border-radius:5px;
	position:absolute;
	cursor:pointer;
	z-index:1;
}
.bigbox:hover .smallbox{
	display:block;
	opacity: 0.6;
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
	top: 650px;
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
	.cover{
		width: 100%;
		/*height: 1000px;*/
		position:relative;
		padding-bottom: 50px;
		overflow: hidden;
	}
	/*.cover::-webkit-scrollbar {display:none}*/
	.tishi{
		cursor: pointer;
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
	.upload{
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    border: 1px solid #999;
    text-decoration: none;
    color: #666;
}
.change{
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}

.bg{
	position:fixed;
	width: 100%;
	height: 100%;
	z-index: 100;
	top: 0;
	left:0;
	background: #000000;
}
.wrapper{
	width:400px;
	height:550px;
	float: right;
	margin-top: 100px;
	margin-right: 200px;
	}
.file {
	width: 100px;
	height: 40px;
    position: relative;
    display: inline-block;
    background:#409EFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    margin-top: 50px;
    overflow: hidden;
    color: white;
    text-align: center;
    text-decoration: none;
    text-indent: 0;
    line-height: 40px;
    cursor: pointer;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
   cursor: pointer;
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

@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-input{
		width: 100% !important;
	}
	.cover{
		margin-bottom: 50px;
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