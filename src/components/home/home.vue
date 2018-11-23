<template>	
	<div class="home">
		<head-er></head-er>
		<div class="home-tabbox">
			<div class="tab-title" >
				<div 
					v-for="(item,index) in tab" 
					v-text="item.name"
					:key="index" 
					@click="move(item.tab)" 
					:class="{cur:currentTab === item.tab}"> 
								
				</div>
			</div>
			<div class="bar" :class="barBorder"></div>

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
				barBorder:"barone",

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
			move(val){
				this.currentTab=val
				if (val === 'Personage') {
		        	this.barBorder = 'barone';
		     	} else if (val === 'AdventTwo') {
		       		 this.barBorder = 'bartwo';
		      	} else if (val === 'Advent') {
		       		 this.barBorder = 'barthree';
		      	} else{
		      		 this.barBorder = 'barfour';
		      	}
			}
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
.bar{
	  width: 2px;
      height: 25px;
	  float: left;
	  margin-top:20px;
	  margin-left: -200px;
      background: rgb(0,161,232);
      transition: all 0.375s;
}
.barone{
	transform: translate3d(0,0,0);
}
.bartwo{
	 transform: translate3d(0,170%,0);
}
.barthree{
	 transform: translate3d(0,340%,0);
}
.barfour{
	 transform: translate3d(0,510%,0);
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
		color: rgb(72,72,72);
		cursor: pointer;
	}
	.cur{
		color: rgb(0,161,232) !important;
	}
	.home-tabbox{
		overflow-x: auto;
		margin-top: 50px;
	}
	.tabs{

		margin-left: 260px;
		box-sizing:border-box;
		-moz-box-sizing:border-box; /* Firefox */
		-webkit-box-sizing:border-box; /* Safari */
	}
	@media screen and (max-width:600px) {
		.home-tabbox{
			margin-top:0;
		}
	   	.tab-title{
			width:100%;
			margin:0 auto;
			height:58px;
			background:rgb(248,248,248);
			overflow:hidden;
			float: none;
			border:none;
		}
		.tab-title>div{
			width: 25%;
			float: left;
			padding-left: 5px;
    		text-align: center;
			font-size: 10px;
		}
		.cur{
		border-left: none;
		color: rgb(0,161,232) !important;
		}
		.tabs{
			margin-left: 0;
			margin-top:15px;
		}
		.bar{
		  width: 25%;
	      height: 2px;
		  float: left;
		  margin-top:0;
		  margin-left:0;
		}
		.barone{
			transform: translate3d(0,0,0);
		}
		.bartwo{
			 transform: translate3d(100%,0,0);
		}
		.barthree{
			 transform: translate3d(200%,0,0);
		}
		.barfour{
			 transform: translate3d(300%,0,0);
		}
	}
</style>