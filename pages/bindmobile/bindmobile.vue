<template>
	<div>
		<view class="bindmobile container">
			<view class="mobile-code">
				<input type="text" placeholder="请输入新手机号" class="mobile-input" placeholder-class="input-placeholder" maxlength='11' v-model="newMobile"/>
				<button type="primary" @click="getCode" class="getCode">获取验证码</button>
			</view>
			<view class="new-mobile">
				<input type="text"  placeholder="请输入新手机号码验证" class="new-mobile-input mobile-input" placeholder-class="input-placeholder" maxlength='11' v-model="newCode"/>
			</view>
			<button type="primary" class="mobile-btn" @click="save">保存</button>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newMobile:'',
				newCode:''
			}
		},
		onLoad() {
		
		},
		methods: {
			getCode(){
				console.log(this.newMobile)
			},
			save(){
				console.log(this.newCode)
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-top: 55rpx;
	}
	.bindmobile{
		width: 90%;
		margin: 0 auto;
		.mobile-code{
			overflow: hidden;
			/* margin-top: 55rpx; */
			margin-bottom: 30rpx;
			.mobile-input{
				width:398rpx;
				height:89rpx;
				background:rgba(255,255,255,1);
				border-radius:18rpx;
				float: left;
				box-sizing: border-box;
				padding-left: 25rpx;
				font-size: 32rpx;
			}
			
			.getCode{
				width:250rpx;
				height:89rpx;
				background:rgba(247,182,44,1);
				border-radius:18rpx;
				margin-left: 20rpx;
				float: left;
			}
		}
		.input-placeholder{
			color:rgba(179,179,179,1);;
		}
		.new-mobile{
			background:rgba(255,255,255,1);
			border-radius:18rpx;
			height:89rpx;
			width: 100%;
			box-sizing: border-box;
			padding-left: 25rpx;
			display: flex;
			align-items: center;
		}
		.mobile-btn{
			margin-top: 95rpx;
			height:90rpx;
			background:rgba(247,181,44,1);
			border-radius:45rpx;
		}
	}
	
	
	
</style>
