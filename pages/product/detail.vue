<template>
	<view>
		<swiper indicator-dots class="swpier">
			<swiper-item v-for="(item,index) in productInfo.img_list" :key="index">
				<image :src="item.url" class="image" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="default-window white">
			<view class="product-name">{{productInfo.name||''}}</view>
			<view class="u-font-12 u-tips-color">{{productInfo.subtitle||''}}</view>
			<u-gap height="16"></u-gap>
			<view class="flex">
				<view class="price"><text class="u-font-12">{{productInfo.product_type==1?'¥':'鱼仔'}}</text>{{productInfo.discount_price||''}}</view>
				<view class="origal-price">￥{{productInfo.original_price||''}}</view>
			</view>
			<u-gap height="16"></u-gap>
			<view class="flex" v-if="productInfo.product_type==2 && productInfo.limit_lv>0">
				<level-tag :level="productInfo.limit_lv"></level-tag><text style="margin-left: 10rpx;">以上的用户可兑换</text>
			</view>
			<view class="flex" v-if="productInfo.product_type==1">
				<level-tag :level="userLv"></level-tag><text style="margin-left: 10rpx;">专享价</text>
			</view>
			<u-gap height="16"></u-gap>
			<view class="flex flexwarp">
				<view v-for="(label,tip) in productInfo.labelList" :key="tip" class="tag-item">
					<u-tag :text="label" mode="dark" shape="circle" type="success"></u-tag>
				</view>
			</view>
			<u-gap height="16"></u-gap>
			<view class="flex place u-font-12 u-tips-color">
				<view>销量：{{productInfo.sv_total_num||0}}</view>
				<view>库存：{{productInfo.stock||0}}</view>
				<view>重量：{{productInfo.weight||0}}kg</view>
			</view>
		</view>
		<u-gap height="16"></u-gap>
		<view @click="openMini" class="default-window white"><text>该商品由</text><text class="font-green">{{productInfo.fisher_info.nickname}}</text><text>{{productInfo.product_type==1?'提供':'赞助'}}，</text><text
			 class="font-green">{{productInfo.fisher_info.nickname}}</text><text>发货并提供售后服务。</text></view>
		<u-gap height="16"></u-gap>
		<view class="default-window white flex place">
			<view class="u-font-24" style="width: 130rpx;">邮费</view>
			<view class="u-font-12 u-tips-color">
				{{freight_tpl.name}}
			</view>
		</view>
		<view @click="skuShow=true;" class="default-window white flex place">
			<view class="u-font-24" style="width: 130rpx;">购买类型</view>
			<view>
				<u-icon name="arrow-right" size="24"></u-icon>
			</view>
		</view>
		<view class="default-window white flex">
			<view style="width: 130rpx;" class="u-font-24">服务</view>
			<view style="flex: 1;">
				<view class="flex around u-tips-color u-font-26">
					<text>急速发货</text>
					<text>正品保证</text>
					<text>价廉物美</text>
				</view>
			</view>
		</view>
		<u-gap height="16"></u-gap>
		<view class="detail-desc">

			<view class="default-window">
				<u-parse :html="productInfo.description"></u-parse>
			</view>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<u-icon size="40" name="home"></u-icon>
				<text>首页</text>
			</navigator>
			<view @click="callService" class="p-b-btn">
				<u-icon size="40" name="kefu-ermai"></u-icon>
				<text>客服</text>
			</view>
			<navigator url="/pages/cart/cart" hover-class="none" class="p-b-btn" style="position: relative;">
				<u-icon size="40" name="shopping-cart"></u-icon>
				<text>购物车</text>
				<u-badge type="error" :count="cartNum" size="mini" :offset="[-10,0]"></u-badge>
			</navigator>
			<view class="action-btn-group">
				<view v-if="productInfo.product_type==1" style="width: 180upx;" @click="skuShow=true;type='cart'" type="primary"
				 class=" action-btn  cart-btn ">加入购物车</view>
				<view v-if="productInfo.product_type==1" style="width: 180upx;" @click="skuShow=true;type='buy'" type="primary"
				 class=" action-btn buy-btn ">立即购买</view>
				<view v-if="productInfo.product_type==2" style="width: 360upx;" @click="skuShow=true;type='buy'" type="primary"
				 class=" action-btn buy-btn ">立即兑换</view>
			</view>
		</view>
		<u-popup :closeable="true" mode="bottom" v-model="skuShow">
			<view class="flex sku-window default-window">
				<image :src="productInfo.img_list[0].url" class="sku-image" mode="widthFix"></image>
				<view class="right" style="flex: 1;">
					<text>{{productInfo.name}}</text>
					<text class="price">{{productInfo.product_type==1?'¥':'鱼仔'}}{{skuPrice||productInfo.discount_price}}</text>
					<text class="stock">库存：{{skuStock||productInfo.stock}}件</text>
				</view>
			</view>
			<view class="default-window">
				<view v-for="(item,index) in skuArray" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(sku, skuIndex) in item.sku_value" :key="skuIndex" class="tit" :class="{selected: hasChooseSku[index]==skuIndex}"
						 @tap="chooseSku(index,skuIndex)">
							{{sku.name}}
						</text>
					</view>
				</view>
			</view>
			<view class="default-window flex place">
				<view>数量</view>
				<view>
					<u-number-box v-model="num" :min="1"></u-number-box>
				</view>
			</view>
			<view class="default-window">
				<u-button @click="sattlement" :type="type=='buy'?'success':'warning'" shape="circle">{{type=='buy'?'立即购买':'加入购物车'}}</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skuShow: false,
				loadId: '',
				productInfo: {

					fisher_info: {},
					img_list: [{
						url: ''
					}]
				},
				userLv: 0,
				num: 1,
				//显示的规格列表
				skuArray: [],
				//存放已经选择的规格
				hasChooseSku: [],
				//存放价格列表
				priceInfo: {},
				//是否选择完了规格
				isChooseSku: false,
				//该规格下的价格
				skuPrice: '',
				skuNeedPoint: '',
				skuStock: '',

				paySkuInfo: {
					skuArray: '',
					skuTexy: '',
				},
				type: 'buy',
				freight_tpl: {
					name: ''
				},
				cartNum: 0,
			};
		},
		onLoad(data) {
			this.loadId = data.loadId;
			if (data.sn) {
				this.$store.commit('setSn', {
					ref_sn: data.sn
				})
			} else {
				console.log('无sn')
			}
		},
		onReady() {
			this.loadProduct();
			this.getCartNum();
		},
		onShareTimeline() {
			return {
				title: this.productInfo.name,
				path: `/pages/product/detail?loadId=${this.productInfo.product_id}&&sn=${uni.getStorageSync('sn')}`,
			}
		},
		onShareAppMessage() {
			return {
				title: this.productInfo.name,
				path: `/pages/product/detail?loadId=${this.productInfo.product_id}&&sn=${uni.getStorageSync('sn')}`,
				imageUrl: this.productInfo.img_list[0].url,
			}
		},
		methods: {
			//获取购物车数量
			getCartNum() {
				this.$api('Cart/num').then(data => {
					if (data.status == 1) {
						this.cartNum = data.data.num;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//拨打客服电话
			callService() {
				let that = this;
				uni.makePhoneCall({
					phoneNumber: that.productInfo.fisher_info.service_phone
				})
			},
			openMini() {
				let id = this.productInfo.fisher_id;
				wx.navigateToMiniProgram({
					appId: 'wx55b0503ceeb1e360',
					path: '/pages/fisher/detail?loadId=' + id,
				})
			},
			goSubmit() {
				uni.navigateTo({
					url: '/pages/product/settlement'
				})
			},
			//加载商品信息
			loadProduct() {
				let params = {
					product_id: this.loadId,
				};
				this.$api('Product/detail', params).then(data => {
					if (data.status == 1) {
						this.productInfo = data.data.product;
						this.skuArray = data.data.sku;
						this.provider = data.data.provider;
						this.priceInfo = data.data.product_detail;
						this.freight_tpl = data.data.freight_tpl;
						this.userLv = data.data.lv;
						let temp = this.productInfo.tag;
						if (temp) {
							this.productInfo.labelList = temp.split(',');
						} else {
							this.productInfo.labelList = [];
						}
						if (!this.skuArray) {
							this.isChooseSku = true;
						}
						uni.setNavigationBarTitle({
							title: this.productInfo.name
						});
					} else {
						this.$showToast(data.msg);
						setTimeout(() => {
							uni.navigateBack({

							})
						}, 1000)
					}
				})
			},
			//选择规格
			chooseSku(index, skuIndex) {
				this.isChooseSku = false;
				this.$set(this.hasChooseSku, index, skuIndex);
				//加载价格
				let temp = this.hasChooseSku.join('_');
				this.paySkuInfo.skuArray = temp;
				
				for (let m in this.priceInfo) {
					
					if (temp == this.priceInfo[m].sku_value_array) {
						this.isChooseSku = true;
						this.skuPrice = this.priceInfo[m].discount_price;
						this.skuStock = this.priceInfo[m].stock;
						this.skuNeedPoint = this.priceInfo[m].need_point;
						
					}
				}
			},
			sattlement() {

				if (!this.isChooseSku) {
					this.$showToast('请先选择规格');
					return;
				}
				let type = this.type == 'buy' ? 1 : 2;
				let params = {
					product_id: this.productInfo.product_id,
					num: this.num,
					sku_array: this.paySkuInfo.skuArray,
					type: type
				};
				this.$api('Product/check', params).then(data => {
					if (data.status == 1) {
						if (type == 1) {
							let skuId = '';
							if (this.priceInfo) {
								for(let m in this.priceInfo){
									if(this.priceInfo[m].sku_value_array==this.paySkuInfo.skuArray){
										skuId=this.priceInfo[m].product_detail_id
									}
								}
								// skuId = this.priceInfo[this.paySkuInfo.skuArray].product_detail_id;
							}
							console.log(skuId)
							this.$store.commit('chooseProduct', {
								product: this.productInfo,
								num: this.num,
								sku: this.paySkuInfo,
								skuId: skuId,
							})
							uni.navigateTo({
								url: '/pages/product/settlement'
							})
						} else {
							this.skuShow = false;
							this.$showToast('已成功加入购物车');
							this.getCartNum();
						}

					} else {
						this.$showToast(data.msg);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.sku-window {
		align-items: flex-start;

		.sku-image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 8rpx;
			z-index: 100;
		}

		.right {
			display: flex;
			flex-direction: column;
			padding: 0 30rpx;
			font-size: 28rpx;
			line-height: 42rpx;

			.price {
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}

			.selected-text {
				margin-right: 10rpx;
			}
		}


	}

	.attr-list {
		display: flex;
		flex-direction: column;
		font-size: 26rpx;

	}

	.item-list {
		padding: 20upx 0 0;
		display: flex;
		flex-wrap: wrap;

		text {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			margin-right: 20upx;
			margin-bottom: 20upx;
			border-radius: 100upx;
			min-width: 60upx;
			height: 60upx;
			padding: 0 20upx;
			font-size: 24rpx;

		}

		.selected {
			background: $u-type-success-light;
			color: $u-type-success;

		}
	}

	.swpier {
		width: 100%;
		height: 100vw;
	}

	.product-name {
		font-size: 34rpx;
		font-weight: bold;
	}

	.price {
		font-size: 44rpx;
		color: $u-type-error;
	}

	.origal-price {
		text-decoration: line-through;
		margin-left: 20rpx;
		color: #808080;
	}

	.detail-desc {
		background: #fff;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;


			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;

			}

			&.active,
			&.active .yticon {}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			color: #FFFFFF;



			margin-left: 20upx;
			position: relative;

			/* &:after {
					content: '';
					position: absolute;
					top: 50%;
					right: 50%;
					transform: translateY(-50%);
					height: 28upx;
					width: 0;
					border-right: 1px solid rgba(255, 255, 255, .5);
				} */
			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;

				height: 100%;
				font-size: 26rpx;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}

			.buy-btn {
				background: linear-gradient(to right, #19be6b, #18b566);
			}

			.cart-btn {
				background: linear-gradient(to right, #ff9900, #f29100);
			}

			.no-border {
				border: none;
			}
		}
	}

	.tag-item {
		margin-right: 10rpx;
	}
</style>
