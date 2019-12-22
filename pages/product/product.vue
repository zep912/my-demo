<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in productInfo.albumPics" :key="index">
					<view class="image-wrapper">
						<image
							:src="item" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
			</swiper>

		</view>
		
		<view class="introduce-section">
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{productInfo.price}}</text>
				<text class="m-price">¥{{productInfo.originalPrice}}</text>
			</view>
			<text class="title">{{productInfo.name}}</text>
			<view class="row">规格: {{productInfo.weight}}g/{{productInfo.unit}}</view>
			<view class="row bot-row">
				<text>限购1件</text>
				<text>库存{{productInfo.stock}}</text>
			</view>
		</view>
		
		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit">领券</text>
				<view class="con-list">
					<view><text class="tag">5元优惠券</text><text class="tag">5元优惠券</text></view>
				</view>
			</view>
		</view>
		
		<view class="c-list">
			<view class="c-row b-b" v-if="productInfo.productFullReductionList.length">
				<text class="tit">活动</text>
				<view class="con-list">
					<!-- <view><text class="tag">新用户</text><text>新用户首次下单可立减20元</text></view> -->
					<view>
						<text class="tag">满减</text>
						<text>{{productInfo.productFullReductionList.map(item => `满${item.fullPrice}减${item.reducePrice}`).join('，')}}</text>
					</view>
					<!-- <view><text class="tag">满增</text><text>订单满100赠送热销商品</text></view> -->
				</view>
			</view>
		</view>
		
		<!-- 评价 -->
		<!-- <view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view> 
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view> -->
		
		<view class="detail-desc" v-if="productInfo.detailMobileHtml">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="productInfo.detailMobileHtml"></rich-text>
		</view>
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/message/customer" open-type="switchTab" class="p-b-btn">
				<text class="iconfont icon-kefu"></text>
				<text>客服</text>
			</navigator>
			<navigator url="/pages/shopcar/shopcar" open-type="switchTab" class="p-b-btn">
				<text class="iconfont icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
				<text class="iconfont icon-shoucang"></text>
				<text>收藏</text>
			</view>
			<view class="action-btn-group">
				<button type="primary" class="action-btn no-border buy-now-btn" @click="openBuy">立即购买</button>
				<button type="primary" class="action-btn no-border add-cart-btn" @click="addCart">加入购物车</button>
			</view>
		</view>

		
		<!-- 分享 -->
		<!-- <share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share> -->
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-box">
				<view class="header">
					<view class="img-box"><image :src="sku.pic" alt=""></view>
					<view class="title">
						<view class="goods-title">{{sku.name}}</view>
						<view class="goods-subTitle">{{sku.subTitle}}</view>
					</view>
				</view>
				<view class="attr-box">
					<view class="item-box" v-for="item in sku.productAttributeValueList" :key="item.id">
						{{item.value}}
					</view>
				</view>
				<view class="shopcar-add">
					<view>仅剩{{sku.stock}}件</view>
					<view class="add">
						<text class="add-radius minus" @click="minus">-</text>
						<text>{{sku.quantity}}</text>
						<text class="add-radius plus" @click="add">+</text>
					</view>
				</view>
				<button class="btn" @click="buy">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	// import share from '@/components/share';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default{
		components: {
			uniPopup
			// share
		},
		data() {
			return {
				specClass: 'none',
				specSelected:[],
				productInfo: {
					albumPics: [
						'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg',
						'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg',
						'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
					],
					desc: `
						<div style="width:100%">
							<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
							<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
							<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
							<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
							<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
						</div>
					`,
					productFullReductionList: [
						{id: 144, productId: 46, fullPrice: 39, reducePrice: 10},
						{id: 145, productId: 46, fullPrice: 69, reducePrice: 20}
					]
				},
				favorite: false,
				id: '',
				sku: {}
			};
		},
		async onLoad(options){
			
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			this.id = options.id;
			if(this.id){
				this.productInfoById(this.id);
				// this.$api.msg(`点击了${this.id}`);
			}
		},
		onShow() {
			uni.login({
				provider: 'weixin',
				success: (loginRes) => {
					let code = loginRes.code;
					uni.setStorageSync('code', code)
				}
			})	
		},
		methods:{
			//收藏
			toFavorite() {
				this.favorite = !this.favorite;
				const {id} = this.productInfo;
				axios.post('/member/collection/addProductCollection',{productId:id}).then(res=>{
					if(res.data.code===200){
						this.$api.msg('收藏成功')
					}
				})
			},
			//分享
			// share(){
			// 	this.$refs.share.toggleMask();	
			// },
			openBuy() {
				this.$refs.popup.open()
			},
			buy(){
				axios.post('/pay/quickOrderPay', {productId: this.id, quantity: this.sku.quantity, sp1: ''}).then(({data}) => {
					if (data.code === 200) {
						this.payBtn(data.data);
						// uni.navigateTo({
						// 	url: `/pages/shopcar/postOrder?deleIds=${JSON.stringify([data.data.orderId])}`
						// })
					} else {
						this.$api.msg('服务器繁忙，请重试');
					}
				});
				
			},
			addCart() {
				const {id, productCategoryId} = this.productInfo;
				axios.post('/cart/add', {productId: id, productCategoryId}).then(({data}) => {
					if (data.code === 200) {
						this.$api.msg('已成功加入购物车')
					} else {
						this.$api.msg(data.message)
					}
				});
			},
			productInfoById(id) {
				axios.post('/product/productInfoById', {id}).then(({data}) => {
					console.log(data);
					if (data.code === 200) {
						this.productInfo = data.data;
						this.productInfo.albumPics = this.productInfo.albumPics ? this.productInfo.albumPics.split(',') : [this.productInfo.pic];
						this.sku = Object.assign({quantity: 1}, data.data, {stock: data.data.stock - 1});
					}
				})
			},
			// 同时判断总价
			minus() {
				if (this.sku.quantity == 1) {
					this.sku.quantity = 1;
				} else {
					this.sku.quantity--;
					this.sku.stock++;
				}
			},
			// 增加商品数量
			add(item) {
				if (this.sku.stock === 0) {
					return;
				} else {
					this.sku.quantity++;
					this.sku.stock--;
				}
			},
			// 立即支付
			payBtn(order) {
				let code = uni.getStorageSync('code');
				let obj = {
					code: code, //code
					orderSn: order.orderSn, //订单编号orderSn
					payType: 3, //支付类型
					rechargeMoney: order.totalAmount, //支付金额s
				}
				let _this = this;
				axios.post('/pay/payOrder', obj).then(res => {
					console.log(res)
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
			},
			stopPrevent(){}
		},

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		margin: -20upx 20upx 20upx;
		border-radius: 20upx;
		position: relative;
		.title {
			font-size: 32upx;
			color: $font-color-dark;
			display: flex;
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$uni-color-primary;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.m-price{
			margin:0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}
		.row {
			font-size: $font-sm;
			color: $font-color-light;
			margin-top: 15upx;
		}
		.bot-row {
			text{
				padding-right: 20upx;
			}
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		margin: 20upx 0;
		.c-row{
			display:flex;
			padding: 20upx 30upx 10upx;
			position:relative;
		}
		.tit{
			padding-right: 10upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
			view {
				flex: 1;
				margin-bottom: 10upx;
				display: inline-flex;
				.tag {
					font-size: $font-sm;
					min-width: 100upx;
					padding: 0 10upx;
					text-align: center;
					margin-right: 20upx;
					border-radius: 30upx;
					border: 1upx solid $uni-color-primary;
				}
			}
		}

		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}
			.tip{
				flex: 1;
				text-align: right;
			}
			.icon-you{
				margin-left: 10upx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 100upx;
			height: 80upx;
			.iconfont{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .iconfont{
				color: $uni-color-primary;
			}
			.icon-shoucang{
				font-size: 40upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,#fa436a,#F56C6C);
			margin-left: 20upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
	
	.popup-box {
		width: 100vw;
		padding: 20upx;
		background: #fff;
		overflow: hidden;
		.header {
			display: flex;
			.img-box {
				width: 200upx;
				height: 200upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title {
				flex: 1;
				padding: 20upx;
				.goods-title {
					font-size:22rpx;
					font-weight:500;
					color:rgba(69,69,69,1);
					margin-top: 20rpx;
				}
				.goods-subTitle {
					font-size: 18upx;
					font-weight:500;
					color:rgba(169,168,168,1);
					margin-top: 10upx;
				}
			}
		} 
		.attr-box {
			display: flex;
			.item-box {
				padding: 0 20upx;
				height: 54upx;
				line-height: 54upx;
				background: #FFF5DF;
				border: 2upx solid #FFB003;
				border-radius: 27upx;
			}
		}
		.shopcar-add {
			font-size: 24rpx;
			color: #9E9E9E;
			text-align: center;
			display: flex;
			padding: 20upx 0;
			.minusClass,
			.plusClass {
				width: 28rpx;
				height: 28rpx;
				color: #F7B52C;
				border-radius: 50%;
				background: #F7B52C;
			}
		
			.add {
				font-size: 28rpx;
				flex: 1;
				text-align: right;

				.add-radius {
					display: inline-block;
					width: 28rpx;
					height: 28rpx;
					border-radius: 50%;
					border: 1px solid #F7B52C;
					line-height: 22rpx;
					text-align: center;
				}
		
				.minus {
					color: #F7B52C;
				}
		
				.plus {
					background: #F7B52C;
					color: #fff;
				}
		
				text:nth-of-type(2) {
					margin-right: 34rpx;
					margin-left: 34rpx;
					font-size: 28rpx;
					font-weight: 600;
					color: rgba(42, 42, 42, 1)
				}
			}
		}
		
		.btn {
			width: 690upx;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			background: #F7B52C;
			border-radius: 40upx;
			color: #fff;
		}
	}
</style>
