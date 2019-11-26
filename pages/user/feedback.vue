<template>
	<view class="feedback content">
		<view style="width: 100%;height: 10rpx;background: #f4f4f4;"></view>
		<view class="cate">
			<h3>分类标签</h3>
			<view class="cate-first">
				<view @click="choose(item.value,index)" :class="{active:arr.includes(item.value)} " v-for='(item,index) in list' class="cate-view">{{item.value}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 10rpx;background: #f4f4f4;"></view>
		<view class="question">
			<h3>问题和建议</h3>
			<textarea placeholder="请输入您的意见,您的意见是我们进步的动力!" maxlength='-1' placeholder-class='placeholderClass' v-model="content" />
			<button class="btn" @click="save">提交</button>
		</view>
		
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default({
		data(){
			return{
				content:'',
				list:[
					{
						value:'补货速度'
					},
					{
						value:'商品质量'
					},
					{
						value:'配送速度'
					},
					{
						value:'账号问题'
					},
					{
						value:'其他建议'
					}
				],
				arr:[],
				activeClass:-1
			}
		},
		onLoad(){
			
		},
		methods:{
			// 选择
			choose(n,index){
				if(this.arr.includes(n)){
					//includes()方法判断是否包含某一元素,返回true或false表示是否包含元素，对NaN一样有效
					//filter()方法用于把Array的某些元素过滤掉，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素：生成新的数组
					this.arr=this.arr.filter(function (ele){return ele != n;});
					//this.arr=this.arr.filter((ele)=>ele!=i);
					//filter()为假时删除
				}else{
					this.arr.push(n);
				}
				
			},
			save(){
				console.log(this.$store)
				let obj = {
					content:this.content,
					label:this.arr.join(','),
					memberId:this.$store.state.userInfo.id
				};
				
				console.log(obj)
				if(this.arr.length==0){
					this.$api.msg('请选择标签');
					return;
				}else if(this.content==''){
					this.$api.msg('请填写反馈内容');
					return;
				}else{
					axios.post('/feedback/add',obj).then(res=>{
						if(res.data.code==200){
							this.$api.msg(res.data.message);
							uni.navigateBack()
						}
					})
				}
				
				
				
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
		padding-top: 10rpx;
		margin: 0 auto;
		margin-top: 10rpx;
		// padding-bottom: 40rpx;
		.cate-first{
			display: flex;
			justify-content: flex-start;
			margin-bottom: 20rpx;
			flex-wrap: wrap;
			.cate-view{
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
				margin-bottom: 20rpx;
			}
			.cate-view:nth-of-type(3n-1){
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
		color: #fff;
		// margin-bottom: 90rpx;
	}
</style>
