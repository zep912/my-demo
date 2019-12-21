<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y='true' @scrolltolower="lower">
					<!-- 空白页 -->
					<view class="delivery-empty" v-if="deliverylist.length === 0">
						<img src="../../static/delivery/emptybg.png" alt="">
						<view class="">啥都没有~</view>
					</view>
					<!-- 订单列表 -->
					<view class="tab-tips"  v-if="deliverylist.length !== 0">
						<text>提示:{{nowModel}}</text>
					</view>
					<view v-for="(item,index) in deliverylist" :key="index" class="order-item">
						<view class="delivery-list-tab">
							<!-- 时间 -->
							<view class="tab-time">
								<view>送达: <text>今天 </text><text> {{item.sendRemark}}</text></view>
								<view class="tab-time-countDown" v-show='item.sendStatus!=2'>
									<image src="../../static/delivery/shalou.png" alt="" class="tab-time-img">
									<van-count-down :time="time" format="DD天HH:mm:ss"></van-count-down>
								</view>
							</view>
							<!-- 步骤 -->
							<view class="tab-step">
								<view class="tab-step-top">
									<!-- <text class="tips">{{'#'+item.info.a}}</text>
									<text class="tips">{{'#'+item.info.b}}</text>
									<text class="tips">{{'#'+item.info.c}}</text> -->
									<text class="tips">{{'#'+20}}</text>
									<text class="tips">{{'#'+'麦田圈预单'}}</text>
									<text class="tips">{{'#'+'预'}}</text>
								</view>
								<!-- 步骤 -->
								<van-steps
								  :steps="item.steps"
								  :active="active"
								  direction="vertical"
								  active-color="#F7B52C"
								  custom-class='tab-van-step'
								>
								</van-steps>
							</view>
							<!-- 送单详情 -->
							<!-- <van-transition :show="tabInfoShow" custom-class="block" name="fade-down"> -->
							  <view class="tab-info" v-if='tabInfoShow'>
							  	<text class="block">内容: <text>{{item.msg.content}}</text></text>
							  	<text class="block">单号: <text>{{item.orderSn}}</text></text>
							  	<text class="block">来源: <text>{{item.detailAddress}}</text></text>
							  	<text class="block">备注: <text>{{item.msg.beizhu}}</text></text>
							  	<text class="block">标识: <text>{{item.msg.biaoshi}}</text></text>
							  	<text class="block">下单: <text>{{timestampToTime(item.createTime)}}</text></text>
							  </view>
							<!-- </van-transition> -->
							
							<!-- 收起 -->
							<view class="tab-ret">
								<view @click="look">
									<text>{{tabLook}}</text>
									<van-icon :name="iconName" />
								</view>
								
								<button class="tab-btn" :disabled="item.sendStatus==2">{{item.sendStatus==1?'配送中':item.sendStatus==2?'已送达':item.sendStatus==3?'转出':'去取件'}}</button>
							</view>
						</view>
					</view>
					<view class="loading" v-if="deliverylist.length !== 0">{{loadingText}}</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 底部 -->
		<view class="de-foot">
			<view class="de-songdan" :class="{active:daliveryData === 1}" @click="sd(1)">
				<img :src="songdan" alt="">
				<text>全部送单</text>
			</view>
			<view class="de-jiedanset" @click="sd(2)" :class="{active:daliveryData === 2}">
				<img :src="jiedan" alt="">
				<text>接单设置</text>
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
				nowModel:'现在是收单模式',
				iconName:'arrow-down',
				tabLook:'查看',
				tabInfoShow:false,
				active:0,
				time: 30 * 60 * 60 * 1000,
				songdan: '../../static/delivery/songdan.png',
				jiedan: '../../static/delivery/jiedanset1.png',
				daliveryData: 1,
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '执行订单',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '取单中',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '配送中',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '已送达',
						loadingType: 'more',
						orderList: []
					}
				],
				deliverylist: [{
					state: 1,
					time: '15:12',
					countDown: 30 * 60 * 60 * 1000,
					shopName: '麦田圈官网旗舰店',
					state: 5,
					steps: [{
						text: '步骤一',
						desc: '描述'
					},
					{
						text: '步骤二',
						desc: '描述'
					}],
					info: {
						a: 20,
						b: '麦田圈预单',
						c: '预'
					},
					msg: {
						content:'海苔沙拉炒饭',
						price:'15.00',
						num:1,
						oddNum:'6546545646464546',
						sorce:'校内订单',
						beizhu:'好的',
						biaoshi:25,
						time:'2019-11-14 12:12:00'
					}
				}],
				sendStatus:0,
				page:{
					current:1,
					pageSize:10
				},
				step:{},
				stepa:[],
				stepArrr:[],
				optionState:'',
				loadingText:'加载中...'
			};
		},

		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = 0;
			this.optionState = 3;
			this.loadData('tabChange',3);
		},
		methods: {
			lower(){
				this.page.current=1;
				this.loadData('tabChange',this.optionState)
			},
			newDate(time){
				var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				return date
			},
			look(){
				if(!this.tabInfoShow){
					this.tabInfoShow = true;
					this.tabLook = '收起';
					this.iconName='arrow-up';
				}else{
					this.tabInfoShow = false;
					this.tabLook = '查看';
					this.iconName='arrow-down';
				}
				
			},
			// 跳转页面
			sd(e) {
				if(e==1){
					this.songdan = '../../static/delivery/songdan.png';
					this.jiedan = '../../static/delivery/jiedanset1.png';
					this.daliveryData = 1;
					uni.navigateTo({
						url:'deliverylist'
					})
				}else if(e==2){
					this.songdan = '../../static/delivery/songdan2.png';
					this.jiedan = '../../static/delivery/jiedanset.png';
					this.daliveryData = 2
					uni.navigateTo({
						url: 'set'
					})
				}
			},
			//获取订单列表
			loadData(source,n) {
				this.page.current = 1;
				let obj = {
					pageNum:this.page.current,
					pageSize:this.page.pageSize,
					sendStatus:n
				}
				this.deliverylist=[];
				axios.post('/sendInformation/list',obj).then(res=>{
					let result = res.data.data;
					if(res.data.data.length!=0){
						this.deliverylist = res.data.data;
						
						result.forEach(el=>{
							this.stepArrr = [];
							this.stepArrr.push(el.detailAddress,el.receiverDetailAddress)
						})
						this.stepa = []
						
						for(let i=0;i<this.stepArrr.length;i++){
							this.step = {}
							this.step['text'] = this.stepArrr[i]
							this.step['desc'] = '';
							this.stepa.push(this.step);
						}
						this.deliverylist.forEach(el=>{
							el['steps'] = this.stepa
						})
						if(this.deliverylist.length==res.data.total){
							this.loadingText = '已全部加载'
							return false;
						}else{
							this.loadingText = '上拉加载更多'
						}
					}
				})
			},

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.page.current=1;
				if(this.tabCurrentIndex==0){//已转出
					this.optionState = 3;
					this.loadData('tabChange',3);
				}else if(this.tabCurrentIndex==1){
					this.nowModel = '现在是取单模式'
					this.optionState = 0;
					this.loadData('tabChange',0);
				}else if(this.tabCurrentIndex==2){
					this.loadData('tabChange',1);
					this.optionState = 1;
					this.nowModel = '正在配送'
				}else if(this.tabCurrentIndex==3){
					this.optionState = 2;
					this.loadData('tabChange',2);
					this.nowModel = '已送达'
				}
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			timestampToTime (time) {
				var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear()
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
				var D = date.getDate()
				var h = date.getHours() + ':'
				var m = date.getMinutes() + ':'
				var s = date.getSeconds();
				return Y+'-'+M+'-'+D+' '+h+m+s
			},
		},
	}
