<template>
	<u-sticky>
		<view class="white default-window search-window flex">
			<view style="flex: 1;">
				<u-search :show-action="false" border-color="#19be6b" color="#333333" search-icon-color="#19be6b" bg-color="#FFFFFF"
				 placeholder="输入搜索内容" v-model="searchValue" @search="search"></u-search>
			</view>
			<navigator url="/pages/cart/cart" hover-class="" style="padding-left: 30rpx;position: relative;">
				<u-icon color="#19be6b" name="shopping-cart-fill" size="50"></u-icon>
				
			</navigator>
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
		onReady() {
			
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
