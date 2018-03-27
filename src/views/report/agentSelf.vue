<template>
    <div class="agent_self">
        <Tit str="代理卡报表/用户明细表" />
        <div class="search_box">
            <span class="item"><el-input placeholder="合作商" v-model="cooperatorName" clearable /></span>
            <span class="item"><el-input placeholder="学生" v-model="studentName" clearable /></span>
            <span class="item"><el-input placeholder="学生手机号" v-model="studentMobile" clearable /></span>
            <span class="item">
                <el-select v-model="cooperatorLevel" clearable placeholder="合作商等级">
                    <el-option v-for="item in aCooperatorLevel" :key="item" :label="item" :value="item" />
                </el-select>
            </span>
            <span class="item">
                <el-button type="primary" @click="search">查询</el-button>
            </span>
            <span class="item">
                <el-button @click="reset">重置</el-button>
            </span>
        </div>
        <div class="content">
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading" >
                <el-table-column prop="cooperatorName" label="合作商" min-width="180" align="center" :fixed="showField('合作商')" v-if="showField('合作商')"/>
                <el-table-column prop="cooperatorLevel" label="合作商等级" min-width="180" align="center" v-if="showField('合作商等级')"/>
                <el-table-column prop="studentName" label="学生" min-width="180" align="center" v-if="showField('学生')"/>
                <el-table-column prop="studentMobile" label="学生手机号" min-width="180" align="center" v-if="showField('学生手机号')"/>
                <el-table-column prop="grade" label="年级" min-width="180" align="center" v-if="showField('年级')"/>
                <el-table-column prop="subject" label="科目" min-width="180" align="center" v-if="showField('科目')"/>
                <el-table-column prop="province" label="省份" min-width="180" align="center" v-if="showField('省份')"/>
                <el-table-column prop="city" label="城市" min-width="180" align="center" v-if="showField('城市')"/>

                <el-table-column prop="area" label="区县" min-width="180" align="center" v-if="showField('区县')"/>
                <el-table-column prop="registerTime" label="注册时间" min-width="200" align="center" v-if="showField('注册时间')">
                    <template slot-scope="scope">
                        <i class="el-icon-time" v-if="scope.row.registerTime" />
                        <span style="margin-left: 10px">{{ setTime(scope.row.registerTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cardCode" label="代理卡号" min-width="180" align="center" v-if="showField('代理卡号')"/>
                <el-table-column prop="activeTime" label="激活时间" min-width="200" align="center" v-if="showField('激活时间')">
                    <template slot-scope="scope">
                        <i class="el-icon-time" v-if="scope.row.activeTime" />
                        <span style="margin-left: 10px">{{ setTime(scope.row.activeTime) }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page_block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.pageNo"
            :page-sizes="[10, 20, 30]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getAgentCardUserDetailReportList } from '@/api/coorperation'
import Tit from '@/components/Tit'
import { parseTime } from '@/utils'
import { authField } from './common.js'
export default {
  name: 'oneToOneSelf',
//   computed: {
//     ...mapGetters([
//       'name',
//       'roles'
//     ])
//   },
  components: {
      Tit
  },
  data() {
      return {
          cooperatorName: '',
          studentName: '',
          studentMobile: '',
          cooperatorLevel: '',
          aCooperatorLevel:['全部','一级','二级'],
          page: {
              pageNo:1,
              pageSize: 10
          },
          total:0,
          tableData: [],
          loading: true
      }
  },
  methods: {
      search() {
          console.log(this.cooperatorName,'cooperatorName')
          this.loading = true
          const { pageNo, pageSize} = this.page
          let options = {
              studentMobile: this.studentMobile,
              studentName: this.studentName,
              cooperatorLevel:this.cooperatorLevel==='全部'?'':this.cooperatorLevel,
              cooperatorName: this.cooperatorName||'',
              pageNo,
              pageSize
          }
          console.log(options,'options')
          getAgentCardUserDetailReportList(options).then(res => {
                if(res.code === '0'){
                    this.tableData=res.data.elements||[]
                    this.total=res.data.totalElements
                }
                this.loading = false
            }
          ).catch( err=> console.log(err))
      },
      reset() {
          this.cooperatorName=''
          this.studentName=''
          this.studentMobile=''
          this.cooperatorLevel=''
          this.page={
              pageNo: 1,
              pageSize: 10
          }
          this.search()
      },
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.page.pageSize = val
          this.page.pageNo = 1
          this.search()
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page.pageNo = val
          this.search()
      },
      //  设置时间
   setTime( val ) {
            if(!val)return;
            return parseTime(val)
      },
      showField(field) {
          return authField(this.$store.state.auth.reportsField,'代理卡报表/用户明细表',field)
      }
  },
  mounted() {
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.agent_self{
    // padding: 20px;
    .search_box{
        .item{
            float: left;
            margin-right: 20px;
        }
        overflow: hidden;
    }
    .content{
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .page_block{
        text-align: center
    }
}
</style>
