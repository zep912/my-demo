<template>
	<view class="container">
		<view class="mp-search-box">
			<uni-search-bar :radius="10" placeholder="请输入商品名称"/>
		</view>
		<!-- <view class="history-goods">
			<view class="title">历史搜索</view>
			<view class="content-box">
				<view v-for="item in historyGoods" :key='item'>
					{{item}}
				</view>
			</view>
		</view>
		<view class="history-goods">
			<view class="title">热门搜索</view>
			<view class="content-box">
				<view v-for="item in historyGoods" :key='item'>
					{{item}}
				</view>
			</view>
		</view> -->
		<view class="content">
			<view class="navbar">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					综合排序
					<text class="iconfont icon-xia"></text>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					分类
					<text class="iconfont icon-xia"></text>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
					<text>筛选</text>
					<view class="p-box">
						<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="iconfont icon-shaixuan"></text>
					</view>
				</view>
				<text class="cate-item iconfont icon-leimupinleifenleileibie"></text>
			</view>
			<view class="goods-list">
				<view v-for="(item, index) in goodsList" :key="index"
					class="goods-item" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.pic" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.name}}</text>
					<view class="price-box">
						<text class="price">{{item.price}}</text>
						<text>已售 {{item.sale}}</text>
					</view>
				</view>
				<view class="loadmore">
					<uni-load-more :status="loadingType"></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {uniSearchBar} from "@/components/uni-search-bar/uni-search-bar.vue";
	export default {
		components: {
			uniLoadMore, uniSearchBar
		},
		data() {
			return {
				historyGoods: ['窝窝头', '大闸蟹', '红烧肉', '西班牙大龙虾', '热干面', '牛肉面', '炸酱面'],
				cateMaskState: 0, //分类面板展开状态
				loadingType: 'nomore', //加载更多状态
				filterIndex: 0, 
				productRequest: {
					productCategoryId: '',
					pageSize: 10,
					pageNum: 1,
				}, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: []
			};
		},
		
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			this.productRequest.productCategoryId = options.tid;
			// if (options.tid)
			this.loadData('refresh');
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			//加载分类
			async search() {
				return await axios.post('/product/search', this.productRequest);
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more'
				}
				const {data} = await this.search();
				let goodsList = data.code === 200 ? data.data.list : [];
				if (type === 'refresh') {
					this.goodsList = [];
				}
				this.goodsList = this.goodsList.concat(goodsList);
				//判断是否还有下一页，有是more  没有是nomore
				this.loadingType  = this.goodsList.length >= data.data.total - data.data.pageNum ? 'nomore' : 'more';
				if(type === 'refresh'){
					if (loading == 1) {
						uni.hideLoading()
					} else {
						uni.stopPullDownRefresh();
					}
				}
			},
			//筛选点击
			tabClick(index){
				if(this.filterIndex === index && index !== 2){
					return;
				}
				this.filterIndex = index;
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	.container {
		.mp-search-box {
			padding: 0 20upx;
			width: 100vw;
			height: 7vh;
		}
		.title {
			font-size: $font-lg;	
		}
		.history-goods {
			font-size: $font-sm;
			display: none;
			.content-box {
				padding: 20upx 0;
				overflow: hidden;
				view {
					float: left;
					padding: 10upx 20upx;
					margin: 0 20upx 20upx 0;
					background: #F5F5F5;
					border-radius: 10upx;
				}
			}
		}
		.content{
			background: $page-color-base;
			heigh: 93vh;
			.navbar{
				display: flex;
				width: 100%;
				height: 6vh;
				background: #fff;
				box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
				.nav-item{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					font-size: 30upx;
					color: $font-color-dark;
					position: relative;
					&.current{
						color: $base-color;
						&:after{
							content: '';
							position: absolute;
							left: 50%;
							bottom: 0;
							transform: translateX(-50%);
							width: 120upx;
							height: 0;
							border-bottom: 4upx solid $base-color;
						}
					}
				}
				.p-box{
					display: flex;
					flex-direction: column;
					.yticon{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 30upx;
						height: 14upx;
						line-height: 1;
						margin-left: 4upx;
						font-size: 26upx;
						color: #888;
						&.active{
							color: $base-color;
						}
					}
					.xia{
						transform: scaleY(-1);
					}
				}
				.cate-item{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					width: 80upx;
					position: relative;
					font-size: 44upx;
					&:after{
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						border-left: 1px solid #ddd;
						width: 0;
						height: 36upx;
					}
				}
			}
			/* 商品列表 */
			.goods-list{
				display:flex;
				flex-wrap:wrap;
				padding: 0 30upx;
				background: #fff;
				height: 87vh;
				overflow-y: auto;
				position: relative;
				.goods-item{
					display:flex;
					flex-direction: column;
					width: 48%;
					padding-bottom: 40upx;
					&:nth-child(2n+1){
						margin-right: 4%;
					}
				}
				.image-wrapper{
					width: 100%;
					height: 330upx;
					border-radius: 3px;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
						opacity: 1;
					}
				}
				.title{
					font-size: $font-lg;
					color: $font-color-dark;
					line-height: 80upx;
				}
				.price-box{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-right: 10upx;
					font-size: 24upx;
					color: $font-color-light;
				}
				.price{
					font-size: $font-lg;
					color: $uni-color-primary;
					line-height: 1;
					&:before{
						content: '￥';
						font-size: 26upx;
					}
				}
				.loadmore {
					width: 100%; 
				}
			}
		}
	}
	

</style>
