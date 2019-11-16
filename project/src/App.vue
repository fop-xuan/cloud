<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { getCookie } from './common/Cookie'
import { getUserinfo } from './api'
export default {
    mounted () {
      this.toGetUserInfo()
    },
    methods: {
      async toGetUserInfo () {
        const id = getCookie('userid')
        if (id) {
          let res = await getUserinfo()
          if (res.code === 0) {
            const userInfo = {
              id: id,
              username: res.username
            }
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          }
        }
      }
    }
}
</script>
<style lang="less">
  #app{
    width: 100%;
    height: 100%;
  }
</style>
