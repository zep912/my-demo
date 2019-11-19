<template>
	<view class="empty">
		<view class="noCollect">
			<img :src="src" alt="">
			<view class="noCollect-word">{{msg}}</view>
			<button type="primary">去逛逛</button>
		</view>	
	</view>
	
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		props:{
			src:{
				type: String,
				default: ''
			},
			msg:{
				type:String,
				default:''
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.noCollect{
		padding-top: 139rpx;
		text-align: center;
		img{
			width: 168rpx;
			height: 130rpx;
			margin-bottom: 73rpx;
		}
		.noCollect-word{
			font-size:30rpx;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:60px;
			opacity:0.5;
			margin-bottom: 143rpx;
		}
		button{
			width:326rpx;
			height:90rpx;
			background:rgba(247,181,44,1);
			border-radius:45px;
			margin: 0 auto;
		}
	}
</style>