<template>	
	<div class="self">
		<head-er></head-er>
		<div style="padding:70px 50px 50px 400px">
			<div style="font-size:28px;">个人资料</div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">姓名</span><el-input type="text" :maxlength="6"  style="margin-left:50px;width:200px;height:20px;" v-model="name"></el-input></div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">年龄</span><el-input type="number" @input="descInput"  onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"  style="margin-left:50px;width:200px;height:20px;" v-model="age"></el-input></div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">职业</span><el-input style="margin-left:50px;width:200px;height:20px;" type="text" :maxlength="10" v-model="profession"></el-input></div>

			<div style="margin-top:50px;">
				<span style="width:100px;display:inline-block;">头像</span>
				<img  class="imghead" :src="head" alt="">
				<a  class="upload">
				添加头像					
    				<input class="change"  name="file" ref="file" type="file"  accept="image/png,image/gif,image/jpeg" @change="update"/>
				</a>

			</div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">手机号码</span><el-input :disabled="true" v-model="phone" style="margin-left:50px;width:200px;height:20px;"></el-input></div>
			<div style="margin-top:50px;"><span style="width:100px;display:inline-block;">身份验证</span><span style="margin-left:50px;color:#409EFF;cursor:pointer;" v-text="yz" @click="veri"></span></div>
			<div style="font-size:28px;margin-top:20px;">个人介绍</div>
			<el-input
			  type="textarea"
			  :rows="5" style="width:300px;margin-top:20px;"
			  placeholder="请输入内容"
			  v-model="myself">
			</el-input>
			<div style="font-size:28px;margin-top:20px;">希望通过体验传递什么</div>
			<el-input
			  type="textarea"
			  :rows="5"  style="width:300px;margin-top:20px;"
			  placeholder="请输入内容"
			  v-model="textarea">
			</el-input>

			<!-- 标签 -->
			<div style="margin-top:50px;">	
				<div style="font-size:28px;margin-top:20px;">为自己贴签</div>
				<p style="margin-top:15px;color:#505050;width:550px;">贴合并且醒目的标签可以让用户更快的了解你,并对体验产生兴趣。</p>
				<el-tag
				style="margin-top:15px;"
				  :key="tag"
				  v-for="tag in dynamicTags"
				  closable
				  :disable-transitions="false"
				  @close="handleClose(tag)">
				  {{tag}}
				</el-tag>
				<el-input
				  class="input-new-tag"
				  v-if="inputVisible"
				  v-model="inputValue"
				  ref="saveTagInput"
				  size="small"
				  :maxlength="5"
				  @keyup.enter.native="handleInputConfirm"
				  @blur="handleInputConfirm"
				>
				</el-input>
				<el-button  v-else class="button-new-tag" size="small"  @click="showInput">+ New Tag</el-button>				
			</div>



			<el-button type="primary" style="width:100px;margin-top:50px;display:block;" @click="submit">提交</el-button>
		</div>

	</div>
</template>
<script>
	import Header from "@/components/head/head"
	export default{
		components:{
			"head-er":Header
		},
		data(){
			return{
				head:"",
				name:"",
				age:"",
				profession:"",
				phone:"",
				myself:"",
				textarea:"",
				yz:"",
				dynamicTags: [],
		        inputVisible: false,
		        inputValue: ''
			}
		},
		props: {},
		watch:{

		},
		methods:{
			descInput(){
				if (this.age.length>3) {
					this.age=""
				}
			},
			handleClose(tag) {
				console.log(1)
		        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
		      },

		      showInput() {
		        this.inputVisible = true;
		        this.$nextTick(_ => {
		          this.$refs.saveTagInput.$refs.input.focus();
		        });
		      },

		      handleInputConfirm() {
		        let inputValue = this.inputValue;
		        let dynamicTags = this.dynamicTags.length;
		        if (inputValue) {
		        	if (dynamicTags<6) {
		        		this.dynamicTags.push(inputValue);
		        	}else{
		        		this.$message({
				          showClose: true,
				          message: '最多添加6个标签',
				          type: 'warning'
				        });
		        	}		          	
		        }
		        this.inputVisible = false;
		        this.inputValue = '';
		      },

		      label(name){

				let _this = this

				let param = new FormData(); 

				param.append('token',tokenone);

				param.append('name',name);

				_this.$ajax.post('create/webRelateTitle',param).then(response=>{
					if (response.data.complete=="SUCCESS") {

					}
				})  

			},

			veri(){
				this.$router.push({
					path: '/verification'
				})
			},
			//上传用户头像
			update(e){
				var _this=this
			    let file = e.target.files[0];
			     this.head=window.URL.createObjectURL(file);  
			                      
			},
			//获取用户资料
			personage(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.name=response.data.name
			  		_this.phone=response.data.phone
			  		_this.myself=response.data.title
			  		_this.textarea=response.data.content
			  		_this.dynamicTags=response.data.relateTitle
			  		_this.head=response.data.fileServer+"/"+response.data.weedfsId
			  		_this.profession=response.data.job
			  		_this.age=response.data.age
			  		if (response.data.cardFront==null && response.data.cardBack==null) {
			  		  	_this.yz="未验证(点击验证)"
			  		}else if(response.data.cardFront!=null && response.data.cardBack!=null){
			  			_this.yz="已验证"
			  		}
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			submit(){
			  var _this=this
			  var headimg = this.$refs.file.files[0]
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  param.append('name',this.name);//姓名
			  param.append('age',this.age);//年龄
			  param.append('job',this.profession);//职业
			  param.append('nextImageFile',headimg);//头像
			  param.append('title',this.myself);//个人介绍
			  param.append('content',this.textarea);//体验传递什么			  
			  param.append('relateTitle',this.dynamicTags);//标签
			  this.$ajax.post('update/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		 _this.$message({
					    message: '提交成功',
					    type: 'success'
					})  
			  		_this.$router.push({
					path: '/home'
					}) 
			  	}else{
			  		_this.$message("提交失败")
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
				
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
	.self{
		width: 100%;
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
	height: 40px;
	margin-top: 10px;
	margin-left: 150px;
	text-align: center;
    line-height: 40px;
    border-radius: 3px;
    position: relative;
    border: 1px solid #999;
    text-decoration: none;
    color:white;
    background:gray;
}
.change{
	cursor:pointer;
	width: 100px;
	height: 40px;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
}

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
     margin-top:15px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
  	display:block;
    width: 250px;
    margin-top: 15px;
    vertical-align: bottom;
  }
</style>