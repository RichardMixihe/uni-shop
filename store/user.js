export default {
	namespaced: true,

	// state
	state: () => ({
		// 用户的收获地址
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		// 用户是否登录
		token: uni.getStorageSync('token') || '',
		// 用户微信信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向信息
		redirectInfo: null
	}),

	// 修改数据的方法
	mutations: {
		// 定义存储 address 的方法
		updateAddress(state, address) {
			// console.log(address)
			state.address = address
			// 保存地址到本地
			this.commit('m_user/saveAddressToStorage')
		},
		// 保存地址到本地
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 保存用户信息到本地
		saveUserInfo(state, userinfo) {
			state.userinfo = userinfo
			// 保存到本地
			this.commit('m_user/saveUserInfoToStorage')
		},
		// 将 userinfo 持久化存储到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},

		// 保存用户token
		updateToken(state, token) {
			state.token = token
			// 保存token到本地
			this.commit('m_user/saveTokenToStorage')
		},
		// 将 token 字符串持久化存储到本地
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		// 重定向信息修改方法
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
		}

	},

	// getters
	getters: {
		// 基于state算出新的数据
		addstr(state) {
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
				.detailInfo
		}

	}
}
