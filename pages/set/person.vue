<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('头像')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">头像</text>
			<img :src="person.avatarUrl||'../../static/my/missing-face.png'" class='cell-tip-img' />
			<text class="iconfont icon-you" style="color: #909399;"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('用户名')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户名</text>
			<text class="cell-tip">{{person.nickName}}</text>
			<text class="iconfont icon-you" style="color: #909399;"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('性别')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<text class="cell-tip">{{gender}}</text>
			<text class="iconfont icon-you" style="color: #909399;"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('生日')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">生日</text>
			<text class="cell-tip">{{person.birthday?person.birthday:''}}</text>
			<text class="iconfont icon-you" style="color: #909399;"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('体重')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">体重</text>
			<text class="cell-tip">{{person.weight?person.weight:''}}</text>
			<text class="iconfont icon-you" style="color: #909399;"></text>
		</view>
		<view class="list-cell log-out-btn log-save" @click="save" id='log-save'>
			<text class="cell-tit">保存</text>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js';
	import {  
	    mapMutations,mapState
	} from 'vuex';
	export default {
		data() {
			return {
				person:{
					portrait:'',
					userName:'',
					gender:'',
					birthday:'',
					weight:'',
				},
				id:'',
				gender:''
			};
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onLoad(option){
			this.id = option.id;
			this.getData();
			
		},
		methods:{
			...mapMutations(['logout']),
			// 数据初始化
			getData(){
				let obj ={
					id:this.id
				}
				// 优先判断是不是微信登录
				if(!uni.getStorageSync('isCanUse')){
					this.person = this.$store.state.userInfo;
					console.log(this.person )
					if(this.person.gender==1){
						this.gender = '男'
					}else if(this.person.gender==0){
						this.gender = '女'
					}else{
						this.gender=''
					};
					return;
				}else if(uni.getStorageSync('setPhone')){//判断是不是手机登录
					axios.post('/sso/user/id',obj).then(res=>{
						// this.person = res.data.data;
						this.person = {
							avartar:'',
							userName:'',
							sex:'',
							birthday:'',
							weight:'',
						}
					})
				}
			},
			navTo(url){
			},
			//保存
			save(){
				// 返回上一页
				uni.navigateBack()
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: #f2f2f2;
		padding-top: 16rpx;
	}
	.container .log-save{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
		
	.container #log-save .cell-tit{
		color: #2a2a2a;
		font-size: 32rpx;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			/* margin-top: 16upx; */
			display: flex;
			align-items: center;
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		.cell-tip-img{
			width: 96rpx;
			height: 96rpx;
		}
		.cell-more-middle{
			margin-top: 20rpx;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
		
	}
</style>
