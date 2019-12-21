<template>
	<view class="cancelOrder">
		<view class="cancelBox">
			<img src="../../static/order/guanbi.png" alt="">
			<text class="cancel-success">取消订单成功</text>
			<text class="cancel-than">订单已取消，请告诉我们取消的原因，帮助我们改进，我们想做的更好，谢谢</text>
		</view>
		<view class="divider">
			
		</view>	
		<view class="cancelReason">
			<view class="cancelReason-top">
				<text>取消原因</text>
			</view>
			<view class="cancelReason-list">
				<van-radio-group :value="radio" @change="onChange">
					
				  <van-radio :name="index" v-for='(item,index) in list' checked-color="#F7B62C" data-value='item'>
					  <image
					      slot="icon"
					      :src="radio === 'index' ? icon.active : icon.normal"
					    />
						{{item}}
				  </van-radio>
				</van-radio-group>
				<textarea placeholder="请输入其他原因" class="textarea" placeholder-class="textareaPlace" v-model="content"/>
			</view>
		</view>
		<button class="btn" @click="save">提交</button>
	</view>
	
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data(){
			return{
				radio:'0',
				icon:{
					normal:'/static/normal.png',
					active:'/static/activeRadio.png',
				},
				value:'',
				list:['我不想要了','买错或买多了','没有成功使用优惠券','其他'],
				id:'',
				content:'',
				state:''
			}
		},
		onLoad(option) {
			this.id = option.orderId;
			if(option.state){
				this.state = option.state
			}else{
				this.state = ''
			}
			
		},
		methods:{
			onChange(e){
				console.log(e)
				if(e.type==='change'){
					this.radio = e.detail
				}
			},
			save(){
				if(this.radio==='3'){
					if(this.content===''){
						this.$api.msg('请填写原因')
					}
				}else{
					let obj = {
						cancelReason:this.list[this.radio],
						orderId:this.id
					};
					axios.post('/order/cancelReason',obj).then(res=>{
						if(res.data.code=='200'){
							this.$api.msg('取消成功');
							uni.redirectTo({
								url:'order?state='+this.state
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #fff;
}
.divider{
	width: 100%;
	height: 10rpx;
	background: #f2f2f2;
}
.cancelBox{
	width:100%;
	height:320rpx;
	background:rgba(255,255,255,1);
	border-top: 1px solid #E3E3E3;
	text-align: center;
	padding: 50rpx 110rpx;
	margin-bottom: 54rpx;
	img{
		width:77rpx;
		height:77rpx;
		margin-bottom: 25rpx;
	}
	text{
		display: block;
	}
	.cancel-success{
		font-size:32rpx;
		font-weight:bold;
		color:rgba(84,84,84,1);
		margin-bottom: 28rpx;
	}
	.cancel-than{
		font-size:24rpx;
		color:rgba(84,84,84,1);
		line-height:36rpx;
	}
}
.cancelReason{
	margin-top: 10rpx;
	background: #fff;
	.cancelReason-top{
		width: 100%;
		height: 90rpx;
		border-bottom: 1px solid #E3E3E3;
		padding-left: 30rpx;
		display: flex;
		align-items: center;
		font-size:28rpx;
		font-weight:bold;
		color:rgba(84,84,84,1);
	}
	.cancelReason-list{
		padding: 34rpx 30rpx 98rpx 60rpx;
		.van-radio{
			font-size:26rpx;
			font-weight:500;
			color:rgba(69,69,69,1);
			line-height:40rpx;
			margin-bottom: 65rpx;
		}
		.textarea{
			width:95%;
			height:242rpx;
			background:rgba(242,242,242,1);
			border-radius:20rpx;
			margin-left: 28rpx;
			box-sizing: border-box;
			padding-top: 24rpx;
			padding-right: 32rpx;
			padding-left: 32rpx;
			margin-top: -20rpx;
		}
	}
	.textareaPlace{
		font-size:24rpx;
		font-weight:500;
		color:rgba(148,148,148,1);
	}
}
.btn{
	width: 94%;
	margin: 0 auto;
	height:90rpx;
	background:rgba(247,181,44,1);
	border-radius:45rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size:30rpx;
	font-weight:normal;
	color:rgba(255,255,255,1);
	margin-bottom: 68rpx;
}
</style>