<template>
	<view class="couponbox">
		<van-tabs :active="active" @change="onChange" animated tab-active-class='tabactive' nav-class='navtabClass'>
			<van-tab title="未使用" class='tab1'>
				<!-- 实现优惠券 -->
				<view class="wrap" v-if='arr.length!=0'>
					<view class="coupon">
						<view class="coupon-left">
							<view class="coupon-left-box">
								<img src="../../static/my/couponPrice.png" alt="">
								<text class="coupon-left-boxPrice">30</text>
								<text class="coupon-left-boxman">满100元可用</text>
							</view>
						</view>
						<view class="coupon-con">
							<view class="coupon-con-title">
								<text class="coupon-con-titles">店铺券 新用户专享优惠券</text>
								<text class="coupon-con-goods">
									坚果专区通用（部分除外）
								</text>
								<text class="coupon-con-time">09月1日-09月30日</text>
							</view>
							<button class="coupon-btn">立即使用</button>
						</view>
					</view>
				</view>
				<!-- 没有优惠券的状态 -->
				<empty :src="src" :msg='msg' v-if='arr.length==0'></empty>
			</van-tab>
			<van-tab title="已使用"  class='tab2'>
				<!-- 实现优惠券 -->
				<view class="wrap tabwrap" v-if='arr.length!=0'>
					<view class="coupon">
						<view class="coupon-left">
							<view class="coupon-left-box">
								<img src="../../static/my/beuesed.png" alt="">
								<text class="coupon-left-boxPrice">30</text>
								<text class="coupon-left-boxman">满100元可用</text>
							</view>
						</view>
						<view class="coupon-con">
							<view class="coupon-con-title">
								<text class="coupon-con-titles">店铺券 新用户专享优惠券</text>
								<text class="coupon-con-goods">
									坚果专区通用（部分除外）
								</text>
								<text class="coupon-con-time">09月1日-09月30日</text>
							</view>
							<!-- <button class="coupon-btn">立即使用</button> -->
							<img src="../../static/my/used.png" alt="" class='couponImg'>
						</view>
					</view>
				</view>
				<empty :src="src" :msg='msg' v-if='arr.length==0'></empty>
			</van-tab>
			<van-tab title="已过期"  class='tab3'>
				<!-- 实现优惠券 -->
				<view class="wrap tabwrap" v-if='arr.length!=0'>
					<view class="coupon">
						<view class="coupon-left">
							<view class="coupon-left-box">
								<img src="../../static/my/beuesed.png" alt="">
								<text class="coupon-left-boxPrice">30</text>
								<text class="coupon-left-boxman">满100元可用</text>
							</view>
						</view>
						<view class="coupon-con">
							<view class="coupon-con-title">
								<text class="coupon-con-titles">店铺券 新用户专享优惠券</text>
								<text class="coupon-con-goods">
									坚果专区通用（部分除外）
								</text>
								<text class="coupon-con-time">09月1日-09月30日</text>
							</view>
							<!-- <button class="coupon-btn">立即使用</button> -->
							<img src="../../static/my/Beoverdue.png" alt="" class='couponImg'>
						</view>
					</view>
				</view>
				<empty :src="src" :msg='msg' v-if='arr.length==0'></empty>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import empty from '@/components/empty.vue';
	import axios from '@/utils/uniAxios.js'
	export default {
		components:{
			empty
		},
		data() {
			return {
				active: 0,
				arr:[],
				src:'../static/my/nocoupon.png',
				msg:'您还没有任何优惠券，去看看其他的吧'
			}
		},
		onLoad() {
			this.getCoupon(0)
		},
		methods: {
			// 获取用户的优惠券列表
			getCoupon(n){
				axios.post('/member/coupon/list/cart/0',{type:0}).then(res=>{
					if(res.data.code==200){
						console.log(res)
					}
				})
			},
			onChange(event) {
				console.log(event)
				this.getCoupon(event.detail.name)
				// wx.showToast({
				// 	title: `切换到标签 ${event.detail.name}`,
				// 	icon: 'none'
				// });
			}
		}

	}
</script>

