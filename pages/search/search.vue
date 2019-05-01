<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-icon"></image>
			</view>
			<input 
				type="text" 
				placeholder="搜索预告" 
				maxlength="10"  
				class="search-text" 
				confirm-type="search"
				@confirm="searchMe"
				focus/>
		</view>
		
		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="trailer in trailerList">
				<image :src="trailer.cover" class="poster"></image>
			</view>
			
			<!-- <view class="movie-wapper">
				<image src="../../static/poster/civilwar.jpg" class="poster"></image>
			</view> -->
		</view>
	</view>
</template>

<script>
	import common from "../../common/common.js";
	
	export default {
		data() {
			return {
				trailerList: [],
				keywords: "",		//搜索的关键字
				page: 1,			//当前第几页
				totalPages: 1		//总共多少页
			}
		},
		methods: {
			pagedTrailerList(keywords,page,pageSize){
				//查询猜你喜欢
				uni.showLoading({
					// 防止用户点击某一些按钮
					mask:true,
					title:"请稍后"
				})
				var serverUrl = common.serverUrl+ "/search/list?"+ common.qqStr+"&keywords="+keywords
											+"&page="+page
											+"&pageSize="+ pageSize;
				uni.request({
					url: serverUrl ,
					method: "POST",
					success: (res) => {
						if(res.data.status == 200){
							var tempList= res.data.data.rows;
							this.trailerList = this.trailerList.concat(tempList);
							this.totalPages = res.data.data.total;
							this.page = page;			//覆盖当前页面里的page
						}
					},
					complete:() => {
						uni.hideLoading();
					}
				});
			},
			searchMe(e){
				//var me = this;
				//获取搜索的内容
				var value = e.detail.value;
				this.keywords = value;
				this.trailerList = [];
				this.pagedTrailerList(value,1,15);
			}
		},
		onLoad() {
			this.pagedTrailerList(this.keywords,this.page,15)
			//查询猜你喜欢
			// uni.showLoading({
			// 	// 防止用户点击某一些按钮
			// 	mask:true,
			// 	title:"请稍后"
			// })
			// var serverUrl = common.serverUrl+ "/search/list?"+ common.qqStr+"&keywords=&page=&pageSize=";
			// uni.request({
			// 	url: serverUrl ,
			// 	method: "POST",
			// 	success: (res) => {
			// 		if(res.data.status == 200){
			// 			this.trailerList= res.data.data.rows;
			// 			console.log(this.trailerList)
			// 		}
			// 	},
			// 	complete:() => {
			// 		uni.hideLoading();
			// 	}
			// });
		}
	}
</script>

<style>
	
	@import url("search.css");
	

</style>
