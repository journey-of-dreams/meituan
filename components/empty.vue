<template>
	<view class="empty">
		<image src="../static/coen/meoyopu.png" mode="widthFix"></image>
		<slot></slot>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.empty {
		width: 400upx;
		height: 400upx;
		margin: 90upx auto 0 auto;
		text-align: center;
		font-size: 28upx;

		image {
			display: block;
			width: 250upx;
			height: 250upx;
			margin: 0 auto;
			padding-bottom: 30upx;
		}
	}
</style>
