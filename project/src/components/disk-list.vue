<template>
  <div class="disk-list">

    <!-- 列表 -->
    <div class="type-list" v-if="targetType==='list'">
      <div class="list-header common-link">
        <div class="noSelect">
          <div class="checkbox-btn active-hover left-float">
            <div class="checkbox-warp left-float">
              <i class="ischeckbox checkbox" @click='toggleSelectAll' :class="{'checkbox-cur':isselectAll}"></i>
            </div>
            <div class="names left-float down">
              <span>名称</span>
              <img src="../assets/images/svg/icon-sort.svg" alt="名称排序">
            </div>
          </div>
          <div class="postTime active-hover left-float">
            <span>上次修改时间</span>
            <img src="../assets/images/svg/icon-sort.svg" alt="时间排序">
          </div>
          <div class="size left-float">
            <span>大小</span>
          </div>
        </div>
      </div>
      <div class="ul-wrap" v-move = "{changeList}">
        <ul class="list">
          <li class="item common-link active-hover" v-for='(item,index) in list' :key='index' :class="{'selected': item.isCheck}">
            <div class="checkbox-warp">
              <i class="ischeckbox checkbox" :class="{'checkbox-cur':item.isCheck}" @click.stop='selectOneFile(item._id)'></i>
            </div>
            <a :href="item.url" class="model" target="_blank">
              <video :src="item.url" class="model-show" v-if="item.type==='video'"></video>
              <img :src="item.type==='photo'?item.url:item.type==='audio'?audioIcon:TxtIcon" class="model-show" v-else>
              <span class="name">{{item.name}}</span>
            </a>
            <div class="time">{{setTime(item.time)}}</div>
            <div class="size">{{item.size}}</div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 缩略图 -->
    <div class="type-thumb" v-else>
      <div class="thumb-header active-hover common-link">
        <div class="checkbox-warp left-float">
           <i class="ischeckbox checkbox" @click='toggleSelectAll' :class="{'checkbox-cur': isselectAll}"></i>
        </div>
        <div class="names left-float down">
          <span>文件名</span>
          <img src="../assets/images/svg/icon-sort.svg" alt="名称排序">
        </div>
      </div>
      <div class="ul-wrap" ref="content"  v-move = "{changeList}">
        <ul class="thumb-list">
          <li class="thumb-item left-float active-hover" v-for='(item,index) in list' :key='index' :class="{'selected': item.isCheck}">
            <div class="inner">
              <div class="checkbox-warp">
                 <i class="ischeckbox checkbox" @click.stop="selectOneFile(item._id)" :class="{'checkbox-act': item.isCheck}"></i>
              </div>
              <div class="content-warp">
                <a :href="item.url" target="_blank" class="content">
                  <video :src="item.url" class="thumb-show" v-if="item.type==='video'"></video>
                  <img :src="item.type==='photo'?item.url:item.type==='audio'?bigaudioIcon:bigTxtIcon" class="thumb-show" v-else>
                  <a href="javascript:;">{{item.name}}</a>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
  props: {
    targetType: {
      type: String,
      default: 'list'
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      TxtIcon: require('../assets/images/svg/doctype/icon-nor-m.svg'),
      audioIcon: require('../assets/images/svg/doctype/icon-audio-m.svg'),
      bigTxtIcon: require('../assets/images/svg/doctype/icon-nor-l.svg'),
      bigaudioIcon: require('../assets/images/svg/doctype/icon-audio-l.svg')
    }
  },
  computed: {
    isselectAll() {
      if (this.list.length) {
        return this.list.every(file => file.isCheck)
      } else {
        return false
      }
    }
  },
  directives: {
    move: {
      componentUpdated (el, binding, vnode) {
        let Left = el.getBoundingClientRect().left
        let Top = el.getBoundingClientRect().top
        el.onmousedown = function (e) {
          let start = { x: e.clientX, y: e.clientY }
          let itemNodes = el.getElementsByTagName('li')
          let startScroll = el.scrollTop
          let SHeight = 0
          let isSelect = true
          let end = {}
          let mask = document.createElement('div')
          mask.style.cssText = 'position:absolute;width:0px;height:0px;border:1px solid rgba(255,255,255,.1);background-color: rgba(0,0,0,.1);z-index:100;display:none;'
          mask.className = 'mask'
          el.appendChild(mask)
          document.onmousemove = function (ev) {
            ev = ev || event
            end.x = ev.clientX
            end.y = ev.clientY
            if (isSelect) {
              if (mask.style.display === 'none') {
                mask.style.display = ''
              }

              SHeight = el.scrollTop
              mask.style.left = Math.min(end.x, start.x) - Left + 'px'
              mask.style.width = Math.abs(end.x - start.x) + 'px'
              mask.style.height = Math.abs(end.y - start.y) + Math.abs(SHeight - startScroll) + 'px'
              mask.style.top = end.y - start.y > 0 ? Math.min(end.y, start.y) - Top + startScroll + 'px' : Math.min(end.y, start.y) - Top + startScroll - Math.abs(SHeight - startScroll) + 'px'

              let ML = mask.offsetLeft
              let MT = mask.offsetTop
              let MW = mask.offsetWidth
              let MH = mask.offsetHeight

              if (itemNodes.length !== 0) {
                for (let i = 0; i < itemNodes.length; i++) {
                  let sl = itemNodes[i].offsetWidth + itemNodes[i].offsetLeft
                  let st = itemNodes[i].offsetHeight + itemNodes[i].offsetTop

                  if (sl > ML && st > MT && itemNodes[i].offsetLeft < ML + MW && itemNodes[i].offsetTop < MT + MH) {
                         binding.value.changeList(i, true)
                  } else {
                         binding.value.changeList(i, false)
                  }
                }
              }
            }
            return false
          }

          document.onmouseup = function () {
            if (mask) {
              el.removeChild(mask)
            }
            end = {}
            isSelect = false
            start = {}
            mask = null
            document.onmousedown = null
            document.onmousemove = null
          }
          return false
        }
      }
    }
  },
  methods: {
    changeList (i, bool) {
      this.list[i].isCheck = bool
    },
    setTime(time) {
      return moment(time).format('YYYY年MM月DD日')
    },
    toggleSelectAll() {
        if (this.isselectAll) {
          this.list.forEach(file => {
            file.isCheck = false
          })
        } else {
          this.list.forEach(file => {
            file.isCheck = true
          })
        }
    },
    selectOneFile(_id) {
      const index = this.list.findIndex(file => file._id === _id)
      this.list[index].isCheck = !this.list[index].isCheck
    }
  }
}
</script>
<style lang="less" scope>
  .selected{
    background-color: #D6DFF7 !important;
  }
  .left-float{
    float: left;
  }
  .down{
    img{
      transform: rotate(0deg)!important;
    }
  }
  .active-hover{
    &:hover{
      background-color: #f4f4f4;
      .ischeckbox{
        visibility: visible;
      }
    }
  }
  .common-link{
    position: relative;
    &:after{
      content: '';
      position: absolute;
      left: 38px;
      right: 0px;
      bottom: 0;
      height: 1px;
      background: #f1f2f4;
    }
  }
  .ul-wrap{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow:scroll;
    overflow-x: hidden;
    margin-top: 48px;
  }
  .list-header,.thumb-header{
    font-size: 13px;
    margin-left: 12px;
    height: 40px;
    line-height: 40px;
  }
  .disk-list{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin-top: 115px;
    .list,.thumb-list{
      &::after{
        content: '';
        display: block;
        clear: both;
      }
    }
  }
  .checkbox-warp{
    display: flex;
    width: 38px;
    height: 100%;
  }
  .ischeckbox{
    // visibility: hidden;
    width: 18px;
    height: 18px;
    margin: auto;
    background: url('../assets/images/svg/icon-checkbox.svg');
    &:hover{
      background: url('../assets/images/svg/icon-checkbox-hover.svg');
    }
    &.checkbox-act{
      background: url('../assets/images/svg/icon-checkbox-act.svg');
    }
    &.checkbox-cur{
      background: url('../assets/images/svg/icon-checkbox-cur.svg');
    }
  }
  .noSelect{
    height: 100%;
    .checkbox-btn{
      height: 100%;
      cursor: pointer;
      width: 50%;
    }
  }
  .postTime,.names{
    position: relative;
    img{
      position: absolute;
      top: 50%;
      margin-top: -7px;
      transform: rotate(180deg);
    }
  }
  .names{
    font-weight: 600;
    img{
      left: 30px;
    }
  }
  .postTime{
    width: 30%;
    cursor: pointer;
    img{
      left: 85px;
    }
  }
  .list{
    font-size: 13px;
    margin-left: 12px;
    .item{
      height: 56px;
      line-height: 56px;
      >div{
        float: left;
      }
      .model{
        float: left;
        width: 50%;
        display: flex;
        justify-items: center;
        .model-show{
          display: block;
          width: 40px;
          height: 56px;
          cursor: pointer;
        }
        .name{
          cursor: pointer;
          margin-left: 20px;
        }
      }
      .time{
        margin-left: -30px;
        width: 30%;
      }
    }
  }
  .thumb-header{
    .names{
      cursor: pointer;
      img{
        left: 42px;
      }
    }
  }
  .thumb-list{
    padding-left: 50px;
    padding-top: 12px;
    .thumb-item{
      margin-bottom: 10px;
      .inner{
        padding: 15px 20px;
        .content-warp{
          .content{
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            .thumb-show{
              display: block;
              width: 100%;
              height: 134px;
            }
            a{
              margin-top: 20px;
              font-size: 14px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              display: inline-block;
              width: 100%;
            }
          }
          width: 100%;
          height: 100%;
        }
        width: 120px;
        position: relative;
        .checkbox-warp{
          position: absolute;
          right: 0;
          top: 0;
          height: 38px;
          width: 38px;
        }
      }
    }
  }
</style>
