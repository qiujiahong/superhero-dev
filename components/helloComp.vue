<template name="helloComp">  <!-- 定义组件的名称为helloComp -->
	<view>
		{{msg}}
		<view >
			<input type="text" :value="myval" class="txt">
		</view>
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
		},
		//props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。
		props:{
			//自定义一个而变量用来接收父组件（首页和其他页面）传入的参数值
			myval:{
				type: String  //定义参数类型
			}
		}
	}
</script>

<style>
.txt{
	color: red;
}
</style>
