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
				var me = this;
				uni.showActionSheet({
					itemList: ["保存图片到本地","aaa"],
					success: function(res){
						if(res.tapIndex == 0){//下载
							console.log("进入下载......")
							uni.showLoading({
								title:"图片保存中"
							});
							uni.downloadFile({
								url: me.cover,
								success:function(result){
									var tempFilePath = result.tempFilePath;
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success() {
											uni.showToast({
												title:"保存成功",
												duration:2000, //200 ms
											})
										},
										complete() {
											uni.hideLoading();
										}
									})
								}
							})
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
