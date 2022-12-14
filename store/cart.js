export default {
	namespaced: true,

	// 状态数据
	state: () => ({
		// 购物车数据容器
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	// 修改state
	mutations: {
		// 添加购物车数据的方法
		addToCart(state, goods) {
			// 添加的时候，先判断之前是否添加过
			const result = state.cart.find(item => item.goods_id === goods.goods_id)

			// 添加过，产品数量+1
			if (result) {
				result.goods_count += 1;
			} else {
				// 没有添加过
				state.cart.push(goods)
			}
			// 保存到本地
			this.commit('m_cart/saveToStorage')
			console.log(JSON.stringify(state.cart))
		},
		// 修改购物车的选中状态
		updateGoodsState(state, goods) {
			// console.log('开始修改', goods)
			// 找到你要修改的商品
			const result = state.cart.find(item => item.goods_id === goods.goods_id)
			// 找到了就修改商品状态
			if (result) {
				result.goods_state = goods.goods_state
				// 保存到本地
				this.commit('m_cart/saveToStorage')
			}
		},
		// 修改商品数量
		updateGoodsCount(state, goods) {
			console.log('开始修改', goods)
			// 找到你要修改的商品
			const result = state.cart.find(item => item.goods_id === goods.goods_id)
			// 找到了就修改商品数量
			if (result) {
				result.goods_count = goods.goods_count
				// 保存到本地
				this.commit('m_cart/saveToStorage')
			}
		},

		// 修改商品的全部选中状态
		updateAllGoodsState(state, newState) {
			console.log('getters', newState)
			state.cart.forEach(item => item.goods_state = newState)
			// 保存到本地
			this.commit('m_cart/saveToStorage')
		},

		// 保存购物车信息到本地
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}

	},

	// 基于state计算新的数据
	getters: {
		// 购物车商品总数量
		total(state) {
			return state.cart.reduce((acc, item) => acc + item.goods_count, 0)
		},
		// 商品是否全部选中的状态
		isFullCheck(state) {
			let result = state.cart.every(goods => goods.goods_state === true)
			return result
		},
		// 计算，所有 选中商品 的价格
		totalPrice(state) {
			// 所有选中商品
			return state.cart.filter(goods => goods.goods_state === true)
				.reduce((acc, item) => acc + item.goods_count * item.goods_price, 0).toFixed(2)
		},
		// 选中商品的总数量
		checkedCount(state) {
			// 筛选出选中的
			// return state.cart.filter(goods => goods.goods_state === true).reduce((acc, item) => acc + item.goods_count,
			// 	0)
			// 下面的和上面的等价
			const selectedGoods = state.cart.filter(goods => goods.goods_state === true)
			const accResult = selectedGoods.reduce((acc, item) => acc + item.goods_count, 0)
			return accResult

		}
	}
}
