<template>
	<view>
		<view class="flex">
			<view style="flex: 1;">
				<view class="card">
					<button open-type="contact" class="btn-window" style="line-height: 1.8;padding: 60rpx 20rpx;">
						<view class="flex" style="justify-content: space-around;">
							<view style="width: 100rpx;">
								<image src="/static/usercenter/weixin.png" mode="widthFix" style="width: 100rpx;height: 100rpx;"></image>
								<view><text>微信</text></view>
							</view>
						</view>
						<view class="u-text-center">
							<text style="font-size: 24rpx;color: #999999;">通过微信官方号联系</text>
						</view>
					</button>
				</view>
			</view>
			<view style="flex: 1;">
				<view class="card">
					<button @click="callCustomer" class="btn-window" style="line-height: 1.8;padding: 60rpx 20rpx;">
						<view class="flex" style="justify-content: space-around;">
							<view style="width: 100rpx;">
								<image src="/static/usercenter/dianhua.png" mode="widthFix" style="width: 100rpx;height: 100rpx;"></image>
								<view><text>电话</text></view>
							</view>
						</view>
						<view class="u-text-center">
							<text style="font-size: 24rpx;color: #999999;">时效快，推荐使用</text>
						</view>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			//拨打客服电话
			callCustomer() {
				uni.makePhoneCall({
					phoneNumber: '18088674189' //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-window {
		background-color: #FFFFFF;
		border: none;
	}
</style>
