<template>
	<view class="order-box">
		<view v-if="!noOrdering&&isLogin" class="order-back">
			<view class="orderInfo" v-for="(item,index) in orderInfo" :key="index">
				<view class="order-view">
					<view class="order-img">
						<image :src="item.logo" mode="aspectFill"></image>
					</view>
					<view class="goods-commodity">{{item.body}}</view>
					<view class="order-succ" v-if="item.status == 1">
						付款成功
					</view>
					<view class="order-succ" v-else>
						待付款
					</view>
				</view>
				<!-- 2 -->
				<view>
					<block v-for="(itemdata,index) in item.Paymentinfor" :key="index">
						<view class="order-dishes">
							<text>{{itemdata.input}}</text>
							<text>x{{itemdata.amount}}</text>
						</view>
					</block>
				</view>

				<view class="order-Total">
					<view class="order-left" v-if="item.status==1" @click="goComment(item)">
						<text>去评价</text>
					</view>
					<view class="order-right">
						<text>共{{item.Paymentinfor.length}}件商品</text>
						<text>合计：{{item.total_fee}}元</text>
					</view>
				</view>
			</view>
		</view>
		<empty v-else>
			<view v-if="!isLogin" class="wx-button">
				<text>登录可查看</text>
				<button plain="true" @click="getUserProfile">去登录</button>
			</view>
			<text v-else>你还没有订单</text>
		</empty>

	</view>
</template>

<script>
	import Empty from "@/components/empty.vue"
	import {
		wxlogin
	} from "@/utils/login.js"
	import {
		post
	} from "@/api/index.js"
	import {
		orderUrl
	} from "@/api/request.js"
	export default {
		components: {
			Empty
		},
		data() {
			return {
				openid: "",
				noOrdering: true,
				isLogin: false,
				orderInfo: []
			}
		},
		methods: {
			// 跳转评论页面
			goComment(item) {
				console.log(item);
				uni.navigateTo({
					url: `../comment/comment?merchantid=${item.merchantid}&body=${item.body}&openid=${this.openid}`
				})
			},
			// 获取登录信息
			getUserProfile(e) {
				wxlogin()
			},
			// 订单数据
			ordering() {
				let data = {
					type: "myorder",
					openid: this.openid
				}
				post(orderUrl, data).then(res => {
					if (res[1].data.datas.length !== 0) {
						this.noOrdering = false
						// 数据筛选
						let newOrder = res[1].data.datas.map(item => {
							let merchantid = item._merchantid
							let openid = item._openid
							let status = item.status
							let body = item.wxorder.body
							let logo = item.wxorder.logo
							let total_fee = item.wxorder.total_fee
							let Paymentinfor = item.wxorder.Paymentinfor.arrinfo
							return {
								merchantid,
								openid,
								status,
								body,
								logo,
								total_fee,
								Paymentinfor
							}
						})
						this.orderInfo = newOrder
						console.log(newOrder);
					} else {
						this.noOrdering = true
					}
				})
			},
		},



		onShow() {
			let userInfo = uni.getStorageSync("userInfo")
			this.isLogin = userInfo ? true : false
			if (userInfo) {
				this.openid = userInfo.openid
				this.ordering()
			}
		}

	}
</script>

<style lang="scss" scoped>
	.order-box {
		background: #f2f3f4;
	}

	.order-back {
		.orderInfo {
			margin: 10upx 0;
			background: #FFFFFF;
			padding: 20upx 10upx;
			border-radius: 9upx;
		}

		.order-view {
			height: 106upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			overflow: hidden;

			.order-img {
				width: 100upx;
				height: 100upx;
				padding-right: 20upx;

				image {
					width: 100upx;
					height: 100upx;
					border-radius: 10upx;
				}
			}

			.goods-commodity {
				flex-grow: 1;
				font-size: 30upx;
				font-weight: bold;
			}

			.order-succ {
				font-size: 28upx;
				color: #666666;
			}

		}

		.order-dishes {
			font-size: 28upx;
			color: #666666;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80upx;
		}

		.order-Total {
			font-size: 28upx;
			color: #666666;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80upx;

			text {
				display: block;
			}

			.order-right {
				display: flex;
				align-items: center;

				text {
					&:nth-child(1) {
						padding-right: 10upx;
					}
				}
			}

			.order-left {
				text {
					background: #f2f3f4;
					border-radius: 10upx;
					padding: 5upx 10upx;
				}
			}
		}

	}

	.wx-button {

		button {
			margin-top: 20upx;
			border: none;
			font-size: 30upx;
			background: linear-gradient(to right, #28a6f1 10%, #0e8dd7 80%);
			border-radius: 50upx;
			color: #FFFFFF;
		}
	}
</style>
