<template>
	<view class="container">
		<view class="mp-search-box">
			<uni-search-bar :radius="10" placeholder="请输入学校名称"/>
			<!-- <view class="select-item">
				武汉工程大学（流芳校区）
				<button type="primary" size='mini'>重新定位</button>
			</view> -->
		</view>
		<view class="select-content">
			<view class="header">附近学校</view>
			<view class="body">
				<view v-for="item in list" :key="item.id" class="item-list" @click="setSchool(item)">
					{{item.address}}
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
				list: []
			}
		},
		onLoad() {
			this.addressList()
		},
		methods: {
			addressList() {
				axios.post('/address/list', {}).then(({data}) => {
					if (data.code === 200) {
						this.list = data.data;
					}
				})
			},
			setSchool(item) {
				uni.setStorageSync('school', item);
				uni.switchTab({url: '/pages/index/index'})
			}
		}
	}
</script>

<style lang="scss">
.mp-search-box {
	box-sizing: border-box;
	padding: 0 20upx;
	width: 100vw;
	// height: 15vh;
	height: 8vh;
	.select-item {
		position: relative;
		font-size: $font-lg;
		height: 60upx;
		line-height: 60upx;
	}
	.uni-button, button {
		position: absolute;
		top: 0;
		right: 0;
		height: auto;
		line-height: auto;
		border-radius: 30upx;
	}
}
.select-content {
	box-sizing: border-box;
	border-top: 1vh solid #f2f2f2;
	// height: 85vh;
	height: 92vh;
	.header {
		padding: 0 40upx;
		height: 8vh;
		line-height: 8vh;
		color: #F7B62C;
		font-size: $font-lg + 2;
	}
	.body {
		font-size: $font-lg;
		height: 75vh;
		overflow-y: auto;
		.item-list {
			padding: 0 40upx;
			height: 5vh;
			line-height: 5vh;
		}
	}
}
</style>
