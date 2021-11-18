<template>
	<view>
		<view class="ordering-fls">
			<!-- 左边 -->
			<view class="ordering-left">
				<block v-for="(item,index) in optidata" :key="index">
					<text :class="{activeord:index == numing}" @click="ordermeClic(index,item)">{{item}}</text>
				</block>
			</view>
			<scroll-view scroll-y class="scroll_container">
				<!-- 右边 -->
				<view class="ordering-right">
					<text class="ordering-right-title">{{ordertitle}}</text>
					<view>
						<block v-for="(item,index) in classishop" :key="index">
							<view class="content-view">
								<view class="content-img">
									<image :src="item.objdis.image" mode="aspectFill">
									</image>
								</view>
								<view class="content-title">
									<text class="conteng-take">{{item.objdis.input}}</text>
									<view class="conteng-monthly">
										<block v-for="(itemdata,index2) in item.objdis.tags" :key="index2">
											<text>{{itemdata}}</text>
										</block>
									</view>
									<view class="conteng-starting">
										<text>月售10</text>
									</view>
									<view class="conteng-price">
										<view class="conteng-shi">
											¥{{singlePrice(item.objdis.Price,item.objdis.Discount)}}
										</view>
										<view class="conteng-hua">¥{{item.objdis.Price}}</view>
										<view class="ordering-price">
											<image @click="decreaseAmount(item,index)"
												src="../../../static/coen/jianhao.png" mode="widthFix"></image>
											<text class="amounting">{{item.amount}}</text>
											<image @click="increaseAmount(item,index)"
												src="../../../static/coen/jiahao.png" mode="widthFix"></image>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="Shopping">
			<!-- 骑手 -->
			<view class="qishou">
				<image v-if="totalPrice == 0" src="../../../static/coen/weigou.png" mode="widthFix"></image>
				<image v-else src="../../../static/coen/yigou.png" mode="widthFix"></image>
			</view>
			<!-- 多少量 -->
			<view v-if="totalPrice!=0" class="Numbering">{{temShopArr.length}}</view>
			<!-- 金额 -->
			<view class="Shopping-dis">
				<view class="Shopping-left">
					<view class="Cost-mony">
						<text class="Total-price">¥{{totalPrice}}</text>
						<text class="Delivery">另需配送费{{busidata.physical}}元</text>
					</view>
				</view>
				<view class="Shopping-right" :class="{ shoppactive: isDelive }">
					<text v-if="totalPrice == 0">{{busidata.delivering}}元起送</text>
					<text v-if="!isDelive && totalPrice!=0">还差￥{{busidata.delivering*10-totalPrice}}</text>
					<text v-if="isDelive" @click="goPay">去结算</text>
				</view>
			</view>
		</view>
		<modal ref="modal"></modal>
	</view>
</template>

