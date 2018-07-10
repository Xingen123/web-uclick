<template>	
	<div class="login"> 
		<div class="logoshow"  @click="$router.push({path: '/show'})"></div>
		<div class="perfect">

			<div style="font-size:25px;">完善个人信息</div>	

			<div style="position:relative;">
				<input type="text" class="width" placeholder="输入您的昵称" v-model="name" >
				<input type="text" class="width" style="margin-top:10px;" placeholder="输入您的职业" v-model="profession" @keyup.enter="next">

				<div style="position:absolute;    top: 40px;
    right: -10px;">
					<a  class="upload" :style="{backgroundImage:'url(' + head + ')'}">
					<div v-text="headtext"></div>		
	    				<input class="change"  name="file" ref="file" type="file"  accept="image/png,image/gif,image/jpeg" @change="update"/>
					</a>
				</div>
			</div>
			<div style="font-size:25px;margin-top:20px;">添加个人标签</div>

			<el-tag
			style="margin-top:15px;"
			  :key="tag"
			  v-for="tag in dynamicTags"
			  closable
			  :disable-transitions="false"
			  @close="handleClose(tag)">
			  {{tag}}
			</el-tag>
			<div>
			<el-input
			  class="input-new-tag"
			  v-if="inputVisible"
			  v-model="inputValue"
			  ref="saveTagInput"
			  size="small"
			  :maxlength="5"
			  @keyup.enter.native="handleInputConfirm"
			  @blur="handleInputConfirm"
			  @input="oninput"
			>
			</el-input>

				<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
				<ul class="inputbox"  v-show="inputbox">
					<li v-for="item in  inputContent"  :key="item" @click="inputli(item)"><span>{{item}}</span></li>
				</ul>
			</div>

			<el-button type="primary" class="submit" @click="submit">完成</el-button>
		</div>
	</div> 
