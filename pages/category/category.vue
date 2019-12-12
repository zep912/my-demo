<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<!-- 放图片 -->
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
				<view class="t-list">
					<text class="s-item">{{item.productType == 1 ? '当季主推' : '网红爆品'}}</text>
					<view @click="navToList(item.id, titem.id)" class="t-item" v-for="titem in item.children" :key="titem.id">
						<image :src="titem.icon"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				slist: [],
				tlist: []
			}
		},
		onShow() {
			this.withChildren();
		},
		methods: {
			//一级分类点击
			tabtap(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				
				this.currentId = item.id;
				let index = this.slist.findIndex(sitem => sitem.id === item.id);
				if (index > -1) this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e){
				console.log(this.sizeCalcState);
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				console.log(scrollTop);
				let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					console.log(this.currentId);
					this.currentId = tabs[0].id;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid){
				uni.navigateTo({
					url: `/pages/product/list?tid=${tid}`
				})
			},
			withChildren() {
				axios.post('/home/list/withChildren', {}).then(({data})=>{
					// console.log(data);
					if (data.code === 200) {
						const categoryId = uni.getStorageSync('categoryId');
						const dataList = data.data;
						this.flist = dataList.map(({id, name}) => {
							return {id, name}
						});
						this.currentId = this.flist && this.flist.length && this.flist[0].id;
						console.log(categoryId);
						if (categoryId) {
							this.currentId = categoryId;
						}
						this.slist = dataList.reduce((res, item) => {
							item.productTypeList.forEach(val => val.id = item.id);
							res = res.concat(item.productTypeList);
							return res;
						}, [])
						// console.log(slist)
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding: 0 20upx;
	}
	.s-item{
		display: block;
		width: 100%;
		height: 70upx;
		font-size: 28upx;
		color: $font-color-dark;
		padding-left: 20upx;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding: 20upx 0;
		margin: 20upx 0;
		border-radius: 20upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 170upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 100upx;
			height: 100upx;
			margin-bottom: 15upx;
		}
	}
</style>
