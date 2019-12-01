<template>
	<view class="content b-t adress">
		<!-- 缺省 -->
		<empty :src='src' :msg='msg' v-if='addressList.length==0'></empty>
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)"  v-if='addressList.length!=0'>
			<view class="wrapper">
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.phoneNumber}}</text>
					<text v-if="item.defaultStatus" class="tag">默认</text>
				</view>
				<view class="address-box">
					<text class="address">{{item.province+item.city+item.region+item.detailAddress}}</text>
				</view>
			</view>
			<view  @click.stop="addAddress('edit', item)">
				<img src="../../static/my/toAddress.png" alt="" style='width:50rpx;height:50rpx;'>
			</view>
		</view>
		<view class="footBtn">
			<button class="add-btn" @click="addAddress('add')">添加新地址</button>
		</view>
		
	</view>
</template>

<script>
	import empty from '@/components/empty.vue';
	import axios from '@/utils/uniAxios.js';
	export default {
		components:{
			empty
		},
		data() {
			return {
				src:'../static/my/my-address.png',
				msg:'你还没有任何地址，赶紧添加吧',
				source: 0,
				addressList: [
					// 	{
					// 	name: '刘晓晓',
					// 	mobile: '18666666666',
					// 	addressName: '贵族皇仕牛排(东城店)',
					// 	address: '北京市东城区',
					// 	area: 'B区',
					// 	default: true
					// }, {
					// 	name: '刘大大',
					// 	mobile: '18667766666',
					// 	addressName: '龙回1区12号楼',
					// 	address: '山东省济南市历城区',
					// 	area: '西单元302',
					// 	default: false,
					// },
				],
				id:''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.source = option.source;
			this.getAddress()
		},
		methods: {
			// 获取所有地址列表
			getAddress(){
				let obj = {
					id:this.id
				}
				axios.post('/member/address/list').then(res=>{
					console.log(res)
					if(res.data.code==200){
						this.addressList = res.data.data;
					}
				})
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
			},
			// 添加收货地址
			addAddress(type, item) {
				uni.navigateTo({
					url: `/pages/set/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type) {
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.getAddress()
				// this.addressList.unshift(data);
			}
		}
	}
</script>

<style lang='scss'>
	.adress{
		padding-bottom: 80rpx;
	}
	.adress .noCollect img{
		width: 116rpx;
		height: 154rpx;
	}
	.adress .noCollect  button{
		display: none;
	}
	.adress .noCollect .noCollect-word{
		font-size:30rpx;
		font-weight:600;
		color:#1F1F1F;
	}
	page {
		padding-bottom: 120upx;
	}

	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-box {
		display: flex;
		align-items: center;
		.address {
			font-size: 24upx;
			color:rgba(81,81,81,1);
		}
	}

	.u-box {
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(81,81,81,1);
		line-height:40px;
		margin-top: 16upx;
		.name {
			margin-right: 20upx;
		}
		.tag {
			display: inline-block;
			width: 100rpx;
			height: 34rpx;
			font-size: 24rpx;
			text-align: center;
			color: #EC5756;
			margin-right: 10upx;
			line-height:32rpx;
			background:rgba(255,238,236,1);
			border:1px solid rgba(236,87,86,1);
			border-radius:10px;
			margin-left: 30rpx;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background:rgba(247,181,44,1);
		border-radius:45rpx;
	}
	.footBtn{
		width: 100%;
		height: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		z-index: 10000;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
