<template>
	<view class="logistics">
		<view class="logis-compeny">
			<text class="bold">物流状态：<text>{{form.localType}}</text></text>
			<text class="bold">快递公司：<text>{{form.companyName}}</text></text>
			<text class="bold">快递单号：<text>{{form.sentLogisticsNo}}</text></text>
		</view>
		<view style="width: 100%;height: 10rpx;background: #F2F2F2;"></view>
		<!-- 步骤条 -->
		<van-steps
		  :steps="steps"
		  :active="active"
		  direction="vertical"
		  active-color="#ee0a24"
		/>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data(){
			return{
				steps: [
				      {
				        text: '步骤一',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤二',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤三',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤四',
				        desc: '描述信息'
				      }
				    ],
					orderId:''
			}
		},
		onLoad(option) {
			this.orderId = option.id;
			// this.orderId=145
			this.getLogist()
		},
		methods:{
			getLogist(){
				axios.post('/logistics/info',{orderId:this.orderId}).then(res=>{
					console.log(res)
					if(res.data.code==200){
						this.form = res.data.data.LogisticsMessageDTO 
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #fff;
}
.logistics{
	.logis-compeny{
		width: 100%;
		border-top: 1px solid #E3E3E3;
		padding-top: 33rpx;
		padding-left: 30rpx;
		padding-bottom: 30rpx;
		.bold{
			display: block;
			font-size:24rpx;
			font-weight:500;
			color:rgba(84,84,84,1);
			line-height: 48rpx;
		}
	}
}
.van-step__title view:nth-of-type(1){
	font-size:32rpx;
	font-weight:bold;
	color:rgba(29,29,29,1);
	line-height:16px;
}
.van-step__title view:nth-of-type(2){
	font-size:28rpx;
	font-weight:500;
	color:rgba(69,69,69,1);
	line-height:40px;
}
.van-hairline:after{
	border-bottom-width:0
}
	
</style>