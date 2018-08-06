<template>	
	<div class="about">
		<div style="font-size: 28px;">一段真诚的话介绍您自己</div>
		<p style="margin-top:25px;color:#505050;width:550px;" class="text_p">用流畅的语言介绍您自己，告诉大家您的成长经历、性格、兴趣爱好、技能特长等等，说明为何您是开展此次体验的最佳人选。有趣的个性和真诚的语言能让人们更愿意参加您的体验，与有意思的您交朋友。
		</p>
		<popup :hint="hint" :column="column"></popup>
		<el-input type="textarea"
  :rows="8"  placeholder="" style="width:500px;font-size:20px;" v-model="input"  :maxlength="1500"  @input="descInput"  ></el-input>
		<!-- <p  style="line-height:40px;">还剩{{number}}个字</p> -->
		<div style="margin-top:50px;" >
			<el-button type="primary"  style="width:120px;" :disabled="disabled" @click="sort('1')">保存并继续</el-button>
		</div>

	</div>
</template>
<script>
import popup from '@/components/flow/popup/pAbout'
import global from '@/components/flow/global/global'
	export default{
		components:{
			popup
		},
		data(){
			return{
				hint:"提示和实例",
				column:[
					{
						content:"突显您的专业知识",	
						text:"告诉大家您为何有资格成为Befriend体验达人。详细介绍您的卓越技能、文凭证书乃至学习、生活经历，让大家相信您是一位值得结交的体验达人。",
						content2:"展现您的独特个性",
						text2:"充分展示您的兴趣爱好、独特个性，不要拘谨。您可以分享一段有意思的个人趣事或经历。",
						img:"../../../../static/popup/head1.png",
						name:"阿亮",
						profession:"调酒师",
						introduce:"我是阿亮，由摇滚青年变身的职业大叔。来北京十年，入行调酒师九年，曾荣获报乐力加传奇调酒师全国冠军，现致力于酒吧经营以及调酒师培训工作。",
						motto:"座右铭：能动手解决的事绝不动嘴～"
					},
					{
						content:"突显您的专业知识",	
						text:"告诉大家您为何有资格成为Befriend体验达人。详细介绍您的卓越技能、文凭证书乃至学习、生活经历，让大家相信您是一位值得结交的体验达人。",
						content2:"展现您的独特个性",
						text2:"充分展示您的兴趣爱好、独特个性，不要拘谨。您可以分享一段有意思的个人趣事或经历。",
						img:"../../../../static/popup/head2.png",
						name:"张老师",
						profession:"",
						introduce:"我是张老师，艺术专业的大学老师，有些特立独行的我与舞蹈相伴了25年。我平时爱好美食，工作之余专心研究私房菜品盒甜品，曾拜入法国MOF、日本甜品大师门下，专注学习甜品技艺。",
						motto:""
					},
					{
						content:"突显您的专业知识",	
						text:"告诉大家您为何有资格成为Befriend体验达人。详细介绍您的卓越技能、文凭证书乃至学习、生活经历，让大家相信您是一位值得结交的体验达人。",
						content2:"展现您的独特个性",
						text2:"充分展示您的兴趣爱好、独特个性，不要拘谨。您可以分享一段有意思的个人趣事或经历。",
						img:"../../../../static/popup/head3.png",
						name:"泰尧",
						profession:"",
						introduce:"Hi，我是泰尧，深陷于篆刻这一中国千年传统艺术长达15年，痴迷于方寸之间的细腻之美与万千气象。目前在老北京胡同里用心打造了一个超cool的复古艺术实验室。",
						motto:""
					}
				],
				disabled:true,
				input:"",
				number:1500,
				dynamicTags: ['标签一', '标签二', '标签三'],
		        inputVisible: false,
		        inputValue: '',
		        timer:""
		        
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
				var _this = this 
				var txtVal = this.input.length;
 				this.number =1500 - txtVal;
 				clearTimeout(this.timer)
 									
				this.timer =  setTimeout(function(){
						 _this.sort('2')		  		

				},5000);


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

			sort(num){
			  var _this = this
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

			  		 if (num == '1' ) {
			  		 	 _this.$router.push({
				        	path: '/flow/what'
				    	})
			  		 }
			  		 _this.$message({
							type: 'success',
							message: '保存成功!',
							duration:1500
					});
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