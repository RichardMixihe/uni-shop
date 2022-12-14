<template>
	<view>
		<!-- 顶部的搜索组件 -->
		<!-- 通过属性定制我组件显示的样式 -->
		<my-search bgcolor="#ff00ff" radius="9" @click="gotoSearch"></my-search>
		<!-- 分类选择 -->
		<view class="cate-container">
			<!-- 左侧一级导航 -->
			<scroll-view class="cate-left" :style="{height: wh+'px'}" scroll-y>
				<view :class="['cate-left-item',  active === i ? 'active' : '']" v-for="(item, i) in cateList" :key="i"
					@click="changeActive(i)">
					{{item.cat_name}}
				</view>
			</scroll-view>

			<!-- 右侧二级导航 -->
			<scroll-view class="cate-right" :style="{height: wh+'px'}" scroll-y :scroll-top="scrollTop">
				<view class="cate-right-item" v-for="(item, i) in cateLevel2" :key="i">
					<!-- 二级分类标题 -->
					<view class="cate-right-item-title">/{{item.cat_name}}/</view>
					<!-- 二级分类具体内容 -->
					<view class="cate-right-item-content">
						<view class="cate-right-item-content-box" v-for="(item2, i2) in item.children" :key="i2"
							@click="gotoGoodsList(item2)">
							<image :src="item2.cat_icon" mode="widthFix"></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/setBadge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 定义数据容器
				cateList: [],
				// 二级分类数据
				cateLevel2: [],
				// 页面状态数据
				// 屏幕可用高度
				wh: 0,
				// 1级分类选中状态
				active: 0,
				// scroll-view 的 bar 距离顶部的距离
				scrollTop: 0,
			};
		},
		onLoad() {
			// 获取屏幕可用高度
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			console.log(this.wh)
			// 发起请求
			this.getCateList()
		},
		methods: {
			// 获取分类数据
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/categories')
				// 数据异常判断
				// if(res.meta.status !== 200 ) return uni.$showMsg()
				// 和下面这个等价
				// if(res.meta.status !== 200 ){
				// 	return uni.$showMsg()
				// }
				// 和下面这个等价
				// if(res.meta.status !== 200 ){
				// 	let result =  uni.$showMsg()
				// 	return result
				// }
				// 和下面这个等价
				// if(res.meta.status !== 200 ){
				// 	// 弹窗
				// 	uni.$showMsg()
				// 	return;
				// }
				// // 设置页面数据
				// this.cateList = res.message

				// 不写return。
				// 下面这样写和上面等价
				if (res.meta.status !== 200) {
					// 出错弹窗
					uni.$showMsg()
				} else {
					// 设置页面数据
					// 一级分类
					this.cateList = res.message
					// 每个选中的一级分类的children
					this.cateLevel2 = this.cateList[0].children
				}

			},
			// 左侧导航事件处理函数
			changeActive(i) {
				console.log(i)
				this.active = i
				// 改变二级分类的数据
				this.cateLevel2 = this.cateList[i].children
				// 改变第二个scroll-view bar 距离顶部距离
				this.scrollTop = Math.random()
			},

			// 点击二级分类跳转到商品列表页
			gotoGoodsList(cate) {
				console.log(cate)
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?cid=${cate.cat_id}`
				})
			},

			// 跳转到搜索页面
			gotoSearch(e) {
				console.log('父组件执行函数，去搜索页面', e)
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.cate-container {
		display: flex;

		.cate-left {
			width: 240rpx;

			.cate-left-item {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 120rpx;
				background-color: #efefef;
				font-size: 24rpx;

				&.active {
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #ffffff;

					// 左边红线
					&::before {
						content: '';
						width: 6rpx;
						height: 60rpx;
						background-color: #c00000;
					}

					// 右边白线和背景相同
					&::after {
						content: '';
						width: 6rpx;
						height: 60rpx;
						// background-color: #c00000;
						background-color: #fffff;
					}
				}
			}
		}

		.cate-right {
			.cate-right-item {
				.cate-right-item-title {
					// 这里的样式不是确定
					display: flex;
					justify-content: center;
					font-weight: bold;
					font-size: 24rpx;
					padding: 20rpx 0;
				}

				.cate-right-item-content {
					display: flex;
					flex-wrap: wrap;

					.cate-right-item-content-box {
						width: 33.33%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 33.33%;
						padding: 20rpx;
						box-sizing: border-box;

						image {
							width: 100%;
						}

						text {
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
