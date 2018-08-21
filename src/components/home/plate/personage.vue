<template>	
	<div class="per">
		<div style="width:100%;overflow: hidden;">

			<div style="width:100%;height:200px;text-align:center;margin-top:10px;position:relative;">
				<img  style="width:150px;height:150px; border-radius:75px;" v-lazy="img" alt="">
				<div style="text-align:center;font-size:20px;font-size:22px;margin-top:10px;">{{name}}</div>
				<img src="../../../../static/img/217667526581384820.png" style="width:25px;height:25px;cursor:pointer; position:absolute;top:5px;right:20px;" @click="myself" alt="">
			</div>

			<div class="per-box">

				<div class="left">
					<div style="margin-top:15px;">
						<span style="width:100px;display:inline-block;color:rgb(72,72,72);font-weight: bold;">年龄：</span >
						<span  v-text="age"></span>
					</div>
					<div style="margin-top:15px;">
						<span style="width:100px;display:inline-block;color:rgb(72,72,72);font-weight: bold;">职业：</span>
						<span  v-text="job"></span>
					</div>
					<div style="margin-top:15px;">
						<span style="width:100px;display:inline-block;color:rgb(72,72,72);font-weight: bold;">手机号：</span>
						<span  v-text="phone"></span>
					</div>
					<div style="margin-top:15px;">
						<span style="width:100px;display:inline-block;color:rgb(72,72,72);font-weight: bold;">身份验证：</span>
						<span  v-if='sfz=="点击验证"' v-text="sfz" @click="$router.push({
					path: '/verification'
				})"></span>
						<span  v-else v-text="sfz"></span>
					</div>

					<div style="margin-top:15px;">
						<span style="width:90px;display:inline-block;color:rgb(72,72,72);font-weight: bold;">标签：</span>
						<span class="spantitle" v-for="relate in relateTitle" style="background:rgb(0,128,186); color:white;padding:2px 10px;display:inline-block;border-radius:5px;margin: 10px;">{{relate}}</span>

					</div>
				</div>

				<div class="right">
					<div style="margin-top:15px;font-weight: bold;">
						个人介绍
					</div>
					<div  style="margin-top:15px;text-align:justify;">{{title}}</div>
				</div>

			</div>
			<div style="margin-top:15px;">
				<div style="margin-top:15px;font-weight: bold;">
						通过体验传递什么
				</div>
				<div style="margin-top:15px;" >{{content | titlefunction}}</div>
			</div>

		</div>
	</div>
</template>
<script>

	export default{
		components:{
		},
		data(){
			return{
				img:"",
				job:"",
				age:"",
				phone:"",
				name:"",
				title:"",
				sfz:"",
				title:"",
				content:"",
				relateTitle:[]
			}
		},
		props: {},
		watch:{

		},
		filters: { 
			titlefunction:function (value) { 
				if (value == "undefined") {
					value = ""
					return value;
				}else{
					return value;
				}

			

			}
		},
		methods:{
			//用户资料获取
			personage(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/webUser',param).then(function (response) {
			  	if (response.data.complete=="SUCCESS") {
			  		_this.img=response.data.fileServer+"/"+response.data.weedfsId
			  		_this.job=response.data.job
			  		_this.age=response.data.age
			  		_this.name=response.data.name
			  		_this.phone=response.data.phone
			  		_this.title=response.data.title
			  		_this.content=response.data.content
			  		_this.relateTitle=response.data.relateTitle
			  		if (response.data.cardFront==null && response.data.cardBack==null) {
			  		  	_this.sfz="点击验证"
			  		}else{
			  			_this.sfz="已验证"
			  		}
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			myself(){
				this.$router.push({
		        path: '/self'
		      })
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
	.per{
		min-width: 800px;
		width: 90%;
		padding:25px;
		border-radius: 5px;
		border:1px solid rgb(232,232,232);
	}
	.per-box{
		width:100%;
		height: 220px;
		overflow: hidden;
		border-bottom:1px solid rgb(232,232,232);
		padding: 30px 0;
	}
	.per-box>div{
		box-sizing: border-box;
		width: 50%;
		height: 200px;
		float: left;
	}
	.left{
		border-right:1px solid rgb(232,232,232);
	}
	.right{
		padding-left: 20px;
	}
	@media screen and (max-width:600px) {
	    .per{
	    	width:40%;
	    }
	}
</style>