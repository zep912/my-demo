<template>
	<view class="container">
		<uni-search-bar class="mp-search-box" :radius="10" placeholder="请输入商品名称"/>
		<view class="history-goods">
			<view class="title">历史搜索</view>
			<view class="content">
				<view v-for="item in historyGoods" :key='item'>
					{{item}}
				</view>
			</view>
		</view>
		<view class="hot-goods">
			<view class="title">热门搜索</view>
			<view class="content">
				<view v-for="item in historyGoods" :key='item'>
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	import {uniSearchBar} from "@/components/uni-search-bar/uni-search-bar.vue";
	export default {
		components: {uniSearchBar},
		data() {
			return {
				historyGoods: ['窝窝头', '大闸蟹', '红烧肉', '西班牙大龙虾', '热干面', '牛肉面', '炸酱面']
			};
		},
		onLoad() {
			this.productList()
		},
		methods: {
			productList() {
				axios.post('/product/search', { "pageNum": 0, "pageSize": 10}).then(({data}) => {
					console.log(data)
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	padding: 0 20upx;
	.mp-search-box {
		box-sizing: border-box;
		width: 100vw;
		height: 7vh;
	}
	.title {
		font-size: $font-lg;	
	}
	.history-goods, .hot-goods {
		font-size: $font-sm;
		.content {
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
}
</style>
