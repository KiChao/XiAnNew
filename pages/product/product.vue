<template>
	<view>
		<product-list :productList="productList"></product-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadId: 0,
				productList: [],
				page: 0,
			};
		},
		onLoad(data) {
			this.loadId = data.loadId;
			uni.setNavigationBarTitle({
				title: data.title
			})
		},
		onReady() {
			this.loadProduct();
		},
		onReachBottom() {
			this.loadProduct();
		},
		methods: {
			loadProduct() {
				this.page = this.page + 1;
				let params = {
					pcate_id: this.loadId,
					page: this.page,
				};
				this.$api('Product/lists', params).then(data => {
					if (data.status == 1) {
						let product = data.data.product_list;
						for (let m in product) {
							this.productList.push(product[m]);
						}
						// this.productList = data.data.product_list;

					} else {
						this.$showToast(data.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
