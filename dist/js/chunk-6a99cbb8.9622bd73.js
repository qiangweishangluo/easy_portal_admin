(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a99cbb8"],{"126c":function(e,t,a){},"3a68":function(e,t,a){"use strict";a.r(t);a("7f7f");var n=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"search-con search-con-top"},[t("Input",{staticClass:"search-input",attrs:{clearable:"",placeholder:"搜索公告编号/名称"},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.handleSearch}},[t("Icon",{attrs:{type:"search"}}),e._v("  搜索\n    ")],1),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.openModal}},[t("Icon",{attrs:{type:"create"}}),e._v("新建公告\n    ")],1)],1),t("Tabs",{on:{"on-click":function(t){e.handleSearch(),e.page=1}},model:{value:e.tabs,callback:function(t){e.tabs=t},expression:"tabs"}},e._l(e.tabsOption,(function(e,a){return t("TabPane",{key:a,attrs:{label:e.label,name:e.name}})})),1),t("Table",{attrs:{loading:e.loading,columns:e.columns,data:e.tableData[e.tabs]?e.tableData[e.tabs].slice(10*(e.page-1),10*(e.page-1)+10):[]},scopedSlots:e._u([{key:"action",fn:function(a){var n=a.row,r=a.index;return[t("Button",{on:{click:function(t){return e.handleEdit(n,r)}}},[e._v("编辑")])]}},{key:"file",fn:function(a){var n=a.row;a.index;return[n.detail?t("a",{attrs:{href:n.detail.url}},[e._v(e._s(n.detail.name))]):e._e()]}}])}),t("Page",{attrs:{total:e.tableData[e.tabs]?e.tableData[e.tabs].length:1},on:{"on-change":e.changePage}}),t("Modal",{attrs:{title:"公告",width:"700"},on:{"on-ok":e.ok,"on-cancel":e.cancel},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[t("Form",{key:e.modalKey,ref:"form",attrs:{model:e.formItem,"label-width":120}},[t("FormItem",{attrs:{label:"公告编码"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.code,callback:function(t){e.$set(e.formItem,"code",t)},expression:"formItem.code"}})],1),t("FormItem",{attrs:{label:"公告名称"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),t("FormItem",{attrs:{label:"公告类型"}},[t("Select",{model:{value:e.formItem.type,callback:function(t){e.$set(e.formItem,"type",t)},expression:"formItem.type"}},e._l(e.Options,(function(a,n){return t("Option",{key:n,attrs:{value:a.value}},[e._v(e._s(a.name))])})),1)],1),t("FormItem",{attrs:{label:"报名开始时间"}},[t("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"选择时间"},model:{value:e.formItem.startTime,callback:function(t){e.$set(e.formItem,"startTime",t)},expression:"formItem.startTime"}})],1),t("FormItem",{attrs:{label:"报名结束时间"}},[t("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"选择时间"},model:{value:e.formItem.endTime,callback:function(t){e.$set(e.formItem,"endTime",t)},expression:"formItem.endTime"}})],1),t("FormItem",{attrs:{label:"开标时间"}},[t("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"选择时间"},model:{value:e.formItem.time,callback:function(t){e.$set(e.formItem,"time",t)},expression:"formItem.time"}})],1),t("Upload",{ref:"upload",attrs:{"default-file-list":e.defaultList,action:"/api/uploadSystemFile",data:{" businessType":2},"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传文件")])],1)],1)],1)],1)},r=[],o=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),i=(a("6762"),a("2fdb"),a("50fc"));function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var c={components:{},data:function(){return{searchValue:"",tabs:"purchase",columns:[{title:"名称",key:"name"},{title:"编号",key:"code"},{title:"开标时间",key:"time"},{title:"报名开始时间",key:"startTime"},{title:"报名结束时间",key:"endTime"},{title:"文件",slot:"file"},{title:"操作",slot:"action"}],data:[],tableData:{purchase:[]},tableDataMeta:{purchase:[]},modal:!1,formItem:{code:"",name:"",type:"",startTime:"",endTime:"",time:""},Options:[{value:1,name:"采购公告"},{value:2,name:"更正公告"},{value:3,name:"中标成交公告"},{value:4,name:"公正公告"},{value:5,name:"废弃终止"}],tabsOption:[{label:"采购公告",name:"purchase"},{label:"更正公告",name:"amend"},{label:"中标成交公告",name:"deal"},{label:"公正公告",name:"dealJustice"},{label:"废弃终止",name:"abolish"}],uploadList:[],defaultList:[],id:0,modalKey:!1,page:1,loading:!0}},created:function(){this.getAnnouncement()},mounted:function(){this.uploadList=this.$refs.upload.fileList},methods:{changePage:function(e){this.page=e},handleSearch:function(){var e=this,t=JSON.parse(JSON.stringify(this.tableDataMeta[this.tabs]));this.$set(this.tableData,this.tabs,t.filter((function(t){var a;return t.name.includes(e.searchValue)||(null===t||void 0===t||null===(a=t.code)||void 0===a?void 0:a.includes(e.searchValue))})))},handleSuccess:function(e,t){0==e.code&&(t.name=e.data.name,t.url=e.data.url,t.fileName=e.data.fileName)},handleBeforeUpload:function(){var e=this.uploadList.length<1;return e||this.$Notice.warning({title:"最多上传一个文件"}),e},handleEdit:function(e,t){this.id=e.id,this.formItem=e,this.defaultList=[{url:e.detail.url,fileName:e.detail.fileName,name:e.detail.name||"历史文件"}],this.modal=!0},getAnnouncement:function(){var e=this;Object(i["a"])().then((function(t){0==t.code&&(e.tableData=t.data.announcements,e.tableDataMeta=JSON.parse(JSON.stringify(t.data.announcements)),e.loading=!1)}))},postAnnouncement:function(){var e=this,t={name:this.formItem.name,code:this.formItem.code,type:this.formItem.type,time:new Date(this.formItem.time).getTime(),startTime:new Date(this.formItem.startTime).getTime(),endTime:new Date(this.formItem.endTime).getTime()};Object(i["f"])(s({id:this.id,detail:{url:this.$refs.upload.fileList[0].url,fileName:this.$refs.upload.fileList[0].fileName,name:this.$refs.upload.fileList[0].name,businessType:"announcement"}},t)).then((function(t){0==t.code&&e.getAnnouncement()}))},ok:function(){this.postAnnouncement()},cancel:function(){},openModal:function(){this.id=0,this.modal=!0}}},u=c,m=(a("4327"),a("2877")),d=Object(m["a"])(u,n,r,!1,null,"ca79064e",null);t["default"]=d.exports},4327:function(e,t,a){"use strict";a("126c")},"50fc":function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"i",(function(){return o})),a.d(t,"a",(function(){return i})),a.d(t,"f",(function(){return l})),a.d(t,"e",(function(){return s})),a.d(t,"g",(function(){return c})),a.d(t,"b",(function(){return u})),a.d(t,"h",(function(){return m})),a.d(t,"k",(function(){return d})),a.d(t,"d",(function(){return f})),a.d(t,"j",(function(){return p}));var n=a("66df");function r(){return n["a"].request({url:"/api/banners",method:"get"})}function o(e){return n["a"].request({url:"/api/banners",method:"post",data:e})}function i(e){return n["a"].request({url:"/api/announcements",method:"get",params:e})}function l(e){return n["a"].request({url:"/api/announcement",method:"post",data:e})}function s(){return n["a"].request({url:"/api/identification",method:"get"})}function c(e){return n["a"].request({url:"/api/application",method:"post",data:e})}function u(){return n["a"].request({url:"/api/applications",method:"get"})}function m(e){return n["a"].request({url:"/api/application/approve",method:"post",data:e})}function d(e){return n["a"].request({url:"/api/application/reject",method:"post",data:e})}function f(){return n["a"].request({url:"/api/allBids",method:"get"})}function p(e){return n["a"].request({url:"/api/clarification",method:"post",data:e})}}}]);