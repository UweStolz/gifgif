(function(e){function t(t){for(var r,a,c=t[0],s=t[1],u=t[2],l=0,p=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&p.push(i[a][0]),i[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},i={app:0},o=[];function c(e){return s.p+"js/"+({"about~configuration":"about~configuration",about:"about",configuration:"configuration",favourites:"favourites","search~translate":"search~translate",search:"search",translate:"translate"}[e]||e)+"."+{"about~configuration":"39274d40",about:"51cfaf69",configuration:"66f62efd",favourites:"aee1fc8d","search~translate":"c1756b0a",search:"7e65c0a4",translate:"2b8714ff"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={configuration:1,favourites:1,"search~translate":1,search:1,translate:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({"about~configuration":"about~configuration",about:"about",configuration:"configuration",favourites:"favourites","search~translate":"search~translate",search:"search",translate:"translate"}[e]||e)+"."+{"about~configuration":"31d6cfe0",about:"31d6cfe0",configuration:"032029b5",favourites:"49cb3de7","search~translate":"7d8b62a4",search:"e7d9dd1a",translate:"817cd880"}[e]+".css",i=s.p+r,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var u=o[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===i))return t()}var p=document.getElementsByTagName("style");for(c=0;c<p.length;c++){u=p[c],l=u.getAttribute("data-href");if(l===r||l===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),n(o)},f.href=i;var d=document.getElementsByTagName("head")[0];d.appendChild(f)})).then((function(){a[e]=0})));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e);var p=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",p.name="ChunkLoadError",p.type=r,p.request=a,n[1](p)}i[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/gifgif/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var p=0;p<u.length;p++)t(u[p]);var f=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"034f":function(e,t,n){"use strict";var r=n("8a23"),a=n.n(r);a.a},"080e":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card-actions",{staticStyle:{"overflow-x":"hidden"}},[n("v-row",{attrs:{justify:"center"}},[n("v-item-group",[e.showRating?n("v-rating",{attrs:{id:"s-ca-rating",length:"5","empty-icon":e.icons.mdiHeartOutline,"full-icon":e.icons.mdiHeart,"half-icon":e.icons.mdiHeartHalfFull,hover:"","x-large":"",color:"red","background-color":"red"},on:{input:e.updateGifRating},model:{value:e.syncRrating,callback:function(t){e.syncRrating=t},expression:"syncRrating"}}):e._e(),n("v-btn",{attrs:{id:"s-ca-download-btn",large:"",icon:""},on:{click:e.saveImage}},[n("v-icon",{attrs:{id:"downloadIcon",large:e.$vuetify.breakpoint.xlOnly}},[e._v(" "+e._s(e.icons.mdiDownload)+" ")])],1),n("v-btn",{attrs:{id:"s-ca-remove-btn",disabled:0===e.syncRrating,large:"",icon:""},on:{click:e.removeGif}},[n("v-icon",{attrs:{id:"trashIcon",large:e.$vuetify.breakpoint.xlOnly}},[e._v(" "+e._s(e.icons.mdiTrashCan)+" ")])],1),e.isFrontpage?n("v-btn",{attrs:{large:"",icon:""},on:{click:e.syncFunction}},[n("v-icon",{attrs:{large:e.$vuetify.breakpoint.xlOnly}},[e._v(" "+e._s(e.icons.mdiSync)+" ")])],1):e._e()],1)],1)],1)},a=[],i=(n("a9e3"),n("2ca0"),n("96cf"),n("1da1")),o=n("d4ec"),c=n("bee2"),s=n("262e"),u=n("2caf"),l=n("9ab4"),p=n("60a3"),f=n("94ed"),d=n("b496"),g=n("21a6"),h=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(o["a"])(this,n),e=t.apply(this,arguments),e.icons={mdiClose:f["a"],mdiDownload:f["c"],mdiHeartOutline:f["k"],mdiHeart:f["i"],mdiHeartHalfFull:f["j"],mdiTrashCan:f["r"],mdiSync:f["p"]},e.propImageId="",e.propImageData=e.syncImageData,e.propPreviewImageData=e.syncPreviewImageData,e}return Object(c["a"])(n,[{key:"deleteGifData",value:function(){return this.propImageId}},{key:"setId",value:function(){this.syncImageId&&(this.propImageId=this.syncImageId.startsWith("ggid")?this.syncImageId:"ggid-".concat(this.syncImageId))}},{key:"setImageData",value:function(){this.propImageData=this.syncImageData}},{key:"setPreviewImageData",value:function(){this.propPreviewImageData=this.syncPreviewImageData}},{key:"saveImage",value:function(){Object(g["saveAs"])(this.propImageData,this.propImageId)}},{key:"removeGif",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$store.dispatch("removeGifData",this.propImageId);case 2:this.syncRrating=0,this.deleteGifData();case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateGifRating",value:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.$store.state.fullImageMode){e.next=15;break}return e.t0=this.$store,e.t1=t,e.t2=this.propImageId,e.next=6,Object(d["a"])(this.propImageData);case 6:return e.t3=e.sent,e.next=9,Object(d["a"])(this.propPreviewImageData);case 9:return e.t4=e.sent,e.t5={rating:e.t1,key:e.t2,image:e.t3,preview:e.t4},e.next=13,e.t0.dispatch.call(e.t0,"setGifData",e.t5);case 13:e.next=17;break;case 15:return e.next=17,this.$store.dispatch("setGifData",{rating:t,key:this.propImageId,image:this.propImageData,preview:this.propPreviewImageData});case 17:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}]),n}(p["e"]);Object(l["a"])([Object(p["d"])("previewImageData")],h.prototype,"syncPreviewImageData",void 0),Object(l["a"])([Object(p["d"])("imageData",{required:!0})],h.prototype,"syncImageData",void 0),Object(l["a"])([Object(p["d"])("imageId",{required:!0})],h.prototype,"syncImageId",void 0),Object(l["a"])([Object(p["d"])("rating",{default:-1,type:Number})],h.prototype,"syncRrating",void 0),Object(l["a"])([Object(p["c"])({default:!1,type:Boolean})],h.prototype,"showRating",void 0),Object(l["a"])([Object(p["c"])({default:!1,type:Boolean})],h.prototype,"isFrontpage",void 0),Object(l["a"])([Object(p["c"])({type:Function})],h.prototype,"syncFunction",void 0),Object(l["a"])([Object(p["b"])("delete")],h.prototype,"deleteGifData",null),Object(l["a"])([Object(p["f"])("syncImageId",{immediate:!0})],h.prototype,"setId",null),Object(l["a"])([Object(p["f"])("syncImageData",{immediate:!0})],h.prototype,"setImageData",null),Object(l["a"])([Object(p["f"])("syncPreviewImageData",{immediate:!0})],h.prototype,"setPreviewImageData",null),h=Object(l["a"])([p["a"]],h);var v=h,m=v,b=(n("8380"),n("2877")),w=n("6544"),y=n.n(w),O=n("8336"),j=n("99d9"),k=n("132d"),x=n("604c"),I=n("1d4d"),R=n("0fd9"),_=Object(b["a"])(m,r,a,!1,null,"53d9e828",null);t["a"]=_.exports;y()(_,{VBtn:O["a"],VCardActions:j["a"],VIcon:k["a"],VItemGroup:x["b"],VRating:I["a"],VRow:R["a"]})},"3c01":function(e,t,n){"use strict";var r=n("bd35"),a=n.n(r);a.a},"3ea3":function(e,t,n){"use strict";var r=function(e,t){var n=t._c;return n("v-progress-linear",{attrs:{indeterminate:"",color:"red"}})},a=[],i=n("2b0e"),o=i["a"].extend({name:"LinearProgress",functional:!0}),c=o,s=n("2877"),u=n("6544"),l=n.n(u),p=n("8e36"),f=Object(s["a"])(c,r,a,!0,null,null,null);t["a"]=f.exports;l()(f,{VProgressLinear:p["a"]})},"54cb":function(e,t,n){"use strict";var r=n("b326"),a=n.n(r);a.a},"7e82":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-snackbar",{attrs:{value:e.syncVisibility,timeout:e.timeout,color:e.color,app:"",top:""}},[e.icon?n("v-icon",{attrs:{color:"white"}},[e._v(" "+e._s(e.icon)+" ")]):e._e(),e._v(" "+e._s(e.message)+" "),e.showCloseButton?n("v-btn",{attrs:{dark:"",text:"",icon:""},on:{click:function(t){e.syncVisibility=!1}}},[n("v-icon",[e._v(" "+e._s(e.icons.mdiClose)+" "),n("v-icon")],1)],1):e._e()],1)},a=[],i=n("d4ec"),o=n("262e"),c=n("2caf"),s=n("9ab4"),u=n("60a3"),l=n("94ed"),p=function(e){Object(o["a"])(n,e);var t=Object(c["a"])(n);function n(){var e;return Object(i["a"])(this,n),e=t.apply(this,arguments),e.timeout=3e3,e.icons={mdiClose:l["a"]},e}return n}(u["e"]);Object(s["a"])([Object(u["d"])("visibility",{default:!1})],p.prototype,"syncVisibility",void 0),Object(s["a"])([Object(u["c"])({default:"info"})],p.prototype,"color",void 0),Object(s["a"])([Object(u["c"])({default:!1})],p.prototype,"showCloseButton",void 0),Object(s["a"])([Object(u["c"])({default:"Whoops something went wrong"})],p.prototype,"message",void 0),Object(s["a"])([Object(u["c"])({default:3e3})],p.prototype,"timeout",void 0),Object(s["a"])([Object(u["c"])({default:null})],p.prototype,"icon",void 0),p=Object(s["a"])([u["a"]],p);var f=p,d=f,g=n("2877"),h=n("6544"),v=n.n(h),m=n("8336"),b=n("132d"),w=n("2db4"),y=Object(g["a"])(d,r,a,!1,null,null,null);t["a"]=y.exports;v()(y,{VBtn:m["a"],VIcon:b["a"],VSnackbar:w["a"]})},"81c6":function(e,t,n){},8380:function(e,t,n){"use strict";var r=n("81c6"),a=n.n(r);a.a},"8a23":function(e,t,n){},b326:function(e,t,n){},b496:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return l})),n.d(t,"b",(function(){return f})),n.d(t,"e",(function(){return g})),n.d(t,"f",(function(){return v}));n("99af"),n("d3b7"),n("96cf");var r=n("1da1"),a="IT2EfZQf0HqGmKIlg0Ts9p7akXdKSBl7",i="O4K19202U3YT";function o(e){return c.apply(this,arguments)}function c(){return c=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.blob();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)}))),c.apply(this,arguments)}function s(e,t){return u.apply(this,arguments)}function u(){return u=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){var r,i,o,c,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=n?"https://api.giphy.com/v1/gifs/search?q=".concat(t,"&api_key=").concat(a,"&rating=").concat(n):"https://api.giphy.com/v1/gifs/search?q=".concat(t,"&api_key=").concat(a),e.next=3,fetch(r);case 3:return i=e.sent,e.next=6,i.json();case 6:return o=e.sent,c=o.data,s=c,e.abrupt("return",s);case 10:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}function l(e,t){return p.apply(this,arguments)}function p(){return p=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){var r,i,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.giphy.com/v1/gifs/translate?api_key=".concat(a,"&s=").concat(t,"&weirdness=").concat(n));case 2:return r=e.sent,e.next=5,r.json();case 5:return i=e.sent,o=i.data,c=o,e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}function f(){return d.apply(this,arguments)}function d(){return d=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.giphy.com/v1/gifs/random?api_key=".concat(a));case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,r=n.data,i=r,e.abrupt("return",i);case 9:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}function g(){return h.apply(this,arguments)}function h(){return h=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.giphy.com/v1/gifs/trending?api_key=".concat(a));case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,r=n.data,i=r,e.abrupt("return",i);case 9:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}function v(){return m.apply(this,arguments)}function m(){return m=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.tenor.com/v1/trending_terms?key=".concat(i,"&locale=en_US&limit=50"));case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,r=n.results,a=r,e.abrupt("return",a);case 9:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}},bd35:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("96cf");var r=n("1da1"),a=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",["/about"!==this.$route.path?n("Toolbar"):e._e(),"/about"!==this.$route.path?n("Drawer"):e._e(),"/about"!==this.$route.path?n("Footer"):e._e(),n("v-main",[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view")],1)],1)],1)},o=[],c=n("d4ec"),s=n("262e"),u=n("2caf"),l=n("9ab4"),p=n("60a3"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app-bar",{attrs:{app:"",color:"red darken-3",flat:"","clipped-left":"",absolute:e.$vuetify.breakpoint.xsOnly,dark:""}},[e.$vuetify.breakpoint.xsOnly?n("v-app-bar-nav-icon",{attrs:{id:"t-mob-nav-icon"},on:{click:e.toggleDrawer}}):e._e(),n("v-btn",{attrs:{to:"/"}},[n("div",{staticClass:"d-flex align-center"},[n("h1",[e._v("GIFGIF")])])]),n("v-divider"),n("v-tooltip",{attrs:{bottom:"","nudge-bottom":"5"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-btn",e._g({attrs:{id:"random"===e.$store.state.gifMode?"tb-active-button":"tb-inactive-button"},on:{click:function(t){return e.setGifMode("random")}}},r),[n("v-icon",{attrs:{id:"random"===e.$store.state.gifMode?"tb-active-icon":"tb-inactive-icon"}},[e._v(" "+e._s(e.icons.mdiShuffle)+" ")])],1)]}}])},[n("span",[e._v("Random")])]),n("v-tooltip",{attrs:{bottom:"","nudge-bottom":"5"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-btn",e._g({attrs:{id:"trending"===e.$store.state.gifMode?"tb-active-button":"tb-inactive-button"},on:{click:function(t){return e.setGifMode("trending")}}},r),[n("v-icon",{attrs:{id:"trending"===e.$store.state.gifMode?"tb-active-icon":"tb-inactive-icon"}},[e._v(" "+e._s(e.icons.mdiTrendingUp)+" ")])],1)]}}])},[n("span",[e._v("Trending")])]),n("v-btn",{staticStyle:{"margin-left":"10px"},attrs:{icon:"",to:"/configuration"}},[n("v-icon",[e._v(e._s(e.icons.mdiCogs))])],1)],1)},d=[],g=n("bee2"),h=n("94ed"),v=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(c["a"])(this,n),e=t.apply(this,arguments),e.icons={mdiShuffle:h["o"],mdiTrendingUp:h["s"],mdiCogs:h["b"]},e}return Object(g["a"])(n,[{key:"setGifMode",value:function(e){this.$store.commit("setGifMode",e)}},{key:"toggleDrawer",value:function(){this.$store.commit("setShowMobileDrawer",!this.$store.state.showMobileDrawer)}}]),n}(p["e"]);v=Object(l["a"])([p["a"]],v);var m=v,b=m,w=(n("54cb"),n("2877")),y=n("6544"),O=n.n(y),j=n("40dc"),k=n("5bc1"),x=n("8336"),I=n("ce7e"),R=n("132d"),_=n("3a2f"),D=Object(w["a"])(b,f,d,!1,null,"81af19e6",null),C=D.exports;O()(D,{VAppBar:j["a"],VAppBarNavIcon:k["a"],VBtn:x["a"],VDivider:I["a"],VIcon:R["a"],VTooltip:_["a"]});var G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-navigation-drawer",{attrs:{color:"red darken-3","mobile-breapoint":"600px","mini-variant-width":"9vh","mini-variant":"",permanent:!e.$vuetify.breakpoint.xsOnly,clipped:"",app:""},model:{value:e.$store.state.showMobileDrawer,callback:function(t){e.$set(e.$store.state,"showMobileDrawer",t)},expression:"$store.state.showMobileDrawer"}},[n("v-list",[n("v-list-item-group",e._l(e.items,(function(t,r){return n("v-list-item",{key:r,attrs:{link:"",to:t.link}},[n("v-list-item-icon",["/favourites"===t.link?n("v-badge",{attrs:{value:e.gifCount>0,content:e.gifCount,color:"grey"}},[n("v-tooltip",{attrs:{"open-on-hover":!e.$vuetify.breakpoint.xsOnly,"nudge-right":"16","open-delay":"500",right:""},scopedSlots:e._u([{key:"activator",fn:function(r){var a=r.on;return[n("v-icon",e._g({attrs:{color:"white",large:""},domProps:{textContent:e._s(t.icon)}},a))]}}],null,!0)},[n("span",[e._v(e._s(t.tooltip))])])],1):n("v-tooltip",{attrs:{"open-on-hover":!e.$vuetify.breakpoint.xsOnly,"open-delay":"500","nudge-right":"16",right:""},scopedSlots:e._u([{key:"activator",fn:function(r){var a=r.on;return[n("v-icon",e._g({attrs:{color:"white",large:""},domProps:{textContent:e._s(t.icon)}},a))]}}],null,!0)},[n("span",[e._v(e._s(t.tooltip))])])],1),n("v-list-item-content")],1)})),1)],1)],1)},M=[],$=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(c["a"])(this,n),e=t.apply(this,arguments),e.items=[{icon:h["i"],link:"/favourites",tooltip:"Favourites"},{icon:h["q"],link:"/search",tooltip:"Tag search"},{icon:h["m"],link:"/translate",tooltip:"Translate"}],e.gifCount=0,e}return Object(g["a"])(n,[{key:"mounted",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.gifCount=this.$store.state.gifCount,this.$store.watch((function(){return t.$store.state.gifCount}),(function(e){t.gifCount=e}));case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),n}(p["e"]);$=Object(l["a"])([p["a"]],$);var V=$,S=V,L=(n("3c01"),n("4ca6")),P=n("8860"),A=n("da13"),F=n("5d23"),T=n("1baa"),E=n("34c3"),B=n("f774"),N=Object(w["a"])(S,G,M,!1,null,null,null),H=N.exports;O()(N,{VBadge:L["a"],VIcon:R["a"],VList:P["a"],VListItem:A["a"],VListItemContent:F["a"],VListItemGroup:T["a"],VListItemIcon:E["a"],VNavigationDrawer:B["a"],VTooltip:_["a"]});var q=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-footer",{attrs:{color:"red darken-3",app:"",absolute:e.$vuetify.breakpoint.xsOnly}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[n("div",{staticStyle:{color:"white"}},[e._v(" "+e._s((new Date).getFullYear())+" - "),n("v-btn",{attrs:{text:"",tile:"",color:"white",to:"/about"}},[e._v(" About ")]),e._v(" - "),n("strong",[e._v("GIFGIF")])],1)])],1)},U=[],K=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return n}(p["e"]);K=Object(l["a"])([p["a"]],K);var z=K,J=z,W=n("62ad"),Y=n("553a"),Q=Object(w["a"])(J,q,U,!1,null,null,null),X=Q.exports;O()(Q,{VBtn:x["a"],VCol:W["a"],VFooter:Y["a"]});var Z=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return n}(p["e"]);Z=Object(l["a"])([Object(p["a"])({components:{Toolbar:C,Drawer:H,Footer:X}})],Z);var ee=Z,te=ee,ne=(n("034f"),n("7496")),re=n("f6c4"),ae=Object(w["a"])(te,i,o,!1,null,null,null),ie=ae.exports;O()(ae,{VApp:ne["a"],VMain:re["a"]});var oe=n("9483");Object(oe["a"])("".concat("/gifgif/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var ce=n("8c4f"),se=(n("d3b7"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Frontpage")}),ue=[],le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-row",{attrs:{align:"start",justify:"center","no-gutters":""}},[n("v-card",{attrs:{flat:"",tile:"",height:"100%",width:"100%"}},[n("v-col",{attrs:{cols:"auto"}},[n("v-carousel",{attrs:{"hide-delimiters":"",height:e.$vuetify.breakpoint.xsOnly?"55vh":"30vmax","show-arrows":!e.$vuetify.breakpoint.xsOnly&&e.gifsList.length>1,"show-arrows-on-hover":!e.$vuetify.breakpoint.xsOnly&&e.gifsList.length>1},on:{change:e.updateCarouselModel},model:{value:e.carouselModel,callback:function(t){e.carouselModel=t},expression:"carouselModel"}},e._l(e.gifsList,(function(t,r){return n("v-carousel-item",{key:r},[n("v-img",{attrs:{src:t.url,"lazy-src":t.url,contain:"",height:"100%",width:"100%"},scopedSlots:e._u([{key:"placeholder",fn:function(){return[n("linear-progress")]},proxy:!0}],null,!0)})],1)})),1)],1)],1)],1),n("v-row",{attrs:{align:"start",justify:"center","no-gutters":""}},[n("v-col",{attrs:{cols:"auto"}},[n("card-actions",{attrs:{rating:e.rating,"show-rating":!0,"is-frontpage":!0,"sync-function":e.getGifList,"image-id":e.currentId,"image-data":e.imageData,"preview-image-data":e.previewData},on:{"update:rating":function(t){e.rating=t},"update:imageId":function(t){e.currentId=t},"update:image-id":function(t){e.currentId=t},"update:imageData":function(t){e.imageData=t},"update:image-data":function(t){e.imageData=t},"update:previewImageData":function(t){e.previewData=t},"update:preview-image-data":function(t){e.previewData=t}}})],1)],1)],1)},pe=[],fe=(n("4160"),n("159b"),n("080e")),de=n("3ea3"),ge=n("7e82"),he=n("b496"),ve=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(c["a"])(this,n),e=t.apply(this,arguments),e.imageKey=0,e.rating=0,e.imageData="",e.previewData="",e.gifsList=[],e.carouselModel=0,e.currentId="",e}return Object(g["a"])(n,[{key:"getGifList",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=!1,"trending"!==this.$store.state.gifMode){e.next=8;break}return e.next=4,Object(he["e"])();case 4:n=e.sent,n&&n.length>0?this.buildGifList(n):t=!0,e.next=12;break;case 8:return e.next=10,Object(he["b"])();case 10:r=e.sent,r.id?(a=[{id:r.id,url:r.images.original.webp,previewUrl:r.images.fixed_width.webp}],this.gifsList=a):t=!0;case 12:if(t){e.next=15;break}return e.next=15,this.updateCarouselModel();case 15:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"mounted",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.$store.watch((function(){return t.$store.state.gifMode}),Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getGifList();case 2:case"end":return e.stop()}}),e)})))),e.next=3,this.getGifList();case 3:window.addEventListener("keydown",(function(e){37===e.keyCode&&t.updateCarouselModel(t.carouselModel-1),39===e.keyCode&&t.updateCarouselModel(t.carouselModel+1)}));case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateCarouselModel",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:0,t>this.gifsList.length-1?this.carouselModel=0:this.carouselModel=-1===t?this.gifsList.length-1:t,e.next=4,this.getRating();case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"buildGifList",value:function(e){var t=[];e.forEach((function(e){var n={id:e.id,url:e.images.original.webp.length?e.images.original.webp:e.images.original.url,previewUrl:e.images.fixed_width.webp};t.push(n)})),this.gifsList=t}},{key:"setGifData",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.currentId=this.gifsList[this.carouselModel].id,this.imageData=this.gifsList[this.carouselModel].url,this.previewData=this.gifsList[this.carouselModel].previewUrl;case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"getRating",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.setGifData();case 2:return e.next=4,this.$store.dispatch("getGifData","ggid-".concat(this.currentId));case 4:t=e.sent,this.rating=(null===t||void 0===t?void 0:t.rating)?this.rating=t.rating:this.rating=0;case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),n}(p["e"]);ve=Object(l["a"])([Object(p["a"])({components:{CardActions:fe["a"],LinearProgress:de["a"],Snackbar:ge["a"]}})],ve);var me=ve,be=me,we=n("b0af"),ye=n("5e66"),Oe=n("3e35"),je=n("a523"),ke=n("adda"),xe=n("0fd9"),Ie=Object(w["a"])(be,le,pe,!1,null,null,null),Re=Ie.exports;O()(Ie,{VCard:we["a"],VCarousel:ye["a"],VCarouselItem:Oe["a"],VCol:W["a"],VContainer:je["a"],VImg:ke["a"],VRow:xe["a"]});var _e=function(e){Object(s["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return n}(p["e"]);_e=Object(l["a"])([Object(p["a"])({components:{Frontpage:Re}})],_e);var De=_e,Ce=De,Ge=Object(w["a"])(Ce,se,ue,!1,null,null,null),Me=Ge.exports,$e=[{path:"/",name:"home",component:Me},{path:"/favourites",name:"favourites",component:function(){return n.e("favourites").then(n.bind(null,"0e0d"))}},{path:"/search",name:"search",component:function(){return Promise.all([n.e("search~translate"),n.e("search")]).then(n.bind(null,"2d3b"))}},{path:"/configuration",name:"configuration",component:function(){return Promise.all([n.e("about~configuration"),n.e("configuration")]).then(n.bind(null,"829a"))}},{path:"/about",name:"about",component:function(){return Promise.all([n.e("about~configuration"),n.e("about")]).then(n.bind(null,"f820"))}},{path:"/translate",name:"translate",component:function(){return Promise.all([n.e("search~translate"),n.e("translate")]).then(n.bind(null,"1c60"))}}],Ve=$e;a["a"].use(ce["a"]);var Se=new ce["a"]({routes:Ve}),Le=Se,Pe=n("f309"),Ae=n("8dd9"),Fe=n("8e36");a["a"].use(Pe["a"],{components:{VFooter:Y["a"],VCol:W["a"],VContainer:je["a"],VSheet:Ae["a"],VProgressLinear:Fe["a"]}});var Te,Ee,Be=new Pe["a"]({icons:{iconfont:"mdiSvg"}}),Ne=(n("ddb0"),n("2f62")),He=n("3f4f");function qe(){return Ue.apply(this,arguments)}function Ue(){return Ue=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(He["a"])("gifgif",1,{upgrade:function(e){e.createObjectStore("gifdata",{autoIncrement:!0}),e.createObjectStore("configs",{autoIncrement:!0})}});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),Ue.apply(this,arguments)}function Ke(e){return ze.apply(this,arguments)}function ze(){return ze=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Te=e.sent,e.abrupt("return",Te.get("gifdata",t));case 4:case"end":return e.stop()}}),e)}))),ze.apply(this,arguments)}function Je(e,t,n,r){return We.apply(this,arguments)}function We(){return We=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r,a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Te=e.sent,e.abrupt("return",Te.put("gifdata",{rating:t,preview:n,image:r},a));case 4:case"end":return e.stop()}}),e)}))),We.apply(this,arguments)}function Ye(e){return Qe.apply(this,arguments)}function Qe(){return Qe=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Te=e.sent,e.abrupt("return",Te.delete("gifdata",t));case 4:case"end":return e.stop()}}),e)}))),Qe.apply(this,arguments)}function Xe(){return Ze.apply(this,arguments)}function Ze(){return Ze=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Te=e.sent,e.abrupt("return",Te.clear("gifdata"));case 4:case"end":return e.stop()}}),e)}))),Ze.apply(this,arguments)}function et(){return tt.apply(this,arguments)}function tt(){return tt=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Te=e.sent,e.abrupt("return",Te.count("gifdata"));case 4:case"end":return e.stop()}}),e)}))),tt.apply(this,arguments)}function nt(){return rt.apply(this,arguments)}function rt(){return rt=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Te=e.sent,e.next=5,Te.getAll("gifdata");case 5:return t=e.sent,e.next=8,Te.getAllKeys("gifdata");case 8:return n=e.sent,r={values:t,keys:n},e.abrupt("return",r);case 11:case"end":return e.stop()}}),e)}))),rt.apply(this,arguments)}function at(){return it.apply(this,arguments)}function it(){return it=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Ee=e.sent,e.next=5,Ee.getAll("configs");case 5:return t=e.sent,e.next=8,Ee.getAllKeys("configs");case 8:return n=e.sent,r={values:t,keys:n},e.abrupt("return",r);case 11:case"end":return e.stop()}}),e)}))),it.apply(this,arguments)}function ot(e){return ct.apply(this,arguments)}function ct(){return ct=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Ee=e.sent,e.abrupt("return",Ee.get("configs",t));case 4:case"end":return e.stop()}}),e)}))),ct.apply(this,arguments)}function st(e,t){return ut.apply(this,arguments)}function ut(){return ut=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,qe();case 2:return Ee=e.sent,e.abrupt("return",Ee.put("configs",t,n));case 4:case"end":return e.stop()}}),e)}))),ut.apply(this,arguments)}var lt={getAllData:nt,getCountOfGifs:et,getGifData:Ke,removeCompleteGifData:Xe,removeGifData:Ye,setGifdata:Je,getAllConfigs:at,getConfig:ot,setConfig:st};a["a"].use(Ne["a"]);var pt=new Ne["a"].Store({state:{gifCount:0,gifMode:"trending",showMobileDrawer:!1,fullImageMode:!1},mutations:{initializeStore:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var r,a,i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,lt.getAllConfigs();case 2:if(r=n.sent,r){for(a={},i=r.keys.length,o=0;o<i;o+=1)a[r.keys[o]]=r.values[o];t.replaceState(Object.assign(e,a))}case 4:case"end":return n.stop()}}),n)})))()},setGifCount:function(e,t){e.gifCount=t},setGifMode:function(e,t){e.gifMode=t},setFullImageMode:function(e,t){e.fullImageMode=t},setShowMobileDrawer:function(e,t){e.showMobileDrawer=t}},actions:{getGifData:function(e,t){return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",lt.getGifData(t));case 1:case"end":return e.stop()}}),e)})))()},setGifData:function(e,t){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var r,a,i,o,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.rating,a=t.preview,i=t.image,o=t.key,e.next=3,lt.setGifdata(r,a,i,o);case 3:return e.next=5,lt.getCountOfGifs();case 5:c=e.sent,n.state.gifCount<c&&n.commit("setGifCount",c);case 7:case"end":return e.stop()}}),e)})))()},removeGifData:function(e,t){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n.commit("setGifCount",n.state.gifCount-1),e.abrupt("return",lt.removeGifData(t));case 2:case"end":return e.stop()}}),e)})))()},removeCompleteGifData:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.commit("setGifCount",0),t.abrupt("return",lt.removeCompleteGifData());case 2:case"end":return t.stop()}}),t)})))()},getGifCount:function(e){return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",lt.getCountOfGifs());case 1:case"end":return e.stop()}}),e)})))()},getAllData:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",lt.getAllData());case 1:case"end":return e.stop()}}),e)})))()},getConfig:function(e,t){return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",lt.getConfig(t));case 1:case"end":return e.stop()}}),e)})))()}},modules:{}});pt.subscribe(function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:e.t0=t.type,e.next="setFullImageMode"===e.t0?3:"setGifCount"===e.t0?6:"setGifMode"===e.t0?9:12;break;case 3:return e.next=5,lt.setConfig(t.payload,"fullImageMode");case 5:return e.abrupt("break",13);case 6:return e.next=8,lt.setConfig(t.payload,"gifCount");case 8:return e.abrupt("break",13);case 9:return e.next=11,lt.setConfig(t.payload,"gifMode");case 11:return e.abrupt("break",13);case 12:return e.abrupt("break",13);case 13:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());var ft=pt;a["a"].config.productionTip=!1,new a["a"]({router:Le,vuetify:Be,store:ft,beforeCreate:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",e.$store.commit("initializeStore"));case 1:case"end":return t.stop()}}),t)})))()},render:function(e){return e(ie)}}).$mount("#app")}});