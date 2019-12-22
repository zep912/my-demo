<template>
	<view class="content order">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab" style="height:calc(100% - 20px)">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y='true' @scrolltolower="lower" @scroll="scroll" :scroll-top="scrollTop"
				 lower-threshold=100 scroll-top=50>
					<!-- 空白页 -->

					<view class="empty" v-if='tabItem.orderList.length==0'>
						<view class="noCollect">
							<!-- <text class="iconfont icon-zanwudingdan" style="font-size: 60px;"></text> -->
							<image src="../../static/nogoods.png" mode="" style="width: 189rpx;height: 170rpx;"></image>
							<view class="noCollect-word">{{msg}}</view>
							<button type="primary" @click="btn">去逛逛</button>
						</view>
					</view>

					<!-- <empty v-if="tabItem.orderList.length === 0" :src='src' :msg='msg'></empty> -->
					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<img src="../../static/shop.png" alt="" class='shopLogo'>
							<text class="time">麦田圈官方旗舰店</text>
							<text class="state" @click="orderDetails(item,item.id)">{{item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':item.status==4?'已关闭':'无效订单'}}</text>
						</view>
						<view class="" v-for='(items,index) in item.orderItemList'>


							<view class="goods-box-single b-b">
								<image class="goods-img" :src="items.productPic" mode="aspectFill"></image>

								<view class="right">
									<text class="title ellipsis">{{items.productName}}</text>
									<text class="attr-box">{{goodsItem.attr}}</text>
								</view>
								<view class="goods-right">
									<text class="price">{{'￥'+items.realAmount}}</text>
									<text class="number">x{{items.productQuantity}}</text>
								</view>
							</view>


							<view class="action-box b-t" v-if="item.state != 9">
								<view class="price-box">
									共
									<text class="num">{{item.orderItemList.length}}</text>
									件商品 实付款
									<text class="price">{{items.realAmount}}</text>
								</view>
								<view class="action-box-buttom">
									<!-- 0->待付款；1->待发货；2->已发货(待收货)；3->已完成(待评价)；4->已关闭；5->无效订单 -->
									<!-- <button class="action-btn" @click="evaluate(item)" v-show='item.status==3'>评价</button> -->
									<button class="action-btn" @click="againBuy(item)" v-show='item.status==3'>再次购买</button>
									<button class="action-btn" @click="cancelOrder(item)" v-show='item.status==0'>取消订单</button>
									<button class="action-btn recom" v-show='item.status==0' @click="payGoods(item)">立即支付</button>
									<button class="action-btn recom" v-show='item.status==2' @click="logisticsTap">查看物流</button>
								</view>
							</view>
						</view>
					</view>
					<view class="loading" v-if='tabItem.orderList.length !== 0'>{{loadingText}}</view>
					<!-- <uni-load-more :status="tabItem.loadingType" v-if='tabItem.orderList.length !== 0'></uni-load-more> -->

				</scroll-view>
			</swiper-item>
		</swiper>
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
				src: '../static/nogoods.png',
				msg: '你还没有任何订单，看看其他的吧',
				tabCurrentIndex: 0,
				navList: [{
						status: '',
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						status: 0,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						status: 1,
						text: '待发货',
						loadingType: 'more',
						orderList: []
					},
					{
						status: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						status: 3,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
				],
				page: {
					current: 1,
					pageSize: 10
				},
				orderList: [],
				payCode: {
					appId: "",
					nonceStr: "",
					package: "",
					paySign: "",
					signType: "MD5",
					timeStamp: ""
				},
				loadingText: '加载中...',
				optionState: '',
				scrollTop: 0,
			};
		},

		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			console.log(options)
			this.tabCurrentIndex = +options.state;
			this.optionState = options.state
			if (options.state === '') { //全部订单
				this.loadData('');
			} else if (options.state === 0) { //待付款
				this.loadData(options.state);
			} else {
				this.loadData(options.state);
			}
		},
		onReachBottom() {

		},

		methods: {
			lower(e) {
				this.page.current++;
				setTimeout(() => {
					this.getmorenews();
				}, 500)
			},
			scroll(e) {

			},
			getmorenews() {
				console.log(111)
				if (this.loadingText == '已全部加载') {
					return false;
				}
				this.loadingText = '加载中...';
				uni.showNavigationBarLoading();
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.status; //每个状态的值
				let obj = {
					"orderType": 0, //订单类型
					"pageNum": this.page.current, //页码
					"pageSize": this.page.pageSize, //页数
					"sourceType": 1, //订单来源
					"status": this.optionState //订单状态：0->待付款；1->待发货；2->已发货(待收货)；3->已完成(待评价)；4->已关闭；5->无效订单
				}
				axios.post('/order/list', obj).then(res => {
					this.loadingText = '';
					if (res.data.data.list.length == 0 || navItem.orderList.length == res.data.data.total) {
						this.loadingText = '已全部加载';
						return false
					}

					let result = []
					result = result.filter(item => {
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderStateExp(item.status));
						if (state === '') {
							//0为全部订单
							return item;
						}
						return item.status === state
					});
					this.orderList = this.orderList.concat(result);
					this.orderList.forEach(item => {
						navItem.orderList.push(item);
					})
					this.loadingText = '上拉加载更多';
					uni.hideNavigationBarLoading();
					this.$set(navItem, 'loaded', true);
				})

			},
			//获取订单列表
			loadData(n) {
				//这里是将订单挂载到tab列表下
				this.page.current = 1;

				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.status; //每个状态的值
				navItem.orderList = [];
				let obj = {
					"orderType": 0, //订单类型
					"pageNum": this.page.current, //页码
					"pageSize": this.page.pageSize, //页数
					"sourceType": 1, //订单来源
					"status": n //订单状态：0->待付款；1->待发货；2->已发货(待收货)；3->已完成(待评价)；4->已关闭；5->无效订单
				}

				axios.post('/order/list', obj).then(res => {
					if (res.data.code == '200') {
						let result = res.data.data.list;
						this.orderList = result.filter(item => {
							//添加不同状态下订单的表现形式
							item = Object.assign(item, this.orderStateExp(item.status));
							if (state === '') {
								//0为全部订单
								return item;
							}
							return item.status === state
						});

						this.orderList.forEach(item => {
							navItem.orderList.push(item);
						})
						console.log(navItem, 777)
						this.$set(navItem, 'loaded', true);
						navItem.loadingType = 'more';
						if (this.orderList.length == res.data.data.total) {
							this.loadingText = '已全部加载'
							return false
						} else {
							this.loadingText = '上拉加载更多'
						}
					}
				})
			},

			//swiper 切换
			changeTab(e) {
				if (e.target) { //在本页面点击tab切换
					this.tabCurrentIndex = e.target.current;
					if (this.tabCurrentIndex == 0) { //全部
						this.optionState = ''
						this.loadData('');
					} else {
						this.optionState = this.tabCurrentIndex - 1;
						this.loadData(this.tabCurrentIndex - 1);
					}
				} else { //从我的页面进入
					this.loadData(this.tabCurrentIndex - 1);
				}
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				// if (this.tabCurrentIndex == 0) { //全部
				// 	this.loadData('');
				// } else {
				// 	this.loadData(this.tabCurrentIndex - 1);
				// }
			},
			// 评价
			evaluate(item) {
				console.log(item)
			},
			// 再次购买
			againBuy(item) {
				let id = item.productId;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			//取消订单
			cancelOrder(item) {
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() => {
					let {
						stateTip,
						stateTipColor
					} = this.orderStateExp(9);
					item = Object.assign(item, {
						state: 9,
						stateTip,
						stateTipColor
					})

					//取消订单后删除待付款中该项
					let list = this.navList[1].orderList;
					let index = list.findIndex(val => val.id === item.id);
					index !== -1 && list.splice(index, 1);

					uni.hideLoading();
					axios.post('/order/cancelOrder', {
						orderId: item.id
					}).then(res => {
						if (res.data.code == 200) {
							this.$api.msg('取消成功')
						}
					})
				}, 600)
			},

			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 0:
						stateTip = '待支付';
						break;
					case 1:
						stateTip = '待发货';
						break;
					case 2:
						stateTip = '待收货';
						break;
					case 3:
						stateTip = '待评价';
						break;
					case 5:
						stateTip = '';
						break;
					case 6:
						stateTip = '交易成功';
						break;
					case 7:
						stateTip = '已完成';
						break;
					case 9:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;
				}
				return {
					stateTip,
					stateTipColor
				};
			},
			//订单详情
			orderDetails(item, id) {
				console.log(item)
				if (item.status != 3) {
					uni.navigateTo({
						url: 'orderDetails?status=' + item.status + '&id=' + id
					})
				}

			},
			// 物流信息
			logisticsTap() {
				uni.navigateTo({
					url: 'logistics'
				})
			},
			payGoods(item) {
				let code = uni.getStorageSync('code')
				let obj = {
					code: code, //code
					orderSn: item.orderSn, //订单编号orderSn
					payType: 3, //支付类型
					rechargeMoney: item.realAmount * item.productQuantity, //支付金额s
				}
				let _this = this;
				axios.post('/pay/payOrder', obj).then(res => {
					_this.payCode = {
						appId: res.data.data.appId,
						nonceStr: res.data.data.nonceStr,
						package: res.data.data.package,
						paySign: res.data.data.paySign,
						signType: "MD5",
						timeStamp: res.data.data.timeStamp,
					}
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: _this.payCode.timeStamp,
						nonceStr: _this.payCode.nonceStr,
						package: _this.payCode.package,
						signType: 'MD5',
						paySign: _this.payCode.paySign,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
							uni.reLaunch({
								url: 'paySuccess?totalCount=' + _this.totalCount + '&id=' + _this.orderList.id
							})
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					})
				})
			}
		},
	}
