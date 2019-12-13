<template>
	<view class="container" v-if="messageList.length">
		<view class="content" v-for="item in messageList" :key="item.id">
			<view class="top-time">{{item.sendTime}}</view>
			<view class="item">
				<view class="top">{{item.title}}</view>
				<view class="center">{{item.content}}</view>
				<view class="bottom">
					查看详情
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
		</view>
	</view>
	<view class="container" v-else>
		<view class="null-class">
			<view class="iconfont icon-zanwuxiaoxi"></view>
			<view>您还没有任何消息，看看其他的吧</view>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				messageList: []
			};
		},
		onShow() {
			this.list();
		},
		methods: {
			list() {
				axios.post('/message/list', {type: 4}).then(({data}) => {
					if (data.code === 200) {
						if (data.data.length) this.messageList = data.data;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.container {
	padding: 20upx;
	height: 100vh;
	background: #F2F2F2;
	.content {
		.top-time {
			font-size: 24upx;
			color: #9F9F9F;
			text-align: center;
			line-height: 60upx;
		}
		.item {
			padding: 20upx 30upx;
			background: #fff;
			font-size: 28upx;
			border-radius: 20upx;
			line-height: 40upx;
			.center {
				font-size: 24upx;
				color: #787878;
				height: 90upx;
			}
			.bottom {
				border-top: 2upx solid #f2f2f2;
				font-size: 20upx;
				color: #B0B0B0;
				padding-top: 20upx;
				.icon-gengduo {
					float: right;
				}
			}
		}
	}
	.null-class {
		color: #C9C9C9;
		text-align: center;
		margin-top: 40%;
		.iconfont {
			font-size: 140upx;
			margin-bottom: 80upx;
		}
	}
}
</style>
