(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48bb9076"],{"1cdd":function(e,t,a){"use strict";a("282d")},"282d":function(e,t,a){},dbe1:function(e,t,a){"use strict";a.r(t);a("8e6e"),a("ac6a"),a("456d");var o=a("ade3");a("7f7f");function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var s=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"search-con search-con-top"},[t("Input",{staticClass:"search-input",attrs:{clearable:"",placeholder:"搜索项目编号/名称"},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}}),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.handleSearch}},[t("Icon",{attrs:{type:"search"}}),e._v("  搜索\n    ")],1),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:e.deleteNode}},[t("Icon",{attrs:{type:"create"}}),e._v("删除\n    ")],1),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:function(t){return e.openModal(3)}}},[t("Icon",{attrs:{type:"create"}}),e._v("上传招标文书二维码\n    ")],1),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:function(t){return e.openModal(9)}}},[t("Icon",{attrs:{type:"create"}}),e._v("授权委托书模板上传\n    ")],1),t("Button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:function(t){return e.openForm()}}},[t("Icon",{attrs:{type:"create"}}),e._v("+\n    ")],1)],1),t("Table",{ref:"selection",attrs:{loading:e.loading,columns:e.columns,data:e.tableData?e.tableData.slice(10*(e.page-1),10*(e.page-1)+10):[]},scopedSlots:e._u([{key:"action",fn:function(a){var o=a.row,n=a.index;return[t("Button",{attrs:{type:"primary"},on:{click:function(t){return e.handleEdit(o,n,"success")}}},[e._v("审核通过")]),t("Button",{on:{click:function(t){return e.handleEdit(o,n,"false")}}},[e._v("审核不通过")])]}},{key:"view",fn:function(a){a.row;var o=a.index;return[t("Button",{attrs:{type:"primary"},on:{click:function(t){return e.show(o)}}},[e._v("展示")])]}},{key:"status",fn:function(a){var o=a.row;a.index;return[t("div",{style:2==o.status?"color:red":1==o.status?"color:green":""},[e._v("\n        "+e._s(e.turnStatus(o.status))+"\n      ")])]}},{key:"file",fn:function(a){var o=a.row;a.index;return[o.detail?t("a",{attrs:{href:o.detail.url}},[e._v(e._s(o.name))]):e._e()]}},{key:"img",fn:function(a){var o=a.row;a.index;return[e.checkPng(o.businessLicenses[0].fileName)?t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:o.businessLicenses[0].url,expression:"row.businessLicenses[0].url"}],staticClass:"tableImg",attrs:{alt:""},on:{click:function(t){return e.openDialog(o.businessLicenses[0].url)}}}):t("a",{attrs:{href:o.businessLicenses[0].url}},[e._v(e._s(o.businessLicenses[0].name||o.businessLicenses[0].fileName))])]}},{key:"img2",fn:function(a){var o=a.row;a.index;return[e.checkPng(o.consignors[0].fileName)?t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:o.consignors[0].url,expression:"row.consignors[0].url"}],staticClass:"tableImg",attrs:{alt:""},on:{click:function(t){return e.openDialog(o.consignors[0].url)}}}):t("a",{attrs:{href:o.consignors[0].url}},[e._v(e._s(o.consignors[0].name||o.consignors[0].fileName))])]}},{key:"img3",fn:function(a){var o=a.row;a.index;return[e.checkPng(o.corporates[0].fileName)?t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:o.corporates[0].url,expression:"row.corporates[0].url"}],staticClass:"tableImg",attrs:{alt:""},on:{click:function(t){return e.openDialog(o.corporates[0].url)}}}):t("a",{attrs:{href:o.corporates[0].url}},[e._v(e._s(o.corporates[0].name||o.corporates[0].fileName))])]}},{key:"img4",fn:function(a){var o=a.row;a.index;return[e.checkPng(o.authorizations[0].fileName)?t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:o.authorizations[0].url,expression:"row.authorizations[0].url"}],staticClass:"tableImg",attrs:{alt:""},on:{click:function(t){return e.openDialog(o.authorizations[0].url)}}}):t("a",{attrs:{href:o.authorizations[0].url}},[e._v(e._s(o.authorizations[0].name||o.authorizations[0].fileName))])]}},{key:"img5",fn:function(a){var o=a.row;a.index;return[e.checkPng(o.evidencePayments[0].fileName)?t("img",{directives:[{name:"lazy",rawName:"v-lazy",value:o.evidencePayments[0].url,expression:"row.evidencePayments[0].url"}],staticClass:"tableImg",attrs:{alt:""},on:{click:function(t){return e.openDialog(o.evidencePayments[0].url)}}}):t("a",{attrs:{href:o.evidencePayments[0].url}},[e._v(e._s(o.evidencePayments[0].name||o.evidencePayments[0].fileName))])]}}])}),t("Page",{attrs:{total:e.tableData?e.tableData.length:1},on:{"on-change":e.changePage}}),t("Modal",{attrs:{title:3==e.businessType?"上传招标文书二维码":"授权委托书模板上传",width:"700"},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[t("Form",{key:e.modalKey,ref:"form",attrs:{"label-width":120}},[t("Upload",{ref:"upload",attrs:{action:"/api/uploadSystemFile",data:{" businessType":e.businessType},"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传文件")])],1)],1)],1),t("Modal",{attrs:{width:"700"},model:{value:e.modal1,callback:function(t){e.modal1=t},expression:"modal1"}},[t("img",{staticStyle:{display:"block",width:"100%"},attrs:{src:e.tableImg,alt:""}})]),t("Modal",{attrs:{title:"新增报名","footer-hide":!0,width:"700"},model:{value:e.modalForm,callback:function(t){e.modalForm=t},expression:"modalForm"}},[t("Form",{key:e.modalKey,ref:"form",attrs:{model:e.formItem,"label-width":120}},[t("FormItem",{attrs:{label:"项目名称、项目编号"}},[t("Select",{attrs:{loading:e.loading2,filterable:""},model:{value:e.formItem.projectCode,callback:function(t){e.$set(e.formItem,"projectCode",t)},expression:"formItem.projectCode"}},e._l(e.options,(function(a,o){return t("Option",{key:o,attrs:{value:a.code}},[e._v(e._s(a.name))])})),1)],1),t("FormItem",{attrs:{label:"联系人"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.applicantName,callback:function(t){e.$set(e.formItem,"applicantName",t)},expression:"formItem.applicantName"}})],1),t("FormItem",{attrs:{label:"联系电话"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.phone,callback:function(t){e.$set(e.formItem,"phone",t)},expression:"formItem.phone"}})],1),t("FormItem",{attrs:{label:"联系地址"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.address,callback:function(t){e.$set(e.formItem,"address",t)},expression:"formItem.address"}})],1),t("FormItem",{attrs:{label:"投标单位名称"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.company,callback:function(t){e.$set(e.formItem,"company",t)},expression:"formItem.company"}})],1),t("FormItem",{attrs:{label:"营业执照编号"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.businessLicense,callback:function(t){e.$set(e.formItem,"businessLicense",t)},expression:"formItem.businessLicense"}})],1),t("FormItem",{attrs:{label:"法定代表人姓名"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.corporate,callback:function(t){e.$set(e.formItem,"corporate",t)},expression:"formItem.corporate"}})],1),t("FormItem",{attrs:{label:"授权委托人姓名"}},[t("Input",{attrs:{placeholder:"请输入"},model:{value:e.formItem.consignor,callback:function(t){e.$set(e.formItem,"consignor",t)},expression:"formItem.consignor"}})],1),t("Upload",{ref:"upload2",attrs:{action:"/api/upload",data:i(i({},e.extra),{},{" businessType":4}),"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload2}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传营业执照扫描件\n        ")])],1),t("Upload",{ref:"upload3",attrs:{action:"/api/upload",data:i(i({},e.extra),{},{" businessType":5}),"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload3}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传授权委托人身份证扫描件\n        ")])],1),t("Upload",{ref:"upload4",attrs:{action:"/api/upload",data:i(i({},e.extra),{},{" businessType":6}),"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload4}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传法定代表人身份证扫描件\n        ")])],1),t("Upload",{ref:"upload5",attrs:{action:"/api/upload",data:i(i({},e.extra),{},{" businessType":7}),"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload5}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传授权委托书扫描件\n        ")])],1),t("Upload",{ref:"upload6",attrs:{action:"/api/upload",data:i(i({},e.extra),{},{" businessType":8}),"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload6}},[t("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[e._v("上传付款凭证\n        ")])],1),t("div",{staticStyle:{width:"100%","text-align":"center"}},[t("Button",{attrs:{type:"primary"},on:{click:e.ok}},[e._v("保存\n        ")])],1)],1)],1)],1)},r=[],l=(a("6762"),a("2fdb"),a("53ca")),c=a("50fc");function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var p={components:{},data:function(){return{searchValue:"",columns:[{type:"selection",width:60,align:"center"},{width:100,title:"项目编号",key:"projectCode"},{width:100,title:"项目名称",key:"projectName"},{width:100,title:"密码",key:"identification"},{width:100,title:"联系人",key:"applicantName"},{width:100,title:"联系电话",key:"phone"},{width:200,title:"联系地址",key:"address"},{width:150,title:"投标单位名称",key:"company"},{width:150,title:"营业执照编号",key:"businessLicense"},{width:130,title:"法定代表人姓名",key:"corporate"},{width:130,title:"授权委托人姓名",key:"consignor"},{width:200,title:"营业执照扫描件",slot:"img",key:"businessLicenses"},{width:200,title:"授权委托人身份证扫描件",slot:"img2",key:"consignors"},{width:200,title:"法定代表人身份证扫描件",slot:"img3",key:"corporates"},{width:200,title:"授权委托书扫描件",slot:"img4",key:"authorizations"},{width:200,title:"付款凭证",slot:"img5",key:"evidencePayments"},{width:200,title:"报名时间",key:"createTime"},{width:100,title:"审核状态",slot:"status",key:"status",disable:!0},{width:140,title:"审核",slot:"action",disable:!0},{width:120,title:"汇总展示",slot:"view",disable:!0}],data:[],tableDataMeta:[],tableData:[],modal:!1,modal1:!1,modalForm:!1,formItem:{},uploadList:[],uploadList2:[],uploadList3:[],uploadList4:[],uploadList5:[],uploadList6:[],id:0,modalKey:!1,tableImg:"",businessType:3,loading:!0,loading2:!0,page:1,password:"",extra:{},options:[]}},created:function(){},mounted:function(){this.uploadList=this.$refs.upload.fileList,this.uploadList2=this.$refs.upload2.fileList,this.uploadList3=this.$refs.upload3.fileList,this.uploadList4=this.$refs.upload4.fileList,this.uploadList5=this.$refs.upload5.fileList,this.uploadList6=this.$refs.upload6.fileList,this.getApplications()},methods:{deleteNode:function(){var e=this;0!=this.$refs.selection.getSelection().length?this.$Modal.confirm({title:"警告",content:"您确认删除吗？",onOk:function(){var t=[];e.$refs.selection.getSelection().forEach((function(e){t.push(e.id)})),e.postApplicationDelete(t)},onCancel:function(){}}):this.$Message.error("未选择！")},postApplicationDelete:function(e){var t=this;Object(c["j"])({ids:e}).then((function(e){0==e.code&&(t.getApplications(),t.$Message.success("删除成功！"))}))},getAnnouncement:function(){var e=this;Object(c["a"])({announcementType:"purchase"}).then((function(t){e.options=t.data.announcements.purchase,e.loading2=!1}))},postApplication:function(){var e=this;void 0!=this.$refs.upload6.fileList[0]&&void 0!=this.$refs.upload2.fileList[0]&&void 0!=this.$refs.upload3.fileList[0]&&void 0!=this.$refs.upload4.fileList[0]&&void 0!=this.$refs.upload5.fileList[0]?Object(c["i"])({projectCode:this.formItem.projectCode,identification:this.password,detail:d(d({},this.formItem),{},{businessLicenses:[this.$refs.upload2.fileList[0].response.data],consignors:[this.$refs.upload3.fileList[0].response.data],corporates:[this.$refs.upload4.fileList[0].response.data],authorizations:[this.$refs.upload5.fileList[0].response.data],evidencePayments:[this.$refs.upload6.fileList[0].response.data]})}).then((function(t){0==t.code&&(e.$Message.success("报名成功！"),e.modalForm=!1,e.getApplications())})):this.$Message.warning("有文件未提交，请核对！")},getIdentification:function(){var e=this;return Object(c["f"])().then((function(t){0==t.code&&(e.password=t.data.identification,e.extra={identification:e.password})}))},openForm:function(){this.modalForm=!0,this.getAnnouncement(),this.getIdentification()},show:function(e){var t=this,a="";this.columns.slice(1).forEach((function(o){o.disable||("object"==Object(l["a"])(t.tableData[e][o.key])?a+="<div style='font-size:18px'>".concat(o.title,":<a href='").concat(t.tableData[e][o.key][0].url,"' >").concat(t.tableData[e][o.key][0].name||t.tableData[e][o.key][0].fileName,"</a></div>"):a+="<div style='font-size:18px'>".concat(o.title,":").concat(t.tableData[e][o.key]||"--","</div>"))})),this.$Modal.info({title:"汇总展示",content:"".concat(a),width:"60%"})},changePage:function(e){this.page=e},checkPng:function(e){return e.includes("png")||e.includes("jpg")||e.includes("jpeg")},turnStatus:function(e){switch(e+""){case"0":return"待审核";case"1":return"已通过";case"2":return"已拒绝"}return"--"},getApplications:function(){var e=this;Object(c["b"])().then((function(t){var a=[];t.data.applications.forEach((function(e){a.push(d(d({},e),e.detail))})),e.tableDataMeta=a,e.tableData=a,e.loading=!1}))},handleSearch:function(){var e=this;this.tableData=this.tableDataMeta.filter((function(t){var a;return t.projectCode.includes(e.searchValue)||(null===t||void 0===t||null===(a=t.projectName)||void 0===a?void 0:a.includes(e.searchValue))}))},handleSuccess:function(e,t){0==e.code&&(t.url=e.data.url,t.fileName=e.data.fileName,t.name=e.data.name)},handleBeforeUpload:function(){var e=this.uploadList.length<1;return this.tempCheck(e)},handleBeforeUpload2:function(){var e=this.uploadList2.length<1;return this.tempCheck(e)},handleBeforeUpload3:function(){var e=this.uploadList3.length<1;return this.tempCheck(e)},handleBeforeUpload4:function(){var e=this.uploadList4.length<1;return this.tempCheck(e)},handleBeforeUpload5:function(){var e=this.uploadList5.length<1;return this.tempCheck(e)},handleBeforeUpload6:function(){var e=this.uploadList6.length<1;return this.tempCheck(e)},tempCheck:function(e){return e||this.$Notice.warning({title:"最多上传一个文件"}),e},postApprove:function(e){var t=this;Object(c["k"])(e).then((function(e){t.getApplications()}))},postReject:function(e){var t=this;Object(c["p"])(e).then((function(e){t.getApplications()}))},handleEdit:function(e,t,a){var o={id:e.id,projectCode:e.projectCode,identification:e.identification};"success"==a?this.postApprove(o):this.postReject(o)},ok:function(){this.postApplication()},cancel:function(){},openModal:function(e){this.businessType=e,this.modal=!0},openDialog:function(e){this.tableImg=e,this.modal1=!0}}},f=p,m=(a("1cdd"),a("2877")),h=Object(m["a"])(f,s,r,!1,null,"460ab557",null);t["default"]=h.exports}}]);