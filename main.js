import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.serverUrl = "https://www.imovietrailer.com/superhero";
Vue.prototype.qqStr="qq=309284701";

Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync("globalUser")
	if (userInfo != null && userInfo != undefined && userInfo != "") {
		return userInfo;
	}else{
		return null;
	}
}


App.mpType = 'app'


const app = new Vue({
	...App
})
app.$mount()
