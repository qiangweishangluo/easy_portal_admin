<template>
  <div>
    <div class="search-con search-con-top">
      <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
      <Button @click="openModal" class="search-btn" type="primary">
        <Icon type="create" />上传招标文书二维码
      </Button>
    </div>
    <Table :columns="columns" :data="tableData">
      <template #action="{ row, index }">
        <Button @click="handleEdit(row, index)">编辑</Button>
      </template>
      <template #file="{ row, index }">
        <a v-if="row.detail" :href="row.detail.url">{{ row.name }}</a>
      </template>
    </Table>
    <Modal v-model="modal" title="上传招标文书二维码" @on-ok="ok" @on-cancel="cancel" width="700">
      <Form ref="form" :model="formItem" :label-width="120" :key="modalKey">
        <Upload ref="upload" action="/api/uploadSystemFile" :data="{ ' businessType': 2 }" :on-success="handleSuccess"
          :before-upload="handleBeforeUpload">
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getApplications } from "@/api/admin";
// import { getAnnouncement, postAnnouncement } from "@/api/admin";

export default {
  components: {},
  data() {
    return {
      searchValue: "",
      columns: [
        {
          title: "项目编号",
          key: "projectCode",
        },
        {
          title: "密码",
          key: "identification",
        },
        {
          title: "联系人",
          key: "applicantName",
        },
        {
          title: "联系电话",
          key: "phone",
        },
        {
          title: "联系地址",
          key: "address",
        },
        {
          title: "投标单位名称",
          key: "company",
        },
        {
          title: "营业执照编号",
          key: "BusinessLicense",
        },
        {
          title: "法定代表人姓名",
          key: "corporate",
        },
        {
          title: "授权委托人姓名",
          key: "Consignor",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      data: [],
      tableData: [],
      modal: false,
      formItem: {
      },
      uploadList: [],
      id: 0,
      modalKey: false,
    };
  },
  created() {
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.getApplications()
  },
  methods: {
    getApplications() {
      getApplications().then((res) => {
        let temp = [];
        res.data.applications.forEach(element => {
          temp.push({ element, ...element.detail })
        });
        this.tableData = temp
        console.log(temp);
      })
    },
    handleSearch() { },
    handleSuccess(res, file) {
      // 上传成功
      console.log(res);
      if (res.code == 0) {
        file.url = res.data.url;
        file.fileName = res.data.fileName;
        // this.uploadList.push(file)
        console.log(this.uploadList);
      }
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "最多上传一个文件",
        });
      }
      return check;
    },
    handleEdit(row, index) {
      this.id = row.id;
      this.formItem = row;
      this.uploadList = [
        { url: row.detail.url, fileName: row.detail.fileName },
      ];
      this.modal = true;
    },
    ok() {
    },
    cancel() {
      // this.$Message.info('Clicked ok');
    },
    openModal() {
      this.id = 0;
      this.modal = true;
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
</style>
