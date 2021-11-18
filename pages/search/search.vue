<template>
	<view class="search-container">
		<view class="search-cont">
			<view class="search">
				<input type="text" confirm-type="search" focus="true" placeholder="请输入关键字" v-model="searchdata"
					@confirm="seArch" />
			</view>
			<view class="search-code" @click="seArch()">
				搜索
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>搜索历史</view>
				<view @click="removeStorage()">
					<image src="@/static/coen/searchend.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view :class="{ activetext: index == num }" @click="menubtn(item)">{{item}}</view>
				</block>
			</view>
		</view>
		<view v-if="shopcont" class="content-left">
			<block v-for="(item,index) in takeshop" :key="index">
				<view class="content-view" @click="takEout(item.openid)">
					<view class="content-img">
						<image :src="item.logo" mode="aspectFill"></image>
					</view>
					<view class="content-title">
						<text class="conteng-take">{{item.shop}}</text>
						<view class="conteng-monthly">
							<text>月售200</text>
							<text>约{{item.duration}}分钟</text>
						</view>
						<view class="conteng-starting">
							<text>起送¥{{item.delivering}}</text>
							<text>配送¥{{item.physical}}</text>
							<text>人均¥{{item.capita}}</text>
						</view>
						<view class="conteng-starting">
							<image src="../../static/coen/liwu.svg" mode="widthFix"></image>
							<text>{{item.types}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		<empty v-if="isShowEmpty">{{emptyTips}}</empty>
	</view>
</template>

<script>
	import {
		post
	} from "../../api/index.js"
	import {
		searchUrl
	} from "../../api/request.js"

	import Empty from "@/components/empty.vue"
	export default {
		components: {
			Empty
		},
		data() {
			return {
				searchdata: "",
				isShowEmpty: false,
				emptyTips: "",
				takeshop: [],
				setdata: [],
				// 根据经验，所有搜索数据都放在本地
				ifhistory: true,
				shopcont: false
			}
		},
		mounted() {
			this.setdata = uni.getStorageSync("search_key")
			this.ifhistory = this.setdata != ""
		},
		methods: {
			// 输入框点击完成按钮时触发
			async seArch() {
				const searchList = await post(searchUrl, {
					searchdata: this.searchdata
				})
				if (searchList[1].data == "没有商品数据") {
					this.isShowEmpty = true
					return this.emptyTips = searchList[1].data
				}
				this.shopcont = true
				this.isShowEmpty = false
				this.takeshop = searchList[1].data
				this.setStorage()
			},
			// 点击历史记录清除按钮触发
			removeStorage() {
				uni.clearStorageSync()
				this.setdata = []
			},
			// 点击历史记录触发
			menubtn(keyword){
				this.searchdata = keyword
				this.seArch()
			},
			// 设置storage
			setStorage() {
				let searchKeyArr = uni.getStorageSync("search_key") || []
				searchKeyArr.unshift(this.searchdata)
				let newSearchKeyArr = Array.from(new Set(searchKeyArr))
				this.setdata = newSearchKeyArr
				uni.setStorageSync("search_key", newSearchKeyArr)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-container {
		padding: 0 20upx;

		.search-cont {
			display: flex;
			justify-content: space-between;
			height: 70upx;
			align-items: center;
			padding: 30upx 0;

			.search {
				height: 70upx;
				line-height: 70upx;
				width: 100%;
				display: flex;
				flex-direction: row;
				background: #f8f8f8;
				border-radius: 20upx;

				input {
					height: 70upx;
					line-height: 70upx;
					width: 100%;
					font-size: 30upx;
					color: #666666;
					padding-left: 30upx;
				}
			}

			.search-code {
				width: 130upx;
				height: 50upx;
				text-align: center;
				font-size: 30upx;
			}

		}

		/* 搜索历史 */
		.search-history {
			.search-title {
				font-size: 30upx;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 60upx;
				line-height: 60upx;

				image {
					width: 36upx;
					height: 36upx;
					display: block;
				}
			}

			.menu-block {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				flex-wrap: wrap;

				view {

					background: #f7f8fa;
					border-radius: 6upx;
					font-size: 27upx;
					color: #292c33;
					text-align: center;
					padding: 10upx;
					margin: 20upx 20upx 0 0;
				}
			}

		}

		.content-view {
			display: flex;
			justify-content: space-between;
			height: 200upx !important;
			overflow: hidden;
			border-bottom: 1rpx solid #E4E8EB;
			padding-bottom: 5upx;
			margin: 30upx 0;
			color: #898989;

			&:first-child {
				margin-top: 90upx;
			}

			text {
				display: block;
			}

			.content-img {
				width: 350upx !important;
				height: 200upx !important;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
				}
			}

			.content-title {
				width: 100%;
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
					justify-content: space-between;
					height: 50upx;
					line-height: 50upx;
				}

				.conteng-starting {
					display: flex;
					align-items: center;
					height: 50upx;
					line-height: 50upx;

					text {
						width: 130upx;
					}

					image {
						width: 24upx;
						height: 24upx;
						padding-right: 10upx;
					}
				}
			}
		}
	}
</style>
