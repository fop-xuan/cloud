<template>
  <div class="login-wrap">
    <div class="login-head">
      <div class="x-logo">
        <img src="../assets/images/logo@2x.png"  class="logo-icon" alt="">
      </div>
      <div class="x-list">
        <ul>
          <li class="x-item">
            <a href="javascript:;" class='active'>首页</a>
          </li>
          <li class="x-item">
            <a href="javascript:;">下载</a>
          </li>
          <li class="x-item">
            <a href="javascript:;">会员</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="system-title-left">
      <div class="system-content">
        <h1 class="system-title">腾讯微云</h1>
        <div class="detail">
          <h3>智能云盘</h3>
        </div>
      </div>
    </div>
    <div class="container-right">
      <div class="x-login-wrap">
        <div class="login-content">
          <h4 class="login-title">用户登录</h4>
          <div class="form-wrap">
            <form>
              <div class="input-box">
                <div class="input-wrap">
                  <input type="text" v-model="username" placeholder="用户名" v-vuerify="'username'">
                  <span  class="iconfont icon-cuo" v-if="errors['username']"></span>
                </div>
                <span class="error" v-if="errors['username']">{{errors['username']}}</span>
              </div>
              <div class="input-box">
                <div class="input-wrap">
                  <input type="password" v-model="password" placeholder="密码" v-vuerify="'password'">
                  <span  class="iconfont icon-cuo" v-if="errors['password']"></span>
                </div>
                <span class="error" v-if="errors['password']">{{errors['password']}}</span>
              </div>
              <div class="input-box input-padding">
                <div class="input-wrap">
                  <input type="password" v-model="conform" placeholder="确认密码" v-vuerify="'conform'">
                  <span  class="iconfont icon-cuo" v-if="errors['conform']"></span>
                </div>
                <span class="error" v-if="errors['conform']">{{errors['conform']}}</span>
              </div>
              <div class="btn-group">
                <button class="btn-submit" @click.prevent="handleSubmit">登录</button>
                <button class="btn-clear" @click.prevent="handleClear">重置</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCookie } from '../common/Cookie'
import { encrypt } from '../common/crypto'
import { login, getUserinfo } from '../api'
export default {
  name: 'x-login.vue',
  data() {
    return {
      username: '',
      password: '',
      conform: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    const id = getCookie('userid')
    if (!id) {
      next()
    } else {
      next('/disk')
    }
  },
  vuerify: {
    username: {
      required: true,
      test: /\w{1,}/,
      message: '用户名不能为空'
    },
    password: {
      test: /\w{2,}/,
      message: '密码至少2位'
    },
    conform: {
      required: true,
      test (val) {
        return val === this.password
      },
      message: '密码输入不一致'
    }
  },
  computed: {
    errors () {
      return this.$vuerify.$errors
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$vuerify.check()) {
        let data = {
          username: this.username,
          password: encrypt(this.password)
        }
        let result = await login(data)

        if (result.code === 0) {
          let res = await getUserinfo()
          if (res.code === 0) {
           const userInfo = {
              id: getCookie('userid'),
              username: res.username
            }
            window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          }
          this.$router.push('/disk')
        } else {
          this.$showNotify({
            title: result.msg,
            content: '请重新输入'
          })
        }
      }
    },
    handleClear () {
      this.$vuerify.clear()
    }
  }
}
</script>

<style lang="less">
  .login-wrap {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url("../assets/images/login-bg.jpg") no-repeat;
    filter: brightness(99%);
    background-size: cover;
    .login-head{
      width: 100%;
      height: 80px;
      background: rgba(0,0,0,.3);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      .x-logo{
        width: 174px;
        height: 80px;
        position: absolute;
        top: 0;
        left: 5%;
        line-height: 40px;
        .logo-icon{
          height: 40px;
          margin-top: 20px;
          display: block;
          width: 174px;
        }
      }
      .x-list{
        position: absolute;
        right: 2%;
        top: 0;
        width: 800px;
        height: 80px;
        font-size: 18px;
        ul {
          float: right;
          .x-item {
            float: left;
            a{
              display: inline-block;
              color: rgba(255,255,255,.9);
              padding: 0 50px;
              height: 80px;
              line-height: 80px;
            }
            .active {
              color: #2980ff;
            }
          }
        }
      }
    }
    .system-title-left{
      width: 50%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .system-content{
        position: absolute;
        right: 24%;
        top: 35%;
        width: 360px;
        height: 250px;
        color: rgba(255,255,255,.9);
        .system-title{
          color: rgba(255,255,255,.9);
          font-weight: 450;
          font-size: 80px;
        }
        .detail{
          h3{
            font-weight: 400;
            font-size: 36px;
            letter-spacing: 50px;
            width: 100%;
            line-height: 20px;
          }
        }
      }
    }
    .container-right{
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      .x-login-wrap{
        position: absolute;
        left: 15%;
        top: 30%;
        .login-content{
          background-color: #fff;
          width: 440px;
          height: 335px;
          .login-title{
            width: 100%;
            line-height: 50px;
            text-align: center;
            height: 50px;
            font-size: 18px;
            letter-spacing: 2px;
            color: #636363;
          }
          .form-wrap{
            width: 100%;
            height: 300px;
            .input-box{
              width: 100%;
              height: 65px;
              box-sizing: border-box;
              padding: 0 20px 5px 20px;
              .input-wrap{
                width: 90%;
                height: 38px;
                margin: 0 auto;
                position: relative;
                .iconfont{
                  position: absolute;
                  right: 5px;
                  top: 30%;
                  font-size: 18px;
                  color: #f56c6c;
                }
                input{
                  cursor: pointer;
                  display: block;
                  border-radius: 5px;
                  outline: none;
                  width: 100%;
                  height: 100%;
                  border: 1px solid #eee;
                  text-indent: 10px;
                  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
                  &:focus{
                    border: 1px solid #409eff;
                  }
                }
                .vuerify-invalid{
                  border: 1px solid #f56c6c;
                }
              }
              .error{
                margin: 0 auto;
                width: 90%;
                height: 25px;
                line-height: 25px;
                display: block;
                font-size: 12px;
                color: #f56c6c;
              }
            }
            .btn-group{
              width: 100%;
              height: 55px;
              box-sizing: border-box;
              text-align: center;
              .btn-submit,.btn-clear{
                width: 100px;
                height: 40px;
                line-height: 40px;
                outline: none;
                border: none;
                cursor: pointer;
                border-radius: 5px;
                font-size: 18px;
                color: #fff;
                background: #409eff;
              }
              .btn-clear{
                background: #aaa;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }

</style>
