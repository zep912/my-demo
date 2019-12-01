import axios from './../dist/uni-axios.min.js';

axios.defaults.baseURL = 'http://39.98.122.62:8085';
axios.interceptors.first.use((config) => {
	const token = uni.getStorageSync('gt');
	// console.log(token, 'Ftoken', config);
	if (token) {
		config.headers = {Authorization: token, ContentType: "application/json;charset=UTF-8"}
	}
	// console.log(config, 'configF');
	const showLoading = config.showLoading;
	if (showLoading) {
		uni.showLoading({
			mask: true,
			title: showLoading === true ? '加载中...' : showLoading
		})
	}
	return config;
}, (err) => {
	return Promise.reject(err);
})
axios.interceptors.response.use((response) => {
	// console.log(response)
	return response;
}, function (err) {
	return Promise.reject(err);
})
axios.interceptors.last.use((config) => {
	// console.log(config, 'last');
	if(config.showLoading){
		uni.hideLoading();
	}
})

module.exports = axios