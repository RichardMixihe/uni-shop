import {
	mapGetters
} from 'vuex'
// 导出一个 mixin 对象
export default {
	computed: {
		...mapGetters('m_cart', ['total']),
	},
	// 监听 total 的变化，更新tabBar徽标
	watch: {
		total() {
			this.setBadge()
		}
	},
	onShow() {
		// 在页面刚展示的时候，设置数字徽标
		this.setBadge()
	},
	methods: {
		setBadge() {
			// 调用 uni.setTabBarBadge() 方法，设置购物车右上角徽标
			uni.setTabBarBadge({
				index: 2,
				text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
			})
		},
	},
}
