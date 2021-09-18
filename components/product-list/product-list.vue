<template>
	<view>
		<!-- <navigator v-for="(item,index) in itemList" :key="index" :url="`/pages/product/detail?loadId=${item.product_id}`"
		 hover-class="none" class="card">
			<view class="bold default-window">
				<view>{{item.name}}</view>
				<u-gap height="10"></u-gap>
				<view class="flex flexwarp">
					<view v-for="(label,tip) in item.labelList" :key="tip" class="tag-item">
						<u-tag :text="label" mode="dark" shape="circle" type="success" size="mini"></u-tag>
					</view>
				</view>
			</view>
			<view class=" image-window">
				
				<u-row gutter="20">
					<u-col  @click="checkProduct(item.product_id)" span="4" v-for="(image,tip) in item.img_info.slice(0,3)" :key="tip">
						<u-image width="100%" :src="image.url" mode="widthFix"></u-image>
					</u-col>
				</u-row>
			</view>
			<view class="default-window">
				<view class="u-font-11 u-tips-color">{{item.subtitle||''}}</view>
				<u-gap height="16"></u-gap>
				<view class="flex place">
					<view class="font-red  flex">
						<view v-if="item.product_type==1" class="u-font-12">￥</view>
						<view class="u-font-17 bold">{{item.discount_price}}</view>
						<view v-if="item.product_type==2" class="u-font-12">鱼仔</view>
						<view style="padding-left: 20rpx;text-decoration: line-through;" class="u-tips-color u-font-sm">￥{{item.original_price}}</view>
					</view>
					<view class="u-font-11">
						已售{{item.sv_total_num}} / 剩余{{item.stock}}
					</view>
				</view>
			</view>
		</navigator> -->
		<u-waterfall ref="uWaterfall" v-model="itemList">
			<template v-slot:left="{leftList}">
				<navigator hover-class="none" :url="`/pages/product/detail?loadId=${item.product_id}`" class="waterfall"
					v-for="(item, index) in leftList" :key="index">
					<image class="waterfall-image" :src="item.img_info[0].url" mode="widthFix"></image>

					<view class="u-padding-10 u-font-sm  title">
						{{item.name}}
					</view>
					<view class="u-padding-10 flex">
						<view>
							<view class="u-tips-color font-red">
								{{item.product_type==1?`￥${item.discount_price}`:`${item.discount_price}鱼仔`}}
							</view>
						</view>
						<view class="u-padding-left-20">
							<view class="u-tips-color font-red" style="color: grey;text-decoration: line-through;">
								￥{{item.original_price}}
							</view>
						</view>
					</view>

				</navigator>
			</template>
			<template v-slot:right="{rightList}">
				<navigator hover-class="none" :url="`/pages/product/detail?loadId=${item.product_id}`" class="waterfall"
					v-for="(item, index) in rightList" :key="index">
					<image class="waterfall-image" :src="item.img_info[0].url" mode="widthFix"></image>

					<view class="u-padding-10 u-font-sm  title">
						{{item.name}}
					</view>
					<view class="u-padding-10 flex">
						<view>
							<view class="u-tips-color font-red">
								{{item.product_type==1?`￥${item.discount_price}`:`${item.discount_price}鱼仔`}}
							</view>
						</view>
						<view class="u-padding-left-10">
							<view class="u-tips-color font-red" style="color: grey;text-decoration: line-through;">
								￥{{item.original_price}}
							</view>
						</view>
					</view>
				</navigator>
			</template>
		</u-waterfall>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			productList: {
				type: Array
			}
		},
		methods: {
			checkProduct(id) {
				uni.navigateTo({
					url: `/pages/product/detail?loadId=${id}`
				})
			}
		},
		computed: {
			itemList() {
				for (let m in this.productList) {
					let temp = this.productList[m].tag;
					if (temp) {
						this.productList[m].labelList = temp.split(',');
					} else {
						this.productList[m].labelList = [];
					}
				}
				return this.productList;
			}
		}

	}
</script>
<!-- 
<style lang="scss">
	.tag-item {
		margin-right: 10rpx;
	}

	.image-window {
		padding: 0 10rpx;

		.image-item {
			width: 33.33%;
			margin: 0 10rpx;
		}
	}
</style> -->
<style lang="scss">
	.waterfall {
		border-radius: 16rpx;
		margin: 20rpx 10rpx;
		background-color: #FFFFFF;
		position: relative;
		box-shadow: 2rpx 2rpx 16rpx #eee;

		.tip {
			position: absolute;
			right: -10rpx;
			top: 10rpx;
			z-index: 100;
		}

		.title {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.waterfall-image {
			border-top-left-radius: 16rpx;
			border-top-right-radius: 16rpx;
			width: 100%;
			display: block;
		}

		.head {
			border-radius: 50%;
			width: 50rpx;
			height: 50rpx;
			display: block;
		}
	}
</style>
