(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 172:
/*!**************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/my-03.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAIAAAC1JZyVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjExNkI1M0YwMzgxMTFFQTkxNThDM0RBODc5NTdBMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjExNkI1NDAwMzgxMTFFQTkxNThDM0RBODc5NTdBMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMTE2QjUzRDAzODExMUVBOTE1OEMzREE4Nzk1N0EyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMTE2QjUzRTAzODExMUVBOTE1OEMzREE4Nzk1N0EyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po1qm0QAAAKZSURBVHja3Fc9SHJRGPb6U4aitDgUSGmDi3wQlqA0Ooi7k7QYzhKBi6ggKEGCs065tLQ46SC6pRKICg5CiWCIiBb4k+Vvj5643/ThVW/f0DO851zl3ue+533Oc95LzWYzzgLFYjGXyzWbTYqiOBtgPB7v7u6q1erT01OBQEB+pEDT7Xavr6+fn585rEIqlV5cXGg0mjnNYDC4urpqt9u4AD/+o/NbD1wu9/Pz8/Hx8f39HZc+n+/w8JC6u7uLRqNbW1tut1uhULCVSr/fd7lc9Xr94ODA7/dz0+k0fjWbzSxyACKRyOFwYFKtVucpojAY2OUgkMlk29vb3ytJBqwm5wfA4/G+aYh8Nyz7v0A/lsv5L/gVNLSh8BnekM/nIf1GozEcDrEBGd718fFBxMaIJhKJxGKx9RLi8/mMaILBYDabxeTPAjs7O5PJhMlyQWa3t7dIaDlNuVwmHBaLxWQyrZoKnAyus1wCiUQCUaVSEY5arQbrSyaTDGmm0ykjpeG5iDqdDhHF93g8EokkHA4/PDywL2hal3g7UlIm5VmBZn9/HzGTySDisHA6nfD28/Pzs7MzNmkMBgNiqVSKx+OYKJVKnLNGo5Hl7Ynin5yc4CiENKE60BBBL7VaIujRaERMevm+uby8DIVCqVQqs8Aa5xtTF7DZbMfHx+B4e3tbyWyenp7Q6KzgaZoFVk3FarWSxuNnHfq3Hmskrw0b2qX75puG7nTYxV/rhBViqFQqrHO0Wi1y2MxptFothvv7+5eXFxY5QHBzc4OJXC6frx50bbfbO50O2RxIbrbAJq06tnChUCD9rNfrPTo6mjvP6+trIBBgfd3EYjE+PMhqUfSLwx/xidPr9agFNim7UCjc29vT6/W0sr4EGACiHTXbWMciogAAAABJRU5ErkJggg=="

/***/ }),

/***/ 173:
/*!**************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/my-04.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAIAAAC1JZyVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjExNkI1NDMwMzgxMTFFQTkxNThDM0RBODc5NTdBMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjExNkI1NDQwMzgxMTFFQTkxNThDM0RBODc5NTdBMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMTE2QjU0MTAzODExMUVBOTE1OEMzREE4Nzk1N0EyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMTE2QjU0MjAzODExMUVBOTE1OEMzREE4Nzk1N0EyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvKnroYAAAS7SURBVHjavJdHSF1LHMbf9Wps4EKJvUQsMfaIig2VgI0oQoiImwTiRlFRcCuYRYgoiKCboLgURRBcKGJARcEgiTW22LD3rmgsUfPzjZx33z0nV30kbxbnDnNmzr993/efq7q6uvrrzw99He/ev38/PDwsXy8qKnr06NG9zOj96gVRTk5OyteNjY0fPHjw26IZGxs7PT1l8vLly7CwsMvLS5FeCwsLLP02M0NDQ2KSmJhoaGj4p2ozPz/P08HB4VYbvb29jY2NZ2dnarVa/vbHjx/m5ubKZk5OTiYmJpj4+fnd6ml9ff3i4qKODUtLS8pmsCEK4+vre6sZExMTnpaWlu7u7pRQWlepVBcXF1++fOGpbGZgYOA6ofr6np6et4NVT0/E/ebNG/nb9PT04+NjZUB//fqVp5eXl2K6FYeIXr4o8KlgZnNzc3V1lYmPj8/dsaRbTfR0QPnp06d3MSCgKCokf0WFlAE9ODjIExTa2tpqrlPJpqam8/NzcVIay8vLPL99+9bQ0KD1KY6wX9kM/OcZGxurtb67u1tXV6eDZ4Jqt9Czp6dnbm5uamrq+/fvwhghP3782NnZWWwQ6wxTU1MDAwNN7OoYbDMzM7s28+nTJ+JdWVnRApvAW3BwMKBkq/QqLy8P83IzWsmU8oYG6q+trVVUVIglpNfJyQmRRzkISxj+/PlzUFBQRESEkZGRpB9Ecz9Nw01XV9ft7e2EhISoqChNr2dnZz9+/EiuvL29BSiAE1wbGRnx9/e/lxmVwDuh3YWJxcXF4NDa2rqsrOy/KDQ2YGx7e3tfX9/Ozg7F51vh4eGBgYGau0NDQzFDnmdmZlxcXDRf7e/vd3R00G339vZIvr29fWRkpETwm2g4XFVVhQEtLzw8PDIzM5FFqZ4IF5UDfrRwaVtbW1tNTY0ERWkEBARkZ2cDAfXbt2/JNe1dbKL+ISEhtBmqxee2trYAelxcnEgpKgkQkAlcZoIks9jd3f3hwwdwwfzJkyfgxcbGZn19HZ8QLboRFFTx9YyMDDJGophgQ2o5kLG1tZU5i7m5uZKPWVlZIu6SkhIcSktLE2KTk5MjQePg4ID4urq6mD979kxNXIIfhYWFmk2MLsAZnFpYWKAvxcfHSzeN58+fE+Lh4SFx4Kww+e7dO8ikqWaENT09zRdArJrskx/qmZKSIkcIUG5ubqZ+hI+DtDv4hIRjAylDr4QNWBUTEyM/zv2ks7Pz2umNjQ0dXZJUkGii6f17/AqvME9xHbIjDXipR3JEJe7Vr+TCpbgOiG5KgLPAqb+//9WrV/J9xEqKmKSmpkIarc/hKYSFRrANEZEf50J50z2jo6P5oVD0Evm+8vJyMUlKSrKysrL594DC4vjo6CjU0TpL5WprawX31dXV1Ygj5YXAxEg2RTeE59ig4MyBLIRQTIubm1tLSwukIR98zdHREUASAVwsLS0Vzf7169fX9YFrBQUF4I0lpJemiSNSX0Bv8vPzdRQGhzgu3bCRjKOjIwohVgAhPLsRG3QXJnOn0kp9cnIyVbkVAvTDyspK+KF1/MWLF1zB/9E0McbHxyEUVAB+Dx8+5JKGAt5dhkE8x9FQjtvZ2cE56bjq//kb9VOAAQDqgJPCdAB39QAAAABJRU5ErkJggg=="

/***/ }),

