<template>
    <div class="pag-wrap" v-if="totalLen > 7">
        <span class="pag-btn pag-left" @click="computeIndex('reduce')" :class="{'pag-prohibit': curPage === 1}">
          <
        </span>
        <div class="pag-content">
          <ul class="pag-list">
              <li class="pag-item" v-for="page in pages" :key="page" :class="{'pag-active': curPage === page }" @click="changeIndex(page)">
                  {{page}}
              </li>
          </ul>
        </div>
        <span class="pag-btn pag-right" @click="computeIndex('add')" :class="{'pag-prohibit': curPage === pages.length}">
          >
        </span>
    </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    totalLen: Number
  },
  data () {
    return {
      totalCount: 7,
      curPage: 1
    }
  },
  computed: {
    // 只显示5页 ，每页显示8条数据, 显示的页面
    pages () {
        let len = Math.ceil(this.totalLen / this.totalCount)
        let result = []
        for(let i = 0; i<len;i++) {
          result.push(i+1)
        }
        return result
    }
  },
  methods: {
    changeIndex (index) {
      this.curPage = index
      this.$emit('changeList', this.curPage)
    },
    computeIndex (type) {
      if (type === 'add') {
          this.curPage = this.curPage < this.pages.length ? this.curPage + 1 : this.curPage
      } else {
          this.curPage = this.curPage >1 ? this.curPage - 1 : this.curPage
      }
      this.$emit('changeList', this.curPage)
    }
  }
}
</script>

<style lang="less" scoped>
.pag-active{
    color: #409EFF;
}
.pag-prohibit{
  cursor: not-allowed !important;
}
.pag-hover{
  &:hover{
    color: #409EFF;
  }
}
.pag-wrap{
    user-select: none;
    cursor: pointer;
    min-width: 120px;
    height: 30px;
    position: fixed;
    left: 50%;
    bottom: 40px;
   transform: translateX(-50%);
    line-height: 30px;
    z-index: 50;
    display: flex;
    .pag-content{
      font-size: 16px;
      flex: 1;
      .pag-list{
        width: 100%;
        height: 100%;
        display: flex;
        .pag-item{
          .pag-hover();
          flex: 1;
          justify-content: center;
          margin: 0 10px;
          padding: 0 3px;
        }
      }
    }
    .pag-btn{
      .pag-hover();
      font-size: 18px;
      padding: 0 10px;
      text-align: center;
      border: 1px solid  #DCDFE6;
    }
    .pag-left{
      margin-right: 5px;
    }
    .pag-right{
      margin-left: 5px;
    }
}
</style>
