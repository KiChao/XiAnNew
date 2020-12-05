<template>
	<view>
		<image @click="check" class="image" mode="widthFix" :src="poster"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				poster: ''
			};
		},
		onReady() {
			this.getPoster();
		},
		methods: {
			getPoster() {
				this.$showLoading('加载中');
				let params = {
					type: 1
				}
				this.$api('UserCenter/mini_qrcode', params).then(data => {
					if (data.status == 1) {
						this.poster = data.data.qrcode;
						this.$showHide()
					} else {
						this.$showHide()
						this.$showToast(data.msg);
					}
				});
			},
			check() {
				// 预览图片
				let that = this;
				uni.previewImage({
					urls: [that.poster],

				});
			}
		}
	}
</script>

<style lang="scss">

</style>