</script>

<style lang="scss">
	.loading {
		text-align: center;
		font-size: 26rpx;
		margin-top: 10px;
	}
	// 空白页
	.delivery-empty {
		text-align: center;
		padding-top: 128rpx;

		img {
			width: 566rpx;
		}

		view {
			font-size: 30rpx;
			font-weight: 500;
			color: rgba(179, 179, 179, 1);
		}
	}

	page,
	.content {
		background: #F2F2F2;
		height: 100%;
		padding-top: 20px;
	}

	.swiper-box {
		height: calc(100% - 20px);
		margin-bottom: 100px;
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

	.tab-tips {
		width: 323rpx;
		height: 46rpx;
		background: rgba(247, 181, 44, 0.2);
		// opacity:0.15;
		border-radius: 23rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		text {
			font-size: 24rpx;
			font-weight: 500;
			color: rgba(247, 181, 44, 1);
		}
	}

	.order-item {
		width: 94%;
		margin: 0 auto;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-top: 16upx;
		padding-top: 34rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		.delivery-list-tab {
			font-size: 24rpx;
			font-weight: 500;
			color: rgba(81, 81, 81, 1);
			.tab-time {
				display: flex;
				justify-content: space-between;
				padding-bottom: 32rpx;
				border-bottom: 1px solid #F2F2F2;
				width: 100%;
				.tab-time-img {
					width: 20rpx;
					height: 26rpx;
					margin-right: 18rpx;
				}
				.tab-time-countDown{
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
		.tab-step{
			border-bottom: 1px solid #f2f2f2;
			padding-bottom: 26rpx;
			.tab-step-top{
				margin-top: 20rpx;
				margin-bottom: 40rpx;
				.tips{
					background:rgba(247,181,44,0.2);
					border-radius:18rpx;
					font-size:24rpx;
					font-weight:500;
					color:rgba(247,181,44,1);
					line-height:16rpx;
					padding-left: 10rpx;
					padding-right: 10rpx;
				}
				.tips:nth-of-type(2){
					margin-right: 20rpx;
					margin-left: 20rpx;
				}
			}
		}
		.tab-info{
			.block{
				display: block;
			}
			font-size:24rpx;
			font-weight:500;
			color:rgba(146,145,145,1);
			line-height:46rpx;
			padding-bottom: 26rpx;
			margin-top: 30rpx;
			border-bottom: 1px solid #f2f2f2;
		}
		.tab-ret{
			margin-top: 38rpx;
			padding-bottom: 38rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.tab-btn{
				width:170rpx;
				height:60rpx;
				background:rgba(247,181,44,1);
				border-radius:30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size:28rpx;
				font-family:PingFang SC;
				font-weight:bold;
				color:rgba(255,255,255,1);
				margin-left: 0;
				margin-right: 0;
			}
			view{
				font-size:24rpx;
				font-weight:500;
				color:rgba(146,145,145,1);
				display: flex;
				justify-content: center;
			}
		}
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

	.de-foot {
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: space-around;
		align-items: center;

		img {
			display: block;
			width: 35rpx;
			height: 42rpx;
			margin: 0 auto;
			margin-bottom: 8rpx;
		}

		text {
			display: block;
			font-size: 20rpx;
			font-weight: 500;
			color: rgba(194, 194, 194, 1);
		}

		.de-songdan,
		.de-jiedanset {
			/* display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap; */
		}
	}

	.active text {
		color: #FCAA00;
	}
</style>
