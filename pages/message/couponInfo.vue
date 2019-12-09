<template>
	<view class="container">
		<view class="content">
			<view class="top-time">2019-10-28 10:21:33</view>
			<view class="item">
				<view class="top">优惠券到账提醒</view>
				<view class="center">您刚刚收到了一张5元优惠券，赶快去查看吧！</view>
				<view class="bottom">
					查看详情
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
				height: 70upx;
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
}
</style>
