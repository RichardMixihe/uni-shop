<template>

	<view class="goods-list">
		<my-goods v-for="(item, i) in goodsList" :goods="item" :key="i" @click.native="gotoDetail(item)"></my-goods>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},

				//  商品列表数据容器
				goodsList: [],
				// 查询条件的总条数
				total: 0,
				// 当前数据请求状态，是否正在请求数据
				isloading: false

			};
		},

		onLoad(options) {
			console.log(options)
			// 初始化商品列表的查询参数
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			// 发请求
			this.getGoodsList()
		},
		// 页面事件处理函数
		onReachBottom() {
			console.log('到底了')
			// 数据是否加载完毕的判断
			if (this.goodsList.length === this.total) return uni.$showMsg('数据加载完毕')

			// 数据是否请求完毕判断
			if (this.isloading) return
			console.log('发起请求')
			// 再次发起请求
			// this.queryObj.pagenum += 1
			// 和上面的等价
			this.queryObj.pagenum = this.queryObj.pagenum + 1
			// 发起请求
			this.getGoodsList()
		},
		// 下拉刷新页面事件处理函数
		onPullDownRefresh() {
			console.log('下拉刷新了')
			// 下拉刷新干啥事？
			// 初始化页面的一些状态
			this.queryObj.pagenum = 1
			this.goodsList = []
			this.total = 0
			this.isloading = false
			// 发起请求, 数据请求完毕后，关闭下拉刷新的动画效果。
			this.getGoodsList(() => {
				console.log('关闭下拉刷新效果333')
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			// 获取商品列表数据
			async getGoodsList(cb) {
				// 请求开始前设置为true
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/goods/search', this.queryObj)

				// 只有下拉刷新才：关闭下拉刷新效果。
				if (cb) {
					cb()
				}

				// 判断异常数据
				if (res.meta.status !== 200) return uni.$showMsg()
				console.log(res)
				// 请求结束后，设置为 false;
				this.isloading = false
				// 设置页面数据
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			// 点击item跳转到商品详情页
			gotoDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		border: 1rpx solid #efefef;
		margin: 0 8rpx;
	}
</style>
