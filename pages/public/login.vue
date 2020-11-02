<template>
	<view>
		<view class="flex around">
			<view style="width: 200rpx;padding: 100rpx 0;">
				<image src="/static/logo.png" mode="widthFix" class="image"></image>
			</view>
		</view>

		<view class="flex default-window" style="justify-content: space-around">
			<view style="width: 400rpx;">
				<button @getuserinfo="wxLogin" open-type="getUserInfo" class="login-btn">
					微信登录
				</button>
			</view>
		</view>
		<view @click="quxiao" class="default-window u-text-center">
			取消登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			ref_sn() {
				return this.$store.state.login.ref_sn
			}
		},
		methods: {
			quxiao() {
				uni.navigateBack({

				})
			},
			//微信登录
			wxLogin(e) {
				this.$showLoading()
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						wx.getUserInfo({
							success(res) {
								let params = {
									nickname: res.userInfo.nickName,
									headimgurl: res.userInfo.avatarUrl,
									code: code,
									sn: that.ref_sn,
									type: 1,
									rawData: res.rawData,
									iv: res.iv,
									encryptedData: res.encryptedData
								}
								that.$api('login/wx_mini_login', params).then(data => {
									if (data.status == 1) {
										uni.setStorageSync('token', data.token);
										uni.setStorageSync('sn', data.sn);
										uni.navigateBack({

										})
										that.$showHide();
									} else {
										that.$showToast(data.msg);
									}
									
								})
							},
							fail() {
								that.$showHide()
							}
						})
					},
					fail: function(res) {
						that.$showHide()
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.login-btn {
		background: linear-gradient(to left, #19be6b 0, #18b566 100%);
		color: #FFFFFF;
		border-radius: 60rpx;
		width: 400rpx;
		margin-top: 40rpx;
	}
</style>
