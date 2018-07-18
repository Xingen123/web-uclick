<template>	
	<div class="about">
		<div style="font-size: 28px;">一段真诚的话介绍您自己</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">用流畅的语言介绍您自己，告诉大家您的成长经历、性格、兴趣爱好、技能特长等等，说明为何您是开展此次体验的最佳人选。有趣的个性和真诚的语言能让人们更愿意参加您的体验，与有意思的您交朋友。
</p>
		<el-input type="textarea"
  :rows="8"  placeholder="例：Hi，我是花椒。很多人问我为什么叫花椒，因为喜欢吃辣吗？因为是四川人吗？NoNoNo，其实是我几年前看到一本书，讲了花椒与辣椒口感的区别，花椒是麻的，带来的味觉更神秘更让人记忆深刻，所以我就叫花椒。我的好奇心很强，喜欢学习新鲜的东西，也喜欢探秘猎奇的事物，所以我对书籍、厨艺、健身、旅行、摄影、电影、搭配都了解一些……
" style="margin-top:50px;width:500px;font-size:20px;" v-model="input"  :maxlength="1500"  @input="descInput"></el-input>
		<!-- <p  style="line-height:40px;">还剩{{number}}个字</p> -->

<!-- 
		<div style="font-size: 28px;margin-top:50px;">为自己贴标签</div>
		<p style="margin-top:25px;color:#505050;width:550px;">贴合并且醒目得标签可以让用户更快得了解你，并对体验产生兴趣。</p>
		<el-tag
		style="margin-top:20px;"
		  :key="tag"
		  v-for="tag in dynamicTags"
		  closable
		  :disable-transitions="false"
		  @close="handleClose(tag)">
		  {{tag}}
		</el-tag>
		<el-input
		  style="margin-top:20px;display:block;"
		  class="input-new-tag"
		  v-if="inputVisible"
		  v-model="inputValue"
		  ref="saveTagInput"
		  size="small"
		  @keyup.enter.native="handleInputConfirm"
		  @blur="handleInputConfirm"
		>
		</el-input>
		<el-button style="margin-top:20px;" v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->

		


		<div style="margin-top:50px;" >
			<el-button type="primary"  style="width:120px;" :disabled="disabled" @click="sort">保存并继续</el-button>
		</div>

	</div>
</template>
<script>
import global from '@/components/flow/global/global'
	export default{
		components:{
		
		},
		data(){
			return{
				disabled:true,
				input:"",
				number:1500,
				dynamicTags: ['标签一', '标签二', '标签三'],
		        inputVisible: false,
		        inputValue: ''
			}
		},
		props: {},
		watch:{

		},
		methods:{
			  handleClose(tag) {
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
		        if (inputValue) {
		          this.dynamicTags.push(inputValue);
		        }
		        this.inputVisible = false;
		        this.inputValue = '';
		      },
			descInput(){
				var txtVal = this.input.length;
 				this.number =1500 - txtVal;
 				if (txtVal>0) {
 					this.disabled=false
 				}else{
 					this.disabled=true
 				}
			},
			numfun(){
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
			  		if (response.data.creatorBrief!=null) {
			  			global.$emit("tabfive",true)
			  			_this.disabled=false
			  			_this.input=response.data.creatorBrief
			  			_this.number=1500-response.data.creatorBrief.length
			  		}
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })
			},
			sort(){
			  var _this=this
		      let param = new FormData();
		      //获取cookie里面的token
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  //获取cookie里面的recommenid
		      var recommend =sessionStorage.getItem('recommendId');
			  param.append('id',recommend);
			  param.append('creatorBrief',this.input);  
			  this.$ajax.post('create/webRecommend',param).then(function (response) {			
			  	if (response.data.complete=="SUCCESS") {
			  		global.$emit("tabfive",true)
			  		 _this.$router.push({
				        path: '/flow/what'
				      })
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  })
			}
		},
		computed:{

		},
		created () {
			
		},
		mounted () {
			this.numfun()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 250px;
    vertical-align: bottom;
  }
  	@media screen and (max-width: 600px) {
	.text_p{
		width: 100% !important;
	}
	.el-textarea{
		width: 100% !important;
	}
	.about{
		margin-bottom: 50px;
	}
}
</style>