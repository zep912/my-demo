import axios from './../dist/uni-axios.min.js';
// import uniAxios from './../index.js';
axios.defaults.baseURL = 'http://39.98.122.62:8085';
axios.interceptors.first.use(function (config){
	console.log(config)
	config.header.Authorization='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4YzJmMGRlMDIzOTM0YmY2YmE5MjE5OGIzZjU3NmY2MyIsImNyZWF0ZWQiOjE1NzQ1MTkzMjQxMzAsImV4cCI6MTU3NTEyNDEyNH0.Gn7_W--JMvKCai0CqLQvpdFcsP59OcQAawAU6TefJi_2gDCKhl4cXK3NwvZjqTW3ZayO9LvAFwpibtDD4v23-w'
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