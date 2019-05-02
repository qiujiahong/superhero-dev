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
					
				</view>
			</view>
		</view>
		<!-- 影片基本信息 end -->
	</view>
</template>

<script>
	import common from "../../common/common.js";
	
	export default {
		data() {
			return {
				tailerInfo:{}
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
					}
				}
			});
		}
	}
</script>

<style>
@import url("movie.css");
</style>
