(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1850cf7c"],{"05a1":function(e,t,a){},"3a68":function(e,t,a){"use strict";a.r(t);a("7f7f");var n=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"search-con search-con-top"},[t("Input",{staticClass:"search-input",attrs:{clearable:"",placeholder:"搜索公告编号/名称"},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.handleSearch}},[t("Icon",{attrs:{type:"search"}}),e._v("  搜索\n    ")],1),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.openModal}},[t("Icon",{attrs:{type:"create"}}),e._v("新建公告\n    ")],1),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.deleteNode}},[t("Icon",{attrs:{type:"create"}}),e._v("删除\n    ")],1)],1),t("Tabs",{on:{"on-click":function(t){e.handleSearch(),e.page=1}},model:{value:e.tabs,callback:function(t){e.tabs=t},expression:"tabs"}},e._l(e.tabsOption,(function(e,a){return t("TabPane",{key:a,attrs:{label:e.label,name:e.name}})})),1),t("Table",{ref:"selection",attrs:{loading:e.loading,columns:e.columns,data:e.tableData[e.tabs]?e.tableData[e.tabs].slice(10*(e.page-1),10*(e.page-1)+10):[]},scopedSlots:e._u([{key:"action",fn:function(a){var n=a.row,i=a.index;return[t("Button",{on:{click:function(t){return e.handleEdit(n,i)}}},[e._v("编辑")])]}},{key:"file",fn:function(a){var n=a.row;a.index;return[n.detail.announcementDocument?t("a",{attrs:{href:n.detail.announcementDocument.url}},[e._v(e._s(n.detail.announcementDocument.name))]):e._e()]}},{key:"file2",fn:function(a){var n=a.row;a.index;return[n.detail.biddingDocument?t("a",{attrs:{href:n.detail.biddingDocument.url}},[e._v(e._s(n.detail.biddingDocument.name))]):e._e()]}}])}),t("Page",{attrs:{total:e.tableData[e.tabs]?e.tableData[e.tabs].length:1},on:{"on-change":e.changePage}}),t("Modal",{attrs:{title:"公告",width:"700"},on:{"on-ok":e.ok,"on-cancel":e.cancel},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[t("Form",{key:e.modalKey,ref:"form",attrs:{model:e.formItem,"label-width":120}},[t("FormItem",{attrs:{label:"公告编码"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.code,callback:function(t){e.$set(e.formItem,"code",t)},expression:"formItem.code"}})],1),t("FormItem",{attrs:{label:"公告名称"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),t("FormItem",{attrs:{label:"公告类型"}},[t("Select",{model:{value:e.formItem.type,callback:function(t){e.$set(e.formItem,"type",t)},expression:"formItem.type"}},e._l(e.Options,(function(a,n){return t("Option",{key:n,attrs:{value:a.value}},[e._v(e._s(a.name))])})),1)],1),t("FormItem",{attrs:{label:"报名开始时间"}},[t("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"选择时间"},model:{value:e.formItem.startTime,callback:function(t){e.$set(e.formItem,"startTime",t)},expression:"formItem.startTime"}})],1),t("FormItem",{attrs:{label:"报名结束时间"}},[t("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"选择时间"},model:{value:e.formItem.endTime,callback:function(t){e.$set(e.formItem,"endTime",t)},expression:"formItem.endTime"}})],1),t("FormItem",{attrs:{label:"开标时间"}},[t("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm",placeholder:"选择时间"},model:{value:e.formItem.time,callback:function(t){e.$set(e.formItem,"time",t)},expression:"formItem.time"}})],1),t("Upload",{ref:"upload",attrs:{"default-file-list":e.defaultList,action:"/api/uploadSystemFile",data:{" businessType":2},"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传公告文件")])],1),t("Upload",{ref:"upload2",attrs:{"default-file-list":e.defaultList2,action:"/api/uploadSystemFile",data:{" businessType":12},"on-success":e.handleSuccess2,"before-upload":e.handleBeforeUpload2}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传招标文件")])],1)],1)],1)],1)},i=[],o=(a("8e6e"),a("456d"),a("ade3")),l=(a("6762"),a("2fdb"),a("ac6a"),a("50fc"));function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var c={components:{},data:function(){return{searchValue:"",tabs:"purchase",columns:[{type:"selection",width:60,align:"center"},{title:"名称",key:"name"},{title:"编号",key:"code"},{title:"开标时间",key:"time"},{title:"报名开始时间",key:"startTime"},{title:"报名结束时间",key:"endTime"},{title:"公告文件",slot:"file"},{title:"招标文件",slot:"file2"},{title:"操作",slot:"action"}],data:[],tableData:{purchase:[]},tableDataMeta:{purchase:[]},modal:!1,formItem:{code:"",name:"",type:"",startTime:"",endTime:"",time:""},Options:[{value:1,name:"采购公告"},{value:2,name:"更正公告"},{value:3,name:"中标(成交)公告"},{value:4,name:"中标(成交)更正公告"},{value:5,name:"废弃终止"}],tabsOption:[{label:"采购公告",name:"purchase"},{label:"更正公告",name:"amend"},{label:"中标(成交)公告",name:"deal"},{label:"中标(成交)更正公告",name:"dealJustice"},{label:"废弃终止",name:"abolish"}],uploadList:[],uploadList2:[],defaultList:[],defaultList2:[],id:0,modalKey:!1,page:1,loading:!0}},created:function(){this.getAnnouncement()},mounted:function(){this.uploadList=this.$refs.upload.fileList,this.uploadList2=this.$refs.upload2.fileList},methods:{deleteNode:function(){if(0!=this.$refs.selection.getSelection().length){var e=[];this.$refs.selection.getSelection().forEach((function(t){e.push(t.id)})),this.postAnnouncementDelete(e)}else this.$Message.error("未选择！")},postAnnouncementDelete:function(e){var t=this;Object(l["h"])({ids:e}).then((function(e){0==e.code&&(t.getAnnouncement(),t.$Message.success("删除成功！"))}))},changePage:function(e){this.page=e},handleSearch:function(){var e=this,t=JSON.parse(JSON.stringify(this.tableDataMeta[this.tabs]));t&&this.$set(this.tableData,this.tabs,t.filter((function(t){var a;return t.name.includes(e.searchValue)||(null===t||void 0===t||null===(a=t.code)||void 0===a?void 0:a.includes(e.searchValue))})))},handleSuccess:function(e,t){0==e.code&&(t.name=e.data.name,t.url=e.data.url,t.fileName=e.data.fileName)},handleSuccess2:function(e,t){0==e.code&&(t.name=e.data.name,t.url=e.data.url,t.fileName=e.data.fileName)},handleBeforeUpload:function(){var e=this.uploadList.length<1;return e||this.$Notice.warning({title:"最多上传一个文件"}),e},handleBeforeUpload2:function(){var e=this.uploadList2.length<1;return e||this.$Notice.warning({title:"最多上传一个文件"}),e},handleEdit:function(e,t){this.id=e.id,this.formItem=e,this.defaultList=[{url:e.detail.announcementDocument.url,fileName:e.detail.announcementDocument.fileName,name:e.detail.announcementDocument.name||"历史文件"}],this.defaultList2=[{url:e.detail.biddingDocument.url,fileName:e.detail.biddingDocument.fileName,name:e.detail.biddingDocument.name||"历史文件"}],this.modal=!0},getAnnouncement:function(){var e=this;Object(l["a"])().then((function(t){0==t.code&&(e.tableData=t.data.announcements,e.tableDataMeta=JSON.parse(JSON.stringify(t.data.announcements)),e.loading=!1)}))},postAnnouncement:function(){var e=this;if(this.$refs.upload.fileList[0]||this.$refs.upload2.fileList[0]){var t={name:this.formItem.name,code:this.formItem.code,type:this.formItem.type,time:new Date(this.formItem.time).getTime(),startTime:new Date(this.formItem.startTime).getTime(),endTime:new Date(this.formItem.endTime).getTime()};Object(l["g"])(r({id:this.id,detail:{announcementDocument:{url:this.$refs.upload.fileList[0].url,fileName:this.$refs.upload.fileList[0].fileName,name:this.$refs.upload.fileList[0].name,businessType:"biddingDocument"},biddingDocument:{url:this.$refs.upload2.fileList[0].url,fileName:this.$refs.upload2.fileList[0].fileName,name:this.$refs.upload2.fileList[0].name,businessType:"announcement"}}},t)).then((function(t){0==t.code?(e.$Message.success("添加成功！"),e.getAnnouncement()):e.$Message.error(t.message)}))}else this.$Message.success("未上传文件！")},ok:function(){this.postAnnouncement()},cancel:function(){},openModal:function(){this.id=0,this.modal=!0}}},m=c,u=(a("af9f"),a("2877")),d=Object(u["a"])(m,n,i,!1,null,"41856392",null);t["default"]=d.exports},af9f:function(e,t,a){"use strict";a("05a1")}}]);