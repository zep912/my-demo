<template>
	<view class="container">

		<view class="user-section">
			<image class="bg" src="../../static/my/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.avatarUrl || '../../static/my/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username" v-if='!authShow'>{{userInfo.nickName?userInfo.nickName:''}}</text>
					<text class="info-mobile" v-if='!authShow'>{{userInfo.phone}}</text>
					<!-- <view class='login-now authorize' @click="navTo('/pages/public/login')" v-if='authShow'>
						<text>点击授权登录</text>
					</view> -->
					<button class="weixin login-now authorize" @click="openLogin">点击授权登录</button>
				</view>

			</view>
			<view class='login-now' @click="accountManage">
				<text>账号管理</text>
			</view>	
		</view>
		<!-- 查看订单 -->
		<view class="user-order">
			<view class="list-cell b-b m-t" @click="navTo('/pages/order/order?state=')" hover-class="cell-hover"
			 :hover-stay-time="50" style="display: flex;align-items: center;">
				<text class="cell-tit">全部订单</text>
				<text class="cell-tip" @click="lookOrder">查看全部订单</text>
				<text class="iconfont icon-you" style="color: #909399;"></text>
				
			</view>
			<view class="cover-container">
				<!-- 订单 -->
				<view class="order-section">

					<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
						<text class="iconfont icon-daifukuan" style="color: #F7B52C;font-size: 28px;"></text>
						<text>待付款</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover" :hover-stay-time="50">
						<text class="iconfont icon-daishouhuo" style="color: #F7B52C;font-size: 28px;"></text>
						<text>待收货</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover" :hover-stay-time="50">
						<text class="iconfont icon-daipingjia" style="color: #F7B52C;font-size: 28px;"></text>
						
						<text>待评价</text>
					</view>
					<view class="order-item" @click="navTo('/pages/order/aftersale?state=5')" hover-class="common-hover"
					 :hover-stay-time="50">	
						<text class="iconfont icon-tuikuan_shouhou" style="color: #F7B52C;font-size: 28px;"></text>
						<text>退款/售后</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品-我的足迹 -->
		<view class="my-footprint">
			<view class="my-footprint-box">
				<view class="" @click="navTo('/pages/user/collect')">
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
			<view class="wallet-cell" @click="navTo('/pages/user/wallet')">
				<text class="iconfont icon-- wallet-img"></text>
				<view class="wallet_view">钱包</view>
			</view>
			<view class="wallet-cell" @click="deliveryClick">
				<text class="iconfont icon-peisong wallet-img"></text>
				<view class="wallet_view">麦吉配送</view>
			</view>
			<view class="wallet-cell" @click="navTo('/pages/user/feedback')">
				<text class="iconfont icon-pen- wallet-img"></text>
				<view>意见反馈</view>
			</view>
		</view>
		<!-- ab -->
		<!--<view class="ab">-->
		<!--<img :src="abImg" alt="">-->
		<!--</view>-->
		<!-- 好货推荐 -->
		<view class="hot-goods">
			<view class="hot-title">
				<img src="../../static/title_01.png" alt="">
			</view>
			<view class="goodsList">
				<view v-for='(item,index) in goodsList' :key="index" class="goodsList-list" @click="navToDetailPage(item)">
					<img :src="item.pic" alt="">
					<view class="goods-title">
						<text>{{item.name}}</text>
					</view>
					<view class="goods-subTitle">
						<text>{{item.subTitle}}</text>
					</view>
					<view class="goods-jifen">
						<text>{{item.jifen?item.jifen+'积分':'0积分'}}</text>
					</view>
					<view class="goods-price">
						<text>{{'¥'+item.price}}</text>
						<text class="iconfont icon-iconfontxinzeng"></text>
					</view>
				</view>
			</view>

		</view>
		<weixin-login ref="login" show></weixin-login>
	</view>
