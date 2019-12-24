<template>
	<view class="container">
		<view class="body" :class="{show: isShow}">
			<view class="content clearfix" v-for="item in list" :key="item.id">
				<view class="message clearfix">
					<view v-if="item.content">{{item.content}}</view>
					<view v-else><image :src="item.url"></image></view>
					<image src="../../static/my/missing-face.png"></image>
				</view>
			</view>
		</view>
		<view class="footer" :class="{show: isShow}">
			<view class="input-box">
				<input class="uni-input" @input="inputChange" confirm-type="send" @confirm="leaveWordAdd" placeholder="请输入您要咨询的问题" />
				<text class="iconfont icon-iconfontxinzeng" @click="isShow = true"></text>
			</view>
			<view class="box-flex">
				<view class="iconfont icon-zhaopian" @click="chooseImage('album')"></view>
				<view class="iconfont icon-paizhao" @click="chooseImage('camera')"></view>
				<!-- <view class="iconfont icon-qingping"></view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import axios from '@/utils/uniAxios.js'
	export default {
		data() {
			return {
				isShow: false,
				msg: {
					content: '',
					url: ''
				},
				list: []
			}
		},
		onShow() {
			this.listWord();
		},
		methods: {
			inputChange(e) {
				this.msg.content = e.target.value;
			},
			leaveWordAdd() {
				axios.post('/leaveWord/add', this.msg).then(({data}) => {
					if (data.code === 200) {
						this.msg = {
							content: '',
							url: ''
						};
						this.listWord();
						this.$api.msg('已发送成功');
					} else {
						this.$api.msg('发送失败，请稍后重试');
					}
				})
			},
			listWord() {
				axios.post('/leaveWord/list', {}).then(({data}) => {
					if (data.code === 200) {
						this.list = data.data;
					}
				})
			},
			chooseImage(type) {
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [type], //从相册选择
				    success: res => {
						console.log(res);
						uni.uploadFile({
							url: 'https://mini.cropcircle.com.cn/aliyun/oss/uploadimage',
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								if (uploadFileRes.code === 200) {
									this.msg.url = uploadFileRes.data.url;
									this.leaveWordAdd();
								}
							}
						});
				    }
				});
			}
		}
	}
</script>

<style lang='scss'>
.container {
	width: 100vw;
	height: 100vh;
	.body {
		width: 100vw;
		background: #F2F2F2;
		overflow-y: auto;
		padding: 20upx;
		height: calc(100% - 110rpx);
		&.show {
			height: calc(100% - 360upx);
		}
		.content {
			position: relative;
			margin-bottom: 20upx;
			min-height: 90upx;
			.message {
				position: absolute;
				right: 0;
				top: 0;
				display: flex;
				view {
					color: #fff;
					background: #f7b62c;
					padding: 20upx 30upx;
					margin-right: 20upx;
					border-radius: 20upx;
					max-width: 500upx;
					image {
						width: 180upx;
						height: 100%;
					}
				}
				image {
					width: 80upx;
					height: 80upx;
					vertical-align: middle;
				}
			}
		}
	}
	.footer {
		width: 100vw;
		height: 120upx;
		position: fixed;
		background: #fff;
		bottom: 0;
		left: 0;
		&.show {
			height: 360upx;
		}
		.input-box {
			padding: 20upx;
			display: flex;
			.uni-input {
				width: 644upx;
				height: 70upx;
				background-color: #EAEAEA;
				padding: 0 40upx;
				border-radius: 35upx;
				margin-right: 10upx;
			}
			.iconfont {
				font-size: 54upx;
				line-height: 70upx;
			}
		}
		.box-flex {
			display: flex;
			padding: 30upx;
			.iconfont {
				width: 120upx;
				height: 120upx;
				border-radius: 20upx;
				font-size: 60upx;
				line-height: 120rpx;
				background-color: #f8f8f8;
				text-align: center;
				margin-right: 35upx;
			}
		}
	}
	.clearfix::after {
		display: block;
		height: 0;
		clear: both;
		content: ''
	}
}
</style>
