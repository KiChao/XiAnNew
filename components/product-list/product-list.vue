<template>
	<view>
		<navigator v-for="(item,index) in itemList" :key="index" :url="`/pages/product/detail?loadId=${item.product_id}`"
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
				<!-- <view v-for="(image,tip) in item.img_info.slice(0,3)" :key="tip" class="image-item">
					<u-image width="100%" :src="image.url" mode="widthFix"></u-image>

				</view> -->
				<u-row gutter="20">
					<u-col span="4" v-for="(image,tip) in item.img_info.slice(0,3)" :key="tip">
						<u-image width="100%" :src="image.url" mode="widthFix"></u-image>
					</u-col>
				</u-row>
			</view>
			<view class="default-window">
				<view class="u-font-11 u-tips-color">{{item.slogan||''}}</view>
				<u-gap height="16"></u-gap>
				<view class="flex place">
					<view class="font-red bold flex">
						<view v-if="item.product_type==1" class="u-font-12">￥</view>
						<view class="u-font-17">{{item.discount_price}}</view>
						<view v-if="item.product_type==2" class="u-font-12">鱼仔</view>
					</view>
					<view class="u-font-11">
						已售{{item.sv_total_num}} / 剩余{{item.stock}}
					</view>
				</view>
			</view>
		</navigator>
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
</style>
