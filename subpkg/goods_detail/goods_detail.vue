<template>
	<view class="goods-detail-container">
		<!-- 商品图片轮播图 -->
		<swiper indicator-dots>
			<swiper-item v-for="(item, i) in goodsDetail.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>

		<!-- 商品信息 -->
		<!-- 商品信息区域 -->
		<view class="goods-info-box" v-if="Object.keys(goodsDetail).length>0">
			<!-- 商品价格 -->
			<view class="price">￥{{goodsDetail.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goodsDetail.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费{{total}}</view>
		</view>

		<!-- 商品详细介绍 -->
		<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>

		<!-- 商品导航 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	// 导入 vuex 的辅助函数
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				// 产品详情
				goodsDetail: {},
				// 商品导航配置
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],

				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]

			}
		},
		computed: {
			// 注入 vuex 中 state 的数据
			...mapState('m_cart', ['cart']),
			// 注入 vuex 中 getters 的数据
			...mapGetters('m_cart', ['total'])
		},
		onLoad(options) {
			this.getGoodsDetail(options.goods_id)
		},
		watch: {
			// total(newValue) {
			// 	console.log('设置数量')
			// 	this.options[1].info = newValue
			// }
			// 完整定义方式
			total: {
				handler(newValue) {
					console.log('设置数量')
					this.options[1].info = newValue
				},
				// 页面一旦渲染完毕就执行
				immediate: true
			}
		},
		methods: {
			...mapMutations('m_cart', ['addToCart']),
			// 获取产品详情数据
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/goods/detail', {
					goods_id
				})
				// 数据异常判断
				if (res.meta.status !== 200) return uni.$showMsg()
				// 对产品介绍做数据格式的处理
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="vertical-align: middle;"').replace(/webp/g, 'jpg')

				// 设置页面数据
				this.goodsDetail = res.message
			},
			// 轮播图片事件处理函数
			preview(i) {
				// 调用小程序框架的图片预览函数
				uni.previewImage({
					current: i,
					urls: this.goodsDetail.pics.map(item => item.pics_big)
				})
			},
			// 商品导航左侧
			onClick(e) {
				console.log(e)
				if (e.content.text === '购物车') {
					// 跳转tab页面
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// 商品导航右侧
			buttonClick(e) {
				console.log(e)
				if (e.content.text === '加入购物车') {
					console.log('准备修改购物车数据')
					// 拼接商品详情数据
					const goods = {
						goods_id: this.goodsDetail.goods_id, // 商品的Id
						goods_name: this.goodsDetail.goods_name, // 商品的名称
						goods_price: this.goodsDetail.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goodsDetail.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 50px;

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		// 商品信息区域的样式
		.goods-info-box {
			padding: 10px;
			padding-right: 0;

			.price {
				color: #c00000;
				font-size: 18px;
				margin: 10px 0;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-name {
					font-size: 13px;
					padding-right: 10px;
				}

				// 收藏区域
				.favi {
					width: 120px;
					font-size: 12px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-left: 1px solid #efefef;
					color: gray;
				}
			}

			// 运费
			.yf {
				margin: 10px 0;
				font-size: 12px;
				color: gray;
			}
		}

		.goods-nav {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>
