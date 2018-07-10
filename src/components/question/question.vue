<template>
	<div class="question">
		<head-er class="header_index"></head-er>
		<div class="title">问题</div>
		<ul class="bigboxquestion">
			<li v-for="(item,index) in question" :key="index" class="boxquestion"  >
				<div>{{item.name}}</div>
				<a :href="item.url">
					<img :src="item.imageUrl" alt="">
				</a>	
			</li>
		</ul>

	</div>
</template>
<script>
	import Header from "@/components/head/head"
	export default{
		components:{
			"head-er":Header,
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
			  	console.log(response)
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
 	.question{

 	}
	.title{
		/*margin-top: 50px;*/
	}
	.bigboxquestion{
		width: 80%;
		margin: 0 auto;
		margin-bottom: 50px;
	}
	.boxquestion{
		width: 450px;
		height: 300px;
		float: left;
		margin-top:40px !important;
		cursor: pointer;
		position: relative;
		border-radius: 5px;
		-moz-boxquestion-shadow:4px 2px 19px #9C9698; 
		-webkit-boxquestion-shadow:4px 2px 19px #9C9698; 
		boxquestion-shadow:4px 2px 19px #9C9698;
		overflow: hidden;
	}
	.boxquestion:nth-child(2){
		margin: 0 40px;
	}
	.boxquestion:nth-child(3n-1){
		margin: 0 40px;
	}
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

	@media screen and (max-width:1788px) {
		.boxquestion{
			margin: 10px 20px !important;

		
		}
	}
</style>