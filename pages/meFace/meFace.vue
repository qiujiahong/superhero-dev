<template>
	<view class="page page-fill">
		<view class="padding-wapper">
			<image id="face" :src="tempFace" class="padding-face" mode="scaleToFill"></image>
		</view>

		<view class="notice">
			<view class="notice-words">
				* 请从相册中选择等比高的图片噢~
			</view>
		</view>

		<view class="footer-operator">
			<view class="operator-words" @click="changePadingFace">
				重新选择
			</view>
			<view class="operator-words" @click="upload">
				确认上传
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFace: ""
			}
		},
		onLoad(params) {
			var tempFilePath = params.tempFilePath;
			this.tempFace = tempFilePath;
		},
		methods: {
			// 重新选择头像
			changePadingFace() {
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					sourceType: ["album"],
					success(res) {
						//获得临时路径
						var tempFilePath = res.tempFilePaths[0];
						this.tempFace = tempFilePath;
					}
				})
			},
			upload(){
				
			}
		}
	}
</script>

<style>
	.page-fill {
		width: 100%;
		height: 100%;
		position: absolute;
		background: black;
	}

	.padding-wapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 40upx;

	}

	.padding-face {
		width: 600upx;
		height: 600upx;
	}

	.notice {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.notice-words {
		color: gray;
		font-size: 13px;
		margin-top: 30upx;
		width: 600upx;
	}

	/* 底部操作 */
	.footer-operator {
		position: fixed;
		bottom: 0;

		border-top: #515050 solid 1px;
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding: 30upx;
	}

	.operator-words {
		color: #e8e5e5;
		font-size: 16px;
		width: 200upx;
	}

	/* 底部操作end */
</style>