<script>
	import Modal from "@/components/modal.vue"
	export default {
		props: {
			orderingdata: Array,
			busidata: Object

		},
		components: {
			Modal
		},
		data() {
			return {
				// 左边分类
				optidata: [],
				numing: 0,
				// 右边商品第一项
				ordertitle: "",
				classishop: [],
				// 右边分类下的商品
				totalShop: [],
				// 选中的商品列表
				temShopArr: [],
				totalPrice: 0
			}
		},

		methods: {
			// 点击左侧菜单触发
			ordermeClic(index, name) {
				this.numing = index
				this.ordertitle = name
				this.classishop = this.totalShop.filter(item => item.optidata == name)
			},
			// 点击减号按钮触发
			decreaseAmount(item, index) {
				if (item.amount > 0) {
					item.amount--
					let indexs = this.temShopArr.findIndex(cur => cur._id == item._id)
					this.temShopArr[indexs].amount--
					if (this.temShopArr[indexs].amount == 0) {
						this.temShopArr.splice(indexs, 1)
					}
					this.camTotalPrice(this.temShopArr)
					this.$set(this.classishop, index, item);
				}
			},
			// 点击加号按钮触发
			increaseAmount(item, index) {
				item.amount++
				// 根据官方提示，解决非响应式的问题！
				// 两种情景无法触发响应式：例如直接修改数组中某一项的值，直接改变数组的长度；对于对象添加属性时，可采用Object.assign({}, this.someObject, { a: 1, b: 2 })触发响应式
				let shop = {
					price: item.objdis.Price,
					discount: item.objdis.Discount,
					amount: item.amount,
					image: item.objdis.image,
					input: item.objdis.input,
					_id: item._id
				}
				// 方式一：
				let indexs = this.temShopArr.findIndex(cur => cur._id == item._id)
				if (indexs != -1) {
					this.temShopArr.splice(indexs, 1)
				}
				this.temShopArr.unshift(shop)

				// // 方式二：如果添加的是同一项，将先添加的项替换为后添加的项目
				// let arr = this.temShopArr.map(cur => {
				// 	return cur._id == item._id ? shop : cur
				// })
				// // 数组去重，即去除了先添加的项
				// this.temShopArr = Array.from(new Set(arr))


				this.camTotalPrice(this.temShopArr)
				this.$set(this.classishop, index, item);
			},
			// 去结算
			goPay() {
				let userInfo = uni.getStorageSync("userInfo")
				if (!userInfo) {
					this.$refs.modal.showModal()
				} else {
					// 支付：总金额+配送陪+用户openID+商家标识id+商家名称+商家logo
					let orderIn = {
						totalPrice: this.totalPrice,
						physical: this.busidata.physical,
						temShopArr: this.temShopArr,
						logo: this.busidata.logo,
						merchaintid: this.busidata.openid,
						ide: this.busidata.openid.slice(0, 7),
						commod: this.busidata.shop,
						useropenid: userInfo.openid

					}
					wx.navigateTo({
						// 路由传参只能带字符串
						url: "../confirmOrder/confirmOrder?orderIn=" + JSON.stringify(orderIn)
					})
				}
			},
			// 总价计算
			camTotalPrice(temShopArr) {
				console.log(temShopArr);
				this.totalPrice = temShopArr.reduce((pre, cur) => {

					return cur.discount > 1 ? (pre + cur.price * cur.amount) : (pre + cur.price * cur.amount * (1 -
						cur.discount))
				}, 0)

			},
		},
		computed: {
			// 单价计算
			singlePrice() {
				return function(price, discount) {
					return discount > 1 ? price : price * (1 - discount)
				}
			},
			// 是否满足配送条件计算
			isDelive() {
				return Number(this.totalPrice) > (Number(this.busidata.delivering) * 10)
			}
		},
		watch: {
			orderingdata(newValue, oldValue) {
				console.log(">>>>>>>>>>");
				this.totalShop = newValue
				let optidataArr = newValue.map(item => {
					return item.optidata
				})
				this.optidata = Array.from(new Set(optidataArr))
				console.log(newValue[0].optidata);

				// 默认右边分类为第一个分类项
				this.ordertitle = newValue[0].optidata
				// 往商品添加一个字段
				newValue.map(item => {
					return item.amount = 0
				})
				// 获取对应分类下的商品
				this.classishop = newValue.filter(item => item.optidata == this.ordertitle)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scroll_container {
		height: calc(100vh - 240upx);
	}

	.ordering-fls {
		display: flex;
		justify-content: space-between;

		.ordering-left {
			width: 190upx;
			background: #fafafa;
			overflow-y: auto;
			height: 100%;

			text {
				color: #a8a8a8;
				display: block;
				font-size: 28upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
			}
		}

		/* 右边 */
		.ordering-right {
			width: 100%;
			padding: 9upx 9upx 130upx 9upx;
			overflow: hidden;
			overflow-y: auto;

			.ordering-right-title {
				font-size: 28upx;
				height: 60upx;
				line-height: 60upx;
			}

			.content-view {
				display: flex;
				justify-content: space-between;
				height: 200upx !important;
				overflow: hidden;
				margin: 30upx 0;
				color: #898989;

				.content-img {
					width: 180rpx !important;
					height: 200rpx !important;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10upx;
						overflow: hidden;
					}
				}

				.content-title {
					/* width: 100%; */
					padding-left: 10upx;
					font-size: 24upx;

					.conteng-take {
						color: #333333;
						height: 50upx;
						font-size: 33upx;
						font-weight: bold;
						line-height: 50upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.conteng-monthly {
						display: flex;

						text {
							background: #f1f1f1;
							margin-right: 9upx;
							padding: 4upx 13upx;
							border-radius: 7upx;
							display: block;
						}
					}

					.conteng-starting {
						display: flex;
						align-items: center;
						height: 50upx;
						line-height: 50upx;
					}

					.conteng-price {
						display: flex;
						align-items: center;

						image {
							width: 60upx;
							height: 60upx;
						}

						.ordering-price {
							display: flex;
							align-items: center;
							justify-content: space-around;
							width: 100%;

							/* 数量 */
							.amounting {
								text-align: center;
							}

						}

						.conteng-hua {
							text-decoration: line-through;
						}

						.conteng-shi {
							color: #fb4e44;
							font-size: 33upx;
							width: 180upx;
							overflow: hidden;
						}

					}

				}
			}
		}

	}

	/* 购物车 */
	.Shopping {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;

		.qishou {
			width: 120upx;
			height: 150upx;
			position: fixed;
			bottom: 0upx;
			left: 50upx;

			image {
				width: 120upx;
				height: 150upx !important;
			}
		}

		/* 数量 */
		.Numbering {
			background: red;
			width: 40upx;
			height: 40upx;
			border-radius: 50%;
			font-size: 20upx;
			color: #FFFFFF;
			text-align: center;
			line-height: 40upx;
			position: fixed;
			bottom: 50upx;
			left: 130upx;
		}

		.Shopping-dis {
			display: flex;
			height: 130upx;
			margin: 0 20upx;

			.Shopping-left {
				height: 130upx;
				background: #000000;
				flex-grow: 2;
				border-top-left-radius: 50upx;
				border-bottom-left-radius: 50upx;

				text {
					display: block;
				}

				.Cost-mony {
					padding-left: 170upx;
					color: #4CD964;
					height: 130upx;

					/* 定位 */
					.Delivery {
						color: #999999;
						font-size: 28upx;
						height: 65upx;
					}

					.Total-price {
						font-size: 40upx;
						color: #FFFFFF;
						height: 65upx;
						line-height: 65upx;
					}

				}
			}

			.Shopping-right {
				height: 130upx;
				line-height: 130upx;
				font-size: 30upx;
				color: #7f7f7f;
				text-align: center;
				background: #000000;
				flex-grow: 1;
				border-top-right-radius: 50upx;
				border-bottom-right-radius: 50upx;
			}
		}

	}

	/* 选中菜品 */
	.shoppactive {
		background: #ffd300 !important;
		color: #000000 !important;
	}

	.activeord {
		background: #FFFFFF !important;
		font-weight: bold !important;
	}
</style>
