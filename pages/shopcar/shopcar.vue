<template>
	<view class="shopCar">
		<empty :src='src' :msg='msg' v-if='list.length==0'></empty>
		<!-- 商品 -->
		<view class="shopcar-goods"  v-if='list.length!=0'>
			<view class="shopcar-title">
				<view class="shopcar-title-text">你购物车共<text class="shopcar-titleTxt-color">{{list.length}}</text>件商品</view>
				<view class="edit" @click="edit">{{update}}</view>
			</view>
			<!-- 商品 -->
			<view class="shopcar-wares" v-for="(item,index) in list">
				<view class="shopcar-check">
					<van-checkbox :value="checked" @change="onChangeAll(item.deleteStatus,index)" custom-class='checkbox' checked-color="#F7B62C"></van-checkbox>
					<view class="shopcar-shopTitle">
						<view class="shopcar-check-shops">
							<img src="../../static/shop.png" alt="" class='shopLogo'>
							<text class="title">麦田</text>
						</view>
						<view class="shopCar-icon">
							<van-icon name="arrow" />
						</view>
					</view>
				</view>
				<view class="shopcar-sp">
					<view style="display: flex;align-items: center;">
						<van-checkbox :value="item.deleteStatus==0?false:true" @change="onChange(item.deleteStatus,index)" custom-class='checkbox-sp' checked-color="#F7B62C"></van-checkbox>
					</view>
					
					<view class="shopcar-sp-titles">
						<view class="shopcar-sp-mj">
							<!-- 满减 -->
							<view class="mj">
								<text class="mj-text" v-if='item.promotionMessage!="无优惠"?true:false'>
								<text class="shopcar-sp-titleColor">{{item.promotionMessage}}</text>		
								<view class="mj-right" v-if='item.promotionMessage!="无优惠"?true:false'>
									<text>凑单</text>
									<van-icon name="arrow" color='#F7B62C' size='12'/>
								</view>
							</view>
							
							<!-- 商品信息 -->
							<view class="shopcar-goods-info">
								<image :src="item.productPic?item.productPic:'../../static/goods.png'" mode=""></image>
								<view class="shopcar-goods-infoes">
									<view class="shopcar-goodsinfo_one">{{item.productName }}</view>
									<view class="shopcar-goodsinfo_two" @click="changeAttr(item.productId)">规格：<text>{{item.sp1}}</text>  <text>{{item.sp2}}</text></view>
									<view class="shopcar-goodsinfo_three">
										<text>￥{{item.price?item.price:'暂无报价'}}</text>
										<text>￥999</text>
									</view>
									
									<!-- 加减 -->
									<view class="shopcar-add">
										<text>仅剩<text>{{item.realStock}}</text>件</text>
										<view class="add">
											<text class="add-radius minus" @click="minus(item,index,item.id,item.realStock)">-</text>
											<text>{{item.quantity}}</text>
											<text class="add-radius plus" @click="add(item,index,item.id,item.realStock)">+</text>
										</view>
										<!-- <van-stepper :value="stepValue" @change="stepperChange" minus-class='minusClass' plus-class='plusClass' input-class='inputClass' integer /> -->
									</view>
								</view>
								
							</view>
							<!-- 赠品 -->
							<view class="shopcar-gift">
								<text>[赠品]直升飞机一台</text>
								<van-icon name="arrow" />
							</view>
							<!-- 修改优惠 -->
							<view class="shopcar-discount" @click="editPrefe">
								修改优惠
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- 全选，删除 -->
		<view class="foot" v-if='list.length!=0'>
			<view class="foot-left">
			<van-checkbox :value="checkeds" @change="allSlect" custom-class='checkbox-sp' checked-color="#F7B62C">全选</van-checkbox>
			<view class="foot-total-price"   v-if='!deleShow'>
				<view class="foot-total-top">
					<text>合计:</text>
					<text>￥998.90</text>
				</view>
				<view class="foot-totla-bottom">
					<text>已优惠</text>
					<text>￥998.90</text>
				</view>
			</view>	
			</view>
			
			<view class="foot-btn"  v-if='!deleShow'>
				<text>去结算<text>（2）</text></text>
			</view>
			<view class="foot-dele" v-if='deleShow'>
				<text>删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	import empty from '@/components/empty.vue';
	import axios from '@/utils/uniAxios.js'
	export default {
		components: {
			empty
		},
		data() {
			return {
				src: '../static/shopcarempty.png',
				msg: '购物车没有商品，你还可以',
				list: [],
				update: '编辑',
				checked:true,
				stepValue:1,
				num:1,
				deleShow:false,
				list:[
					
				],
				checkeds:false
			}
		},
		onLoad(option){
			this.getShopCar();
			let str = '打折优惠：满3件，打7.50折';
			console.log(str.indexOf('：'))
		},
		methods: {
			// 获取某个商品的规格
			changeAttr(id){
				axios.post('/cart/getProduct/'+id).then(res=>{
					// 弹出规格的弹窗
				})
			},
			// 修改优惠
			editPrefe(){
				
			},
			// 获取购物车列表
			getShopCar(){
				axios.post('/cart/list/promotion').then(res=>{
					if(res.data.code==200){
						console.log(res)
						this.list = res.data.data
					}
				})
			},
			// 点击编辑或完成
			edit() {
				if (this.update == '编辑') {
					this.update = '完成';
					this.deleShow = true
				} else {
					this.update = '编辑';
					this.deleShow = false
				}
			},
			// 最终的全选
			allSlect(e){
				console.log(e);
				this.checkeds = e.detail
			},
			//每个商店的全选
			onChangeAll(){
				
			},
			// 删除某个商品
			delete(id){
				let obj ={
					id:id
				}
				axios.post('/cart/delete',id).then(res=>{
					if(res.data.code==200){
						console.log(res)
					}
				})
			},
			// 单个商品的选择
			onChange(status,index){
				console.log(status,index)
				this.list[index].deleteStatus = 1
			},
			stepperChange(){
				
			},
			// 减少商品数量
			minus(item,index,id,realStock){
				if(item.quantity==1){
					item.quantity=1
				}else{
					item.quantity--;
					realStock++
				}
				let obj = {
					id:id,
					quantity:item.quantity
				}
				axios.post('/cart/update/quantity',obj).then(res=>{
					
				})
			},
			// 增加商品数量
			add(item,index,id,realStock){
				item.quantity++;
				realStock--;
				// 请求接口
				let obj = {
					id:id,
					quantity:item.quantity
				}
				axios.post('/cart/update/quantity',obj).then(res=>{
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.foot{
		width:100%;
		height:120rpx;
		background:rgba(255,255,255,1);
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding-left: 30rpx;
		padding-right: 10rpx;
		.foot-left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
		.foot-btn{
			width:201rpx;
			height:74rpx;
			background:rgba(247,87,44,1);
			border-radius:37rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size:28rpx;
			font-weight:bold;
			color:rgba(255,255,255,1);
		}
		.foot-total-top{
			font-size:26rpx;
			font-weight:500;
			color:rgba(31,31,31,1);
			margin-left: 56rpx;
		}
		.foot-total-top text:nth-of-type(2){
			color: #F55641;
			font-size: 26rpx;
		}
		.foot-totla-bottom{
			font-size:20rpx;
			font-weight:400;
			color:rgba(158,158,158,1);
			margin-left: 56rpx;
		}
		.checkbox-sp{
			color: #1F1F1F;
		}
		.foot-dele{
			width:200rpx;
			height:74rpx;
			border:1px solid rgba(181,181,181,1);
			border-radius:37rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size:28rpx;
			font-weight:500;
			color:rgba(31,31,31,1);
		}
	}
	// 购物车
	.shopcar-wares{
		background: #fff;
		margin-top: 10rpx;
		.shopcar-check{
			box-sizing: border-box;
			padding-left:20rpx;
			padding-top: 30rpx;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
			overflow: hidden;
			.checkbox{
				float: left;
			}
			.shopcar-shopTitle{
				width: 90%;
				margin-left: 22rpx;
				float: left;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #E3E3E3;
				padding-bottom: 30rpx;
				padding-right: 30rpx;
				box-sizing: border-box;
				.shopcar-check-shops{
					.shopLogo{
						width:34rpx;
						height:32rpx;
						margin-right: 15rpx;
					}
					
					.title{
						font-size:28rpx;
						font-weight:600;
						color:rgba(69,69,69,1);
					}
				}
			}
		}
		.shopcar-sp{
			overflow: hidden;
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			box-sizing: border-box;
			.checkbox-sp{
				float: left;
			}
			.shopcar-sp-titles{
				// float: left;
				width: 90%;
				margin-left:24rpx;
				box-sizing: border-box;
				.shopcar-sp-mj{
					margin-top: 20rpx;
					.shopcar-discount{
						font-size:24rpx;
						font-weight:400;
						color:rgba(245,86,65,1);
						line-height:37px;
						text-align: right;	
						box-sizing: border-box;
						padding-right: 30rpx;
					}
					.mj-text{
						font-size:24rpx;
						font-weight:400;
						color:rgba(81,81,81,1);
					}
					.mj{
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-right: 30rpx;
						
						.mj-right{
							display: flex;
							justify-content: space-between;
							align-items: center;
							text{
								font-size:24rpx;
								font-weight:400;
								color:rgba(245,86,65,1);
								margin-right: 20rpx;
							}
						}
					}
					.shopcar-sp-titleColor{
						display: inline-block;
						// width:80rpx;
						padding-left: 5px;
						padding-right: 5px;
						padding-top: 2px;
						padding-bottom: 2px;
						// height:30rpx;
						border:1px solid rgba(255,50,50,1);
						border-radius:14rpx;
						font-size:22rpx;
						font-weight:400;
						color:rgba(255,50,50,1);
						margin-right: 20rpx;
						text-align: center;
						// line-height: 30rpx;
					}
					.shopcar-goods-info{
						margin-top: 20rpx;
						overflow: hidden;
						position: relative;
						image{
							width: 200rpx;
							height: 200rpx;
							float: left;
							margin-right: 20rpx;
						}
						.shopcar-goods-infoes{
							
							.shopcar-goodsinfo_one{
								font-size:30rpx;
								font-weight:400;
								color:rgba(31,31,31,1);
							}
							.shopcar-goodsinfo_two{
								font-size:24rpx;
								font-weight:400;
								color:rgba(158,158,158,1);
								margin-top: 15rpx;
								margin-bottom: 64rpx;
							}
							.shopcar-goodsinfo_three{
								font-size:24rpx;
								font-weight:500;
								color:rgba(245,86,65,1);
								text{
									display: block;
								}
								text:nth-of-type(1){
									font-size:32rpx;
									font-weight:500;
									color:rgba(245,86,65,1);
								}
								text:nth-of-type(2){
									text-decoration: line-through;
								}
							}
						}
						.shopcar-add{
							position: absolute;
							right: 30rpx;
							bottom: 0;
							font-size: 24rpx;
							color: #9E9E9E;
							text-align: center;
							.minusClass,.plusClass{
								width:28rpx;
								height:28rpx;
								color: #F7B52C;
								border-radius: 50%;
								background: #F7B52C;
							}
							.add{
								font-size: 28rpx;
								.add-radius{
									display: inline-block;
									width: 28rpx;
									height: 28rpx;
									border-radius: 50%;
									border: 1px solid #F7B52C;
									line-height: 22rpx;
									text-align: center;
								}
								.minus{
									color: #F7B52C;
								}
								.plus{
									background: #F7B52C;
									color: #fff;
								}
								text:nth-of-type(2){
									margin-right: 34rpx;
									margin-left: 34rpx;
									font-size:28rpx;
									font-weight:600;
									color:rgba(42,42,42,1)
								}
							}
						}
					}
				}
			}
		
		}
	}
	.shopcar-gift{
		width: 96%;
		height: 40rpx;
		margin-top: 20rpx;
		box-sizing: border-box;
		padding-left: 20rpx;
		padding-right: 20rpx;
		background:rgba(250,250,250,1);
		border-radius:18rpx;
		font-size:24rpx;
		font-weight:400;
		color:rgba(245,86,65,1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	// .van-stepper__minus: after,.van-stepper__minus: before,.van-stepper__plus: after,.van-stepper__plus: before{
	// 	background-color:#F7B52C
	// }
	page {
		background: #F2F2F2;
	}

	.shopCar .noCollect img {
		width: 100rpx;
		height: 100rpx;
	}

	.shopcar-goods {
		width: 100%;
		height: 90rpx;
		background: #fff;
		border-top: 1px solid #E3E3E3;
		.shopcar-title {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding-right: 20rpx;
			padding-left: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.edit {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(88, 88, 88, 1);
			}
		}

		.shopcar-title-text {
			font-size: 24rpx;
			font-weight: 500;
			color: #585858;

			.shopcar-titleTxt-color {
				font-size: 32rpx;
				color: #F7B62C;
				margin-right: 8rpx;
				margin-left: 8rpx;
			}
		}
	}
	
	
</style>
