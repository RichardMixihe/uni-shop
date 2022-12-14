<template>
	<!-- 最外层的容器 -->

	<view class="my-settle-container">
		<!-- 全选区域 -->
		<view class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</view>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{totalPrice}}</text>
		</view>

		<!-- 结算区域 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				// 倒计时秒数
				seconds: 3
			};
		},
		computed: {
			...mapGetters('m_cart', ['isFullCheck', 'totalPrice', 'checkedCount']),
			// 从user模块获取收获地址信息
			...mapGetters('m_user', ['addstr']),
			// 从user模块获取登录成功的token
			...mapState('m_user', ['token'])
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			// 全选点击事件处理函数
			changeAllState() {
				console.log(this.isFullCheck)
				// 修改vuex中数据
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 结算条件判断
			settlement() {
				// 是否选择了商品
				if (this.checkedCount === 0) return uni.$showMsg('请选择要结算的商品')

				// 是否选择了收获地址
				if (!this.addstr) return uni.$showMsg('请选择收获地址')

				// 用户是否登录
				// if (!this.token) return this.delayNavigate()
				// 这个和上面等价
				if (!this.token) {
					return this.delayNavigate()
				}
			},

			delayNavigate() {
				for (let i = 0; i <= this.seconds; i++) {
					setTimeout(() => {
						if (i === this.seconds) {
							uni.switchTab({
								url: '/pages/my/my'
							})
						} else {
							uni.showToast({
								title: `未登录，将在${this.seconds-i}秒后跳转到登录页面`,
								duration: 1000,
								mask: true,
								icon: 'none'
							})
						}
					}, i * 1000)
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		/* 底部固定定位 */
		position: fixed;
		bottom: 0;
		left: 0;
		/* 设置宽高和背景色 */
		width: 100%;
		height: 50px;
		background-color: white; // 将背景色从 cyan 改为 white

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
			}
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
