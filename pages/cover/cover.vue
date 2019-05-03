<template>
	<view class="black">
		<image :src="cover" 
			mode="widthFix"
			class="cover"
			@longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cover:""
			}
		},
		methods: {
			operator(){
				uni.showActionSheet({
					itemList: ["下载图片","aaa","ccc"],
					success: function(res){
						if(res.tapIndex == 0){//下载
							console.log("进入下载......")
						}
					}
				})
			}
		},
		onLoad(params) {
			var cover = params.cover;
			this.cover = cover;
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			})
			
		}
	}
</script>

<style>
.black{
	background-color: #000000;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}
.cover{
	align-self: center;
}
</style>
