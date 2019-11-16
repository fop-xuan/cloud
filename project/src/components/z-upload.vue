<template>
    <div class="upload">
        <label for="uploadBtn" class="uploadBtn"> <i class="icon"></i>上传</label>
        <input type="file" id="uploadBtn" hidden="hidden" @change='fileChange'>
    </div>
</template>
<script>
export default {
    props: {
        beforeUpload: {
            type: Function,
            default() {
                return true
            }
        }
    },
    data() {
        return {
            fileInfo: {}
        }
    },
    methods: {
        async fileChange(e) {
            if (!e.target.files.length) {
                this.cancel()
            } else {
                this.fileInfo.file = e.target.files[0]
                const isUpload = this.beforeUpload(e.target.files[0])
                if (isUpload) {
                    this.upload(e.target.files[0])
                }
            }
        },
        cancel() {
            this.$emit('cancel-upload')
        },
        upload(file) {
            this.$emit('upload', file)
        }
    }
}
</script>
<style lang="less">
    .upload{
        float: left;
        margin-left: 50px;
        .uploadBtn{
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .icon{
                margin-right: 5px;
                width: 24px;
                height: 24px;
                background: url(../assets/images/svg/icon-upload-s.svg);
            }
            &:hover{
                background-color: #2977ea;
            }
            cursor: pointer;
            width: 96px;
            height: 34px;
            background-color: #2980ff;
            color: #fff;
            font-size: 14px;
        }
    }
</style>
