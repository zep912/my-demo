<template>
	<view class="content address">
		<view class="row b-b">
			<text class="tit">收货人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="请填写收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号码</text>
			<input class="input" type="number" v-model="addressData.phoneNumber" placeholder="请填写收货人手机号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所在地址</text>
			<text class="input">
				{{address}}
			</text>
			<text class="yticon icon-shouhuodizhi" @click="chooseLocation"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.detailAddress " placeholder="道路,门牌号,小区,楼栋号,单元室等" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row b-b">
			<text class="tit default" >地址标签</text>
			<view class="address-label" v-model="addressData.addressLabel">
				<text class="default-label">家庭</text>
				<text class="default-label default-label-mid">公司</text>
				<text class="default-label">学校</text>
			</view>
			
			<!-- <input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" /> -->
		</view>
		
		<view class="row default-checkbox">
			<text class="tit default">设置为默认地址</text>
			 <van-checkbox :value="addressData.defaultStatus" @change="switchChange" checked-color="#F7B52C"></van-checkbox>
		</view>
		<button class="add-btn" @click="confirm">保存地址</button>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js';
	export default {
		components:{
		},
		data() {
			return {
				addressData: {
				 "addressLabel": "",//地址标签
				  "city": "",//城市
				  "defaultStatus": 0,//是否默认
				  "detailAddress": "",//详细地址
				  "id": 0,
				  "memberId": 0,//会员ID
				  "name": "",//收货人姓名
				  "phoneNumber": "",//电话
				  "postCode": "",//邮编
				  "province": "",//省份
				  "region": ""//区
				},
				address:''
			}
		},
		onLoad(option){
			let title = '添加收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data)
				console.log(this.addressData)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.default = e.detail;
			},
			
			//地图选择地址
			chooseLocation(){
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        // console.log('当前位置的经度：' + res.longitude);
				        // console.log('当前位置的纬度：' + res.latitude);
				    }
				});
				
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.name){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.address){
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if(!data.area){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				let obj = {
					 "addressLabel": "string",
					  "city": "string",
					  "defaultStatus": 0,
					  "detailAddress": "string",
					  "id": 0,
					  "memberId": 0,
					  "name": "string",
					  "phoneNumber": "string",
					  "postCode": "string",
					  "province": "string",
					  "region": "string"
				}
				axios.post('/member/address/add',this.addressData).then(res=>{
					console.log(res)
				})
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				this.$api.prePage().refreshList(data, this.manageType);
				this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				setTimeout(()=>{
					uni.navigateBack()
				}, 800)
			},
		}
	}
</script>
<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 150upx;
			font-size: 30upx;
			color: #2A2A2A;
		}
		.default{
			width: 220rpx;
			flex: 1;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		switch{
			transform: translateX(16upx) scale(.9);
		}
		.address-label .default-label{
			width:130rpx;
			height:54rpx;
			background:rgba(255,245,223,1);
			border:1px solid rgba(255,176,3,1);
			border-radius:27rpx;
			font-size: 24rpx;
			display: inline-block;
			text-align: center;
			line-height: 54rpx;
		}
		.address-label .default-label-mid{
			margin-left: 20rpx;
			margin-right: 20rpx;
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 90upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background:rgba(247,181,44,1);
		border-radius:45rpx
	}
	// .content .uni-checkbox-wrapper .uni-checkbox-input{
	// 	border-radius: 50%;
	// 	color: #fff;
	// 	background: #F7B62C;
	// }
		
	
	// 	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	// 		color: #fff;
	// 		background: #F7B62C
	// 	}
	
	// 	.uni-checkbox-input .uni-checkbox-input-checked {
	// 		border: none !important;
	// 	}

	
</style>
<style>
	.address .default-checkbox .uni-checkbox-wrapper .uni-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}
</style>
