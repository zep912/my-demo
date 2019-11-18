<template>
	<div>
		<view class="aboutus">
			<view class="about-logo">
				<img src="/static/aboutus.png" alt="">
			</view>
			<view class="about-edition">
				V3.0
			</view>
			<view class="about-compeny">
				<view>麦田圈有限公司</view>
				<view>C2016-2026</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang='scss'>
	page {
		background: #F2F2F2;
		padding-top: 94rpx;
	}
	.aboutus{
		.about-logo img{
			width:183rpx;
			height:216rpx;
			margin: 0 auto;
			/* margin-top: 94rpx; */
			display: block;
			position: relative;
		}
		.about-edition{
			font-size:24rpx;
			font-weight:500;
			color:rgba(180,180,180,1);
			margin-top: 72rpx;
			text-align: center;
		}
		.about-compeny{
			position: absolute; 
			left:0;
			bottom:50rpx;
			font-size:24rpx;
			font-weight:500;
			text-align: center;
			width: 100%;
			color:rgba(180,180,180,1);	
		}
	}
</style>