<template>
	<view class="myprofit">
		<view class="sta-data">
			<image src="../../static/delivery/shouyibg.png" mode="" class="bg"></image>
			<view class="sta-bg-top">
				<text class="sta-bg-title sta-bgtitle">账户余额</text>
				<text class="sta-bg-title"><text class="sta-bg-num">{{list.yyAmount}}</text>元</text>
			</view>
		</view>
		<!-- 未入金额 -->
		<view class="nomoney">
			<text>未入账金额:<text class="nomoney-num">{{list.notRecordedAmount}}</text>元</text>
		</view>
		<!-- 账单统计 -->
		<view class="myprofit-sta">
			<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50" @click="next">
				<text class="cell-tit">账单统计</text>
				<text class="iconfont icon-you" style="color: #909399;"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				page:{
					current:1,
					pageSize:10
				},
				list:{
					yyAmount:'',//账户余额
					notRecordedAmount:'',//未入账金额
				}
			}
		},
		onLoad() {
			this.getData()
		},
		methods:{
			getData(){
				let obj = {
					pageNum:this.page.current,
					pageSize:this.page.pageSize
				}
				axios.post('/income/list',obj).then(res=>{
					console.log(res)
					this.list = res.data.data
				})
			},
			next(){
				uni.navigateTo({
					url:'billstatistics'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f2f2f2;
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
	}
	.nomoney{
		width:92%;
		height:100rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 15px 0px rgba(0, 0, 0, 0.15);
		border-radius:50rpx;
		position: absolute;
		left: 0;
		top: -49%;
		right: 0;
		bottom: 0;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:26rpx;
		font-weight:500;
		color:rgba(88,88,88,1);
		z-index: 1000;
	}
	.myprofit-sta{
		padding-top: 80rpx;
		background: #fff;
		z-index: 99;
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
			color: #585858;
			margin-right: 10upx;
		}

	}
</style>