<style lang="scss">
	.couponbox .noCollect img{
		width: 176rpx;
		height: 118rpx;
	}
	.couponbox .tabactive {
		color: #F7B52C;
	}

	.couponbox .van-tabs__line {
		background: #F7B52C;
	}

	// 实现优惠券
	.wrap {
		width: 680rpx;
		margin: 30rpx auto;

	}

	.coupon {
		display: inline-block;
		// overflow:hidden;
		border-radius: 10rpx;
		position: relative;
	}

	.coupon-left {
		float: left;
		width: 200rpx;
		height: 200rpx;
		position: relative;
		display: flex;
		align-items: center;
		// padding-left: 44rpx;
		padding-top: 48rpx;
		padding-bottom: 48rpx;
	}

	.coupon-left::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50%;
		background: radial-gradient(circle at right top, transparent 10px, #F5F1DD 10px, #EAE5C7 10rpx)
	}
	

	
	.coupon-left::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50%;
		background: radial-gradient(circle at right bottom, transparent 10px, #F5F1DD 10px, #EAE5C7 10rpx)
	}

	.coupon-con {
		float: left;
		width: 480rpx;
		height: 200rpx;
		position: relative;
		padding-top: 32rpx;
		padding-bottom: 26rpx;
		padding-left: 32rpx;
	}

	.coupon-con::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50%;
		background: radial-gradient(circle at left top, transparent 10px, #F5F1DD 10px, #EAE5C7 10rpx)
	}

	.coupon-con::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50%;
		background: radial-gradient(circle at left bottom, transparent 10px, #F5F1DD 10px, #EAE5C7 10rpx)
	}
	
.tab2 .coupon-left::before, .tab3 .coupon-left::before{
	background: radial-gradient(circle at right top, transparent 10px, #EDEDED 10px, #EDEDED 10rpx)
}
.tab2 .coupon-left::after, .tab3 .coupon-left::after{
	background: radial-gradient(circle at right bottom, transparent 10px, #EDEDED 10px, #EDEDED 10rpx)
}
.tab2 .coupon-con::before,.tab3 .coupon-con::before{
	background: radial-gradient(circle at left top, transparent 10px, #EDEDED 10px, #EDEDED  10rpx)
}
.tab2 .coupon-con::after,.tab3 .coupon-con::after{
	background: radial-gradient(circle at left bottom, transparent 10px, #EDEDED 10px, #EDEDED  10rpx)
}

	.coupon-left-box {
		height: auto;
		width: 100%;
		position: absolute;
		border-right: 1px dashed #D0B07A;
		z-index: 200;

		img {
			position: absolute;
			left: 16%;
			top: 3%;
			color: rgba(185, 141, 93, 1);
			width: 20rpx;
			height: 20rpx;
		}

		.coupon-left-boxPrice {
			font-size: 80rpx;
			font-weight: 800;
			color: rgba(185, 141, 93, 1);
			// margin-bottom: 24rpx;
			display: block;
			text-align: center;
		}

		.coupon-left-boxman {
			display: block;
			font-size: 24rpx;
			font-weight: bold;
			color: rgba(185, 141, 93, 1);
			text-align: center;
		}
	}

	.coupon-con-title {
		position: absolute;

		text {
			display: block;
			position: relative;
			z-index: 200;
		}

		.coupon-con-titles {
			font-size: 26rpx;
			font-weight: bold;
			color: rgba(185, 141, 93, 1);
			margin-bottom: 30rpx;
		}

		.coupon-con-goods {
			font-size: 22rpx;
			font-weight: 500;
			color: rgba(185, 141, 93, 1);
			margin-bottom: 8rpx;
		}

		.coupon-con-time {
			font-size: 20rpx;
			font-weight: 400;
			color: rgba(185, 141, 93, 1);

		}
	}

	.coupon-btn {
		position: absolute;
		width: 158rpx;
		height: 37rpx;
		background: rgba(189, 153, 104, 1);
		right: 16rpx;
		bottom: 28rpx;
		font-size: 20rpx;
		font-weight: bold;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 200;
	}
	.couponImg{
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		right: 5%;
		bottom: 5%;
		z-index: 200;
	}
	
	.tabwrap .coupon {
		.coupon-left-boxPrice,.coupon-left-boxman{
			color: #BBBBBB;
		}
		.coupon-left-box{
			border-right: 1px dashed #BBBBBB;
		}
		.coupon-con{
			.coupon-con-titles,.coupon-con-goods,.coupon-con-time{
				color: #BBBBBB;
			}
		}
		
	}
	
</style>
