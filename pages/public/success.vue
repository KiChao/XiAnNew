<template>
	<view>
		<view class="white" style="padding: 100rpx 0;">
			<view class="flex around">
				<image src="/static/icon/success.png" mode="widthFix" style="width: 180rpx;height: 180rpx;display: block;"></image>
			</view>
			<view style="font-size: 34rpx;" class="default-window u-text-center">
				付款成功
			</view>
			<view class="u-text-center u-font-sm u-tips-color">
				可以前往个人中心查看订单
			</view>
			<view style="margin-top: 20rpx;" class="flex around">
				<view style="width: 500rpx;" class="flex around default-window">
					<navigator open-type="switchTab" url="/pages/usercenter/usercenter" hover-class="none" class="btn">查看订单</navigator>
					<navigator open-type="switchTab" url="/pages/index/index" hover-class="none" class="btn">返回首页</navigator>
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
		}
	}
</script>

<style lang="scss">
	.btn {
		padding: 10rpx 20rpx;
		border: 2rpx solid $u-tips-color;
		color: $u-tips-color;
		border-radius: 10rpx;
	}
</style>
