<template>
  <div>
    <Table :columns="columns" ref="selection" :data="tableData">
      <template #action="{ row, index }">
        <Button @click="handleEdit(row, index, 'success')" type="primary"
          >审核通过</Button
        >
        <Button @click="handleEdit(row, index, 'false')">审核不通过</Button>
      </template>
      <template #view="{ index }">
        <Button type="primary" @click="show(index)">展示</Button>
      </template>
      <template #status="{ row }">
        <div
          :style="
            row.status == 2 ? 'color:red' : row.status == 1 ? 'color:green' : ''
          "
        >
          {{ turnStatus(row.status) }}
        </div>
      </template>
      <template #file="{ row }">
        <a v-if="row.detail" :href="row.detail.url">{{ row.name }}</a>
      </template>
      <template #identificationT="{ row }">
        <span style="font-family: cursive">{{ row.identification }}</span>
      </template>
      <template #img="{ row }">
        <img
          v-if="checkPng(row.businessLicenses[0].fileName)"
          class="tableImg"
          v-lazy="row.businessLicenses[0].url"
          alt=""
          @click="openDialog(row.businessLicenses[0].url)"
        />
        <a v-else :href="row.businessLicenses[0].url">{{
          row.businessLicenses[0].name || row.businessLicenses[0].fileName
        }}</a>
      </template>
      <template #img2="{ row }">
        <img
          v-if="checkPng(row.consignors[0].fileName)"
          class="tableImg"
          v-lazy="row.consignors[0].url"
          alt=""
          @click="openDialog(row.consignors[0].url)"
        />
        <a v-else :href="row.consignors[0].url">{{
          row.consignors[0].name || row.consignors[0].fileName
        }}</a>
      </template>
      <template #img3="{ row }">
        <img
          v-if="checkPng(row.corporates[0].fileName)"
          class="tableImg"
          v-lazy="row.corporates[0].url"
          alt=""
          @click="openDialog(row.corporates[0].url)"
        />
        <a v-else :href="row.corporates[0].url">{{
          row.corporates[0].name || row.corporates[0].fileName
        }}</a>
      </template>
      <template #img4="{ row }">
        <img
          v-if="checkPng(row.authorizations[0].fileName)"
          class="tableImg"
          v-lazy="row.authorizations[0].url"
          alt=""
          @click="openDialog(row.authorizations[0].url)"
        />
        <a v-else :href="row.authorizations[0].url">{{
          row.authorizations[0].name || row.authorizations[0].fileName
        }}</a>
      </template>
      <template #img5="{ row }">
        <img
          v-if="checkPng(row.evidencePayments[0].fileName)"
          class="tableImg"
          v-lazy="row.evidencePayments[0].url"
          alt=""
          @click="openDialog(row.evidencePayments[0].url)"
        />
        <a v-else :href="row.evidencePayments[0].url">{{
          row.evidencePayments[0].name || row.evidencePayments[0].fileName
        }}</a>
      </template>
      <template #delete="{ index }">
        <Button type="primary" @click="deleteNode(index)">删除</Button>
      </template>
    </Table>
    <Modal v-model="modal" width="40%" title="汇总展示">
      <div :id="'test' + iindex" class="test">
        <div style="text-align: center; font-size: 24px">采购文件登记表</div>
        <div>
          <img :src="maxLogo" style="height: 45px" />
          <div style="display: inline-block; float: right;font">
            黑龙江辰泰信德项目管理有限公司
          </div>
        </div>
        <div style="border: 1px solid #000">
          <div v-for="(item, i) in fileList" :key="i" style="overflow:hidden">
            <div
              style="
                display: inline-block;
                width: 30%;
                border-right: 1px solid #000;
                border-bottom: 1px solid #000;
                padding: 5px;
                box-sizing: border-box;
              "
            >
              {{ item.label + ":" }}
            </div>
            <div
              style="
                display: inline-block;
                border-bottom: 1px solid #000;
                width: 70%;
                padding: 5px;
                white-space: nowrap;
                box-sizing: border-box;
              "
            >
              {{ tableData[modalIndex][item.value] }}
            </div>
          </div>
        </div>
        <div>
          附件材料：
          <div v-for="(item, i) in downList" :key="i">
            <div style="display: inline-block; width: 36%; padding: 5px">
              {{ item.label + ":" }}
            </div>
            <a :href="tableData[modalIndex][item.value][0].url">{{
              tableData[modalIndex][item.value][0].name ||
              tableData[modalIndex][item.value][0].fileName
            }}</a>
          </div>
        </div>
      </div>
      <Button @click="check" style="margin-left: 20px">下载截图 </Button>
    </Modal>
  </div>
