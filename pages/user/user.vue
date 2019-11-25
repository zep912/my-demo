<template>
	<view class="container">

		<view class="user-section">
			<image class="bg" src="../../static/my/user-bg.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.portrait || '../../static/my/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userInfo.nickname}}</text>
					<text class="info-mobile">{{userInfo.mobile}}</text>
					<view class='login-now authorize' @click="navTo('/pages/public/login')" v-show='!userInfo.nickname'>
						<text>点击授权登录</text>
					</view>
				</view>

			</view>
			<view class='login-now' @click="accountManage">	
				<text>账号管理</text>
			</view>
		</view>
		<!-- 查看订单 -->
		<view class="user-order">
			<view class="list-cell b-b m-t" @click="navTo('/pages/order/order?state=0')" hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">全部订单</text>
				<text class="cell-tip" @click="lookOrder">查看全部订单</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
			<view class="cover-container">
				<!-- 订单 -->
				<view class="order-section">

					<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
					
						<img src="../../static/my/my-pending.png" alt="" style='width:64rpx;height:54rpx;margin-bottom: 18rpx;'>
						<text>待付款</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
					
						<img src="../../static/my/my-received.png" alt="" style='width:62rpx;height:54rpx;margin-bottom: 18rpx;'>
						<text>待收货</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover" :hover-stay-time="50">
			
						<img src="../../static/my/my-evaluated.png" alt="" style='width:66rpx;height:54rpx;margin-bottom: 18rpx;'>
						<text>待评价</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/aftersale?state=5')" hover-class="common-hover" :hover-stay-time="50">
					
						<img src="../../static/my/my-refund.png" alt="" style='width:58rpx;height:60rpx;margin-bottom: 18rpx;'>
						<text>退款/售后</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品-我的足迹 -->
		<view class="my-footprint">
			<view class="my-footprint-box">
				<view class=""  @click="navTo('/pages/user/collect')">
					<text class="my-foot-num">{{shoucang?shoucang:0}}</text>
					<text class="my-foot-title">商品收藏</text>
				</view>
				<view class="" @click="navTo('/pages/user/footmark')">
					<text class="my-foot-num">{{zuji?zuji:0}}</text>
					<text class="my-foot-title">我的足迹</text>
				</view>
			</view>
		</view>
		<!-- 钱包 -->
		<view class="wallet">
			<view class="wallet-cell" @click="navTo('/pages/user/wallet')" >
				<img src="../../static/my/my-wallet.png" class="wallet-img"></image>
				<text>钱包</text>
			</view>
			<view class="wallet-cell" @click="navTo('/pages/delivery/delivery')">
				<img src="../../static/my/my-delivery.png" class="wallet-img"></image>
				<text>麦吉配送</text>
			</view>
			<view class="wallet-cell"  @click="navTo('/pages/user/feedback')">
				<img src="../../static/my/my-feedback.png" class="wallet-img"></image>
				<text>意见反馈</text>
			</view>
		</view>
		<!-- ab -->
		<view class="ab">
			<img :src="abImg" alt="">
		</view>
		<!-- 好货推荐 -->
		<view class="hot-goods">
			<view class="hot-title">
				<img src="../../static/title_01.png" alt="">
			</view>
			<view class="goodsList">
				<view v-for='(item,index) in goodsList' class="goodsList-list">
					<img :src="item.img" alt="">
					<view class="goods-title">
						<text>{{item.title}}</text>
					</view>
					<view class="goods-subTitle">
						<text>{{item.subTitle}}</text>
					</view>
					<view class="goods-jifen">
						<text>{{item.jifen+'积分'}}</text>
					</view>
					<view class="goods-price">
						<text>{{'$'+item.price}}</text>
						<van-icon name="add" color ='#F55641' size='38px'/>
					</view>
				</view>
			</view>
			
		</view>
	</view>


	</view>
