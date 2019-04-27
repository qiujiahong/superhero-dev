<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="carousel in  carouselList" >
				<image :src="carousel.image" class="carousel"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList: []
			}
		},
		onLoad() {
			//var me = this;
			//请求轮播图数据
			uni.request({
				url: 'https://www.imovietrailer.com/superhero/index/carousel/list?qq=309284701', //仅为示例，并非真实接口地址。
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
