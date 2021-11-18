<template>
	<view>
		<!-- 定位部分 -->
		<view class="search-view">
			<image src="../../../static/coen/dizhi.png" mode="widthFix">
			</image>
			<text class="search-text">阿里巴巴淘宝城2期西溪园区</text>
			<text></text>
		</view>
		<!-- 搜索 -->
		<view class="search-cont">
			<view class="search" @click="search">
				<image src="../../../static/coen/sousuo.svg" mode="widthFix"></image>
				<input type="text" disabled placeholder="麻辣烫" />
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper-view" @change="bannerIndex">
			<swiper-item class="swiper-item" v-for="(item,index) in label" :key="index">
				<view class="content-img" v-for="(listData,index2) in item" :key="index2">
					<image :src="listData.img" mode="widthFix"></image>
					<text>{{listData.title}}</text>
				</view>
			</swiper-item>

		</swiper>
		<!-- 指示点 -->
		<view class="instruct-view">
			<view v-for="index in label.length" :key="index">
				<view class="instruct" :class="{active:index==curIndex}">
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curIndex: 0,
				label: [
					[{
							'img': require('../../../static/inster/meishi.png'),
							'title': '美食'
						},
						{
							'img': require('../../../static/inster/chaoshi.png'),
							'title': '超市便利'
						},
						{
							'img': require('../../../static/inster/shuiguo.png'),
							'title': '蔬菜水果'
						},
						{
							'img': require('../../../static/inster/meituan.png'),
							'title': '美团专送'
						},
						{
							'img': require('../../../static/inster/paotui.png'),
							'title': '跑腿代购'
						},
						{
							'img': require('../../../static/inster/yexiao.png'),
							'title': '夜宵'
						},
						{
							'img': require('../../../static/inster/jintie.png'),
							'title': '津贴联盟'
						},
						{
							'img': require('../../../static/inster/pinping.png'),
							'title': '甜点饮品'
						},
						{
							'img': require('../../../static/inster/shaokao.png'),
							'title': '龙虾烧烤'
						},
						{
							'img': require('../../../static/inster/dangao.png'),
							'title': '甜蜜蛋糕'
						}
					],
					[{
							'img': require('../../../static/inster/hanbao.png'),
							'title': '汉堡披萨'
						},
						{
							'img': require('../../../static/inster/liaoli.png'),
							'title': '日韩料理'
						},
						{
							'img': require('../../../static/inster/malatang.png'),
							'title': '麻辣烫'
						},
						{
							'img': require('../../../static/inster/kuaican.png'),
							'title': '快食简餐'
						},
						{
							'img': require('../../../static/inster/xianhua.png'),
							'title': '浪漫鲜花'
						},
						{
							'img': require('../../../static/inster/lazi.png'),
							'title': '无辣不欢'
						},
						{
							'img': require('../../../static/inster/jiaozi.png'),
							'title': '饺子馆'
						},
						{
							'img': require('../../../static/inster/xiaochi.png'),
							'title': '小吃馆'
						},
						{
							'img': require('../../../static/inster/baofan.png'),
							'title': '煲仔饭'
						},
						{
							'img': require('../../../static/inster/qita.png'),
							'title': '其他'
						}
					]
				]
			}
		},
		methods: {
			// 轮播图改变触发，用于指示点活跃显示
			bannerIndex(e) {
				this.curIndex = e.detail.current
			},
			// 点击搜索框触发，跳转搜索页面
			search(){
				console.log("搜索");
				uni.navigateTo({
					url:"../search/search"
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.search-view {
		font-size: 30upx;
		font-weight: bold;
		display: flex;
		align-items: center;

		image {
			width: 35upx;
			height: 35upx;
		}

		.search-text {
			padding: 0 10upx;

		}
	}

	.search-cont {
		margin-top: 20upx;

		.search {
			height: 70upx;
			width: 100%;
			display: flex;
			align-items: center;
			background: #eff3f4;
			border-radius: 10upx;

			input {
				height: 70upx;
				line-height: 70upx;
				font-size: 25upx;
				color: #666666;
			}

			image {
				width: 40upx;
				height: 40upx;
			}
		}
	}

	.swiper-view {
		height: 320upx !important;

		.swiper-item {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			height: 320upx;

			.content-img {
				width: 20%;
				text-align: center;
				padding-top: 20upx;
				font-size: 25upx;

				image {
					width: 70upx;
					height: 70upx;
					border-radius: 50upx;
					display: block;
					margin: 0 auto;
				}
			}
		}
	}

	.instruct-view {
		display: flex;
		justify-content: center;
		padding-top: 10upx;

		.instruct {
			background: #e6e6e6;
			height: 10upx;
			width: 30upx;
			border-radius: 50upx;
			margin: 0 10upx;
		}
	}


	.active {
		background: #fbae22 !important;
	}
</style>
