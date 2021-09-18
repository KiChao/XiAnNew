<template>
	<view>
		<u-sticky>
			<view class="white default-window search-window">
				<u-search @search="search" v-model="searchValue" :show-action="false" border-color="#19be6b" color="#333333"
				 search-icon-color="#19be6b" bg-color="#FFFFFF" placeholder="输入搜索内容"></u-search>
			</view>
		</u-sticky>

		<product-list :productList="productList"></product-list>
		<view v-if="productList.length==0" class="default-window">
			<u-empty text="搜索为空" mode="search"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				productList: []
			};
		},
		onLoad(data) {
			this.searchValue = data.searchValue;
			if (this.searchValue) {
				this.search();
			}
		},
		methods: {
			search() {
				if (this.searchValue == '') {
					this.$showToast('请输入搜索内容')
				} else {
					let params = {
						'name|like': this.searchValue
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
	}
</script>

<style lang="scss">

</style>
