<template>
    <header>
        <z-upload
        :before-upload="beforeUpload"
        @upload='upload'
        />
        <z-delete />
        <div class="user">
            <span class="username">{{userInfo.username}}</span>
            <span class="logout" @click="toLogout">退出登录</span>
        </div>
    </header>
</template>
<script>
import { removeCookie } from '../common/Cookie'
import zUpload from '../components/z-upload'
import zDelete from '../components/z-delete'
import { getToken, qiniuUpData, uploadStorageData, isUpload } from '../api'
export default {
    props: {
        userInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            fileInfo: {},
            qiniuaddr: 'http://pzx9nwvu0.bkt.clouddn.com' // 外链默认域名 现在测试一个月
        }
    },
    methods: {
        beforeUpload(file) {
            const fileType = file.type.split('/')[0]
            const fileTypeTest = /application|text|video|audio|image/
            const isUpload = fileTypeTest.test(fileType)
            const isLt20M = file.size / 1024 / 1024 < 20
            if (isUpload) {
                switch (fileType) {
                    case 'application' :
                        this.fileInfo.type = 'doc'
                        break
                    case 'text' :
                        this.fileInfo.type = 'doc'
                        break
                    case 'video' :
                        this.fileInfo.type = 'video'
                        break
                    case 'audio' :
                        this.fileInfo.type = 'audio'
                        break
                    case 'image' :
                        this.fileInfo.type = 'photo'
                        break
                    default :
                        this.fileInfo.type = null
                }
            }
            return isUpload && isLt20M
        },
        async upload(file) {
            if (!this.userInfo.id) {
                return
            }
            this.fileInfo.ascription = this.userInfo.id
            this.fileInfo.name = file.name.substring(0, file.name.lastIndexOf('.'))
            const keyname = this.fileInfo.ascription + '.' + this.fileInfo.name + '.' + this.fileInfo.type // 重命名要上传的文件
            try {
                this.$showLoading()
                const { token } = await getToken()
                const fileData = new FormData()
                fileData.append('file', file)
                fileData.append('token', token)
                fileData.append('key', keyname)

                const { key } = await qiniuUpData(fileData)
                this.fileInfo.key = key
                const info = await isUpload({ key })
                if (!info.code) {
                    this.$showNotify({
                        title: '上传失败',
                        content: '文件已经存在！'
                    })
                    this.$removeLoading()
                    return
                }
                this.fileInfo.url = this.qiniuaddr + '/' + key
                this.fileInfo.size = file.size / 1024 > 1000 ? Math.round(file.size / 1024 / 1024) + 'mb' : Math.round(file.size / 1024) + 'kb'
                await this.$removeLoading()
                this.afterUpload()
            } catch (err) {
                console.log(err)
            }
        },
        async afterUpload() {
            const { code } = await uploadStorageData(this.fileInfo)
            if (code) {
                this.$emit('updataList', this.getList())
            } else {
                this.$showNotify({
                    title: '上传失败',
                    content: '文件已经存在！'
                })
            }
        },
        getList() {
            const obj = {}
            for (let attr in this.fileInfo) {
                obj[attr] = this.fileInfo[attr]
            }
            return obj
        },
        async toLogout () {
          removeCookie('userid')
          window.sessionStorage.removeItem('username')
          this.$router.push('/login')
        }
    },
    components: {
        zUpload,
        zDelete
    }
}
</script>
<style lang="less" scope>
    header{
        height: 40px;
        border-bottom: 1px solid #d8dce5;
        padding: 15px 0 11px 0;
        line-height: 40px;
        .user{
            margin-right: 73px;
            float: right;
            font-size: 13px;
            .logout{
            margin-left: 5px;
            color: #666;
            cursor: pointer;
            }
        }
    }
</style>
