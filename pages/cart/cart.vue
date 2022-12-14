<template>
	<view class="cart-container">
		<view>
			<!-- 收获地址 -->
			<my-address></my-address>

			<!-- 购物车标题区域 -->
			<!-- 购物车商品列表的标题区域 -->
			<view class="cart-title">
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 描述文本 -->
				<text class="cart-title-text">购物车</text>
			</view>

			<!-- 购物车列表 -->
			<view>
				<my-goods v-for="(item, i) in cart" :key="i" :goods="item" :showRadio="true" :showNum="true"
					@radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
			</view>


			<!-- 结算栏 -->
			<my-settle></my-settle>
		</view>

		<!-- 空白购物车区域 -->
		<!-- <view>购物车空白区</view> -->
	</view>
</template>

<script>
	import badgeMix from '@/mixins/setBadge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount']),
			// 修改vuex数据
			radioChangeHandler(goods) {
				console.log(goods)
				// 修改vuex数据
				this.updateGoodsState(goods)
			},
			// 修改vuex数据
			numberChangeHandler(goods) {
				console.log(goods)
				this.updateGoodsCount(goods)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;

		.cart-title {
			height: 80rpx;
			display: flex;
			align-items: center;
			padding-left: 12rpx;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				margin-left: 20rpx;
			}
		}

	}
</style>
