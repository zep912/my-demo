<template>
	<view class="statistic">

		<view class="sta-data">
			<image src="../../static/delivery/songdanbg.png" mode="" class="bg"></image>
			<view class="sta-bg-top">
				<text class="sta-bg-title sta-bgtitle">今日统计</text>
				<text class="sta-bg-title"><text class="sta-bg-num">66</text>单</text>
			</view>
			<view class="sta-bg-price">
				<view class="sta-bg-totalprice">
					<text>986</text>
					<text>订单总(元)</text>
				</view>
				<text style="width: 1px;height: 40rpx;background: #fff;"></text>
				<view>
					<text>986</text>
					<text>配送收益(元)</text>
				</view>
			</view>
		</view>
		<!-- 信息 -->
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">取单中</text>
			<text class="cell-tip cell-color">12单</text>
		</view>

		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">配送中</text>
			<text class="cell-tip cell-color">5单</text>

		</view>

		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">已送达</text>
			<text class="cell-tip cell-color">5单</text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">被转出</text>
			<text class="cell-tip cell-color">5单</text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50" style="margin-top: 10rpx;">
			<text class="cell-tit">订单总价</text>
			<text class="cell-tip cell-color">326523.0元</text>
		</view>
		<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50" style="margin-top: 10rpx;">
			<text class="cell-tit">配送收益</text>
			<text class="cell-tip cell-totalColor">565000元</text>
		</view>
		<!-- 底部 -->
		<view class="sta-foot">
			<view class="sta-footer">
				<view class="sta-footer-icon" :class="{active:staActice==1}" @click="preClick(1)">
					<van-icon name="arrow-left" />
					<text>前一天</text>
				</view>
				<text style="width: 1px;height: 40rpx;background: #D5D5D5;"></text>
				<view  class="sta-footer-icon" :class="{active:staActice==2}" @click="preClick(2)">
					<text style="margin-right: 24rpx;margin-top: -1px;">后一天</text>
					<van-icon name="arrow" />
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				staActice:1
			}
		},
		methods:{
			preClick(e){
				this.staActice = e;
			}
		}
	}
</script>

<style lang="scss">
	
	.sta-foot{
		width:100%;
		height:120rpx;
		background:rgba(255,255,255,1);
		position: fixed;
		left: 0;
		bottom: 0;
		.sta-footer{
			width: 64%;
			height: 100%;
			margin:  0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.sta-footer-icon{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size:28rpx;
				font-weight:bold;
				color:#838282;
			}
			text{
				margin-left: 24rpx;
			}
		}
	}
	.sta-data {
		width: 100%;
		height: 320rpx;
		position: relative;
		box-sizing: border-box;
		// padding-left: 50rpx;
		padding-top: 44rpx;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
		}

		.sta-bg-top {
			position: relative;
			padding-left: 50rpx;
			box-sizing: border-box;

			.sta-bg-title {
				display: block;
				color: rgba(255, 255, 255, 1);
				font-size: 24rpx;
			}

			.sta-bgtitle {
				font-size: 28rpx;
				font-weight: 500;
				margin-bottom: 20rpx;

			}

			.sta-bg-num {
				font-size: 50rpx;
				font-weight: 500;
				margin-right: 8rpx;
			}
		}

		.sta-bg-price {
			position: relative;
			width: 68%;
			margin: 0 auto;
			color: #fff;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 48rpx;

			text {
				display: block;
				text-align: center;
			}
		}
	}

	page {
		background: #F2F2F2;
	}

	.list-cell {
		display: flex;
		align-items: center;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}

		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			/* color: $font-color-dark; */
			color: #2A2A2A;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			/* color: $font-color-light; */
			color: #2A2A2A;
		}

		.cell-color {
			color: #F7B62C;
		}

		.cell-totalColor {
			color: #FF0000;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
	.sta-foot .sta-footer .active{
		color: #585858;
	}
</style>
