# 下拉刷新


APP下拉之后做一些刷新动作。  
该功能在uni-app中默认是关闭的，打开步骤如下： 

* pages.json中设置使能下拉刷新；    
```json
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"app-plus": {
                    "titleNView": false //禁用原生导航栏
                },
				"enablePullDownRefresh":true //开启单页面下拉刷新功能
			}
		}
......
```


* 对应页面实现刷新钩子函数 onPullDownRefresh    

```js
onPullDownRefresh() {
	this.refresh();
},
```

* 刷新完成之后，调用函数停止刷新 ``uni.stopPullDownRefresh();``


