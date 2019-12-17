<template>
	<view class="collect">
		<!-- <empty :src="src" :msg='msg' v-if='collectGoods.length==0'></empty> -->
		<view class="empty" v-if='collectGoods.length==0'>
			<view class="noCollect">
				<image src="../static/my/nocollet.png" mode=""></image>
				<view class="noCollect-word">{{msg}}</view>
				<button type="primary" @click="btn">去逛逛</button>
			</view>	
		</view>
		<view  v-if='collectGoods.length!=0'>
		
		<!-- 没有收藏 -->
		<view class="collect-wrap">
			<text>您收藏了<text class="collect-num">{{collectGoods.length}}</text>件商品</text>
			<text @click="editClick">{{edit}}</text>
		</view>
		<view class="collect-goods">
			<view class="collect-goods-list" v-for="(item,index) in collectGoods">
				<view class="collect-vanCheck" v-if='isShow'>
					<van-checkbox :value="item.recommandStatus==0?true:false" @change="onChange(item.recommandStatus,index,item.id)" checked-color="#F7B52C" :name='index' ></van-checkbox>
				</view>
				<img :src="item.pic" alt="" @click='toProductDetails(item.id)'>
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
				<view class="icon">
					<van-icon name="add" color ='#F55641' size='30px' @click='add(item.id)'/>
				</view>
			</view>
		</view>
		<!-- 底部信息 -->
		<view class="foot" v-if='isShow'>
			<van-checkbox :value="checkedes" @change="allOnChange" checked-color="#F7B52C" icon-size='26' label-class='labelClass'>全选</van-checkbox>
			<view @click="dele" class="dele-collect">删除收藏</view>
		</view>
		</view>
	</view>
</template>

<script>
	import empty from "@/components/empty";
	import axios from '@/utils/uniAxios.js'
	export default {
		components:{
			empty
		},
		data(){
			return{
				src:'../static/my/nocollet.png',
				msg:'您还没有任何收藏，去看看其他的吧',
				checked:false,
				edit:'编辑',
				isShow:false,
				collectGoods:[],
				checkNum:0,
				checkedes:false,
				ids:[]
			}
		},
		onLoad(){
			this.getData()
		},
		methods:{
			toProductDetails(id){
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			add(id){
				axios.post('/cart/add',{productId:id}).then(res=>{
					if(res.data.code===200){
						this.$api.msg('添加购物车成功')
					}
				})
			},
			getData(){
				axios.post('/member/collection/productCollectionList').then(res=>{
					if(res.data.code===200){
						this.collectGoods = res.data.data;
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
			dele(){
				if(this.ids.length==0){
					this.$api.msg('请选择商品')
				}else{
					axios.post('/member/collection/deleteProductCollection',{productId:this.ids}).then(res=>{
						if(res.data.code===200){
							this.$api.msg('删除成功')
						}
					})
				}
			},
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
		width: 168rpx;
		height: 200rpx;
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
		border-top: 1px solid #ccc;
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
					margin-top: 22rpx;
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
	.noCollect{
		padding-top: 139rpx;
		text-align: center;
		img{
			width: 168rpx;
			height: 200rpx;
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
