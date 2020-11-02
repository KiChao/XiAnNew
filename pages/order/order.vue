<template>
	<view>
		<u-sticky>
			<u-subsection @change="change" bgColor="#FFFFFF" buttonColor="#19be6b" active-color="#FFFFFF" :list="tabs" :current="current"></u-subsection>
		</u-sticky>
		<view v-if="current==0">
			<view v-for="(item,index) in orderList0" :key="index" class="card">
				<view class="u-border-bottom default-window flex place">
					<view class="flex">
						<image :src="item.fisher_info.headimgurl" class="shop-head" mode="aspectFill"></image>
						<view class="shop-name">{{item.fisher_info.nickname}}</view>
					</view>
					<view class="u-font-11 u-tips-color">待付款</view>
				</view>
				<navigator hover-class="none" :url="`/pages/order/detail?loadId=${item.order_id}`">
					<view style="align-items: flex-start;" class="default-window flex u-border-bottom" v-for="(product,tip) in item.product_list"
					 :key="tip">
						<view class="product-image">
							<u-image :src="product.main_img" width="100%" mode="widthFix"></u-image>
						</view>
						<view class="product-name">
							<view>{{product.name}}</view>
							<view class="u-font-12 u-tips-color">
								<text v-for="sku in product.sku_info" :key="sku.sku_name">{{sku.sku_key}}：{{sku.sku_name}}</text>
							</view>
							<view class="flex place">
								<view class="font-red bold">
									<text v-if="item.order_type==1">￥{{product.discount_price}}</text>
									<text v-else>{{product.discount_price}}鱼仔</text>
								</view>
								<view class="u-font-11">×{{product.num}}</view>
							</view>
						</view>
					</view>
				</navigator>
				<view class="default-window flex place">
					<view></view>
					<view class="flex around">
						<u-button @click="cancelOrder(item.order_id)" size="mini" class="btn">取消订单</u-button>
						<u-button @click="payOrder(item.no)" size="mini" type="success" class="btn">立即支付</u-button>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current==1">
			<view v-for="(item,index) in orderList1" :key="index" class="card">
				<view class="u-border-bottom default-window flex place">
					<view class="flex">
						<image :src="item.fisher_info.headimgurl" class="shop-head" mode="aspectFill"></image>
						<view class="shop-name">{{item.fisher_info.nickname}}</view>
					</view>
					<view class="u-font-11" style="color: #ff9900;">待发货</view>
				</view>
				<navigator hover-class="none" :url="`/pages/order/detail?loadId=${item.order_id}`">
					<view style="align-items: flex-start;" class="default-window flex" v-for="(product,tip) in item.product_list" :key="tip">
						<view class="product-image">
							<u-image :src="product.main_img" width="100%" mode="widthFix"></u-image>
						</view>
						<view class="product-name">
							<view>{{product.name}}</view>
							<view class="u-font-12 u-tips-color">
								<text v-for="sku in product.sku_info" :key="sku.sku_name">{{sku.sku_key}}：{{sku.sku_name}}</text>
							</view>
							<view class="flex place">
								<view class="font-red bold">
									<text v-if="item.order_type==1">￥{{product.discount_price}}</text>
									<text v-else>{{product.discount_price}}鱼仔</text>
								</view>
								<view class="u-font-11">×{{product.num}}</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		<view v-if="current==2">
			<view v-for="(item,index) in orderList2" :key="index" class="card">
				<view class="u-border-bottom default-window flex place">
					<view class="flex">
						<image :src="item.fisher_info.headimgurl" class="shop-head" mode="aspectFill"></image>
						<view class="shop-name">{{item.fisher_info.nickname}}</view>
					</view>
					<view class="u-font-11 font-green">待收货</view>
				</view>
				<navigator hover-class="none" :url="`/pages/order/detail?loadId=${item.order_id}`">
					<view style="align-items: flex-start;" class="default-window flex u-border-bottom" v-for="(product,tip) in item.product_list"
					 :key="tip">
						<view class="product-image">
							<u-image :src="product.main_img" width="100%" mode="widthFix"></u-image>
						</view>
						<view class="product-name">
							<view>{{product.name}}</view>
							<view class="u-font-12 u-tips-color">
								<text v-for="sku in product.sku_info" :key="sku.sku_name">{{sku.sku_key}}：{{sku.sku_name}}</text>
							</view>
							<view class="flex place">
								<view class="font-red bold">
									<text v-if="item.order_type==1">￥{{product.discount_price}}</text>
									<text v-else>{{product.discount_price}}鱼仔</text>
								</view>
								<view class="u-font-11">×{{product.num}}</view>
							</view>
						</view>
					</view>
				</navigator>
				<view class="default-window flex place">
					<view></view>
					<view class="flex around">
						<u-button @click="confirmOrder(item.order_id)" size="mini" type="success" class="btn">确认收货</u-button>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current==3">
			<view v-for="(item,index) in orderList3" :key="index" class="card">
				<view class="u-border-bottom default-window flex place">
					<view class="flex">
						<image :src="item.fisher_info.headimgurl" class="shop-head" mode="aspectFill"></image>
						<view class="shop-name">{{item.fisher_info.nickname}}</view>
					</view>
					<view class="u-font-11 u-tips-color">已完成</view>
				</view>
				<navigator hover-class="none" :url="`/pages/order/detail?loadId=${item.order_id}`">
					<view style="align-items: flex-start;" class="default-window flex" v-for="(product,tip) in item.product_list" :key="tip">
						<view class="product-image">
							<u-image :src="product.main_img" width="100%" mode="widthFix"></u-image>
						</view>
						<view class="product-name">
							<view>{{product.name}}</view>
							<view class="u-font-12 u-tips-color">
								<text v-for="sku in product.sku_info" :key="sku.sku_name">{{sku.sku_key}}：{{sku.sku_name}}</text>
							</view>
							<view class="flex place">
								<view class="font-red bold">
									<text v-if="item.order_type==1">￥{{product.discount_price}}</text>
									<text v-else>{{product.discount_price}}鱼仔</text>
								</view>
								<view class="u-font-11">×{{product.num}}</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [{
						name: '待支付'
					},
					{
						name: '待发货'
					},
					{
						name: '已发货'
					},
					{
						name: '已完成'
					}
				],
				orderList0: [],
				orderList1: [],
				orderList2: [],
				orderList3: [],
			};
		},
		onLoad(data) {
			this.current = data.type || 0;
		},
		onReady() {
			this.loadOrder();
		},
		methods: {
			change(e) {
				this.current = e;
			},
			//确认收货
			confirmOrder(id) {
				this.$showModal('是否确认收货此商品？',()=>{
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
				this.$api('Order/lists').then(data => {
					if (data.status == 1) {
						let orderList = data.data.order_list;
						this.orderList0 = [];
						this.orderList1 = [];
						this.orderList2 = [];
						this.orderList3 = [];
						this.orderList4 = [];
						for (let m in orderList) {
							switch (orderList[m].status) {
								case 0:
									this.orderList0.push(orderList[m]);
									break;
								case 1:
									this.orderList1.push(orderList[m]);
									break;
								case 2:
									this.orderList2.push(orderList[m]);
									break;
								case 3:
									this.orderList3.push(orderList[m]);
									break;
								default:
									this.orderList4.push(orderList[m]);
									break;
							}
						}
					} else {
						this.$showToast(data.msg);
					}
				});
			},
			cancelOrder(id) {
				this.$showModal('是否取消该笔订单？', () => {
					let params = {
						order_id: id
					};
					this.$api('Order/cancel', params).then(data => {
						if (data.status == 1) {
							this.$showToast(data.msg);
						} else {
							this.$showToast(data.msg);
						}
					});
				})

			}
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

	.shop-head {
		width: 50rpx;
		height: 50rpx;
		display: block;
		border-radius: 50%;
	}

	.shop-name {
		padding: 0 10rpx;
		font-size: 26rpx;
	}
</style>
