<template>
	<view class="order-details">
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
				<view class="order-total">
					<text>共2件商品</text>
					<text>合计：<text>{{'￥'+'120.00'}}</text></text>
				</view>
			</view>
		</view>
		<!-- 退款原因 -->
		<view class="refund-reason">
			<van-cell title="退款原因" is-link :value="reason" @click='cellClick' />
		</view>

		<!-- 退款金额 -->
		<view class="refund-money">
			<view class="refund-money-top">
				<text class="refund-money-title bold block">退款金额:<text class="refund-money-num">￥88.88</text></text>
				<text class="bold refund-money-explain">退款最多￥<text>8.00</text>元，含优惠折扣费用</text>
				<text class="bold  refund-money-explain">仅在使用同一品类或商品券所有订单关闭后，方可退回相关优惠券</text>
			</view>
			<view class="refund-intro">
				<text class="block refund-intro-title">退款说明:</text>
				<view class="refund-msg">
					<textarea :value="value" placeholder="请说明您实际购买的情况说明(限300字)" placeholder-class='textareaClass' maxlength='300' />
					<van-uploader use-slot class='refund-upload-img' :file-list="fileList" @after-read="afterRead">
					  <img src="../../static/upload.png" alt="" class='upload'>
					</van-uploader>
				</view>
			</view>
		</view>
		<!-- 联系电话 -->
		<view class="refund-phone base">
			<text class="refund-p-mobile block">联系电话:</text>
			<textarea :value="phone" placeholder="请留下您的联系方式,方便客服联系您" class="refund-contact"  placeholder-class='textareaClass' maxlength='11'/>
		</view>
		<!-- 尾部 -->
		
			<button class="btn1">提交</button>
			
			<!-- 弹出层 -->
			<van-popup
			  :show="show"
			  position="bottom"
			  custom-style='popStyle'
			>
			<van-picker
			  show-toolbar
			  title=" "
			  confirm-button-text='确定'
			  :columns="columns"
			  @cancel="onCancel"
			  @confirm="onConfirm"
			/>
			</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reason:'请选择',
				show:false,
				value:'',
				phone:'',
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
				},
				statuss:'',
				show:false,
				marginBottom:'',
				fileList: [],
				columns: ['七天无理由退换', '商品损坏', '商品过期', '物流', '其他']
			}
		},
		onLoad(option){
			
		},
		methods: {
			consult(){
				uni.navigateTo({
					url:'consult'
				})
			},
			afterRead(event) {
			      const { file } = event.detail;
			      // 当设置 mutiple 为 true 是 file 是一个数组，mutiple 默认为 false，file 是一个对象
			      wx.uploadFile({
			        url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
			        filePath: file.path,
			        name: 'file',
			        formData: { 'user': 'test' },
			        success (res){
			          // 上传完成需要更新fileList
			          const { fileList = [] } = this.data;
			          fileList.push({ ...file, url: res.data });
			          this.setData({ fileList });
			        }
			      });
			    },
				
			onCancel(){
				this.show = false
			},
			cellClick(){
				this.show = true
			},
			onConfirm(event){
				this.show = false;
				const { picker, value, index } = event.detail;
				this.reason = value;
				// console.log(`当前值：${value}, 当前索引：${index}`)
			}
		}
	}
</script>

<style lang="scss">
	.van-picker-column__item{
		color: #A9A9A9;
	}
	.popStyle{
		height: 638rpx;
	}
	.btn1{
		width: 92%;
		height:80rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		background:rgba(247,181,44,1);
		border-radius:40px;
		margin-bottom: 20rpx;
		font-size:30rpx;
		font-weight:500;
		color:rgba(255,255,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.base{
		width: 94%;
		background:rgba(255,255,255,1);
		border-radius:20rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.refund-phone{
		padding-top: 32rpx;
		padding-bottom: 40rpx;
		.refund-contact{
			width: 100%;
			margin-top: 30rpx;
			box-sizing: border-box;
			padding: 26rpx 20rpx 20rpx 20rpx;
			background:rgba(244,244,244,1);
			height:90rpx;
			border-radius:20rpx;
		}
		
		
	}
		
	// 退款金额
	.block{
		font-weight: 600;
		font-size:26rpx;
		color:rgba(81,81,81,1);
	}
	.textareaClass{
		font-size: 24rpx;
		color: #C7C7C7;
	}
	.refund-money{
		width: 94%;
		margin: 10rpx auto;
		border-radius:20rpx;
		box-sizing: border-box;
		padding-top: 40rpx;
		background: #fff;
		padding-bottom: 90rpx;
		.refund-money-top{
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #EDEDED;
			padding-left: 20rpx;
			line-height: 36rpx;
			padding-bottom: 42rpx;
			.refund-money-title{
				margin-bottom: 10rpx;
				.refund-money-num{
					color: #FC393E;
				}
			}
			.refund-money-explain{
				font-size:20rpx;
				font-weight:500;
				color:rgba(163,163,163,1);
				line-height:30rpx;
			}
			.bold{
				display: block;
			}
		}
		
		.refund-intro{
			padding-right: 20rpx;
			padding-left: 20rpx;
			padding-top: 38rpx;
			.refund-intro-title{
				margin-bottom: 38rpx;
			}
			textarea{
				width: 100%;
				background:rgba(244,244,244,1);
				border-radius:20rpx;
				box-sizing: border-box;
				margin-top: 38rpx;
				padding: 26rpx 20rpx 20rpx 20rpx;
			}
			
			.refund-msg{
				position:relative;
				.refund-upload-img{
					position: absolute;
					left: 3%;
					bottom: 6%;
					width: 100rpx;
					height: 100rpx;
					img{
						width: 100rpx;
						height: 100rpx;
					}
				}
			}
		}
	}
	.refund-reason{
		width: 94%;
		margin: 10rpx auto;
		
		.van-cell--clickable{
			width: 100%;
			border-radius:20rpx;
		}
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
		.order-total{
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding-right: 30rpx;
			padding-left: 30rpx;
			font-size:26rpx;
			font-weight:400;
			color:rgba(88,88,88,1);
			margin-top: 32rpx;
		}
	}

	.order-item {
		width: 94%;
		margin: 0 auto;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		
		background: #fff;
		padding-bottom: 33rpx;

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

.b-b:after, .b-t:after {
    position: absolute;
    z-index: 3;
    left: 30rpx;
    right: 0;
    height: 0;
    content: '';
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
    border-bottom: 1px solid #E4E7ED;
	}
</style>
