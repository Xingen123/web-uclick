<template>
    <div>
        
<!--           <div class="color-list">
        <div class="color-item"  v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }" :key="color.id">
              <img :src="color.sequence" alt="">            
          </div>
        <button @click="register">dadasdasd</button>
        <button @click="order">order</button>

            </div> 
                    <el-container>
          <el-header>Header</el-header>
          <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
          </el-container>
        </el-container> -->
        <!-- <input class="change"  name="file" ref="file" type="file"  accept="image/png,image/gif,image/jpeg" @change="finishphoto($event, 1)"/> -->

        <input  type="file" @change="update($event, 1)">
        <repertoire 
                    :bg="$store.state.isBg"                   
                    :autoCropWidth="autoCropWidth" 
                    :autoCropHeight="autoCropHeight" 
                    :widthData="widthData" 
                    :heightData="heightData" 
                    :img="img">
                      
       </repertoire>
   
    </div>

</template>

<script>
import store from '@/store/store'
import repertoire from '@/components/flow/flowcontent/repertoire'
export default {
    components:{
      repertoire
    }, 
    data () {
        return {
            autoCropWidth:300,
            autoCropHeight:400,
            widthData:0,
            heightData:0,
            img:""
        }
    },
    methods: {

        update(e, num){
          var _this =this  
          var file = e.target.files[0]
          
          this.createReader(file, function (w, h) {
            let pictureWidth;     //图片长度
            let pictureHeight;    //图片高度
            let picturescale;     //图片长度 / 高度
            if ( w < 480 || h <720 ) {
              alert('照片像素至少要达到480x720。请上传一张更高质量的照片。您的照片像素为'+ w +'x'+ h +' ')
            }else{
                _this.$store.commit('onOff')
                if (w > 600 ){
                  pictureWidth = 600;
                  pictureHeight = 800 ;
                  picturescale = w/h;

                  if (picturescale < 1.5 ) {
                     _this.autoCropWidth = pictureWidth-2        //截图框_长度 = 图片长度
                     _this.autoCropHeight = pictureWidth/1.5  //截图框_高度/固定比例
                  }else{                    
                      _this.autoCropHeight = pictureHeight-2     //截图框_高度 = 图片高度
                      _this.autoCropWidth  = pictureHeight*1.5   //截图框_长度 = 截图框_高度*固定比例
                  }


              }

              else{
                  pictureWidth = w ;
                  pictureHeight = h ;
                  picturescale = w/h;

                  if (picturescale < 1.5 ) {
                  _this.autoCropWidth = pictureWidth-2        //截图框_长度 = 图片长度
                  _this.autoCropHeight = pictureWidth/1.5  //截图框_高度/固定比例
                  }else{
                      
                      _this.autoCropHeight = pictureHeight-2     //截图框_高度 = 图片高度
                      _this.autoCropWidth  = pictureHeight*1.5   //截图框_长度 = 截图框_高度*固定比例
                  }
              } 
            }
            
            _this.widthData =pictureWidth   
            _this.heightData=pictureHeight-4    
          });
          this.img=window.URL.createObjectURL(file)
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
      }
    },
    //这里挺重要的，因为我们一般排序完要重新提交排序后的数据给后台保存，以便下一次安装我们所需要的顺序显示，这里的list就可以帮我们做到这一点，但是我们需要给数据添加一个uniqueId标志。然后在排序完后或者列表对应的顺序和uniqueId提交给后台，我也不知道我说的咋样。
    mounted () {
        // this.$dragging.$on('dragged', ({ value }) => {

        // })
        // this.$dragging.$on('dragend', () => {
        //   this.register()
        // })
    }
}
</script>
<style>
.color-list{
	width: 700px;
	height:600px;
	overflow: hidden;
	border: 1px solid red;
}
    .color-item{
    	float: left;

    	width: 200px;
    	height: 250px;
        border:1px solid #f1f1f1;
        padding:10px 5px;
        margin:5px 10px;
        border-radius: 4px;
    }
.color-item>img{
	width: 100%;
	height: 100%;
}
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>