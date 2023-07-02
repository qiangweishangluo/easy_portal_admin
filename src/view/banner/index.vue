
<template>
  <div class="admin">
    <upload :uploadConfig="uploadConfig" :list="list" @getBannerList="getBannerList" :key="flash"></upload>
    <Button type="primary" @click="postBanners">更新轮播</Button>
  </div>
</template>

<script>
import { getBanners, postBanners } from '@/api/admin'

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
      flash: false
    }
  },
  created() {
    this.getBanners()   // 获取banner
  },
  methods: {
    getBanners() {
      getBanners().then((res) => {
        if (res.code == 0) {
          this.id = res.data.id
          res.data.banners.forEach((res) => {
            res.name = res.fileName
          })
          this.list = res.data.banners
          this.flash = !this.flash
          console.log(this.list);
        }
      })
    },
    postBanners() {
      let temp = []
      this.bannerList.forEach((e) => {
        temp.push({
          // "url": e.url.split("fileName=")[1],
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
        console.log(res);
      })
    },
    getBannerList(data) {
      this.bannerList = data
    }
  }
}
</script>

<style></style>
