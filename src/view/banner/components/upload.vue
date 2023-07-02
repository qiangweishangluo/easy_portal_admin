<template>
    <div>
        <div v-for="(item, index) in uploadList" :key="index" style="display: inline-block;">
            <template v-if="item.status === 'finished'">
                <div class="demo-upload-list">
                    <img :src="item.url" fit="cover" width="100%" height="100%" />
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click="handleView(item.name)"></Icon>
                        <Icon type="ios-trash-outline" @click="handleRemove(item)"></Icon>
                    </div>
                </div>
                <Input v-model="item.content" :maxlength="100" show-word-limit placeholder="图片简介" style="width: 200px" />
            </template>
            <template v-else>
                <div class="demo-upload-list">
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </div>
            </template>
        </div>
        <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess"
            :data="uploadConfig" :format="['jpg', 'jpeg', 'png']" :max-size="2048" :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag"
            action="/api/uploadSystemFile" style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
    </div>
</template>
<script>
export default {
    props: {
        uploadConfig: {
            type: Object,
            default: () => { }
        },
        list: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            defaultList: [
            ],
            imgName: '',
            visible: false,
            uploadList: [],
        }
    },
    watch: {
        uploadList: {
            handler(newData) {
                this.getBannerList(newData)
            }, deep: true, immediate: false
        }
    },
    methods: {
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            // 上传成功
            console.log(res);
            if (res.code == 0) {
                file.url = res.data.url;
                file.fileName = res.data.fileName;
                console.log(this.uploadList);
            }
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        },
        getBannerList(data) {
            this.$emit("getBannerList", data)
        }

    },
    created() {
        this.defaultList = this.list || [];
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>
<style>
.demo-upload-list {
    display: inline-block;
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
    padding-top: 69px;
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>