<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" />
		</view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<swiper class="carousel" indicator-dots autoplay circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item">
				<image src="/static/index/mz.png"></image>
			</view>
			<view class="cate-item">
				<image src="/static/index/mf.png"></image>
			</view>
			<view class="cate-item">
				<image src="/static/index/md.png"></image>
			</view>
			<view class="cate-item">
				<image src="/static/index/ms.png"></image>
			</view>
			<view class="cate-item">
				<image src="/static/index/mw.png"></image>
			</view>
		</view>

		<!-- 限时抢购 -->
		<view class="seckill-section m-t">
			<view class="s-header">
				<text class="tip-title">限时抢购</text>
				<text class="tip-timer">
					<text class="tip">10点场</text>
					<text class="timer">01天06时29分</text>
				</text>
				<text class="yticon">坚果特惠
					<text class="yticon icon-you"></text>
				</text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item" @click="navToDetailPage(item)">
						<image :src="item.image" mode="aspectFill"></image>
						<text class="title clamp">{{item.title}}</text>
						<text class="price">￥{{item.price}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 限量秒杀新品，比手快 -->
		<view class="ui-poster">
			限量秒杀新品，比手快
		</view>
		<view class="poster-content">
			<view class="content-item">
				<image src="/static/index/qjf.png"></image>
			</view>
			<view class="content-item">
				<image src="/static/index/sg.png"></image>
			</view>
		</view>
		<!-- 精选美味，等你来吃 -->
		<view class="ui-poster">
			精选美味，等你来吃
		</view>
		<view class="poster-content">
			<view class="content-item">
				<image src="/static/index/box.png"></image>
			</view>
			<view class="content-item">
				<image class="img-50" src="/static/index/three.png"></image>
				<image class="img-50" src="/static/index/five.png"></image>
			</view>
		</view>
		<!-- 酸甜可口的酸奶盖，等你来舔 -->
		<view class="ui-poster">
			酸甜可口的酸奶盖，等你来舔
		</view>
		<view class="box-grid">
			<image src="/static/index/cja.png"></image>
			<image src="/static/index/lmja.png"></image>
			<image src="/static/index/ja.png"></image>
		</view>
		<view class="box-100">
			<image src="/static/index/xptj.png"></image>
		</view>
		<!-- 花里胡哨的包包，等你来剁手 -->
		<view class="ui-poster">
			花里胡哨的包包，等你来剁手
		</view>
		<view class="box-grid box-100">
			<image src="/static/index/prxd.png"></image>
		</view>
		<!-- 品牌秒杀 -->
		<view class="ui-poster">
			品牌秒杀
		</view>
		<view class="brand-section">
			<view class="s-header">
				<view class="box-img">
					<image src="/static/logo/lppz.png"></image>
				</view>
				<view class="box-text">
					<view class="tip-title">良品铺子</view>
					<view class="tip">让嘴巴去旅行</view>
				</view>
				<view class="btn">
					<button type="warn" class="yticon" size="mini">查看更多
						<text class="icon-you"></text>
					</button>
				</view>
			</view>
			<view class="guess-section good-sku">
				<view v-for="(item, index) in goodsList" :key="index" class="guess-item" v-if="index <= 2" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.title}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<!-- 好货推荐 -->
		<view class="f-header m-t">
			<view class="tit-box">
				<text class="tit">好货推荐</text>
			</view>
		</view>

		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<text class="price">￥{{item.price}}</text>
			</view>
		</view>
		<!-- 微信登录  自动弹窗-->
		<view class="weixinLogin" v-if="isCanUse">
			<image src="../../static/delivery/logo.png" mode=""></image>
			<button type="primary" class="weixin" open-type="getUserInfo" withCredentials="true" lang="zh_CN"
			 @getuserinfo="wxGetUserInfo">微信一键登录</button>
			<button type="primary" class="mobile" @click="toPhone">手机号快捷登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {

		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			};
		},
		computed: {
					...mapState(['hasLogin', 'userInfo'])
				},
		onLoad() {
			this.loadData();
			this.login();
		},
		methods: {
			// 授权用户信息
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes)
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						_this.userInfo.nickName = nickName;
						_this.userInfo.avatarUrl = avatarUrl;
						_this.$store.commit('login',_this.userInfo)
						try {
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
							_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {}
				})
			},
			login() {
				let _this = this;
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						if (!_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									//获取用户信息后向调用信息更新方法
									let nickName = infoRes.userInfo.nickName; //昵称
									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									_this.updateUserInfo(); //调用更新信息方法
								}
							});
						}
						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						// uni.request({
						// 	url: '服务器地址',
						// 	data: {
						// 		code: code,
						// 	},
						// 	method: 'GET',
						// 	header: {
						// 		'content-type': 'application/json'
						// 	},
						// 	success: (res) => {
						// 		//openId、或SessionKdy存储//隐藏loading
						// 		uni.hideLoading();
						// 	}
						// })
					}
				})
			},
			// //向后台更新信息
			// updateUserInfo() {
			// 	let _this = this;
			// 	uni.request({
			// 		url: 'url', //服务器端地址
			// 		data: {
			// 			appKey: this.$store.state.appKey,
			// 			customerId: _this.customerId,
			// 			nickName: _this.nickName,
			// 			headUrl: _this.avatarUrl
			// 		},
			// 		method: 'POST',
			// 		header: {
			// 			'content-type': 'application/json'
			// 		},
			// 		success: (res) => {
			// 			if (res.data.state == "success") {
			// 				uni.reLaunch({ //信息更新成功后跳转到小程序首页
			// 					url: '/pages/index/index'
			// 				});
			// 			}
			// 		}
			// 	})
			// }
		// 手机号登录
		toPhone() {
			uni.navigateTo({url: '/pages/public/login'})
		},
		/**
		 * 请求静态数据只是为了代码不那么乱
		 * 分次请求未作整合
		 */
		async loadData() {
			let carouselList = await this.$api.json('carouselList');
			this.titleNViewBackground = carouselList[0].background;
			this.swiperLength = carouselList.length;
			this.carouselList = carouselList;

			let goodsList = await this.$api.json('goodsList');
			this.goodsList = goodsList || [];
		},
		//轮播图切换修改背景色
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
			this.titleNViewBackground = this.carouselList[index].background;
		},
		//详情页
		navToDetailPage(item) {
			//测试数据没有写id，用title代替
			let id = item.title;
			uni.navigateTo({
				url: `/pages/product/product?id=${id}`
			})
		},
	},
	// #ifndef MP
	// 标题栏input搜索框点击
	onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
	// #endif
	}
