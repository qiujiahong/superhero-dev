

# 添加自定义组件

## 前言 

本文介绍如何添加一个自定义组件，其大致步骤如下：


* 定义组件；
* 在使用页面导入、声明并且使用组件；



## 定义


```
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

```


## 导入、声明、使用


```
<template>
	<view class="page">
		<!-- 使用自定义标贴 -->
		<helloComp></helloComp>
	</view>
</template>

<script>
	// 导入自定义组件
	import helloComp from "../../components/helloComp.vue";
	
	export default {
		data() {
			return {
			}
		},
		methods: {
		},
        //声明自定义组件
		components: {
			helloComp
		}
	}
</script>

<style>
	@import url("index.css");
</style>

```