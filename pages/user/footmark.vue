<template>
	<view class="collect">
		
		<view class="empty" v-if='collectGoods.length==0'>
			<view class="noCollect">
				<!-- <image src="../static/my/footmark.png" mode=""></image> -->
				<text class="iconfont icon-zuji" style="color: #DBDBDB;font-size: 70px;"></text>
				<view class="noCollect-word" style="margin-top: 98rpx;">{{msg}}</view>
				<button type="primary" @click="btn">去逛逛</button>
			</view>	
		</view>
		<!-- <empty :src="src" :msg='msg' v-if='collectGoods.length==0'></empty> -->
		
		
		<view  v-if='collectGoods.length!=0'>
		<view class="collect-wrap">
			<text>共<text class="collect-num">10</text>条,<text>最多为您保存<text>40</text>条</text></text>
			<text @click="editClick">{{edit}}</text>
		</view>
		<view class="collect-goods">
			<view class="collect-goods-list" v-for="(item,index) in collectGoods">
				<view class="collect-vanCheck" v-if='isShow'>
					<van-checkbox :value="checked" checked-color="#F7B52C" :name='index' @change="onChange(item.recommandStatus,index,item.id)"></van-checkbox>
				</view>
				<img :src="item.img" alt="" @click='toProductDetails(item.id)'>
				<view class="collectGoodsContent">
					<view class="collect-attr">
						<text class="ziyin">自营</text>
						<text class="title">{{item.name}}</text>
						<text class="attr">{{item.subTitle}}</text>
					</view>
					<view class="collect-price">
						<text class="price">{{item.price?item.price:'暂无报价'}}</text>
						<text class="name">{{item.brandName}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部信息 -->
		<view class="foot" v-if='isShow'>
			<van-checkbox :value="checked" @change="allOnChange" checked-color="#F7B52C" icon-size='26' label-class='labelClass'>全选</van-checkbox>
			<view @click="dele" class="dele-collect">删除足迹</view>
		</view>
		</view>
	</view>
</template>

<script>
	import empty from '@/components/empty.vue'
	import axios from '@/utils/uniAxios.js'
	export default {
		components:{
			empty
		},
		data(){
			return{
				src:'../static/my/footmark.png',
				msg:'您还没有任何足迹，看看其他的吧',
				checked:false,
				edit:'编辑',
				isShow:false,
				collectGoods:[],
				ids:[]
			}
		},
		onLoad(){
			this.getFeedbackData()
		},
		methods:{
			toProductDetails(id){
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			getFeedbackData(){
				axios.post('/member/readHistory/list').then(res=>{
					if(res.data.code===200&&res.data.data.length>0){
						this.collectGoods = res.data.data.length;
					}
				})
			},
			onChange(status,index,id){
				console.log(status,index,id)
				if(status==1){//表示选中
					this.collectGoods[index].recommandStatus = 0;
					this.checkNum++;
					if(this.checkNum == this.collectGoods.length){
						this.checkedes = true
					}
					this.ids.push(id)
				}else{
					this.collectGoods[index].recommandStatus = 1;
					this.checkNum--;
					this.checkedes = false;
					this.ids.splice(this.ids.findIndex(item=>item==index),1);
				}
			},
			editClick(){
				if(this.edit=='编辑'){
					this.edit ='完成';
					this.isShow = true;
					this.collectGoods.forEach(el=>{
						el.recommandStatus = 1;
					})
					this.checkedes = false;
					this.checkNum = 0
				}else{
					this.edit = '编辑';
					this.isShow = false;
				}
			},
			// 删除
			dele(){
				if(this.ids.length==0){
					this.$api.msg('请选择商品')
				}else{
					axios.post('/member/readHistory/delete',{productId:this.ids}).then(res=>{
						if(res.data.code===200){
							this.$api.msg('删除成功')
						}
					})
				}
			},
			// 全选
			allOnChange(){
				this.checkedes = !this.checkedes;
				if(this.checkedes){
					this.collectGoods.forEach(el=>{
						el.recommandStatus = 0;
						this.ids.push(el.id)
					})
				}else{
					this.collectGoods.forEach(el=>{
						el.recommandStatus = 1;
					})
					this.ids=[]
				}
			},
			btn(){
				uni.reLaunch({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.collect .empty .noCollect img{
		width: 114rpx;
		height: 114rpx;
	}
	page{
		background: #fff;
	}
	.collect-wrap{
		width: 90%;
		padding-top: 36rpx;
		padding-bottom: 36rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		font-size:24rpx;
		font-weight:500;
		color:rgba(31,31,31,1);
		.collect-num{
			color: #FCB011;
			font-size: 28rpx;
			margin-left: 8rpx;
			margin-right: 8rpx;
		}
	}
	.collect-goods{
		padding-top: 22rpx;
		width: 100%;
		box-sizing: border-box;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin: 0 auto;
		background: #fff;
		padding-bottom: 10rpx;
		.collect-goods-list{
			display: flex;
			justify-content: flex-start;
			margin-bottom: 20rpx;
			position: relative;
			img{
				width: 240rpx;
				height: 240rpx;
				margin-right: 20rpx;
				border-radius:20rpx;
			}
			.collect-vanCheck{
				display: flex;
				align-items: center;
				margin-right: 20rpx;
			}
			.icon{
				position: absolute;
				right: 1%;
				bottom: 2%;
			}
			.collectGoodsContent{
				.collect-attr{
					.ziyin{
						display: inline-block;
						width:75rpx;
						height:30rpx;
						text-align: center;
						line-height: 30rpx;
						background:linear-gradient(-55deg,rgba(252,170,0,1),rgba(255,206,103,1));
						border-radius:15rpx;
						font-size:22rpx;
						font-weight:400;
						color:rgba(255,255,255,1);
						margin-bottom: 16rpx;
					}
					.title{
						font-size:30rpx;
						font-weight:400;
						color:rgba(31,31,31,1);
						margin-left: 14rpx;
						margin-bottom: 16rpx;
					}
					.attr{
						font-size:28rpx;
						font-weight:400;
						color:rgba(158,158,158,1);
						display: block;
					}
				}
				.collect-price{
					margin-top: 65rpx;
					text{
						display: block;
					}
					.price{
						font-size:26rpx;
						font-weight:bold;
						color:rgba(245,86,65,1);
						margin-bottom: 14rpx;
					}
					.name{
						font-size:22rpx;
						font-weight:400;
						color:rgba(158,158,158,1);
					}
				}
			}
		}
		
	}
	.foot{
		width: 100%;
		height: 120rpx;
		background: #fff;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.dele-collect{
			width:211rpx;
			height:74rpx;
			border:1px solid rgba(141,141,141,1);
			border-radius:37rpx;
			font-size:28rpx;
			font-weight:500;
			color:rgba(88,88,88,1);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.labelClass{
			font-size:28rpx;
			font-weight:500;
			color:rgba(88,88,88,1);
		}
	}
</style>
