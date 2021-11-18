<template>
	<view>
		<view class="delicy-pos">
			<!-- 筛选头部 -->
			<view class="delica-view">
				<view class="delica-list delica-grow" @click="multiple()">
					<text>{{synthesize}}</text>
					<image src="../../../static/coen/paixu.png" mode="widthFix"></image>
				</view>
				<view class="delica-grow" @click="sales()">销量高</view>
				<view class="delica-grow" @click="sales()">速度快</view>
				<view class="delica-grow" @click="sales()">津贴联盟</view>
				<view class="delica-list delica-right" @click="filterData">
					<text>筛选</text>
					<image src="../../../static/coen/shaixuan.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 综合排序筛选区内容 -->
			<view class="sortlist" v-if="drop">
				<view v-for="(item,index) in sortlist" :key="index"
					:class="['composite-item',item.name == synthesize?'activeb':'']"
					@click="sortClick(item.name,item.screen,item.nums)">
					<text>{{item.name}}</text>
				</view>
			</view>
			<!-- 筛选区内容 -->
			<view class="sortlist" v-if="saDrop">
				<!-- 多选：商家特色 -->
				<view class="special-avery">
					<view v-for="(item,index) in screendata" :key="index">
						<view class="sortlist-title">{{item.title}}</view>
						<view class="sortlist-flex">
							<view class="sortlist-flex-item" v-for="(itemdata,indexs) in item.datas" :key="indexs">
								<text :class="{special:itemdata.isActive}"
									@click="specialActive(itemdata)">{{itemdata.name}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 单选：人均价 -->
				<view class="special-avery" v-for="(item,index) in person" :key="index">
					<view class="sortlist-title">{{item.title}}</view>
					<view class="sortlist-flex">
						<view class="sortlist-flex-item" v-for="(itemdata,indexs) in item.datas" :key="indexs">
							<text :class="{special:indexs==averyIndex}"
								@click="averyActive(indexs)">{{itemdata.name}}</text>
						</view>
					</view>
				</view>
				<!-- 底部按钮 -->
				<view class="sortlist-bottom">
					<text @click="emptySelected">清空</text>
					<text @click="filterSearch">完成</text>
				</view>
			</view>
		</view>
		<view class="shadow-view" v-if="yin" @click="backShadow">
		</view>
	</view>

</template>

<script>
	import {
		post
	} from "api/index.js"
	import {
		synSortUrl,
		multipleUrl
	} from "api/request.js"
	export default {
		data() {
			return {
				filterObj: {
					duration: "duration",
					capita: {
						"$lt": 20
					}
				},
				synthesize: "综合排序",
				averyIndex: 0,
				sortlist: [{
						"name": "综合排序",
						"screen": "_id",
						"nums": 1
					},
					{
						"name": "起送价最低",
						"screen": "delivering",
						"nums": 1
					},
					{
						"name": "配送费最低",
						"screen": "physical",
						"nums": 1
					},
					{
						"name": "人均高到低",
						"screen": "capita",
						"nums": -1
					},
					{
						"name": "人均低到高",
						"screen": "capita",
						"nums": 1
					}
				],
				screendata: [{
					"title": "商家特色(可多选)",
					"datas": [{
							"isActive": true,
							"sign": 'duration',
							"name": '配送最快'
						},
						{
							"isActive": false,
							"sign": 'deliver',
							"name": '0元起送'
						},
						{
							"isActive": false,
							"sign": 'physi',
							"name": '免配送费'
						}
					],
				}],
				// 人均价筛选
				person: [{
					"title": "人均价",
					"datas": [{
							"name": "20元以下",
							"per": {
								"$lt": 20
							},
						},
						{
							"name": "20-40元",
							"per": {
								"$lte": 40,
								"$gte": 20
							},
						},
						{
							"name": "40元以上",
							"per": {
								"$gt": 40
							},
						},
					]
				}],
				drop: false,
				saDrop: false,
				yin: false
			}
		},
		methods: {
			// 点击综合排序
			multiple() {
				this.drop = true

				this.saDrop = false
				this.backOne()
			},
			// 点击综合排序子项
			async sortClick(name, screen, nums) {
				let synList = await post(synSortUrl, {
					screen,
					nums
				})
				this.$store.commit("takeoutMuta", synList[1].data)
				this.synthesize = name
				this.backShadow()
			},
			// 点击筛选触发
			filterData() {
				this.saDrop = true
				this.backOne()
				this.drop = false
			},
			// 遮罩层
			backOne() {
				setTimeout(() => {
					this.yin = true
				}, 300)
			},
			// 点击阴影区域触发
			backShadow() {
				this.yin = false
				this.drop = false
				this.saDrop = false
			},
			// 点击销量高/速度快/津贴联盟/触发
			sales() {
				if (this.yin) {
					this.backShadow()
				}
				console.log("排序");
			},
			// 筛选内容：商家多选按钮点击触发
			specialActive(item) {
				item.isActive = !item.isActive
				if (item.isActive) {
					// this.$set：用于向对象添加键值对，如果已存在，则不添加
					this.$set(this.filterObj, item.sign, item.sign)
				} else {
					// this.$delete：删除对象的键值对
					this.$delete(this.filterObj, item.sign)
				}
				console.log(this.filterObj);
			},
			// 筛选内容：人均价按钮点击触发
			averyActive(index) {
				if (index == this.averyIndex) {
					this.$delete(this.filterObj, "capita")
					return this.averyIndex = -1
				}
				this.averyIndex = index
				this.$set(this.filterObj, "capita", this.person[0].datas[index].per)
				console.log(this.filterObj);
			},
			// 筛选内容：点击清空按钮触发
			emptySelected() {
				this.averyIndex = -1
				// 以后能用foreach的地方全部用map
				this.screendata[0].datas.map(item => item.isActive = false)
				this.backShadow()
			},
			// 筛选内容：点击确定按钮触发
			async filterSearch() {
				let filterList = await post(multipleUrl, this.filterObj)
				console.log(this.filterObj);
				if (JSON.stringify(this.filterObj) !== "{}") {
					this.$store.commit("takeoutMuta", filterList[1].data)
					this.backShadow()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.delicy-pos {
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 99;
		background: #FFFFFF;
		padding: 10upx 0;

		.delica-view {
			display: flex;
			justify-content: flex-end;
			color: #666;
			width: 100%;
			font-size: 30upx;

			image {
				width: 30upx;
				height: 30upx;
			}


			.delica-grow {
				padding: 0 10upx;

			}

			.delica-list {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}

			.delica-right {
				flex: 1;
			}
		}

		.sortlist {

			padding: 0 15upx;
			height: 700upx;

			.composite-item {
				font-size: 30upx;
				height: 70upx;
				line-height: 70upx;
				border-top: 1upx solid #ededed;

			}

			.special-avery {
				width: 100%;

				.sortlist-title {
					padding: 30upx 0;
				}

				.sortlist-flex {
					display: flex;
					justify-content: space-between;
					width: 100%;

					overflow-y: scroll;

					.sortlist-flex-item {
						width: 28%;
						background: #f8f8f8;
						text-align: center;
						font-size: 28upx;
						height: 60upx;
						line-height: 60upx;
						color: #666;
						border-radius: 5upx;
					}
				}
			}

			.sortlist-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 80upx;
				border-top: 1upx solid #e4e4e4;
				position: absolute;
				bottom: 0;
				width: 100%;

				text {
					width: 50%;
					text-align: center;
					height: 80upx;
					line-height: 80upx;

					&:nth-child(2) {
						background: #ffd348;
						border-left: #e4e4e4;
					}
				}
			}
		}

	}

	.shadow-view {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		height: 100vh;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.activeb {
		color: #f89903 !important;
	}

	.special {
		background-color: #fef6df;
		color: #f29909;
	}
</style>
