import axios from './../dist/uni-axios.min.js';
// import uniAxios from './../index.js';
axios.defaults.baseURL = 'http://39.98.122.62:8085';
axios.interceptors.first.use(function (config){
	uni.getStorage({
	    key: 'gt',
	    success: function (res) {
	        console.log(res.data);
			config.header.Authorization=res.data;
	    }
	});
	console.log(config)
	var showLoading = config.showLoading;
	if(showLoading){
		uni.showLoading({
			mask: true,
			title: showLoading === true ? '加载中...' : showLoading
		})
	}
	return config;
}, function (err){
	return Promise.reject(err);
})
axios.interceptors.response.use(function (response){
	console.log(response)
	return response;
}, function (err) {
	return Promise.reject(err);
})
axios.interceptors.last.use(function (config){
	console.log(config);
	if(config.showLoading){
		uni.hideLoading();
	}
})

module.exports = axios