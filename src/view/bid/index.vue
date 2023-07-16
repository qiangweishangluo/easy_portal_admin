<template>
  <div>
    <div class="search-con search-con-top">
      <Input clearable placeholder="搜索项目名称/编号" class="search-input" v-model="searchValue" />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
      <Button @click="deleteNode" class="search-btn" type="primary">
        <Icon type="create" />删除
      </Button>
    </div>
    <div>
      <Table :loading="loading" :columns="columns" ref="selection"
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
        <template #add="{ row, index }">
          <Button type="primary" @click="add(index)">澄清/二次报价</Button>
        </template>
        <template #file2="{ row, index }">
          <a v-if="row.file" :href="row.file[0].url">{{ row.file[0].name }}</a>
        </template>
      </Table>
      <Page :total="tableData ? tableData.length : 1" @on-change="changePage" />
    </div>
    <Modal v-model="modalForm" title="澄清/二次报价" :footer-hide="true" width="700">
      <Form ref="form" :model="formItem" :label-width="120">
        <FormItem label="专家建议">
          <Input v-model="formItem.advise" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="是否需要二次报价">
          <i-Switch v-model="formItem.isQuotedPrice" />
        </FormItem>
        <FormItem label="是否需要澄清文件">
          <i-Switch v-model="formItem.isNeedFile" />
        </FormItem>
        <div style="width: 100%;text-align: center;">
          <Button @click="ok" type="primary">保存
          </Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getBids, postClarification, postBidDelete } from "@/api/admin";

export default {
  components: {},
  data() {
    return {
      searchValue: "",
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          width: 120,
          title: "项目名称",
          key: "projectName",
        },
        {
          width: 120,
          title: "项目编号",
          key: "projectCode",
        },
        {
          width: 120,
          title: "投标人名称",
          key: "bidder",
        },
        {
          width: 120,
          title: "授权委托人名称",
          key: "consignor",
        },
        {
          width: 120,
          title: "委托人联系方式",
          key: "consignorphone",
        },
        {
          width: 120,
          title: "投标履约期限",
          key: "deadline",
        },
        {
          width: 120,
          title: "投标保障金金额",
          key: "earnestMoney",
        },
        {
          width: 120,
          title: "联系电话",
          key: "phone",
        },
        {
          width: 120,
          title: "投标报价",
          key: "quotedPrice",
        },
        {
          width: 120,
          title: "投标文件",
          slot: "file",
        },
        {
          width: 120,
          title: "签到状态",
          slot: "status",
        },
        {
          width: 120,
          title: "签到方式",
          slot: "decryptionMethod",
        },
        {
          width: 180,
          title: "解密时间",
          key: "signInTime",
        },
        {
          width: 120,
          title: "二次报价",
          key: "quotedPrice2",
        },
        {
          width: 120,
          title: "澄清文件",
          slot: "file2",
        },
        {
          width: 140,
          title: "澄清/二次报价",
          slot: "add",
          disable: true
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
        isQuotedPrice: false, isNeedFile: false
      },
      modalForm: false,
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
    deleteNode() {
      if (this.$refs.selection.getSelection().length == 0) {
        this.$Message.error("未选择！");
        return
      }
      let temp = []
      this.$refs.selection.getSelection().forEach((e) => {
        temp.push(e.id)
      })
      this.postBidDelete(temp)
    },
    postBidDelete(id) {
      // 删除
      postBidDelete({ ids: id }).then((res) => {
        if (res.code == 0) {
          this.getBids();
          this.$Message.success("删除成功！");
        }
      })
    },
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
        return (e.projectCode.includes(this.searchValue) || e?.projectName?.includes(this.searchValue))
      })
    },
    handleEdit(row, index) {
      console.log(row, index);
    },
    getBids() {
      getBids().then((res) => {
        if (res.code == 0) {
          let temp = res.data.bids;
          temp.forEach((e) => {
            if (e.clarification) {
              e.quotedPrice2 = e.clarification.quotedPrice
              e.file = e.clarification.files
            }
          })
          this.tableData = temp;
          this.tableDataMeta = temp;
          this.loading = false
        }
      });
    },
    postClarification(data) {
      postClarification(data).then((res) => {
        if (res.code == 0) {
          this.$Message.success('保存成功')
          this.modalForm = false
        }
      });
    },
    add(index) {
      // 修改二次报价
      this.formItem = this.tableData[index].clarification
      this.modalForm = true
    },
    ok() {
      this.postClarification({
        ...this.formItem,
        "detail": {
          ...this.formItem
        },
      })
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
