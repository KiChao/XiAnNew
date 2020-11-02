<template>
	<view>
		<view class="default-window">
			<view class="title">输入短信验证码</view>
			<view class="number"><text class="u-tips-color">验证码已发送至</text><text class="font-green">(+86) {{phone}}</text></view>
		</view>
		<view style="padding: 100rpx 0;">
			<u-message-input active-color="#19be6b" :maxlength="6" mode="bottomLine" @finish="bind"></u-message-input>
		</view>
		<view class="u-text-center u-font-sm u-tips-color">
			未收到验证码？
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				captcha: ''
			};
		},
		onLoad(data) {
			this.phone = data.phone;
		},
		methods: {
			//绑定手机
			bind(e) {
				this.$showLoading('绑定中');
				let params = {
					phone: this.phone,
					captcha: e
				}
				this.$api('UserCenter/certificate', params).then(data => {
					if (data.status == 1) {
						this.$showHide();
						uni.switchTab({
							url: '/pages/index/index'
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
