<template>
	<view class="wallet">
		<van-cell title="优惠券" is-link @click='coupon'/>
	</view>
</template>

<script>
	export default {
			
		data(){
			return{
				
			}
		},
		methods:{
			coupon(){
				uni.navigateTo({
					url:'coupon'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #fff;
}
.wallet{
	border-top: 1px solid #E3E3E3;
}
</style>