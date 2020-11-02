<template>
	<view>
		<view class="default-window">
			<view class="title">绑定手机号码</view>
			<view class="number"><text class="u-tips-color">发布车单需绑定手机号码并进行实名认证</text></view>
		</view>
		<view class="flex place default-window">
			<view>手机号码</view>
			<view style="flex: 1;padding-left: 30rpx;">
				<u-input v-model="mobile" placeholder="请输入手机号码" type="number" />
			</view>
		</view>
		<view class="default-window">
			<u-button @click="nextStep" type="success">下一步</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: ''
			};
		},
		methods: {
			nextStep() {
				if (this.mobile.length == '') {
					this.$showToast('请输入手机号码');
					return
				}
				let params = {
					phone: this.mobile
				}
				this.$api('Sms/send_captcha', params).then(data => {
					if (data.status == 1) {
						uni.navigateTo({
							url: '/pages/public/bind?phone=' + this.mobile
						})
					} else {
						this.$showToast(data.msg);
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.title {
		font-size: 60rpx;
		padding-bottom: 40rpx;
		padding-top: 100rpx;
	}

	.number {
		font-size: 28rpx;
	}
</style>
