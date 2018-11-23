<template>
  <div class="activity">
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin:50px;" label-width="150px"  class="demo-ruleForm">
          <div class="boxActivity">
            <h1 style="text-align:center;">新手注册页面修改</h1>
             <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="背景颜色" prop="bgColor">
              <el-input v-model="ruleForm.bgColor"></el-input>
            </el-form-item>
            
            <el-form-item label="邀请人文字颜色" prop="topText">
              <el-input v-model="ruleForm.topText"></el-input>
            </el-form-item>
            <el-form-item label="按钮背景颜色" prop="buttonBg">
              <el-input v-model="ruleForm.buttonBg"></el-input>
            </el-form-item>
            <el-form-item label="按钮字体颜色" prop="buttonColor">
              <el-input v-model="ruleForm.buttonColor"></el-input>
            </el-form-item>

 
  
 
  

            <el-form-item label="banner标题" prop="bannerName">
              <el-input v-model="ruleForm.bannerName"></el-input>
            </el-form-item>
            <el-form-item label="banner标题颜色" prop="bannerNameColor">
              <el-input v-model="ruleForm.bannerNameColor"></el-input>
            </el-form-item>

            <el-form-item label="活动规则标题" prop="activityName">
              <el-input v-model="ruleForm.activityName"></el-input>
            </el-form-item>
            <el-form-item label="活动规则标题颜色" prop="activityNameColor">
              <el-input v-model="ruleForm.activityNameColor"></el-input>
            </el-form-item>

            <el-form-item label="活动规则" prop="activityContent">
              <el-input type="textarea" style="width:300px;"  v-model="ruleForm.activityContent"></el-input>
            </el-form-item>
            <el-form-item label="活动规则颜色" prop="activityContentColor">
              <el-input v-model="ruleForm.activityContentColor"></el-input>
            </el-form-item>
            <el-form-item label="活动规则border颜色" prop="borderColor">
              <el-input v-model="ruleForm.borderColor"></el-input>
            </el-form-item>
            <el-form-item label="活动最底部文字颜色" prop="activityButtonColor">
              <el-input v-model="ruleForm.activityButtonColor"></el-input>
            </el-form-item>
            <el-form-item label="新手注册头部图片" prop="imageUrl">
                    <input v-show="imgBox"  name="file" ref="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
                    <img style="width:300px;" :src="ruleForm.imageUrl" alt="">

            </el-form-item>
          </div>
          <div class="boxActivityTwo">
             <h1 style="text-align:center;">分享有礼页面修改</h1>
        
               <el-form-item label="背景颜色" prop="shareBgColor">
                <el-input v-model="ruleForm.shareBgColor"></el-input>
              </el-form-item>
            
              <el-form-item label="点击后的字体颜色" prop="clickColor">
                <el-input v-model="ruleForm.clickColor"></el-input>
              </el-form-item>
              <el-form-item label="没点击的字体颜色" prop="noClickColor">
                <el-input v-model="ruleForm.noClickColor"></el-input>
              </el-form-item>  
              <el-form-item label="切换box的背景颜色" prop="oneBoxBgColor">
                <el-input v-model="ruleForm.oneBoxBgColor"></el-input>
              </el-form-item>  
              <el-form-item label="切换box的字体颜色" prop="oneBoxColor">
                <el-input v-model="ruleForm.oneBoxColor"></el-input>
              </el-form-item> 
              <el-form-item label="规则box的背景颜色" prop="twoBoxBgColor">
                <el-input v-model="ruleForm.twoBoxBgColor"></el-input>
              </el-form-item> 
              <el-form-item label="规则box的字体颜色" prop="twoBoxColor">
                <el-input v-model="ruleForm.twoBoxColor"></el-input>
              </el-form-item> 
              <el-form-item label="底部字体颜色" prop="bottomText">
                <el-input v-model="ruleForm.bottomText"></el-input>
              </el-form-item> 
              <el-form-item label="分享有礼头部图片" prop="headImg">
                    <input v-show="headImgBox"  name="file" ref="file" type="file" accept="image/png,image/gif,image/jpeg" @change="updateTwo"/>
                    <img style="width:300px;" :src="ruleForm.headImg" alt="">

            </el-form-item>
          </div>
            
          <div class="fixed" style="clear:both;">
             <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </div>

           
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgBox:true,
        headImgBox:true,
        ruleForm: {
          name: '',
          bgColor: '',
          bannerName:"",
          bannerNameColor:"",
          activityName:"",
          activityNameColor:"",
          activityContent: '',
          activityContentColor:"",
          activityButtonColor: '',
          imageUrl: '',
          headImg:"",
          file:"",
          fileTwo:"",
          borderColor:"",
          topText:"",
          buttonBg :"",
          buttonColor:"",
          borderColor :"",
          shareBgColor :"",
          clickColor:"",
          noClickColor:"",
          oneBoxColor:"",
          oneBoxBgColor:"",
          twoBoxColor:"",
          twoBoxBgColor:"",
          bottomText:""
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'change' }
          ],
          bgColor: [
            { required: true, message: '请输入背景颜色', trigger: 'change' }
          ],
          bannerName:[
            { required: true, message: '请输入banner标题', trigger: 'change' }
          ],
          bannerNameColor:[
            { required: true, message: '请输入banner标题颜色', trigger: 'change' }
          ],
          activityName:[
            { required: true, message: '请输入活动规则标题', trigger: 'change' }
          ],
          activityNameColor:[
            { required: true, message: '请输入活动规则标题颜色', trigger: 'change' }
          ],
          activityContent:[
            { required: true, message: '请输入活动规则', trigger: 'change' }
          ],
          activityContentColor:[
            { required: true, message: '请输入活动规则颜色', trigger: 'change' }
          ],
          activityButtonColor:[
            { required: true, message: '请输入活动最底部文字颜色', trigger: 'change' }
          ],
          imageUrl:[
            { required: true, message: '新手注册头部图片', trigger: 'change' }
          ],
          headImg:[
            { required: true, message: '请上传分享有礼头部图片', trigger: 'change' }
          ],

          borderColor:[
            { required: true, message: '请输入活动规则border颜色', trigger: 'change' }
          ],
          topText:[
            { required: true, message: '请输入邀请人文字颜色', trigger: 'change' }
          ],
          buttonBg :[
            { required: true, message: '请输入按钮背景颜色', trigger: 'change' }
          ],
          buttonColor:[
            { required: true, message: '请输入按钮字体颜色', trigger: 'change' }
          ],
          shareBgColor :[
            { required: true, message: '请输入背景颜色', trigger: 'change' }
          ],
          clickColor:[
            { required: true, message: '请输入点击文字颜色', trigger: 'change' }
          ],
          noClickColor:[
            { required: true, message: '请输入非点击文字颜色', trigger: 'change' }
          ],
          oneBoxColor:[
            { required: true, message: '请输入第一个box背景颜色', trigger: 'change' }
          ],
          oneBoxBgColor:[
            { required: true, message: '请输入第一个box字体颜色', trigger: 'change' }
          ],
          twoBoxColor:[
            { required: true, message: '请输入第二个box背景颜色', trigger: 'change' }
          ],
          twoBoxBgColor:[
            { required: true, message: '请输入第二个box字体颜色', trigger: 'change' }
          ],
          bottomText:[
            { required: true, message: '请输入底部文字颜色', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             var value =sessionStorage.getItem('value');
             if (value) {
              this.sublime()
             }else{
                this.$message.error('小b,能滴不是你了，活腻歪了吧！！！');
             }
          } else {
            console.log(this.ruleForm.file,this.ruleForm.fileTwo);
            return false;
          }
        });
      },
      resetForm(formName) {
         this.imgBox=true
         this.headImgBox=true
        this.$refs[formName].resetFields();
      },
      update(event){
        let file = event.target.files[0];

        if (file) {
          this.imgBox=false
          this.ruleForm.file=file
          this.ruleForm.imageUrl=window.URL.createObjectURL(file);     

        }
          console.log(event);
      },
      updateTwo(event){
        let file = event.target.files[0];

        if (file) {
          this.headImgBox=false
          this.ruleForm.fileTwo=file
          this.ruleForm.headImg=window.URL.createObjectURL(file);     

        }
      },
      login(){
         var value =sessionStorage.getItem('value');
        if (value) {
            return ;
        }else{
            this.$prompt('请输入密码', '登录', {
              confirmButtonText: '确定',
              showCancelButton:false,
              showClose:false,
              inputType:"password",
              inputPattern: /^xing[8][8]$/,
              inputErrorMessage: '密码不正确',
              closeOnClickModal:false
            }).then(({ value }) => {
              sessionStorage.setItem('value',value)
              this.$message({
                type: 'success',
                message: '登录成功' 
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });       
            });
        }
      },
      sublime(){
        console.log(1)
              var _this=this
              let param = new FormData();
              param.append('id','C823133B45604D369BE9FFA7BB6C364C'); 
              param.append('name',this.ruleForm.name); 
              param.append('bgColor',this.ruleForm.bgColor);
              param.append('bannerTitle',this.ruleForm.bannerName); 
              param.append('bannerTitleColor',this.ruleForm.bannerNameColor); // 
              param.append('activityRuleTitle',this.ruleForm.activityName); //
              param.append('activityRuleColor',this.ruleForm.activityNameColor); //
              param.append('activityRuleTitleColor',this.ruleForm.activityContentColor);
              param.append('activityRule',this.ruleForm.activityContent); 
              param.append('activityBottomTextColor',this.ruleForm.activityButtonColor);

              param.append('topText',this.ruleForm.topText); 
              param.append('buttonBg',this.ruleForm.buttonBg); 
              param.append('buttonColor',this.ruleForm.buttonColor); 
              param.append('borderColor',this.ruleForm.borderColor);
              param.append('shareBgColor',this.ruleForm.shareBgColor);  
              param.append('clickColor',this.ruleForm.clickColor);
              param.append('noClickColor',this.ruleForm.noClickColor);
              param.append('oneBoxColor',this.ruleForm.oneBoxColor);
              param.append('oneBoxBgColor',this.ruleForm.oneBoxBgColor);
              param.append('twoBoxColor',this.ruleForm.twoBoxColor);
              param.append('twoBoxBgColor',this.ruleForm.twoBoxBgColor);
              param.append('bottomText',this.ruleForm.bottomText);   

              param.append('imageFile',this.ruleForm.file); 
              param.append('otherImageFile',this.ruleForm.fileTwo);
              this.$ajax.post('create/createWebClickMessage',param).then(function (response) {
                console.log(response)
                if (response.status==200){
                   
                    
                   
                }
              }).catch(function (error) {
                  console.log(error);
              });
      },
      
      query(){
              var _this=this
              let param = new FormData();
              param.append('id','C823133B45604D369BE9FFA7BB6C364C'); 
              this.$ajax.post('query/webWebClickMessage',param).then((response)=> {
                console.log(response)
                if (response.status==200){
                    this.ruleForm.name = response.data.name 
                    this.ruleForm.bgColor = response.data.bgColor 
                    this.ruleForm.bannerName = response.data.bannerTitle
                    this.ruleForm.bannerNameColor = response.data.bannerTitleColor
                    this.ruleForm.activityName = response.data.activityRuleTitle
                    this.ruleForm.activityNameColor = response.data.activityRuleColor
                    this.ruleForm.activityContent =  response.data.activityRule 
                    this.ruleForm.activityContentColor  =  response.data.activityRuleTitleColor
                    this.ruleForm.activityButtonColor = response.data.activityBottomTextColor 
                    this.ruleForm.imageUrl  = response.data.headImage
                    this.ruleForm.headImg = response.data.shareHeadImage
                    this.ruleForm.topText= response.data.topText 
                    this.ruleForm.buttonBg= response.data.buttonBg  
                    this.ruleForm.buttonColor= response.data.buttonColor 
                    this.ruleForm.borderColor= response.data.borderColor  
                    this.ruleForm.shareBgColor= response.data.shareBgColor  
                    this.ruleForm.clickColor = response.data.clickColor
                    this.ruleForm.noClickColor = response.data.noClickColor
                    this.ruleForm.oneBoxColor = response.data.oneBoxColor
                    this.ruleForm.oneBoxBgColor = response.data.oneBoxBgColor
                    this.ruleForm.twoBoxColor = response.data.twoBoxColor
                    this.ruleForm.twoBoxBgColor = response.data.twoBoxBgColor
                    this.ruleForm.bottomText = response.data.bottomText 
                }
              }).catch(function (error) {
                  console.log(error);
              });
      },
    },
    mounted () {
      this.query()
      this.login()
    },
  }
</script>
<style scoped>
  .activity{
  }
  .el-input{
    width: 300px !important;
  }
  .el-form-item__label{
    width: 300px !important;
  }
  .boxActivity{
    width: 45%;
    min-width: 646px;
    float: left;
    padding-top: 20px;
    box-sizing: border-box;
    border:1px solid black; 
  }
  .boxActivityTwo{
    width: 45%;
    min-width: 646px;
    float: left;
    margin-left: 20px;
     padding-top: 20px;
    box-sizing: border-box;
    border:1px solid black; 
  }
  .fixed{
    height:60px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;

  }

</style>