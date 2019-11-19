<template>
	<view class="collect">
		<empty :src="src" :msg='msg' v-if='collectGoods.length==0'></empty>
		<view  v-if='collectGoods.length!=0'>
		
		<!-- 没有收藏 -->
		<view class="collect-wrap">
			<text>共<text class="collect-num">10</text>条,<text>最多为您保存<text>40</text>条</text></text>
			<text @click="editClick">{{edit}}</text>
		</view>
		<view class="collect-goods">
			<view class="collect-goods-list" v-for="(item,index) in collectGoods">
				<view class="collect-vanCheck" v-if='isShow'>
					<van-checkbox :value="checked" @change="onChange" checked-color="#F7B52C" :name='index' ></van-checkbox>
				</view>
				<img :src="item.img" alt="">
				<view class="collectGoodsContent">
					<view class="collect-attr">
						<text class="ziyin">自营</text>
						<text class="title">{{item.title}}</text>
						<text class="attr">{{item.attr}}</text>
					</view>
					<view class="collect-price">
						<text class="price">{{item.price}}</text>
						<text class="name">{{item.name}}</text>
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
	export default {
		components:{
			empty
		},
		data(){
			return{
				src:'../../static/footmark.png',
				msg:'您还没有任何足迹，看看其他的吧',
				checked:false,
				edit:'编辑',
				isShow:false,
				collectGoods:[
					{
						title:'香辣牛肉干',
						img:'/static/goods.png',
						attr:'规格 10*200g',
						price:'999.99',
						name:'麦田圈官网旗舰店'
					},
					{
						title:'香辣牛肉干',
						img:'/static/goods.png',
						attr:'规格 10*200g',
						price:'999.99',
						name:'麦田圈官网旗舰店'
					},
					{
						title:'香辣牛肉干',
						img:'/static/goods.png',
						attr:'规格 10*200g',
						price:'999.99',
						name:'麦田圈官网旗舰店'
					}
				]
			}
		},
		onLoad(){
		},
		methods:{
			onChange(e){
				this.checked = e.detail;
			},
			editClick(){
				if(this.edit=='编辑'){
					this.edit ='完成';
					this.isShow = true;
				}else{
					this.edit = '编辑';
					this.isShow = false;
				}
			},
			// 删除
			dele(){
				
			},
			// 全选
			allOnChange(){
				
			},
			around(){
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F5F5F5;
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
