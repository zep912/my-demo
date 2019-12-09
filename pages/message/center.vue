<template>
	<view class="container">
		<view class="content-item" v-for="item in messageList" :key="item.type">
			<view class="left iconfont icon-youhui1" v-if="item.type === 1"></view>
			<view class="left iconfont icon-kefu" v-else-if="item.type === 2"></view>
			<view class="left iconfont icon-youhui" v-else-if="item.type === 3"></view>
			<view class="left iconfont icon-dingdan" v-else-if="item.type === 4"></view>
			<view class="left iconfont icon-xitong-copy" v-else></view>
			<view class="center">
				<view>{{item.title}}</view>
				<view class="bottom">{{item.content}}</view>
			</view>
			<view class="right">{{item.sendTime}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList: [
					{type: 1, title: '优惠促销', content: '促销内容促销内容，促销内容', hasread: false, sendTime: '23:30'},
					{type: 2, title: '客户咨询', content: '促销内容促销内容，促销内容', hasread: false, sendTime: '23:30'},
					{type: 3, title: '优惠券信息', content: '促销内容促销内容，促销内容', hasread: false, sendTime: '23:30'},
					{type: 4, title: '订单状态提醒', content: '促销内容促销内容，促销内容', hasread: false, sendTime: '23:30'},
					{type: 0, title: '系统消息', content: '促销内容促销内容，促销内容', hasread: false, sendTime: '23:30'},
				]
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding-top: 20upx;
		height: 100vh;
		background: #F2F2F2;
		.content-item {
			display: flex;
			padding: 30upx;
			margin-bottom: 10upx;
			background: #fff;
			.left, .right {
				width: 90upx;
				height: 90upx;
				line-height: 90upx;
			}
			.left {
				font-size: 40upx;
				text-align: center;
				background: #FD3E3E;
				border-radius: 20upx;
				color: #fff;
			}
			.icon-kefu {
				background: #F7B52C;
			}
			.icon-youhui {
				background: #FF8330;
			}
			.icon-dingdan {
				background: #ACACAC;
			}
			.center {
				flex: 1;
				padding: 20upx;
				color: #181818;
				font-size: 28upx;
				line-height: 15upx;
				.bottom {
					font-size: 24upx;
					color: #9f9f9f;
					margin-top: 20upx;
				}
			}
			.right {
				color: #9F9F9F;
				font-size: 20upx;
				text-align: right;
			}
		}
	}
</style>
