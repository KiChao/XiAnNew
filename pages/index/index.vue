<template>
	<view>
		<search-bar></search-bar>
		<swiper style="height: 56vw;" autoplay>
			<swiper-item @tap="jumpLink(item.href_type,item.href_value,item.href_path)" v-for="(item,index) in carouselList"
			 :key="index">
				<image :src="item.img_url" class="image" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="modal-window">
			<view @tap="jumpLink(item.href_type,item.href_value,item.href_path)" v-for="(item,index) in modalList" :key="index"
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
				page: 0,
				searchValue: ''
			}
		},
		onLoad(data) {
			if (data.scene) {
				let query = this.$getRequestParameters(decodeURIComponent(data.scene))
				let sn = query.sn;
				console.log(sn)
				if (sn) {
					this.$store.commit('setSn', {
						ref_sn: sn
					})
				} else {
					console.log('无sn')
				}

			}
		},
		onReady() {
			this.loadCarousel();
			this.loadModal();
			this.loadProduct();
		},
		onReachBottom() {
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
			jumpLink(type, value, path = 'pages/index/index') {
				switch (type) {
					case 'miniProgram':
						wx.navigateToMiniProgram({
							appId: value,
							path: path,
						})
						break;
					default:
						uni.navigateTo({
							url: value
						})
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
				this.page = this.page + 1;
				let params = {
					page: this.page,
					product_type: 1
				}
				this.$api('Product/lists', params).then(data => {
					if (data.status == 1) {
						// this.productList = data.data.product_list;
						let product = data.data.product_list;
						for (let m in product) {
							this.productList.push(product[m]);
						}
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
