<template>
	<view class="delivery">
		<!-- 头部 -->
		<image src="../../static/delivery/peisongbg.png" mode="" style="width: 100%;height: 400rpx;"></image>
		<view class="de-logo">
			<img src="../../static/delivery/logo.png" alt="">
		</view>
		<!-- 登陆 -->
		<view class="de-login">
			<view class="de-login-phone">
				<image src="../../static/delivery/phone.png" mode=""></image>
				<input type="text" value="" placeholder="请输入手机号码" placeholder-class='customClss' v-model="phone" maxlength="11" />
			</view>
			<view class="de-login-code">
				<image src="../../static/delivery/code.png" mode=""></image>
				<input type="text" value="" placeholder="请输入验证码" placeholder-class='customClss' v-model="authCode" />
				<button class="postCode" plain='true' @click="postCode" :disabled="disabled">{{code}}</button>
			</view>
		</view>
		<!-- 按钮 -->
		<button class="btn" @click="login">登录</button>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				username: '',
				leftIcon: '../../static/delivery/phone.png',
				code: '发送验证码',
				disabled: false,
				num: 60,
				phone: '',
				authCode: ''
			}
		},
		mounted() {

		},
		methods: {
			login() {
				var _this = this;
				if(_this.phone){
					if(_this.authCode){
						let obj = {
							phone: _this.phone,
							authCode: _this.authCode
						};
						axios.post('/sso/user/login',obj).then(res=>{
							if(res.data.code=='200'){
								var token = res.data.data.token;
								uni.setStorageSync('gt',token);
								uni.setStorageSync('setPhone',_this.phone);
								uni.switchTab({
									url:'../index/index',
									success:(res)=> { 
										 let page = getCurrentPages();  //跳转页面成功之后
										 if (!page){
											 return
										 }else{
											 page[page.length-1].data.getHomeList()
											 // var beforePage = page[0].data;
											 //  page.loadData(); //如果页面存在，则重新刷新页面
										 };   
									  }
								});
							}else{
								this.$api.msg(res.data.message)
							}
						})
					}else{
						_this.$api.msg('请输入验证码')
					}
				}else{
					_this.$api.msg('请输入手机号码')
				}
		},
		// 发送验证码
		postCode() {
			if (this.phone == '') {
				this.$api.msg('请输入手机号码')
			} else {
				var _this = this;
				let obj = {
					telephone: _this.phone
				}
				axios.post('/sso/user/sendCode',obj).then(res=>{
					console.log(res)
					if(res.data.code=='200'){
						_this.$api.msg('发送成功')
						if(res.data.code==200){
							_this.disabled = true;
							_this.code = _this.num + 's';
							var timer=setInterval(() => {
								_this.num--;
								_this.code = _this.num + 's';
								if (_this.num == 0) {
									clearInterval(timer)
									_this.code = '重新发送';
									_this.num = 60;
								}
							}, 1000)
						}
					}
				})
			}
		}
	}
	}
</script>

<style lang="scss">
	.customClss {
		font-size: 26rpx;
		font-weight: 500;
		color: rgba(181, 181, 184, 1);
	}

	.delivery {
		height: 400rpx;
		background-size: 100% 100%;
		position: relative;
	}

	.uni-page-head__title {
		opacity: 1
	}

	.de-logo {
		width: 240rpx;
		height: 240rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 30px 0px rgba(108, 108, 108, 0.1);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 107%;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;

		img {
			width: 115rpx;
			height: 137rpx;
		}
	}

	.de-login {
		width: 92%;
		margin: 0 auto;
		margin-top: 200rpx;

		.de-login-phone {
			border-bottom: 1px solid #ECEFF1;
			// padding-bottom: 40rpx;
			height: 120rpx;
			display: flex;
			align-items: center;

			image {
				width: 32rpx;
				height: 40rpx;
				float: left;
				margin-right: 30rpx;
			}
		}

		.de-login-code {
			border-bottom: 1px solid #ECEFF1;
			// padding-bottom: 40rpx;
			height: 120rpx;
			display: flex;
			align-items: center;
			position: relative;

			image {
				width: 34rpx;
				height: 24rpx;
				float: left;
				margin-right: 30rpx;
			}

			.postCode {
				position: absolute;
				right: 2%;
				// float: right;
				font-size: 26rpx;
				font-weight: bold;
				color: rgba(247, 181, 44, 1);
				border: 0;
			}
		}
	}

	.btn {
		width: 92%;
		margin: 0 auto;
		margin-top: 150rpx;
		height: 88rpx;
		background: rgba(247, 181, 44, 1);
		border-radius: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
		;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
</style>
