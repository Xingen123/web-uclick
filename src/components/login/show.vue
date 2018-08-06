<template>	
	<div class="show">
		<div class="headnav" :style="{background:colorbg}">
			<div class="logoimg"></div>
	        <div style="position: absolute;top: 10px;right:5%;">
	        	<div class="loginshow" style="float:left;margin-right:10px;"  @click="login">登录</div>
	       	 	<div class="resetshow" style="float:left;" @click="register">注册</div>
	        </div>
		</div>
		<div class="boxshow ">
			<img src="../../../static/img/1.png">
	        <div class="one" @click="register">成为体验达人</div>
	    </div>
	    <div class="boxshow">
	    	<img src="../../../static/img/2.png">
	    	<div class="two" @click="register">成为体验达人</div>
	    </div>
	    <div class="boxshow">
	    	<img src="../../../static/img/3.png">

	    </div>
	    <div class="boxshow">
	    	<img src="../../../static/img/4.png">
	    	<div class="three" @click="register">成为体验达人</div>
	    </div>
	    <div class="boxshow">
	    	<img src="../../../static/img/5.png">
	    </div>
	    <div class="content">
	    	<div v-text="title"></div>
	    	<p v-text="p1" style="margin-top:25px;"></p>
	    	<p v-text="p2"></p>
	    	<p v-text="p3"></p>
	    </div>
	    <div class="boxshow">
	    	<img src="../../../static/img/6.png">
	    </div>
	    <div class="footer" >
	    	<div class="ask" style="margin-bottom:50px;">
	    		<div  style="margin-top:25px;font-size:50px;margin-left: 15%;font-weight: bold;" v-text="ask"></div>
	    		<div class="askbox"   v-for="(item,index) in askcontent" :key="index">
	    			<div >{{item.title}}</div>
	    			<p  >{{item.content}}</p>
	    		</div>
	    		<!-- <div style="color:rgb(0,128,186);font-weight:bold;font-size:20px;margin-left: 15%;margin-bottom:50px;margin-top:50px;cursor:pointer;" @click="login">查看更多.......</div> -->
	    	</div>

	    </div>
	    <Footer></Footer>
	</div>
</template>
<script>
import Footer from "@/components/footer/footer"
	export default{
		components:{
			Footer
		},
		data(){
			return{
				colorbg:"transparent",
				title:"加入体验达人社区",
				p1:"体验达人社区不仅仅是达人交流的平台，这里还包括水彩画师、音乐编导、传统手艺人等各种有意思的达人和体验者。",
				p2:"达人用独一无二的体验带体验者感受一生一次的体验，体验者用真诚友好的反馈帮助达人建立更优化的体验。",
				p3:"达人、体验者、普通人间的相互促进和交流，为彼此带去更有趣的生活。",
				ask:"常见问题",
				askcontent:[
					{
						title:"我必须要在Blueglass门店开展体验吗？如果体验在门店开设怎样预定场地？",
						content:"不需要！我们会无偿为优质体验提供Blueglass门店作为体验开展地，但这不是强制性的。如果您有自己的工坊，工作室等场地，或体验中有不便搬运的设备器材，您可以根据具体情况选择对您来说更适合的场所。所有Blueglass门店都需要您提前预约哦！Blueglass门店会同时面对多个达人的体验进行开放，具体的时间与门店地址需要您提前提交审核。审核通过后我们会主动与您联系，根据您的需求协商排期。"
					},
					{
						title:"需要营业执照吗？",
						content:"针对不同的体验内容，Blueglass对营业执照也有不同的要求，这取决于体验中具体涉及的活动。当您不确定您的体验是否需要营业执照时，最好的方法是查阅体验所在地的法律法规。特别是当体验中涉及食物、酒精或交通工具时，需要您格外留心。 "
					},
					{
						title:"我需要多长时间开展一次体验？",
						content:"Blueglass不强制达人开设体验的时间和频率，您可以自由选择最合适的日期和时间。但根据以往数据显示，只有开放了可预订日期的体验才能显示并产生购买。所以，我们建议您上传1～3个月的排期，这样您的体验会更受体验者欢迎。"
					},
					{
						title:"平台如何收取费用？能够提供哪些服务？",
						content:"在体验者购买并参与体验后，Blueglass会抽取每次体验售卖总金额的20%作为佣金。当您的体验足够独特，Blueglass会无偿地为优质达人体验在线上线下同步优先推广曝光。为何体验的封面一定要设置以人为主的图片呢？在Blueglass上您不仅会有自己专属的页面，还会有专门的体验负责人为您提供服务。同时，我们也会为有场地需求的精品体验，无常提供高档商区密集人流的优质场地。"
					},
					{
						title:"为何体验的封面一定要设置以人为主的图片呢？",
						content:"Blueglass鼓励所有人去和有意思的人成为朋友，所以我们以人为主要展现方式。当体验者对达人本身感兴趣、并想要与达人交朋友时，体验的独特性会更为体验时的感受加分。因此体验的图片与文字都以展示达人本身为主。"
					},
					{
						title:"我能设置每次体验的最少参与人数吗？",
						content:"这是不能的。为了让体验者更好地参与体验，Blueglass Beriend体验只设置人数上限而非人数下限。同时，考虑到Blueglass的达人与体验者都是信誉度非常高的群体，所以当只有1人报名体验时，在非特定意外状况发生的情况下体验也是要正常开设的哦。"
					},
					{
						title:"我需要为参与者购买保险吗？",
						content:"如果体验内包含飞行、驾驶、长途远行、户外等涉及到人身安全的活动，您需要为体验者购买保险。 同时，您需要将保险标注在体验内容中，并提醒体验者提前提交身份信息，方便获取保险的权益。"
					},
					{
						title:"我可以和别人一起组织体验吗？",
						content:"以。如果您想和朋友共同开展一个体验，请在体验页面注明他们的名字，让参与者知道他们将和谁同行。需要注意的是，所有体验组织者均需在Blueglass上验证个人真实身份哦。"
					}
				]

			}
		},
		props: {},
		watch:{
		},
		methods:{
			register(){
			  this.$router.push({
		        path: '/register'
		      })
			},
			login(){
		      this.$router.push({
		        path: '/login'
		      })
			},
			handleScroll () {
			  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			  if (scrollTop>60) {
			  		this.colorbg = 'white'
			  }else{
			  		this.colorbg = "transparent"
			  }
			}
		},
		computed:{

		},
		created () {},
		mounted () {
			if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0"){
				alert("此浏览器版本较低，建议使用谷歌浏览器。")
			}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
				alert("此浏览器版本较低，建议使用谷歌浏览器。")
			}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE5.0"){
				alert("此浏览器版本较低，建议使用谷歌浏览器。")
			}


			 window.addEventListener('scroll', this.handleScroll)
		},
	  	destroyed () {}
			

	} 
