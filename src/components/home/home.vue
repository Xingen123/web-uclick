<template>	
	<div class="home">
		<head-er></head-er>
		<div class="home-tabbox">
			<div class="tab-title" >
				<div 
					v-for="(item,index) in tab" 
					v-text="item.name"
					:key="index" 
					@click="currentTab=item.tab" 
					:class="{cur:currentTab === item.tab}"> 
								
				</div>
			</div>
			<div class="tabs">
				<keep-alive>    
					<component :is="currentTab"></component>
				</keep-alive>    
			</div>
		</div>
	</div>
</template>
<script>
	import Header from "@/components/head/head"
	import Withdraw from "@/components/home/plate/withdraw"
	import Personage from "@/components/home/plate/personage"
	import Advent from "@/components/home/plate/advent"
	import AdventTwo from "@/components/home/plate/adventTwo"
	export default{
		components:{
			'head-er':Header,
			Withdraw,
			Personage,
			Advent,
			AdventTwo
		},
		data(){
			return{
				currentTab:"Personage",
				tab:[
					{
						tab:"Personage",			
						name:'基本信息'
					},
					{
						tab:"AdventTwo",		
						name:'即将到来的体验'
					},
					{
						tab:"Advent",		
						name:'已经完成的体验'
					},
					{
						tab:"Withdraw",		
						name:'钱包与提现'
					}
				]
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
		margin-bottom: 50px;
	}
	.tab-title{
		width: 200px;
		height: 500px;
		box-sizing:border-box;
		-moz-box-sizing:border-box; /* Firefox */
		-webkit-box-sizing:border-box; /* Safari */
		border:1px solid  rgb(232,232,232);
		float: left;
		border-radius: 5px;
		margin-left:12px;
	}
	.tab-title>div{
		box-sizing: border-box;
		padding-left: 30px;
		text-align: left;
		margin-top: 20px;
		padding-right
		color:rgb(72,72,72);
		cursor: pointer;
	}
	.cur{
		border-left: 2px solid  rgb(0,161,232);
		color: rgb(0,161,232) !important;
	}
	.home-tabbox{
		margin-top: 50px;
	}
	.tabs{
		margin-left: 260px;
		box-sizing:border-box;
		-moz-box-sizing:border-box; /* Firefox */
		-webkit-box-sizing:border-box; /* Safari */
	}
</style>