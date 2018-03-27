<template>
    <div class="card_log">
        <Tit str="提取记录" />
        <div class="search_box">
            <span class="item"><el-input placeholder="代理卡描述" v-model="cardName" clearable /></span>
            <span class="item">
                <el-date-picker
                v-model="createdAt"
                type="date"
                clearable
                value-format="yyyy-MM-dd"
                placeholder="选择日期" />
            </span>
            <span class="item">
                <el-button type="primary" @click="search">查询</el-button>
            </span>
            <span class="item">
                <el-button @click="reset">重置</el-button>
            </span>
        </div>
        <div class="content">
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading" @sort-change="handleSort">
                <el-table-column label="提取时间" min-width="180" align="center" sortable="custom" prop="created_at">
                    <template slot-scope="scope">
                        <i class="el-icon-time" v-if="scope.row.createdAt"></i>
                        <span style="margin-left: 10px">{{ setTime(scope.row.createdAt) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="代理卡描述" min-width="180" align="center" prop="cardName" /> 
                <el-table-column label="代理卡激活码" min-width="180" align="center" prop="activeCode" />
                <el-table-column label="备注" min-width="180" align="center" prop="mark" />
            </el-table>
        </div>
         <div class="page_block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.page"
            :page-sizes="[10, 20, 30]"
            :page-size="pageInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div> 
</template>
<script>
import { proxyCardExportLog } from '@/api/stock'
import { parseTime } from '@/utils'
import Tit from '@/components/Tit'
export default {
    data() {
        return {
            cardName: '',
            createdAt: '',
            pageInfo: {
                page: 1,
                size: 10
            },
            total:0,
            tableData: [],
            loading: true,
            sortType: '',
            sortField: ''
        }
    },
    components: {
        Tit
    },
    methods: {
        search() {
          console.log(this.cardName,'cardName')
          this.loading = true
          const { page, size} = this.pageInfo
          let options = {
              cardName: this.cardName||'',
              createdAt: this.createdAt||'',
              page,
              size,
              orderByProperty: this.sortField,
              orderByType: this.sortType
          }
          console.log(options,'options')
          proxyCardExportLog(options).then(res => {
                if(res.code === '0'){
                    this.tableData=res.data.elements
                    this.total=res.data.totalElements
                }
                this.loading = false
            }
          ).catch( err=> {
              console.log(err)
          })
      },
      reset() {
          this.cardName=''
          this.createdAt=''
          this.pageInfo= {
              page: 1,
              size: 10
          }
          this.sortType=''
          this.sortField=''
          this.search()
      },
      setTime(value) {
          if(!value){
              return ''
          }
          return parseTime(value)
      },
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageInfo.size = val
          this.pageInfo.page = 1
          this.search()
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pageInfo.page = val
          this.search()
      },
      handleSort(info) {
          const { order, prop } = info
          this.sortType = order&&(order.split('ending')[0]).toUpperCase()
          this.sortField = prop
          this.search()
      }
  },
  mounted() {
    this.search()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.card_log{
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
        .add_model{
            // margin-top: 10px;
            margin-bottom: 10px;
        }
    }
    .page_block{
        text-align: center
    }
}
</style>