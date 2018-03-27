<template>
    <div class="card_detail_log" v-loading="loading" 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
        <div class="card_detail_title">
            <Tit str="代理卡提取/查看详情" />
            <el-button tplain icon="el-icon-d-arrow-left" size="small" class="back" @click="handleBack">返回</el-button>
        </div>
        <div class="card_detail_cont">
                <header class="hd">
                    {{cardInfo.cardName}}
                    <i class="el-icon-arrow-down ico" v-if="close" @click="close=false">展开</i>
                    <i class="el-icon-arrow-up ico" v-else @click="close=true">收起</i>
                </header>
                <div class="card_content" v-if="cardInfo.studyCardStrategyBo&&!close">
                    <div class="price tt">
                        <div class="tit" style="position:relative;top:4px">单价</div>
                        <div class="main">
                            <span class="newPrice">￥{{cardInfo.price}}</span>
                            <span class="oldPrice" v-if="cardInfo.originalPrice">￥{{cardInfo.originalPrice}}</span>
                        </div>
                    </div>
                    <div class="open tt" v-if="cardInfo.studyCardStrategyBo.openclassGiftEnable">
                        <div class="tit">公开课特权</div>
                        <div class="main">自激活卡起，账号可观看课程 {{cardInfo.studyCardStrategyBo.viewTime}} 
                            <span v-if="cardInfo.studyCardStrategyBo.openclassDurationType">年</span>
                            <span v-else>日</span>
                        </div>
                    </div>
                    <div class="lesson tt"  v-if="cardInfo.studyCardStrategyBo.activeGiftEnable">
                        <div class="tit">课时特权</div>
                        <div class="main">
                            未付费用户，激活学习卡时，赠送 {{cardInfo.studyCardStrategyBo.unpayGiftCourse}} 课时<br />
                            <span>已付费用户，激活学习卡时，赠送 {{cardInfo.studyCardStrategyBo.payGiftCourse}} 课时
                                <el-tooltip class="item" effect="dark" placement="right-end">
                                    <div slot="content">付费用户：<br/>在掌门购买过一对一课程的用户</div>
                                    <i class="el-icon-info"></i>
                                </el-tooltip>
                            </span>
                        </div>
                    </div>
                    <div class="shop tt" v-if="cardInfo.studyCardStrategyBo.buyGiftEnable">
                        <div class="tit">购买特权</div>
                        <div class="main">
                            购买1对1课程时，可减免 {{cardInfo.studyCardStrategyBo.giftReductMoney}} 元。<br />
                            购买1对1课程时，<span v-if="cardInfo.studyCardStrategyBo.giftPercent">赠送 {{cardInfo.studyCardStrategyBo.giftPercent}}%  的课程。</span><span v-else>赠送 {{cardInfo.studyCardStrategyBo.giftCourse}} 课时</span>
                        </div>
                    </div>
                    <div class="info tt"  v-if="cardInfo.studyCardStrategyBo.buyGiftEnable">
                        <div class="tit"></div>
                        <div class="main" style="color:#999">
                            <span v-if="cardInfo.studyCardStrategyBo.courseAmountLimit">以上购买特权，需购买超过 {{cardInfo.studyCardStrategyBo.courseAmountLimit}} 课时；</span>
                            <span v-if="cardInfo.studyCardStrategyBo.periodizationLimit">非分期购买；</span><span v-else>可分期购买；</span>
                            <span v-if="cardInfo.studyCardStrategyBo.payLimit">限{{cardInfo.studyCardStrategyBo.payLimit}}购买用户；</span>
                            <span v-if="cardInfo.studyCardStrategyBo.coursePackageLimit">
                               仅限购买<span v-for="(val, key) in (cardInfo.studyCardStrategyBo.coursePackageLimit.split(','))" :key="key" v-if="cardInfo.studyCardStrategyBo">{{setName(val)}}<span v-if="cardInfo.studyCardStrategyBo.coursePackageLimit&&(key < (cardInfo.studyCardStrategyBo.coursePackageLimit.split(',').length-1))">、</span></span>课程包使用
                            </span>
                        </div>
                    </div>
                    <div class="leavetime tt">
                        <div class="tit">有效期</div>
                        <div class="main">
                            {{cardInfo.validityPeriod}}天
                            <el-tooltip class="item" effect="dark" placement="right-end">
                                <div slot="content">有效期：<br/>自激活代理卡时间起，{{cardInfo.validityPeriod}}天内有效</div>
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
        </div>
        <div class="search_box">
            <span class="item"><el-input placeholder="代理卡激活码" v-model="activeCode" clearable /></span>
            <span class="item">
                <el-select v-model="status" placeholder="代理卡状态" clearable style="width:120px">
                    <el-option v-for="(item,key) in statusOptions" :key="key" :value="item.code" :label="item.name" style="width:120px"/>
                </el-select>
            </span>
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
                <el-button @click="reset" type="primary" plain>重置</el-button>
            </span>
        </div>
        <div class="content">
            <div class="card_amount">代理卡数<span>{{cardInfo.generateAmount}}</span>张，已激活<span>{{cardInfo.activeAmount}}</span>张，未激活<span>{{cardInfo.generateAmount - cardInfo.activeAmount}}</span>张</div>
            <el-table :data="tableData" style="width: 100%" v-loading="loading"  @sort-change="handleSort" header-row-class-name="card_detail_header" row-class-name="card_detail_tab_cell" ref="dd_table">
                <el-table-column label="代理卡激活码" min-width="180" align="center" prop="activeCode" >
                    <template slot-scope="scope">
                        <div class="code_txt_box">
                            <span style="font-weight:500;color:#333">{{ scope.row.activeCode }}</span>
                            <span v-if="dialogFormVisible" class="copy_txt">复制</span>
                            <el-popover
                                placement="top"
                                width="160"
                                v-if="!dialogFormVisible"
                                :value="scope.row.id === copyId">
                                    <p>点击获取代理卡激活码？</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="copyId= ''">取消</el-button>
                                        <el-button 
                                            type="primary" 
                                            size="mini" 
                                            v-clipboard:copy="codeData"
                                            v-clipboard:success="onCopy"
                                            v-clipboard:error="onError">
                                            确认
                                        </el-button>
                                    </div>
                                    <span
                                        v-if="scope.row.activeCode" 
                                        class="copy_txt"
                                        @click="handleOpenDialog(scope.row.id)"
                                        slot="reference"
                                    >
                                    复制
                                    </span>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="激活时间" min-width="180" align="center" sortable="custom" prop="active_time">
                    <template slot-scope="scope">
                        <!-- <i class="el-icon-time" v-if="scope.row.activeTime" /> -->
                        <span>{{ setTime(scope.row.activeTime) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="180" align="center" prop="status" />
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

        <el-dialog title="代理卡激活码" :visible.sync="dialogFormVisible" width="400px" v-if="dialogFormVisible">
            <div>
                验证码：<el-input placeholder="请先输入验证码" style="width:200px" v-model="code" />
                <el-button type="primary" style="width:100px" @click="handleGetCode">
                    {{codeTxt}}<span v-if="codeTxt !=='获取验证码'">s</span>
                </el-button>
            </div>
            <div slot="footer" class="dialog-footer" style="text-align:left">
                <el-button @click="handleSendCode">校验验证码</el-button>
                <el-button type="danger" 
                    @click="dialogFormVisible = false" 
                    plain 
                    :disabled="!codeRight" 
                    v-clipboard:copy="codeData"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                >点击获取代理卡激活码
               </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { proxyCardBatchDetail, copyProxyCardCode, needVerificationCode, proxyCardBatchInfo } from '@/api/stock'
import { sendVerifitionCode } from '@/api/user'
import Tit from '@/components/Tit'


export default {
  name: 'inventory',
  computed: {
    ...mapGetters([
      'inventoryCard'
    ])
  },
  components: {
      Tit
  },
  data() {
      return {
        //   fetchData: true,
          close: true,
          copyId: '',
          dialogFormVisible: false,
          code: '', //  验证码
          codeId: '', //  此时的商品id
          codeTxt: '获取验证码',
          codeData: '',
          codeRight: false,
          timer: null,
          activeCode: '',
          status:'',
          cardInfo:{},
          statusOptions: [
            {code: -1, name: '全部'},
            {code: 0, name: '未激活'},
            {code: 1, name: '已激活'},
            {code: 2, name: '已失效'},
            {code: 3, name: '已退卡'}
          ],
          page: {
              pageNo: 1,
              pageSize: 10
          },
          dateValue:[],
          total:0,
          tableData: [],
          loading: true,
          sortType: '',
          sortField: ''
      }
  },
  methods: {
      search() {
          this.loading = true
          const { pageNo, pageSize} = this.page
          const activeTimeStart = this.dateValue ? this.dateValue[0] : ''
          const activeTimeEnd = this.dateValue ? this.dateValue[1] : ''
          const batchId = this.$route.params.batchId
          let options = {
              batchId,
              status: this.status !== -1 ? this.status : '',
              activeCode: this.activeCode||'',
              activeTimeEnd,
              activeTimeStart,
              page:pageNo,
              size:pageSize,
              orderByProperty: this.sortField,
              orderByType: this.sortType||'DESC'
          }
          console.log(options,'options')
          proxyCardBatchInfo({
              batchId
          }).then( res=> {
              console.log(res,'res')
              if(res&&res.code==='0'){
                  this.cardInfo = res.data
              }
          }).catch( err=> console.log(err))
          this.$nextTick( ()=>{
                proxyCardBatchDetail(options).then(res => {
                        if(res.code === '0'){
                            this.tableData=res.data.elements
                            this.total=res.data.totalElements
                        }
                        this.loading = false
                    }
                ).catch( err=> {
                    console.log(err)
                })
          })
      },
      reset() {
          this.activeCode=''
          this.dateValue= []
          this.page={
              pageNo: 1,
              pageSize: 10
          }
          this.search()
      },
      setTime(value) {
          if(!value){
              return ''
          }
          return parseTime(value)
      },
      setName( val ){
            switch ( val ){
                case "0": 
                    return '普通';
                    break;
                case "1": 
                    return '特殊';
                    break;
                case "2": 
                    return '名师';
                    break;
                case "5": 
                    return 'VIP';
                    break;
            }
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
      handleSort(info) {
          const { order, prop } = info
          console.log(order,'order')
          this.sortType = order&&(order.split('ending')[0]).toUpperCase()
          this.sortField = prop
          this.search()
      },
      handleBack() {
          this.$router.go(-1)
      },
      //  打开弹窗   1.0此处功能交代模糊，先这么处理
      handleOpenDialog( id ) {
            this.codeId = id
            this.code = ''
            this.codeTxt = '获取验证码'
            this.codeData = ''
            this.codeRight = false
            needVerificationCode().then( res =>{
                if(res&&res.code==='0'){
                    if(res.data){
                        //   sendVerifitionCode
                        this.dialogFormVisible = true
                    }else{
                        const { mobile } = this.$store.state.user
                        const id = this.codeId
                        copyProxyCardCode({
                            id, phone:mobile
                        }).then( res =>{
                            if(res && res.code==='0'){
                                // console.log(res)
                                // this.codeRight = true
                                this.codeData = res.data
                                this.copyId = id
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
      //  校验获取验证码
      handleSendCode(){
        const { mobile } = this.$store.state.user
        const code = this.code
        const id = this.codeId
        copyProxyCardCode({
            code, id, phone:mobile
        }).then( res =>{
            if(res && res.code==='0'){
                // console.log(res)
                this.codeRight = true
                this.codeData = res.data
            }
        }).catch( err=>console.log(err))
      },
      onCopy: function (e) {
        this.copyId = ''
        this.$message({
            type: 'success',
            message: '代理卡激活码已复制',
            duration: 2 * 1000,
            showClose: true
        })
      },
      onError: function (e) {
        this.copyId = ''
        this.$message({
            type: 'error',
            message: '复制失败',
            duration: 2 * 1000,
            showClose: true
        })
      }
  },
  mounted() {
    console.log(this.inventoryCard,'inventoryCard')
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.card_detail_log{
    border: 1px solid #ddd;
    // padding: 20px;
    .search_box{
        background-color: #fff;
        padding: 10px 30px 20px;
        // padding-top: 8px;
        .item{
            float: left;
            margin-right: 10px;
            margin-top: 10px;
        }
        .item:last-child{
            margin-right: 0;
        }
        overflow: hidden;
    }
    
    .card_detail_title{
        position: relative;
        padding-top: 20px;
        padding-left: 20px;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        .back{
            position: absolute;
            right: 30px;
        }
    }
    .content{
        // padding-top: 20px;
        // padding-bottom: 20px;
        .card_amount{
            background-color: #fff;
            border-top: 1px dashed #ddd;
            border-bottom: 1px dashed #ddd;
            padding: 0 30px;
            line-height: 34px;
            color: #585656;
            span{
                padding: 0 10px;
                // font-size: 24px;
                color: #fe6b6e;
            }
        }
        .add_model{
            // margin-top: 10px;
            margin-bottom: 10px;
        }
        // .code_txt_box{
        //     position: relative;
        // }
        .copy_txt{
            color:#F25B56;
            margin-left:10px;
            cursor:pointer;
            font-size:12px;
            background-color:#ffebeb;
            padding: 2px 4px;
            display:inline-block;
            line-height:1;
            border-radius:2px;
            position:releative
        }
    }
    .page_block{
        text-align: center;
        padding: 10px;
        background-color: #fff;
    }
    .card_detail_cont{
        // margin-bottom: 30px;
        // background-color: #fff;
        .hd{
            padding-left: 30px;
            padding-top: 27px;
            padding-bottom: 27px;
            // line-height: 96px;
            font-size: 24px;
            background-color: #fff;
            .ico{
                position: relative;
                left: 20px;
                font-size: 14px;
                color: #9b9b9b;
                cursor: pointer;
            }
        }
        .card_content{
            // width: 100%;
            // background-color: #f7f7ff;
        }
    }
    .card_content{
                    padding: 20px;
                    // margin-bottom: 30px;
                    padding-left: 30px;
                    flex: 1;
                    // margin: 10px;
                    width: 850px;
                    .tt{
                        // overflow: hidden;
                        display: flex;
                        // justify-content: flex-start;
                        // padding-top: 20px;
                        // padding-bottom: 15px;
                        font-size: 14px;
                        line-height: 1;
                        color: #333333;
                    }
                    .tit{
                        // flex: 1;
                        width: 70px;
                        padding-top: 5px;
                        height: 100%;
                        // line-height: 24px;
                        text-align: right;
                        color: #a5a5a5;
                        margin-right: 40px;
                    }
                    .main{
                        overflow: hidden;
                        flex: 1;
                        // width: 400px;
                        line-height: 1.8;
                        color: #445544;
                    }
                    .price{
                        // margin-top: 30px;
                        height: 26px;
                        line-height: 14px;
                        background-color: #f5f5f5;
                        .main{
                            // line-height: 1.2;
                            .newPrice{
                                font-size: 18px;
                                color: #000;
                            }
                            .oldPrice{
                                text-decoration: line-through;
                            }
                        }
                    }
                    .info{
                        .main{
                            border-top: 1px dashed #dedede;
                            border-bottom: 1px dashed #dedede;
                        }
                    }
                    .num{
                        .tit{
                            padding-top: 0;
                            width: 200px;
                        }
                        .main{
                            width: 300px;
                        }
                    }
                    // height: 100px;width: 100px;
                    // background-color: #000;
                }
}
</style>
