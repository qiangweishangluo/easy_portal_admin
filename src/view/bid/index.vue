<template>
  <div>
    <div class="search-con search-con-top">
      <Input clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
    </div>
    <Table :columns="columns" :data="tableData">
      <!-- <template #action="{ row, index }">
        <Button @click="handleEdit(row, index)">编辑</Button>
      </template> -->
      <template #file="{ row, index }">
        <a v-if="row.files" :href="row.files[0].url">{{ row.files[0].fileName }}</a>
      </template>
      <template #status="{ row, index }">
        <div>{{ turnStatus(row.status) }}</div>
      </template>
    </Table>
  </div>
</template>
<script>
import { getBids } from "@/api/admin";

export default {
  components: {},
  data() {
    return {
      searchValue: "",
      columns: [
        {
          title: "投标人名称",
          key: "bidder",
        },
        {
          title: "授权委托人名称",
          key: "consignor",
        },
        {
          title: "委托人联系方式",
          key: "consignorphone",
        },
        {
          title: "投标履约期限",
          key: "deadline",
        },
        {
          title: "投标保障金金额",
          key: "earnestMoney",
        },
        {
          title: "联系电话",
          key: "phone",
        },
        {
          title: "投标报价",
          key: "quotedPrice",
        },
        {
          title: "投标文件",
          slot: "file",
        },
        {
          title: "签到状态",
          slot: "status",
        },
        {
          title: "签到方式",
          slot: "status",
        },
        {
          title: "解密时间",
          key: "signInTime",
        },
        // {
        //   title: "操作",
        //   slot: "action",
        // },
      ],
      // data: [],
      tableData: [],
      modal: false,
      formItem: {
        code: "",
        name: "",
        type: "",
        startTime: "",
        endTime: "",
        time: "",
      },
      uploadList: [],
      id: 0,
      modalKey: false,
    };
  },
  created() {
    this.getBids(); // 获取投标
  },
  mounted() {
    // this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    turnStatus(data) {
      console.log(data);
      return data == 0 ? '未签到' : '已签到'
    },
    handleSearch() { },
    handleEdit(row, index) {
      console.log(row, index);
    },
    getBids() {
      getBids().then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.bids;
        }
      });
    },
    ok() {
    },
    cancel() {
      // this.$Message.info('Clicked ok');
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
