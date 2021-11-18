<template>
	<view class="comment-box">
		<view class="Comment-text">
			<textarea :placeholder="placeholder" confirm-type="send" v-model="Comment" show-confirm-bar="false"
				focus="true" />
		</view>
		<!-- 发表按钮 -->
		<!-- @click 为false 表示点击禁用 -->
		<view class="published" @click="nodisabled && sendComment">
			发表
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage">
		</HMmessages>
	</view>
</template>

<script>
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	import {
		post
	} from "@/api/index.js"
	import {
		pushCommentUrl
	} from "@/api/request.js"
	export default {
		components: {
			HMmessages
		},
		data() {
			return {
				Comment: '',
				placeholder: "",
				openid: "",
				merchantid: "",
				nodisabled: true
			}

		},
		methods: {
			// 发表评论
			sendComment() {
				if (this.Comment == "") {
					this.tips("评论不可为空", "error")
				} else {
					this.nodisabled = false
					let userInfo = uni.getStorageSync("userInfo")
					let data = {
						messages: this.Comment,
						avatarUrl: userInfo.avatarUrl,
						nickName: userInfo.nickName,
						openid: this.openid,
						merchantid: this.merchantid
					}
					post(pushCommentUrl, data).then(res => {
						if (res[1].data.msg == "SUCCESS") {
							this.tips("评论成功")
							setTimeout(() => {
								this.Comment = ""
								uni.navigateBack()
							}, 1000)
						} else {
							this.tips("评论失败", "error")
						}
						this.nodisabled = true
					})
				}
			},
			// 提示
			tips(content, icon = "success") {
				this.HMmessages.show(content, {
					icon,
					fontColor: "#ffffff",
					background: "rgba(102,0,51,0.8)"
				})
			}
		},
		onLoad(e) {
			this.placeholder = `写下您对 ${e.body} 的评价`
			this.openid = e.openid
			this.merchantid = e.merchantid
		}
	}
</script>

<style lang="scss" scoped>
	.comment-box {
		background: #F1F1F1;
		height: 100vh;
	}



	.Comment-text {
		background: #FFFFFF;

		textarea {
			width: 100%;
			color: #808080 !important;
			font-size: 30upx;
			padding: 8upx;
		}
	}

	.published {
		font-size: 35upx;
		background: #ffdd00;
		width: 300upx;
		text-align: center;
		margin: 20upx auto;
		padding: 10upx 0;
		border-radius: 10upx;
	}
</style>
