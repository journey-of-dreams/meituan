<template>
	<view class="loading" :catchtouchmove="true">
		<view>
			<image src="../static/loadingmeituan.png"></image>
			<text>努力加载中...</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loading {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: #FFFFFF;
		z-index: 9999;

		view {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
		}

		image {
			width: 50px;
			height: 60px;
			display: block;
		}

		text {
			font-size: 25upx;
		}
	}
</style>
