<template>
	<view>
		<u-sticky>
			<u-tabs active-color="#19be6b" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</u-sticky>
		<view v-if="current==0">
			<view v-for="(item,index) in fishList" :key="index" class="card default-window flex place">
				<view>
					<view class="bold">{{item.remark}}</view>
					<view class="u-font-sm u-tips-color">{{item.time}}</view>
				</view>
				<view class="bold u-font-32" :class="{'add-style':item.symbol=='+' , 'reduce-style':item.symbol=='-'}">
					{{item.symbol}}{{item.num}}
				</view>
			</view>
		</view>
		<view v-if="current==1">
			<view v-for="(item,index) in loveList" :key="index" class="card default-window flex place">
				<view>
					<view class="bold">{{item.remark}}</view>
					<view class="u-font-sm u-tips-color">{{item.time}}</view>
				</view>
				<view class="bold u-font-32" :class="{'add-style':item.symbol=='+' , 'reduce-style':item.symbol=='-'}">
					{{item.symbol}}{{item.num}}
				</view>
			</view>
		</view>
		<view v-if="current==2">
			<view v-for="(item,index) in redList" :key="index" class="card default-window flex place">
				<view>
					<view class="bold">{{item.remark}}</view>
					<view class="u-font-sm u-tips-color">{{item.time}}</view>
				</view>
				<view class="bold u-font-32" :class="{'add-style':item.symbol=='+' , 'reduce-style':item.symbol=='-'}">
					{{item.symbol}}{{item.num}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '鱼仔'
				}, {
					name: '爱心'
				}, {
					name: '红心'
				}],
				current: 0,
				fishList: [],
				loveList: [],
				redList: [],
			};
		},
		onLoad(data) {
			this.current = data.type || 0;
		},
		onReady() {
			this.loadLog();
		},
		methods: {
			change(index) {
				this.current = index;
			},
			loadLog() {
				this.$api('UbpLog/lists').then(data => {
					if (data.status == 1) {
						let logList = data.data.ubp_log_list;
						this.fishList = [];
						this.loveList = [];
						this.redList = [];
						for (let m in logList) {
							switch (logList[m].type) {
								case 1:
									this.fishList.push(logList[m]);
									break;
								case 2:
									this.loveList.push(logList[m]);
									break;
								default:
									this.redList.push(logList[m]);
									break;
							}
						}
					} else {
						this.$notify(data.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.add-style {
	        color: #4CD964;
	    }
	    .reduce-style {
	        color: #fa436a;
	    }
</style>
