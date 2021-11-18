<template>
	<view class="">
		<!-- 小程序中不能使用v-show -->
		<!-- 商家介绍 -->
		<business :busidata="busidata"></business>
		<!-- tabs切换 -->
		<tabs></tabs>
		<!-- 商品下单 -->
		<ordering :orderingdata="orderingdata" :busidata="busidata" :class="[hiding==0?'activeTab':'disabledTab']">
		</ordering>
		<!-- 评价 -->
		<comment :commentdata="commentdata" :emptyList="emptyList" :leavetap="leavetap"
			:class="[hiding==1?'activeTab':'disabledTab']">
		</comment>
		<!-- 商家详情 -->
		<introduce :busidata="busidata" :class="[hiding==2?'activeTab':'disabledTab']"></introduce>
<loading v-if="loading"></loading>
	</view>
</template>

<script>
	import Business from "./components/business.vue"
	import Tabs from "./components/tabs.vue"
	import Ordering from "./components/ordering.vue"
	import Comment from "./components/comment.vue"
	import Introduce from "./components/introduce.vue"

	import {
		post
	} from "@/api/index.js"
	import {
		commentUrl,
		shopUrl,
		dishesUrl,
		classiCommentUrl
	} from "@/api/request.js"
	export default {
		components: {
			Business,
			Tabs,
			Ordering,
			Comment,
			Introduce
		},
		data() {
			return {
				hiding: 0,
				busidata: {},
				orderingdata: [],
				commentdata: [],
				leavetap: [],
				emptyList: false,
				ids:"",
				loading:true
			}
		},
		created() {
			this.getData()
		},
		methods: {
			fatherMethod(index) {
				this.hiding = index
			},
			classiComment(commentTap) {
				if (commentTap == "全部") {
					let disdata = {
						merchantid: this.ids
					}
					post(classiCommentUrl, disdata).then(res => {
						this.commentdata = res[1].data
					})
				} else {
					let disdata = {
						merchantid: this.ids,
						classmessage: commentTap
					}
					post(classiCommentUrl, disdata).then(res => {
						this.commentdata = res[1].data
					})
				}
			},
			getData() {
				let data = {
					openid: this.ids,

				}
				let disdata = {
					merchantid: this.ids
				}
				Promise.all([post(commentUrl, disdata), post(shopUrl, data), post(dishesUrl, data)]).then(res => {
					console.log(res);
					this.commentdata = res[0][1].data
					this.orderingdata = res[2][1].data
					this.busidata = res[1][1].data[0]
					if (this.commentdata.length == 0) {
						return this.emptyList = true
					}
					let leavetap = this.commentdata.map(item => {
						return item.classmessage
					})
					// 去除重复值和空标签，添加第一项全部标签
					this.leavetap = Array.from(new Set(leavetap)).filter(item => item)
					this.leavetap.unshift("全部")
					this.loading = false
				}).catch(err => {
					console.log(err);
				})
			}
		},
		onLoad(e) {
			this.ids = e.openid
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
	.activeTab {
		display: block;
	}

	.disabledTab {
		display: none;
	}
</style>
