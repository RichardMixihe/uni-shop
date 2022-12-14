// #ifndef VUE3
// vue2 开发
import Vue from 'vue'
import App from './App'
// 导入 store 实例
import store from './store/store.js'
// 导入网络请求库
import {
	$http
} from '@escook/request-miniprogram'

// 基础请求地址
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 请求拦截器
$http.beforeRequest = function(option) {
	// 显示加载框
	uni.showLoading({
		title: '数据加载中...'
	})
}
// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

// 挂载到uni全局对象上
uni.$http = $http

// 封装一个全局通用的函数
uni.$showMsg = function(title = '数据加载失败！', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif



// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
