<template>
	<view class="my-search-container" :style="{backgroundColor: bgcolor}" @click="clickHandler">
		<!-- <view class="my-search-container" :style="{'background-color': bgcolor}"> -->
		<view class="my-search-box" :style="{borderRadius: radius+'px'}">
			<uni-icons type="search" size="18"></uni-icons>
			<text class="my-search-text">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {
				xx: 'yy'
			};
		},
		props: {
			// 背景色
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			clickHandler() {
				console.log('组件被点击了')
				// 组件内向组件外传递数据
				this.$emit('click', this.xx)
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		// background-color: #c00000;
		padding: 0 10px;

		.my-search-box {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 36px;
			width: 100%;
			// border-radius: 18px;
			background-color: #ffffff;

			.my-search-text {
				margin-left: 6px;
			}
		}
	}
</style>