/***/ 174:
/*!**************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/my-05.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAIAAABjfH+IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjExOTk5NzIwMzgxMTFFQTkxNThDM0RBODc5NTdBMkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjExOTk5NzMwMzgxMTFFQTkxNThDM0RBODc5NTdBMkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMTE2QjU0NTAzODExMUVBOTE1OEMzREE4Nzk1N0EyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMTE2QjU0NjAzODExMUVBOTE1OEMzREE4Nzk1N0EyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoKlHB0AAAKwSURBVHja7Jc9SHJRGMdTb74kETnloDQ1iPYKEoLaopPhFriFTurgEOEU0hJikLpL4uKSKAoafkBGODj5iegibQl+FJlDCKb2PnbgIGZ2y1vDS89y/+fcc+/v3Odw/s89tJeXl4Vvi1KpdHJyAoLAXXd3d+12m06n02g08i/q9/ssFovH4729lc1mnU4n0iNMvV4PBoPpdPrLs97Z2dFqteM9xWIRM9RqNfH8/Hx0dPT09DRPcmq12ngzn8/b7XakNRrN7u4uEQ6HEUMoFMpkMgaDMRwOyQMGg8HS0pJYLMY919fXZ2dnSOt0OpVKNUpaoVCAy9ramsVimX/N4/G41+tF2mAwKBQKpOlo7mw2m1qGXq/HjBEGsgQXWKE5GalUCjP29vaUSuX4XYKS/ZFMJj0eD9Imk2l7e3tiAAWYQCAQCoWQPjg4kEgkSFcqFViRzc3NUdLmZPh8Pswwm82Y8fDwYLVabTZbtVqdF3N+fg77AQQYBzC2trbwrWazicTNzc2UpIF5XF5etlqtt5YDPgQZEIlEqAkfEYlEkD48PETJwcFkMpEAK5qCubi48Pv9700/Go263e7l5WXQV1dXqPP4+HhjY2P2d09iwAvA3CCzU0fz+Xw8TaPRCMYllUo/ZEzBwDMOh6Pb7U4dDb6C9d/XILmKxIevoyToCz8S/xdmcm2g9iQSiUajQRBkfQgcBfxXIBDI5XKymFgshs3jUwHVDJxmcXGRFAaGZjKZ+/v7z2KggKKaQgqzvr5+enr63r6ZEbP3wO+++cX8KAYqI7XvxcUXnTjo6A+N8uPH6uoqrvojDGrf3t6Wy2UKMWBaSHA4nNHH5XI5/PfO5XJnGAb5eHx87HQ6IFZWVlwuFySQAC+Cn0SA9Xq9ifPDPPHnNfb399Ei0b71UIjjnwADAPlNBkIV2zYGAAAAAElFTkSuQmCC"

/***/ }),

/***/ 175:
/*!*****************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/title_01.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAAAZCAIAAADVOID4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEM1QjM1OTEwMzg0MTFFQTk5QUVEQjY2QjE3ODMwMTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEM1QjM1OTIwMzg0MTFFQTk5QUVEQjY2QjE3ODMwMTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QzVCMzU4RjAzODQxMUVBOTlBRURCNjZCMTc4MzAxNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QzVCMzU5MDAzODQxMUVBOTlBRURCNjZCMTc4MzAxNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ptl1kVsAAAnRSURBVHja7Jx/bBPn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"

/***/ }),

/***/ 18:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/*!*****************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/Json.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 用户 */
var userInfo = {
  status: 1,
  data: {
    id: 1,
    mobile: 18888888888,
    nickname: 'Leo yo',
    portrait: '/static/missing-face.png' },

  msg: '提示'

  /* 首页轮播图 */ };
var carouselList = [{
  src: "/static/temp/banner3.jpg",
  background: "rgb(203, 87, 60)" },

{
  src: "/static/temp/banner2.jpg",
  background: "rgb(205, 215, 218)" },

{
  src: "/static/temp/banner4.jpg",
  background: "rgb(183, 73, 69)" }];


/* 商品列表 */
var goodsList = [{
  image: "/static/index/egg.png",
  title: "正宗农家散养谷饲土鸡蛋20枚",
  price: 1.00 },

{
  image: "/static/index/mm.png",
  title: "福尔佳透明质酸钠修复面膜99盒",
  price: 1.00 },

{
  image: "/static/index/mgg.png",
  title: "味道一般般蛋芒果干10kg",
  price: 1.00 },

{
  image: "/static/index/ht.png",
  title: "香甜核桃100kg",
  price: 1.00 }];



