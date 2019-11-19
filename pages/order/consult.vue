<template>
	<view class="consult">
		<view class="consult-business">
			<img src="../../static/shop.png" alt="">
			<view class="consult-right">
				<view class="consult-shop">
					<text class="consult-shopName">麦田圈官方旗舰店</text>
					<text class="time">2019-11-04 11:11:00</text>
				</view>
				<view class="consult-refund">
					<text>卖家已经同意退款</text>
					<text>退款成功</text>
				</view>
			</view>
		</view>
		<!-- 用户 -->
		<view class="consult-user consult-business">
			<img src="../../static/userImg.png" alt="">
			<view class="consult-userImg consult-right">
				
				<view class="consult-userName consult-shop" >
					<text class="consult-shopName">快乐风男</text>
					<text class="time">2019-11-04 11:11:00</text>
				</view>
				<view class="userMsg">
					<text class="userBlock">
						买家(快乐风男)与2019-11-04 11:11:00创建了退款申请
					</text>
					<text class="userBlock">退款类型：<text>仅退款</text></text>
					<text class="userBlock">退款金额：<text>¥120.00</text></text>
					<text class="userBlock">退款原因：<text>我不想要了</text></text>
					<text class="userBlock">退款描述：<text>描述1</text></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	page{
		background: #E3E3E3;
	}
.consult-business{
	width:100%;
	height:310rpx;
	background:rgba(255,255,255,1);
	box-sizing: border-box;
	padding-left: 20rpx;
	padding-top: 44rpx;
	border-top: 1px solid #E3E3E3;
	display: flex;
	justify-content: flex-start;
	img{
		width:34rpx;
		height:32rpx;
		margin-right: 35rpx;
	}
	.consult-right{
		width: 100%;
		.consult-shop{
			border-bottom: 1px solid #E3E3E3;
			padding-bottom: 40rpx;
			margin-bottom: 36rpx;
			text{
				display: block;
			}
			.consult-shopName{
				font-size:28rpx;
				font-weight:600;
				color:rgba(69,69,69,1);
				line-height:16rpx;
				margin-bottom: 15rpx;
			}
		}
		.consult-refund{
			text{
				display: block;
				font-size:24rpx;
				font-weight:500;
				color:rgba(84,84,84,1);
				line-height: 48rpx;
			}
			text:before{
				content: '';
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				background: #E3E3E3;
				margin-right: 18rpx;
				vertical-align: middle;
				display: inline-block;
			}
		}
	}
}
.time{
	font-size:22rpx;
	font-weight:500;
	color:rgba(84,84,84,1);
}
.consult-user{
	margin-top: 10rpx;
	border-top: 0;
	height: auto;
	padding-bottom:36rpx;
	img{
		width: 50rpx;
		height: 50rpx;
	}
}
.userMsg text{
	font-size:24rpx;
	font-weight:500;
	color:rgba(84,84,84,1);
	line-height:40rpx;
	
}
.userMsg .userBlock{
	display: block;
}
</style>
