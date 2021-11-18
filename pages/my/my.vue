<template>

	<view class="myhome">
		<!-- 已登录 -->
		<view class="wx-name" v-if="wxLogin">
			<image class="wx-avatar" :src="userInfo.avatarUrl" mode=""></image>
			<text class="wx-text">{{userInfo.nickName}}</text>
		</view>
		<!-- </block> -->
		<!-- 未登录 -->
		<view class="wx-button" v-if="!wxLogin">
			<view class="wx-button-view">登录美团外卖，开启旅程</view>
			<view>
				<button plain="true" @click="getUserProfile">去登录</button>
			</view>
		</view>
	</view>


</template>

<script>
import {wxlogin} from "@/utils/login.js"
	export default {
		name: 'my',
		data() {
			return {
				wxLogin: true,
				userInfo: {}
			}
		},
		methods: {
			// 点击登录按钮触发
			getUserProfile(e) {
				this.getStorage()
				if (this.wxLogin == true) {
					return
				}
				wxlogin()
			},
			// 获取本地数据
			getStorage() {
				let userInfo = uni.getStorageSync("userInfo")
				if (!uni.getStorageSync("userInfo")) {
					this.wxLogin = false
				} else {
					this.userInfo = userInfo
					this.wxLogin = true
				}
			}
		},
		onShow() {
			this.getStorage()
		}

	}
</script>

<style lang="scss" scoped>
	.myhome {
		background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
		height: 350upx;
		display: flex;
		align-items: center;

		.wx-name {
			display: flex;
			align-items: center;
			padding: 0 30upx;
			align-content: center;
			height: 200upx;

			.wx-avatar {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				margin-right: 20upx;
				overflow: hidden;
				border: 10rpx solid #ffffff;
			}

			.wx-text {
				font-size: 35upx;
			}
		}

		.wx-button {
			margin: 0 auto;

			.wx-button-view {
				font-size: 35upx;
				color: #FFFFFF;
				margin-bottom: 25upx;
			}

			button {
				border: none;
				font-size: 30upx;
				background: linear-gradient(to right, #28a6f1 10%, #0e8dd7 80%);
				border-radius: 50upx;
				color: #FFFFFF;
			}
		}

	}


	// text {
	// 	display: block;
	// 	margin: 10upx 0;
	// 	color: #999999;
	// }
</style>