</template>
<script>
	export default{
		components:{

		},
		data(){
			return{
				headtext:"添加头像",
				head:"black",
				name:"",
				profession:"",
				inputbox:false,
				inputContent: ['性情中人','戏精份子','无辣不欢','胡同串子','复古爱好者','一滴酒脸红','假正经','五音不全','旅行患者','聚会大厨','间歇文艺癌','大概路痴','酒腻子','相过亲','美食雷达','灵魂歌者','耳机发烧友','喝酸奶舔盖','办过演出','无敌麦霸','王者荣耀','业余摄影师','韩剧迷','美剧迷','运营喵','产品汪','策展人','手工艺人','大长腿','苦逼媒体人','安卓党','不资深影迷','自由职业','少年干过仗','无敌吃货'],
				dynamicTags: [],
		        inputVisible: false,
		        inputValue: ''
			}
		},
		props: {},
		watch:{
		},
		methods:{
			personage(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.name=response.data.name
			  		_this.dynamicTags=response.data.relateTitle
			  		if (response.data.weedfsId) {
						_this.headtext="更换头像"
			  		}
			  		_this.head=response.data.fileServer+"/"+response.data.weedfsId
			  		_this.profession=response.data.job
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			update(e){
				let _this=this
				if (e) {
    				let file = e.target.files[0];
					
			        this.head=window.URL.createObjectURL(file);
			        this.headtext=""
				}		                      
			},

			submit(){
			  let _this=this
			  var head = this.head;
			  let headimg = _this.$refs.file.files[0];
			 
			  
		      let param = new FormData();
		      let tokenone =sessionStorage.getItem('encryptToken');
		      let name = this.name;
		      let profession= this.profession;
		      let dynamicTags = this.dynamicTags;
		      if (!name) {
		      		_this.$message('请填写名字') 
				return false;
		      }
		      if (!profession) {
		      		_this.$message('请填写职业') 
				return false;
		      }
		      if (!headimg && !head) {
		      		_this.$message('还没有上传头像') 
				return false;
		      }
		      if (dynamicTags.length==0) {
		      		_this.$message('请选择您的标签') 
				return false;
		      }
			  param.append('token',tokenone);
			  param.append('name',this.name);//姓名
			  param.append('job',this.profession);//职业
			  param.append('nextImageFile',headimg);//头像	  
			  param.append('relateTitle',this.dynamicTags);//标签
			  this.$ajax.post('update/webUser',param).then(function (response) {

			  	if (response.data.complete=="SUCCESS") {
			  		 _this.$message({
					    message: '提交成功',
					    type: 'success',
					    duration:1000
					})  
			  		 setTimeout(function(){			  		
			  		 	_this.$router.push({
							path: '/index'
						}) 
			  		 },1500)

			  	}else{
			  		_this.$message("提交失败")
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });

			},
				inputli(item){
					let dynamicTags = this.dynamicTags;
					let idea = JSON.stringify(dynamicTags).indexOf(JSON.stringify(item))!=-1
					console.log(idea);
					if (dynamicTags.length<6 && idea == false) {
						this.dynamicTags.push(item);
					}else if(idea == true){
						this.$message({
					    	message: '标签不能重复',
					    	type: 'error',
					    	duration:1000
					 	})	
					}
					else{
						this.$message({
					    	message: '最多添加六个标签',
					    	type: 'error',
					    	duration:1000
					 	})	
					}

					
				},
			      handleClose(tag) {
			        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			      },
			      oninput(){

			      	let _this = this
			      	let inputValue = this.inputValue
			      	if (inputValue.length>4) {
			      		_this.$message({
					    	message: '最多五个字',
					    	duration:1000
					 	})	
			      	}

			      },
			      showInput() {

			      	this.inputbox=true
			        this.inputVisible = true;
			        this.$nextTick(_ => {
			          this.$refs.saveTagInput.$refs.input.focus();
			        });
			      },

			      handleInputConfirm() {
			      	let _this = this
			      	
			        let inputValue = this.inputValue;
			        if (inputValue) {
			          this.dynamicTags.push(inputValue);
			        }
			        this.inputVisible = false;
			        this.inputValue = '';
			        setTimeout(function(){_this.inputbox=false},150)
			      }
		},
		computed:{

		},
		created () {},
		mounted () {
			this.personage()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
.perfect{
		width: 300px;
		height: 450px;
		    position: fixed;
    top: 150px;
    right:10%;
		background: rgba(0,0,0,0.4);
		color: white;

		border-radius: 5px;
		padding: 35px;
}
	.imghead{
		display: block;
		margin-left: 150px;
		width: 100px;
		height: 100px;
		border-radius: 50px;
		border: 1px solid gray;
	}
	.upload{
	cursor:pointer;	
	display: block;
	width: 100px;
	height: 100px;

	text-align: center;
	line-height: 100px;
    font-size: 20px;
    border-radius: 50px;
    position: relative;
    text-decoration: none;
    color:white;
    border: 1px solid white;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.change{
	cursor:pointer;
	width: 100px;
	height: 100px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}
	.width{
	width:60%;
	height: 42px;
	background: rgba(0,0,0,0);
	margin-top:25px;
	border: none;
	border-bottom:1px solid white;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,.1);
    -o-transition: all .2s;
    
	}
		@media screen and (max-width:600px) {
	    .perfect{
	    	top: 100px;
	    	right: 0;
	    	left: 0;
	    	margin: 0 auto;
	    }
	}
	.submit{
		width:100%;
	    	height: 40px;
	    	margin-top: 30px;
	}
		 input::-webkit-input-placeholder{
            color:#fff;
     }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#fff;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#fff;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#fff;
        }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
	.el-tag{
		background: rgba(0,0,0,0.7);
		border: none;
	}
  .button-new-tag {
  	width: 300px;
  
    height: 32px;
    margin-top: 15px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 300px;
    margin-top: 15px;
    vertical-align: bottom;

  }
  .inputbox{
	padding: 10px;
    height: 300px;
    overflow-y:auto;
  	border-radius: 5px;
	position: absolute;
  	background: rgb(0,0,0,0.8);
  }
  .inputbox::-webkit-scrollbar {display:none}
  .inputbox>li{
	padding: 5px;
	background: rgb(0,0,0,0.8);
  	margin-left: 3%;
  	margin-top: 10px;
  	text-align: center;
	cursor: pointer;
  	font-size: 15px;
  	border: 1px solid gray;
  	float: left;
  }

</style>