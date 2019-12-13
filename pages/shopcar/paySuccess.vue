<template>
	<view class="paySuc">
		<image src="../../static/order/chenggong.png" mode=""></image>
		<view class="paySuc_msg">
			订单提交成功
		</view>
		<view class="paySuc_way">
			<text>支付方式:</text>
			<text>在线支付</text>
		</view>
		<view class="paySuc_money">
			<text>订单金额:</text>
			<text>{{'￥'+money}}</text>
		</view>
		<view class="paySuc_btn">
			<button class="lookOrder" @click="lookOrder">查看订单</button>
			<button class="lookMore" @click="look">去逛逛</button>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data(){
			return{
				money:'',
				id:''
			}
		},
		onLoad(option) {
			this.money = option.totalCount;
			this.id = option.id
		},
		methods:{
			// 查看已经完成的订单
			lookOrder(){
				uni.navigateTo({
					url:'../order/orderDetails?status=1&id='+this.id
				})
			},
			// 跳转到首页
			look(){
				uni.navigateTo({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.paySuc{
		// display: flex;
		// justify-content: center;
		padding-top: 80rpx;
		box-sizing: border-box;
		padding-left: 90rpx;
		padding-right: 90rpx;
		text-align: center;
		image{
			width: 100rpx;
			height: 100rpx;
			margin-bottom: 20rpx;
		}
		.paySuc_msg{
			font-size:32rpx;
			font-weight:bold;
			color:rgba(81,81,81,1);
			margin-bottom: 40rpx;
		}
		.paySuc_way,.paySuc_money{
			width: 213rpx;
			margin: 0 auto;
			font-size:24rpx;
			font-weight:500;
			color:rgba(81,81,81,1);
			line-height:36rpx;
			display: flex;
			justify-content: space-between;
		}
		.paySuc_btn{
			display: flex;
			justify-content: space-between;
			margin-top: 74rpx;
			button{
				width:255rpx;
				height:90rpx;
				border-radius:45rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size:30rpx;
			}
			.lookOrder{
				color: #303133;
				background: #fff;
				border:2px solid rgba(247,181,44,1);
			}			.lookMore{
				background: #F7B52C;
				color: #fff;
			}
		}
	}
</style>
