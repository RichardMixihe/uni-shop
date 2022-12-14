<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<my-search></my-search>
		</view>
		<!-- 1 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, i) in swiperList" :key="item.goods_id">
				<navigator :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>

		<!-- 楼层列表 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层title -->
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<!-- 楼层图片 -->
				<view class="floor-img-box">
					<!-- 左边大图 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>

					<!-- 右边4个小图 -->
					<!-- 从一个数组中取某一部分的数据 slice -->
					<view class="right-img-box">
						<!-- <view class="right-img-item" v-for="(item2, i2) in item.product_list" v-if="i2>0"> -->
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list.slice(1)" :key="i2"
							:url="item2.url">
							<image :src="item2.image_src" :style="{width: item2.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/setBadge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 定义轮播图数据
				swiperList: [],
				// 导航数据
				navList: [],
				// 楼层数据
				floorList: [],
			};
		},
		// onLoad 发起请求
		onLoad() {
			// 发起请求
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 获取轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/home/swiperdata')
				console.log('res', res)
				// 判断异常情况
				// if (res.meta.status !== 200) {
				// 	return uni.showToast({
				// 		title: '数据请求失败！',
				// 		duration: 1500,
				// 		icon: 'none'
				// 	})
				// }
				if (res.meta.status !== 200) return uni.$showMsg()

				// 正常，赋值
				this.swiperList = res.message
			},
			// 获取导航数据
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/home/catitems')
				// 数据异常判断
				if (res.meta.status !== 200) return uni.$showMsg()
				// 设置页面数据
				this.navList = res.message
			},
			// 获取楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/home/floordata')
				// 数据异常判断
				if (res.meta.status !== 200) return uni.$showMsg()

				// 设置页面数据之前，做数据转换，数组的 forEach
				res.message.forEach((floor) => {
					floor.product_list.forEach(prod => {
						let query = prod.navigator_url.split('?')[1]
						prod.url = '/subpkg/goods_list/goods_list?' + query
					})
				})
				// 用map方法
				// const newMessage = res.message.map(floor => {
				// 	let newFloor = floor.product_list.map(prod => {
				// 		let query = prod.navigator_url.split('?')[1]
				// 		prod.url = '/subpkg/goods_list/goods_list?' + query
				// 		return prod
				// 	})
				// 	return newFloor
				// })
				// console.log(newMessage)

				// 设置页面数据
				this.floorList = res.message
			},

			// 事件处理函数
			navClickHandler(item) {
				console.log(item)
				if (item.name === '分类') {
					// 跳转tab页面
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		},


	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 9;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-evenly;
		margin: 32rpx 0;

		.nav-item {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.floor-list {
		padding-left: 8rpx;

		.floor-item {
			.floor-title {
				height: 60rpx;
				width: 100%;
			}

			.floor-img-box {
				display: flex;

				.right-img-box {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}
	}
</style>
