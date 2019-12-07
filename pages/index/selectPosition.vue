<template>
	<view class="container">
		<view class="mp-search-box">
			<uni-search-bar :radius="10" placeholder="请输入学校名称"/>
			<view class="select-item">
				武汉工程大学（流芳校区）
				<button type="primary" size='mini'>重新定位</button>
			</view>
		</view>
		<view class="select-content">
			<view class="header">附近学校</view>
			<view class="body">
				<view v-for="item in list" :key="item" class="item-list">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {uniSearchBar} from "@/components/uni-search-bar/uni-search-bar.vue";
	export default {
		components: {uniSearchBar},
		data() {
			return {
				list: [
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
					'武汉传媒学院',
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.mp-search-box {
	box-sizing: border-box;
	padding: 20upx;
	width: 100vw;
	height: 15vh;
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
	height: 85vh;
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
