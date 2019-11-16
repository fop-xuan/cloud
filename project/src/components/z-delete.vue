<template>
    <transition name='fade'>
        <div class="delete" v-show='isDelete'>
            <button @click='deleteHandle'>
                <i class="icon"></i>
                <span>删除</span>
            </button>
        </div>
    </transition>
</template>
<script>
export default {
    inject: {
        disk: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        isDelete() {
            return this.disk.list.some(file => file.isCheck)
        }
    },
    methods: {
        deleteHandle() {
           this.disk.deleteFile()
        }
    }
}
</script>
<style lang="less">
    .delete{
       float: left;
       margin-left: 100px;
        button{
            cursor: pointer;
            background-color: #d3d2d2;
            width: 96px;
            height: 34px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2px;
            .icon{
                margin-right: 5px;
                width: 24px;
                height: 24px;
                background: url(../assets/images/svg/icon-trash-nav.svg);
            }
            &:hover{
                background-color: #c5c2c2;
            }
        }
    }
    .fade-enter,.fade-leave-to{
        opacity: 0;
    }
    .fade-enter-active,.fade-leave-active{
        transition: .1s;
    }
</style>
