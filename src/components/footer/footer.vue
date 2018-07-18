<template>
	<div class="footer">
		<div class="footerbox">
			<a href="https://www.instagram.com/blueglassyogurt/"  class="smalllogo">
				
					<div class="onepng"></div>		
				
			</a>
			<a href="https://www.xiaohongshu.com/user/profile/56a330eb5e87e762f4c189be?xhsshare=CopyLink&appuid=56a330eb5e87e762f4c189be&apptime=1531800810" class="smalllogo">
				
					<div class="twopng"></div>				
				
			</a>
			<a href="https://www.instagram.com/blueglassyogurt/" class="smalllogo">
				
					<div class="threepng"></div>			
			
			</a>
		</div>
	</div>
</template>
<script>
	
	export default{

		components:{

		},
		data(){
			return{
				
			}
		},
		props: {},
		watch:{
		},
		methods:{
			
		},
		computed:{

		},
		created () {},
		mounted () {
			
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
a{
	display: block;
}
.footer{
	width: 100%;
	height: 300px;
	margin-top: 100px;
	background:url(img/footerbg.png) no-repeat;
	background-size:cover;
	position: relative;
}
.footerbox{
	width: 25%;
	height: 300px;
	
	position: absolute;
	right: 10%;
}
.smalllogo{
	width:60px;
	height: 60px;
	border-radius: 5px;
	position: absolute;
	bottom: 40px;
}

.smalllogo:nth-child(1){

	left: 40px;
	background:url(img/ins@2x.png) no-repeat;	
	background-size: 100% 100%;
}
.smalllogo:nth-child(2){
	left: 140px;
	background:url(img/xhs@2x.png) no-repeat;	
	background-size: 100% 100%;
}
.smalllogo:nth-child(3){
	left: 240px;
	background:url(img/wb@2x.png) no-repeat;	
	background-size: 100% 100%;		
}
.smalllogo:nth-child(1):hover .onepng{
	transform: scale(1);
}
.smalllogo:nth-child(2):hover .twopng{
	transform: scale(1);
}
.smalllogo:nth-child(3):hover .threepng{
	transform: scale(1);
}
.onepng{
	width:150px;
	height: 150px;
	transform: scale(0);
	border-radius: 5px;
	position: absolute;
	bottom:100px;
	left:-45px;
	background:url(img/1.jpg) no-repeat;	
	transition: all .4s;
}
.twopng{
	width:150px;
	height: 150px;
	transform: scale(0);
	border-radius: 5px;
	position: absolute;
	bottom:100px;
	left:-45px;
	background:url(img/3.jpg) no-repeat;	
	transition: all .4s;
}
.threepng{
	width:150px;
	height: 150px;
	transform: scale(0);
	border-radius: 5px;
	position: absolute;
	bottom:100px;
	left:-45px;
	background:url(img/2.jpg) no-repeat;	
	transition: all .4s;
}
</style>