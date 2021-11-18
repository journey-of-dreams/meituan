<template>
	<view v-if="takeshop.length>0">
		<view v-for="(item,index) in takeshop" :key="index" class="content-view" @click="goDetail(item.openid)">
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
					<image src="../../../static/coen/liwu.svg" mode="widthFix"></image>
					<text>{{item.types}}</text>
				</view>
			</view>
		</view>
	</view>
	<view class="emptyBox" v-else>
		找不到数据
	</view>
</template>

<script>
	export default {
		props: {
			takeshop: Array
		},
		data() {
			return {}
		},
		methods: {
			goDetail(openid) {
				wx.navigateTo({
					url: "../takeout/takeout?openid=" + openid
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.emptyBox {
		margin-top: 90upx;
		text-align: center;
		color: #898989;
	}
</style>
