<template>
  <div class="order_page" 
        v-loading="loaded" 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
       <el-tabs tab-position="top" @tab-click="handleTab">
            <el-tab-pane label="全部">
                <span slot="label" class="tab-item">全部</span>
                <OrderPage :orderData="orderDataList" :showInfo="0" @refresh-data="initData"/>
            </el-tab-pane>
            <el-tab-pane label="待支付">
                <span slot="label" class="tab-item">待支付</span>
                <OrderPage :orderData="orderDataList" :showInfo="2" @refresh-data="initData"/>
            </el-tab-pane>
            <el-tab-pane label="已支付">
                <span slot="label" class="tab-item">已支付</span>
                <OrderPage :orderData="orderDataList" :showInfo="1" @refresh-data="initData"/>
            </el-tab-pane>
            <el-tab-pane label="已取消">
                <span slot="label" class="tab-item">已取消</span>
                <OrderPage :orderData="orderDataList" :showInfo="3" @refresh-data="initData"/>
            </el-tab-pane>
        </el-tabs>
        <div class="block no_order" v-if="!totalElements">
            暂无订单信息...
        </div>
        <div class="block" v-if="totalElements">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="size"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalElements">
            </el-pagination>
        </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import { proxyCardOrder } from '@/api/purchase'
import OrderPage from '@/components/OrderPage'
export default {
    data() {
        return {
            orderDataList : {
                payed:[], unPay:[], noPay: []
            },
            payState:'',
            page:1,
            size:5, 
            totalElements: 0,
            loaded: true
        }
    },
    components: {
      OrderPage
    },
    methods: {
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.size = val
            this.page = 1
            this.initData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.initData()
            // console.log(`当前页: ${val}`);
        },
        initData() {
            this.loaded = true
            proxyCardOrder({
                payState:this.payState,
                page:this.page,
                size:this.size
            }).then( res=>{
                console.log(res)
                if(res.code == 0 && res.data){
                    let oData = res.data
                    this.totalElements = oData.totalElements
                    let elements = oData.elements
                    console.log(oData)
                    elements.forEach( item => {
                        item.totalNum = 0;
                        item.proxyCardBatchs&&item.proxyCardBatchs.forEach( tt => item.totalNum+=tt.generateAmount)
                    })
                    this.orderDataList.payed = elements.filter( el=> el.payState === '已支付')
                    this.orderDataList.unPay = elements.filter( el=> el.payState === '待支付')
                    this.orderDataList.noPay = elements.filter( el=> el.payState === '已取消')
                    console.log(this.orderDataList)
                    this.loaded = false
                }
            }).catch( err => console.log(err))
        },
        handleTab( it ) {
            console.log(it.label)
            this.payState = it.label==='全部' ? '' : it.label
            this.initData()
        }
    },
    mounted() {
        this.initData()
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    .order_page{
        // border: 1px solid #eee;
        background-color: #fff;
        .el-tabs,.el-tabs--top{
            // background-color: #fff;
        }
        .el-tabs__item{
            height: 80px;
            line-height: 80px;
        }
        .el-tabs__header{
            border: 1px solid #ddd;
            margin-bottom: 0px;
        }
        .el-tabs__content{
            // padding-bottom: 10px;
            background-color: #F4F5F7;
        }
        .tab-item{
            display: inline-block;
            width: 80px;
            text-align: center;
        }
        .block{
            text-align: center;
        }
        .block{
            padding-bottom: 30px;;
            background-color: #F4F5F7;
        }
        .no_order{
            line-height: 200px;
            background-color: #fff;
        }
    }
</style>
