<template>
	<view>
		<view style="background-color: #19BE6B;width: 100%;height: 100rpx;"></view>
		<navigator hover-class="none" url="/pages/address/address?type=choose" class="card default-window flex" style="margin-top: -80rpx;">
			<view class="">
				<u-icon name="map" size="50"></u-icon>
			</view>
			<view v-if="addressInfo.addressId==0" style="padding-left: 30rpx;line-height: 1.8;">
				选择收货地址
			</view>
			<view v-else style="padding-left: 30rpx;line-height: 1.8;">
				<view class="flex place bold">
					<view>{{addressInfo.name}}</view>
					<view>{{addressInfo.phone}}</view>
				</view>
				<view class="u-font-26 u-tips-color">
					{{addressInfo.address}}
				</view>
			</view>
		</navigator>
		<view class="card" v-for="(item,tip) in productList" :key="tip">
			<view class="default-window">{{item.fisher_name}}</view>
			<view v-for="(product,index) in item.product" :key="index" class="u-border-bottom">
				<view class="default-window flex" style="align-items: flex-start;">
					<view class="product-image">
						<image :src="product.img_info.url" class="image" mode="widthFix"></image>
					</view>
					<view class="product-name">
						<view>{{product.name}}</view>
						<view class="u-font-12 u-tips-color">{{product.subtitle}}</view>
						<view class="u-font-12 u-tips-color">{{product.sku_str}}</view>
						<view class="u-font-12 u-tips-color">
							<text v-for="sku in product.sku_info" :key="sku.sku_name">{{sku.sku_key}}：{{sku.sku_name}}/</text>
						</view>
						<view class="flex place">
							<view class="font-red bold">￥{{product.discount_price}}</view>
							<view class="u-font-11">×{{product.num}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="default-window u-border-bottom flex place">
				<view></view>
				<view>共{{item.product_count}}件商品</view>
			</view>
			<view class="default-window  flex place">
				<view>订单备注</view>
				<view style="flex: 1;">
					<u-input v-model="item.remark" input-align='right' placeholder="请输入备注信息"></u-input>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="default-window u-border-bottom">
				<u-section title="支付方式选择" :right="false" line-color="#19be6b"></u-section>
			</view>
			<view class="default-window flex place">
				<view>支付方式</view>
				<view class="flex">
					<view style="margin-left: 10rpx;">
						<u-tag mode="dark" shape="circle" @click="payType=2" :type="payType==2?'success':'info'" text="微信支付"></u-tag>
					</view>
					<!-- <view style="margin-left: 10rpx;">
						<u-tag mode="dark" shape="circle" @click="payType=3" :type="payType==3?'success':'info'" text="钱包余额"></u-tag>
					</view> -->

				</view>
			</view>
		</view>
		<view class="card">
			<view class="default-window u-border-bottom">
				<u-section title="订单信息" :right="false" line-color="#19be6b"></u-section>
			</view>

			<view class="default-window flex place">
				<view>订单运费</view>
				<view>{{totalFee==0?'免运费':totalFee+'元'}}</view>
			</view>
			<view class="default-window flex place">
				<view>支付方式</view>
				<view>
					{{payType==2?'微信支付':'钱包余额'}}
				</view>
			</view>

			<view class="default-window flex place">
				<view>订单金额</view>
				<view class="font-red">
					<text>￥{{totalPrice}}</text>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 120rpx;"></view>
		<view class="btn-bottom">
			<view class="default-window flex place white">
				<view class="flex">
					合计：<text class="font-red">￥</text><text class="font-red u-font-40 bold">{{totalPrice}}</text><text v-if="totalFee!=0">+邮费¥{{totalFee}}</text>
				</view>
				<view>
					<u-button @click="orderSubmit" type="success">结算订单</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartArray: this.$store.state.product.cartArray,
				cartProduct: this.$store.state.product.cartProduct,

				productList: [],
				totalPrice: 0,
				totalFee: 0,

				remark: '', //备注
				/* addressInfo: {
					addressId: 0
				}, */
				payType: 2
			};
		},
		computed: {
			addressInfo() {
				return this.$store.state.address.address;
			}
		},
		onShow() {

			if (this.addressInfo.addressId != 0) {
				// this.addressInfo = this.$store.state.address.address;
				let that = this;
				let params = {
					address_id: that.addressInfo.addressId,
					product_list: JSON.stringify(this.cartArray),
					is_cart: 1
				};
				this.$api('Order/get_freight', params).then(data => {
					if (data.status == 1) {
						this.totalFee = data.data.freight;
					} else {
						this.$showToast(data.msg);
					}

				});
			}

		},
		onReady() {
			this.createSettlement();
		},
		methods: {
			//提交订单
			orderSubmit() {

				let that = this;
				this.$showModal('是否提交订单？', () => {

					if (that.addressInfo.addressId == 0) {
						that.$showToast('请选择收货地址');

						return;
					}
					let product = [];
					let remarkList = [];
					let ftemp = that.productList;
					for (let m in ftemp) {
						let remark = {
							fisher_id: ftemp[m].fisher_id,
							remark: ftemp[m].remark,
						}
						remarkList.push(remark);

						let ptemp = ftemp[m].product;
						for (let n in ptemp) {
							let temp = `${ptemp[n].product_id}_${ptemp[n].product_detail_id}_${ptemp[n].num}`;
							product.push(temp);
						}
					}

					let params = {
						address_id: that.addressInfo.addressId,
						product_list: JSON.stringify(product),
						remark: JSON.stringify(remarkList),
					};
					that.$api('Order/create', params).then(data => {
						if (data.status == 1) {

							let no = data.data.pay_no;
							let params = {
								pay_type: that.payType,
								no: no,
								is_mini: 1,
							};
							this.$api('Pay/pay', params).then(data => {
								if (data.status == 1) {
									uni.hideLoading();
									this.$pay(data.data.response).then(data => {
										uni.switchTab({
											url: '/pages/usercenter/usercenter'
										})
									}).catch(res => {
										uni.switchTab({
											url: '/pages/usercenter/usercenter'
										})
										// this.$showToast(res.errMsg)
									})
								} else if (data.status == 2) {
									uni.hideLoading();
									uni.reLaunch({
										url: '/pages/public/success'
									})
								} else {
									that.$showToast(data.msg);
								}
							})
						} else {
							uni.hideLoading();
							that.$showToast(data.msg);
						}
					});
				})
			},
			//初始化订单信息
			createSettlement() {
				let params = {
					cart_id: JSON.stringify(this.cartArray)
				};
				this.$api('Order/settlement', params).then(data => {
					if (data.status == 1) {
						this.productList = data.data.product_list;
						this.totalPrice = data.data.all_price;
						this.totalFee = data.data.freight;
						/* if (data.data.address_list.length != 0) {
							let address = data.data.address_list[0];
							this.$store.commit('chooseAddress', {
								name: address.name,
								phone: address.phone,
								address: address.complete_street,
								addressId: address.address_id,
							});
							this.addressInfo = this.$store.state.address.address;

						} */
					} else {
						this.$showToast(data.msg);
					}
				});

			},
		}
	}
</script>

<style lang="scss">
	.btn-bottom {
		width: 100%;
		bottom: 0;
		position: fixed;
	}

	.product-image {
		width: 130rpx;
		height: 130rpx;
	}

	.product-name {
		padding-left: 30rpx;
		flex: 1;
	}
</style>
