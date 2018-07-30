<template>
	<div class="footer">
		<div class="footertext">
			Blueglass除了有近30万人享用的一杯让人流口水的酸奶,<br>
			还有很多关于Befriend体验达人的故事,<br>
			我们有内容十分精彩Instagram账号、小红书账号、微博账号,<br>
			<div style="margin-top:30px;">
				欢迎点击右方图标关注,快来和有意思的人成为朋友吧 !
			</div>
		</div>

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
	background-position: center;
	position: relative;
}
.footerbox{
	width: 280px;
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
.footertext{
	line-height: 45px;
	color: white;
	font-size: 22px;
	position: absolute;
	left: 100px;
	top: 30px;
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
@media screen and (max-width:600px) {
	.footer{
		display: none;
		height: 50px;
		margin-top: 100px;
		margin-bottom:20px;
		background:white;
	}
	.footerbox{
		right: 0!important;
		left: 0!important;
		bottom: 0!important;
		margin: 0 auto!important;
	}
	.smalllogo:nth-child(1){

	left: 0;
	
	}
	.smalllogo:nth-child(2){
		left: 110px;
		
	}
	.smalllogo:nth-child(3){
		left: 220px;
	
	}
}

</style>