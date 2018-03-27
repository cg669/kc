<template>
    <div class="one_to_one_coor">
        <Tit str="一对一报表/合作商报表" />
        <div class="search_box">
            <span class="item"><el-input placeholder="合作商" v-model="cooperatorName" clearable /></span>
            <span class="item"><el-date-picker
            v-model="dateValue"
            type="daterange"
            :clearable="false"
            range-separator="-"
            format="yyyy年MM月dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期" 
            :picker-options="pickOption"
            @focus="dateValue=[];pickMin=''"
            @blur="setSearchDate"/></span>
            <span class="item">
                <el-button type="primary" @click="search">查询</el-button>
            </span>
            <span class="item">
                <el-button @click="reset">重置</el-button>
            </span>
        </div>
        <div class="content">
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="cooperatorName" label="合作商" min-width="180" align="center" v-if="showField('合作商')"/>
                <el-table-column prop="cooperatorLevel" label="合作商等级" min-width="180" align="center" v-if="showField('合作商等级')"/>
                <el-table-column prop="appointmentNum" label="预约人数" min-width="180" align="center" v-if="showField('预约人数')"/>
                <el-table-column prop="lessonNum" label="排课人数" min-width="180" align="center" v-if="showField('排课人数')"/>
                <el-table-column prop="auditionNum" label="试听人数" min-width="180" align="center" v-if="showField('试听人数')"/>
                <el-table-column prop="paidNum" label="付费人数" min-width="180" align="center" v-if="showField('付费人数')"/>
                <el-table-column prop="money" label="付费金额" min-width="180" align="center" v-if="showField('付费金额')"/>
                <el-table-column prop="newPaidNum" label="新签付费数" min-width="180" align="center" v-if="showField('新签付费数')"/>
                <el-table-column prop="newMoney" label="新签付费金额" min-width="180" align="center" v-if="showField('新签付费金额')"/>
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
import { getOneToOneCooperatorReportList } from '@/api/coorperation'
import Tit from '@/components/Tit'
import { parseTime } from '@/utils'
import { authField } from './common.js'

export default {
  name: 'oneToOneCoor',
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
          loading: true,
          pickMin: '',
          pickOption: {
                onPick:({ maxDate, minDate }) => {
                    // console.log(maxDate , 'max')
                    // console.log(minDate , 'min')
                    this.pickMin = minDate
                },
                disabledDate: (time) => {
                    let beginDateVal = this.pickMin;
                    if (beginDateVal) {
                        return time.getTime() > (beginDateVal.getTime() + 3600 * 1000 * 24 * 60);
                    }
                }
          }
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
          getOneToOneCooperatorReportList(options).then(res => {
                if(res.code === '0'){
                    this.tableData=res.data.elements
                    this.total=res.data.totalElements
                }
                this.loading = false
            }
          ).catch( err=> console.log(err))
      },
      setSearchDate() {
          if(!this.dateValue||!this.dateValue[0]){
              let nowTime = new Date().getTime()
              this.dateValue = [parseTime(nowTime,'{y}-{m}-{d}'),parseTime(nowTime,'{y}-{m}-{d}')]
          }
      },
      reset() {
          let nowTime = new Date().getTime()
          this.cooperatorName=''
          this.dateValue = [parseTime(nowTime,'{y}-{m}-{d}'),parseTime(nowTime,'{y}-{m}-{d}')]
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
          return authField(this.$store.state.auth.reportsField,'一对一报表/合作商报表',field)
      }
  },
  mounted() {
    // const secondary = this.$store.state.user.secondary //  是否是二级合作商
    // const limit = this.$store.state.user.limit //  是否显示
    // if(limit.indexOf(1) < 0){
    //     this.$router.push({ path: '/count/agent/agentFriendChart' })
    // }
    // if(secondary){
    //     this.$router.push({ path: '/count/friendChart/selfChart' })
    // }
    this.setSearchDate()
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.one_to_one_coor{
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
