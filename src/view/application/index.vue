<template>
  <div>
    <div class="search-con search-con-top">
      <Input
        clearable
        placeholder="搜索项目编号/名称"
        class="search-input"
        v-model="searchValue"
      />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
      <!-- <Button @click="deleteNode" class="search-btn" type="primary">
        <Icon type="create" />删除
      </Button> -->
      <Button @click="openModal(3)" class="search-btn" type="primary">
        <Icon type="create" />上传招标文书二维码
      </Button>
      <Button @click="openModal(9)" class="search-btn" type="primary">
        <Icon type="create" />授权委托书模板上传
      </Button>
      <Button @click="openForm()" class="search-btn" type="primary">
        <Icon type="create" />+
      </Button>
    </div>
    <Table
      :loading="loading"
      :columns="columns"
      :data="
        tableData ? tableData.slice((page - 1) * 10, (page - 1) * 10 + 10) : []
      "
    >
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
    </Table>
    <Page :total="tableData ? tableData.length : 1" @on-change="changePage" />
    <Modal
      v-model="modal"
      :title="businessType == 3 ? '上传招标文书二维码' : '授权委托书模板上传'"
      width="700"
    >
      <Form ref="form" :label-width="120" :key="modalKey">
        <Upload
          ref="upload"
          action="/api/uploadSystemFile"
          :data="{ ' businessType': businessType }"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
        >
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </Form>
    </Modal>
    <Modal v-model="modal1" width="700">
      <img :src="tableImg" alt="" style="display: block; width: 100%" />
    </Modal>
    <Modal v-model="modalForm" title="新增报名" :footer-hide="true" width="700">
      <Form ref="form" :model="formItem" :label-width="120" :key="modalKey">
        <FormItem label="项目名称、项目编号">
          <Select v-model="formItem.projectCode" :loading="loading2" filterable>
            <Option
              v-for="(item, index) in options"
              :key="index"
              :value="item.showCode"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="联系人">
          <Input v-model="formItem.applicantName" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="联系电话">
          <Input v-model="formItem.phone" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="联系地址">
          <Input v-model="formItem.address" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="投标单位名称">
          <Input v-model="formItem.company" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="营业执照编号">
          <Input
            v-model="formItem.businessLicense"
            placeholder="请输入"
          ></Input>
        </FormItem>
        <FormItem label="法定代表人姓名">
          <Input v-model="formItem.corporate" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="授权委托人姓名">
          <Input v-model="formItem.consignor" placeholder="请输入"></Input>
        </FormItem>
        <Upload
          ref="upload2"
          action="/api/upload"
          :data="{ ...extra, ' businessType': 4 }"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload2"
        >
          <Button icon="ios-cloud-upload-outline">上传营业执照扫描件 </Button>
        </Upload>
        <Upload
          ref="upload3"
          action="/api/upload"
          :data="{ ...extra, ' businessType': 5 }"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload3"
        >
          <Button icon="ios-cloud-upload-outline"
            >上传授权委托人身份证扫描件
          </Button>
        </Upload>
        <Upload
          ref="upload4"
          action="/api/upload"
          :data="{ ...extra, ' businessType': 6 }"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload4"
        >
          <Button icon="ios-cloud-upload-outline"
            >上传法定代表人身份证扫描件
          </Button>
        </Upload>
        <Upload
          ref="upload5"
          action="/api/upload"
          :data="{ ...extra, ' businessType': 7 }"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload5"
        >
          <Button icon="ios-cloud-upload-outline">上传授权委托书扫描件 </Button>
        </Upload>
        <Upload
          ref="upload6"
          action="/api/upload"
          :data="{ ...extra, ' businessType': 8 }"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload6"
        >
          <Button icon="ios-cloud-upload-outline">上传付款凭证 </Button>
        </Upload>
        <div style="width: 100%; text-align: center">
          <Button @click="ok" type="primary">保存 </Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {
  getApplications,
  postApprove,
  postReject,
  getIdentification,
  postApplication,
  getAnnouncement,
  postApplicationDelete,
} from "@/api/admin";
import innerTable from "./innerTable.vue";
// import { getAnnouncement, postAnnouncement } from "@/api/admin";