</script>

<style lang="scss">
	.loading {
		text-align: center;
		font-size: 26rpx;
		margin-top: 10px;
		color: #999;
	}

	.noCollect .noCollect-word {
		color: #1F1F1F;
		margin-top: 52rpx;
		font-weight: 600;
		color: #999;
	}

	.noCollect button {
		width: 670rpx;
		height: 90rpx;
		background: rgba(247, 181, 44, 1);
		border-radius: 45rpx;
	}

	.order .noCollect img {
		width: 200rpx;
		height: 180rpx;
	}

	page,
	.content {
		background: #F2F2F2;
		height: 100%;
		padding-top: 20px;
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
					// border-bottom: 2px solid $base-color;
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

		// /* 多条商品 */
		// .goods-box {
		// 	height: 160upx;
		// 	padding: 20upx 0;
		// 	white-space: nowrap;

		// 	.goods-item {
		// 		width: 120upx;
		// 		height: 120upx;
		// 		display: inline-block;
		// 		margin-right: 24upx;
		// 	}

		// 	.goods-img {
		// 		display: block;
		// 		width: 100%;
		// 		height: 100%;
		// 	}
		// }

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
					// font-size: $font-base + 2upx;
					font-size: 30rpx;
					// color: $font-color-dark;
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
					// font-size: $font-sm + 2upx;
					font-size: 24rpx;
					// color: $font-color-light;
					color: rgba(158, 158, 158, 1);
					// padding: 10upx 12upx;
				}

				// .price{
				// 	font-size: $font-base + 2upx;
				// 	color: $font-color-dark;
				// 	&:before{
				// 		content: '￥';
				// 		font-size: $font-sm;
				// 		margin: 0 2upx 0 8upx;
				// 	}
				// }
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
