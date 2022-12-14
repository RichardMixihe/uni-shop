<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>
		<!-- 面板的列表区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<!-- panel 的主体区域 -->
				<view class="panel-body">
					<!-- panel 的 item 项 -->
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel">
				<!-- 面板的标题 -->
				<view class="panel-title">我的订单</view>
				<!-- 面板的主体 -->
				<view class="panel-body">
					<!-- 面板主体中的 item 项 -->
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {

			};
		},
		computed: {
			...mapState('m_user', ['userinfo'])
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		// 为整个组件的结构添加浅灰色的背景，要想完全撑开需要将父容器高度设置为100%，参照下面的第3步
		background-color: #efefef;

		.top-box {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.avatar {
				display: block;
				width: 180rpx;
				height: 180rpx;
				border-radius: 90rpx;
				border: 4rpx solid white;
				box-shadow: 0 2rpx 10rpx black;
			}

			.nickname {
				color: white;
				font-weight: bold;
				font-size: 32rpx;
				margin-top: 20rpx;
			}
		}

		// 面板区域

		.panel-list {
			padding: 0 20rpx;
			position: relative;
			top: -20rpx;

			.panel {
				background-color: white;
				border-radius: 6rpx;
				margin-bottom: 16rpx;

				.panel-title {
					line-height: 90rpx;
					padding-left: 20rpx;
					font-size: 30rpx;
					border-bottom: 2px solid #f4f4f4;
				}

				.panel-body {
					display: flex;
					justify-content: space-around;

					.panel-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						font-size: 24rpx;
						padding: 20rpx 0;

						.icon {
							width: 70rpx;
							height: 70rpx;
						}
					}
				}

				.panel-list-item {
					height: 90rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 30rpx;
					padding: 0 20rpx;
				}
			}
		}


	}
</style>
