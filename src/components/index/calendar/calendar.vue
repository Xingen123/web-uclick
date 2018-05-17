<template>
	<div class="bigbox">
			<head-er></head-er>
			<div class="calendar" style="padding-top:70px;">	
		<fullCalendar :events="events" v-on:dayClick="day" v-on:eventClick="event1"></fullCalendar>
		<el-dialog
		  title="添加的体验项目的具体时间"
		  :visible.sync="centerDialogVisible"
		  width="30%"
		  center>
		  <span style="font-size:20px;">需要添加的体验项目</span>
		  <div style="font-size:18px;margin-top:20px; text-align:center;" v-text="name"></div>
		<span style="font-size:20px;">设置时间</span>
		<div style="margin-top:10px;" v-for="trim in eventsday">
		 		<span><span v-text="yea"></span> {{trim.startTime}}</span>
		 		<span>—</span>
		 		<span>{{trim.endTime}}</span>
		 		<el-button type="text"  style="margin-left:150px;" v-if="trim.amount<1" @click="removeTime(trim.id)">删 除</el-button>
				<el-button type="text"  style="margin-left:150px;" v-if="trim.amount>0" >已购买</el-button>
		 </div>	
		<div style="color:#409EFF;" v-show="creat" @click="box=true,creat=false">+添加</div>
		 <div class="box" v-show="box">
		  <el-time-select
			style="width:150px;"	
		    placeholder="起始时间"
		    v-model="startTime"
		    :picker-options="{
		      start: '00:00',
		      step: '00:30',
		      end: '24:00'
		    }">
		  </el-time-select>
		  <span style="padding-left:10px;padding-right:10px;">至</span>
		  <el-time-select
	       style="width:150px;"
		    placeholder="结束时间"
		    v-model="endTime"
		    :picker-options="{
		      start: '00:00',
		      step: '00:30',
		      end: '24:00',
		      minTime: startTime
		    }">
		  </el-time-select>
		  <div style="font-size:20px;text-align:left;margin-top:20px;">体验价格</div> 
			<div style="margin-top:20px;text-align:center;padding-left:30px;">
				<el-input type="number"  @input="desage" style="width:250px;" v-model="price" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"  ></el-input>
				<br>
				<span style="line-height:30px;">您设置的默认价格是 ￥{{num}}</span>	
			</div>
		  <el-button  native-type="" style="display:block;margin:0 auto; margin-top:20px;" @click="really">确 定 添 加</el-button>
		</div>
		</el-dialog>
		<el-dialog
		  title="时间价格表"
		  :visible.sync="remove"
		  width="30%"
		  center>
		  <div style="font-size:20px;"><span>时间</span> <span style="margin-left:250px;">价格</span></div>
		  <div v-for="trim in events" style="margin-top:10px;">
		 		<span>{{trim.start}}</span>
		 		<span>{{trim.title}}</span>
		 		<span style="margin-left:90px;">{{trim.recommendAmount}}</span>
		 </div>	
		</el-dialog>
	</div>
	</div>	
