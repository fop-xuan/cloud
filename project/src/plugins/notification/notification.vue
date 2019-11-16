<template>
    <transition name='custom' mode="out-in">
        <div class="notification" v-if='isShow'>
            <div class="title">{{title}}</div>
            <div class="content">{{content}}</div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            title: '警告',
            content: '错误',
            isShow: false
        }
    }
}
</script>
<style lang="less">
    .custom-enter,.custom-leave-to{
        transform: translateX(300px);
    }
    .custom-enter-active,.custom-leave-active{
        transition: .7s;
    }
    .notification{
        box-sizing: border-box;
        padding: 8px;
        z-index: 555;
        position: absolute;
        right: 20px;
        top: 30px;
        width: 280px;
        box-shadow: 0 0 8px #666;
        background-color: #fff;
        border-radius: 5px;
        line-height: 30px;
        .title{
            font-weight: 600;
        }
        .content{
            color: #666;
            font-size: 14px;
        }
    }
</style>
