<template>
	<view class="container">
		<view class="user-info-box">

			<img :src="user.portrait || '../../static/my/missing-face.png'" class="portrait" />

			<view class="info-box">
				<text class="username">
					<text class="name">{{user.name}}</text>
					<!-- <text class="username-info">{{user.nickname}}</text> -->
					<text class="username-info">{{user.mobile}}</text>
				</text>
			</view>
			<text class='login-now'>
				<text>当前登录</text>
			</text>
		</view>
		<view class="list-cell b-b m-t" @click="navTo('person')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-tip">管理我的个人资料</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">我的收货地址</text>
			<text class="cell-tip">管理我的收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view>

		<view class="list-cell" @click="mobileClick" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改手机号</text>
			<text class="cell-tip">{{phone}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('aboutus')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">关于我们</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js';
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				img: '/static/missing-face.png',
				phone:'',
				id:'',
				user:{
					name:'',
					nickName:'',
					portrait:'',
					mobile:''
				}
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.getData();
		},
		computed:{
			
		},
		methods: {
			...mapMutations(['logout']),
			// 跳转路由
			navTo(url) {
				uni.navigateTo({
					url: `../set/${url}`+'?id='+this.id
				});
			},
			// 修改手机号
			mobileClick(){
				if(this.phone||this.user.mobile){
					uni.navigateTo({
						url:`../set/mobile`+'?id='+this.id
					})
				}else{
					
				}
			},
			// 初始化
			getData(){
				// 先判断是不是微信登录，优先使用微信登录
				if(!uni.getStorageSync('isCanUse')){//已经授权登录
					let setUserInfo = this.$store.state.userInfo;
					this.user ={
						name:setUserInfo.nickname,
						mobile:setUserInfo.mobile,
						portrait:setUserInfo.portrait
					};
					this.phone = setUserInfo.mobile;
					return
				}else if(uni.getStorageSync('setPhone')){//判断是不是手机登录
					axios.post('/sso/user/id',{id:this.id}).then(res=>{
						this.phone = res.data.data.phone;
						this.user.name = this.phone;
					})
				}
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
				font-size: 34rpx;
				font-weight: bold;
				color: rgba(88, 88, 88, 1);
			}

			.username-info {
				font-size: 26rpx;
				font-weight: 500;
				color: rgba(88, 88, 88, 1);
			}
		}

		.login-now {
			width: 147rpx;
			height: 40rpx;
			background: rgba(254, 201, 89, 1);
			border-radius: 20rpx;
			font-size: 22rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			position: absolute;
			right: -20rpx;
			box-sizing: border-box;
			line-height: 40rpx;
			padding-left: 20rpx;
		}
	}



	.list-cell {
		display: flex;
		align-items: baseline;
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
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
