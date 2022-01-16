<template>
	<u-sticky>
		<view class="white default-window search-window flex">
			<view style="flex: 1;">
				<u-search :show-action="false" border-color="#19be6b" color="#333333" search-icon-color="#19be6b" bg-color="#FFFFFF"
				 placeholder="输入搜索内容" v-model="searchValue" @search="search"></u-search>
			</view>
			
		</view>
	</u-sticky>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
			};
		},
		onShow() {
			this.$api('Cart/num').then(data => {
				if (data.status == 1) {
					
				} else {
					this.$showToast(data.msg);
				}
			})
		},
		methods: {
			//点击搜索按钮
			search() {
				uni.navigateTo({
					url: '/pages/product/search?searchValue=' + this.searchValue
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
