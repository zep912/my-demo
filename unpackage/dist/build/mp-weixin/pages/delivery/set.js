(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/delivery/set"],{"0552":function(e,t,n){"use strict";n.r(t);var a=n("6505"),r=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);t["default"]=r.a},"2ec2":function(e,t,n){"use strict";(function(e){n("2458"),n("921b");a(n("66fd"));var t=a(n("e503"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},3629:function(e,t,n){"use strict";var a=n("e54b"),r=n.n(a);r.a},6505:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("38f8")),r=n("2f62");function i(e){return e&&e.__esModule?e:{default:e}}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),a.forEach(function(t){u(e,t,n[t])})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s={data:function(){return{img:"../../static/my/missing-face.png",checked:!0,songdan:"../../static/delivery/songdan2.png",jiedan:"../../static/delivery/jiedanset.png",daliveryData:2,rorderStatus:"",form:{userName:"",phone:""}}},onLoad:function(){this.getData()},methods:o({},(0,r.mapMutations)(["logout"]),{navTo:function(t){e.navigateTo({url:"../delivery/".concat(t)})},getData:function(){var t=e.getStorageSync("userInfo"),n=e.getStorageSync("deliveryPhone");this.form.userName=t.nickName,this.form.phone=n},onChange:function(e){var t=this;console.log(e),e.detail?(this.rorderStatus=1,a.default.post("/sso/user/isOpenSend",{rorderStatus:1}).then(function(e){t.$api.msg("开启成功")})):a.default.post("/sso/user/isOpenSend",{rorderStatus:0}).then(function(e){t.$api.msg("关闭成功")}),this.checked=!this.checked},sd:function(t){1==t?(this.songdan="../../static/delivery/songdan.png",this.jiedan="../../static/delivery/jiedanset1.png",this.daliveryData=1,e.navigateTo({url:"deliverylist"})):2==t&&(this.songdan="../../static/delivery/songdan2.png",this.jiedan="../../static/delivery/jiedanset.png",this.daliveryData=2)}})};t.default=s}).call(this,n("543d")["default"])},e503:function(e,t,n){"use strict";n.r(t);var a=n("fe07"),r=n("0552");for(var i in r)"default"!==i&&function(e){n.d(t,e,function(){return r[e]})}(i);n("3629");var o=n("2877"),u=Object(o["a"])(r["default"],a["a"],a["b"],!1,null,null,null);t["default"]=u.exports},e54b:function(e,t,n){},fe07:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})}},[["2ec2","common/runtime","common/vendor"]]]);