</template>
<script>
import maxLogo from "@/assets/images/logo.png";
import FileSaver from "file-saver";
// import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";
import { postApplicationDelete, postApprove, postReject } from "@/api/admin";
export default {
  components: {},
  props: ["tableData", "iindex"],
  data() {
    return {
      searchValue: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        // {
        //   width: 100,
        //   title: "项目编号",
        //   key: "projectCode",
        // },
        // {
        //   width: 100,
        //   title: "项目名称",
        //   key: "projectName",
        // },
        {
          width: 100,
          title: "联系人",
          key: "applicantName",
        },
        {
          width: 100,
          title: "联系电话",
          key: "phone",
        },
        {
          width: 200,
          title: "联系地址",
          key: "address",
        },
        {
          width: 100,
          title: "密码",
          slot: "identificationT",
          key: "identificationT",
        },
        {
          width: 150,
          title: "投标单位名称",
          key: "company",
        },
        {
          width: 150,
          title: "营业执照编号",
          key: "businessLicense",
        },
        {
          width: 130,
          title: "法定代表人姓名",
          key: "corporate",
        },
        {
          width: 130,
          title: "授权委托人姓名",
          key: "consignor",
        },
        {
          width: 200,
          title: "营业执照扫描件",
          slot: "img",
          key: "businessLicenses",
        },
        {
          width: 200,
          title: "授权委托人身份证扫描件",
          slot: "img2",
          key: "consignors",
        },
        {
          width: 200,
          title: "法定代表人身份证扫描件",
          slot: "img3",
          key: "corporates",
        },
        {
          width: 200,
          title: "授权委托书扫描件",
          slot: "img4",
          key: "authorizations",
        },
        {
          width: 200,
          title: "付款凭证",
          slot: "img5",
          key: "evidencePayments",
        },
        {
          width: 200,
          title: "报名时间",
          key: "createTime",
        },
        {
          width: 100,
          title: "审核状态",
          slot: "status",
          key: "status",
          disable: true,
        },
        {
          width: 140,
          title: "审核",
          slot: "action",
          disable: true,
        },
        {
          width: 120,
          title: "汇总展示",
          slot: "view",
          disable: true,
        },
        {
          width: 120,
          title: "操作",
          slot: "delete",
          disable: true,
        },
      ],
      id: 0,
      modalKey: false,
      tableImg: "",
      businessType: 3,
      page: 1,
      password: "",
      extra: {},
      options: [],
      fileList: [
        { label: "项目名称", value: "projectName" },
        { label: "项目编号", value: "projectCode" },
        { label: "单位名称", value: "company" },
        { label: "单位地址", value: "address" },
        { label: "统一信用代码号", value: "businessLicense" },
        { label: "法定代表人姓名", value: "corporate" },
        { label: "委托授权人姓名", value: "consignor" },
        { label: "联系人姓名", value: "applicantName" },
        { label: "获取日期", value: "updateTime" },
      ],
      modal: false,
      modalIndex: 0,
      maxLogo,
      downList: [
        { label: "营业执照扫描件", value: "businessLicenses" },
        { label: "法定代表人授权委托书", value: "authorizations" },
        { label: "法定代表人身份证扫描件", value: "corporates" },
        { label: "委托授权人身份证扫描件", value: "consignors" },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    check() {
      this.$Spin.show();
      const node = document.getElementById("test" + this.iindex);
      html2canvas(node, {
        scale: 2,
        width: node.offsetWidth,
        height: node.offsetHeight,
        allowTaint: true, // 允许污染画布
        proxy: "/imgProxy",
      }).then((canvas) => {
        // let imgUrl = canvas.toDataURL("image/png", 1);
        // console.log(imgUrl);
        canvas.toBlob((blob) => {
          FileSaver(
            blob,
            "采购文件登记表-" +
              this.tableData[this.modalIndex].consignor +
              ".png"
          );
          this.$Spin.hide();
        });
      });
    },
    handleEdit(row, index, status) {
      const temp = {
        id: row.id, // applicationId
        projectCode: row.projectCode,
        identification: row.identification,
      };
      status == "success" ? this.postApprove(temp) : this.postReject(temp);
    },
    postApprove(data) {
      // 已通过
      postApprove(data).then((res) => {
        this.$emit("getApplications");
      });
    },
    postReject(data) {
      //已拒绝
      postReject(data).then((res) => {
        this.$emit("getApplications");
      });
    },
    deleteNode() {
      if (this.$refs.selection.getSelection().length == 0) {
        this.$Message.error("未选择！");
        return;
      }
      this.$Modal.confirm({
        title: "警告",
        content: "您确认删除吗？",
        onOk: () => {
          let temp = [];
          this.$refs.selection.getSelection().forEach((e) => {
            temp.push(e.id);
          });
          // console.log(temp);
          this.postApplicationDelete(temp);
        },
        onCancel: () => {},
      });
    },
    postApplicationDelete(id) {
      // 删除
      postApplicationDelete({ ids: id }).then((res) => {
        if (res.code == 0) {
          this.$emit("getApplications");
          this.$Message.success("删除成功！");
        }
      });
    },
    show(index) {
      this.modal = true;
      this.modalIndex = index;
    },
    turnStatus(data) {
      // 0为默认值初始值  1:已通过 2:已拒绝
      switch (data + "") {
        case "0":
          return "待审核";
        case "1":
          return "已通过";
        case "2":
          return "已拒绝";
      }
      return "--";
    },
    cancel() {},
    checkPng(data) {
      return (
        data.includes("png") || data.includes("jpg") || data.includes("jpeg")
      );
    },
    openModal(data) {
      this.businessType = data;
      this.modal = true;
    },
    openDialog(data) {
      this.tableImg = data;
      this.modal1 = true;
    },
  },
};
</script>

<style lang="less" scoped>
.search-con {
  padding: 10px 0;

  .search {
    &-col {
      display: inline-block;
      width: 200px;
    }

    &-input {
      display: inline-block;
      width: 200px;
      margin-left: 2px;
    }

    &-btn {
      margin-left: 2px;
    }
  }
}

.tableImg {
  width: 100px;
  background: #eee;
}

.table_modal {
  font-size: 24px;
  line-height: 24px;
}
.test {
  font-size: 16px;
  padding: 25px;
  box-sizing: border-box;
}
</style>
