<template>
	<div class="question">
		<head-er></head-er>
		<div class="title" style="margin-top:10px;">
			<img style="width:100%;display:block;" src="../../../static/img/head.png" alt="">
		</div>
		
		<div class="bigboxquestion">
			<div v-for="(item,index) in question" :key="index" class="boxquestion"  >
				<div>{{item.name}}</div>
				<a :href="item.url">
					<img v-lazy="item.imageUrl" alt="">
				</a>	
			</div>
		</div>
		

		<foo-ter></foo-ter>	
	</div>
</template>
<script>
	import Header from "@/components/head/head"
	import Footer from "@/components/footer/footer"
	export default{
		components:{
			"head-er":Header,
			'foo-ter':Footer
		},
		data(){
			return{
				question:[]
			}
		},
		props: {},
		watch:{

		},
		methods:{
			way(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  this.$ajax.post('query/communityPlatform',param).then(function (response) {
			  	
			  	if (response.data.complete=="SUCCESS") {
			
			  			_this.question=response.data.communityPlatformList

			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
		},
		computed:{

		},
		created () {

		},
		mounted () {
			this.way()
		},
	  	destroyed () {}
	} 
</script>
<style>

	.bigboxquestion{
		width: 80%;
		margin: 0 auto;
		margin-bottom: 50px;
		/*overflow: hidden;*/
		text-align: center;
	}
	.boxquestion{
		width: 450px;
		height: 300px;
		/*float: left;*/
		margin-top:40px !important;
		cursor: pointer;
		position: relative;
		border-radius: 5px;
		margin-left: 40px;
		display: inline-block;
		-moz-box-shadow:4px 2px 19px #9C9698; 
		-webkit-box-shadow:4px 2px 19px #9C9698; 
		box-shadow:4px 2px 19px #9C9698;
		overflow: hidden;

	}

	/*.boxquestion:nth-child(2){
		margin: 0 40px;
	}
	.boxquestion:nth-child(3n-1){
		margin: 0 40px;
	}*/
	.boxquestion:hover div{
		z-index: 10;
		display: block;
	}
	.boxquestion:hover img{
		transform: rotate(9deg) scale(1.2);
	
	}
	.boxquestion>a>img{width: 100%;height: 100%;display: block;border-radius: 5px;transition: all .8s;}
	.boxquestion>a{width: 100%;height:100%;text-decoration: none;transition: all .5s;}
	.boxquestion>div{display:none;width: 100%;height:30px;line-height: 30px;position: absolute;bottom: 0px; color:white;text-align: center;background-color: rgba(0,0,0,.4);}
	@media screen and (max-width:1539px) {
			.bigboxquestion{
				margin-top:50px !important;
			}
			.boxquestion{
				width: 300px;
				height: 200px;
				margin-top:40px !important;
				margin-left:40px;
			}
 			/*.boxquestion:nth-child(2){
				margin-left:  40px !important;
			} 
			.boxquestion:nth-child(3n-1){

				margin: 0 40px !important;

			}*/
	}
	@media screen and (max-width:600px) {
			.boxquestion{
				
				margin-left:0 !important;
			}
	}
</style>