</template>
<script>
	import Header from "@/components/head/head"
	import fullCalendar from 'vue-fullcalendar'


	export default{
		components:{
			"head-er":Header,
			fullCalendar
		},
		data(){
			return{
				price:"",
				num:0,
				yea:"",
				name:"",
				box:false,
				creat:true,
				//起止时间
				startTime: '',
        		endTime: '',
        		//点击删除或修改当天的时间
				remove:false,
				//弹出框
				eventsday:[],
				centerDialogVisible: false,
				events:[
				]
			}
		},
		props: {},
		watch:{

		},
		methods:{
			desage(){
				let priceLth = this.price.length;
				if (priceLth>2) {
					this.price=""
				}
			},
			//查询全部的内容
			allTime(){
			  var _this=this
		      let param = new FormData();
		      var tokenone =sessionStorage.getItem('encryptToken');
			  param.append('token',tokenone);
			  param.append('id',this.$route.params.id);
			  this.$ajax.post('query/webRecommendTime',param).then(function (response) {
			  	console.log(response)
			  	if (response.data.complete=="SUCCESS"){
			  		_this.num=response.data.defaultAmount
			  		_this.events=response.data.webTimeInfoList
			  		_this.price=response.data.recommendAmount
			  	}
			  }).catch(function (error) {
			      console.log(error);
			  });
			},
			//删除添加的时间
			removeTime(id){
				var _this=this
				this.$alert('确认删除吗', '时间', {
		          confirmButtonText: '确定',
		          callback: action => { 
		          	if (action=="confirm") {
		          	  let param = new FormData();
				      var tokenone =sessionStorage.getItem('encryptToken');
					  param.append('token',tokenone);
					  param.append('id',id);
					  this.$ajax.post('delete/webRecommendTime',param).then(function (response) {
					  	if (response.data.complete=="SUCCESS") {
					  	  var nowT =sessionStorage.getItem('cookieyear');
					  	  _this.$message("删除成功");
					  		_this.newTime(nowT)
					  	}
					  }).catch(function (error) {
					      console.log(error);
					  });
		          	}else{
			  			_this.$message('取消删除成功')
			  		}
		          }
		        });
			},
			//添加时间
			add(){
				var _this=this
			    let param = new FormData();

			    var tokenone =sessionStorage.getItem('encryptToken');

				var cookieyear =sessionStorage.getItem('cookieyear');		

				param.append('token',tokenone);

				param.append('id',this.$route.params.id);

				param.append('startTime',cookieyear+" "+this.startTime+":00");//开始时间

				param.append('endTime',cookieyear+" "+this.endTime+":00");//结束时间

				param.append('recommendAmount',this.price);//该日期的价格
				
				this.$ajax.post('create/webRecommendTime',param).then(function (response) {

			  	if (response.data.complete=="SUCCESS"){

			  		var nowT =sessionStorage.getItem('cookieyear');

			  		_this.newTime(nowT)

				  	_this.box=false

				  	_this.creat=true

				  	_this.allTime()
			  	}

			  }).catch(function (error) {
			      console.log(error);
			  });
			},

			//确认添加时间
			really(){
				//用户选择的时间
			  var cookieyear =sessionStorage.getItem('cookieyear');	
			   //系统的时间
			  let date=new Date;  
			  let year=date.getFullYear();   
			  let month=date.getMonth()+1;  
			  let day=date.getDate(); 
			  month =(month<10 ? "0"+month:month);   
			  let mydate = (year.toString()+'-'+month.toString()+'-'+day.toString());   
				//获取相差的天数
				var sDate=mydate
				var eDate=cookieyear
				var sArr = sDate.split("-");
				var eArr = eDate.split("-");
				var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
				var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
				var result = (eRDate-sRDate)/(24*60*60*1000);
			 if (result>2) {
			 	this.add()
			 }else{
			 	this.$message.error('请选择当前日期3天后的时间');
			 }
			  
			},
			//查询添加的时间
			newTime(time){
				// this.allTime()
				var _this=this
		      	let param = new FormData();
		      	var tokenone =sessionStorage.getItem('encryptToken');
				  param.append('token',tokenone);
				  param.append('id',this.$route.params.id);
				   param.append('startTime',time);
				  this.$ajax.post('query/oneWebRecommendTime',param).then(function (response) {
				  	if (response.data.complete=="SUCCESS") {
				  		_this.yea=response.data.date
				  		_this.name=response.data.name
				  		_this.eventsday=response.data.times
				  	}
				  	console.log(response)
				  }).catch(function (error) {
				      console.log(error);
				  });
			},
			day(event,jsEvent,pos){
				// //先删除cookie 里面的encry
				sessionStorage.removeItem('cookieyear');
				this.centerDialogVisible = true
				// var time =event;
				var now =event.toString();
				var mon= now.slice(4,7);
				var day = now.slice(8,10);
				var year = now.slice(11,15);
				var month;
				switch (mon)
				{
				case "Jan":
				  month="01";
				  break;
				case "Feb":
				  month="02";
				  break;
				case "Mar":
				  month="03";
				  break;
				case "Apr":
				  month="04";
				  break;
				case "May":
				  month="05";
				  break;
				case "Jun":
				  month="06";
				  break;
				case "Jul":
				  month="07";
				  break;
				case "Aug":
				  month="08";
				  break;
				case "Sep":
				  month="09";
				  break;
				case "Oct":
				  month="10";
				  break;
				case "Nov":
				  month="11";
				  break;
				case "Dec":
				  month="12";
				  break;
				}

				var  nowtime = year+"-"+month+"-"+day
				//存放点击的cookie
				sessionStorage.setItem('clicktime',event);	
				sessionStorage.setItem('cookieyear',nowtime);	

				//查询当天的时间					
				this.newTime(nowtime)

			},
			//点击蓝色的时间块
			event1(event,jsEvent,pos){
				this.remove = true
				// var cookieyear =sessionStorage.getItem('cookieyear');
				// console.log(1)
				// this.newTime(cookieyear)

			}
		},
		computed:{

		},
		created () {},
		mounted () {
			this.allTime()
		},
	  	destroyed () {}
	} 
</script>
<style scoped>
	.calendar{
		width: 100%;
		/*height: 1000px;*/
		/*position: relative;*/
	}
	.box{
		margin-top: 20px;
		text-align: center;
	}
</style>