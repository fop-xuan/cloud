<template>
    <div class="sss">
        <z-aside></z-aside>
        <main id="main">
            <main-header @updataList='updataList' :userInfo='userInfo'/>
            <div class="content">
                <div class="top">
                    <div class="left">全部</div>
                    <div class="right">
                        <span @click="targetType='list'">
                            <i>
                                <img
                                :src="targetType==='list'?listIconAct:listIcon"
                                alt="列表">
                            </i>
                            <em>列表</em>
                        </span>
                        <span @click="targetType='thumb'">
                             <i>
                                <img
                                :src="targetType==='thumb'?thumbIconAct:thumbIcon"
                                alt="缩略图">
                            </i>
                            <em>缩略图</em>
                        </span>
                    </div>
                </div>
                <disk-list :targetType='targetType' :list='list'></disk-list>
            </div>
        </main>
        <Pagination @changeList="changeList"  :totalLen="totalLen"/>
    </div>
</template>
<script>
import Pagination from '../components/pagination'
import { getCookie } from '../common/Cookie'
import zAside from '../components/z-aside'
import diskList from '../components/disk-list'
import mainHeader from '../components/main-header'
import { getFileList, deleteQiniuData, deleteCloudFile } from '../api'
export default {
    provide() {
        return {
            disk: this
        }
    },
    data() {
        return {
            targetType: 'list',
            listIcon: require('../assets/images/svg/icon-mode-list.svg'),
            listIconAct: require('../assets/images/svg/icon-mode-list-act.svg'),
            thumbIcon: require('../assets/images/svg/icon-mode-thumb.svg'),
            thumbIconAct: require('../assets/images/svg/icon-mode-thumb-act.svg'),
            list: [],
            totalLen: 0
        }
    },
    computed: {
        userInfo() {
            return JSON.parse(sessionStorage.getItem('userInfo'))
        }
    },
    beforeRouteEnter (to, from, next) {
      const id = getCookie('userid')
      if (!id) {
        next('/login')
      } else {
        next()
      }
    },
    created() {
        this.getlist()
    },
    watch: {
        $route() {
            this.getlist()
        }
    },
    methods: {
        async getlist(changeIndex = 1) {
            const { type } = this.$route.params
            const { code, data, totalLen } = await getFileList({
                type,
                changeIndex,
                userId: this.userInfo.id
            })
            if (code) {
                if (data.length) {
                    data.forEach(item => {
                        item.isCheck = false
                    })
                }
                this.list = data
                this.totalLen = totalLen
            }
        },
        updataList(data) {
            data.isCheck = false
            this.list.push(data)
        },
        async deleteFile() {
            await this.$showLoading()
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].isCheck === true) {
                    const key = this.list[i].key
                    const { code } = await deleteQiniuData({ key })
                    if (!code) {
                        this.$showNotify({
                            title: '错误',
                            content: '删除失败！'
                        })
                        this.$removeLoading()
                        return
                    }
                    const data = await deleteCloudFile({ key })
                    if (data.code) {
                        this.list.splice(i, 1)
                        i--
                    }
                }
            }
            this.$removeLoading()
        },
        changeList(changeIndex) {
          this.getlist(changeIndex)
        }
    },
    components: {
        Pagination,
        diskList,
        zAside,
        mainHeader
    }
}
</script>
<style lang="less" scope>
    .sss{
        display: flex;
        #main{
            flex: 1;
            position: relative;
        }
    }
   .content{
       .top{
           height: 48px;
           padding:  0 60px 0 50px;
           span{
               display: inline-block;
               position: relative;
               em{
                   display: block;
                   font-style: normal;
                   font-size: 11px;
                   position: absolute;
                   bottom: -25px;
                   display: none;
                   left: 6px;
                   padding: 0 5px;
                   width: 26px;
                   height: 20px;
                   color: #fff;
                   background-color: rgba(0, 0, 0, .7);
                   border-radius: 2px;
                   text-align: center;
                   line-height: 20px;
               }
           }
           i{
               &:hover{
                   background-color: #f4f4f4;
                   &+em{
                       display: block;
                   }
               }
            width: 36px;
            height: 34px;
            margin: 5px;
            float: left;
            position: relative;
            img{
                position: absolute;
                left: 50%;
                top:50%;
                margin: -12px 0 0 -12px;
            }
           }
           .left{
               line-height: 48px;
               float: left;
               font-size: 14px;
               font-weight: 600;
           }
           .right{
               float: right;
           }
       }
   }
</style>
