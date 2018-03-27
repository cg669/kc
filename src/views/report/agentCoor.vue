<template>
    <div class="agent_coor">
        <Tit str="代理卡报表/合作商报表" />
        <div class="search_box">
            <span class="item"><el-input placeholder="合作商" v-model="cooperatorName" clearable /></span>
            <span class="item"><el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="-"
            format="yyyy年MM月dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期" /></span>
            <span class="item">
                <el-button type="primary" @click="search">查询</el-button>
            </span>
            <span class="item">
                <el-button @click="reset">重置</el-button>
            </span>
        </div>
        <div class="content">
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading" >
                <el-table-column prop="cooperatorName" label="合作商" min-width="180" align="center" v-if="showField('合作商')"/>
                <el-table-column prop="cooperatorLevel" label="合作商等级" min-width="180" align="center" v-if="showField('合作商等级')"/>
                <el-table-column prop="cardNum" label="代理卡数" min-width="180" align="center" v-if="showField('代理卡数')"/>
                <el-table-column prop="activeNum" label="激活量" min-width="180" align="center" v-if="showField('激活量')"/>
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
import { getAgentCardCooperatorReportList } from '@/api/coorperation'
import Tit from '@/components/Tit'
import { authField } from './common.js'

export default {
  name: 'agentCoor',
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
          dateValue: null,
          page: {
              pageNo: 1,
              pageSize: 10
          },
          total:0,
          tableData: [],
          loading: true
      }
  },
  methods: {
      search() {
          console.log(this.dateValue,'dateValue')
          console.log(this.cooperatorName,'cooperatorName')
          this.loading = true
          const { pageNo, pageSize} = this.page
          let options = {
              cooperatorName: this.cooperatorName||'',
              endTime: this.dateValue ? (this.dateValue[1]+' 23:59:59') : '',
              startTime: this.dateValue ? (this.dateValue[0]+' 00:00:00') : '',
              pageNo,
              pageSize
          }
          console.log(options,'options')
          getAgentCardCooperatorReportList(options).then(res => {
                if(res.code === '0'){
                    this.tableData=res.data.elements
                    this.total=res.data.totalElements
                }
                this.loading = false
            }
          ).catch( err=> console.log(err))
      },
      reset() {
          this.cooperatorName=''
          this.dateValue=null
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
      showField(field) {
          return authField(this.$store.state.auth.reportsField,'代理卡报表/合作商报表',field)
      }
  },
  mounted() {
    // const secondary = this.$store.state.user.secondary //  是否是二级合作商
    // const limit = this.$store.state.user.limit //  是否显示
    // if(limit.indexOf(0) < 0){
    //     this.$router.push({ path: '/count/class/report' })
    // }
    // if(secondary){
    //     this.$router.push({ path: '/count/agent/agentSelfCard' })
    // }
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.agent_coor{
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
