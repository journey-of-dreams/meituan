<template>
	<view>
		<view class="warp" v-if="modalShow">
			<view class="warp-view">
				<view class="warp-text">请登陆后再操作</view>
				<view class="warp-flex">
					<button plain="true" @click="modalShow=false">取消</button>
					<button plain="true" @click="goLogin">登录</button>
				</view>
			</view>
		</view>
		<!-- <HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage">
		</HMmessages> -->
	</view>
</template>

<script>
	import {
		wxlogin
	} from "@/utils/login.js"
	// import HMmessages from "@/components/HM-messages/HM-messages.vue"
	export default {
		// components: {
		// 	HMmessages
		// },

		data() {
			return {
				modalShow: false,
				wxLogin: false
			}
		},
		methods: {
			// 显示登录框，用于父组件调用
			showModal() {
				this.modalShow = true
			},

			// 登录
			goLogin() {
				this.modalShow = false
				wxlogin()
				// this.HMmessages.show('登陆成功', {
				// 	icon: "success",
				// 	fontColor: "#ffffff",
				// 	background: "rgba(102,0,51,0.8)"
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;

		.warp-view {
			width: 500upx;
			height: 200upx;
			background: #FFFFFF;
			margin: auto;
			position: absolute;
			-webkit-position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 8upx;
			overflow: hidden;

			.warp-text {
				text-align: center;
				margin-top: 30upx;
				font-size: 34upx;
				color: #666666;
			}

			.warp-flex {
				display: flex;
				justify-content: space-around;
				border-top: 1upx solid #EEEEEE;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 80upx;
				line-height: 80upx;
				-webkit-transform: translateZ(0);

				button {
					border: none;
					font-size: 30upx;
				}
			}
		}

	}
</style>
