<template>
	<view class="feedback content">
		<view style="width: 100%;height: 10rpx;background: #f4f4f4;"></view>
		<view class="cate">
			<h3>分类标签</h3>
			<view class="cate-first">
				<text @click="choose(item.value,index)" :class="activeClass==index ? 'active' : '' " v-for='(item,index) in list'>{{item.value}}</text>
			</view>
			<view class="cate-first">
				<text @click="choose1(item.value,index)" :class="activeClass==index ? 'active' : '' " v-for='(item,index) in list1'>{{item.value}}</text>
			</view>
		</view>
		<view style="width: 100%;height: 10rpx;background: #f4f4f4;"></view>
		<view class="question">
			<h3>问题和建议</h3>
			<textarea :value="value" placeholder="请输入您的意见,您的意见是我们进步的动力!" maxlength='-1' placeholder-class='placeholderClass' />
			<button type="primary" class="btn" @click="save">提交</button>
		</view>
		
	</view>
</template>

<script>
	export default({
		data(){
			return{
				value:'',
				list:[
					{
						value:'补货速度'
					},
					{
						value:'商品质量'
					},
					{
						value:'配送速度'
					}
				],
				list1:[
					{
						value:'账号问题'
					},
					{
						value:'其他建议'
					}
				],
				activeClass:-1
			}
		},
		onLoad(){
			
		},
		methods:{
			choose(n,index){
				this.activeClass = index;
				this.value+=n+' '
			},
			choose1(n,index){
				this.activeClass = index;
				this.value+=n+' '
			},
			save(){
				console.log(this.value)
			}
		}
	})
</script>

<style lang="scss">
	page{
		background: #fff;
	}
	h3{
			font-size:30rpx;
			font-weight:500;
			color:rgba(42,42,42,1);
			margin-bottom: 36rpx;
		}
	.cate{
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 36rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		padding-bottom: 40rpx;
		.cate-first{
			display: flex;
			justify-content: flex-start;
			margin-bottom: 20rpx;
			text{
				width:32%;
				height:70rpx;
				border-radius:35rpx;
				background:rgba(244,244,244,1);
				border:1px solid rgba(244,244,244,1);
				display: flex;
				justify-content: center;
				align-items: center;
				font-size:26rpx;
				font-weight:500;
				color:rgba(42,42,42,1);
			}
			text:nth-of-type(2){
				margin-left: 2%;
				margin-right: 2%;
			}
			.active{
				background:rgba(255,245,223,1);
				border:1px solid rgba(247,181,44,1);
			}
		}
		
	}
	.question{
		height: calc(100% - 50px);
		margin-top: 10rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 36rpx;
		background: #fff;
		textarea{
			width:690rpx;
			height:536rpx;
			background:rgba(244,244,244,1);
			border:2px solid rgba(227,227,227,1);
			border-radius:20rpx;
			box-sizing: border-box;
			padding-top: 34rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
		}
		
	}
	.placeholderClass{
		font-size:26rpx;
		font-weight:500;
		color:rgba(134,134,134,1);
	}
	.btn{
		width:100%;
		height:80rpx;
		background:rgba(247,181,44,1);
		border-radius:40rpx;
		text-align: center;
		line-height: 80rpx;
		margin-top: 80rpx;
	}
</style>
