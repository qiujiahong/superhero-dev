<template>
	<view class="page">
		<!-- 使用自定义标贴 -->
		<!-- <helloComp myval="Hello nick qiu."></helloComp> -->
		<!-- <trailerStars innerScore="9" showNum="1"></trailerStars> -->
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="carousel in  carouselList" >
				<navigator open-type="navigate" :url="'../movie/movie?trailerId='+carousel.movieId">					
					<image :src="carousel.image" class="carousel"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 轮播图 end -->
		
		<!-- 热门超英 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot">
			
			<view class="single-poster" v-for="superHero in hotSuperheroList">
				<view class="poster-wapper">
					<navigator open-type="navigate" :url="'../movie/movie?trailerId='+superHero.id">	
						<image :src="superHero.cover" class="poster"></image>
					</navigator>
					<view class="movie-name">
						{{superHero.name}}
					</view>
					<trailerStars :innerScore="superHero.score" showNum="1"></trailerStars>
					<!-- <view class="movie-score-wapper">
						<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
						<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
						<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
						<image src="../../static/icos/star-yellow.png" class="star-ico"></image>
						<image src="../../static/icos/star-gray.png" class="star-ico"></image>
						<view class="move-score">
							9.1
						</view>
					</view> -->
				</view>
			</view>
		</scroll-view>
		<!-- 热门超英 end-->
		
		<!-- 热门预告 start  -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>
		
		<view class="hot-movies page-block">
			<video 
				:id="trailer.id"
				:data-playingIndex="trailer.id"
				@play="meIsPlayIng"
				v-for="trailer in hotTrailerList"
				:src="trailer.trailer" 
				:poster="trailer.poster"
				class="hot-movie-single"
				controls></video>
		</view>
		<!-- 热门预告 end  -->
		
		
		<!-- 猜你喜欢 start  -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		
		<view class="page-block guess-u-like">
			
			<view class="sigle-like-movie" v-for="(guess,gIndex) in guessULikeList">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId='+guess.id">	
					<image :src="guess.cover" class="like-movie"></image>
				</navigator>
				<view class="movie-desc">
					<view class="movie-title">
						{{guess.name}}
					</view>
					<trailerStars :innerScore="9.1" showNum="1"></trailerStars>
					<view class="movie-info">
						{{guess.basicInfo}}
					</view>
					<view class="movie-info">
						{{guess.releaseDate}}
					</view>
				</view>
				<view class="movie-oper" :data-gIndex="gIndex" @click="praiseMe">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationDataArr[gIndex]" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view>
			<!-- <view class="sigle-like-movie">
				<image src="../../static/carousel/batmanvssuperman.png" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						蝙蝠侠大战超人蝙蝠侠大战超人蝙蝠侠大战超人蝙蝠侠大战超人蝙蝠侠大战超人
					</view>
					<trailerStars :innerScore="9.1" showNum="1"></trailerStars>
					<view class="movie-info">
						2018 / 美国 / 科幻 动作
					</view>
					<view class="movie-info">
						主演 张三。。里斯。王五
					</view>
				</view>
				<view class="movie-oper" @click="praiseMe">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationData" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view> -->
		</view>
		<!-- 猜你喜欢 end  -->
	</view>
</template>

<script>
	import common from "../../common/common.js";
	// 导入自定义组件
	import helloComp from "../../components/helloComp.vue";
	import trailerStars from "../../components/trailerStars.vue";
	
	export default {
		data() {
			return {
				carouselList: [],
				hotSuperheroList: [],
				hotTrailerList: [],
				guessULikeList: [],
				animationData:{
				},
				animationDataArr:[
					{},{},{},{},{},
				]
			}
		},
		onUnload() {
			//页面卸载的时候，清除动画数据
			this.animationData={};
			this.animationDataArr = [
					{},{},{},{},{},
				]
		},
		onPullDownRefresh() {
			this.refresh();
		},
		onHide() {
			if( this.videoContex ){
				this.videoContex.pause();
			}
		},
		onLoad() {
			// #ifdef APP-PLUS || MP-WEIXIN
			//在页面创建的时候创建一个临时动画对象
			this.animation = uni.createAnimation();
			// #endif
			
			var serverUrl = common.serverUrl+ "/index/carousel/list?"+ common.qqStr;
			//var me = this;
			//请求轮播图数据
			console.log("开始请求轮播图")
			uni.request({
				url: serverUrl ,//'https://www.imovietrailer.com/superhero/index/carousel/list?qq=309284701', //仅为示例，并非真实接口地址。
				method: "POST",
				success: (res) => {
					console.log("请求轮播图成功")
					console.log(res)
					if(res.data.status == 200){
						this.carouselList= res.data.data;
						console.log(this.carouselList);
					}
				},
				complete:() => {
					console.log("开始请求轮播图complete回调")
				}
			});
			
			//查询热门超英
			serverUrl = common.serverUrl+ "/index/movie/hot?"+ common.qqStr+"&type=superhero";
			uni.request({
				url: serverUrl ,
				method: "POST",
				success: (res) => {
					if(res.data.status == 200){
						this.hotSuperheroList= res.data.data;
						console.log(this.hotSuperheroList);
					}
				}
			});
			
			
			//查询热门预告
			serverUrl = common.serverUrl+ "/index/movie/hot?"+ common.qqStr+"&type=trailer";
			uni.request({
				url: serverUrl ,
				method: "POST",
				success: (res) => {
					if(res.data.status == 200){
						this.hotTrailerList= res.data.data;
						console.log(this.hotTrailerList);
					}
				}
			});
			this.refresh();
			
		},
		methods: {
			//播放一个视频的时候，需要暂停其他正在播放的视频
			meIsPlayIng(e){
				var trailerId =  "";
				if(e){
					trailerId = e.currentTarget.dataset.playingindex
					this.videoContex = uni.createVideoContext(trailerId);
				}
				var hotTrailerList  = this.hotTrailerList;
				
				for(var i =0; i< hotTrailerList.length; i++) {
					var temp = hotTrailerList[i].id;
					if(temp != trailerId){//其他视频暂停
						uni.createVideoContext(temp).pause();
					}
				}
			},
			refresh(){
				//查询猜你喜欢
				uni.showLoading({
					// 防止用户点击某一些按钮
					mask:true
				})
				var serverUrl = common.serverUrl+ "/index/guessULike?"+ common.qqStr;
				uni.request({
					url: serverUrl ,
					method: "POST",
					success: (res) => {
						if(res.data.status == 200){
							this.guessULikeList= res.data.data;
							console.log("guessULikeList:");
							console.log(this.guessULikeList);
						}
					},
					complete:() => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
				console.log("refresh")
			},
			//实现点赞动画效果
			praiseMe(e){
				// #ifdef APP-PLUS || MP-WEIXIN
				//所有的e.currentTarget.dataset的值需要使用小写
				var gIndex = e.currentTarget.dataset.gindex;
				console.log(gIndex)
				//构建动画数据，并通过STEP来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				});
				//导出动画数据到VUE组件，实现组件的动画效果
				//this.animationData = this.animation.export();
				this.animationData = this.animation;
				this.animationDataArr[gIndex] = this.animationData.export();
				
				//实现还原业务
				setTimeout(function(){
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					});
					//this.animationData = this.animation.export();
					this.animationData = this.animation;
					this.animationDataArr[gIndex] = this.animationData.export();
				}.bind(this),500);
				// #endif
			}
		},
		// 注册组件
		components: {
			helloComp,
			trailerStars
		}
	}
</script>

<style>
	@import url("index.css");
</style>
