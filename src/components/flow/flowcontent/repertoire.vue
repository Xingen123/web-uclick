<template>
	<div class="bg" v-show="$store.state.isBg">
			<div class="back cour" @click="$store.commit('onOff')"></div>
			<div class="text">编辑图库照片</div>			
			<div class="rotate cour" @click="rotateLeft">旋转90度</div>
			<button  class="btn cour"  @click="finish('blob')">保存</button>
			<button  class="btn2 cour" @click="$store.commit('onOff')" >取消</button>
			<div class="block" >
				    <span class="demonstration">默认</span>
				    <el-slider v-model="$store.state.value" ></el-slider>
			</div>

		<div class="wrapper" :style="{width: widthData+'px',height:heightData+'px'}">

			<vueCropper
				ref="cropper"
				:img="img"
				:full="example.full"
				:outputSize="example.size"
				:autoCrop="example.autoCrop"
				:autoCropWidth="autoCropWidth"
				:autoCropHeight="autoCropHeight"
				:fixedBox="example.fixedBox"
				:canScale="example.canScale"
				:canMove="example.canMove"
				:info="example.info"
				
			></vueCropper>
		</div>
	</div>	
	
</template>
<script>
import vueCropper from '@/components/login/vue-cropper'
import store from '@/store/store'
	export default{
		components:{
			vueCropper
		},
		data(){
			return{
				example: {
					full:true,
					size: 1,
					outputType: 'png',					
					info:false,
					autoCrop: true,
					fixedBox: true,
					canScale:false,
					canMove:true
				}
			}
		},
		props: {
			widthData:Number,
			heightData:Number,
			img:String,
			autoCropWidth:Number,
			autoCropHeight:Number,
		},
		watch:{
			'$store.state.value':{
				handler:function(val,val2){
					this.$refs.cropper.changeScale(Number(val-val2))
				}
			}
		},
		methods:{
			//旋转
			rotateLeft(){
				this.$refs.cropper.rotateLeft()
			},
			finish (type) {
			// 输出
			    var _this = this
				if (type === 'blob') {
						
					_this.$refs.cropper.getCropBlob((data) => {	
						console.log(data)
						_this.$emit('imgfun',data)

					})
				}
			},
		},
		computed:{

		},
		created () {},
		mounted () {},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.wrapper{
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(-10%, -50%);
    /*border: 1px solid red;*/
	}
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
.cour{
	cursor: pointer;
}
.block{	
	position: absolute;
	top: 400px;
	left: 100px;
	width: 300px;
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
	bottom: 100px;
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
	bottom: 100px;
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
</style>