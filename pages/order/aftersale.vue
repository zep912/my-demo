<template>
	<view class="content">
		<view class="tab-content">
			<!-- 空白页 -->
			<view v-if="orderList.length === 0" class="nogoods">
				<img src="../../static/nogoods.png" alt="">
				<view>你还没有任何订单，看看其他的吧</view>
				<button type="primary" @click="buy">去逛逛</button>
			</view>

			<!-- 订单列表 -->
			<view class="order-item">
				<view class="i-top b-b">
					<img src="../../static/shop.png" alt="" class='shopLogo'>
					<text class="time">麦田圈官网旗舰店</text>
					<!-- <text class="state">{{item.stateTip}}</text> -->
				</view>
				<view v-for="(item, index) in orderList" :key="index">
					<view class="goods-box-single b-b">
						<image class="goods-img" :src="item.productPic" mode="aspectFill"></image>

						<view class="right">
							<text class="title ellipsis">{{item.productName}}</text>
							<text class="attr-box">{{item.productAttr}}</text>
						</view>
						<view class="goods-right">
							<text class="price">{{'￥'+item.productPrice}}</text>
							<text class="number">x{{item.productCount}}</text>
						</view>
					</view>
					<view class="action-box b-t" v-if="item.status!= 9">
						<view class="price-box">
							<text>{{returnState(item.status)}}</text>
							<text class="price">退款成功</text>
						</view>
						<view class="action-box-buttom">
							<!-- <button class="action-btn" @click="evaluate(item)" v-show='item.state==5' style='width: 196rpx;'>售后服务评价</button> -->
							<!-- <button class="action-btn" @click="lookDetail(item)">查看详情</button> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	import axios from '@/utils/uniAxios.js'
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				orderList: []

			};
		},

		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.loadData()
		},

		methods: {
			buy() {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			//获取订单列表
			loadData() {
				axios.post('/returnApply/list').then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.orderList = res.data.data;
						this.orderList.push({
							companyAddressId: 1,
							createTime: "2019-12-19T14:34:39.000+0000",
							description: '',
							handleMan: '',
							handleNote: '',
							handleTime: "2019-12-19T14:34:39.000+0000",
							id: 145,
							memberId: 76,
							memberUsername: '',
							orderId: 145,
							orderSn: "201912190102000002",
							productAttr: '',
							productBrand: "明知缘",
							productCount: 1,
							productId: 45,
							productName: "正宗农家散养谷饲土鸡蛋20枚",
							productPic: 'http://maitianquan-zjk.oss-cn-zhangjiakou.aliyuncs.com/cropcircle/image/20191204/好货推荐-1.png',
							productPrice: 25.99,
							productRealPrice: 25.99,
							proofPics: '',
							reason: '不想要了',
							receiveMan: "小鲁",
							receiveNote: '备注',
							receiveTime: "2019-12-19T14:34:39.000+0000",
							returnAmount: 25.99,
							returnName: "小鲁",
							returnPhone: 13667138671,
							status: 0
							// status: 0申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝
						})
						console.log(this.orderList)
					}
				})
			},
			returnState(n) {
				if (n == 0) {
					return '待处理'
				} else if (n == 1) {
					return '退货中'
				} else if (n == 2) {
					return '已完成'
				} else {
					return '已拒绝'
				}
			},
			// 评价
			evaluate(item) {
				console.log(item)
			},
			// 查看详情
			lookDetail(item) {
				let id = item.id;
				uni.navigateTo({
					url:'closeOrder?id='+id
				})
				// uni.navigateTo({
				// 	url: 'refund?id='+id
				// })
				console.log(item)
			},
			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 5:
						stateTip = '';
						break;
				}
				return {
					stateTip,
					stateTipColor
				};
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		// background: $page-color-base;
		background: #F2F2F2;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 20px);
		// margin-top: 40px;
	}

	.list-scroll-content {
		height: 100%;

		.nogoods {
			text-align: center;

			img {
				width: 190rpx;
				height: 170rpx;
				margin-bottom: 52rpx;
				margin-top: 160rpx;
			}

			view {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(31, 31, 31, 1);
			}

			button {
				width: 90%;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
				font-size: 30rpx;
				color: #fff;
				background: rgba(247, 181, 44, 1);
				border-radius: 45px;
				margin-top: 170rpx;
			}
		}
	}

	.navbar {
		display: flex;
		height: 40px;
		width: 100%;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				// color: $base-color;
				color: #F7B52C;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;

					border-bottom: 2px solid #F7B52C;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		width: 94%;
		margin: 0 auto;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;

		background: #fff;
		margin-top: 16upx;

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

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
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
				width: 130rpx;
				height: 130rpx;
				border-radius: 10rpx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: 30rpx;

					color: #1F1F1F;
					line-height: 1.2;
					margin-bottom: 10rpx;
				}

				.ellipsis {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.attr-box {
					font-size: 24rpx;
					color: rgba(158, 158, 158, 1);
				}
			}

			.goods-right {
				text {
					display: block;
				}

				.price {
					color: #1F1F1F;
					font-size: 26rpx;
					font-weight: 600;
				}

				.number {
					font-size: 22rpx;
					font-weight: 500;
					color: rgba(158, 158, 158, 1);
					line-height: 36px;
					text-align: right;
				}
			}
		}

		.price-box {
			// display: flex;
			// justify-content: flex-end;
			// align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			// .num{
			// 	margin: 0 8upx;
			// 	color: $font-color-dark;
			// }
			.price {
				// font-size: $font-lg;
				font-size: 26rpx;
				// color: $font-color-dark;
				margin-left: 15px;

				// &:before {
				// 	content: '￥';
				// 	font-size: $font-sm;
				// 	margin: 0 2upx 0 8upx;
				// }
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

			// height: 100upx;
			// position: relative;
			// padding-right: 30upx;
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

			// &.recom{
			// 	background: #fff9f9;
			// 	color: $base-color;
			// 	&:after{
			// 		border-color: #f7bcc8;
			// 	}
			// }
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
