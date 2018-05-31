<template>
    <div class="color-list">
      	<div class="color-item"  v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }" :key="color.id">
              <img :src="color.sequence" alt="">          	
  		  </div>
  		<button @click="register">dadasdasd</button>
        <button @click="order">order</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
			colors: [
                    {id: '1', sequence: 'https://www.baidu.com/img/bd_logo1.png'},
                    {id: '2', sequence: 'https://fengyuanchen.github.io/cropper/images/picture.jpg'},
                    {id: '3', sequence: 'http://ofyaji162.bkt.clouddn.com/touxiang.jpg'},
                    {id: '4', sequence: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg'},
                    {id: '5', sequence: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'},
                    {id: '6', sequence: ''}
            ]
        }
    },
    methods: {
        order(){
          var param = {

                        "header": {
                            "faceCode": "user.userLogin", 
                            "token": "3252af018d851ba3a7af2a3881feb282",
                            "terminal": "IOS",
                            "version": "1.0"
                        },
                        "body": {
                            "mobile": "13888888888",
                            "verifyCode":"1029"
                        }
                  }

          this.$ajax.post('http://124.205.200.90/user/login',{
            param
          }).then(function (response) {
                
                console.log(response)

            }).catch(function (error) {

                console.log(error)

            });
        },
    	register(){
        		var _this=this  

		        let param = new FormData();
                let itemsId = this.colors.map(item =>item.id)
		        // let a =JSON.stringify(itemsId);
		        param.append('pictureSort',itemsId);
				
    				this.$ajax.post('sort/webRecommendPicture',param).then(function (response) {

    					console.log(response)

    				}).catch(function (error) {

    					console.log(error)

    				});
		  }
    },
    //这里挺重要的，因为我们一般排序完要重新提交排序后的数据给后台保存，以便下一次安装我们所需要的顺序显示，这里的list就可以帮我们做到这一点，但是我们需要给数据添加一个uniqueId标志。然后在排序完后或者列表对应的顺序和uniqueId提交给后台，我也不知道我说的咋样。
    mounted () {
        this.$dragging.$on('dragged', ({ value }) => {

        })
        this.$dragging.$on('dragend', () => {
          this.register()
        })
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
</style>