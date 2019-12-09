<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-position-box" @click="navToPosition">
			<uni-icons type="location-filled" color ='#F7B62C' size="20"></uni-icons>
			<text class="position-text">华中农业大学</text>
			<uni-icons type="arrowdown" color ='#F7B62C' size="20"></uni-icons>
		</view>
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" @click="navToSearch"/>
			<uni-icons type="chat" size="30" color ='#ffffff99' @click="navToMessage"></uni-icons>
		</view>
		<!-- #endif -->
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing"></view>
			<!-- 背景色区域 -->
			<swiper class="carousel" indicator-dots autoplay circular @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage(item)">
					<image :src="item.pic" />
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" v-for="(item, index) in productCategoryList" :key="index">
				<image :src="item.icon"></image>
				<view>{{item.name}}</view>
			</view>
		</view>

		<!-- 限时抢购 -->
		<!-- <view class="seckill-section m-t">
			<view class="s-header">
				<text class="tip-title">限时抢购</text>
				<text class="tip-timer">
					<text class="tip">{{homeFlashTime}}点场</text>
					<text class="timer">01天06时29分</text>
				</text>
				<text class="yticon">坚果特惠
					<text class="yticon icon-you"></text>
				</text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in productList" :key="index" class="floor-item" @click="navToDetailPage(item)">
						<image :src="item.pic" mode="aspectFill"></image>
						<text class="title pre-line">{{item.name}}</text>
						<text class="tag">秒杀</text>
						<view class="pos-r">
							<view class="price">¥{{item.promotionPrice}}</view>
							<view class="price-old">¥{{item.originalPrice}}</view>
							<uni-icons class="pos-a" type="plus-filled" color ='#F55641' size="30"></uni-icons>
						</view>
					</view>
				</view>
			</scroll-view>
		</view> -->

		<!-- 限量秒杀新品，比手快 -->
		<!--<view class="hot-goods">-->
			<!--<view class="hot-title">-->
				<!--<img src="../../static/index/btbg.png" alt="">-->
				<!--<view class="title">限量秒杀新品，比手快</view>-->
			<!--</view>-->
			<!--<view class="poster-content">-->
				<!--<view class="content-item" v-for="(item, index) in newProductList" :key="index" @click="navToDetailPage(item)">-->
					<!--<image :src="item.pic"></image>-->
				<!--</view>-->
				<!--<view class="content-item">-->
					<!--<image src="/static/index/sg.png"></image>-->
				<!--</view>-->
			<!--</view>-->
		<!--</view>-->
		<!-- 精选美味，等你来吃 -->
		<view class="hot-goods">
			<view class="hot-title">
				<img src="../../static/index/btbg.png" alt="">
				<view class="title">精选美味，等你来吃</view>
			</view>
			<view class="poster-content" @click="navToCate">
				<view class="content-item">
					<image src="/static/index/box.png"></image>
				</view>
				<view class="content-item">
					<image class="img-50" src="/static/index/three.png"></image>
					<image class="img-50" src="/static/index/five.png"></image>
				</view>
			</view>
		</view>
		<!-- 酸甜可口的酸奶盖，等你来舔 -->
		<view class="hot-goods">
			<view class="hot-title">
				<img src="../../static/index/btbg.png" alt="">
				<view class="title">酸甜可口的酸奶盖，等你来舔</view>
			</view>
			<view class="box-grid" @click="navToCate">
				<image src="/static/index/cja.png"></image>
				<image src="/static/index/lmja.png"></image>
				<image src="/static/index/ja.png"></image>
			</view>
			<view class="box-100" @click="navToCate">
				<image src="/static/index/xptj.png"></image>
			</view>
		</view>
		<!-- 花里胡哨的包包，等你来剁手 -->
		<view class="hot-goods" @click="navToCate">
			<view class="hot-title" @click="navToCate">
				<img src="../../static/index/btbg.png" alt="">
				<view class="title">花里胡哨的包包，等你来剁手</view>
			</view>
			<view class="box-grid box-100">
				<image src="/static/index/prxd.png"></image>
			</view>
		</view>
		
		<view class="hot-goods">
			<view class="hot-title">
				<img src="../../static/index/btbg.png" alt="">
				<view class="title">好货推荐</view>
			</view>
			<view class="goodsList">
				<view v-for='(item, index) in skuList' :key="index" class="goodsList-list" @click="navToDetailPage(item)">
					<img :src="item.pic" alt="">
					<view class="goods-title">
						<text>{{item.name}}</text>
					</view>
					<view class="goods-subTitle">
						<text>{{item.subTitle}}</text>
					</view>
					<view class="goods-jifen">
						<text>{{item.giftPoint+'积分'}}</text>
					</view>
					<view class="goods-price">
						<text>{{'¥'+item.originalPrice}}</text>
						<uni-icons type="plus-filled" color ='#F55641' size="30"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<!-- 微信登录  自动弹窗-->
		<view class="weixinLogin" v-if="isCanUse">
			<text class="weixinX" @click="close">X</text>
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
	import axios from '@/utils/uniAxios.js'
	import {uniSearchBar} from "@/components/uni-search-bar/uni-search-bar.vue";
	import {uniIcons} from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {uniSearchBar, uniIcons},
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				isCanUse: true, //默认为true
				skuList:[
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
				],
				productList: [],
				homeFlashTime: '00',
				newProductList: [],
				productCategoryList: []
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
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) => {
						this.$store.commit('login', infoRes.userInfo);
						this.isCanUse = false;
					},
					fail(res) {}
				})
			},
			login() {
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						let code = loginRes.code;
						console.log(this.$store.state.hasLogin, this.$store.state, loginRes, 'loginRes');
						this.isCanUse = !this.$store.state.hasLogin;
						if (!this.isCanUse) {
							//非第一次授权获取用户信息
							this.wxGetUserInfo()
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
            // 手机号登录
            toPhone() {
                uni.navigateTo({url: '/pages/public/login'})
            },
            close(){
                this.isCanUse=false
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
                this.getHomeList();
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
                let id = item.id;
                uni.navigateTo({
                	url: `/pages/product/product?id=${id}`
                })
            },
            navToPosition() {
                uni.navigateTo({
                    url: `/pages/index/selectPosition`
                })
            },
			navToMessage() {
				uni.navigateTo({
					url: '/pages/message/orderWarn'
				})
			},
            navToSearch() {
                uni.navigateTo({
                    url: `/pages/index/search`
                })
            },
            navToCate() {
              uni.switchTab({
                url: `/pages/category/category`
              })
            },
            getHomeList() {
                axios.post('/home/list', {}).then(({data})=>{
                    if (data.code === 200) {
                        this.carouselList = data.data.advertiseList || [];
                        this.productCategoryList = data.data.productCategoryList || [];
                        this.skuList = data.data.hotProductList || [];
                        this.newProductList = data.data.newProductList || [];
                        this.productList = data.data.homeFlashPromotion.productList || [];
                        if (data.data.homeFlashPromotion.startTime) this.homeFlashTime = new Date(data.data.homeFlashPromotion.startTime).getHours() - 8;
                        // this.dataRes = data.data;
                    }
                })
            }
	    }
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
		.weixinX{
			position: absolute;
			right: 5%;
			top: 2%;
			font-size: 14px;
			color: #333;
		}

	}
	
	.uni-list-cell-db {
		background: #fff;
	}
	
	.container {
		padding-top: 80upx;
	}

	/* #ifdef MP */
	.mp-position-box {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		padding: 0 20upx;
		height: 80upx;
		line-height: 80upx;
		background-color: #fff;
		z-index: 9999;
		.position-text {
			padding: 0 10upx;
			font-size: $font-lg;
			color: #F7B62C;
		}
	}
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 100upx;
		z-index: 999;
		width: 100%;
		padding: 0 20upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			margin-right: 80upx;
			background: rgba(255,255,255,.6);
			padding: 0 20upx;
		}
		uni-icons {
			position: absolute;
			top: 0;
			right: 20upx;
		}
		// .ser-input {
		// 	flex: 1;
		// 	height: 56upx;
		// 	line-height: 56upx;
		// 	font-size: 28upx;
		// 	color: $font-color-base;
		// 	.uni-searchbar__box {
		// 		border: none;
		// 		background: rgba(255, 255, 255, .6);
		// 		border-radius: 20px;
		// 		justify-content: left;
		// 		padding: 0 10upx;
		// 	}
		// }
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
		color: #454545;
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
			width: 90upx;
			height: 90upx;
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
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			
			.tag {
				padding: 0 20upx;
				fon-size: 20upx;
				border: 1upx solid #F55641;
				border-radius: 50upx;
				color: #F55641;
			}

			.price {
				color: $uni-color-primary;
			}
		}
	}

	.pre-line {
		white-space: pre-line;
		display: block;
		font-size: 18upx;
		height: 64upx;
	}

	.ui-poster {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: $font-base;
		text-align: center;
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

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
	.pos-r {
		position: relative;
	}
	
	.pos-a {
		position: absolute;
		right: 0;
		top: -24upx;
	}
	
	.price {
		font-size: $font-lg+2;
		color: $uni-color-primary;
		line-height: 1;
	}
	.price-old {
		font-size: $font-sm;
		line-height: 1;
		text-decoration: line-through;
		color: #999;
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
	
	/* 好货推荐 */
	.hot-goods{
		margin-top: 28rpx;
		.hot-title{
			width: 60%;
			height: 40rpx;
			margin: 0 auto;
			text-align: center;
			margin-bottom: 28rpx;
			position: relative;
			img{
				width: 100%;
				height: 20upx;
			}
			.title {
				position: absolute;
				left: 50%;
				top: 0;
				transform: translateX(-50%);
				width: 100vw;
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

	uni-tabbar .uni-tabbar__icon {
		width: 40rpx;
		height: 40rpx;
	}
</style>
