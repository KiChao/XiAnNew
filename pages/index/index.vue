<template>
	<view>
		<u-sticky>
			<view class="white default-window search-window">
				<u-search :show-action="false" border-color="#19be6b" color="#333333" search-icon-color="#19be6b" bg-color="#FFFFFF"
				 placeholder="输入搜索内容" v-model="searchValue" @search="search"></u-search>
			</view>
		</u-sticky>
		<swiper style="height: 56vw;" autoplay>
			<swiper-item @tap="linkJump(item.href_type,item.href_value,item.href_path)" v-for="(item,index) in carouselList"
			 :key="index">
				<image :src="item.img_url" class="image" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="modal-window">
			<view @tap="linkJump(item.href_type,item.href_value,item.href_path)" v-for="(item,index) in modalList" :key="index"
			 :style="{width: `${item.width}%`}">

				<image :fade="false" :src="item.img_url" class="image" mode="widthFix"></image>
			</view>
		</view>
		<product-list :productList="productList"></product-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList: [],
				modalList: [],
				productList: [],
				page: 1,
				searchValue: ''
			}
		},
		onLoad() {

		},
		onReady() {
			this.loadCarousel();
			this.loadModal();
			this.loadProduct();
		},
		methods: {
			//点击搜索按钮
			search() {
				uni.navigateTo({
					url: '/pages/product/search?searchValue=' + this.searchValue
				})
			},
			//模块与轮播跳转
			linkJump(type, loadId) {
				let href = '';
				switch (type) {
					case 'product':
						href = '/pages/product/detail?loadId=';
						uni.navigateTo({
							url: href + loadId
						})
						break;
					case 'cate':
						href = '/pages/product/product?loadId=';
						uni.navigateTo({
							url: href + loadId
						})
						break;
					case 'miniProgram':
						wx.navigateToMiniProgram({
							appId: value,
							path: path,
						})
						break;
					case 'other':
						uni.navigateTo({
							url: value
						})
						break;
					default:
						break;
				}
			},
			//加载轮播图
			loadCarousel() {
				let params = {
					type: 'shg_index'
				}
				this.$api('Carousel/lists', params).then(data => {
					if (data.status == 1) {

						this.carouselList = data.data.carousel_list;
					} else {
						this.$showToast(data.msg);
					}
				});
			},
			//加载模块图
			loadModal() {
				let params = {
					type: 'shg_index'
				};
				this.$api('Module/lists', params).then(data => {
					if (data.status == 1) {
						this.modalList = data.data.module_list;
					} else {
						this.$showToast(data.msg);
					}
				});
			},
			//加载商品列表
			loadProduct() {
				let params = {
					page: this.page
				}
				this.$api('Product/lists', params).then(data => {
					if (data.status == 1) {
						this.productList = data.data.product_list;
					} else {
						this.$showToast(data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	.modal-window {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
</style>
