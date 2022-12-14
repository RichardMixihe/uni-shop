import Vue from 'vue'
import Vuex from 'vuex'

// 1. 导入购物车的 vuex 模块
import moduleCart from './cart.js'
// 2. 导入用户的 vuex 模块
import moduleUser from './user.js'

// 注册为vue的插件
Vue.use(Vuex)

// 创建 store
const store = new Vuex.Store({
	modules: {
		'm_cart': moduleCart,
		'm_user': moduleUser
	}
})

export default store
