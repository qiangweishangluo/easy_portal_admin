<template>
  <div>
    <Table :columns="columns" ref="selection" :data="tableData">
      <template #action="{ row, index }">
        <Button @click="handleEdit(row, index, 'success')" type="primary"
          >审核通过</Button
        >
        <Button @click="handleEdit(row, index, 'false')">审核不通过</Button>
      </template>
      <template #view="{ row, index }">
        <Button type="primary" @click="show(index)">展示</Button>
      </template>
      <template #status="{ row, index }">
        <div
          :style="
            row.status == 2 ? 'color:red' : row.status == 1 ? 'color:green' : ''
          "
        >
          {{ turnStatus(row.status) }}
        </div>
      </template>
      <template #file="{ row, index }">
        <a v-if="row.detail" :href="row.detail.url">{{ row.name }}</a>
      </template>
      <template #img="{ row, index }">
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
      <template #img2="{ row, index }">
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
      <template #img3="{ row, index }">
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
      <template #img4="{ row, index }">
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
      <template #img5="{ row, index }">
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
      <template #delete="{ row, index }">
        <Button type="primary" @click="deleteNode(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script>
import {
  postApplicationDelete,
} from "@/api/admin";
export default {
  components: {},
  props: ["tableData"],
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
          key: "identification",
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
    };
  },
  created() {
    console.log(this.tableData);
  },
  mounted() {},
  methods: {
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
          console.log(temp);
          // this.postApplicationDelete(temp);
        },
        onCancel: () => {},
      });
    },
    postApplicationDelete(id) {
      // 删除
      postApplicationDelete({ ids: id }).then((res) => {
        if (res.code == 0) {
          this.getApplications();
          this.$Message.success("删除成功！");
        }
      });
    },
    show(index) {
      let temp = "";
      this.columns.slice(1).forEach((e) => {
        if (!e.disable) {
          if (typeof this.tableData[index][e.key] == "object") {
            temp += `<div style='font-size:18px'>${e.title}:<a href='${
              this.tableData[index][e.key][0].url
            }' >${
              this.tableData[index][e.key][0].name ||
              this.tableData[index][e.key][0].fileName
            }</a></div>`;
          } else {
            temp += `<div style='font-size:18px'>${e.title}:${
              this.tableData[index][e.key] || "--"
            }</div>`;
          }
        }
      });
      this.$Modal.info({
        title: "汇总展示",
        content: `${temp}`,
        width: "60%",
      });
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
</style>