export default {
  components: { innerTable },
  data() {
    return {
      searchValue: "",
      iindex: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
          type: "expand",
          render: (h, row) => {
            return h(innerTable, {
              props: {
                tableData: row.row.detail,
                iindex: row.row.projectCode,
              },
              on: {
                getApplications: this.getApplications,
              },
            });
          },
        },
        {
          // width: 100,
          title: "项目编号",
          key: "projectCode",
        },
        {
          // width: 100,
          title: "项目名称",
          key: "projectName",
        },
        // {
        //   width: 100,
        //   title: "密码",
        //   key: "identification",
        // },
        // {
        //   width: 100,
        //   title: "联系人",
        //   key: "applicantName",
        // },
        // {
        //   width: 100,
        //   title: "联系电话",
        //   key: "phone",
        // },
        // {
        //   width: 200,
        //   title: "联系地址",
        //   key: "address",
        // },
        // {
        //   width: 150,
        //   title: "投标单位名称",
        //   key: "company",
        // },
        // {
        //   width: 150,
        //   title: "营业执照编号",
        //   key: "businessLicense",
        // },
        // {
        //   width: 130,
        //   title: "法定代表人姓名",
        //   key: "corporate",
        // },
        // {
        //   width: 130,
        //   title: "授权委托人姓名",
        //   key: "consignor",
        // },
        // {
        //   width: 200,
        //   title: "营业执照扫描件",
        //   slot: "img",
        //   key: "businessLicenses",
        // },
        // {
        //   width: 200,
        //   title: "授权委托人身份证扫描件",
        //   slot: "img2",
        //   key: "consignors",
        // },
        // {
        //   width: 200,
        //   title: "法定代表人身份证扫描件",
        //   slot: "img3",
        //   key: "corporates",
        // },
        // {
        //   width: 200,
        //   title: "授权委托书扫描件",
        //   slot: "img4",
        //   key: "authorizations",
        // },
        // {
        //   width: 200,
        //   title: "付款凭证",
        //   slot: "img5",
        //   key: "evidencePayments",
        // },
        // {
        //   width: 200,
        //   title: "报名时间",
        //   key: "createTime",
        // },
        // {
        //   width: 100,
        //   title: "审核状态",
        //   slot: "status",
        //   key: "status",
        //   disable: true,
        // },
        // {
        //   width: 140,
        //   title: "审核",
        //   slot: "action",
        //   disable: true,
        // },
        // {
        //   width: 120,
        //   title: "汇总展示",
        //   slot: "view",
        //   disable: true,
        // },
      ],
      data: [],
      tableDataMeta: [],
      tableData: [],
      modal: false,
      modal1: false,
      modalForm: false,
      formItem: {},
      uploadList: [],
      uploadList2: [],
      uploadList3: [],
      uploadList4: [],
      uploadList5: [],
      uploadList6: [],
      id: 0,
      modalKey: false,
      tableImg: "",
      businessType: 3,
      loading: true,
      loading2: true,
      page: 1,
      password: "",
      extra: {},
      options: [],
    };
  },
  created() {},
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.uploadList2 = this.$refs.upload2.fileList;
    this.uploadList3 = this.$refs.upload3.fileList;
    this.uploadList4 = this.$refs.upload4.fileList;
    this.uploadList5 = this.$refs.upload5.fileList;
    this.uploadList6 = this.$refs.upload6.fileList;
    this.getApplications();
  },
  methods: {
    getAnnouncement() {
      getAnnouncement({ announcementType: "purchase" }).then((res) => {
        this.options = res.data.announcements.purchase;
        this.loading2 = false;
      });
    },
    postApplication() {
      if (
        this.$refs.upload6.fileList[0] == undefined ||
        this.$refs.upload2.fileList[0] == undefined ||
        this.$refs.upload3.fileList[0] == undefined ||
        this.$refs.upload4.fileList[0] == undefined ||
        this.$refs.upload5.fileList[0] == undefined
      ) {
        this.$Message.warning("有文件未提交，请核对！");
        return;
      }
      postApplication({
        projectCode: this.formItem.projectCode,
        identification: this.password,
        detail: {
          ...this.formItem,
          businessLicenses: [this.$refs.upload2.fileList[0].response.data],
          consignors: [this.$refs.upload3.fileList[0].response.data],
          corporates: [this.$refs.upload4.fileList[0].response.data],
          authorizations: [this.$refs.upload5.fileList[0].response.data],
          evidencePayments: [this.$refs.upload6.fileList[0].response.data],
        },
      }).then((res) => {
        if (res.code == 0) {
          this.$Message.success(`报名成功！`);
          this.modalForm = false;
          this.getApplications();
        }
      });
    },
    getIdentification() {
      // 获取密码
      return getIdentification().then((res) => {
        if (res.code == 0) {
          this.password = res.data.identification;
          this.extra = { identification: this.password };
        }
      });
    },
    openForm() {
      // 打开新增列表
      this.modalForm = true;
      this.getAnnouncement();
      this.getIdentification();
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
    changePage(page) {
      this.page = page;
    },
    checkPng(data) {
      return (
        data.includes("png") || data.includes("jpg") || data.includes("jpeg")
      );
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
    getApplications() {
      getApplications().then((res) => {
        let temp = [],
          temp2 = [],
          map = [];
        res.data.applications.forEach((element) => {
          temp.push({ ...element, ...element.detail });
        });
        // 12.3 二次更新，根据项目编号折叠数据  projectCode
        // 基于projectCode创建数据仓库
        temp.forEach((e) => {
          // 按照字典灌装数据
          if (!map.includes(e.projectCode)) {
            // 1.当字典中无值，加入字典并创建数仓
            map.push(e.projectCode);
            temp2.push({
              projectCode: e.projectCode,
              projectName: e.projectName,
              detail: [{ ...e }],
            });
          } else {
            // 2.当字典中有值，找到数仓，push一组新的数据

            temp2.filter((el) => {
              if (el.projectCode === e.projectCode) {
                el.detail.push({ ...e });
              }
            });
          }
        });
        this.tableDataMeta = temp2;
        this.tableData = temp2;
        this.loading = false;
      });
    },
    handleSearch() {
      this.tableData = this.tableDataMeta.filter((e) => {
        return (
          e.projectCode.includes(this.searchValue) ||
          e?.projectName?.includes(this.searchValue)
        );
      });
    },
    handleSuccess(res, file) {
      // 上传成功
      if (res.code == 0) {
        file.url = res.data.url;
        file.fileName = res.data.fileName;
        file.name = res.data.name;
      }
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      return this.tempCheck(check);
    },
    handleBeforeUpload2() {
      const check = this.uploadList2.length < 1;
      return this.tempCheck(check);
    },
    handleBeforeUpload3() {
      const check = this.uploadList3.length < 1;
      return this.tempCheck(check);
    },
    handleBeforeUpload4() {
      const check = this.uploadList4.length < 1;
      return this.tempCheck(check);
    },
    handleBeforeUpload5() {
      const check = this.uploadList5.length < 1;
      return this.tempCheck(check);
    },
    handleBeforeUpload6() {
      const check = this.uploadList6.length < 1;
      return this.tempCheck(check);
    },
    tempCheck(check) {
      if (!check) {
        this.$Notice.warning({
          title: "最多上传一个文件",
        });
      }
      return check;
    },
    postApprove(data) {
      // 已通过
      postApprove(data).then((res) => {
        this.getApplications();
      });
    },
    postReject(data) {
      //已拒绝
      postReject(data).then((res) => {
        this.getApplications();
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
    ok() {
      this.postApplication();
    },
    cancel() {},
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
