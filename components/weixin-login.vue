<template>
	<uni-popup ref="popup" type="center" :maskClick="false">
		<view class="weixinLogin">
			<image src="../static/delivery/logo.png" mode=""></image>
			<button v-if="!code" type="primary" class="weixin" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">微信一键登录</button>
			<button v-else type="primary" class="weixin" open-type="getPhoneNumber" @getphonenumber="getPhoneNum">获取手机号</button>
			<button type="primary" class="mobile" @click="toPhone">手机号快捷登录</button>
		</view>
	</uni-popup>
</template>

<script>
	import {uniPopup} from '@/components/uni-popup/uni-popup.vue';
	import {mapState} from 'vuex';
	import axios from '@/utils/uniAxios.js';
	export default {
		components: {uniPopup},
		name: 'weixinLogin',
		computed: {
			...mapState(['userInfo'])
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				code: ''
			};
		},
		mounted() {
			if (!uni.getStorageSync('hasLogin') && !this.show) {
				uni.hideTabBar();
				this.open();
			} else {
				this.wxGetUserInfo();
				uni.showTabBar();
			}
		},
		methods: {
			open() {
				this.$refs.popup.open();
			},
			wxGetUserInfo() {
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) => {
						this.login();
						if(uni.getStorageSync('userPhone')){
							infoRes.userInfo.phone = uni.getStorageSync('userPhone')
						}
						this.$store.commit('login', infoRes.userInfo);
					}
				});
			},
			login() {
				// 1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						let code = loginRes.code;
						this.code = code;
						uni.setStorageSync('code', code);
					}
				})
			},
			getPhoneNum(e) {
				const code = uni.getStorageSync('code');
				this.code = code;
				uni.showLoading({
					title: '登录中...',
					mask: true
				});
				const {encryptedData, iv} = e.detail
				axios.post('/sso/user/getOpenId', {code}).then(({data}) => {
					const {city, gender, avatarUrl, nickName = 'user'} = this.userInfo;
					const {openId, session_key} = data.data;
					//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
					axios.post('sso/user/getPhoneNum', {encrypdata: encryptedData, ivdata: iv, openId, sessionKey: session_key}).then(resp => {
						console.log(resp, 'resp');
						let phone;
						if (resp.data.code === 200) {
							phone = resp.data.data && resp.data.data.phone;
							this.userInfo.phone = phone;
							this.$store.commit('login', this.userInfo);
							uni.setStorageSync('userPhone',phone)
						}
						axios.post('/sso/user/miniLogin', {city: city || '武汉', gender, icon: avatarUrl, nickname: nickName,
							  "wxAppid": "wx35cb9f6acb94bd15", phone,
							  "wxOpenid": openId
							}).then((res) => {
								const response = res.data;
								if (response.code == 200) {
									uni.setStorageSync('hasLogin', true);
									//openId、或SessionKdy存储//隐藏loading
									uni.setStorageSync('gt', response.data.token);
									uni.hideLoading();
									uni.showTabBar();
									this.$refs.popup.close();
								}
							})
					})
					
				})
			},
			// 手机号登录
			toPhone() {
				uni.redirectTo({
					url: '/pages/public/login'
				})
			}
		}
	}
</script>

<style lang="scss">
// 微信自动登录
.weixinLogin {
	width: 550rpx;
	// height: 530rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 30rpx;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	box-sizing: border-box;
	padding: 40rpx 30rpx;
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
</style>
