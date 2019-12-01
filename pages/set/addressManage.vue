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
		<view class="row b-b" @click="addressClick">
			<text class="tit">所在地址</text>
			<text class="input inputAddress">
				{{address}}
			</text>
			<text class="cell-more yticon icon-you"></text>
			<!-- 跳转地图 -->
			<!-- <text class="yticon icon-shouhuodizhi" @click="chooseLocation"></text> -->
		</view>
		<view class="row b-b rowTextArea">
			<text class="tit">详细地址</text>
			<!-- <input class="input" type="textarea" v-model="addressData.detailAddress " placeholder="道路,门牌号,小区,楼栋号,单元室等" placeholder-class="placeholder" /> -->
			<textarea value="" placeholder="道路,门牌号,小区,楼栋号,单元室等" v-model="addressData.detailAddress" placeholder-class="placeholder"
			 class="input textarea" auto-height='true' />
			</view>
		
		<view class="row default-row b-b">
			<text class="tit default" >地址标签</text>
			<view class="address-label" v-model="addressData.addressLabel">
				<ul>
					<li v-for="(item,index) in addressLabels" :class="{checkAddress:index==n}" class="default-label" @click="changeList(item,index)">{{item}}</li>
				</ul>
			</view>
		</view>
		
		<view class="row default-checkbox">
			<text class="tit default">设置为默认地址</text>
			 <van-checkbox :value="defaultStatus" @change="switchChange" checked-color="#F7B52C"></van-checkbox>
		</view>
		<button class="add-btn" @click="confirm">保存地址</button>
		<!-- 展示下拉列表 -->
		<!-- 弹出层 -->
		<van-popup
		  :show="show"
		  position="bottom"
		  custom-style='popStyle'
		>
		<van-picker
		  show-toolbar
		  title=" "
		  confirm-button-text='确定'
		  :columns="columns"
		  @cancel="onCancel"
		  @confirm="onConfirm"
		/>
		</van-popup>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js';
	// import amap from '../../libs/qqmap-wx-jssdk.js'; 
	 import {
	 	mapState
	 } from 'vuex';
	var qqmapsdk;
	export default {
		components:{
		},
		data() {
			return {
				addressData: {
				 "addressLabel": "家庭",//地址标签，默认家庭
				  "city": "武汉市",//城市
				  "defaultStatus": 1,//是否默认,0否，1是
				  "detailAddress": "",//详细地址
				  "id": '',
				  "memberId":'',//会员ID
				  "name": "",//收货人姓名
				  "phoneNumber": "",//电话
				  "postCode": "430070",//邮编
				  "province": "湖北省",//省份
				  "region": "洪山区"//区
				},
				address:'请选择所在地区',
				addressLabels:['家庭','公司','学校'],
				n:0,
				defaultStatus:true,
				key:'GOUBZ-B3U3R-WEAWX-WE266-WZBW5-JIFUR',//腾讯地图key
				userId:'',
				show:false,
				columns:['荟园1栋','荟园2栋','荟园3栋','荟园4栋','荟园5栋','荟园6栋']
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad(option){
			let title = '添加收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data);
				this.address = this.addressData.locationAddress;
				this.addressLabels.find((el,index)=>{
					if(el==this.addressData.addressLabel){
						this.n = index;
					}
				})
				console.log(this.addressData,777)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
			// 获取id
			this.id = this.$store.state.userInfo.id;
			this.addressData.memberId = this.id;
			// 实例化API核心类
			// qqmapsdk = new amap.QQMapWX({
			// 	key: this.key
			// });
		},
		methods: {
			// 选择下拉
			addressClick(){
				this.show = true
			},
			onCancel(){
				this.show = false
			},
			onConfirm(e){
				this.address =e.detail.value;
				this.show = false
			},
			// 地址标签，
			changeList(item,index){
				this.n = index;
				this.addressData.addressLabel = item;
			},
			// 切换默认
			switchChange(e){
				this.defaultStatus = e.detail;
				if(this.defaultStatus){
					this.addressData.defaultStatus = 1
				}else{
					this.addressData.defaultStatus = 0
				}
			},
			
			//地图选择地址
			chooseLocation(){
				uni.getLocation({
				    type: 'wgs84',
					geocode:true,
				    success: function (res) {
						// console.log(res)
						// 在小程序中不能获取到address的详细信息。需要根据经纬度逆地理编码
						//https://ask.dcloud.net.cn/article/35070
						// https://lbs.qq.com/qqmap_wx_jssdk/
						
				    }
				});
				
				uni.chooseLocation({
					success: (data)=> {
						this.address = data.name;
						// 将经纬度逆地理编码
						var latitude = data.latitude;//维度
						var longitude = data.longitude;//经度
						qqmapsdk.reverseGeocoder({
							location:{
								latitude: latitude,
								longitude: longitude
							},
							success:function(res){
								this.addressData.province='';
								this.addressData.city='';
								this.addressData.region='';
								this.addressData.postCode='';
							}
						})
					}
				})
			},
			// 选择地址
			dropdownChange(e){
				console.log(e)
			},
			//提交
			confirm(){
				this.addressData.locationAddress = this.address
				let data = this.addressData;
				if(!data.name){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/^(1[0-9])\d{9}$/.test(data.phoneNumber)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				// if(!this.address){
				// 	this.$api.msg('请在地图选择所在位置');
				// 	return;
				// }
				if(!data.detailAddress){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				// 判断是新增还是编辑
				if(this.manageType=='edit'){
					axios.post('/member/address/update/'+this.addressData.id,this.addressData).then(res=>{
						if(res.data.code==200){
							console.log(this.$api.prePage())
							let pages = getCurrentPages();
							let prePage = pages[pages.length - 2];
							//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
							prePage.$vm.refreshList(data, this.manageType);
							this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
							setTimeout(()=>{
								uni.navigateBack()
							}, 800)
						}else{
							this.$api.msg('保存失败')
						}
					})
				}else{//新增
					axios.post('/member/address/add',this.addressData).then(res=>{
						if(res.data.code==200){
							//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
							this.$api.prePage().$vm.refreshList(data, this.manageType);
							this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
							setTimeout(()=>{
								uni.navigateBack()
							}, 800)
						}
						
					})
				}
				
				
			},
		}
	}
</script>
<style lang="scss">
	.popStyle{
		height: 638rpx;
	}
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}
	.address .row .inputAddress{
		color: #959595;
		font-size: 26rpx;
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
		.address-label .checkAddress{
			border:1px solid rgba(255,176,3,1);
			color:rgba(255,176,3,1);
		}
		.address-label .default-label:nth-of-type(2){
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
.address .row .textarea{
	height: 100rpx;
}
.address .rowTextArea{
	height: auto;
	min-height: 110rpx;
	
	padding-top: 5rpx;
	padding-bottom: 10rpx;
	box-sizing: border-box;
}
</style>
<style>
	.address .default-checkbox .uni-checkbox-wrapper .uni-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}
</style>
