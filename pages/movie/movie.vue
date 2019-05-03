<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video 
				:src="tailerInfo.trailer" 
				:poster="tailerInfo.poster"
				class="movie"
				controls></video>
		</view>
		<!-- 视频播放 end -->
		
		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<image :src="tailerInfo.cover" class="cover"></image>
			<view class="movie-desc">
				<view class="title">{{tailerInfo.name}}</view>
				<view class="basic-info">{{tailerInfo.basicInfo}}</view>
				<view class="basic-info">{{tailerInfo.originalName}}</view>
				<view class="basic-info">{{tailerInfo.totalTime}}</view>
				<view class="basic-info">{{tailerInfo.releaseDate}}</view>
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分:</view>
						<view class="movie-score">{{tailerInfo.score}}</view>
					</view>
					<view class="score-starts">
						<block v-if="tailerInfo.score >= 0">
							<trailerStars :innerScore="tailerInfo.score" showNum="0"></trailerStars>
						</block>
						<view class="prise-counts">
							{{tailerInfo.prisedCounts}} 人
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->
		
		<view class="line-wapper">
			<view class="line"></view>
		</view>
		
		<!-- 剧情介绍 start -->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{tailerInfo.plotDesc}}</view>
		</view>
		<!-- 剧情介绍 end -->

	</view>
</template>

<script>
	import common from "../../common/common.js";
	import trailerStars from "../../components/trailerStars.vue";
	
	export default {
		data() {
			return {
				tailerInfo:{},
				plotPicsArray:[], //剧照
				directorArray: [], // 导演列表 
				actorArray:[],  // 演员列表
			}
		},
		methods: {
			
		},
		onLoad(params) {
			//获取上一个页面传入的参数
			var trailerId = params.trailerId;
			//获取预告片的详细信息
			//查询猜你喜欢
			var serverUrl = common.serverUrl+ "/search/trailer/"+trailerId +"?qq="+common.qqStr;
			uni.request({
				url: serverUrl ,
				method: "POST",
				success: (res) => {
					if(res.data.status == 200){
						var tailerInfo= res.data.data;
						this.tailerInfo = tailerInfo;
						// 把剧照的字符串转换成为json array
						this.plotPicsArray = JSON.parse(tailerInfo.plotPics);
						console.log(this.plotPicsArray)
						// debugger
					}
				}
			});
			
			// 获取导演
			var serverUrl = common.serverUrl+ "/search/staff/"+trailerId +"/1?qq="+common.qqStr;
			uni.request({
				url: serverUrl ,
				method: "POST",
				success: (res) => {
					if(res.data.status == 200){
						// var directorArray= res.data.data;
						// this.directorArray= directorArray;
						this.directorArray=  res.data.data;
						console.log(this.directorArray)
						// debugger
					}
				}
			});
			
			// 获取演员
			var serverUrl = common.serverUrl+ "/search/staff/"+trailerId +"/2?qq="+common.qqStr;
			uni.request({
				url: serverUrl ,
				method: "POST",
				success: (res) => {
					if(res.data.status == 200){
						this.actorArray= res.data.data;
						console.log(this.actorArray)
						// debugger
					}
				}
			});
		},
		components: {
			trailerStars
		}
	}
</script>

<style>
@import url("movie.css");
</style>
