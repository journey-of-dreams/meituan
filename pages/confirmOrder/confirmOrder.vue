<template>
	<view class="confirm">
		<view class="place-view">
			<view class="place-addres" v-if="!address" @click="chooseAddress">
				+ 新增收货地址
			</view>
			<!-- 已选中收货地址 -->
			<view class="goods-address" v-else @click="chooseAddress">
				<view class="goods-address-left">
					<image src="../../static/coen/address.png" mode="widthFix"></image>
				</view>
				<view class="goods-address-in">
					<view>{{address.cityName+address.countyName+address.detailInfo}}</view>
					<view class="goods-address-name">
						<text>{{address.userName}}</text>
						<text>{{address.telNumber}}</text>
					</view>
				</view>
				<view class="goods-address-right">
					<image src="../../static/coen/jiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="place-time">
				<image src="../../static/coen/times.png" mode="widthFix"></image>
				<text>立即送出</text>
			</view>
		</view>
		<!-- 菜单 -->
		<view class="place-view">
			<view class="order-view" v-for="(item,index) in temShopArr" :key="index">
				<view class="order-img">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<view class="order-title">
					<text>{{item.input}}</text>
					<text>x{{item.amount}}</text>
				</view>
				<view class="order-price">
					单价:¥{{item.price*(1-item.discount)}}
				</view>
			</view>
		</view>
		<!-- 配送费 -->
		<view class="place-view">
			<view class="Delivery">配送费：¥{{physical}}</view>
		</view>
		<!-- 高度 -->
		<view style="height: 300upx;"></view>
		<!-- 支付 -->
		<view class="payment">
			<view class="payment-left">
				<text>合计</text>
				<text>¥{{totalPrice}}</text>
			</view>
			<view class="payment-right" @click="goPay">
				去支付
			</view>
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage">
		</HMmessages>
		<loading v-if="loading"></loading>
	</view>
</template>
// <script>
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	import {
		post
	} from "@/api/index.js"
	import {
		wxPayUrl
	} from "@/api/request.js"

	export default {
		components: {
			HMmessages
		},
		data() {
			return {
				temShopArr: [],
				totalPrice: 0,
				physical: 0,
				address: null,
				orderIn: {},
				loading: true
			}
		},
		methods: {

			// 获取收货地址
			chooseAddress() {
				wx.chooseAddress({
					success: (res) => {
						this.address = res
					}
				})
			},
			// 去支付
			goPay() {
				if (!this.address) {
					this.tips("没有选择收货地址", "error")
				} else {
					let goods_address = this.address.cityName + this.address.countyName + this.address.detailInfo
					let wxdata = {
						// type: "placeOrder",
						peopleobj: {
							address: goods_address,
							name: this.address.userName,
							iphone: this.address.telNumber
						},
						arrinfo: this.temShopArr,
						merchantid: this.orderIn.merchaintid,
						ide: this.orderIn.ide,
						commod: this.orderIn.commod,
						logo: this.orderIn.logo,
						useropenid: this.orderIn.useropenid,
						payment: this.totalPrice
					}
					this.wxPay(wxdata)
				}
			},
			// 微信支付
			wxPay(wxdata) {
				// 显示loading，防止用户多次点击
				uni.showLoading({
					mask: true,
					title: "正在为您下单"
				})
				post(wxPayUrl, wxdata).then(res => {
					if (res[1].data.msg == "SUCCESS") {
						uni.hideLoading()
						this.tips(res[1].data.datas)
					} else {
						uni.hideLoading()
						this.tips("支付失败")
					}
				})
			},
			// 提示
			tips(content, icon = "success") {
				this.HMmessages.show(content, {
					icon,
					fontColor: "#ffffff",
					background: "rgba(102,0,51,0.8)"
				})
			}
		},
		// 获取url中的参数
		onLoad(e) {
			let orderIn = JSON.parse(e.orderIn)
			this.orderIn = orderIn
			this.temShopArr = orderIn.temShopArr
			this.totalPrice = orderIn.totalPrice + orderIn.physical
			this.physical = orderIn.physical
			this.loading = false
		}
	}
</script>
<style lang="scss" scoped>
	.confirm {
		background: #F4f4f4;
		position: relative;

		.place-view {
			background: #FFFFFF;
			margin: 20upx;
			border-radius: 9upx;
			padding: 35upx 15upx;

			.place-addres {
				border: 1rpx solid #ffb000;
				width: 400upx;
				height: 80upx;
				line-height: 80upx;
				border-radius: 50upx;
				text-align: center;
				color: #ffb000;
				margin: 0 auto;
				font-size: 30upx;
			}

			.goods-address {
				display: flex;
				align-items: center;

				/* 收货地址 */
				.goods-address-left {
					width: 40upx;
					height: 40upx;
					padding-right: 20upx;

					image {
						width: 40upx;
						height: 40upx;
					}

				}

				.goods-address-in {
					flex-grow: 1;
					font-size: 30upx;

					.goods-address-name {
						display: flex;
						align-items: center;
						font-size: 28upx;
						padding-top: 10upx;

						text {
							&:nth-child(1) {
								padding-right: 10upx;
							}
						}
					}

				}

				.goods-address-right {
					width: 40upx;
					height: 40upx;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

			}

			.place-time {
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-top: 1rpx solid #F4f4f4;
				padding-top: 35upx;
				margin-top: 35upx;

				image {
					width: 40upx;
					height: 40upx;
					padding-right: 20upx;
				}
			}

			.order-view {
				display: flex;
				height: 150upx !important;
				overflow: hidden;
				margin-bottom: 15upx;
				font-size: 30upx;

				text {
					display: block;
				}

				.order-img {
					width: 200upx !important;
					height: 150upx !important;
					padding-right: 15upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.order-title {
					flex-grow: 1;

					text {
						&:nth-child(2) {
							color: #999999;
							font-size: 25upx;
						}
					}
				}
			}

			.Delivery {
				display: flex;
				justify-content: flex-end;
				font-size: 30upx;
			}
		}

		/* 支付 */
		.payment {
			background: #FFFFFF;
			height: 120upx;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30upx;

			.payment-left {
				display: flex;
				align-items: center;
				font-size: 30upx;

				text {
					&:nth-child(2) {
						font-weight: bold;
						font-size: 32upx;
					}
				}
			}

			.payment-right {
				background: #07c160;
				color: #FFFFFF;
				padding: 20upx 60upx;
				font-size: 30upx;
				border-radius: 7upx;
			}
		}
	}
</style>
