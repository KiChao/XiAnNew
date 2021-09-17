<template>
	<view>
		<view class="u-padding-60" v-if="pickAddressList.length==0">
			<u-empty mode="address"></u-empty>
		</view>
		<view v-for="(item,index) in pickAddressList" :key="index" class="card">
			<view @click="chooseAddress(item)" class="default-window u-border-bottom">
				<view class="bold">
					{{item.name}} {{item.phone}}
				</view>
				<u-gap height="16"></u-gap>
				<view class="u-font-sm u-tips-color">
					{{item.complete_street}}
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickAddressList: [],
				loadId: '',
			};
		},
		onLoad(data) {
			this.loadId = data.loadId;

		},
		onReady() {
			this.loadAddressList();
		},
		methods: {
			//加载自提地址
			loadAddressList() {
				this.$api('PickAddress/lists', {
					fisher_id: this.loadId
				}).then(data => {
					if (data.status == 1) {
						console.log(data);
						this.pickAddressList = data.data.pick_address_list;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//选择收货地址
			chooseAddress(item) {
				this.$store.commit('choosePickAddress', {
					name: item.name,
					phone: item.phone,
					address: item.complete_street,
					pickAddressId: item.pick_address_id,
				})
				uni.navigateBack({});
			},
		}
	}
</script>

<style lang="scss">

</style>
