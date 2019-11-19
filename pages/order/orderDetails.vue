<template>
	<view class="order-details">
		<!-- 订单状态 -->
		<view class="order-state">
			<text class="toBeShipped" v-if='order.status!=1&&order.status!=9' :style="{color:order.color}">{{order.statusMsg}}</text>
			<text v-if='order.status==1' class="toBeFinish"><text class="toBeFinishBlock toBeFinishBlockFirst">待付款</text><text class="toBeFinishBlock toBeFinishBlockSecond">剩余<text>23小时22分</text>自动关闭</text></text>
			<text v-if='order.status==9' class="payClose"><text>交易关闭</text><text>订单取消</text></text>
			<img :src="order.img" alt="">
		</view>
		<!-- 交易关闭--退款 -->
		<view class="close"  v-if='order.status==9'>
			<ul>
				<li>
					<text>退款总金额</text>
					<text class="closePrice">￥120.00</text>
				</li>
				<li>
					<text>退回广发银行</text>
					<text>￥120.00</text>
				</li>
			</ul>
			<van-steps
			  :steps="steps"
			  :active="active"
			/>
			<view class="i-top b-b" @click="consult">
				<text class="time">协商历史</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
		</view>
		<!-- 地址 -->
		<view class="order-address">
			<img src="../../static/dizhi.png" />
			<view class="order-ad-user">
				<text class="phone">涂志奇15692124707</text>
				<text class="address">湖北省武汉市江夏市光谷智慧园7栋4楼</text>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="order-goods">
			<view v-for="(item,index) in form.collect" :key="index" class="order-item">
				<view class="i-top b-b">
					<img src="../../static/shop.png" alt="" class='shopLogo'>
					<text class="time">{{item.shopName}}</text>
					<text class="cell-more yticon icon-you"></text>
				</view>

				<view class="goods-box-single b-b" v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex">
					<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>

					<view class="right">
						<text class="title ellipsis">{{goodsItem.title}}</text>
						<text class="attr-box">{{goodsItem.attr}}</text>
						<text class="price">{{'￥'+goodsItem.price}}</text>
					</view>
					<view class="goods-right">
						<text class="number">X{{goodsItem.number}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="order-list">
			<ul>
				<li>
					<text>订单备注</text>
					<text>{{form.goodsObj.remarks}}</text>
				</li>
				<li>
					<text>商品总价</text>
					<text class="order-list-bold">{{'￥'+form.goodsObj.allPay}}</text>
				</li>
				<li>
					<text>抵扣积分</text>
					<text class="order-list-bold">{{form.goodsObj.jifen+'分'}}</text>
				</li>
				<li>
					<text>商品优惠</text>
					<text class="order-list-bold">{{'-￥'+form.goodsObj.preferential}}</text>
				</li>
				<li>
					<text>实付合计</text>
					<text class="order-list-bold">{{'￥'+form.goodsObj.total}}</text>
				</li>
			</ul>
		</view>
		<!-- 订单付费信息 -->
		<view class="order-pay" :class="{'marginBottom':statuss!=4}">
			<view>
				<text>订单编号：</text>
				<text>{{form.orderMsg.number}}</text>
			</view>
			<view v-if='statuss!=1'>
				<text>支付流水号：</text>
				<text>{{form.orderMsg.num}}</text>
			</view>
			<view>
				<text>订单创建时间：</text>
				<text>{{form.orderMsg.creatTime}}</text>
			</view>
			<view v-if='statuss!=1'>
				<text>订单付款时间：</text>
				<text>{{form.orderMsg.payTime}}</text>
			</view>
			<view v-if='statuss!=1'>
				<text>支付方式：</text>
				<text>{{form.orderMsg.payWay}}</text>
			</view>
		</view>
		<!-- 尾部 -->
		<view class="foot" v-if='show'>
			<button type="primary" class="btn1">{{order.wuliu}}</button>
			<button type="primary" class="btn2" v-if='order.status!=9'>{{order.pay}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					collect: [{
						time: '2019-04-06 11:37',
						shopName: '麦田圈官网旗舰店',
						state: 5,

						goodsList: [{
							title: '香辣牛肉干',
							price: 88.88,
							image: '/static/goods.png',
							number: 1,
							attr: '规格 10*200g'
						}]
					}],
					goodsObj: {
						remarks: '香辣味的',
						allPay: '120',
						jifen: '100',
						preferential: '20.00',
						total: '880'
					},
					orderMsg:{
						number:'13245679851354664',
						num:'3212313213213213132',
						creatTime:'2019-11-05 11:12:12',
						payTime:'2019-11-05 11:12:12',
						payWay:'微信支付'
					}
				},
				img:[
					'../../static/icon1.png',
					'../../static/icon2.png',
					'../../static/icon3.png',
					'../../static/icon4.png',
					'../../static/icon5.png',
					'../../static/icon6.png',
				],
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
				steps: [
				      {
				        text: '步骤一',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤二',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤三',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤四',
				        desc: '描述信息'
				      }
				    ]
			}
		},
		onLoad(option){
			console.log(option)
			this.statuss = option.status;
			if(this.statuss==1){
				// 待支付
				this.show = true;
				this.order = {
					status:1,
					statusMsg:'',
					img:this.img[1],
					wuliu:'取消订单',
					pay:'立即支付'
				}
			}else if(this.statuss==4){
				//待发货
				this.show = false;
				this.order = {
					status:4,
					statusMsg:'待发货',
					img:this.img[0],
					wuliu:'',
					pay:'',
					color:'#F7B62C'
				}
			}else if(this.statuss==2){
				//待收货
				this.show = true;
				this.order = {
					status:2,
					statusMsg:'待收货',
					img:this.img[2],
					wuliu:'查看物流',
					pay:'确认收货',
					color:'#515151'
				}
			}else if(this.statuss==6){
				//已完成
				this.show = true;
				this.order = {
					status:2,
					statusMsg:'交易成功',
					img:this.img[3],
					wuliu:'删除订单',
					pay:'去评价',
					color:'#01B300'
				}
			}else if(this.statuss==9){
				// 交易关闭
				this.show = true;
				this.order = {
					status:9,
					statusMsg:'',
					img:this.img[4],
					wuliu:'删除订单',
					pay:'',
					color:''
				}
			}else if(this.statuss==7){
				// 已完成
				this.show = true;
				this.order = {
					status:7,
					statusMsg:'已完成',
					img:this.img[5],
					wuliu:'删除订单',
					pay:'再次购买',
					color:'#515151'
				}
			}
			
			
		},
		methods: {
			consult(){
				uni.navigateTo({
					url:'consult'
				})
			}
		}
	}
</script>

<style lang="scss">
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

		img {
			width: 31rpx;
			height: 42rpx;
			margin-right: 30rpx;
		}

		.order-ad-user {
			text {
				display: block;
			}

			.phone {
				font-size: 28rpx;
				font-weight: bold;
				color: rgba(81, 81, 81, 1);
				margin-bottom: 14rpx;
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
	width:100%;
	height:120rpx;
	background:rgba(255,255,255,1);
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding-right: 15rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	button{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn1{
		width:211rpx;
		height:74rpx;
		border:1px solid rgba(141,141,141,1);
		border-radius:37rpx;
		font-size:28rpx;
		font-weight:400;
		color:rgba(88,88,88,1);
		background: #fff;
	}
	.btn2{
		width:211rpx;
		height:74rpx;
		background:rgba(247,87,44,1);
		border-radius:37rpx;
		font-size:28rpx;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
}

</style>
