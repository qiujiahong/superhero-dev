<template>
	<view  class="page page-fill">
		<form @submit="formSubmitNickname" >
			
			<view class="page-block" style="margin-top: 20upx;">
				<input 
					type="text" 
					name="nickname"
					:value="globalUser.nickname"
					 class="input"
					 placeholder="请输入昵称"
					 placeholder-class="graywords"
					 maxlength="10"
					 />
			</view>
			<button type="primary" form-type="submit" class="submitBtn">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				globalUser: {}
			}
		},
		onLoad() {
			var _this = this;
			var globalUser = _this.getGlobalUser("globalUser");
			_this.globalUser = globalUser;
		},
		methods: {
			formSubmitNickname(e){
				var me = this;
				var nickname = e.detail.value.nickname;
				
				uni.request({
					url: me.serverUrl + "/user/modifyUserinfo?"+me.qqStr,
					data:{
						"userId": me.globalUser.id,
						"nickname": nickname
					},
					header:{
						"headerUserId": me.globalUser.id,
						"headerUserToken": me.globalUser.userUniqueToken
					},
					method:"POST",
					success(res) {
						var resData = res.data;
						if(resData.status == 200){
							//获得最新的用户数据
							var userInfo = resData.data;;
							uni.setStorageSync("globalUser",userInfo)
							uni.navigateBack({
								delta:1 //返回上一个页面
							});
						}else if(resData.status == 500||resData.status == 502){
							uni.showToast({
								title: res.data.msg,
								image: "../../static/icos/error.png",
								duration: 2000
							})
						}
					}
					
				})
			}
		}
	}
</script>

<style>
.page-fill{
	width: 100%;
	height: 100%;
	position: absolute;
}

.graywords{
	color: #EAEAEA;
}
.input{
	height: 80upx;
	line-height: 80upx;
	width: 500upx;
	margin-left: 40upx;
}
.submitBtn{
	width: 95%;
	margin-top: 40upx;
}
</style>
