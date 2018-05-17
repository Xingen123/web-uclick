<template>	
	<div class="cover">
		<div style="font-size: 28px;">体验封面</div>
		<p style="margin-top:25px;color:#505050;width:550px;">清晰且独特的封面可以帮助您吸引更多的朋友，以下一些建议能帮助您获得良好的第一印象。</p>
		<p class="tishi"  @click="fun">提示和实列 {{msg}}</p>
		<div v-show="code" class="box">
			<div class="small">
				<div class="right"></span>选择与标题描述一致的图片</div>
				<div class="right"></span>图片尺寸比例为3:2，大小需小于1M</div>
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
		<!-- 标题 -->
		<div style="margin-top:60px;font-size: 20px;">体验标题</div>
		<p style="margin-top:5px;color:#505050;">例：尚珈丞 | 在网红咖啡店拍出最时尚的你</p>
		<el-input v-model="input" @input="descInput" placeholder="请输入内容" :maxlength="20" style="margin-top:20px;width:500px;"></el-input>
		<p  style="line-height:40px;">还剩{{number}}个字</p>
		<div style="margin-top:60px;font-size: 20px;">封面照片</div>
		<!-- 图片 -->
		<div v-show="photo" style="margin-top:10px;font-size:20px;">缩略图</div>
		<p v-show="photo">调整封面图，按您的喜好出现</p>
		<div v-show="photo" style="width:300px;height:200px;position:relative;" class="bigbox">
			<img v-lazy="img"   style="width:300px;height:200px;position:absolute;top:0;left:0;border:none;border-radius:5px;" alt="" >
			<div style="width:300px;height:200px;background:black;color:white;text-align:center;line-height:200px;border-radius:5px;position:absolute;cursor:pointer;z-index:1;" class="smallbox" @click="bgtrue"><div class="remove" @click.stop="dialogVisible=true"></div>编辑</div>
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
			<input class="change"  name="file" ref="file" type="file"  accept="image/png,image/gif,image/jpeg" @change="update($event, 1)"/>
			选择图片
		</div>

		<el-button type="primary"  @click="cover" style="display:block;margin-top:50px;">保存并继续</el-button>


		<!-- 截图区域 -->
		<div class="bg" v-if="bg">
			<!-- x -->
			<div class="back" @click="bg=false"></div>
			<div class="text">编辑封面照片</div>	

			<button  class="btn3"  @click="fin(-1)" >-</button>
			   <!-- 	 <el-slider  class="btn5"  @change="slider" v-model="value3"  :min="-10" :max='10' ></el-slider> -->
			<button  class="btn4"  @click="fin(+1)" >+</button>
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
					:fixed="example2.fixed"
					:fixedBox="example2.fixedBox"
					:fixedNumber="example2.fixedNumber"
				></vueCropper>			
			</div>
		</div>
	</div>
