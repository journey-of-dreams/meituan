<template>
	<view class="prefer-content">
		<view class="prefer-title">
			为你优选
		</view>
		<scroll-view scroll-x class="scroll" scroll-with-animation>
			<view class="prefer-dis">
				<view v-for="(item, index) in preferData" :key="index" class="prefer-view">
					<image :src="item.image" mode="aspectFill"></image>
					<text>{{item.title}}</text>
					<text>{{item.lable}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ["preferData"]
	}
</script>

<style lang="scss" scoped>
	.prefer-content {
		margin: 30upx 0;

		.prefer-title {
			font-size: 35upx;
			height: 50upx;
			line-height: 50upx;
			margin-bottom: 20upx;
		}

		.scroll {
			white-space: nowrap;
			width: 100%;
			height: 300upx;

			.prefer-dis {
				display: flex;
				justify-content: space-between;

				.prefer-view {
					height: 300upx;
					width: 300upx;
					padding: 0 8upx;

					image {
						width: 300upx;
						height: 200upx;
						border-radius: 8upx;
					}

					text {
						height: 45upx;
						line-height: 45upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;

						&:nth-child(2) {
							font-size: 30upx;
						}

						&:nth-child(3) {
							font-size: 27upx;
							color: #9c9c9c;
						}
					}
				}
			}

		}
	}
</style>
