<template>
  <div>
    <div class="search-con search-con-top">
      <Input
        clearable
        placeholder="搜索公告编号/名称"
        class="search-input"
        v-model="searchValue"
      />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
      <Button @click="openModal" class="search-btn" type="primary">
        <Icon type="create" />新建公告
      </Button>
      <Button @click="deleteNode" class="search-btn" type="primary">
        <Icon type="create" />删除
      </Button>
    </div>
    <Tabs
      v-model="tabs"
      @on-click="
        handleSearch();
        page = 1;
      "
    >
      <TabPane
        v-for="(item, index) in tabsOption"
        :label="item.label"
        :name="item.name"
        :key="index"
      >
      </TabPane>
    </Tabs>
    <Table
      ref="selection"
      :loading="loading"
      :columns="columns"
      :data="
        tableData[tabs]
          ? tableData[tabs].slice((page - 1) * 10, (page - 1) * 10 + 10)
          : []
      "
    >
      <template #action="{ row, index }">
        <Button @click="handleEdit(row, index)">编辑</Button>
      </template>
      <template #file="{ row, index }">
        <a
          v-if="row.detail.announcementDocument"
          :href="row.detail.announcementDocument.url"
          >{{ row.detail.announcementDocument.name }}</a
        >
      </template>
      <template #file2="{ row, index }">
        <a
          v-if="row.detail.biddingDocument"
          :href="row.detail.biddingDocument.url"
          >{{ row.detail.biddingDocument.name }}</a
        >
      </template>
    </Table>
    <Page
      :total="tableData[tabs] ? tableData[tabs].length : 1"
      @on-change="changePage"
    />
    <Modal v-model="modal" title="公告" :footer-hide="true" width="700">
      <Form ref="form" :model="formItem" :label-width="120" :key="modalKey">
        <FormItem label="公告编码" prop="code">
          <Input v-model="formItem.code" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="公告名称" prop="name">
          <Input v-model="formItem.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="公告类型" prop="type">
          <Select v-model="formItem.type">
            <Option
              v-for="(item, index) in Options"
              :value="item.value"
              :key="index"
              >{{ item.name }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="报名开始时间" prop="startTime">
          <DatePicker
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择时间"
            v-model="formItem.startTime"
            style="width: 300px"
          >
          </DatePicker>
        </FormItem>
        <FormItem label="报名结束时间" prop="endTime">
          <DatePicker
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择时间"
            v-model="formItem.endTime"
            style="width: 300px"
          >
          </DatePicker>
        </FormItem>
        <FormItem label="开标时间" prop="time">
          <DatePicker
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            placeholder="选择时间"
            v-model="formItem.time"
            style="width: 300px"
          >
          </DatePicker>
        </FormItem>
        <Upload
          ref="upload"
          :default-file-list="defaultList"
          action="/api/uploadSystemFile"
          :data="{ ' businessType': 2 }"
          :on-success="handleSuccess"
          :before-upload="handleBeforeUpload"
        >
          <Button icon="ios-cloud-upload-outline">上传公告文件</Button>
        </Upload>
        <Upload
          ref="upload2"
          :default-file-list="defaultList2"
          action="/api/uploadSystemFile"
          :data="{ ' businessType': 12 }"
          :on-success="handleSuccess2"
          :before-upload="handleBeforeUpload2"
        >
          <Button icon="ios-cloud-upload-outline">上传招标文件</Button>
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
  getAnnouncement,
  postAnnouncement,
  postAnnouncementDelete,
} from "@/api/admin";

export default {
  components: {},
  data() {
    return {
      searchValue: "",
      tabs: "purchase",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "名称",
          key: "name",
        },
        {
          title: "编号",
          key: "showCode",
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
          title: "公告文件",
          slot: "file",
        },
        {
          title: "招标文件",
          slot: "file2",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      data: [],
      tableData: { purchase: [] },
      tableDataMeta: { purchase: [] },
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
          name: "中标(成交)公告",
        },
        {
          value: 4,
          name: "中标(成交)更正公告",
        },
        {
          value: 5,
          name: "废弃终止",
        },
      ],
      tabsOption: [
        { label: "采购公告", name: "purchase" },
        { label: "更正公告", name: "amend" },
        { label: "中标(成交)公告", name: "deal" },
        { label: "中标(成交)更正公告", name: "dealJustice" },
        { label: "废弃终止", name: "abolish" },
      ],
      uploadList: [],
      uploadList2: [],
      defaultList: [],
      defaultList2: [],
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
    this.uploadList2 = this.$refs.upload2.fileList;
  },
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
          this.postAnnouncementDelete(temp);
        },
        onCancel: () => {},
      });
    },
    postAnnouncementDelete(id) {
      // 删除公告
      postAnnouncementDelete({ ids: id }).then((res) => {
        if (res.code == 0) {
          this.getAnnouncement();
          this.$Message.success("删除成功！");
        }
      });
    },
    changePage(page) {
      this.page = page;
    },
    handleSearch() {
      // 查询
      const temp = JSON.parse(JSON.stringify(this.tableDataMeta[this.tabs]));
      if (!temp) {
        return;
      }
      this.$set(
        this.tableData,
        this.tabs,
        temp.filter((e) => {
          return (
            e.name.includes(this.searchValue) ||
            e?.code?.includes(this.searchValue)
          );
        })
      );
    },
    handleSuccess(res, file) {
      // 上传成功
      if (res.code == 0) {
        file.name = res.data.name;
        file.url = res.data.url;
        file.fileName = res.data.fileName;
      }
    },
    handleSuccess2(res, file) {
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
    handleBeforeUpload2() {
      const check = this.uploadList2.length < 1;
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
        {
          url: row.detail.announcementDocument.url,
          fileName: row.detail.announcementDocument.fileName,
          name: row.detail.announcementDocument.name || "历史文件",
        },
      ];
      this.defaultList2 = [
        {
          url: row.detail.biddingDocument.url,
          fileName: row.detail.biddingDocument.fileName,
          name: row.detail.biddingDocument.name || "历史文件",
        },
      ];
      this.modal = true;
    },
    getAnnouncement() {
      getAnnouncement().then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.announcements;
          this.tableDataMeta = JSON.parse(
            JSON.stringify(res.data.announcements)
          );
          this.loading = false;
        }
      });
    },
    postAnnouncement() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (
            !(this.$refs.upload.fileList[0] || this.$refs.upload2.fileList[0])
          ) {
            this.$Message.error("未上传文件！");
            return;
          }
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
              announcementDocument: {
                url: this.$refs.upload.fileList[0].url,
                fileName: this.$refs.upload.fileList[0].fileName,
                name: this.$refs.upload.fileList[0].name,
                businessType: "biddingDocument",
              },
              biddingDocument: {
                url: this.$refs.upload2.fileList[0].url,
                fileName: this.$refs.upload2.fileList[0].fileName,
                name: this.$refs.upload2.fileList[0].name,
                businessType: "announcement",
              },
            },
            ...temp,
          }).then((res) => {
            if (res.code == 0) {
              this.$Message.success("添加成功！");
              this.getAnnouncement();
              this.formItem = {
                code: "",
                name: "",
                type: "",
                startTime: "",
                endTime: "",
                time: "",
              };
              this.uploadList = [];
              this.uploadList2 = [];
              this.$refs.upload.clearFiles();
              this.$refs.upload2.clearFiles();
            } else {
              this.$Message.error(res.message);
            }
          });
        } else {
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
