<template name="trailerStars">
	<!-- <view class="movie-score-wapper">
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-yellow.png" class="star-ico"></image>
		<image src="../static/icos/star-gray.png" class="star-ico"></image>
		<view class="move-score">
			9.1
		</view>
	</view> -->
	
	<view class="movie-score-wapper">
		<image  
			v-for="yellow in yellowScore" 
			src="../static/icos/star-yellow.png" 
			class="star-ico"></image>
		<image  
			v-for="gray in grayScore" 
			src="../static/icos/star-gray.png" 
			class="star-ico"></image>
		<view class="move-score" v-if="showNum == 1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "trailerStars",
		data() {
			return {
				yellowScore: 0,
				grayScore: 5
			};
		},
		props:{
			innerScore: 0, // 定义外部传入的参数 
			showNum: 0 ,   //定义是否需要显示具体的得分数 1-显示   0-不显示
		},
		//生命周期组件创建完成后被调用
		created(){
			var tempScore = 0 ;
			if(this.innerScore != null && this.innerScore != undefined && this.innerScore != ''){
				tempScore = this.innerScore;
			}
			var yellowScore = parseInt(tempScore/2);
			var grayScore = 5- yellowScore;
			this.yellowScore = yellowScore;
			this.grayScore = grayScore;
			
		}
	}
</script>

<style>
.movie-score-wapper{
	display: flex;
	flex-direction: row;
}
.star-ico{
	width: 20upx;
	height: 20upx;
	margin-top: 6upx;
}
.move-score{
	font-size: 12px;
	color: grey;
	margin-left: 8upx;
}
</style>
