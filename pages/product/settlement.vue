<template>
	<view>
		<view style="background-color: #19BE6B;width: 100%;height: 100rpx;"></view>
		
		<navigator v-if="pickType==1" url="/pages/address/address?type=choose" class="card default-window flex" style="margin-top: -80rpx;">
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
		
		<navigator v-if="pickType==2" :url="`/pages/product/pickAddress?loadId=${productInfo.fisher_id}`" class="card default-window flex" style="margin-top: -80rpx;">
			<view class="">
				<u-icon name="map" size="50"></u-icon>
			</view>
			<view v-if="pickAddressInfo.pickAddressId==0" style="padding-left: 30rpx;line-height: 1.8;">
				选择自提地址
			</view>
			<view v-else style="padding-left: 30rpx;line-height: 1.8;">
				<view class="flex place bold">
					<view>{{pickAddressInfo.name}}</view>
					<view>{{pickAddressInfo.phone}}</view>
				</view>
				<view class="u-font-26 u-tips-color">
					{{pickAddressInfo.address}}
				</view>
			</view>
		</navigator>
		<view class="card default-window flex place">
			<view>配送方式</view>
			<view class="bold font-green">{{pickType==1?'快递邮寄':'门店自提'}}</view>
		</view>
		<view v-for="(item,index) in providerList" :key="index" class="card">
			<view class="default-window u-border-bottom">
				<u-section :title="item.fisher_name" :right="false" line-color="#19be6b"></u-section>
			</view>
			<view v-for="(product,tip) in item.product" :key="tip" class="u-border-bottom">
				<view class="default-window flex" style="align-items: flex-start;">
					<view class="product-image">
						<image :src="product.img_info.url" class="image" mode="widthFix"></image>
					</view>
					<view class="product-name">
						<view>{{product.name}}</view>
						<view class="u-font-12 u-tips-color">
							<text>{{product.sku_str}}</text>
						</view>
						<view class="flex place">
							<view class="font-red bold">{{product.product_type==1?`￥${product.discount_price}`:`${product.discount_price}鱼仔`}}</view>
							<view class="u-font-11">×{{product.num}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="default-window flex place u-border-bottom">
				<view>共{{item.product_count}}件商品</view>
				<view class="flex">
					<view>合计</view>
					<view class="u-font-40 font-red bold" style="margin: 0 10rpx;">{{item.total_price}}</view>
					<view>{{type==1?'元':'鱼仔'}}</view>
				</view>
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
				<u-section title="订单信息" :right="false" line-color="#19be6b"></u-section>
			</view>
			
			<view class="default-window flex place">
				<view>订单运费</view>
				<view>{{totalFee==0?'免运费':totalFee+'元'}}</view>
			</view>

			<view class="default-window flex place">
				<view>支付方式</view>
				<view class="font-green bold">{{type==1?'在线支付':'鱼仔兑换'}}</view>
			</view>
			<view class="default-window flex place">
				<view>订单金额</view>
				<view class="font-red">
					<text v-if="productInfo.product_type==1">￥{{totalPrice}}</text>
					<text v-else>{{totalPrice}}鱼仔</text>
				</view>
			</view>
		</view>
		<view class="btn-bottom">
			<view class="default-window flex place white">
				<view>
					<text class="font-red" v-if="productInfo.product_type==1">￥</text><text class="font-red u-font-40 bold">{{totalPrice}}</text><text
					 class="font-red" v-if="productInfo.product_type==2">鱼仔</text><text v-if="totalFee!=0">+邮费¥{{totalFee}}</text>
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
				productInfo: this.$store.state.product.product,
				num: this.$store.state.product.num,
				skuInfo: this.$store.state.product.sku,
				detailId: this.$store.state.product.skuId || 0,
				pickType:this.$store.state.product.pickType,

				providerList: [],
				totalPrice: 0,
				totalNeedPoint: 0,
				totalFee: 0,

				desc: '', //备注
				addressInfo: {
					addressId: 0,
				},
				pickAddressInfo:{
					pickAddressId:0,
				},
				type: 0,
			};
		},
		onShow() {
			if(this.pickType==1){
				this.addressInfo = this.$store.state.address.address;
				let that = this;
				let params = {
					address_id: that.addressInfo.addressId,
					product_list: JSON.stringify([`${that.productInfo.product_id}_${that.detailId}_${that.num}`])
				};
				this.$api('Order/get_freight', params).then(data => {
					if (data.status == 1) {
						this.totalFee = data.data.freight;
					} else {
						this.$showToast(data.msg);
					}
				
				});
			}else{
				
				this.pickAddressInfo=this.$store.state.address.pickAddress;
				console.log(this.pickAddressInfo);
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

					if (that.addressInfo.addressId == 0 && that.pickType==1) {
						that.$showToast('请选择收货地址');

						return;
					}
					if (that.pickAddressInfo.pickAddressId == 0 && that.pickType==2) {
						that.$showToast('请选择自提地址');
					
						return;
					}
					let product = [];
					let remarkList = [];

					for (let m in that.providerList) {
						let remark = {
							fisher_id: that.providerList[m].fisher_id,
							remark: that.providerList[m].remark,
						}
						remarkList.push(remark);

						let ptemp = that.providerList[m].product
						for (let n in ptemp) {
							let temp = `${ptemp[n].product_id}_${ptemp[n].product_detail_id}_${ptemp[n].num}`;
							product.push(temp);
						}
					}
					let params = {
						address_id: that.addressInfo.addressId,
						product_list: JSON.stringify(product),
						remark: JSON.stringify(remarkList),
						pick_type:that.pickType,
						pick_address_id:that.pickAddressInfo.pickAddressId,
					};
					that.$api('Order/create', params).then(data => {
						if (data.status == 1) {

							let no = data.data.pay_no;
							let params = {
								is_mini: 1,
								no: no
							};
							this.$api('pay/order', params).then(data => {
								if (data.status == 1) {
									uni.hideLoading();
									this.$pay(data.data.response).then(data => {
										this.$getD(()=>{
											uni.switchTab({
												url: '/pages/usercenter/usercenter'
											})
										})
										
									}).catch(res => {
										
										this.$getD(()=>{
											uni.switchTab({
												url: '/pages/usercenter/usercenter'
											})
										})
										// this.$showToast(res.errMsg)
									})
								} else if (data.status == 2) {
									this.$getD(()=>{
										uni.hideLoading();
										that.$showToast('支付成功');
										uni.switchTab({
											url: '/pages/usercenter/usercenter'
										})
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
					product_id: this.productInfo.product_id,
					sku_array: this.skuInfo.skuArray || 0,
					num: this.num,
					product_list: JSON.stringify([`${this.productInfo.product_id}_${this.detailId}_${this.num}`])
				};
				this.$api('Order/settlement', params).then(data => {
					if (data.status == 1) {
						this.providerList = data.data.product_list;
						this.totalPrice = data.data.all_price;
						this.totalNeedPoint = data.data.total_need_point;
						this.type = data.data.type;

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
		z-index: 10000;
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
