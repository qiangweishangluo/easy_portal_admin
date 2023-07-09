<template>
  <div>
    <div class="search-con search-con-top">
      <!-- <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button> -->
      <Button @click="openModal" class="search-btn" type="primary">
        <Icon type="create" />新建公告
      </Button>
    </div>
    <Tabs v-model="tabs" @on-click="page = 1">
      <TabPane v-for="(item, index) in tabsOption" :label="item.label" :name="item.name" :key="index">
      </TabPane>
    </Tabs>
    <Table :loading="loading" :columns="columns"
      :data="tableData[tabs] ? tableData[tabs].slice((page - 1) * 10, (page - 1) * 10 + 10) : []">
      <template #action="{ row, index }">
        <Button @click="handleEdit(row, index)">编辑</Button>
      </template>
      <template #file="{ row, index }">
        <a v-if="row.detail" :href="row.detail.url">{{ row.detail.name }}</a>
      </template>
    </Table>
    <Page :total="tableData[tabs] ? tableData[tabs].length : 1" @on-change="changePage" />
    <Modal v-model="modal" title="公告" @on-ok="ok" @on-cancel="cancel" width="700">
      <Form ref="form" :model="formItem" :label-width="120" :key="modalKey">
        <FormItem label="公告编码">
          <Input v-model="formItem.code" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="公告名称">
          <Input v-model="formItem.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="公告类型">
          <Select v-model="formItem.type">
            <Option v-for="(item, index) in Options" :value="item.value" :key="index">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="报名开始时间">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model="formItem.startTime"
            style="width: 300px">
          </DatePicker>
        </FormItem>
        <FormItem label="报名结束时间">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model="formItem.endTime"
            style="width: 300px">
          </DatePicker>
        </FormItem>
        <FormItem label="开标时间">
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" v-model="formItem.time"
            style="width: 300px">
          </DatePicker>
        </FormItem>
        <Upload ref="upload" :default-file-list="defaultList" action="/api/uploadSystemFile"
          :data="{ ' businessType': 2 }" :on-success="handleSuccess" :before-upload="handleBeforeUpload">
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getAnnouncement, postAnnouncement } from "@/api/admin";

export default {
  components: {},
  data() {
    return {
      searchValue: "",
      tabs: "purchase",
      columns: [
        {
          title: "名称",
          key: "name",
        },
        {
          title: "编号",
          key: "code",
        },
        {
          title: "开标时间",
          key: "time",
        },
        {
          title: "报名开始时间",
          key: "startTime",
        },
        {
          title: "报名结束时间",
          key: "endTime",
        },
        {
          title: "文件",
          slot: "file",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      data: [],
      tableData: { purchase: [] },
      modal: false,
      formItem: {
        code: "",
        name: "",
        type: "",
        startTime: "",
        endTime: "",
        time: "",
      },
      Options: [
        {
          value: 1,
          name: "采购公告",
        },
        {
          value: 2,
          name: "更正公告",
        },
        {
          value: 3,
          name: "中标成交公告",
        },
        {
          value: 4,
          name: "公正公告",
        },
        {
          value: 5,
          name: "废弃终止",
        },
      ],
      tabsOption: [
        { label: "采购公告", name: "purchase" },
        { label: "更正公告", name: "amend" },
        { label: "中标成交公告", name: "deal" },
        { label: "公正公告", name: "dealJustice" },
        { label: "废弃终止", name: "abolish" },
      ],
      uploadList: [],
      defaultList: [],
      id: 0,
      modalKey: false,
      page: 1,
      loading: true,
    };
  },
  created() {
    this.getAnnouncement(); // 获取公告
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    handleSearch() { },
    handleSuccess(res, file) {
      // 上传成功
      if (res.code == 0) {
        file.name = res.data.name;
        file.url = res.data.url;
        file.fileName = res.data.fileName;
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
      this.defaultList = [
        { url: row.detail.url, fileName: row.detail.fileName, name: row.detail.name || '历史文件' },
      ];
      this.modal = true;
    },
    getAnnouncement() {
      getAnnouncement().then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.announcements;
          this.loading = false
        }
      });
    },
    postAnnouncement() {
      let temp = {
        name: this.formItem.name,
        code: this.formItem.code,
        type: this.formItem.type,
        time: new Date(this.formItem.time).getTime(),
        startTime: new Date(this.formItem.startTime).getTime(),
        endTime: new Date(this.formItem.endTime).getTime(),
      };
      postAnnouncement({
        id: this.id,
        detail: {
          url: this.uploadList[0].url,
          fileName: this.uploadList[0].fileName,
          name: this.uploadList[0].name,
          businessType: "announcement",
        },
        ...temp,
      }).then((res) => {
        if (res.code == 0) {
          this.getAnnouncement();
        }
      });
    },
    ok() {
      this.postAnnouncement();
    },
    cancel() {
      // this.$Message.info('Clicked ok');
    },
    openModal() {
      this.id = 0;
      this.modal = true;
      // this.$refs['form'].resetFields();
      // this.$refs['upload'].clearFiles();
      // this.uploadList = []
      // this.modalKey = !this.modalKey
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
