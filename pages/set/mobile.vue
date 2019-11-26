<template>
	<view class="mobile container">
		<view class="mobile-box">
			<text>请输入{{oldMobile}}收到的短信验证码</text>
		</view>
		<view class="mobile-code">
			<input type="text" placeholder="请输入短信验证码" class="mobile-input" placeholder-class="input-placeholder"
			  v-model="msgCode"/>
			<button type="primary" @click="getCode" class="getCode" :disabled="disabled">{{code}}</button>
		</view>
		<view class="mobile-next">
			<button type="primary" size="large" @click="next" class="mobile-next-btn">下一步</button>
		</view>
		<view class="mobile-lose">
			<text>*若当前号码已不用/丢失，或无法收到验证码？</text>
			<text>请联系客服<text class="mobile-lose-kf">400-606-0061</text></text>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				oldMobile: '',
				code: '获取验证码',
				disabled: false,
				msgCode: '',//短信验证码
				num: 60,
				id:'',
				phone:''
			}
		},
		onLoad(option) {
			this.id = option.id;
			axios.post('/sso/user/id',{id:this.id}).then(res=>{
				console.log(res)
				 this.phone = res.data.data.phone;
				this.oldMobile = this.phone.substring(0,3)+'****'+this.phone.substring(7);
			})
		},
		methods: {
			// 下一步input
			next() {
				if (this.msgCode == '') {
					Toast.fail('请输入验证码');
				} else {
					let obj ={
						authCode:this.msgCode ,
						phone: this.phone
					}
					axios.post('/sso/user/validCode',obj).then(res=>{
						if(res.data.code==200){
							uni.navigateTo({
								url: '../set/bindmobile?oldMobile='+this.oldMobile+'?id='+this.id,
							});
						}
					})
					
				}

			},
			// 获取验证码
			getCode() {
				let obj = {
					telephone:this.phone
				}
				axios.post('/sso/user/sendCode',obj).then(res=>{
					if(res.data.code=='200'){
						this.$api.msg('发送成功')
						if (this.code == '获取验证码' || this.code == '重新发送') {
							this.disabled = true;
							this.code = this.num + 's';
							var timer = setInterval(() => {
								this.num--;
								this.code = this.num + 's';
								if (this.num == 0) {
									clearInterval(timer);
									this.code = '重新发送';
									this.num = 60;
									this.disabled = false;
								}
							}, 1000)
						}
					}
				})
				
			}
		},
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-top: 60rpx;
	}

	.mobile {
		width: 90%;
		margin: 0 auto;

		.mobile-box {
			/* margin-top: 60rpx; */
			margin-bottom: 59rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: rgba(42, 42, 42, 1)
		}

		.input-placeholder {
			color: rgba(179, 179, 179, 1);
			;
		}

		.mobile-code {
			overflow: hidden;
		}

		.mobile-input {
			width: 398rpx;
			height: 89rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 18rpx;
			float: left;
			box-sizing: border-box;
			padding-left: 25rpx;
			color: rgba(179, 179, 179, 1);
			font-size: 32rpx;
		}

		.getCode {
			width: 250rpx;
			height: 89rpx;
			background: rgba(247, 182, 44, 1);
			border-radius: 18rpx;
			margin-left: 20rpx;
			float: left;
		}

		.mobile-next-btn {
			margin-top: 89rpx;
			width: 100%;
			background: rgba(247, 182, 44, 1);
			/* border:2px solid rgba(247,181,44,1); */
			border-radius: 45rpx;
		}

		.mobile-lose {
			margin-top: 88rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: rgba(180, 180, 180, 1);
			width: 510rpx;

			.mobile-lose-kf {
				color: rgba(247, 182, 44, 1);
			}
		}

	}
</style>