</template>
<script>
	import axios from '@/utils/uniAxios.js'
	import {weixinLogin} from '@/components/weixin-login.vue';
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			weixinLogin
			// uniCard
		},
		data() {
			return {
				shoucang: 0,
				zuji: 0,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				goodsList: [],
				authShow: true,
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			}
		},
		onLoad(option) {
			this.loadData();
			if (uni.getStorageSync('hasLogin')) {
				this.authShow = false
			} 
			this.hotList();
			
		},
		onShow() {
			this.getProductCollect();
			this.getFeedbackData()
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			openLogin() {
				this.$refs.login.open();
			},
			getProductCollect(){
				axios.post('/member/collection/productCollectionList').then(res=>{
					if(res.data.code===200){
						this.shoucang = res.data.data.length;
					}
				})
			},
			getFeedbackData(){
				axios.post('/member/readHistory/list').then(res=>{
					if(res.data.code===200&&res.data.data.length>0){
						this.zuji = res.data.data.length;
					}
				})
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			// 好货推荐
			hotList(){
				axios.post('/home/list').then(res=>{
					this.goodsList = res.data.data.hotProductList
				})
			},
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) => {
						this.login(infoRes.userInfo)
					}
				})
			},

			//登录
			login(userInfo) {
				uni.showLoading({
					title: '登录中...'
				});
				const {
					city,
					gender,
					avatarUrl,
					nickName,
					phone
				} = userInfo;
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log(loginRes, 'loginRes');
						let code = loginRes.code;
						axios.post('/sso/user/getOpenId', {
							code
						}).then(({
							data
						}) => {
							//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
							axios.post('/sso/user/miniLogin', {
								city,
								gender,
								icon: avatarUrl,
								nickname: 'nickName',
								"wxAppid": "wx35cb9f6acb94bd15",
								"wxOpenid": data.data.openId
							}).then((res) => {
								const response = res.data;
								console.log(response, 'response')
								if (response.code == 200) {
									this.authShow = false;
									this.$store.commit('login', userInfo);
									uni.setStorageSync('hasLogin', true);
									//openId、或SessionKdy存储//隐藏loading
									uni.setStorageSync('gt', response.data.token);
									uni.hideLoading();
								}
							})
						})
					}
				});
			},
			// 账号管理-个人资料
			accountManage() {
				// 手机号登录，或者微信登录，不是第一次登录
				if (uni.getStorageSync('setPhone') || uni.getStorageSync('gt') || !uni.getStorageSync('isCanUse')) {
					uni.navigateTo({
						url: '../set/set?id=' + this.userInfo.id
					})
				} else {
					uni.navigateTo({
						url: '../public/login'
					})
				}
			},
			// 麦吉配送
			deliveryClick() {
				if (uni.getStorageSync('deliveryPhone')) { //已经登录过
					uni.navigateTo({
						url: '../delivery/set'
					})
				} else {
					uni.navigateTo({
						url: '../delivery/delivery'
					})
				}
			},
			// 从登录页跳转过来，刷新页面,获取用户信息
			loadData() {
				// 优先使用微信登录
				let hasLogin = this.$store.state.hasLogin;
				if (hasLogin) {
					this.authShow = false;
					let id = ''
					axios.post('/sso/user/userInfo').then(res => {
						if (res.data.code == '200') {
							console.log(res)
							id = res.data.data.id;
							console.log(id)
							// axios.post('/sso/user/'+id).then(response=>{
							// 	console.log(response)
							// })
						}
					})
					
					// let setUserInfo = this.$store.state.userInfo;
					return;
				} else if (uni.getStorageSync('setPhone')) { //使用手机号登陆
					axios.post('/sso/user/userInfo').then(res => {
						if (res.data.code == '200') {
							this.authShow = false;
							this.userInfo.mobile = res.data.data.phone;
							this.userInfo.id = res.data.data.id;

							this.$store.commit('login', this.userInfo)
						}
					})
				}
			},

			// 查看更多订单
			lookOrder() {
				uni.navigateTo({
					url: '../order/order?state='
				});
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				console.log(this.hasLogin)
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
	.weixinLogin {
		width: 550rpx;
		height: 530rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 30rpx;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		padding-top: 46rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		text-align: center;

		image {
			width: 118rpx;
			height: 140rpx;
			margin-bottom: 67rpx;
		}

		button {
			width: 490rpx;
			height: 80rpx;
			background: rgba(75, 194, 102, 1);
			border-radius: 40rpx;
			font-size: 28rpx;
			color: rgba(255, 255, 255, 1);
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.weixin {
			margin-bottom: 40rpx;
		}

		.weixinX {
			position: absolute;
			right: 5%;
			top: 2%;
			font-size: 14px;
			color: #333;
		}

	}

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
			width: 160rpx;
			height: 40rpx;
			background: rgba(254, 201, 89, 1);
			border-radius: 20rpx 0 0 20rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			box-sizing: border-box;
			padding-left: 40rpx;
			line-height: 40rpx;
			position: absolute;
			right: 0;
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
		height: 140rpx;
		border-radius: 20rpx;
		;
		margin: 0 auto;
		background: #fff;

		.my-footprint-box {
			width: 60%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.my-foot-num {
				font-size: 30rpx;
				font-weight: bold;
				color: rgba(88, 88, 88, 1);
				margin-bottom: 8rpx;
			}

			.my-foot-title {
				font-size: 24rpx;
				font-weight: 500;
				color: rgba(88, 88, 88, 1);
			}

			view {
				text-align: center;

				text {
					display: block;
				}

			}

		}
	}

	.wallet {
		border-radius: 20rpx;
		width: 94%;
		margin: 0 auto;
		margin-top: 10rpx;
		background: #fff;
		box-sizing: border-box;
		padding-left: 30rpx;
		
		.wallet-cell {
			height: 100rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: rgba(88, 88, 88, 1);
			display: flex;
			align-items: center;
			
		}
		.wallet_view{
			width: 100%;
			height: 100%;
			border-bottom: 1px solid #E4E7ED;
			display: flex;
			align-items: center;
			box-sizing: border-box;
		}
		.wallet-cell:nth-of-type(3) {
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

	.wallet-cell .wallet-img {
		width: 34rpx;
		height: 34rpx;
		display: inline-block;
		margin-right: 24rpx;
	}

	/* ab */
	.ab {
		width: 94%;
		margin: 0 auto;
		margin-top: 40rpx;

		img {
			width: 100%;
			height: 210rpx;
		}
	}

	/* 好货推荐 */
	.hot-goods {
		margin-top: 28rpx;

		.hot-title {
			width: 60%;
			height: 40rpx;
			margin: 0 auto;
			text-align: center;
			margin-bottom: 28rpx;

			img {
				width: 100%;
				height: 34rpx;
			}
		}

		.goodsList{
			width: 710upx;
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
					width: 210upx;
					height: 260upx;
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
					font-size: 18upx;
					font-weight:500;
					color:rgba(169,168,168,1);
					margin-top: 10upx;
				}
				.goods-jifen{
					max-width: 100upx;
					border: 2upx solid rgba(245,86,65,1);
					border-radius:14upx;
					text-align: center;
					font-size: 18upx;
					font-weight:500;
					color:rgba(245,86,65,1);
					line-height: 32upx;
					margin-top: 16upx;
				}
				.goods-price{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20upx;
					font-size: 28upx;
					font-weight:500;
					color: rgba(245,86,65,1);
					.iconfont {
						font-size: 45upx;
						color: #F55641;
					}
				}
			}
		}
	}

	.info-box .authorize {
		position: absolute;
		right: 50%;
		top: 38%;
		text-align: center;
		padding-left: 0;
		display: flex;
		justify-content: center;
	}
	.authorize:after{
		border: 0;
	}
</style>