</template>
<script>
	import axios from '@/utils/uniAxios.js'
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			// uniCard
		},
		data() {
			return {
				shoucang:1,
				zuji:0,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				abImg:'../../static/banner_01.png',
				goodsList:[
					{
						img:'../../static/egg_01.png',
						title:'正宗农家散养谷饲土鸡蛋20枚',
						subTitle:'宇宙无敌巨好吃的鸡蛋',
						jifen:'200',
						price:999.90
					},
					{
						img:'../../static/egg_01.png',
						title:'正宗农家散养谷饲土鸡蛋20枚',
						subTitle:'宇宙无敌巨好吃的鸡蛋',
						jifen:'200',
						price:999.90
					},
					{
						img:'../../static/egg_01.png',
						title:'正宗农家散养谷饲土鸡蛋20枚',
						subTitle:'宇宙无敌巨好吃的鸡蛋',
						jifen:'200',
						price:999.90
					}
				]
			}
		},
		onLoad(option) {
			console.log(option)
			// 获取用户信息
			axios.get('/sso/user/userInfo').then(res=>{
				console.log(res)
			})
			this.loadData()
		},
		// // #ifndef MP
		// onNavigationBarButtonTap(e) {
		// 	const index = e.index;
		// 	if (index === 0) {
		// 		this.navTo('/pages/set/set');
		// 	} else if (index === 1) {
		// 		// #ifdef APP-PLUS
		// 		const pages = getCurrentPages();
		// 		const page = pages[pages.length - 1];
		// 		const currentWebview = page.$getAppWebview();
		// 		currentWebview.hideTitleNViewButtonRedDot({
		// 			index
		// 		});
		// 		// #endif
		// 		uni.navigateTo({
		// 			url: '/pages/notice/notice'
		// 		})
		// 	}
		// },
		// #endif
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			// 个人资料
			accountManage(){
				if(uni.getStorageSync('setPhone')){
					uni.navigateTo({
						url:'../set/set?id='+'16'
					})
				}else{
					uni.navigateTo({
						url:'../public/login'
					})
				}
			},
			// 刷新页面,获取用户信息
			loadData(){
				axios.get('/sso/user/userInfo').then(res=>{
					
				})
			},
				
			// 查看更多订单
			lookOrder() {
				uni.navigateTo({
					url: '../order/order?state=0'
				});
			},
			account() {
				console.log(1111)
				uni.navigateTo({
					url: '../set/set'
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		}
	}
</script>
<style lang='scss'>
	
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 20upx;
	}

	page {
		background: #F2F2F2;
	}

	.user-order {
		width: 94%;
		margin: 0 auto;
		margin-top: -8%;
		margin-bottom: 10rpx;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

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

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
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
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}
	}

	.user-section {
		height: 352upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}

		.login-now {
			width: 184rpx;
			height: 40rpx;
			background: rgba(254, 201, 89, 1);
			border-radius: 20rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			box-sizing: border-box;
			padding-left: 40rpx;
			line-height: 40rpx;
			position: absolute;
			right: -26rpx;
			top: 26rpx;
			z-index: 900;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}

	}

	.info-box {
		margin-left: 30rpx;
		text-align: left;
		text {
			display: block;
		}

		.username {
			font-size: 34rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
		}

		.info-mobile {
			font-size: 26rpx;
			font-weight: 500;
			color: rgba(255, 255, 255, 1)
		}

	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		/* margin-top: -150upx; */
		/* padding: 0 30upx; */
		position: relative;
		background: #f5f5f5;
		/* padding-bottom: 20upx; */

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		padding: 28upx 0;

		/* margin-top: 20upx; */
		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}

	.list-cell.b-b[data-v-bca0a98e]:after {
		left: 0;
	}

	/* 我的足迹 */
	.my-footprint {
		width: 94%;
		height:140rpx ;
		border-radius: 20rpx;;
		margin: 0 auto;
		background: #fff;
		.my-footprint-box{
			width: 60%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.my-foot-num{
				font-size:30rpx;
				font-weight:bold;
				color:rgba(88,88,88,1);
				margin-bottom: 8rpx;
			}
			.my-foot-title{
				font-size:24rpx;
				font-weight:500;
				color:rgba(88,88,88,1);
			}
			view{
				text-align: center;
				text{
					display: block;
				}
				
			}
			
		}
	}
	.wallet{
		border-radius: 20rpx;
		width: 94%;
		margin: 0 auto;
		margin-top: 20rpx;
		background: #fff;
		box-sizing: border-box;
		padding-left:30rpx;
		.wallet-cell{
			height: 100rpx;
			font-size:26rpx;
			font-weight:400;
			color:rgba(88,88,88,1);
			display: flex;
			align-items: center;
			border-bottom: 1px solid #E4E7ED;
		}
		.wallet-cell:nth-of-type(3){
			border-bottom: 0;
		}
		/* .wallet-cell:after{
			    position: absolute;
			    z-index: 3;
			    left: 34rpx;
			    right: 0;
			    height: 0;
			    content: '';
			    -webkit-transform: scaleY(0.5);
			    -ms-transform: scaleY(0.5);
			    transform: scaleY(0.5);
			    border-bottom: 1px solid #E4E7ED;
		} */
		
	}
	.wallet-cell .wallet-img{
		width: 34rpx;
		height: 34rpx;
		display: inline-block;
		margin-right: 24rpx;
	}
	/* ab */
	.ab{
		width: 94%;
		margin: 0 auto;
		margin-top: 40rpx;
		img{
			width: 100%;
			height: 210rpx;
		}
	}
	/* 好货推荐 */
	.hot-goods{
		margin-top: 28rpx;
		.hot-title{
			width: 60%;
			height: 40rpx;
			margin: 0 auto;
			text-align: center;
			margin-bottom: 28rpx;
			img{
				width: 100%;
				height: 40rpx;
			}
		}
		.goodsList{
			width: 94%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		
			.goodsList-list{
				width: 49%;
				background: #fff;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 20rpx 20rpx 30rpx 20rpx;
				img{
					width: 80%;
					height: 240rpx;
					margin: 0 auto;
					display: block;
				}
				.goods-title{
					font-size:22rpx;
					font-weight:500;
					color:rgba(69,69,69,1);
					margin-top: 20rpx;
				}
				.goods-subTitle{
					font-size:18rpx;
					font-weight:500;
					color:rgba(169,168,168,1);
					margin-top: 10rpx;
				}
				.goods-jifen{
					width:120rpx;
					border:1px solid rgba(245,86,65,1);
					border-radius:14px;
					text-align: center;
					font-size:26rpx;
					font-weight:500;
					color:rgba(245,86,65,1);
					line-height:36rpx;
					margin-top: 16rpx;
				}
				.goods-price{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 42rpx;
					font-size:20px;
					font-weight:500;
					color:rgba(245,86,65,1);
				}
			}
		}
		
	}
	.info-box .authorize{
		position: absolute;
		right: 50%;
		top: 38%;
		text-align: center;
		padding-left: 0;
	}
</style>
