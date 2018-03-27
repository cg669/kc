<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form" >
      <h3 class="title">掌门1对1合作商</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="person" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="手机号" />
      </el-form-item>
      <el-form-item v-show="isForget" style="width:60%" prop="verifityCode">
          <span class="svg-container svg-container_login">
          <svg-icon icon-class="code" />
        </span>
        <el-input name="verifityCode" type="text" v-model="loginForm.verifityCode" autoComplete="on" placeholder="验证码" style="width:80%"/>
        <el-button type="primary" round style="height:100%;left:210px;position:absolute" @click.native.prevent="handleGetCode(loginForm.username)"  v-show="isForget" :disabled="checkPsd(loginForm.username)">
          {{codeTxt}}<span v-if="codeTxt !=='获取验证码'">s</span>
        </el-button>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="lock" />
        </span>
        <el-input name="password"  v-model="loginForm.password" autoComplete="on" :type="pwdType" placeholder="密码" @keyup.enter.native="handleEnter()"/>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eyei" /></span>
      </el-form-item>
      <el-form-item prop="confirmPassword" v-show="isForget">
        <span class="svg-container">
          <svg-icon icon-class="lock" />
        </span>
        <el-input name="password" v-model="loginForm.confirmPassword" autoComplete="on" placeholder="再次输入密码" />
      </el-form-item>
      <el-form-item style="margin-bottom:12px;">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin"  v-show="!isForget">
          登录
        </el-button>
        <el-button type="primary" style="width:100%;margin:0" :loading="loading" @click.native.prevent="handleForget" v-show="isForget">
          {{forgetTxt}}
        </el-button>
      </el-form-item>
      <el-form-item prop="rememberMe" class="remeber_me">
        <el-checkbox v-model="loginForm.rememberMe" v-show="!isForget">7天内自动登录</el-checkbox>
        <span class="forget" @click="handleCheckForget"  v-show="!isForget">忘记密码</span>
        <span class="forget" @click="handleCheckLogin"  v-show="isForget">登录</span>
      </el-form-item>
      <div class="tips">
        <svg-icon icon-class="copy" />版权归掌门1对1所有
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { sendVerifitionCode, forgetPassword } from '@/api/user'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(value)){
          if(!this.isForget){
            callback(new Error('密码需由6位以上的数字和字母组成'));
          }else{
            callback(new Error('新密码需由6位以上的数字和字母组成'));
          }
      } else {
        if (this.loginForm.confirmPassword !== ''&&this.isForget) {
          this.$refs.loginForm.validateField('confirmPassword');
        }
        callback();
      }
    }
    const validatePassAgain = (rule, value, callback) => {
      if(this.isForget){
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }else{
        callback();
      }
    }
    const validateCode = (rule, value, callback) => {
      if(this.isForget){
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if(!/^\d{6,}$/.test(value)){
          callback(new Error('验证码格式不正确'));
        }else {
          callback();
        }
      }else{
        callback();
      }
    }
    return {
      isForget: false,
      loginForm: {
        rememberMe: false,
        username: '',
        password: '',
        verifityCode: '',
        confirmPassword: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        verifityCode: [{ validator: validateCode, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        confirmPassword: [{ validator: validatePassAgain, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      timer: null,
      codeTxt: '获取验证码',
      forgetTxt: '确定'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    checkPsd(tel) {
      return !isvalidUsername(tel)
    },
    // 获取验证码
    handleGetCode(mobile) {
        console.log(mobile)
        sendVerifitionCode({
          mobile
        }).then( res=>{
            if(res && res.code==='0'){
              this.codeTxt = 60
              this.timer = setInterval(() => {
                if (this.codeTxt > 0 && this.codeTxt <= 60) {
                    this.codeTxt--
                } else {
                    this.codeTxt = '获取验证码'
                    clearInterval(this.timer)
                    this.timer = null
                }
              }, 1000)
            }
        })
    },
    //  更改密码
    handleForget() {
      const { username, password, verifityCode, confirmPassword} = this.loginForm
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          forgetPassword({
            confirmPassword, password, verifityCode, mobile:username
          }).then(res =>{
              if(res && res.code ==='0'){
                this.$message({
                  message: res.data,
                  type: 'success',
                  showClose: true,
                })
                this.loading = false
                this.forgetTxt = '登录成功，3s后返回登录界面...'
                this.timer = setTimeout(() => {
                  clearInterval(this.timer)
                  this.timer = null
                  this.forgetTxt = '确定'
                  location.reload()
                }, 3000)
              }
          }).catch(err => {
              console.log(err,'err')
              this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //  忘记密码
    handleCheckForget() {
      const phone = this.loginForm.username
      this.isForget = true
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.loginForm.verifityCode = ''
      this.loginForm.confirmPassword = ''
      this.$refs.loginForm.resetFields()
      this.loginForm.username = phone
    },
    handleEnter() {
      if(!this.isForget){
        this.handleLogin()
      }
    },
    //  去登录界面
    handleCheckLogin(){
      const phone = this.loginForm.username
      this.isForget = false
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.loginForm.verifityCode = ''
      this.loginForm.confirmPassword = ''
      this.$refs.loginForm.resetFields()
      this.loginForm.username = phone
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/home' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }  
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#eee;
  $dark_gray:#fff;
  $light_gray:#333333;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    overflow-y: auto;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
      -webkit-text-fill-color: #bbb !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      position: relative;
      text-align: center;
      font-size: 14px;
      color: #999;
      margin-bottom: 10px;
    }
    .forget{
      position: absolute;
      bottom: 0;right: 0;
      font-size: 14px;
      color: #2385EE;
      letter-spacing: -0.21px;
      cursor: pointer;
      text-decoration: underline;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      // color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 28px;
      letter-spacing: -0.42px;
      line-height: 28px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      // height: 480px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      border: 1px solid #ddd;
      background-color: #fff;
    }
    .el-form-item {
      background: #FFFFFF;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
      color: #BBB;
    }
    .remeber_me{
      // margin-left: 80px;
      // width: 100px;
      margin-bottom: 20px;
      height: 40px;
      font-size: 14px;
      color: #666666;
      letter-spacing: -0.21px;
      line-height: 14px;
      border: 0;
      .el-form-item__content{
        height: 40px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 30px;
      color: #bbb;
      cursor: pointer;
      user-select:none;
    }
  }
</style>
