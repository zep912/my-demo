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
				<input type="text" value="" placeholder="请输入手机号码" placeholder-class='customClss'/>
			</view>
			<view class="de-login-code">
				<image src="../../static/delivery/code.png" mode=""></image>
				<input type="text" value="" placeholder="请输入验证码"  placeholder-class='customClss'/>
				<button class="postCode" plain='true' @click="postCode" :disabled="disabled">{{code}}</button>
				<!-- <text class="postCode"></text> -->
			</view>
		</view>
		<!-- 按钮 -->
		<button class="btn" @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				username:'',
				leftIcon:'../../static/delivery/phone.png',
				code:'发送验证码',
				disabled:false,
				num:60
			}
		},
		mounted() {
			
		},
		methods:{
			login(){
				uni.navigateTo({
					url:'set'
				})
			},
			postCode(){
				this.disabled = true;
				
				this.code=this.num+'s';
				setInterval(()=>{
					this.num--;
					this.code=this.num+'s';
					if(this.num==0){
						this.code = '重新发送'
					}
				},1000)
			}
				
		}
	}
</script>
	
<style lang="scss">
	.customClss{
		font-size:26rpx;
		font-weight:500;
		color:rgba(181,181,184,1);
	}
.delivery{
	height: 400rpx;
	background-size: 100% 100%;
	position: relative;
}
.uni-page-head__title{
	opacity:1
}
.de-logo{
	width:240rpx;
	height:240rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 4px 30px 0px rgba(108,108,108,0.1);
	border-radius:50%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 107%;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	img{
		width: 115rpx;
		height: 137rpx;
	}
}
.de-login{
	width: 92%;
	margin:0 auto;
	margin-top: 200rpx;
	.de-login-phone{
		border-bottom: 1px solid #ECEFF1;
		// padding-bottom: 40rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		image{
			width:32rpx;
			height:40rpx;
			float: left;
			margin-right: 30rpx;
		}
	}
	.de-login-code{
		border-bottom: 1px solid #ECEFF1;
		// padding-bottom: 40rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		position: relative;
		image{
			width:34rpx;
			height:24rpx;
			float: left;
			margin-right: 30rpx;
		}
		.postCode{
			position: absolute;
			right: 2%;
			// float: right;
			font-size:26rpx;
			font-weight:bold;
			color:rgba(247,181,44,1);
			border: 0;
		}
	}
}
.btn{
	width:92%;
	margin: 0 auto;
	margin-top: 150rpx;
	height:88rpx;
	background:rgba(247,181,44,1);
	border-radius:44rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size:34rpx;;
	font-weight:500;
	color:rgba(255,255,255,1);
}
</style>