(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d210285"],{b760:function(t,n,l){"use strict";l.r(n);var s=function(){var t=this,n=t.$createElement,l=t._self._c||n;return l("div",[l("vs-button",{staticClass:"mr-1",attrs:{size:"small"},on:{click:function(n){return t.turnOn("all")}}},[t._v("Turn ON All")]),l("vs-button",{staticClass:"mr-1",attrs:{size:"small"},on:{click:function(n){return t.turnOff("all")}}},[t._v("Turn OFF All")]),t._l(t.$store.state.modules.sections,function(n,s){return l("div",[l("vs-divider",[t._v("\n            "+t._s(n.title)+"\n        ")]),l("vs-row",t._l(n.modules,function(n,s){return l("vs-col",{attrs:{type:"flex","vs-justify":"center","vs-align":"center","vs-sm":"12","vs-lg":"3"}},[l("vs-card",{attrs:{actionable:""},nativeOn:{click:function(l){return t.selectModule(n.id)}}},[l("div",{staticClass:"card-content-section"},[l("h5",{staticClass:"mb-1"},[t._v(t._s(n.alias))]),t._v("\n                        ID: "+t._s(n.did)+"\n                    ")])])],1)}),1)],1)})],2)},e=[],o={methods:{selectModule:function(t){console.log(t)},turnOn:function(t){"all"===t&&this.$http.get("/turn/on/all").then(function(){console.log("turn on all")})},turnOff:function(t){"all"===t&&this.$http.get("/turn/off/all").then(function(){console.log("turn off all")})}}},c=o,i=l("2877"),r=Object(i["a"])(c,s,e,!1,null,"c7b9212a",null);n["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d210285.378c45ce.js.map