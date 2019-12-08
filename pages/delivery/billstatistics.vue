<template>
	<view class="bill">
		<view class="bill-box">
			<view class="bill-box-info">
				<view class="bill-box--letop borderritop" style="border-bottom: 1px solid #EDEDED;border-right: 1px solid #EDEDED;">
					<text class="bill-price block"><text class="bill-color">{{form.totalAmount}}</text>元</text>
					<text class="block bill-price-title">累计收入</text>
				</view>
				<view class="bill-box--letop" style="border-bottom: 1px solid #EDEDED;">
					<text class="bill-price block"><text class="bill-color">{{form.monthAmount}}</text>元</text>
					<text class="block bill-price-title">当月收入</text>
				</view>
				<view class="bill-box--letop" style="border-right: 1px solid #EDEDED;">
					<text class="bill-price block"><text class="bill-color">{{form.totalactulAmount}}</text>元</text>
					<text class="block bill-price-title">当月所有提现</text>
				</view>
				<view class="bill-box--letop borderletop">
					<text class="bill-price block"><text class="bill-color">{{form.totalAmount}}</text>元</text>
					<text class="block bill-price-title">累计实际提现</text>
				</view>
			</view>
		</view>
		<view class="bill-list">
			<view class="bill-list-box" v-for='(item,index) in list.incomeList'>
				<view class="bill-list-title">
					<text class="bill-list-shop">{{item.incomeName}}</text>
					<text class="bill-list-time">{{item.createTime}}</text>
				</view>
				<view class="bill-list-number">
					<text>相当单号：<text>{{item.orderId}}</text></text>
					<text class="bill-list-price">+<text>{{item.orderAmount}}</text>元</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				form:{
					incomeList: [],// 收益列表
					monthAmount: '',//当月收入 
					monthtxAmount: '',//当月所提现 
					notRecordedAmount: '',
					totalAmount: '',//累计收入
					totalactulAmount: '',//累计实际提现
					yyAmount: ''//账户余额
				},
				page:{
					current:1,
					pageSize:10
				}
			}
		},
		onLoad(){
			this.getData()
		},
		methods:{
			getData(){
				let obj = {
					pageNum:this.page.current,
					pageSize:this.page.pageSize
				};
				axios.post('/income/list',obj).then(res=>{
					this.form = res.data.data
				})
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
