<template>
	<view class="contening">
		<search></search>
		<preference :preferData="preferData"></preference>
		<my-title></my-title>
		<!-- #ifdef H5 -->
		<delicy @touchmove.native.stop.prevent="moveHandle" @click.native="backTop" :class="{'is-fixed':toFixed}"
			id="boxFixed"></delicy>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<delicy @touchmove.native.stop.prevent="moveHandle" @click.native="backTop" :class="{'is-fixed':toFixed}"
			id="boxFixed"></delicy>
		<!-- #endif -->
		<take-out :takeshop="takeshop"></take-out>
		<loading v-if="loading"></loading>
	</view>
</template>

<script>
	import Search from "./components/search.vue"
	import Preference from "./components/preference.vue"
	import TakeOut from "./components/takeout.vue"
	import MyTitle from "./components/title.vue"
	import Delicy from "./components/delicy.vue"

	import {
		get
	} from "api/index.js"
	import {
		preferUrl,
		nearBusiUrl
	} from "api/request.js"

	// 引入mapstate
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				menuTop: 0,
				menuScrollTop: -1,
				preferData: [],
				takeshop: [],
				loading: true
			}
		},
		components: {
			Search,
			Preference,
			TakeOut,
			MyTitle,
			Delicy
		},
		mounted() {
			this.getAllData()

			this.getMenuTop()
		},

		methods: {
			// 点击筛选头部回到顶部
			backTop() {
				console.log("你好");
				uni.pageScrollTo({
					scrollTop: this.menuTop,
					duration: 300
				});
			},

			getAllData() {
				// 并发请求太香了
				Promise.all([get(preferUrl), get(nearBusiUrl)])
					.then(res => {
						// 为你优选
						this.preferData = res[0][1].data
						// 附近商家
						this.takeshop = res[1][1].data
						this.loading = false
					}).catch(err => {
						console.log(err);
					})
			},

			// 阻止事件穿透
			moveHandle() {
				return
			},
			// 获取组件距离顶部的距离
			getMenuTop() {
				uni
					.createSelectorQuery()
					.in(this)
					.select("#boxFixed")
					.boundingClientRect((data) => {
						this.menuTop = data.top;
					})
					.exec();
			}
		},
		computed: {
			// 当滚动距离大于组件距离顶部距离时置顶
			toFixed() {
				return this.menuScrollTop >= this.menuTop
			},
			// 通过计算属性获取vuex的值
			...mapState(["takeout"]),
			// 根据计算属性的结果修改排序的值
			count() {
				this.takeshop = this.takeout
			}
		},
		onPageScroll(e) {
			this.menuScrollTop = e.scrollTop
		},

		onLoad() {

		}
	}
</script>


<style lang="scss" scoped>
	.contening {
		margin: 0 15upx;

		.is-fixed {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
		}
	}
</style>
