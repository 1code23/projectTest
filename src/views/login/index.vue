<template>
  <div class="login-container">
    <!-- http://192.168.48.159:8080/ -->
    <!-- https://swx97.gitee.io/#/case/particleXG -->
    <iframe id="iframe" src="https://swx97.gitee.io/#/case/particleXG" />
    <div class="login-block">
      <div class="login-title">
        <p class="zh">{{ loginTitle }}</p>
        <p class="en">Background management</p>
      </div>
      <div class="login-input">
        <span class="label">
          <i class="el-icon-user" />
        </span>
        <input
          v-model="loginForm.account"
          type="text"
          placeholder="请输入账号"
        >
      </div>
      <div class="login-input">
        <span class="label">
          <i class="el-icon-lock" />
        </span>
        <input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter="handleLogin"
        >
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </div>
      <el-row type="flex" justify="center">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin: 30px auto"
          @click.native.prevent="handleLogin"
        >登 录</el-button>
      </el-row>
      <div class="btm-hint">
        <span @click="forgotPasswordShow = true">忘记密码</span>
      </div>
    </div>
    <!-- <ForgotPassword :isShow.sync="forgotPasswordShow" :row="loginForm" /> -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      forgotPasswordShow: false
    }
  },
  // components: { ForgotPassword },
  computed: {
    loginTitle() {
      return '后台管理'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      const { account, password } = this.loginForm
      if (!account) {
        this.$message.warning('请输入账号')
        return false
      }
      if (!password) {
        this.$message.warning('请输入密码')
        return false
      }
      this.loading = true
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #409eff;
#iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  left: -15vw;
  top: -8vh;
}
.login-container {
  background: #f8f8f8;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .login-block {
    // background: white;
    box-sizing: border-box;
    padding: 50px;
    width: 450px;
    min-height: 500px;
    position: absolute;
    left: 50vw;
    top: 20vh;
    .login-title {
      margin-bottom: 50px;
      p {
        text-align: center;
      }
      .zh {
        font-weight: bold;
        font-size: 24px;
        color: #5a5a5a;
        margin-bottom: 10px;
        letter-spacing: 0.1rem;
      }
      .en {
        margin: 0;
        text-transform: uppercase;
        color: #ccc;
        letter-spacing: 0.3rem;
        font-size: 13px;
      }
    }
    .login-input {
      // width: 300px;
      margin: 0 auto;
      position: relative;
      margin-bottom: 20px;
      input {
        line-height: 25px;
        background: transparent;
        padding: 5px;
        padding-left: 30px;
        outline: none;
        border: none;
        border-bottom: 1px solid #d6d6d6;
        width: 100%;
        color: #494949;
        font-weight: 200;
        letter-spacing: 0.1rem;
      }
      .label {
        position: absolute;
        left: 0;
        top: 8px;
        i {
          font-size: 20px;
          // font-weight: bold;
          color: $color;
        }
      }
      .show-pwd {
        color: #acacac;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 8px;
      }
    }
    .btm-hint {
      font-size: 13px;
      color: $color;
      user-select: none;
      text-align: right;
      span:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
