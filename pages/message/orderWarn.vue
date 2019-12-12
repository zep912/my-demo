<template>
	<view class="container">
		<view class="content">
			<view class="top-time">2019-10-28 10:21:33</view>
			<view class="item">
				<view class="top">订单未支付</view>
				<view class="center">您有1笔未支付订单即将失效，再晚一点就被别人抢走啦， 快去看看吧！</view>
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
}
</style>
