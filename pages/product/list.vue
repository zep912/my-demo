<template>
	<view class="container">
		<view class="mp-search-box">
			<uni-search-bar :radius="10" placeholder="请输入商品名称" @cancel="search"/>
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
				<view class="nav-item" @click="tabClick(0)">
					综合排序
					<text class="iconfont icon-xia"></text>
				</view>
				<view class="nav-item" @click="tabClick(1)">
					分类
					<text class="iconfont icon-xia"></text>
				</view>
				<view class="nav-item" @click="tabClick(2)">
					<text>筛选</text>
					<view class="p-box">
						<text class="iconfont icon-shaixuan"></text>
					</view>
				</view>
				<text class="cate-item iconfont icon-leimupinleifenleileibie" @click="isCross = !isCross"></text>
				<view class="collapse" v-if="filterIndex === 0">
					<view class="view-list" :class="{current: productRequest.orderByType === ''}" @click="tabItemClick(null)">综合排序</view>
					<view class="view-list" :class="{current: productRequest.orderByType === 1}" @click="tabItemClick(1)">价格从低到高</view>
					<view class="view-list" :class="{current: productRequest.orderByType === 2}" @click="tabItemClick(2)">价格从高到低</view>
					<view class="view-list" :class="{current: productRequest.orderByType === 3}" @click="tabItemClick(3)">销量从低到高</view>
					<view class="view-list" :class="{current: productRequest.orderByType === 4}" @click="tabItemClick(4)">销量从高到低</view>
				</view>
				<view class="collapse" v-if="filterIndex === 1">
					<view class="view-list-item" v-for="item in listCategory" :key="item.id"
					:class="{current: productRequest.productCategoryId === item.id}" 
					@click="tabICateClick(item.id)">{{item.name}}</view>
				</view>
				<view class="collapse" v-if="filterIndex === 2">
					<view class="title">库存状态</view>
					<view class="view-list-search"
					:class="{current: !productRequest.stockType}" 
					@click="stockTypeClick('')">全部</view>
					<view class="view-list-search"
					:class="{current: productRequest.stockType === 1}" 
					@click="stockTypeClick(1)">仅看有货</view>
					<view class="view-list-search"
					:class="{current: productRequest.stockType === 2}" 
					@click="stockTypeClick(2)">仅看无货</view>
					<view class="title">品牌</view>
					<view class="view-list-search" v-for="item in listCategory" :key="item.id"
					:class="{current: productRequest.productCategoryId === item.id}" 
					@click="tabICateClick(item.id)">{{item.name}}</view>
				</view>
			</view>
			<view class="goods-list" :class="{cross: isCross}" v-if="goodsList && goodsList.length">
				<view v-for="(item, index) in goodsList" :key="index"
					class="goods-item" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.pic" mode="aspectFill"></image>
					</view>
					<view class="text-box">
						<text class="title clamp">{{item.name}}</text>
						<view class="store-title">{{item.brandName}}</view>
						<view class="price-box">
							<view class="price">
								{{item.price}}
								<text>已售 {{item.sale}}</text>
								<text>库存 {{item.stock}}</text>
							</view>
							<text class="iconfont icon-iconfontxinzeng"></text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more class="loadmore" :status="loadingType"></uni-load-more>
			<view class="goods-list" v-if="!goodsList.length && !isErr">
				<view class="iconfont icon-sousuokongyemian empty"></view>
				<view class="text">没有搜索到商品，您还可以</view>
				<button type="primary" class="btn" @click="gotoIndex">去逛逛</button>
			</view>
			<view class="goods-list" v-if="isErr">
				<view class="iconfont icon-icon-test empty"></view>
				<view class="text">网络一遍凉快去了～</view>
				<button type="primary" class="btn" @click="loadData('refresh')">刷新</button>
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
				loadingType: 'more', //加载更多状态
				filterIndex: null, 
				productRequest: {
					productCategoryId: '',
					pageSize: 10,
					pageNum: 1,
					orderByType: '',
					stockType: ''
				}, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				listCategory: [],
				goodsList: [],
				isCross: false,
				isErr: false
			};
		},
		
		onLoad(options){
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			this.productRequest.productCategoryId = +options.tid;
			// if (options.tid)
			this.listWithChildren();
			this.loadData('refresh');
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.goodsList = [];
			this.loadingType = 'more';
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			// 加载分类
			listWithChildren() {
				axios.post('home/list/withChildren', {}).then(({data}) => {
					this.listCategory = data.data.reduce((res, item) => {
						res = res.concat(item.productTypeList.reduce((r, val) => {
							r = r.concat(val.children);
							return r;
						}, []));
						return res;
					}, [])
				})
			},
			// 搜索商品列表
			async search(e) {
				this.isErr = false;
				this.productRequest.keywords = e ? e.value : '';
				let request = Object.assign({}, this.productRequest);
				for (let key in request) {
					if (!request[key]) delete request[key];
				}
				axios.post('/product/search', request).then(({data}) => {
					let goodsList = data.code === 200 ? data.data.list : [];
					this.goodsList = this.goodsList.concat(goodsList);
					//判断是否还有下一页，有是more  没有是nomore
					this.loadingType  = this.goodsList.length >= data.data.total - data.data.pageNum ? 'nomore' : 'more';
					uni.hideLoading();
				}).catch(() => {
					this.isErr = true;
					uni.hideLoading();
				})
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add') {
				if (this.loadingType === 'nomore') return;
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
				uni.showLoading({
					title: '正在加载'
				});
				//没有更多直接返回
				if (type === 'add') {
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more'
				}
				if (type === 'refresh') {
					this.goodsList = [];
				}
				this.search();
				if (type === 'refresh') {
					uni.stopPullDownRefresh();
				}
			},
			//筛选点击
			tabClick(index){
				if (this.filterIndex === index) {
					this.filterIndex = null;
					return;
				}
				this.filterIndex = index;
			},
			tabItemClick(value) {
				this.filterIndex = null;
				this.productRequest.orderByType = value;
				this.loadData('refresh');	
			},
			tabICateClick(value) {
				this.filterIndex = null;
				this.productRequest.productCategoryId = value;
				this.loadData('refresh');	
			},
			stockTypeClick(value) {
				this.filterIndex = null;
				this.productRequest.stockType = value;
				this.loadData('refresh');
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${item.id}`
				})
			},
			gotoIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
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
				width: 100vw;
				height: 7vh;
				background: #F5F5F5;
				box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
				position: relative;
				.nav-item{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					font-size: 28upx;
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
					.iconfont{
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
							color: #F7B62C;
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
				.collapse {
					position: absolute;
					top: 7vh;
					left: 0;
					width: 100vw;
					background: #F5F5F5;
					z-index: 1;
					padding: 20upx 40upx;
					.view-list {
						height: 60upx;
						line-height: 60upx;
						font-size: 24upx;
						&.current{
							color: #F7B62C;
						}
					}
					.view-list-item {
						width: 50%;
						height: 60upx;
						line-height: 60upx;
						font-size: 24upx;
						display: inline-block;
						&.current{
							color: #F7B62C;
						}
					}
					.title {
						color: #1F1F1F;
						font-size: 24upx;
						margin-bottom: 20upx;
					}
					.view-list-search {
						width: 146upx;
						height: 50upx;
						line-height: 50upx;
						border-radius: 20upx;
						font-size: 24upx;
						text-align: center;
						background-color: #E2E2E2;
						color: #1f1f1f;
						display: inline-block;
						margin: 0 20upx 20upx 0;
						&.current {
							background-color: #F7B62C;
						}
					}
				}
			}
			/* 商品列表 */
			.goods-list{
				display:flex;
				flex-wrap:wrap;
				padding: 20upx;
				background: #fff;
				height: 80vh;
				overflow-y: auto;
				position: relative;
				.goods-item{
					display:flex;
					flex-direction: column;
					width: 345upx;
					max-height: 440upx;
					margin-bottom: 20upx;
					padding: 20upx;
					background: #FAFAFA;
					&:nth-child(2n+1){
						margin-right: 20upx;
					}
					.image-wrapper{
						width: 100%;
						height: 300upx;
						border-radius: 3px;
						overflow: hidden;
						image{
							width: 100%;
							height: 100%;
							opacity: 1;
						}
					}
					.title{
						font-size: 22upx;
						font-weight: 500;
						color: #454545;
						line-height: 60upx;
					}
					.price-box{
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 24upx;
						color: $font-color-light;
					}
					.price{
						font-size: $font-lg;
						color: $uni-color-primary;
						&:before{
							content: '￥';
							font-size: 24upx;
						}
						text {
							height: 30upx;
							line-height: 30upx;
							font-size: 20upx;
							color: #9E9E9E;
							margin-left: 10upx;
						}
					}
					.iconfont {
						font-size: 45upx;
						color: #F55641;
					}
					.store-title {
						font-size: 20upx;
						color: #9E9E9E;
					}
				}
				.loadmore {
					width: 100vw; 
					height: 6vh;
				}
				.text {
					font-size: 30upx;
					color: #1f1f1f;
					width: 100vw;
					text-align: center;
				}
				.empty {
					font-size: 186upx;
					color: #F5F5F5FF;
					width: 100vw;
					margin-top: 100upx;
					text-align: center;
				}
				.btn {
					width: 670upx;
					height: 90upx;
					line-height: 90upx;
					text-align: center;
					background: #F7B52C;
					border-radius: 45upx;
				}
			}
			.cross {
				display: block;
				width: 100vw;
				.goods-item{
					width: 100%;
					flex-direction: row;
					.image-wrapper {
						width: 240upx;
						height: 240upx;
					}
					.text-box {
						margin-left: 30upx;
						flex: 1;
						.price-box {
							margin-top: 100upx;
						}
					}
				}
			}
		}
	}
	

</style>
