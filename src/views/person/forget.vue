<template>
  <div class="forget">
      <Tit str="修改密码" />
      <div class="content" v-if="!hasChangePsd">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码:" prop="oldPassword">
                <el-input v-model="ruleForm.oldPassword" auto-complete="off" placeholder="输入原有密码" ></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPassword">
                <el-input v-model="ruleForm.newPassword" auto-complete="off" placeholder="由6位以上的数字和字母组成"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码:" prop="confirmPassword">
                <el-input v-model="ruleForm.confirmPassword" auto-complete="off"  placeholder="重新输入新密码" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
         </el-form>
      </div>
      <div class="content" v-if="hasChangePsd">
          <p>密码修改成功，3s后返回登录页面...</p>
          <el-button @click="handleLogin" type="primary">立即重新登录</el-button>
      </div>
  </div>
</template>
<script>
import { modifyPassword } from '@/api/user'
import { mapGetters } from 'vuex'
import Tit from '@/components/Tit'
export default {
  data() {
      var validateNesPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(value)){
            callback(new Error('新密码需由6位以上的数字和字母组成'));
        } else {
          if (this.ruleForm.confirmPassword !== '') {
            this.$refs.ruleForm.validateField('confirmPassword');
          }
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
          hasChangePsd: false,
          ruleForm: {
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
          },
          rules: {
            oldPassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
            newPassword: [
                { validator: validateNesPass, trigger: 'blur'  }
            ],
            confirmPassword: [{ validator: validatePass, trigger: 'blur' }]
          }
      }
  },
  components: {
      Tit
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
            modifyPassword(this.ruleForm).then( res => {
                if(res.code === '0'){
                    this.hasChangePsd = true
                    setTimeout(() => {
                        this.$store.dispatch('LogOut').then(() => {
                            location.reload() // 为了重新实例化vue-router对象 避免bug
                        })
                    }, 3000)
                }
            }).catch( err=> console.log(err))
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleLogin() {
        this.$store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
  }
}
</script>
<style lang="scss" scoped>
.forget{
    padding: 20px;
}
.content{
    margin-top: 20px;
    .demo-ruleForm{
        width: 400px;
    }
}
</style>

