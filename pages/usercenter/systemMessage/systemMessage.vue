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
				system: [],
				page: 0
			};
		},
		onReachBottom() {
			this.loadSystemMessage();
		},
		onReady() {
			this.loadSystemMessage();
		},
		methods: {
			//加载消息中心
			loadSystemMessage() {
				this.page = this.page + 1;
				let params = {
					page: this.page
				}
				this.$api('Sysmsg/index', params).then(data => {
					if (data.status == 1) {
						let list = data.data.sysmsg_list;
						for (let m in list) {
							this.system.push(list[m]);
						}
						// this.system = data.data.sysmsg_list;
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
