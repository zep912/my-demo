(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/delivery/deliverylist"],{"204e":function(t,e,n){},"2efc":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=(t._self._c,n("6a16"));t.$mp.data=Object.assign({},{$root:{m0:a}})},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"363b":function(t,e,n){"use strict";n.r(e);var a=n("2efc"),o=n("cf39");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("9754");var r=n("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=s.exports},"3e28":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o(n("8d7c"));var a=o(n("38f8"));function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var r=function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"4eab"))},s=function(){return n.e("components/empty").then(n.bind(null,"6e36"))},u={components:{uniLoadMore:r,empty:s},data:function(){var t;return{iconName:"arrow-down",tabLook:"查看",tabInfoShow:!1,active:0,time:108e6,songdan:"../../static/delivery/songdan.png",jiedan:"../../static/delivery/jiedanset1.png",daliveryData:1,tabCurrentIndex:0,navList:[{state:0,text:"执行订单",loadingType:"more",orderList:[]},{state:1,text:"取单中",loadingType:"more",orderList:[]},{state:4,text:"配送中",loadingType:"more",orderList:[]},{state:2,text:"已送达",loadingType:"more",orderList:[]}],deliverylist:[(t={state:1,time:"15:12",countDown:108e6,shopName:"麦田圈官网旗舰店"},i(t,"state",5),i(t,"steps",[{text:"步骤一",desc:"描述"},{text:"步骤二",desc:"描述"}]),i(t,"info",{a:20,b:"麦田圈预单",c:"预"}),i(t,"msg",{content:"海苔沙拉炒饭",price:"15.00",num:1,oddNum:"6546545646464546",sorce:"校内订单",beizhu:"好的",biaoshi:25,time:"2019-11-14 12:12:00"}),t)],sendStatus:0,page:{current:1,pageSize:10}}},onLoad:function(t){this.tabCurrentIndex=0,this.loadData("tabChange",0),t.state},methods:{look:function(){this.tabInfoShow?(this.tabInfoShow=!1,this.tabLook="查看",this.iconName="arrow-down"):(this.tabInfoShow=!0,this.tabLook="收起",this.iconName="arrow-up")},sd:function(e){2==e&&(this.songdan="../../static/delivery/songdan2.png",this.jiedan="../../static/delivery/jiedanset1.png",this.daliveryData=2,t.navigateTo({url:"set"}))},loadData:function(t,e){var n=this.tabCurrentIndex,o=this.navList[n];o.state;if(("tabChange"!==t||!0!==o.loaded)&&"loading"!==o.loadingType){var i={pageNum:this.page.current,pageSize:this.page.pageSize,sendStatus:e};a.default.post("/sendInformation/list",i).then(function(t){console.log(t)}),this.$set(o,"loaded",!0)}},changeTab:function(t){this.tabCurrentIndex=t.target.current,this.loadData("tabChange")},tabClick:function(t){this.tabCurrentIndex=t},orderStateExp:function(t){var e="",n="#fa436a";switch(+t){case 1:e="待支付";break;case 4:e="待发货";break;case 2:e="待收货";break;case 3:e="待评价";break;case 5:e="";break;case 6:e="交易成功";break;case 7:e="已完成";break;case 9:e="订单已关闭",n="#909399";break}return{stateTip:e,stateTipColor:n}}}};e.default=u}).call(this,n("543d")["default"])},9754:function(t,e,n){"use strict";var a=n("204e"),o=n.n(a);o.a},bc99:function(t,e,n){"use strict";(function(t){n("2458"),n("921b");a(n("66fd"));var e=a(n("363b"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},cf39:function(t,e,n){"use strict";n.r(e);var a=n("3e28"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a}},[["bc99","common/runtime","common/vendor"]]]);