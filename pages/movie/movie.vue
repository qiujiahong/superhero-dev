<template>
	<view class="page">
		<!-- 视频播放 start -->
		<view class="player">
			<video 
				id="myTrailer"
				:src="trailerInfo.trailer" :poster="trailerInfo.poster" class="movie" controls></video>
		</view>
		<!-- 视频播放 end -->

		<!-- 影片基本信息 start -->
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover='+ trailerInfo.cover">
				<image :src="trailerInfo.cover" class="cover"></image>
			</navigator>
			<view class="movie-desc">
				<view class="title">{{trailerInfo.name}}</view>
				<view class="basic-info">{{trailerInfo.basicInfo}}</view>
				<view class="basic-info">{{trailerInfo.originalName}}</view>
				<view class="basic-info">{{trailerInfo.totalTime}}</view>
				<view class="basic-info">{{trailerInfo.releaseDate}}</view>
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分:</view>
						<view class="movie-score">{{trailerInfo.score}}</view>
					</view>
					<view class="score-starts">
						<block v-if="trailerInfo.score >= 0">
							<trailerStars :innerScore="trailerInfo.score" showNum="0"></trailerStars>
						</block>
						<view class="prise-counts">
							{{trailerInfo.prisedCounts}} 人
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
			<view class="plots-desc">{{trailerInfo.plotDesc}}</view>
		</view>
		<!-- 剧情介绍 end -->

		<!-- 演职人员 start -->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<view class="actor-wapper" v-for="(director,staffIndex) in directorArray">
					<image 
						:src="director.photo" 
						class="single-actor" 
						@click="lookStaffs"
						:data-staffIndex="staffIndex"
						mode="aspectFill"></image>
					<view class="actor-name">{{director.name}}</view>
					<view class="actor-role">{{director.actName}}</view>
				</view>
				<view class="actor-wapper" v-for="(actor,actorIndex) in actorArray">
					<image 
						:src="actor.photo" 
						class="single-actor" 
						@click="lookStaffs"
						:data-staffIndex="actorIndex + directorArray.length"
						mode="aspectFill"></image>
					<view class="actor-name">{{actor.name}}</view>
					<view class="actor-role">{{actor.actName}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 演职人员 end -->

		<!-- 剧照 start -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image v-for="(img,imgIndex) in plotPicsArray" :src="img" class="plot-image" :data-imgIndex="imgIndex" @click="lockMe" 
				 mode="aspectFill"></image>
			</scroll-view>
		</view>
		<!-- 剧照 end -->

	</view>
</template>

<script>
	import common from "../../common/common.js";
	import trailerStars from "../../components/trailerStars.vue";

	export default {
		data() {
			return {
				trailerInfo: {},
				plotPicsArray: [], //剧照
				directorArray: [], // 导演列表 
				actorArray: [], // 演员列表
			}
		},
		//页面初次渲染完成，获得视频上下文对象
		onReady() {
			this.videoContext = uni.createVideoContext('myTrailer');
		},
		onHide() {
			this.videoContext.pause();
		},
		onShow() {
			if(this.videoContext){
				this.videoContext.play();
			}
		},
		methods: {
			lockMe(e) {
				var imgIndex = e.currentTarget.dataset.imgindex;
				console.log(imgIndex)
				uni.previewImage({
					current: this.plotPicsArray[imgIndex],
					urls: this.plotPicsArray
				})
			},
			lookStaffs(e){
				var staffIndex = e.currentTarget.dataset.staffindex;
				//拼接导演和演员的数组，成为一个新数组
				var directorArray = this.directorArray;
				var actorArray = this.actorArray;
				var newStaffArray = [];
				newStaffArray = newStaffArray.concat(directorArray).concat(actorArray);
				
				var urls = [];
				for(var i =0;i<newStaffArray.length;i++){
					var tempPhoto = newStaffArray[i].photo;
					urls.push(tempPhoto);
				}
				//console.log(urls)
				//console.log(Number.parseInt(staffIndex))
				//console.log(urls[Number.parseInt(staffIndex)])
				uni.previewImage({
					current: urls[staffIndex],
					urls: urls
				})
				
			}
		},
		onLoad(params) {
			//获取上一个页面传入的参数
			var trailerId = params.trailerId;
			

			// 通过api设置导航栏属性
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			})
			
			//获取预告片的详细信息
			//查询猜你喜欢
			var serverUrl = common.serverUrl + "/search/trailer/" + trailerId + "?" + common.qqStr;
			uni.request({
				url: serverUrl,
				method: "POST",
				success: (res) => {
					if (res.data.status == 200) {
						var trailerInfo = res.data.data;
						this.trailerInfo = trailerInfo;
						// 把剧照的字符串转换成为json array
						this.plotPicsArray = JSON.parse(trailerInfo.plotPics);
						console.log(this.plotPicsArray)
					}
				}
			});

			// 获取导演
			var serverUrl = common.serverUrl + "/search/staff/" + trailerId + "/1?" + common.qqStr;
			uni.request({
				url: serverUrl,
				method: "POST",
				success: (res) => {
					if (res.data.status == 200) {
						// var directorArray= res.data.data;
						// this.directorArray= directorArray;
						this.directorArray = res.data.data;
						console.log(this.directorArray)
						// debugger
					}
				}
			});

			// 获取演员
			var serverUrl = common.serverUrl + "/search/staff/" + trailerId + "/2?" + common.qqStr;
			uni.request({
				url: serverUrl,
				method: "POST",
				success: (res) => {
					if (res.data.status == 200) {
						this.actorArray = res.data.data;
						console.log(this.actorArray)
						// debugger
					}
				}
			});
		},
		//此函数仅仅只支持在小程序
		onShareAppMessage(res) {
			return {
				title: this.trailerInfo.name,
				path: '/pages/movie/movie?trailerId=' + this.trailerInfo.id
			};
		},
		//监听导航栏的按钮
		onNavigationBarButtonTap(e){
			var index = e.index;
			
			var  trailerInfo = this.trailerInfo;
			var trailerId = trailerInfo.id;
			var trailerName = trailerInfo.name;
			var cover = trailerInfo.cover;
			var poster = trailerInfo.poster;
			
			
			// 如果index 为0 则分享
			if (index == 0){
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: "http://192.168.65.113:8080/#/pages/movie/movie?trailerId="+trailerId,
					title: "超级英雄:《"+ trailerName +"》",
					summary: "超级英雄:《"+ trailerName +"》",
					imageUrl: cover,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		},
		components: {
			trailerStars
		}
	}
</script>

<style>
	@import url("movie.css");
</style>
