(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-658243e3"],{"0f03":function(t,n,e){},"33fb":function(t,n,e){"use strict";e("0f03")},f73e:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t._self._c;return n("div",[n("Row",[n("i-col",[n("Card",[n("Row",[n("i-col",{attrs:{span:"8"}},[n("Button",{attrs:{type:"primary"},on:{click:t.showModal}},[t._v("显示可拖动弹窗")]),n("br"),n("Button",{directives:[{name:"draggable",rawName:"v-draggable",value:t.buttonOptions,expression:"buttonOptions"}],staticClass:"draggable-btn"},[t._v("这个按钮也是可以拖动的")])],1),n("i-col",{attrs:{span:"16"}},[n("div",{staticClass:"intro-con"},[t._v('\n              <Modal v-draggable="options" v-model="visible">标题</Modal>\n              '),n("pre",{staticClass:"code-con"},[t._v("  options = {\n    trigger: '.ivu-modal-body',\n    body: '.ivu-modal'\n  }\n              ")])])])],1)],1)],1),n("Modal",{directives:[{name:"draggable",rawName:"v-draggable",value:t.options,expression:"options"}],model:{value:t.modalVisible,callback:function(n){t.modalVisible=n},expression:"modalVisible"}},[t._v("\n      拖动这里即可拖动整个弹窗\n    ")])],1),n("Row",{staticStyle:{"margin-top":"10px"}},[n("i-col",[n("Card",[n("Row",[n("i-col",{attrs:{span:"8"}},[n("Input",{staticStyle:{width:"60%"},model:{value:t.inputValue,callback:function(n){t.inputValue=n},expression:"inputValue"}},[n("Button",{directives:[{name:"clipboard",rawName:"v-clipboard",value:t.clipOptions,expression:"clipOptions"}],attrs:{slot:"append"},slot:"append"},[t._v("copy")])],1)],1),n("i-col",{attrs:{span:"16"}},[n("div",{staticClass:"intro-con"},[t._v('\n              <Input style="width: 60%" v-model="inputValue">\n                '),n("br"),t._v('\n                   <Button slot="append" v-clipboard="clipOptions">copy</Button>\n                '),n("br"),t._v("\n              </Input>\n              "),n("pre",{staticClass:"code-con"},[t._v("  clipOptions: {\n    value: this.inputValue,\n    success: (e) => {\n      this.$Message.success('复制成功')\n    },\n    error: () => {\n      this.$Message.error('复制失败')\n    }\n  }\n              ")])])])],1)],1)],1),n("Modal",{directives:[{name:"draggable",rawName:"v-draggable",value:t.options,expression:"options"}],model:{value:t.modalVisible,callback:function(n){t.modalVisible=n},expression:"modalVisible"}},[t._v("\n      拖动这里即可拖动整个弹窗\n    ")])],1)],1)},o=[],i={name:"directive_page",data:function(){return{modalVisible:!1,options:{trigger:".ivu-modal-body",body:".ivu-modal",recover:!0},buttonOptions:{trigger:".draggable-btn",body:".draggable-btn"},statu:1,inputValue:"这是输入的内容"}},computed:{clipOptions:function(){var t=this;return{value:this.inputValue,success:function(n){t.$Message.success("复制成功")},error:function(){t.$Message.error("复制失败")}}}},methods:{showModal:function(){this.modalVisible=!0}}},s=i,l=(e("33fb"),e("2877")),r=Object(l["a"])(s,a,o,!1,null,null,null);n["default"]=r.exports}}]);