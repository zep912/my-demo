<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo('头像')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">头像</text>
			<img :src="person.avartar" class='cell-tip-img' />
			<text class="cell-more yticon icon-you cell-more-middle"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('用户名')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户名</text>
			<text class="cell-tip">{{person.userName}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('性别')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">性别</text>
			<text class="cell-tip">{{person.sex}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('生日')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">生日</text>
			<text class="cell-tip">{{person.birthday}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo('体重')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">体重</text>
			<text class="cell-tip">{{person.weight}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn log-save" @click="save" id='log-save'>
			<text class="cell-tit">保存</text>
		</view>
	</view>
</template>

<script>
	import {  
	    mapMutations  
	} from 'vuex';
	export default {
		data() {
			return {
				person:{
					avartar:'/static/missing-face.png',
					userName:'涂志奇',
					sex:'男',
					birthday:'1994-04-21',
					weight:'74KG'
				}	
			};
		},
		methods:{
			...mapMutations(['logout']),

			navTo(url){
				// this.$api.msg(`跳转到${url}`);
			},
			//保存
			save(){
				// uni.showModal({
				//     content: '确定要退出登录么',
				//     success: (e)=>{
				//     	if(e.confirm){
				//     		this.logout();
				//     		setTimeout(()=>{
				//     			uni.navigateBack();
				//     		}, 200)
				//     	}
				//     }
				// });
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
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
