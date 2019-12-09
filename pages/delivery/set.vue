<template>
	<view class="container">
		<view class="user-info-box">

			<img :src="img" class="portrait" />

			<view class="info-box">
				<text class="username">
					<text class="name">{{form.userName}}</text>
					<text class="username-info">{{form.phone}}</text>
				</text>
			</view>
			
		</view>
		<view class="list-cell b-b m-t" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">我的花名</text>
			<text class="cell-tip">{{form.userName}}</text>
		</view>
		
		<view class="list-cell b-b" hover-class="cell-hover" :hover-stay-time="50" style="margin-top: 10rpx;">
			<text class="cell-tit">接单状态</text>
			<van-switch :checked="checked" @change="onChange" active-color="#07c160" custom-class='switchClass'/>
		</view>

		<view class="list-cell" @click="navTo('statistics')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">送单统计</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell" @click="navTo('myprofit')" hover-class="cell-hover" :hover-stay-time="50"  style="margin-top: 10rpx;">
			<text class="cell-tit">我的收益</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
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
	import axios from '@/utils/uniAxios.js'
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				img: '../../static/my/missing-face.png',
				checked:true,
				songdan:'../../static/delivery/songdan2.png',
				jiedan:'../../static/delivery/jiedanset.png',
				daliveryData:2,
				rorderStatus:'',
				form:{
					userName:'',
					phone:''
				}
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			...mapMutations(['logout']),
			// 跳转路由
			navTo(url) {
				uni.navigateTo({
					url: `../delivery/${url}`
				});
			},
			getData(){
				let user = uni.getStorageSync('userInfo');
				let userPhone = uni.getStorageSync('deliveryPhone');
				this.form.userName = user.nickName;
				this.form.phone = userPhone
			},
			// 接单状态的改变
			onChange(e){
				console.log(e)
				if(e.detail){//开启
					this.rorderStatus = 1;
					axios.post('/sso/user/isOpenSend',{rorderStatus:1}).then(res=>{
						this.$api.msg('开启成功')
					})
				}else{
					axios.post('/sso/user/isOpenSend',{rorderStatus:0}).then(res=>{
						this.$api.msg('关闭成功')
					})
				}
				this.checked = !this.checked
			},
			sd(e){
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
				}
			}
		}
	}
</script>

<style lang='scss'>
	
	.switchClass{
		
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
		border-radius: 10upx;
	}

	page {
		background: #F2F2F2;
		padding-top: 10rpx;
	}

	.user-section {
		height: 520upx;
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
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		background: #fff;
		z-index: 1;
		padding-left: 30rpx;
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

			text {
				display: block;
				margin-left: 20rpx;
			}

			.name {
				font-size:34rpx;
				font-weight:bold;
				color:rgba(88,88,88,1);
			}

			.username-info {
				font-size: 26rpx;
				font-weight: 500;
				color: rgba(88, 88, 88, 1);
			}
		}

	}



	.list-cell {
		display: flex;
		align-items: center;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

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
			/* color: $font-color-dark; */
			color: #2A2A2A;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			/* color: $font-color-light; */
			color: #2A2A2A;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
	.de-foot{
		width:100%;
		height:100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background:rgba(255,255,255,1);
		display: flex;
		justify-content: space-around;
		align-items: center;
		img{
			display: block;
			width:35rpx;
			height:42rpx;
			margin: 0 auto;
			margin-bottom: 8rpx;
		}
		text{
			display: block;
			font-size:20rpx;
			font-weight:500;
			color:rgba(194,194,194,1);
		}
		.de-songdan,.de-jiedanset{
			/* display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap; */
		}
	}
	.active text{
		color: #FCAA00;
	}
</style>
