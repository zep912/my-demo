(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/orderDetails"],{

/***/ 294:
/*!**********************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/my-demo/main.js?{"page":"pages%2Forder%2ForderDetails"} ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _orderDetails = _interopRequireDefault(__webpack_require__(/*! ./pages/order/orderDetails.vue */ 295));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_orderDetails.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 295:
/*!***************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/my-demo/pages/order/orderDetails.vue ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orderDetails_vue_vue_type_template_id_155a1cec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orderDetails.vue?vue&type=template&id=155a1cec& */ 296);
/* harmony import */ var _orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orderDetails.vue?vue&type=script&lang=js& */ 298);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _orderDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orderDetails.vue?vue&type=style&index=0&lang=scss& */ 300);
/* harmony import */ var _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 18);






/* normalize component */

var component = Object(_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _orderDetails_vue_vue_type_template_id_155a1cec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _orderDetails_vue_vue_type_template_id_155a1cec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Desktop/my-demo/pages/order/orderDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 296:
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/my-demo/pages/order/orderDetails.vue?vue&type=template&id=155a1cec& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_template_id_155a1cec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderDetails.vue?vue&type=template&id=155a1cec& */ 297);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_template_id_155a1cec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_template_id_155a1cec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 297:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/my-demo/pages/order/orderDetails.vue?vue&type=template&id=155a1cec& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = __webpack_require__(/*! ../../static/dizhi.png */ 263)

  var m1 = __webpack_require__(/*! ../../static/shop.png */ 171)

  var m2 = _vm.timestampToTime(_vm.order.createTime)
  var m3 = _vm.timestampToTime(_vm.order.paymentTime)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        m2: m2,
        m3: m3
      }
    }
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 298:
/*!****************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/my-demo/pages/order/orderDetails.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderDetails.vue?vue&type=script&lang=js& */ 299);
/* harmony import */ var _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 299:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/my-demo/pages/order/orderDetails.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;






















































































