/* 购物车 */
var cartList = [{
  id: 1,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
  attr_val: '春装款 L',
  stock: 15,
  title: 'OVBE 长袖风衣',
  price: 278.00,
  number: 1 },

{
  id: 3,
  image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
  attr_val: '激光导航 扫拖一体',
  stock: 3,
  title: '科沃斯 Ecovacs 扫地机器人',
  price: 1348.00,
  number: 5 },

{
  id: 4,
  image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
  attr_val: 'XL',
  stock: 55,
  title: '朵绒菲小西装',
  price: 175.88,
  number: 1 },

{
  id: 5,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
  attr_val: '520 #粉红色',
  stock: 15,
  title: '迪奥（Dior）烈艳唇膏',
  price: 1089.00,
  number: 1 },

{
  id: 6,
  image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
  attr_val: '樱花味润手霜 30ml',
  stock: 15,
  title: "欧舒丹（L'OCCITANE）乳木果",
  price: 128,
  number: 1 },

{
  id: 7,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
  attr_val: '特级 12个',
  stock: 7,
  title: '新疆阿克苏苹果 特级',
  price: 58.8,
  number: 10 },

{
  id: 8,
  image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
  attr_val: '激光导航 扫拖一体',
  stock: 15,
  title: '科沃斯 Ecovacs 扫地机器人',
  price: 1348.00,
  number: 1 },

{
  id: 9,
  image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
  attr_val: 'XL',
  stock: 55,
  title: '朵绒菲小西装',
  price: 175.88,
  number: 1 },

{
  id: 10,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
  attr_val: '520 #粉红色',
  stock: 15,
  title: '迪奥（Dior）烈艳唇膏',
  price: 1089.00,
  number: 1 },

{
  id: 11,
  image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
  attr_val: '樱花味润手霜 30ml',
  stock: 15,
  title: "欧舒丹（L'OCCITANE）乳木果",
  price: 128,
  number: 1 },

{
  id: 12,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
  attr_val: '特级 12个',
  stock: 7,
  title: '新疆阿克苏苹果 特级',
  price: 58.8,
  number: 10 },

{
  id: 13,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
  attr_val: '春装款/m',
  stock: 15,
  title: '女装2019春秋新款',
  price: 420.00,
  number: 1 }];


