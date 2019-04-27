<template>
	<view class="page">
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
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
					<view class="movie-name">
						蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
					</view>
					<view class="">
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
					<view class="movie-name">
						蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
					</view>
					<view class="">
					</view>
				</view>
			</view>
			
			<view class="single-poster">
				<view class="poster-wapper">
					<image src="../../static/poster/civilwar.jpg" class="poster"></image>
					<view class="movie-name">
						蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠蝙蝠侠
					</view>
					<view class="">
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 热门超英 end -->
		
		
	</view>
</template>

<script>
	import common from "../../common/common.js";
	
	export default {
		data() {
			return {
				carouselList: []
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
		},
		methods: {

		}
	}
</script>

<style>
	@import url("index.css");
</style>
