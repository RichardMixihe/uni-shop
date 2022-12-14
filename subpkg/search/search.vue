<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<!-- 使用 uni-ui 提供的搜索组件 -->
			<uni-search-bar @input="input" cancelButton="none" radius="20" :focus="true"></uni-search-bar>
		</view>
		<!-- 搜索列表 -->
		<!-- 搜索结果列表 -->
		<view class="search-results-list" v-if="searchResults.length>0">
			<view class="search-results-item" v-for="(item, i) in searchResults" :key="i"
				@click="gotoDetail(item.goods_id)">
				<view class="search-results-item-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-container" v-else>
			<!-- 搜索title -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="18"></uni-icons>
			</view>
			<!-- 历史搜索关键词 -->
			<view class="history-keywords">
				<uni-tag :text="item" v-for="(item, i) in historyKeywords" :key="i"></uni-tag>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 定义一个计时器id
				timerId: null,
				// 搜索关键词作为组件状态维护
				kw: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索历史
				historyKeywords: []
			};
		},
		onLoad() {
			// 读取本地保存的 历史搜索记录
			this.historyKeywords = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			// input 组件输入事件处理函数
			input(value) {
				// 用户一旦输入，我就清理setTimeout
				clearTimeout(this.timerId)
				// console.log('清理的id', this.timerId)
				// 重新创建一个
				this.timerId = setTimeout(() => {
					this.kw = value
					// 做一个判断,如果输入为空
					if (!this.kw.trim()) {
						// 清空列表
						this.searchResults = []
						return
					}
					console.log(value, '搜')
					// 发起搜索
					this.getSearchResults()
				}, 1000)
				// console.log('重新开始计时的id', this.timerId)
			},

			// 搜索处理
			async getSearchResults() {
				const {
					data: res
				} = await uni.$http.get('/goods/qsearch', {
					query: this.kw
				})
				// 数据异常判断
				if (res.meta.status !== 200) return uni.$showMsg()
				console.log(res.message)
				// 设置页面数据
				this.searchResults = res.message

				// 搜索结束之后，有结果的时候保存搜索关键词
				this.saveSearchHistory()
			},

			// 点击搜索结果跳转到产品详情页
			gotoDetail(goods_id) {
				console.log(goods_id)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			// 保存历史搜索结果
			saveSearchHistory() {
				// 放数组开头
				// this.historyKeywords.unshift(this.kw)
				// 放数组结尾
				// this.historyKeywords.push(this.kw)
				// 找一下关键词是否搜过
				const index = this.historyKeywords.indexOf(this.kw)
				// 没找到放开头
				if (index < 0) {
					this.historyKeywords.unshift(this.kw)
				} else {
					// 找到了,删除对应元素
					this.historyKeywords.splice(index, 1)
					this.historyKeywords.unshift(this.kw)
				}

				// 保存到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyKeywords))

			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #c00000;
		position: sticky;
		top: 0;
		z-index: 9;
	}

	.search-results-list {
		padding: 0 20rpx;

		.search-results-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #efefef;
			height: 90rpx;

			.search-results-item-name {
				font-size: 24rpx;
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-container {
		.history-title {
			display: flex;
			height: 80rpx;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			border-bottom: 1rpx solid #efefef;
		}

		.history-keywords {
			display: flex;
			flex-wrap: wrap;
			margin-top: 16rpx;

			.uni-tag {
				margin: 10rpx;
			}
		}
	}
</style>