//详情展示页面
var detailData = {
  title: '纯种金毛幼犬活体有血统证书',
  title2: '拆家小能手 你值得拥有',
  favorite: true,
  imgList: [{
    src: '/static/missing-face.png' },

  {
    src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg' },

  {
    src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg' },

  {
    src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg' }],


  episodeList: [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],

  guessList: [{
    src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
    title: '猫眼指甲油',
    title2: '独树一帜的免照灯猫眼指甲' },

  {
    src: 'http://m.china-7.net/uploads/14778449362891.jpg',
    title: '创意屋',
    title2: '创意屋形上下双层高低床' },

  {
    src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
    title: 'MissCandy 指甲油',
    title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质' },

  {
    src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
    title: 'RMK 2017星空海蓝唇釉',
    title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。' }],


  evaList: [{
    src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
    nickname: 'Ranth Allngal',
    time: '09-20 12:54',
    zan: '54',
    content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。' },

  {
    src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
    nickname: 'Ranth Allngal',
    time: '09-20 12:54',
    zan: '54',
    content: '楼上说的好有道理。' }] };



var shareList = [{
  type: 1,
  icon: '/static/temp/share_wechat.png',
  text: '微信好友' },

{
  type: 2,
  icon: '/static/temp/share_moment.png',
  text: '朋友圈' },

{
  type: 3,
  icon: '/static/temp/share_qq.png',
  text: 'QQ好友' },

{
  type: 4,
  icon: '/static/temp/share_qqzone.png',
  text: 'QQ空间' }];


var lazyLoadList = [{
  src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg' },

{
  src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg' },

{
  src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg' },

{
  src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg' },

{
  src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg' },

{
  src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg' },

{
  src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg' },

{
  src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg' },

{
  src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg' },

{
  src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg' },

{
  src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg' },

{
  src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg' },

{
  src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg' },

{
  src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg' },

{
  src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg' },

{
  src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg' },

{
  src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg' },

{
  src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg' },

{
  src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg' },

{
  src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg' }];



var orderList = [{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 1,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },


{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 2,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' },

  {
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },



{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 3,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' },

  {
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },



{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 4,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },



{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 2,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },



{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 5,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },



{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 6,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },



{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 7,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] },



{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 9,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] }];




var collect = [
{
  time: '2019-04-06 11:37',
  shopName: '麦田圈官网旗舰店',
  state: 5,
  goodsList: [{
    title: '香辣牛肉干',
    price: 88.88,
    image: '/static/goods.png',
    number: 1,
    attr: '规格 10*200g' }] }];




var cateList = [{
  id: 1,
  name: '手机数码' },

{
  id: 2,
  name: '礼品鲜花' },

{
  id: 3,
  name: '男装女装' },

{
  id: 4,
  name: '母婴用品' },

{
  id: 5,
  pid: 1,
  name: '手机通讯' },

{
  id: 6,
  pid: 1,
  name: '运营商' },

{
  id: 8,
  pid: 5,
  name: '全面屏手机',
  picture: '/static/temp/cate2.jpg' },

{
  id: 9,
  pid: 5,
  name: '游戏手机',
  picture: '/static/temp/cate3.jpg' },

{
  id: 10,
  pid: 5,
  name: '老人机',
  picture: '/static/temp/cate1.jpg' },

{
  id: 11,
  pid: 5,
  name: '拍照手机',
  picture: '/static/temp/cate4.jpg' },

{
  id: 12,
  pid: 5,
  name: '女性手机',
  picture: '/static/temp/cate5.jpg' },

{
  id: 14,
  pid: 6,
  name: '合约机',
  picture: '/static/temp/cate1.jpg' },

{
  id: 15,
  pid: 6,
  name: '选好卡',
  picture: '/static/temp/cate4.jpg' },

{
  id: 16,
  pid: 6,
  name: '办套餐',
  picture: '/static/temp/cate5.jpg' },

{
  id: 17,
  pid: 2,
  name: '礼品' },

{
  id: 18,
  pid: 2,
  name: '鲜花' },

{
  id: 19,
  pid: 17,
  name: '公益摆件',
  picture: '/static/temp/cate7.jpg' },

{
  id: 20,
  pid: 17,
  name: '创意礼品',
  picture: '/static/temp/cate8.jpg' },

{
  id: 21,
  pid: 18,
  name: '鲜花',
  picture: '/static/temp/cate9.jpg' },

{
  id: 22,
  pid: 18,
  name: '每周一花',
  picture: '/static/temp/cate10.jpg' },

{
  id: 23,
  pid: 18,
  name: '卡通花束',
  picture: '/static/temp/cate11.jpg' },

{
  id: 24,
  pid: 18,
  name: '永生花',
  picture: '/static/temp/cate12.jpg' },

{
  id: 25,
  pid: 3,
  name: '男装' },

{
  id: 26,
  pid: 3,
  name: '女装' },

{
  id: 27,
  pid: 25,
  name: '男士T恤',
  picture: '/static/temp/cate13.jpg' },

{
  id: 28,
  pid: 25,
  name: '男士外套',
  picture: '/static/temp/cate14.jpg' },

{
  id: 29,
  pid: 26,
  name: '裙装',
  picture: '/static/temp/cate15.jpg' },

{
  id: 30,
  pid: 26,
  name: 'T恤',
  picture: '/static/temp/cate16.jpg' },

{
  id: 31,
  pid: 26,
  name: '上装',
  picture: '/static/temp/cate15.jpg' },

{
  id: 32,
  pid: 26,
  name: '下装',
  picture: '/static/temp/cate16.jpg' },

{
  id: 33,
  pid: 4,
  name: '奶粉' },

{
  id: 34,
  pid: 4,
  name: '营养辅食' },

{
  id: 35,
  pid: 4,
  name: '童装' },

{
  id: 39,
  pid: 4,
  name: '喂养用品' },

{
  id: 36,
  pid: 33,
  name: '有机奶粉',
  picture: '/static/temp/cate17.jpg' },

{
  id: 37,
  pid: 34,
  name: '果泥/果汁',
  picture: '/static/temp/cate18.jpg' },

{
  id: 39,
  pid: 34,
  name: '面条/粥',
  picture: '/static/temp/cate20.jpg' },

{
  id: 42,
  pid: 35,
  name: '婴童衣橱',
  picture: '/static/temp/cate19.jpg' },

{
  id: 43,
  pid: 39,
  name: '吸奶器',
  picture: '/static/temp/cate21.jpg' },

{
  id: 44,
  pid: 39,
  name: '儿童餐具',
  picture: '/static/temp/cate22.jpg' },

{
  id: 45,
  pid: 39,
  name: '牙胶安抚',
  picture: '/static/temp/cate23.jpg' },

{
  id: 46,
  pid: 39,
  name: '围兜',
  picture: '/static/temp/cate24.jpg' }];var _default =



{
  carouselList: carouselList,
  cartList: cartList,
  detailData: detailData,
  lazyLoadList: lazyLoadList,
  userInfo: userInfo,
  shareList: shareList,
  goodsList: goodsList,
  orderList: orderList,
  cateList: cateList };exports.default = _default;

/***/ }),

/***/ 192:
/*!*************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/shop.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAIAAAD47T2eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTNCNzJDNzgwM0MwMTFFQTgyMzE4Q0FFQTY2NjU2NEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTNCNzJDNzkwM0MwMTFFQTgyMzE4Q0FFQTY2NjU2NEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1M0I3MkM3NjAzQzAxMUVBODIzMThDQUVBNjY2NTY0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1M0I3MkM3NzAzQzAxMUVBODIzMThDQUVBNjY2NTY0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjyEHcMAAAMuSURBVHja3FbNSypRFHeGV1QmYVi5yJQIhYJELKGWUYRQK4UWLlq0rI0gCGKtWkiupCCIQv0DhAd9QFKBEfRBm4yKFAv6WARpCSoV1byf78o4zkuIZmrxfovBc+71fNzzO+deimEYCQe3t7fT09PRaLSiooKiKFbP21YOLy8vjY2NExMT/f39JQsMB/F4vLa2ViIGlpeXuZYpbpharRaeRkZGbDYbRJINm1O5H1wRODw8dLlc1dXV6XQaR8LPZnV1FWJdXR0jGCaTCaY8Hg+rKbppa2vD2vz8vHA3BwcHMCWVSl9fX0vcrK+vYwGZMiJBr9fD4NzcXImbzs5OaBcXF8Vys7GxAYMNDQ1FNyRHEJERFT09PTC7sLBQcDM4OAjZ5/OJ62ZnZwdmlUplntBXV1ctLS2oyuPjY2VlJRYcDsfm5iaXqTyU08Pc29sbusLv95P+a29vPzs7y3PY6/VCRt+yUTQ1NQnszWQySUyFQiGI3d3dVEdHx8nJyf7+PiE78PDwkEgkvuyjubkZB8WKVVVVz8/PhfQzmQxoLvkG4PSy2SxdU1ND0vyyoVQqVW7p9PQUPvJ1QsEhW63WD9mSy+VQttnZ2XJ06uvrA32WlpY+XO3q6oLxmZmZ4nE5nU7eJhCGpcPAwMDx8TFvA4JjAx8aGsLQ5K6Oj49Dr9FoCn2ztbVFthoMBowHWJ+ammLLiHhZZwgF3XB9fb2ystLb2wuNTCZzu90YuGSD2WxGP2KaGI1Gojk/Py+ZaSqVineyIGEwGMQqRvrY2Ni/R4+wYrEYNqC0JHYu1Gr17u4u/75BZ/3+C/wHTMch4Mv9GxoNuaJz7+/vwdrR0VG73c7dcHd3h1EWiUSenp6Gh4ctFgtN04WO/uTtKxC05EdAs4XS6XRk8IgCcKS1tXVtba3Ezd7eHooZCATEchMOhy8vL7e3t0vcgJf4KhQKsdzI5XLysvigNiwxhIP36PlZCvxfbjACyANKLLv19fX44p1GxF/cl/jNzQ1ojRfp+/u7kOLDGjqEjb74uMWY+o7b8+joiD86cdNNTk5eXFzktWXeLp8EksB4xmDFJUI0fwQYAE8v8GwlyturAAAAAElFTkSuQmCC"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 209:
/*!********************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/couponPrice.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjhFMThGQjEwODczMTFFQTgxRjVEREJDQkU0RDE3REEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjhFMThGQjIwODczMTFFQTgxRjVEREJDQkU0RDE3REEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOEUxOEZBRjA4NzMxMUVBODFGNUREQkNCRTREMTdEQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOEUxOEZCMDA4NzMxMUVBODFGNUREQkNCRTREMTdEQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiTsoEAAAAJRSURBVHjaYnx288DMy1vmpjEAAQs7J4NRUE49B59QEwNxIBmod9r7p3fYQBxFc48jTILSKqd4RKXBsn9+fmd4fv1UIEghMYbdPrS+GmaYqJLua1kD+wVMUJNnwVQBDTQgxjCQxUCsCOKAHKTpGlUJZM4FGsg4V1BalRRXJn95/VQL6DpvEAcYPAxaLlH1MEkmGEPWwGEZkiu9cTkNaCH/tT3LimBhDjSsD2joU5DrwAYyAgkgniumpLsPZBsIAF3A8P7pXTOwDCpOvr57WfuPT+/A6oDenAX02TWYYSguhLpyK4z94tpJdG8n3z+5PQcWCap2gVtBEYpsGIqB/4ESkppm62GuBGoUBXqPB2YYkG/2+MJBA4jF9hckNc3Xg8If3RdM/yGGYbgSOXKAXpS+vntpGix5KJp7TkF3GVYvM6C58vW9S/Yg+tqepY0gCyDJI7oSl2EgwPj9y1OM5AFy2e1D68AxDQynX6BwA1mi551SD41RFEegGHj7yLID905ut2cgAwB9c1/NLkgJWYwFRPBCEzUy+A5MGiBvwhIvKzDNoQNeUZlrGF7+gcXLIHBpyxx4ptfzSZkFTSLYAKqXjy2q+I9NFbILsfkAbJF3SgEwt0xE8fLn108xFIKyFMwwEMCmBhQMQHVfsHj5WQKq0H9mUCIGehme7rQgSQUD/MfiZRZg4l6AZgcoL8eiBjzjXBQj0DIDqoH/MZQkf379RAvGASbmm1gTME4DsYAfn9+JwticvKCE/J/otMmCxc6/36HFEyjgOfiEH5GS2AECDABhkPql+j1x/AAAAABJRU5ErkJggg=="

/***/ }),

/***/ 210:
/*!****************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/beuesed.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkNERjYxMzQwODdEMTFFQTgzOTNCOTg3QUI4RjgxOTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkNERjYxMzUwODdEMTFFQTgzOTNCOTg3QUI4RjgxOTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2Q0RGNjEzMjA4N0QxMUVBODM5M0I5ODdBQjhGODE5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2Q0RGNjEzMzA4N0QxMUVBODM5M0I5ODdBQjhGODE5MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Plv0870AAAHASURBVHjanFRRqoJAFB0tCgKJQOgjCIoEf9zB28HbQSvRFTQraQdvB68NPKGfoETwQ1Akg6AP6d07zyvTNGa882FqM+eec+9xjCiKfg6Hg8cAvV6Pua67HQ6HITxy9ho+XmDv5nK5iBemZVnb0WgkHqqqYlmWrVk3BFEcxw3RZDJhJt7MZrOQVgHZw4Y2wLoNrUUxi8UiQDKuUbd5pep6vX6CKvEALUGirbBJK6bT6Vmj7okIio1Pp9MH9RiIvqnHRMbBM8cqCKjMoBdrxaq4Px6P/u12Ey+Wy2UIjr5oWKZcFtTJPfFUWUmSNA2fz+cM2yNP/YHMtu2A1JVlif0b14p8VJqmaVMU16rFZDIuq6sHIayBLQ/seRQBmH4g79EqU9UVRSF+oeFrJKcI6IgQRp7nvi5DNHroCw5DRGC1WtHXoUIQG/v9/g6NZf8BuMBBBETWpwSrwPGjNQomZkqFuk9rU/2AHccJ6xi04c/mbre76/6VlemU10U4KG4i0se0q0BLRERfhIra+rnTJgaUzjjMlRSHVos0AK45FTxNk7sOy+fQqraALHw3KmZb8wmDweCdI7ybDJvckngtfgUYAOva4QlBGrdTAAAAAElFTkSuQmCC"

/***/ }),

/***/ 211:
/*!*************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/used.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTgxRTY2NjIwODc5MTFFQUE5RjJEMTYxMkU3NDc5ODAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTgxRTY2NjMwODc5MTFFQUE5RjJEMTYxMkU3NDc5ODAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODA1RTRDODA4NzkxMUVBQTlGMkQxNjEyRTc0Nzk4MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODA1RTRDOTA4NzkxMUVBQTlGMkQxNjEyRTc0Nzk4MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg2koEMAABDJSURBVHja7J3petRG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"

/***/ }),

/***/ 212:
/*!******************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/Beoverdue.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0NBMTgzNEIwODc5MTFFQUIzOEQ4Qjc5NjE1RTU5RjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0NBMTgzNEMwODc5MTFFQUIzOEQ4Qjc5NjE1RTU5RjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQzhDNUJBQzA4NzkxMUVBQjM4RDhCNzk2MTVFNTlGMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQzhDNUJBRDA4NzkxMUVBQjM4RDhCNzk2MTVFNTlGMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm6iiLsAABEISURBVHja7J1rexRF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"

/***/ }),

/***/ 235:
/*!****************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/nogoods.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAACzCAIAAAChA9+yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVDNjg3MUEwNDg3MTFFQUFGNjFCQ0EwQ0VCNDAwRTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVDNjg3MTkwNDg3MTFFQUFGNjFCQ0EwQ0VCNDAwRTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmRpZDpCNDNDNTVGOTg2MDRFQTExOTQ1QURCMERCMUFCQTMyMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNDNDNTVGOTg2MDRFQTExOTQ1QURCMERCMUFCQTMyMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi2Zy4oAABuZSURBVHja7F1pj+M4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"

/***/ }),

/***/ 244:
/*!**************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/icon5.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABGCAIAAAARjh7tAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU2Njk0MTMwNjI0MTFFQTkzRkFDNUM2MDZGRTFENEMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU2Njk0MTQwNjI0MTFFQTkzRkFDNUM2MDZGRTFENEMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RTY2OTQxMTA2MjQxMUVBOTNGQUM1QzYwNkZFMUQ0QyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RTY2OTQxMjA2MjQxMUVBOTNGQUM1QzYwNkZFMUQ0QyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pkhea7EAAAVqSURBVHja7JtpU+pMEIUBQRR35bqhgoX6/3+PFor7ghuIG6K+TzG3UvN2zDAJE+Ba9Ae1UskkZ7r79OmZMfn9/Z3QrNFoPD09tdvtxHBYLpebm5sbHx8P9VRSR3V2dvb4+JgYMstkMoVCYXp6Ogqq09PTer2eGFbb3d3NZrOWN6fUL1w0zJCwq6sr+5v/oiKXEsNtzWbz8/MzHKqvr68hR0Wm2HNYKvEb7V9ClUwmR776dZa2vI8iODs7m0qlhBZxZa1Wq1ar9RXVzMxMsViMe4InJiZQAv2LwHw+34ewiaD3ekJFePQnH+zrrANUNzc37+/vcUNCW7tCZZVXHx8fBwcHEMbY2JhztqAKMeZ7x/rNgUqJjerVCNUI1QjVCNUI1QjVQDqRhYUFg7ZAIry9vaGtoi2BZLPZXC6XTqczmQz9jnpRu91mNJTNy8sLg9vLGitUdFZbW1s2yOlZKpWKPTC6D6Q6T/GH+U4QgtYlqqWlpVBTbqOtQMKw9iuyuNFxBKI7p6amLEfsur7FUCsrK4AfcF5dX1/jhK7ACDzyigQw3LO2tmbv+eh9gErB4+Pjrsu3k5OT5sjGpQZHQQDFYjHIRczI6+srIzAp0IPKTB6BPCY6xttj6UR4a+TJ4+NKpdKPy//MZr1eJxXNoUvzD2nNz8935ZVwvopsfFC5XGbixfXn5+darRa2bSOA8/k80zRIVIDZ2dnxf0Qve2Ukwp+OOYjAaEbgCUitVuvk5MRMKl1pCQJjhM3NzQGggvFElvMpR0dHTlZdyEZ4ZXt727/+HqMOJK0FieMlV5CUoaSq1Wpf1W2hUBBX3ELyKOf8/LxPqBBEIvZ4NwETx7seHh4ajUY/UK2urooZ5d0GnuzxdTCqLqlt2YI2BHEtOhG1keFfncRLouBeXl4GVWcEBz9vb2+77oksLy/zDYiBi4sL0RYoVoScQqCiovuTJNE54kG939/fF7KAd4ucDuJx6qnSCuhdqAwZaXC+2sRgvhjw/v5e3MAVKpiS9ilLRxkKor+bIKnE+wzSUXcFFlQh9H2ZH/OTIPIOV1ihMldMEYHoIz38iA2RygKwjhlUfsUgZD73B8kgT6zY7omQ7kE1Xqheocp50NwakyQ6MEJRB+aHxP2G2VcOsMorigylBg+IKt7umJ8ARFJ1HV996OLiogeMibi7uyOX7CGpIAQViRpCMVnuxAhUlkc/BDBcRHLqGdsVkv6R7uuV6CztD7SIUIwAySMS96hESQ21kMan+8mdK5aQvNe5R9XjZqT/8QhHMN13IkK/hlJDP67VrK+vE9WID/tIce8rEXL263gCkk6enrCw5KpU3L4yLzAEQaIMHh4eQu46sCDlIZq6WFAJIWKzmikgeUoXTSyUB6XMTL9xoUJM6Bmv9gTMPYsOCf/oh1EF3SM7DB7jXep0TSwRqLsLOSIkvEG2AsDfswhgBhFMbxFj1yjUp6cYhHFd9xJtZVBd8gPzAOjhR1sUIyrR9iIgf9z70BsWHvEvPxiA+ReogerJmpSrHlvIFuEur0vVDUpQhAk9mCF5wNQjiD2dHlX7o0fy37Vb+i1XZ/M8FVcqlQQG+FqKgHSaCQ11golHACYkSLlc1r2X8npyf6T2Ys1mU7gL+vKzPGoo7KEsHhGQoHsRkP/7PxHCwLASFMH29vb0g4zMcaVScXvaEGdsbGyIi0mB+7ljTtYikU68UuzlMXK1Wu1l00iwKCrRfz0Z0+lgszkJCrEWMHhUquDSOEX7Ry+yCEVi2NEdGCoVjQADnv03oJXxT1BZHwpUyiAP6gqESbIFfQzsj3/mOmZz6mLwqDwDFQh/3O3Odsx+qCFC5dB+J6r/BBgA07tqxaNOQSMAAAAASUVORK5CYII="

/***/ }),

/***/ 26:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 27);


/***/ }),

/***/ 261:
/*!****************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/userImg.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjJENTc2OUMwNkU1MTFFQTkwNzI4NzlGODAzNTk0MjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjJENTc2OUQwNkU1MTFFQTkwNzI4NzlGODAzNTk0MjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMkQ1NzY5QTA2RTUxMUVBOTA3Mjg3OUY4MDM1OTQyMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMkQ1NzY5QjA2RTUxMUVBOTA3Mjg3OUY4MDM1OTQyMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqHdT8kAABKUSURBVHjarFlpjF1n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"

/***/ }),

/***/ 27:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 28);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 270:
/*!**************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/dizhi.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAqCAIAAADEexdwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NURFN0U3QjIwNTU1MTFFQUE2QjNFQjJFOEY4MzQ1N0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NURFN0U3QjMwNTU1MTFFQUE2QjNFQjJFOEY4MzQ1N0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1REU3RTdCMDA1NTUxMUVBQTZCM0VCMkU4RjgzNDU3RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1REU3RTdCMTA1NTUxMUVBQTZCM0VCMkU4RjgzNDU3RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp8zw9UAAAWcSURBVHjapFdZLF1dFHava2wbLTXVUCWKVtEK1YqpMbTxQlAJIdTQSjzwQCNKhAdtQ9TQSozx4EHF1EQqxBhCWzXVLIaQlqKmdET5P5acnp57L9ff9XCyzt5rf2fvtb81HN7u7q6UGPn27VtXV9eHDx9mZmY+ffr08+dPDMrIyGhpaZ0/f/7KlSvW1tanT5+WEi88kehra2vl5eX19fUbGxuHLFZQUHBxcfH29lZXV5cUvba2trCwEBunV4FAYGhoeO7cORUVFfowzjExMfHr1y/GIDg4GN84Gv3p06eNjY2kX7x48c6dO9evXydczuHevXuHww0MDNCIjY1NUlISj8cTix4XF9fT00NHjoiIcHNzkzpK2tvbc3Nzl5eXoeOIWVlZfD5fBHpycnJHRwcUAwMD7EJNTU1KMvn69SvW9vf3Qzc1NU1PT2emDr5TWVlJ0BcuXMjOzpYcGnLy5En489q1a9AHBwfz8/P/2vuXL1/8/PzwoqioWFpaiqdIFPh6Z2fnzJkzHOcyEhAQsLi4CCUvLw+UPUBPSUmB+/CSmppKW2AL6FFXV9fX17e0tARjoJubm7u6uoLvHEuExf3796FcunQpIyMDinRkZOSzZ8+gYU1gYCBnQXFxMU49Pj4O4v/eFzB1cnISbFldXQWd2MaILJB1enoa+7C1tcU+pAFKFxIfH3/27Fm2Nb5aXV1NupWVlZOT09WrV+Hlubk5OhO+euvWLfYSkLiqqmpv19LSiGTBmzdv8IJrNDIyYts1Nze/fv0aiqam5sOHD01MTJip2dnZtLS0sbGxt2/fvnz58u7du8wU4WAK0bC5ucnHMWlrbGj4NycnB8qJEydAITY0RFdXNzMzk3jFjmomrPCcn5/Hyfjb29vEcbZFb28vWAwlKCjo1KlTIkKcx8OFkd7W1sae0tfXJwUOPOA7x+PDw8N7scDn29vbi6M53IqTQYEf2OPKysoMgw/QZWVl2Rbfv3/HU05OTklJSWx25fEIiOMZJhMgzf3R2Ba0KSR00E4cOoUhxSp7fGtrixRUggN0Dsrly5dpfUtLizh0ZA46IufO4RCG/nwK648fP7ItLCwsyCclJSW0QY5ggy9evCDdzs6OPQW2MOzkE7GmpqY466Oiosg54AaFGzs3YJC++uDBA6Rr9ixRHIN6enoCnOvz588gCaiJKsMY3bx5E2GCYFlZWYmNjTXdF0Tg6Ojo+/fvycbZ2dnT05OzLWQkPI2NjVVVVQU3btyAc3/8+IGgRXJg24WEhFhaWiLhYTuD+8JMaWhoYFaYryMjI1RJKAUJQFu4HhfY2trKQacLgH9xgXAOEgCymI6ODu7c0dER5xC+DyayCEqAbI7chILX2dmJuwKNhNfY7osklaSpqYnCla5zj5G3b9/GE0kH25f6B+nu7iY6otb/qXxwn7y8PBT0MP+CXlZWRjGMJucPOt7d3d2puHCShuSCukHdB8oAw9GDWGVyNBjy/9ALCgpI8ff35/YEiFrQgIo68vJxoRcWFqilAEG0tbW56JCwsDBSUC6Oi45iQgp6rL/yJaMhxaPSQ8HewU7JoYeGhqiDQ+hQoyG600PEIrIxghSGHCAhOuoXZS70QpwqxOd0zOSf9fV1Ca8XLCRoHx8fDjQXHeLl5YUmAEpFRYVw4uQIcIuKiqDgrKGhocIGfOGhhIQEjiJOEhMTSXn06JFIAxHo6A98fX2hINuhERMHjeyGvEZxb2ZmJik65N69e9Q44E/h1atXwgYYr6mpgYJ/Gqozx0CnjpWKyfPnz9FzsacQccyZnjx5cojrxKIjevEB5gKQ/xjomJgYxu9EgeP98zHS0NCAlpH06OhodDiPHz9mwtLDw+Pwaz8CHYJelVpwtoSHh4O7R0bD0egQ+B0MoajB/x9+ARwcHCSJtf8EGACOR7GhgMmT0AAAAABJRU5ErkJggg=="

/***/ }),

/***/ 271:
/*!***************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/upload.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDU4RTlDRDgwN0IwMTFFQUIyM0U4QjkxOTZFMTFBQzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDU4RTlDRDkwN0IwMTFFQUIyM0U4QjkxOTZFMTFBQzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNThFOUNENjA3QjAxMUVBQjIzRThCOTE5NkUxMUFDNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNThFOUNENzA3QjAxMUVBQjIzRThCOTE5NkUxMUFDNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiYIJ4wAAAmgSURBVHja7F3tUxJf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"

/***/ }),

/***/ 28:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 35:
/*!**********************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/static/delivery/logo.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAACJCAYAAAAfSgeZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTg0NDYxMUIwMDQzMTFFQUEzRDJGM0RCQURFQzlCQjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTg0NDYxMUMwMDQzMTFFQUEzRDJGM0RCQURFQzlCQjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODQ0NjExOTAwNDMxMUVBQTNEMkYzREJBREVDOUJCNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ODQ0NjExQTAwNDMxMUVBQTNEMkYzREJBREVDOUJCNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkV2CogAAB4ySURBVHja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"

/***/ }),

/***/ 4:
/*!********************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-23720191024001","_inBundle":false,"_integrity":"sha512-vJEk493Vdb8KueNzR2otzDi23rfyRcQBo/t1R41MwNGPk+AUB94gh10+HVLo98DRcvMzkuVofz3KXTAfEx24iw==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-23720191024001.tgz","_shasum":"18272814446a9bc6053bc92666ec7064a1767588","_spec":"@dcloudio/uni-stat@next","_where":"/Users/fxy/Documents/DCloud/HbuilderX-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a725c04ef762e5df78a9a69d140c2666e0de05fc","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-23720191024001"};

/***/ }),

/***/ 7:
/*!*************************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/pages.json?{"type":"style"} ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "麦田圈" }, "pages/delivery/delivery": { "navigationBarTitleText": "麦吉专送" }, "pages/delivery/set": { "navigationBarTitleText": "接单设置" }, "pages/delivery/statistics": { "navigationBarTitleText": "送单统计" }, "pages/delivery/myprofit": { "navigationBarTitleText": "我的收益" }, "pages/delivery/billstatistics": { "navigationBarTitleText": "账单统计" }, "pages/product/product": { "navigationBarTitleText": "详情展示" }, "pages/set/set": { "navigationBarTitleText": "账号管理" }, "pages/person/person": { "navigationBarTitleText": "个人资料" }, "pages/mobile/mobile": { "navigationBarTitleText": "修改手机号" }, "pages/bindmobile/bindmobile": { "navigationBarTitleText": "绑定手机号" }, "pages/aboutus/aboutus": { "navigationBarTitleText": "关于我们" }, "pages/userinfo/userinfo": { "navigationBarTitleText": "修改资料" }, "pages/user/feedback": { "navigationBarTitleText": "意见反馈" }, "pages/user/collect": { "navigationBarTitleText": "商品收藏" }, "pages/user/footmark": { "navigationBarTitleText": "我的足迹" }, "pages/cart/cart": { "navigationBarTitleText": "购物车" }, "pages/public/login": { "navigationBarTitleText": "", "navigationStyle": "custom" }, "pages/user/user": { "navigationBarTitleText": "我的", "navigationStyle": "custom" }, "pages/detail/detail": { "navigationBarTitleText": "" }, "pages/order/order": { "navigationBarTitleText": "我的订单" }, "pages/user/wallet": { "navigationBarTitleText": "钱包" }, "pages/user/coupon": { "navigationBarTitleText": "我的优惠券" }, "pages/money/money": {}, "pages/order/createOrder": { "navigationBarTitleText": "创建订单" }, "pages/order/aftersale": { "navigationBarTitleText": "退款售后" }, "pages/order/cancelOrder": { "navigationBarTitleText": "取消订单" }, "pages/order/logistics": { "navigationBarTitleText": "物流信息" }, "pages/order/consult": { "navigationBarTitleText": "协商历史" }, "pages/order/refund": { "navigationBarTitleText": "申请退款" }, "pages/order/orderDetails": { "navigationBarTitleText": "订单详情" }, "pages/address/address": { "navigationBarTitleText": "我的收货地址" }, "pages/address/addressManage": { "navigationBarTitleText": "" }, "pages/money/pay": { "navigationBarTitleText": "支付" }, "pages/money/paySuccess": { "navigationBarTitleText": "支付成功" }, "pages/notice/notice": { "navigationBarTitleText": "通知" }, "pages/category/category": { "navigationBarTitleText": "分类" }, "pages/product/list": { "navigationBarTitleText": "商品列表" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#FFFFFF", "backgroundColor": "#f8f8f8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!************************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/pages.json?{"type":"stat"} ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ }),

/***/ 9:
/*!************************************************!*\
  !*** /Users/xuyi/dev/sh/m-demo/store/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 10));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    hasLogin: false,
    userInfo: {} },

  mutations: {
    login: function login(state, provider) {

      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorage({ //缓存用户登陆状态
        key: 'userInfo',
        data: provider });

      console.log(state.userInfo);
    },
    logout: function logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      uni.removeStorage({
        key: 'userInfo' });

    } },

  actions: {} });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map