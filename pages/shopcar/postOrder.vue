<template>
	<view class="order-details">
		<!-- 地址 -->
		<view class="order-address b-b i-top" @click="toAddress">
			<img src="../../static/dizhi.png" />
			<view class="order-ad-user">
				<text class="phone"><text>{{orderList.receiverName}}</text><text>{{orderList.receiverPhone}}</text></text>
				<text class="address">{{orderList.receiverProvince+orderList.receiverCity+orderList.receiverRegion+orderList.receiverDetailAddress}}</text>
			</view>
			<text class="cell-more yticon icon-you"></text>	
		</view>
		<!-- 商品信息 -->
		<view class="order-goods">
			<view class="order-item">
				<view class="i-top b-b">
					<img src="../../static/shop.png" alt="" class='shopLogo'>
					<text class="time">麦田圈官方旗舰店</text>
					<!-- <text class="cell-more yticon icon-you"></text> -->
				</view>

				<view class="goods-box-single b-b" v-for="(goodsItem, goodsIndex) in orderItemList" :key="goodsIndex">
					<image class="goods-img" :src="goodsItem.productPic" mode="aspectFill"></image>

					<view class="right">
						<text class="title ellipsis">{{goodsItem.productName}}</text>
						<text class="attr-box">{{goodsItem.attr}}</text>
						<text class="price">{{'￥'+goodsItem.productPrice}}</text>
					</view>
					<view class="goods-right">
						<text class="number">X{{goodsItem.productQuantity}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-list">
			<ul>
				<li>
					<text>订单备注</text>
					<text>{{orderList.nots}}</text>
				</li>
				<li>
					<text>预计送达时间</text>
					<text class="order-list-bold">11月12日(周四)</text>
				</li>
				<li>
					<text>商品总价</text>
					<text class="order-list-bold">{{'￥'+orderList.totalAmount}}</text>
				</li>
				<li>
					<text>抵扣积分<text style="font-size: 24rpx;color: #C9C9C9;margin-left: 30rpx;">使用100积分抵扣1元钱</text></text>
					<van-switch :checked="checked" @change="swithChange" active-color="#07c160"
  inactive-color="#f7572c" />
				</li>
				<li>
					<text>商品优惠</text>
					<text class="order-list-bold">{{orderList.preferential?'-￥'+orderList.preferential:0}}</text>
				</li>
				<li>
					<text>实付合计</text>
					<text class="order-list-bold">{{'￥'+totalCount}}</text>
				</li>
			</ul>
		</view>
		<!-- 尾部 -->
		<view class="foot">
			<view class="foot-word">
				<text class='foot-heji'>合计:</text>
				<text class='foot-price'>{{'￥'+orderList.totalAmount}}</text>
				<text class='foot-youhui'>已优惠: <text>￥998.90</text></text>
			</view>
			<button class="footBtn" @click="payBtn">立即支付</button>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				form: {
					collect: [{
						time: '2019-04-06 11:37',
						shopName: '麦田圈官网旗舰店',
						state: 5,
					}],
				},
				order:{
					status:'',
					img:'',
					wuliu:'',
					pay:'',
					statusMsg:'',
					color:''
				},
				statuss:'',
				show:false,
				marginBottom:'',
				checked:true,
				orderList:{
					name:'',
					phoneNumber:'',
					address:''
				},
				ids:[],
				orderItemList:[],
				totalCount:''
			}
		},
		onLoad(option){
			console.log(option);
			this.ids = JSON.parse(option.deleIds)
			if(uni.getStorageSync('addressMsg')){//从地址跳转回来
				let orderAddress = JSON.parse(uni.getStorageSync('addressMsg'));
				// 地址更新
				this.orderList = {
					name:orderAddress.name,
					phoneNumber:orderAddress.phoneNumber,
					address:orderAddress.province+orderAddress.city+orderAddress.region+orderAddress.detailAddress,
				}
			}
			
			this.getOrder()
		},	
		methods: {
			// 数据初始化
			getOrder(){
				let obj = {
					cartItemIds:this.ids
				}
				axios.post('/order/generateOrder',obj).then(res=>{
					console.log(res)
					this.orderList = res.data.data.order;
					this.orderItemList = res.data.data.orderItemList;
				})
			},
			// 修改地址
			toAddress(){
				uni.navigateTo({
					url:'../set/address?postOrder=1'
				})
			},
			//使用积分
			swithChange({detail}){
				// 计算实付金额
				this.checked = detail;
				if(this.checked){//true，表示抵扣
					this.totalCount = this.orderList.totalAmount-1-this.orderList.preferential
				}else{
					
				}
			},
			// 立即支付
			payBtn(){
				let code = uni.getStorageSync('code')
				let obj = {
					code: code,//code
				    orderSn: this.orderList.orderSn,//订单编号orderSn
				    payType: 0,//支付类型
					rechargeMoney: 0.1,//支付金额
					userId: 16//用户id
				}
				axios.post('/pay/payOrder',obj).then(res=>{
					console.log(res)
				})
				// uni.navigateTo({
				// 	url:'paySuccess'
				// })
			}
		}
	}
