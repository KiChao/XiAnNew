<template>
	<view>
		<image :src="articleDetail.main_cover" class="image" mode="widthFix"></image>
		<view class="default-window white">
			<view class="bold">
				{{articleDetail.title}}
			</view>
			<view class="u-font-sm u-tips-color">
				{{articleDetail.subtitle}}
			</view>
		</view>
		<navigator :url="`/pages/fisher/detail?loadId=${articleDetail.fisher_id}`" class="card flex default-window">
			<image :src="fisherDetail.headimgurl" mode="aspectFill" class="fisher-head"></image>
			<view class="name-window">
				<view>{{fisherDetail.nickname}}</view>
				<view class="u-tips-color u-font-sm">
					发布于：{{articleDetail.time}}
				</view>
			</view>
		</navigator>
		<view class="white default-window">
			<u-parse :html="articleDetail.content" :lazy-load="true" :show-with-animation="true" :selectable="true"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				loadId: null,
				articleDetail: {},
				fisherDetail: {},
			};
		},
		onShareAppMessage() {
			return {
				title: this.articleDetail.title,
				path: `/pages/article/detail?loadId=${this.articleDetail.article_id}&&sn=${uni.getStorageSync('sn')}`,
				imageUrl: this.articleDetail.main_cover,
			}
		},
		onLoad(data) {
			this.loadId = data.loadId;
			this.$store.commit('setSn', {
				ref_sn: data.sn
			})
		},
		onReady() {
			this.loadArticle();
		},
		methods: {
			//加载资讯内容
			loadArticle() {
				let params = {
					article_id: this.loadId
				};
				this.$api('Article/detail', params).then(data => {
					
					if (data.status == 1) {
						this.articleDetail = data.data.article;
						this.fisherDetail = data.data.fisher;
						uni.setNavigationBarTitle({
							title:this.articleDetail.title
						})
					} else {
						this.$showToast(data.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.fisher-head {
		width: 100rpx;
		height: 100rpx;
		display: block;
		border-radius: 50%;
	}

	.name-window {
		padding-left: 30rpx;
	}
</style>
