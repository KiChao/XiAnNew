<template>
	<view>
		<view class="u-padding-60" v-if="addressList.length==0">
			<u-empty mode="address"></u-empty>
		</view>
		<view v-for="(item,index) in addressList" :key="index" class="card">
			<view @click="chooseAddress(item)" class="default-window u-border-bottom">
				<view class="bold">
					{{item.name}} {{item.phone}}
				</view>
				<u-gap height="16"></u-gap>
				<view class="u-font-sm u-tips-color">
					{{item.complete_street}}
				</view>
			</view>
			<view class="flex place default-window u-font-sm">
				<view></view>
				<view class="flex">
					<!-- <navigator hover-class="none" :url="`/pages/address/edit?loadId=${item.address_id}&&type=edit`">编辑</navigator> -->
					<view @click="delAddress(item.address_id)" style="margin-left: 30rpx;">删除</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 120rpx;"></view>
		<view class="default-window bottom-btn white">
			<u-button @click="addAddress" type="success">新增地址</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: null,
				addressList: [],
			};
		},
		onLoad(data) {
			this.type = data.type || 'add';
		},
		onShow() {
			this.loadAddressList();
		},
		methods: {
			//加载收货地址
			loadAddressList() {
				this.$api('Address/index').then(data => {
					if (data.status == 1) {
						this.addressList = data.data.address_list;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//选择收货地址
			chooseAddress(item) {
				if (this.type == 'choose') {
					this.$store.commit('chooseAddress', {
						name: item.name,
						phone: item.phone,
						address: item.complete_street,
						addressId: item.address_id,
					})
					uni.navigateBack({

					})
				}
			},
			//删除地址
			delAddress(id) {
				this.$showModal('是否删除该收货地址？', () => {
					let params = {
						address_id: id
					};
					this.$api('Address/delete', params).then(data => {
						if (data.status == 1) {
							this.$showToast(data.msg);
							this.loadAddressList();
						} else {
							this.$showToast(data.msg);
						}
					});
				})
			},
			//新增地址
			addAddress(){
				uni.navigateTo({
					url:'/pages/address/edit?type=add'
				})
			}
		}

	}
</script>

<style lang="scss">
	.bottom-btn{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