</script>

<style lang="scss">
	// 微信自动登录
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

	}

	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 0;
			border-radius: 20upx;
			margin: 20upx;
			margin-top: -10upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 0upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 128upx;
			margin-bottom: 14upx;
			opacity: .7;
		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 限时抢购 */
	.seckill-section {
		margin: 20upx;
		border-radius: 20upx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			height: 92upx;
			line-height: 1;
			background: url(../../static/index/xsqg.png) 100% no-repeat;
			border-radius: 20upx 20upx 0 0;
			color: #fff;
			font-size: $font-base;

			.tip-title {
				margin-left: 20upx;
			}

			.tip-timer {
				border-radius: 24upx;
				border: 1upx solid #fff;
				margin: 0 20upx;
			}

			.tip {
				background-color: #fff;
				font-size: $font-sm+2upx;
				color: red;
				border-radius: 18upx;
				padding: 0 6upx;
			}

			.timer {
				display: inline-block;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				margin: 0 20upx;
			}

			.yticon {
				flex: 1;
				text-align: right;
				font-size: $font-sm+2upx;
			}

			.icon-you {
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
				color: #fff;
			}
		}

		.floor-list {
			white-space: nowrap;
			padding: 20upx;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}
	}

	.ui-poster {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: $font-base;
		text-align: center;
		background: url(../../static/index/btbg.png) 100% no-reapat;
	}

	.poster-content {
		display: flex;
		margin: 20upx;

		.content-item {
			width: 49%;
			margin-right: 1%;

			&:last-of-type {
				margin-right: 0;
			}

			image {
				width: 100%;
				height: 250upx;
			}

			.img-50 {
				height: 120upx;
			}
		}
	}

	.box-grid {
		margin: 20upx 20upx 0 20upx;

		image {
			width: 33.33%;
			height: 210upx;
		}
	}

	.box-100 {
		margin: 0 20upx;

		image {
			width: 100%;
			height: 210upx;
		}
	}

	.brand-section {
		background: #fff;
		margin: 20upx;
		padding: 20upx;
		border-radius: 20upx;

		.s-header {
			display: flex;

			.box-img {
				width: 80upx;
				height: 80upx;
				padding: 12upx;
				border-radius: 50%;
				border: 1upx solid #ccc;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.box-text {
				margin-left: 20upx;
				width: 150upx;
				font-size: $font-sm;

				.tip-title {
					font-size: $font-sm+4upx;
				}

				.tip {
					color: #999999;
				}
			}

			.btn {
				flex: 1;
				text-align: right;
				color: #fff;
				margin-top: 20upx;
			}

			.yticon {
				height: 40upx;
				border-radius: 40upx;
				line-height: 40upx;
				padding: 0 5upx 0 15upx;
			}

			.icon-you {
				font-size: $font-lg;
				color: #fff;
				flex: 1;
				text-align: right;
			}
		}
	}

	.f-header {
		margin: 20upx 20upx 0 20upx;
		display: flex;
		align-items: center;
		padding: 10upx 20upx;

		// background: #fff;
		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.icon-you {
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}

	/* 团购楼层 */
	.group-section {
		background: #fff;
	}

	/* 猜你喜欢 */
	.guess-section {
		margin: 0 20upx 20upx;
		display: flex;
		flex-wrap: wrap;
		padding: 0;
		// background: #fff;
		border-radius: 20upx;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 49%;
			padding: 10upx;
			margin-bottom: 10upx;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			padding-bottom: 40upx;
			background: #fff;

			&:nth-child(2n+1) {
				margin-right: 2%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}

	/* 好物推荐 */
	.good-sku {
		.guess-item {
			width: 32%;
			margin-right: 2%;

			&:nth-child(3n) {
				margin-right: 0;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 210upx;
		}
	}

	uni-tabbar .uni-tabbar__icon {
		width: 40rpx;
		height: 40rpx;
	}
</style>
