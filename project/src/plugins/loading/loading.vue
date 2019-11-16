<template>
    <div class="loading">
        <div class="warp">
            <div class="icon-warp"  ref='loadingWarp'>
                <span v-for='(item,index) in 8' :key='index'></span>
            </div>
            <div class="title">正在加载</div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
       const icons = this.$refs.loadingWarp.children
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.transform = 'rotate(' + i * 45 + 'deg)'
        }
    }
}
</script>
<style lang="less" scope>
    .loading{
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .4);
        display: flex;
        .warp{
            margin: auto;
            .title{
                margin-top: 10px;
            }
        }
        .icon-warp{
            width: 64px;
            height: 64px;
            position: relative;
            animation: move 2.5s infinite linear alternate;
            opacity: 0;
            span{
                position: absolute;
                width: 100%;
                height: 100%;
                &::before{
                    content: '';
                    display: block;
                    margin: 0 auto;
                    width: 15%;
                    height: 15%;
                    background-color: rgb(50, 50, 189);
                    border-radius: 50%;
                }
            }
        }
    }
    @keyframes move {
        0%{transform: rotate(0)}
        30%{ opacity: .5; }
        60%{opacity: .1;}
        80%{opacity: .5;}
        100%{transform: rotate(360deg);opacity: 1;}
    }
</style>
