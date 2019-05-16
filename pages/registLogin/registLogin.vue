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
