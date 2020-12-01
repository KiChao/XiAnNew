<template>
	<view>
		<view class="default-window flex place">
			<view class="u-font-12">共{{cart.length}}件宝贝</view>
			<view @click="cartEdit=!cartEdit;">{{cartEdit?'完成':'管理'}}</view>
		</view>
		<view class="u-padding-80" v-if="cart.length==0">
			<u-empty mode="car" text="购物车为空"></u-empty>
		</view>

		<view class="card" v-for="(item,index) in cart" :key="index">
			<view class="flex default-window">
				<image :src="item.fisher_info.headimgurl" mode="widthFix" style="width: 70rpx;height: 70rpx;display: block;border-radius: 50%;"></image>
				<view style="margin-left: 10rpx;">{{item.fisher_info.nickname}}</view>
			</view>
			<checkbox-group @change="checkboxGroupChange">
				<view  class="default-window flex">
					<view>
						<checkbox :value="item.cart_id" style="transform:scale(0.7)" />
					</view>
					<view class="cart-image">
						<u-image :src="item.product.image" mode="widthFix" width="150rpx" border-radius="16" height="150rpx"></u-image>
					</view>
					<view class="cart-name" style="align-items: flex-start;">
						<view class="bold">{{item.product.name}}</view>
						<view class="u-font-12 u-tips-color">{{item.product_detail.sku_str}}</view>
						<u-gap height="16"></u-gap>
						<view class="flex place">
							<view class="font-red"><text>￥</text><text class="u-font-40">{{item.product.discount_price}}</text></view>
							<view v-if="cartEdit==false">
								<u-number-box @blur="blur" @plus="plus" @minus="minus" v-model="item.num" :index="item.cart_id" min="1"
								 :input-width="60" :input-height="60"></u-number-box>
							</view>
							<view v-else>
								<u-button @click="del(item.cart_id)" type="error" size="mini">删除</u-button>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>

		<view class="default-window bottom-btn white flex place">
			<view class="flex">
				合计：<text class="font-red">￥</text><text class="font-red u-font-40">{{totalPrice}}</text><text class="u-font-22 u-tips-color">（不含运费）</text>
			</view>
			<view>
				<view @click="goSubmit" v-if="cartEdit==false" class="sign-btn u-text-center">
					结算购物车
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartEdit: false,
				cart: [],
				chooseItem: [],
				totalPrice: 0,
				
			};
		},
		onShow() {
			this.loadCart();
		},
		methods: {
			//提交购物车
			goSubmit() {
				if (this.chooseItem.length == 0) {
					this.$showToast('请先选择产品');
					return;
				}
				this.$showModal('是否提交购物车？', () => {
					let params = {
						cart_id: JSON.stringify(this.chooseItem)
					}
					this.$api('order/settlement', params).then(data => {
						if (data.status == 1) {
							let cartArray = this.chooseItem;
							let cartProduct = [];
							let product = data.data.product_data;
							for (let m in product) {
								let temp = `${product[m].product_id}_${product[m].product_detail_id}_${product[m].num}`;
								cartProduct.push(temp);
							}
							this.$store.commit('chooseCart', {
								cartArray: cartArray,
								cartProduct: cartProduct
							})
							uni.navigateTo({
								url: '/pages/cart/settlement'
							})
						} else {
							this.$showToast(data.msg);
						}
					})
				})
			},
			del(id){
				this.$showModal('是否删除？',()=>{
					let params = {
						cart_id: id,
						num: 0
					}
					this.$api('Cart/edit', params).then(data => {
						if (data.status == 1) {
							this.loadCart();
						} else {
							this.$showToast(data.msg);
						}
					})
				})
			},
			//计算总价
			countTotal() {
				/* this.totalPrice = 0;
				this.$showLoading();
				for (let m in this.cart) {
					let index = this.chooseItem.indexOf(this.cart[m].cart_id.toString());
					if (index != -1) {
						let singlePrice = (parseFloat(this.cart[m].product.discount_price) * parseInt(this.cart[m].num)).toFixed(2);
						this.totalPrice = (parseFloat(this.totalPrice) + parseFloat(singlePrice)).toFixed(2);
					}
				}
				this.$showHide(); */
			},
			checkboxGroupChange(e) {
				this.chooseItem = e.detail.value;
				this.countTotal();
			},
			blur(data) {
				this.changeNum(data.value, data.index);
			},
			plus(data) {
				this.changeNum(data.value, data.index);
			},
			minus(data) {
				this.changeNum(data.value, data.index);
			},
			//改变购物车数量
			changeNum(num, index) {
				let params = {
					cart_id: index,
					num: num
				}
				this.$api('Cart/edit', params).then(data => {
					if (data.status == 1) {
						this.countTotal();
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//加载购物车列表
			loadCart() {
				this.$api2('Cart/lists').then(data => {
					if (data.status == 1) {
						this.cart = data.data.cart;
						this.countTotal();
					} else {
						this.$showToast(data.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.cart-image {
		padding-right: 30rpx;
		width: 180rpx;

		.img {
			border-radius: 16rpx;
		}
	}

	.cart-name {
		flex: 1;

	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.sign-btn {
		width: 100%;
		padding: 20rpx 40rpx;
		background: linear-gradient(to left, #19be6b, #71d5a1);
		border-radius: 60rpx;
		color: #FFFFFF;
		font-size: 24rpx;
	}
</style>
