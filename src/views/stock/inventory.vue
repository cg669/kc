<template>
    <div class="card_inventory">
        <Tit str="代理卡提取" />
        <div class="search_box">
            <span class="item"><el-input placeholder="代理卡描述" v-model="cardName" clearable /></span>
            <span class="item">
                <el-date-picker
                v-model="payTime"
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
                <el-table-column label="创建时间" min-width="180" align="center" sortable="custom" prop="pay_time">
                    <template slot-scope="scope">
                        <i class="el-icon-time" v-if="scope.row.payTime"></i>
                        <span style="margin-left: 5px">{{ setTime(scope.row.payTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cardName" label="代理卡描述" min-width="140" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.cardName }}</span>
                        <!-- <el-tooltip class="item" effect="dark" placement="top-start">
                            <div slot="content">{{scope.row.cardName}}</div>
                            <i class="el-icon-info" v-if="scope.row.cardName"/>
                        </el-tooltip> -->
                    </template>
                </el-table-column>
                <el-table-column label="生效日期" min-width="180" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-time" v-if="scope.row.validityPeriodStart"></i>
                        <span style="margin-left: 5px" v-if="scope.row.validityPeriodStart">{{ setTime(scope.row.validityPeriodStart) }}</span>
                        <span v-if="!scope.row.validityPeriodStart">N/A</span>
                    </template>
                </el-table-column>
                <el-table-column label="失效日期" min-width="180" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-time" v-if="scope.row.validityPeriodEnd"></i>
                        <span style="margin-left: 5px"  v-if="scope.row.validityPeriodEnd">{{ setTime(scope.row.validityPeriodEnd) }}</span>
                        <span v-if="!scope.row.validityPeriodEnd">N/A</span>
                    </template>
                </el-table-column>
                <el-table-column prop="generate_amount" label="代理卡数" min-width="100" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span v-if="scope.row.generateAmount">{{ scope.row.generateAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="active_amount" label="激活量" min-width="100" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <span v-if="scope.row.activeAmount">{{ scope.row.activeAmount }}</span>
                        <span v-else >0</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" min-width="250" align="left">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.validityPeriodStart" @click="handleStartCard(scope.row.id)">启用</el-button>
                        <el-button  type="primary" @click="handleExport(scope.row.id)" v-if="scope.row.validityPeriodStart">导出</el-button>
                        <el-button type="info" @click="handleDetail(scope.row)" v-if="scope.row.validityPeriodStart">查看详情</el-button>
                    </template>
                </el-table-column>
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
        <el-dialog title="代理卡激活码" :visible.sync="dialogFormVisible" width="400px">
            <div>
                验证码：<el-input placeholder="请先输入验证码" style="width:200px" v-model="code" />
                <el-button type="primary" style="width:100px" @click="handleGetCode">
                    {{codeTxt}}<span v-if="codeTxt !=='获取验证码'">s</span>
                </el-button>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:left">
                <el-button @click="handleSendCodeAndStart" :disabled="!code" v-show="type==='启用'">验证验证码并启用</el-button>
                <el-button @click="handleSendCodeAndExport" :disabled="!code" v-show="type==='导出'">验证验证码并导出</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { proxyCardInventory, startupProxyCardBatch, needVerificationCode, exportProxyCardBatchCode } from '@/api/stock'
import { sendVerifitionCode } from '@/api/user'
import Tit from '@/components/Tit'

export default {
  name: 'inventory',
//   computed: {
//     ...mapGetters([
//       'mobile'
//     ])
//   },
  components: {
      Tit
  },
  data() {
      return {
          cardName: '',
          payTime: '',
          pageInfo: {
              page: 1,
              size: 10
          },
          total:0,
          tableData: [],
          loading: true,
          sortType: '',
          sortField: '',
          dialogFormVisible: false,
          codeTxt: '获取验证码',
          code:'',
          codeId:'',
          type: ''
      }
  },
  methods: {
      search() {
          console.log(this.cardName,'cardName')
          this.loading = true
          this.tableData = []
          const { page, size} = this.pageInfo
          let options = {
              cardName: this.cardName||'',
              payTime: this.payTime,
              page,
              size,
              orderByProperty: this.sortField,
              orderByType: this.sortType
          }
          console.log(options,'options')
          proxyCardInventory(options).then(res => {
                if(res.code === '0'){
                    let oData = res.data.elements
                    // oData.forEach( el => {
                    //     let str = el.cardName
                    //     el.cardNameStr = str&&str.slice(0,3) + '..'
                    // })
                    this.tableData=oData
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
          this.payTime=''
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
      },
      //  详情页
      handleDetail(item) {
          console.log(item,'item')
          const batchId = item.id
          this.$store.dispatch('SetInventoryCard',item).then( ()=>{
              this.$router.push({ path: `cardDetail/${batchId}` })
          })
        //   this.$router.push({ path: `cardDetail/${batchId}` })
      },
      //  启用代理卡
      handleStartCard(id) {
        this.codeId = id
        this.code = ''
        this.codeTxt = '获取验证码'
        this.type = '启用'
        needVerificationCode().then( res =>{
            if(res&&res.code==='0'){
                if(res.data){
                    //   sendVerifitionCode
                    this.dialogFormVisible = true
                }else{
                    const { mobile } = this.$store.state.user
                    const id = this.codeId
                    startupProxyCardBatch({
                        id, phone:mobile
                    }).then( res =>{
                        if(res && res.code==='0'){
                            if(res.data){
                                this.dialogFormVisible = false
                                this.search()
                                this.$message({
                                    type: 'success',
                                    message: '启用代理卡成功',
                                    duration: 2 * 1000,
                                    showClose: true
                                })
                            }else{
                                this.dialogFormVisible = false
                                this.search()
                                this.$message({
                                    type: 'error',
                                    message: '启用代理卡失败',
                                    duration: 2 * 1000,
                                    showClose: true
                                })
                            }
                        }
                    }).catch( err=>console.log(err))
                }
            }
        })
      },
      handleGetCode(){
        const { mobile } = this.$store.state.user
        sendVerifitionCode({
            mobile
        }).then( res=> {
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
        }).catch( err=>console.log(err))
      },
      //  校验获取验证码启用
      handleSendCodeAndStart(){
        const { mobile } = this.$store.state.user
        const code = this.code
        const id = this.codeId
        console.log(mobile,'mobile')
        startupProxyCardBatch({
            code, id, phone:mobile
        }).then( res =>{
            if(res && res.code==='0'){
                if(res.data){
                    this.dialogFormVisible = false
                    this.search()
                    this.$message({
                        type: 'success',
                        message: '启用代理卡成功',
                        duration: 2 * 1000,
                        showClose: true
                    })
                }else{
                    this.dialogFormVisible = false
                    this.search()
                    this.$message({
                        type: 'error',
                        message: '启用代理卡失败',
                        duration: 2 * 1000,
                        showClose: true
                    })
                }
            }
        }).catch( err=>console.log(err))
      },
      //  导出
      handleExport( id ){
        console.log(id)
        this.codeId = id
        this.code = ''
        this.codeTxt = '获取验证码'
        this.type = '导出'
        const { mobile } = this.$store.state.user
        needVerificationCode().then( res =>{
            if(res&&res.code==='0'){
                // this.dialogFormVisible = true
                if(res.data){
                    //   sendVerifitionCode
                    this.dialogFormVisible = true
                }else{
                    console.log(window.location,'window.location')
                    // const url = window.location.origin
                    // const downloadUrl = `${window.location.origin}:8081/api/proxyCard/exportProxyCardBatchCode?batchId=${id}&phone=${mobile}&code=${this.code}`
                    const downloadUrl = `${window.location.origin}/api/proxyCard/exportProxyCardBatchCode?batchId=${id}&phone=${mobile}&code=${this.code}`
                    let iframe = document.createElement('iframe')
                    iframe.style.display = 'none'
                    // iframe.style.position='absolute'
                    // iframe.style.top='10px'
                    // iframe.style.left='200px'
                    // iframe.style.height='200px'
                    iframe.src = downloadUrl
                    iframe.onload = function () {
                        document.body.removeChild(iframe)
                    }
                    document.body.appendChild(iframe)
                }
            }
        })
      },
      //  校验获取验证码导出
      handleSendCodeAndExport() {
        const { mobile } = this.$store.state.user
        // console.log(mobile,'mobile')
        // console.log(window.location,'window.location')
        exportProxyCardBatchCode({
            batchId:this.codeId,
            phone:mobile,
            code:this.code
        }).then( res=>{
            // console.log(res)
            if(res.code === undefined){
                //  此时是文件
                const downloadUrl = `${window.location.origin}/api/proxyCard/exportProxyCardBatchCode?batchId=${this.codeId}&phone=${mobile}&code=${this.code}`
                // const downloadUrl = `${window.location.origin}:8081/api/proxyCard/exportProxyCardBatchCode?batchId=${this.codeId}&phone=${mobile}&code=${this.code}`
                // console.log(downloadUrl)
                let iframe = document.createElement('iframe')
                iframe.style.display = 'none'
                // iframe.style.position='absolute'
                // iframe.style.top='10px'
                // iframe.style.left='200px'
                // iframe.style.height='200px'
                // iframe.style.background='#fff'
                iframe.src = downloadUrl
                iframe.onload = function () {
                    document.body.removeChild(iframe)
                }
                // this.dialogFormVisible = false
                document.body.appendChild(iframe)
            }
        }).catch( err => console.log(err))
        // const url = window.location
        // let url = 'http://partner-test.zmlearn.com:8081'
      }
  },
  mounted() {
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card_inventory{
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
