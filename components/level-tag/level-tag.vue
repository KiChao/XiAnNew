<template>
	<view>
		<text class="tag" :style="{backgroundColor:levelColor[level]}">
			{{ newText[level] }}
		</text>
	</view>
</template>

<script>
	export default {
		props: {
			level: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				levelColor: {
					0: '#888888',
					1: '#ff4444',
					2: '#1989fa',
					3: '#07c160',
					4: '#7232dd',
					10: '#f8b600',
					100: '#333333'
				},
				newText: {
					0: '游客',
					1: '渔夫',
					2: '十夫长',
					3: '五十夫长',
					4: '百夫长',
					10: '千夫长',
					100: '渔夫号'
				}
			};
		}
	}
</script>

<style lang="scss">
	.tag {
		font-size: 24rpx;
		color: #FFFFFF;
		padding: 4rpx 10rpx;
		border-radius: 6rpx;

	}
</style>
