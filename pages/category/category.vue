<template>
	<view>

		<view class="white default-window search-window">
			<u-search :show-action="false" border-color="#19be6b" color="#333333" search-icon-color="#19be6b" bg-color="#FFFFFF"
			 placeholder="输入搜索内容" v-model="searchValue" @search="search"></u-search>
		</view>


		<view class="cate-window flex">
			<scroll-view :show-scrollbar="false" scroll-y="true" class="left-window">
				<view @click="chooseCate(index)" v-for="(item,index) in cateList" :key="index" :class="{active:selectIndex==index}"
				 class="default-window u-text-center">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view :show-scrollbar="false" scroll-y="true" class="right-window">
				<view style="padding: 20rpx 10rpx;">
					<u-row gutter="20">
						<u-col v-for="(item,index) in childList" :key="index" span="4" text-align="center">
							<navigator hover-class="none" :url="`/pages/product/product?loadId=${item.pcate_id}&&title=${item.name}`" style="margin-bottom: 40rpx;">
								<u-image :fade="false" :src="item.img_url" width="100%" mode="widthFix"></u-image>
								
							</navigator>
						</u-col>
					</u-row>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeItem: 0,
				cateList: [],
				childList: [],
				selectIndex: 0,
				searchValue: ''
			};
		},
		onReady() {
			this.loadCate();
		},
		methods: {
			//点击搜索按钮
			search() {
				uni.navigateTo({
					url: '/pages/product/search?searchValue=' + this.searchValue
				})
			},
			loadCate() {
				this.$api('Pcate/lists').then(data => {

					if (data.status == 1) {
						this.cateList = data.data.pcate_list;
						this.childList = this.cateList[0].children_pcate;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			chooseCate(index) {
				this.childList = [];
				this.selectIndex = index;
				this.childList = this.cateList[index].children_pcate;
			}
		}
	}
</script>

<style lang="scss">
	.search-window {
		position: fixed;
		width: 100%;
		border-bottom: 2rpx solid #f3f4f6;
		z-index: 10;
	}

	.cate-window {
		height: 100vh;
		padding-top: 104rpx;

		.left-window {
			height: 100%;
			width: 200rpx;
			background-color: #FFFFFF;
			border-right: 2rpx solid #f3f4f6;

			.active {
				background-color: $u-type-success;
				color: #FFFFFF;
				font-weight: bold;
			}
		}

		.right-window {
			background-color: #FFFFFF;
			height: 100%;
			flex: 1;
		}
	}
</style>