</script>

<style lang="scss">
	.footBtn{
		width:210rpx;
		height:74rpx;
		background:rgba(247,87,44,1);
		border-radius:37rpx;
		font-size:28rpx;
		font-weight:bold;
		color:rgba(255,255,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 0;
		margin-left: 0;
	}
	.close{
		width: 94%;
		margin: 0 auto;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 20rpx;
		color: #585858;
		ul{
			width: 100%;
			li{
				width: 100%;
				height: 90rpx;
				box-sizing: border-box;
				padding-right: 30rpx;
				padding-left: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #585858;
				border-bottom: 1px solid #EDEDED;
				font-size:26rpx;
				font-weight:400;
				color:rgba(88,88,88,1);
				.order-list-bold{
					font-weight:bold;
				}
			}
		}
		.closePrice{
			color: #FF3434;
		}
		.i-top{
			    display: flex;
			    align-items: center;
			    height: 40px;
			    padding-right: 15px;
			    font-size: 14px;
			    position: relative;
			    padding-left: 15px;
				justify-content: space-between;
		}
	}
	.order-details .marginBottom{
		margin-bottom: 	140rpx;
	}
	page {
		background: #F2F2F2;
	}
	ul{margin: 0;padding: 0;}
	li{list-style: none;}
	.order-goods {
		margin-top: 16upx;
	}

	.order-item {
		width: 94%;
		margin: 0 auto;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;

		background: #fff;


		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			padding-left: 30upx;

			.shopLogo {
				width: 34rpx;
				height: 32rpx;
				margin-right: 15rpx;
			}

			.time {
				flex: 1;
			}

			.state {
				// color: $base-color;
				font-size: 24rpx;
				font-weight: 500;
				color: rgba(151, 151, 151, 1);
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;
			padding-left: 30rpx;
			padding-right: 30rpx;
			position: relative;

			.goods-img {
				display: block;
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					// font-size: $font-base + 2upx;
					font-size: 30rpx;
					// color: $font-color-dark;
					color: #1F1F1F;
					line-height: 1.2;
					margin-bottom: 10rpx;
				}

				.price {
					font-size: 26rpx;
					font-weight: 500;
					color: rgba(245, 86, 65, 1);
					margin-top: 38rpx;
				}

				.ellipsis {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.attr-box {
					// font-size: $font-sm + 2upx;
					font-size: 24rpx;
					// color: $font-color-light;
					color: rgba(158, 158, 158, 1);
					// padding: 10upx 12upx;
				}
			}

			.goods-right {
				display: flex;
				align-items: flex-end;
				font-size: 22rpx;
				font-weight: 500;
				color: rgba(81, 81, 81, 1);
			}
		}

		.price-box {
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.price {
				font-size: 26rpx;
				color: #585858;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			padding-bottom: 30rpx;

			.action-box-buttom {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding-right: 30rpx;
			}
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			// color: $font-color-dark;
			color: #5F5F5F;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}
		}
	}

	.order-state {
		width: 100%;
		height: 150rpx;
		background: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		padding-left: 75rpx;
		padding-right: 97rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #E3E3E3;

		.toBeShipped {
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(247, 182, 44, 1);
		}

		img {
			width: 72rpx;
			height: 80rpx;
		}
	}

	.order-address {
		width: 95%;
		margin: 0 auto;
		margin-top: 16rpx;
		height: 131rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20rpx;
		box-sizing: border-box;
		padding-left: 30rpx;
		display: flex;
		align-items: center;
		.cell-more{
			margin-left: 26%;
		}
		img {
			width: 31rpx;
			height: 42rpx;
			margin-right: 30rpx;
		}

		.order-ad-user {
			.phone,.address {
				display: block;
			}

			.phone {
				font-size: 28rpx;
				font-weight: bold;
				color: rgba(81, 81, 81, 1);
				margin-bottom: 14rpx;
				text:nth-of-type(1){
					margin-right: 10rpx;
				}
			}

			.address {
				font-size: 22rpx;
				font-weight: 500;
				color: rgba(81, 81, 81, 1);
			}
		}
	}

.order-list{
	width: 95%;
	margin: 0 auto;
	margin-top: 20rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	ul{
		width: 100%;
		li{
			width: 100%;
			height: 90rpx;
			box-sizing: border-box;
			padding-right: 30rpx;
			padding-left: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #585858;
			border-bottom: 1px solid #EDEDED;
			font-size:26rpx;
			font-weight:400;
			color:rgba(88,88,88,1);
			.order-list-bold{
				font-weight:bold;
			}
		}
	}
}
.order-pay{
	width: 95%;
	margin: 0 auto;
	margin-top: 20rpx;
	background:rgba(255,255,255,1);
	border-radius:20rpx;
	box-sizing: border-box;
	padding-top: 30rpx;
	padding-left: 28rpx;
	padding-bottom: 22rpx;
	font-size:26rpx;
	font-weight:400;
	color:rgba(88,88,88,1);
	line-height:28px;
	margin-bottom: 20rpx;
}
.toBeFinish{
	.toBeFinishBlock{
		display: block;
	}
	.toBeFinishBlockFirst{
		font-size:32rpx;
		font-weight:bold;
		color:rgba(255,62,61,1);
		margin-bottom: 18rpx;
	}
	.toBeFinishBlockSecond{
		font-size:24rpx;
		font-weight:500;
		color:rgba(84,84,84,1);
	}
}
.payClose{
	text{
		display: block;
	}
	text:nth-of-type(1){
		font-size:32rpx;
		font-weight:bold;
		color:rgba(84,84,84,1);
		margin-bottom: 18rpx;
	}
	text:nth-of-type(2){
		font-size:24rpx;
		font-weight:500;
		color:rgba(84,84,84,1);
	}
}
.foot{
	position: fixed;
	bottom: 0;
	left: 0;
	width:100%;
	height:120rpx;
	background:rgba(255,255,255,1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding-left: 20rpx;
	padding-right: 20rpx;
	.payBtn{
		width:211rpx;
		height:74rpx;
		background:rgba(247,87,44,1);
		border-radius:37rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #fff;
	}
	.foot-heji{
		font-size: 24rpx;
		color: #1f1f1f;
	}
	.foot-price{
		font-size: 26rpx;
		color: #f55641;
		display: inline-block;
		margin-right: 34rpx;
	}
	.foot-youhui{
		font-size: 22rpx;
		color:rgba(158,158,158,1);
	}
}

</style>
