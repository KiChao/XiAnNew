<template>
	<view>
		<view class="u-padding-60" v-if="system.length==0">
			<u-empty></u-empty>
		</view>
		<view v-for="(item,index) in system" :key="index" class="card default-window flex">
			<view>
				<u-icon name="info-circle" size="34"></u-icon>
			</view>
			<view class="message">
				<view class="bold">{{item.content}}</view>
				<view class="u-font-sm u-tips-color">{{item.time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				system: []
			};
		},
		onReady() {
			this.loadSystemMessage();
		},
		methods: {
			//加载消息中心
			loadSystemMessage() {
				this.$api('Sysmsg/index').then(data => {
					if (data.status == 1) {
						this.system = data.data.sysmsg_list;
					} else {
						this.$showToast(data.msg);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.message {
		padding-left: 30rpx;
	}
</style>