</template>
<script>
import global from '@/components/flow/global/global'
import vueCropper from '@/components/login/vue-cropper'
import axios from 'axios'
	export default{
		components:{
			vueCropper
		},
		data(){
			return{
				number:20,
				imageData:"",
				//标题
				dialogVisible: false,
				photo:false,
				bg:false,
				input:"",
				//提示和实列
				msg:"...",
				code:false,
				str:false,
				//
				img:"",
				example2: {
					full:true,
					img: '',
					info: true,
					size: 1,
					outputType: 'jpeg',
					canScale:true,
					autoCrop: true,
					// 只有自动截图开启 宽度高度才生效
					autoCropWidth: 300,
					autoCropHeight: 200,
					// 开启宽度和高度比例
					fixed: true,
					fixedBox:true,
					fixedNumber: [3,2]
					// original:true
				}
			}
		},
		props: {},
		watch:{

		},
		methods:{
			fin(val){
				this.$refs.cropper2.changeScale(val)
			},
			descInput(){
				var txtVal = this.input.length;
 				this.number =20 - txtVal;
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
			//进入页面获取用户输入的title
			next () {			  
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var recommend =sessionStorage.getItem('recommendId');
			  param.append('id',recommend);   
			  this.$ajax.post('query/webRecommend',param).then(function (response) { 
			  		
			  	if (response.data.complete=="SUCCESS") {  	
			  		_this.input=response.data.title
			  		if (response.data.title) {
			  			_this.number=20-response.data.title.length
			  		}	
			  		if (response.data.imageUrl!=null && response.data.title!="") {
			  			global.$emit("tabtwo",true)
			  			_this.photo=true			  
        				_this.img =response.data.fileServer+'/'+response.data.imageUrl
        				_this.example2.img =response.data.fileServer+'/'+response.data.imageUrl
    			  										
        											  			
			  		}		  
			  	}
			  
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			//编辑按钮点击
			bgtrue(){
				console.log(this.img)
				// this.img=this.example2.img
				this.bg=true
			},
			//旋转
			rotateLeft(){
				this.$refs.cropper2.rotateLeft()
			},
		    //删除确认
		    removeto() {
		    	this.photo=false
		    	this.example2.img = ""
		    	this.dialogVisible=false
		    	var _this=this
			    let param = new FormData();
			      //获取cookie里面的token
			    var tokenone =sessionStorage.getItem('encryptToken');
				param.append('token',tokenone);
				  //获取cookie里面的recommenid
			    var recommend =sessionStorage.getItem('recommendId');
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
			update(e,num){
				var _this=this
			    let file = e.target.files[0];
			    const isLt2M = file.size / 1024 / 1024 < 1;
		        if (!isLt2M) {
		          this.$message.error('上传图片大小不能超过 1MB!');
		          return false
		        }else{
		          this.bg=true
		          this.photo=true
		          this.img=window.URL.createObjectURL(file);  
		          this.example2.img=window.URL.createObjectURL(file);  
		        }		
		        var reader = new FileReader()

				reader.onload = (e) => {
					let data
					if (typeof e.target.result === 'object') {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]))
					} 
					else if (num === 1) {
						_this.example2.img = data
						console.log(2)
					} else {
						console.log(3)
						data = e.target.result
					}
				    reader.readAsDataURL(file)  
				    	         
				}
			},
			finishphoto(data){
				var _this=this
					let param = new FormData();
					      //获取cookie里面的token
					      var tokenone =sessionStorage.getItem('encryptToken');
						  param.append('token',tokenone);
						  //获取cookie里面的recommenid
					      var recommend =sessionStorage.getItem('recommendId');
						  param.append('id',recommend);
						  // param.append("title",this.input)  
						  param.append("imageFile",data) 
						  _this.$ajax.post('create/webRecommend',param).then(function (response) {

						  	if (response.data.complete=="SUCCESS") {
						  		_this.example2.img = window.URL.createObjectURL(data)
						  		_this.img = window.URL.createObjectURL(data)
						  		_this.bg=false				  		
						  	}
						 })
			},
			//截图确认
			finish (type) {
			// 输出
				if (type === 'blob') {
					this.$refs.cropper2.getCropBlob((data) => {				
						this.finishphoto(data)
					})
				}
			},
			//点击保存并继续
			cover(){
				var _this=this

				//如果显示图片不等于空并且标题大于0
				if(this.img!="" && this.input.length>0) {				
				  let param = new FormData();
			      //获取cookie里面的token
			      var tokenone =sessionStorage.getItem('encryptToken');
				  param.append('token',tokenone);
				  //获取cookie里面的recommenid
			      var recommend =sessionStorage.getItem('recommendId');
				  param.append('id',recommend);
				  param.append("title",this.input)  
				  // param.append("imageFile",this.$refs.file.files[0]) 
				  _this.$ajax.post('create/webRecommend',param).then(function (response) {
				  	if (response.data.complete=="SUCCESS"){
				  		global.$emit("tabtwo",true)
				  		_this.$router.push({
			        	  path: '/flow/slogan'
			      		})
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
	z-index: 2;
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
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    /*opacity: 0;*/
}

</style>