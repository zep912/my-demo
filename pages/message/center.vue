<template>
	<view class="container">
		<view class="content-item" v-for="item in messageList" :key="item.messageType" @click="goto(item.messageType)">
			<view class="left iconfont icon-youhui1" v-if="item.messageType === 1"></view>
			<view class="left iconfont icon-kefu" v-else-if="item.messageType === 2"></view>
			<view class="left iconfont icon-youhui" v-else-if="item.messageType === 3"></view>
			<view class="left iconfont icon-dingdan" v-else-if="item.messageType === 4"></view>
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
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				messageList: [
					{messageType: 1, title: '优惠促销', content: '暂无促销相关消息', hasread: false, sendTime: '23:30'},
					{messageType: 2, title: '客户咨询', content: '暂无客服咨询类消息', hasread: false, sendTime: '23:30'},
					{messageType: 3, title: '优惠券信息', content: '暂无优惠券消息', hasread: false, sendTime: '23:30'},
					{messageType: 4, title: '订单状态提醒', content: '暂无订单状态提醒', hasread: false, sendTime: '23:30'},
					{messageType: 0, title: '系统消息', content: '暂无系统消息', hasread: false, sendTime: '23:30'},
				]
			}
		},
		onShow() {
			this.list();	
		},
		methods: {
			goto(type) {
				if (type === 3) {
					uni.navigateTo({
						url: '/pages/message/couponInfo'
					})
				} else if (type === 4) {
					uni.navigateTo({
						url: '/pages/message/orderWarn'
					})
				}
			},
			list() {
				const titleList = ['系统消息', '优惠促销', '客户咨询', '优惠券信息', '订单状态提醒'];
				axios.post('/message/newMessage', {}).then(({data}) => {
					if (data.code === 200) {
						if (data.data.length) {
							this.messageList = this.messageList.map(item => {
								let findIndex = data.data.findIndex(val => val.messageType === item.messageType);
								if (findIndex > -1) {
									item = Object.assign(item, data.data[findIndex]);
								}
								return item;
							});
							
						}
					}
				});
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
				padding: 10upx 20upx;
				color: #181818;
				font-size: 28upx;
				line-height: 24upx;
				.bottom {
					font-size: 20upx;
					color: #9f9f9f;
					margin-top: 16upx;
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
