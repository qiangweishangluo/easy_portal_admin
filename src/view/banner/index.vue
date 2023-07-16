
<template>
  <div class="admin">
    <upload :uploadConfig="uploadConfig" :list="list" @getBannerList="getBannerList" :key="flash"></upload>
    <Button type="primary" @click="postBanners">更新轮播</Button>
    <div v-if="checkAdmin()">
      <Form ref="form" :label-width="120">
        <FormItem label="用户名">
          <Input v-model="username" placeholder="请输入用户名" style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="密码">
          <Input v-model="pwi" placeholder="请输入密码" style="width: 300px;"></Input>
        </FormItem>
        <Button type="primary" @click="postAuthorizations">更新密码</Button>
      </Form>
    </div>
  </div>
</template>

<script>
import { getBanners, postBanners, postAuthorizations, getAuthorizations } from '@/api/admin'


import upload from './components/upload.vue'
export default {
  components: {
    upload
  },
  data() {
    return {
      uploadConfig: {
        businessType: 1
      },
      bannerList: [],
      id: 0,
      list: [],
      flash: false,
      username: "",
      pwi: ""
    }
  },
  created() {
    this.getBanners()   // 获取banner
    this.getAuthorizations()
  },
  methods: {
    checkAdmin() {
      return this.$cookies.get('user').split(',')[0].split(':')[1] == 'admin'
    },
    getBanners() {
      getBanners().then((res) => {
        if (res.code == 0) {
          this.id = res.data.id
          res.data.banners.forEach((res) => {
            res.name = res.fileName
          })
          this.list = res.data.banners
          this.flash = !this.flash
        }
      })
    },
    getAuthorizations() {
      getAuthorizations().then((res) => {
        if (res.code == 0) {
          this.pwi = res.data.authorizations[0].password
          this.username = res.data.authorizations[0].username
        }
      })
    },
    postAuthorizations() {
      postAuthorizations({
        "id": 1,
        "username": this.username,
        "password": this.pwi,
      }).then((res) => {
        if (res.code == 0) {
          this.$Message.success("修改成功！");
        }
      })
    },
    postBanners() {
      let temp = []
      this.bannerList.forEach((e) => {
        temp.push({
          "fileName": e.fileName,
          "content": e.content,
          "businessType": "banner"
        })
      })
      postBanners({
        "banners": {
          "id": this.id,
          "detail": temp,
          "type": "banner"
        }
      }).then((res) => {
        if (res.code == 0) {
          this.$Message.success("修改成功！");
        }
      })
    },
    getBannerList(data) {
      this.bannerList = data
    }
  }
}
</script>

<style></style>
