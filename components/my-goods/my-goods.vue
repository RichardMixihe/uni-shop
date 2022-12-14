<template>
	<view class="goods-item">
		<!-- 商品左侧图片区域 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler" />
			<image class="goods-image" :src="goods.goods_small_logo || defaultPic"></image>
		</view>
		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<!-- 商品价格 -->
			<!-- <view class="goods-price">{{goods.goods_price | tofixed | addYuan}}</view> -->
			<!-- <view class="goods-price">{{computedPrice}}</view> -->
			<view class="goods-info-box">
				<view class="goods-price">{{tofixed2(goods.goods_price)}}</view>
				<uni-number-box :min="1" v-if="showNum" :value="goods.goods_count" @change="numChangeHandler" />
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				// 默认的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props: {
			goods: {
				type: Object,
				default: () => ({})
			},
			// radio 是否显示配置
			showRadio: {
				type: Boolean,
				default: false
			},
			// 数量选择 是否显示配置
			showNum: {
				type: Boolean,
				default: false
			}
		},
		// 过时了，了解一下
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			},
			addYuan(num) {
				return '¥' + num
			},
		},

		// 基于当前组件的状态，数据。算出一个新的状态，数据
		computed: {
			computedPrice() {
				return Number(this.goods.goods_price).toFixed(2)
			}
		},

		methods: {
			tofixed2(num) {
				return '¥' + Number(num).toFixed(2)
			},

			// radio 点击事件处理函数
			radioClickHandler() {
				// 向组件外暴露事件和传递参数
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			// numberbox 数量发生变化的事件处理函数
			numChangeHandler(value) {
				console.log(value)
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: value
				})
			}
		}

	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		border-bottom: 1px solid #efefef;
		padding: 8rpx;

		.goods-item-left {
			display: flex;
			align-items: center;

			.goods-image {
				width: 200rpx;
				height: 200rpx;
				vertical-align: middle;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 24rpx;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					font-size: 32rpx;
					color: #c00000;
				}
			}

		}
	}
</style>
