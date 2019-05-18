<template>
	<view class="page page-fill">
		
		<view class="page-block info-list">
			<!-- 头像 -->
			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>
				
				<view class="right-wapper">
					<image :src="globalUser.faceImage" class="face"></image>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-icon"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 用户名 -->
			<view class="item-wapper face-line-upbottom">
				<view class="info-words">昵称</view>
				
				<view class="right-wapper" @click="modifyNickname">
					<view class="gray-fields">
						{{globalUser.nickname}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-icon"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 生日 -->
			<view class="item-wapper face-line-upbottom">
				<view class="info-words">生日</view>
				
				<view class="right-wapper" @click="modifyBirthday">
					<view class="gray-fields">
						{{globalUser.birthday}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-icon"></image>
					</view>
				</view>
			</view>
			
			<view class="line-top">
				<view class="line"></view>
			</view>
			
			<!-- 性别 -->
			<view class="item-wapper face-line-upbottom">
				<view class="info-words">性别</view>
				
				<view class="right-wapper" @click="modifySex">
					<view class="gray-fields">
						<view v-if="globalUser.sex == 1">
							男
						</view>
						<view v-else-if="globalUser.sex == 0">
							女
						</view>
						<view v-else>
							未知
						</view>
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-icon"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="footer-wapper">
			<view class="footer-words" @click="cleanStorage">
				清理缓存
			</view>
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import common from "../../common/common.js";
	
	export default {
		data() {
			return {
				globalUser: {}
			}
		},
		onShow() {
			var globalUser = this.getGlobalUser("globalUser");
			this.globalUser = globalUser;
		},
		methods: {
			modifySex(){
				uni.navigateTo({
					url: "../sex/sex"
				})
			},
			modifyBirthday(){
				uni.navigateTo({
					url: "../meBirthday/meBirthday"
				})
			},
			modifyNickname(){
				uni.navigateTo({
					url: "../meNickName/meNickName"
				})
			},
			operator(){
				var globalUser = this.getGlobalUser("globalUser");
				uni.showActionSheet({
					itemList: ["查看我的头像","从相册选择上传"],
					success(res) {
						var index = res.tapIndex;
						if(index == 0){//预览
							var faceArray = [];
							faceArray.push(globalUser.faceImage);
							// debugger
							uni.previewImage({
								urls:faceArray,
								current: faceArray[0]
							})
						}else if(index == 1){//上传
							uni.chooseImage({
								count: 1,
								sizeType: ["compressed"],
								sourceType: ["album"],
								success(res) {
									//获得临时路径
									var tempFilePath = 	res.tempFilePaths[0];
									uni.navigateTo({
										url: "../meFace/meFace?tempFilePath="+tempFilePath
									})
								}
							})
							
						}
					}
				})
			},
			cleanStorage(){
				uni.clearStorageSync();
				uni.showToast({
					title:"清理缓存成功",
					mask:false,
					duration: 1500
				})
			},
			logout(){
				var globalUser = this.getGlobalUser("globalUser");
				var serverUrl = common.serverUrl + "/user/logout?" + common.qqStr+"&userId=" + globalUser.id;
				
				uni.request({
					url: serverUrl,
					method: "POST",
					success: (res) => {
						if (res.data.status == 200) {
							uni.removeStorageSync("globalUser");
							uni.switchTab({
								url: "../me/me"
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("meInfo.css");
</style>
