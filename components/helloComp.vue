<template name="helloComp">  <!-- 定义组件的名称为helloComp -->
	<view>
		{{msg}}
	</view>
</template>

<script>
	export default {
		//定义组件的名称为helloComp
		name: "helloComp",
		data() {
			return {
				msg: "你好这是一个自定义组件..."
			};
		}
	}
</script>

<style>

</style>
