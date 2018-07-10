<template>	
	<div class="gohome">
		<a href="http://wb.clicksdiy.com/#/show" class="go">前往体验官网 >></a>		
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

.gohome{
    width:100%;
    height:100%;
    background:url(img/smallbg.png) no-repeat ;
    overflow: hidden;
    background-size:100%;
    position:absolute;
    transition: all .2s;
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
}
.go{

	display: block;
	margin-left:8%;
	margin-top:280px;
	font-size: 14px;
	text-decoration: none;
	color: white;
}
</style>