<template>
	<view>
		<view style="background-color: #19BE6B;width: 100%;height: 150rpx;"></view>
		<view class="card" style="margin-top: -80rpx;padding: 40rpx 0;">
			<u-steps mode="number" active-color="#19be6b" :list="numList" :current="orderInfo.status"></u-steps>
		</view>
		<view class="card default-window flex">
			<view class="">
				<u-icon name="map" size="50"></u-icon>
			</view>
			<view style="padding-left: 30rpx;flex: 1;">
				<view class="flex place bold">
					<view>{{ orderInfo.receiver_name }}</view>
					<view>{{ orderInfo.receiver_phone }}</view>
				</view>
				<view class="u-font-26 u-tips-color">
					{{ orderInfo.receiver_address }}
				</view>
			</view>

		</view>
		<view class="card">
			<view class="default-window u-border-bottom">
				<u-section title="订单信息" :right="false" line-color="#19be6b"></u-section>
			</view>
			<view class="default-window flex place">
				<view>订单号</view>
				<view>{{orderInfo.no}}</view>
			</view>
			<view class="default-window flex place">
				<view>下单时间</view>
				<view>{{orderInfo.time}}</view>
			</view>
			<view class="default-window flex place">
				<view>支付方式</view>
				<view v-if="orderInfo.pay_type==2" class="font-green bold">鱼仔兑换</view>
				<view v-else class="font-red bold">现金支付</view>
			</view>
		</view>
		<view v-if="orderInfo.status>=2" class="card">
			<view class="default-window u-border-bottom">
				<u-section title="运输信息" :right="false" line-color="#19be6b"></u-section>
			</view>
			<view class="default-window flex place">
				<view>快递公司</view>
				<view>{{orderInfo.express_company||'暂未发货'}}</view>
			</view>
			<view class="default-window flex place">
				<view>快递单号</view>
				<view class="flex">
					<view>{{orderInfo.express_no||'暂未发货'}}</view>
					<view @click="copyNo" class="font-red" style="margin-left: 10rpx;">复制</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="default-window u-border-bottom">
				<u-section title="商品清单" :right="false" line-color="#19be6b"></u-section>
			</view>
			<view v-for="(item, index) in orderInfo.product_list" :key="index" class="u-border-bottom">
				<view class="default-window flex" style="align-items: flex-start;">
					<view class="product-image">
						<image :src="item.main_img" class="image" mode="widthFix"></image>
					</view>
					<view class="product-name">
						<view>{{item.name}}</view>
						<view class="u-font-12 u-tips-color">
							<text v-for="sku in item.sku_info" :key="sku.sku_name">{{ sku.sku_key }}：{{ sku.sku_name }}/</text>
						</view>
						<view class="flex place">
							<view class="font-red bold">￥{{item.discount_price}}</view>
							<view class="u-font-11">×{{item.num}}</view>
						</view>
						<view  class="flex place">
							<view></view>
							<view>
								<u-button v-if="orderInfo.order_type==1 && item.status==1" @click="refund(item.order_product_id)" size="mini">退款</u-button>
								<text v-if="item.status==8" class="u-tips-color u-font-12">退款中</text>
								<text v-if="item.status==9" class="u-tips-color u-font-12">退款成功</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="default-window flex place u-border-bottom">
				<view>共{{orderInfo.product_list.length}}件商品</view>
				<view class="flex">
					<view>商品合计</view>
					<view class="u-font-40 font-red bold" style="margin: 0 10rpx;">{{orderInfo.total_fee}}</view>
					<view>元</view>
				</view>
			</view>
			<view class="default-window flex place ">
				<view>邮费</view>
				<view class="font-red">{{orderInfo.freight == 0 ? '免运费' : '￥' + orderInfo.freight}}</view>
			</view>

		</view>
		<view class="default-window flex place">
			<view></view>
			<view class="flex around">
				<u-button v-if="orderInfo.status==0" class="btn">取消订单</u-button>
				<u-button v-if="orderInfo.status==1" class="btn" @click="refundAll">整单退款</u-button>
				<u-button @click="payOrder(orderInfo.no)" v-if="orderInfo.status==0" type="success" class="btn">立即支付</u-button>
				<u-button @click="confirmOrder(orderInfo.order_id)" v-if="orderInfo.status==2" type="success" class="btn">确认收货</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numList: [{
					name: '下单'
				}, {
					name: '付款'
				}, {
					name: '运输'
				}, {
					name: '签收'
				}],
				orderInfo: {
					product_list: []
				},
				loadId: 0,
			};
		},
		onLoad(data) {
			this.loadId = data.loadId;
		},
		onReady() {
			this.loadOrder();
		},
		methods: {
			//单品退款
			refund(id) {
				this.$showModal('是否退款该笔商品？', () => {
					let params = {
						order_product_id: id
					}
					this.$api('Order/refund', params).then(data => {
						if (data.status == 1) {
							this.loadOrder();
						} else {
							this.$showToast(data.msg);
						}
					})
				})
			},
			//整单退款
			refundAll() {
				this.$showModal('是否将整个订单的产品进行退款？', () => {
					let params = {
						order_id: this.orderInfo.order_id
					}
					this.$api('Order/refund', params).then(data => {
						if (data.status == 1) {
							this.loadOrder();
						} else {
							this.$showToast(data.msg);
						}
					})
				})
			},
			//支付订单
			payOrder(no) {
				this.$showModal('是否支付该笔订单？', () => {

					let params = {
						is_mini: 1,
						no: no
					};
					this.$api('Pay/pay', params).then(data => {
						if (data.status == 1) {
							uni.hideLoading();
							this.$pay(data.data.response).then(data => {
								uni.reLaunch({
									url: '/pages/public/success/success'
								})
							}).catch(res => {
								uni.switchTab({
									url: '/pages/usercenter/usercenter'
								})
								// this.$showToast(res.errMsg)
							})
						} else if (data.status == 2) {
							uni.hideLoading();
							this.$showToast('支付成功');
							uni.switchTab({
								url: '/pages/usercenter/usercenter'
							})
						} else {
							this.$showToast(data.msg);
						}

					})
				})
			},
			loadOrder() {
				let params = {
					order_id: this.loadId
				};
				this.$api('Order/detail', params).then(data => {
					if (data.status == 1) {

						this.orderInfo = data.data.order;
					} else {
						this.$api.msg(data.msg);
					}
				});
			},
			//复制快递单号
			copyNo() {
				let data = this.orderInfo.express_no;
				let that = this;
				uni.setClipboardData({
					data: data,
					success() {
						that.$showToast('复制成功');
					}
				})
			},
			//确认收货
			confirmOrder(id) {
				this.$showModal('是否确认收货此商品？', () => {
					let params = {
						order_id: id
					};
					this.$api('Order/confirm', params).then(data => {
						if (data.status == 1) {
							this.$showToast(data.msg);
							this.loadOrder();
						} else {
							this.$showToast(data.msg);
						}
					});
				});
			},
		}
	}
</script>

<style lang="scss">
	.btn {
		margin-left: 10rpx;
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
