<template>	
	<div class="home">
		<head-er></head-er>

		<!-- 个人资料 -->
		<per-sonage></per-sonage> 
		<!-- 提现 -->
		<with-draw></with-draw>
		<!-- 未来的体验 -->
		<ad-vent></ad-vent>	
	</div>
</template>
<script>
	import Header from "@/components/head/head"
	import Withdraw from "@/components/home/plate/withdraw"
	import Personage from "@/components/home/plate/personage"
	import Advent from "@/components/home/plate/advent"
	export default{
		components:{
			"head-er":Header,
			"with-draw":Withdraw,
			"per-sonage":Personage,
			"ad-vent":Advent
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
		mounted () {},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.home{
		width: 100%;
		height: 1200px;
	}
</style>