var _uniAxios = _interopRequireDefault(__webpack_require__(/*! @/utils/uniAxios.js */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { data: function data() {return { time: '', form: { collect: [{ time: '2019-04-06 11:37', shopName: '麦田圈官网旗舰店', state: 0, goodsList: [{ title: '香辣牛肉干', price: 88.88, image: '/static/goods.png', number: 1, attr: '规格 10*200g' }] }], goodsObj: { remarks: '香辣味的', allPay: '120', jifen: '100', preferential: '20.00', total: '880' }, orderMsg: { number: '13245679851354664', num: '3212313213213213132', creatTime: '2019-11-05 11:12:12', payTime: '2019-11-05 11:12:12', payWay: '微信支付' } }, img: ['icon-daifahuo', 'icon-daifukuan1', 'icon-daishouhuo1', 'icon-chenggong', 'icon-dingdanguanbi', 'icon-dingdanwancheng'], order: { status: '', img: '', wuliu: '', pay: '', statusMsg: '', color: '' }, statuss: '', show: false, marginBottom: '', steps: [{ text: '步骤一', desc: '描述信息' }, { text: '步骤二', desc: '描述信息' }, { text: '步骤三', desc: '描述信息' }, { text: '步骤四', desc: '描述信息' }], id: '' };}, onLoad: function onLoad(option) {console.log(option);this.statuss = option.status;this.id = option.id;this.getOrder();}, methods: { // 获取订单详情
    getOrder: function getOrder() {var _this2 = this;var obj = { cartItemIds: [this.id] };_uniAxios.default.post('/order/getDetailByOrderId', { id: this.id }).then(function (res) {if (res.data.code == '200') {_this2.order = res.data.data;console.log(_this2.order);if (_this2.order.status == 0) {// 待支付
            _this2.order.statusMsg = '';_this2.order.wuliu = '取消订单';_this2.order.img = _this2.img[1];_this2.order.pay = '立即支付';_this2.order.color = '';} else if (_this2.order.status == 1) {//待发货	
            _this2.show = false;_this2.order.statusMsg = '待发货';_this2.order.wuliu = '';_this2.order.img = _this2.img[0];_this2.order.pay = '';_this2.order.color = '#F7B62C';} else if (_this2.order.status == 2) {//待收货
            _this2.show = true;_this2.order.statusMsg = '待收货';_this2.order.wuliu = '查看物流';_this2.order.img = _this2.img[2];_this2.order.pay = '确认收货';_this2.order.color = '#515151';} else if (_this2.order.status == 6) {//交易成功
            _this2.show = true;_this2.order.statusMsg = '交易成功';_this2.order.wuliu = '删除订单';_this2.order.img = _this2.img[3]; // this.order.pay='去评价';//评价不做
            _this2.order.color = '#01B300';} else if (_this2.order.status == 4) {// 交易关闭
            _this2.show = true;
            _this2.order.wuliu = '删除订单';
            _this2.order.img = _this2.img[4];
          } else if (_this2.order.status == 3) {
            // 已完成
            _this2.show = true;
            _this2.order.statusMsg = '已完成';
            _this2.order.wuliu = '删除订单';
            _this2.order.img = _this2.img[5];
            _this2.order.pay = '再次购买';
            _this2.order.color = '#515151';
          }

        }
      });
    },
    consult: function consult() {
      uni.navigateTo({
        url: 'consult' });

    },
    // 根据不同状态，跳转或请求不同的页面
    logisticsTap: function logisticsTap(id) {var _this3 = this;
      console.log(this.statuss);
      if (this.order.status == 2) {//待收货
        uni.navigateTo({
          url: 'logistics' });

      } else if (this.statuss == 7 || this.order.status == 4 || this.statuss == 6) {//已完成，交易关闭，交易成功的订单，就删除订单
        _uniAxios.default.post('/order/deleteOrder', {
          id: this.order.id }).
        then(function (res) {
          console.log(res);
          if (res.data.code == '200') {
            _this3.$api.msg('删除成功');
            uni.navigateTo({
              url: 'order' //返回到订单详情
            });
          }
        });
      } else if (this.order.status == 1) {//待付款，取消订单
        _uniAxios.default.post('/order/cancelOrder', {
          orderId: id }).
        then(function (res) {
          if (res.data.code == 200) {
            _this3.$api.msg('订单取消成功');
            uni.redirectTo({
              url: 'order' //返回到订单详情
            });
          }
        });
      }
    },
    pay: function pay(id, productId) {
      if (this.order.status == 2) {// 确认收货
        _uniAxios.default.post('/order/updateOrderStatus', {
          orderId: id,
          status: 2 }).
        then(function (res) {
          console.log(res);
          if (res.data.code == 200) {
            uni.navigateTo({
              url: 'order?state=3' });

          }
        });
      } else if (this.order.status == 3) {//再次购买
        uni.navigateTo({
          url: '../product/product?id=' + productId });

      } else if (this.order.status == 0) {//立即支付
        var code = uni.getStorageSync('code');
        var obj = {
          code: code, //code
          orderSn: this.order.orderSn, //订单编号orderSn
          payType: 3, //支付类型
          rechargeMoney: this.order.payAmount //支付金额s
        };
        var _this = this;
        _uniAxios.default.post('/pay/payOrder', obj).then(function (res) {
          console.log(res);
          _this.payCode = {
            appId: res.data.data.appId,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            paySign: res.data.data.paySign,
            signType: "MD5",
            timeStamp: res.data.data.timeStamp };

          uni.requestPayment({
            provider: 'wxpay',
            timeStamp: _this.payCode.timeStamp,
            nonceStr: _this.payCode.nonceStr,
            package: _this.payCode.package,
            signType: 'MD5',
            paySign: _this.payCode.paySign,
            success: function success(res) {
              console.log('success:' + JSON.stringify(res));
              uni.reLaunch({
                url: 'paySuccess?totalCount=' + _this.totalCount + '&id=' + _this.orderList.id });

            },
            fail: function fail(err) {
              console.log('fail:' + JSON.stringify(err));
              this.$api.msg('取消付款');
            } });

        });
      }
    },
    // 日期转换
    // 时间戳转换成时间
    timestampToTime: function timestampToTime(time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear();
      var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      var D = date.getDate();
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();

      return Y + '-' + M + '-' + D + ' ' + h + m + s;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 300:
/*!*************************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/my-demo/pages/order/orderDetails.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../Downloads/HBuilderX.1.2.1.20181126/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderDetails.vue?vue&type=style&index=0&lang=scss& */ 301);
/* harmony import */ var _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_Downloads_HBuilderX_1_2_1_20181126_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderDetails_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 301:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/my-demo/pages/order/orderDetails.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[294,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/orderDetails.js.map