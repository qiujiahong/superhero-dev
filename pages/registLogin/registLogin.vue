<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
			</view>
			
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
		</form>
		
		
		<!-- 第三方登录h5不支持 -->
		<!-- #ifndef H5 -->
		<view class="third-wapper">
			
			<view class="third-line">
				<view class="single-line">
					<view class="line"></view>
				</view>
				
				<view class="third-words">第三方账号登录</view>
				
				<view class="single-line">
					<view class="line"></view>
				</view>
			</view>
			
			<view class="third-icos-wapper">
				<!-- 5+app 用QQ登录  小程序用用微信小程序登录  H5不支持 -->
				<!-- #ifdef APP-PLUS -->
					<image src="../../static/icos/weixin.png" class="third-ico"  ></image>
					<image src="../../static/icos/QQ.png" class="third-ico"  style="margin-left: 80upx;"></image>
					<image src="../../static/icos/weibo.png" class="third-ico"  style="margin-left: 80upx;"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
					<button open-type="getUserInfo" @getuserinfo="wxLogin" class="third-btn-ico">
					</button>
				<!-- #endif -->
			</view>
			
		</view>
		<!-- #endif -->
		
		
	</view>
</template>

<script>
	import common from "../../common/common.js";
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 实现在微信小程序端的微信登录
			wxLogin(e){
				var me = this;
				console.log(me)
				// console.log(e)
				// 通过微信开放能力获得用户的基本信息
				var userInfo = e.detail.userInfo;				
				var serverUrl = this.serverUrl + "/mpWXLogin/";
				var qqStr =  this.qqStr;
				// 实现微信登录
				uni.login({
					provider:"weixin",
					success(loginResult) {
						// console.log(loginResult)
						// 获得微信登录的code：授权码
						var code = loginResult.code;
						var loginToWhichMP =  1;	//超英预告
						serverUrl = serverUrl + code + "?"+ qqStr;
						uni.request({
							url: serverUrl,
							data:{
								"avatarUrl": userInfo.avatarUrl,
								"nickName": userInfo.nickName,
								"whichMP": loginToWhichMP
							},
							method:"POST",
							success(userResult) {
								console.log(userResult);
							},
							complete() {
								console.log("complete");
							}
						})
					}
				})
			},
			formSubmit(e){
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				//发起注册或者登陆的请求
				var serverUrl = common.serverUrl + "/user/registOrLogin?" + common.qqStr;
				uni.request({
					url: serverUrl,
					data:{
						username: username,
						password: password
					},
					method: "POST",
					success: (res) => {
						if (res.data.status == 200) {
							var userInfo = res.data.data;
							// console.log(userInfo)
							// 保存用户信息到全局的缓冲中
							uni.setStorageSync("globalUser",userInfo);
							//切换页面跳转
							uni.switchTab({
								url:"../me/me"
							});
						}else if (res.data.status == 500){
							uni.showToast({
								title: res.data.msg,
								duration:2000,
								image: "../../static/icos/error.png"
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("registLogin.css");

</style>
