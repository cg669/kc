<template>
  <div class="self">
      <Tit str="个人资料" />
      <div class="content">
          <p>
              <span class="inp">名称:</span>
              <span><el-input placeholder="请输入内容" :value="name" @input="inputName" :disabled="!isEdit"/></span>
              <span class="dd" v-if="boolLen">*字数不能少于1位且不大于10位</span>
          </p>
          <p>
              <span class="inp">手机号:</span>
              <span><el-input v-model="mobile" placeholder="请输入内容" disabled /></span>
          </p>
          <p v-if="!isEdit"><el-button type="primary" plain @click="isEdit=true">编辑</el-button></p>
          <p v-else >
              <el-button type="primary" plain @click="handleEdit" :disabled="boolLen">保存</el-button>
              <el-button plain @click="handleCancle">取消</el-button>
          </p>
      </div>
  </div>
</template>
<script>
import { modifyFirstName } from '@/api/user'
import { mapGetters } from 'vuex'
import Tit from '@/components/Tit'
export default {
  computed: {
    ...mapGetters([
      'name',
      'mobile'
    ])
  },
  data() {
      return {
          isEdit: false,
          modifyName : '',
          boolLen: false
      }
  },
  components: {
      Tit
  },
  methods: {
      inputName(val){
        console.log(val.length,'val')
        if(val.length>0&&val.length<10){
            this.boolLen = false
            this.modifyName = val
        }else{
            this.boolLen = true
        }
      },
      handleEdit() {
          const name = this.modifyName||this.name
          this.isEdit = false
          modifyFirstName({name}).then( res => {
              if(res.code === '0'){
                this.$store.dispatch('GetInfo')
                this.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success'
                })
              }
          }).catch( err=> console.log(err))
      },
      handleCancle() {
          this.isEdit = false
          this.$router.go(0)
      }
  }
}
</script>
<style lang="scss" scoped>
.self{
    padding: 20px;
}
.content{
    margin-top: 20px;
    p{
        overflow: hidden;
        line-height: 30px;
        span{
            float: left;
        }
        .inp{
            width: 80px;
        }
        .dd{
            margin-left: 20px;
            font-size: 12px;
            color: #e93d3d;
        }
    }
}
</style>

