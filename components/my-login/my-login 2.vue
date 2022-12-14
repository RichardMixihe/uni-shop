<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<!-- 登录提示 -->
		<view class="login-tips">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['saveUserInfo', 'updateToken']),
			async getUserProfile() {
				// 调的是微信api
				const [err, res] = await uni.getUserProfile({
					desc: '完善个人资料'
				})
				if (err) return uni.$showMsg('您拒绝授权！')
				console.log(res)
				// 保存用户信息到vuex
				this.saveUserInfo(res.userInfo)

				// 获取token
				this.getToken(res)
			},

			// 获取token
			async getToken(info) {
				// 1、微信登录
				const [err, res] = await uni.login()

				if (err) return uni.$showMsg('微信登录失败！')

				// 2、登录你们公司的接口
				console.log(res)
				console.log(info)
				// 准备参数对象，你们公司要求的
				const data = {
					code: res.code, // 微信登录返回的code
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// 调用公司接口
				const {
					data: loginResult
				} = await uni.$http.post('/users/wxlogin', data)

				// 判断公司接口是否登录成功
				if (loginResult.meta.status !== 200) return uni.$showMsg('黑马优购登录失败！')

				//登录成功
				uni.$showMsg('黑马优购登录成功！')
				console.log(loginResult)
				// 保存token到vuex
				// this.updateToken(loginResult.message.token)
				this.updateToken(
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIxNCwiaWF0IjoxNjcwNzQ0NzgxLCJleHAiOjEwMDE2NzA3NDQ3ODB9.vt7ckhW0XKLr2eoEoea1QzVy4KTPgHxjh3fHmX7bYqc'
					)

			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		// 登录盒子的样式
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.login-tips {
			font-size: 12px;
			color: gray;
		}
	}
</style>
