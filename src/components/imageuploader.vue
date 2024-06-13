<template>
    <div class="upload-box">
        <div class="upload-list">
            <div class="upload-item" v-for="(item, index) in uploadList" :key="index">
                <img :src="item.url" alt="" />
                <div class="mask">
                    <span class="iconfont icon-close" @click="deleteImage(index)"></span>
                </div>
            </div>
            <div class="upload-item action" v-if="uploadList.length < 9" @click="uploadImage">
                <span class="iconfont icon-upload"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ImageUploader",
    props: {
        images: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            uploadList: []
        };
    },
    watch: {
        images: {
            handler(val) {
                this.uploadList = val.map((url) => ({
                    url: url
                }));
            },
            immediate: true
        }
    },
    methods: {
        uploadImage() {
            //选择图片
            console.log("选择图片");
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.uploadList.push({
                        url: e.target.result,
                        file: file
                    });
                };
                reader.readAsDataURL(file);
            };
            input.click();
        },
        deleteImage(index) {
            this.uploadList.splice(index, 1);
        },
        getImages() {
            console.log(this.uploadList);
            return this.uploadList.map((item) => item.file||item.url);
        }
    }
};
</script>

<style lang="scss" scoped>
.upload-box {
    border-radius: 5px;
    border: 1px dotted #ccc;

    .upload-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .upload-item {
            cursor: pointer;
            width: 60px;
            height: 60px;
            border-radius: 5px;
            margin: 5px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfont {
                font-size: 25px;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 5px;
            }

            .mask {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 20px;
                display: none;
                border-radius: 5px;
            }

            &:hover .mask {
                display: flex;
            }
            &.action{
                border: 1px dotted #ccc;
            }
            &:hover.action {
                border-color: #002299;
                color: #002299;
            }
        }
    }
}</style>