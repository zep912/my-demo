<template>
	<view class="mobile container">
		<view class="mobile-box">
			<text>请输入{{mobile}}收到的短信验证码</text>
		</view>
		<view class="mobile-code">
			<input type="text" value="" placeholder="请输入短信验证码" class="mobile-input"  placeholder-class="input-placeholder"/>
			<button type="primary" @click="getCode" class="getCode">获取验证码</button>
		</view>
		<view class="mobile-next">
			<button type="primary" size="large" @click="next" class="mobile-next-btn">下一步</button>
		</view>
		<view class="mobile-lose">
			<text>*若当前号码已不用/丢失，或无法收到验证码？</text>
			<text>请联系客服<text class="mobile-lose-kf">400-606-0061</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				mobile:'132****0986'
			}
		},
		onLoad() {
			
		},
		methods:{
			// 下一步
			next(){
				uni.navigateTo({
					url: '../bindmobile/bindmobile',
				});
			},
			// 获取验证码
			getCode(){
				
			}
	},
	}
</script>

<style  lang='scss'>
	page {
		background: $page-color-base;
		padding-top: 60rpx;
	}
.mobile{
	width: 90%;
	margin: 0 auto;
	.mobile-box{
		/* margin-top: 60rpx; */
		margin-bottom: 59rpx;
		font-size:28rpx;
		font-weight:bold;
		color:rgba(42,42,42,1)
	}
	.input-placeholder{
		color:rgba(179,179,179,1);;
	}
	.mobile-code{
		overflow: hidden;
	}
	.mobile-input{
		width:398rpx;
		height:89rpx;
		background:rgba(255,255,255,1);
		border-radius:18rpx;
		float: left;
		box-sizing: border-box;
		padding-left: 25rpx;
		color:rgba(179,179,179,1);
		font-size: 32rpx;
	}
	
	.getCode{
		width:250rpx;
		height:89rpx;
		background:rgba(247,182,44,1);
		border-radius:18rpx;
		margin-left: 20rpx;
		float: left;
	}
	.mobile-next-btn{
		margin-top: 89rpx;
		width: 100%;
		background:rgba(247,182,44,1);
		/* border:2px solid rgba(247,181,44,1); */
		border-radius:45rpx;
	}
	.mobile-lose{
		margin-top: 88rpx;
		font-size:24rpx;
		font-weight:500;
		color:rgba(180,180,180,1);
		width:510rpx;
		.mobile-lose-kf{
			color:rgba(247,182,44,1) ;
		}
	}
	
}
</style>
