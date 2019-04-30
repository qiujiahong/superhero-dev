<template>
	<view class="page">
		<!-- 使用自定义标贴 -->
		<!-- <helloComp myval="Hello nick qiu."></helloComp> -->
		<!-- <trailerStars innerScore="9" showNum="1"></trailerStars> -->
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="carousel in  carouselList" >
				<image :src="carousel.image" class="carousel"></image>
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
					<image :src="superHero.cover" class="poster"></image>
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
			<view class="sigle-like-movie">
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
				<view class="movie-oper">
				</view>
			</view>
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
				hotTrailerList: []
			}
		},
		onLoad() {
			
			var serverUrl = common.serverUrl+ "/index/carousel/list?"+ common.qqStr;
			//var me = this;
			//请求轮播图数据
			uni.request({
				url: serverUrl ,//'https://www.imovietrailer.com/superhero/index/carousel/list?qq=309284701', //仅为示例，并非真实接口地址。
				method: "POST",
				success: (res) => {
					if(res.data.status == 200){
						this.carouselList= res.data.data;
						console.log(this.carouselList);
					}
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
		},
		methods: {

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