</script>
<style scoped>
	.show{width: 100%; max-width: 1920px;min-width: 750px;margin:0 auto;}
	.boxshow{width:100%;position: relative;}
	.boxshow>img{width: 100%;display: block;}
	.content{    width: 90%;
    margin: 0 auto;height: 340px;text-align: center;color: rgb(72,72,72);}
	.content>div{font-size:50px;font-weight: bold;margin-top: 40px;}
	.content>p{font-size:25px;line-height: 60px;}
	.headnav{width: 100%; position: fixed;z-index: 10;height: 60px;background-color: white;padding-bottom: 10px;transition: all .5s;}
    .logoimg{width: 167px; height: 50px;background: url(../../../static/img/logo.png) no-repeat;background-size:100% 100%;position: absolute;top: 10px;left:5%;cursor:pointer;}
    .loginshow{width: 98px;height: 48px;line-height: 48px;text-align: center;color: white;background: rgba(0,0,0,0.5);border: 1px solid white; border-radius: 5px;font-size: 24px;font-size:16px;cursor:pointer;}
    .resetshow{width: 100px;height: 50px;line-height: 50px;text-align: center;color: white;background: rgb(0,162,233);border-radius: 5px;font-size: 16px;cursor:pointer;}
    .one{width:150px;height: 50px;line-height: 50px;text-align: center;color: white;background: rgb(0,162,233);border-radius: 5px;font-size: 18px;position: absolute;    bottom: 43%;
    left: 13%;cursor:pointer;}
	.two{width:150px;height: 50px;line-height: 50px;text-align: center;color: white;background: rgb(0,162,233);border-radius: 5px;font-size: 18px;position: absolute;bottom:30%;left:45%;cursor:pointer;}
	.three{width:150px;height: 50px;line-height: 50px;text-align: center;color: white;background: rgb(0,162,233);border-radius: 5px;font-size: 18px;position: absolute;bottom:20%;left:45%;cursor:pointer;}
	.footer{width:100%;color: rgb(72,72,72);}
	.askbox{margin-left: 15%;margin-right: 15%;margin-top: 40px;}
	.askbox>div{font-size: 20px;font-weight: bold;}
	.askbox>p{font-size: 16px;}
	@media screen and (max-width:600px) {

	    
	}
</style>