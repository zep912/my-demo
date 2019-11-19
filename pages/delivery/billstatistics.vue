<template>
	<view class="bill">
		<view class="bill-box">
			<view class="bill-box-info">
				<view class="bill-box--letop borderritop" style="border-bottom: 1px solid #EDEDED;border-right: 1px solid #EDEDED;">
					<text class="bill-price block"><text class="bill-color">66.00</text>元</text>
					<text class="block bill-price-title">累计收入</text>
				</view>
				<view class="bill-box--letop" style="border-bottom: 1px solid #EDEDED;">
					<text class="bill-price block"><text class="bill-color">66.00</text>元</text>
					<text class="block bill-price-title">当月收入</text>
				</view>
				<view class="bill-box--letop" style="border-right: 1px solid #EDEDED;">
					<text class="bill-price block"><text class="bill-color">66.00</text>元</text>
					<text class="block bill-price-title">当月所有提现</text>
				</view>
				<view class="bill-box--letop borderletop">
					<text class="bill-price block"><text class="bill-color">66.00</text>元</text>
					<text class="block bill-price-title">累计实际提现</text>
				</view>
			</view>
		</view>
		<view class="bill-list">
			<view class="bill-list-box">
				<view class="bill-list-title">
					<text class="bill-list-shop">麦田圈配送收益(订单配送)</text>
					<text class="bill-list-time">11-14 14:05</text>
				</view>
				<view class="bill-list-number">
					<text>相当单号：<text>56465654654646654</text></text>
					<text class="bill-list-price">+<text>5.00</text>元</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.bill-box {
		background: #f2f2f2;
		padding-top: 16rpx;
		padding-bottom: 16rpx;

		.bill-box-info {
			width: 92%;
			margin: 0 auto;
			height: 320rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 30rpx;

			// display: table;	
			.bill-box--letop {
				width: 50%;
				height: 50%;
				box-sizing: border-box;
				text-align: center;
				float: left;
				padding-top: 7%;

				.block {
					display: block;
				}

				.bill-price {
					font-size: 28rpx;
					font-weight: 500;
					color: rgba(255, 0, 0, 1);
				}

				.bill-price-title {
					font-size: 24rpx;
					font-weight: 500;
					color: #393939;
				}
			}
		}
	}

	.bill-list {
		padding-left: 20rpx;
		.bill-list-box{
			width: 100%;
			padding-right: 30rpx;
			padding-top: 32rpx;
		}
		.bill-list-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 26rpx;
			.bill-list-shop{
				font-size:26rpx;
				font-weight:400;
				color:rgba(88,88,88,1);
			}
			.bill-list-time{
				font-size:24rpx;
				font-weight:400;
				color:rgba(185,185,185,1);
			}
		}

		.bill-list-number {
			border-bottom: 1px solid #EDEDED;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 32rpx;
			font-size:24rpx;
			font-weight:400;
			color:rgba(185,185,185,1);
			.bill-list-price{
				font-size:26rpx;
				font-weight:400;
				color:rgba(255,0,0,1);
			}
		}
	}
</style>
