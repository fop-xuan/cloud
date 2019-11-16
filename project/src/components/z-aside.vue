<template>
   <aside id="aside">
        <a href="/" class="logo"><img src="../assets/images/svg/logo-v2.svg" alt="腾讯微云"></a>
        <div class="serach">
            <div class="warp" :class="{'isWhite':bg}">
                <img class="icon" src="../assets/images/svg/icon-search.svg" alt="搜索">
                <input type="text" placeholder="搜索全部"  @focus="changBg" @blur="changBg" v-model="serachValue">
            </div>
        </div>
        <ul class="list">
            <router-link
            exact
            v-for='(nav,index) of staticList'
            :key="index"
            :to="{name:'disk', params:{type:nav.type}}"
            tag="li"
            >
                <i><img :src="$route.params.type==nav.type?nav.activeIcon:nav.icon" :alt="nav.title"></i>
                <a>{{nav.title}}</a>
            </router-link>
        </ul>
   </aside>
</template>
<script>
const staticList = [
    {
        title: '全部',
        icon: require('../assets/images/svg/icon-all.svg'),
        activeIcon: require('../assets/images/svg/icon-all-act.svg')
    },
    {
        title: '文档',
        type: 'doc',
        icon: require('../assets/images/svg/icon-doc.svg'),
        activeIcon: require('../assets/images/svg/icon-doc-act.svg')
    },
    {
        title: '图片',
        type: 'photo',
        icon: require('../assets/images/svg/icon-pic.svg'),
        activeIcon: require('../assets/images/svg/icon-pic-act.svg')
    },
    {
        title: '视频',
        type: 'video',
        icon: require('../assets/images/svg/icon-video.svg'),
        activeIcon: require('../assets/images/svg/icon-video-act.svg')
    },
    {
         title: '音频',
        type: 'audio',
        icon: require('../assets/images/svg/icon-music.svg'),
        activeIcon: require('../assets/images/svg/icon-music-act.svg')
    }
]
export default {
    data() {
        return {
            staticList,
            serachValue: '',
            bg: false
        }
    },
    methods: {
        changBg() {
            this.bg = !this.bg
        }
    }
}
</script>
<style lang="less" scope>
    #aside{
        height: 100vh;
        width: 240px;
        background-color: #f4f4f4;
        .logo{
            display: block;
            margin: 14px 0 0 24px;
        }
        .serach{
            position: relative;
            text-align: center;
            margin: 30px 24px 0;
            .warp{
                &.isWhite{
                    background-color: #fff;
                    box-shadow: 0 0 1px #888
                }
                .icon{
                    position: absolute;
                    top: 50%;
                    left:10px;
                    margin-top: -12px;
                }
                width: 100%;
                background-color: #e8e8e8;
                height: 36px;
                input{
                    font-size: 14px;
                    background-color: transparent;
                    height: 100%;
                    padding-left: 45px;
                    width: 100%;
                    box-sizing: border-box;
                    &::-webkit-input-placeholder{
                        color: #888;
                    }
                }
            }
        }
        .list{
            margin: 50px 0;
            padding: 25px 0;
            position: relative;
            &::before{
                top: 0;
            }
            &:after{
                bottom: 0;
            }
            &:after,&::before{
                left: 50%;
                margin-left: -90px;
                content: '';
                position: absolute;
                width: 180px;
                height: 1px;
                background-color: #e5e5e5;
            }
            .active-link{
                &::before{
                    content: '';
                }
                a{
                    color: #2980ff;
                    font-weight: 600;
                }
            }
            li{
                &::before{
                    position: absolute;
                    width: 3px;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    background-color: #2980ff;
                }
                position: relative;
                &:hover{
                    background-color: #eaeaea;
                    transition: .2s background-color;
                }
                padding: 10px 0 10px 30px;
                a{
                    margin-left: 10px;
                   font-size: 15px;
                   vertical-align: middle
                }
            }
        }
    }
</style>
