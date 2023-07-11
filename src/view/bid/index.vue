<template>
  <div>
    <div class="search-con search-con-top">
      <Input clearable placeholder="搜索投标人" class="search-input" v-model="searchValue" />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
    </div>
    <div>
      <Table :loading="loading" :columns="columns"
        :data="tableData ? tableData.slice((page - 1) * 10, (page - 1) * 10 + 10) : []">
        <!-- <template #action="{ row, index }">
        <Button @click="handleEdit(row, index)">编辑</Button>
      </template> -->
        <template #file="{ row, index }">
          <a v-if="row.files && row.downloadable" :href="row.files[0].url">{{ row.files[0].name || row.files[0].fileName
          }}</a>
          <div v-else>{{ row.files[0].name || row.files[0].fileName }}</div>
        </template>
        <template #status="{ row, index }">
          <div>{{ turnStatus(row.status) }}</div>
        </template>
        <template #decryptionMethod="{ row, index }">
          <div>{{ turnDecryptionMethod(row.decryptionMethod) }}</div>
        </template>
      </Table>
      <Page :total="tableData ? tableData.length : 1" @on-change="changePage" />
    </div>
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
          slot: "decryptionMethod",
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
      tableDataMeta: [],
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
      page: 1,
      loading: true,
    };
  },
  created() {
    this.getBids(); // 获取投标
  },
  mounted() {
    // this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    turnStatus(data) {
      return data == 0 ? '未签到' : '已签到'
    },
    turnDecryptionMethod(data) {
      return data == 1 ? '密码解密' : '--'
    },
    handleSearch() {
      this.tableData = this.tableDataMeta.filter((e) => {
        return (e.bidder.includes(this.searchValue))
      })
    },
    handleEdit(row, index) {
      console.log(row, index);
    },
    getBids() {
      getBids().then((res) => {
        if (res.code == 0) {
          this.tableData = res.data.bids;
          this.tableDataMeta = res.data.bids;
          this.loading = false
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

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
