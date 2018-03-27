<template>
    <div class="partner_add">
        <Tit str="创建合作商" />
        <div class="search_box">
            <span class="item"><el-input placeholder="合作商名称" v-model="subCooperatorName" clearable /></span>
            <span class="item"><el-input placeholder="手机号" v-model="mobile" clearable /></span>
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
            <div class="add_model">
                <el-button
                type="primary"
                icon="el-icon-plus"
                @click="dialogFormVisible = true">新增</el-button>
            </div>
            <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading" @sort-change="handleSort">
                <el-table-column prop="subCooperatorName" label="合作商名称" min-width="80" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="editData.subCooperatorName" clearable v-if="editId == scope.row.id" />
                        <span v-else>{{ scope.row.subCooperatorName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" min-width="100" align="center"/>
                <el-table-column prop="url" label="跟踪链接" min-width="200" align="center">
                    <template slot-scope="scope">
                        <div>
                            <span>{{ scope.row.url }}</span>
                            <span
                                v-if="scope.row.url"
                                v-clipboard:copy="scope.row.url"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError">
                                <svg-icon icon-class="copyic" class="iconclass" />
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="editData.remark" clearable type="textarea" autosize v-if="editId == scope.row.id" :maxlength="50"/>
                        <span v-else>{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="添加时间" min-width="180" align="center" sortable="custom">
                    <template slot-scope="scope">
                        <i class="el-icon-time" v-if="scope.row.createTime"></i>
                        <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="120" align="center">
                    <template slot-scope="scope">
                        <div v-show="editId == scope.row.id">
                            <el-button size="mini" @click="handleSaveEdit">保存</el-button>
                            <el-button size="mini" @click="handleCancleEdit">取消</el-button>
                        </div>
                        <div v-show="editId != scope.row.id">
                            <el-popover
                            ref="popover{{$index}}"
                            placement="top"
                            width="160"
                            :value="scope.row.id == delId">
                                <p>删除分销商后，同时删除用户分销商权限</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="delId= ''">取消</el-button>
                                    <el-button type="primary" size="mini" @click="handleSureDel(scope.row)">确认</el-button>
                                </div>
                            </el-popover>
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)" v-popover:popover{{$index}}>删除</el-button>
                        </div>
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

        <el-dialog title="新增合作商" :visible.sync="dialogFormVisible" width='500px'>
            <el-form :model="partnerAddForm" label-width="80px" ref="partnerAddForm" :rules="rules">
                <el-form-item label="名称：" prop="subCooperatorName" >
                    <el-input v-model="partnerAddForm.subCooperatorName" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="手机：" prop="mobile">
                    <el-input v-model="partnerAddForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input v-model="partnerAddForm.remark" type="textarea" autosize auto-complete="off" :maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleAdd('partnerAddForm')">保存并提交</el-button>
                <el-button @click="handleCancleAdd('partnerAddForm')">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getSubCooperatorList, addSubCooperator, deleteSubCooperator, updateSubCooperator } from '@/api/partner'
import Tit from '@/components/Tit'

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
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('电话不能为空'));
        } else {
          if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
            callback(new Error('电话格式不正确'));
          }
          callback();
        }
      };
      return {
          subCooperatorName: '',
          mobile: '',
          dateValue: null,
          delId: '',
          editId: '',
          editData: {},
          page: {
              pageNo: 0,
              pageSize: 10
          },
          total:0,
          tableData: [],
          loading: true,
          sortType: '',
          dialogFormVisible: false,
          partnerAddForm:{
              subCooperatorName: '',mobile: '',remark: ''
          },
          rules:{
            subCooperatorName: [
                { required: true, message: '名称不能为空'},
            ],
            mobile: [
                { required: true, validator: validatePhone, trigger: 'blur' }
            ]
          }
      }
  },
  methods: {
      search() {
          console.log(this.subCooperatorName,'cooperatorName')
          this.loading = true
          const { pageNo, pageSize} = this.page
          let options = {
              name: this.subCooperatorName||'',
              mobile: this.mobile,
              endTime: this.dateValue ? (this.dateValue[1]+' 23:59:59') : '',
              startTime: this.dateValue ? (this.dateValue[0]+' 00:00:00') : '',
              pageNo,
              pageSize,
              sortField: "createTime",
              sortType: this.sortType
          }
          console.log(options,'options')
          getSubCooperatorList(options).then(res => {
                if(res.code === '0'){
                    this.tableData=res.data.elements
                    this.total=res.data.totalElements
                }
                this.loading = false
            }
          ).catch( err=> console.log(err))
      },
      reset() {
          this.subCooperatorName=''
          this.mobile=''
          this.dateValue=null
          this.page={
              pageNo: 0,
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
      handleSort(info) {
          const { order } = info
          this.sortType = order ? order.split('ending')[0] : ''
          this.search()
      },
      handleAdd(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                addSubCooperator(this.partnerAddForm).then( res =>{
                    console.log(res)
                    if(res.code == 0){
                        this.$message({
                            message: '新增合作商成功',
                            type: 'success',
                            showClose: true,
                            duration: 2 * 1000
                        })
                        this.search()
                    }
                }).catch( err=> console.log(err))
                this.$nextTick( ()=>{
                    this.handleCancleAdd('partnerAddForm')
                })
            } else {
                console.log('error submit!!');
                return false;
            }
          })
      },
      handleCancleAdd(formName) {
          this.$refs[formName].resetFields()
          this.dialogFormVisible = false
      },
      handleDelete(index, row) {
          this.delId = row.id
      },
      handleSureDel(row) {
          console.log(row)
          deleteSubCooperator(row.id).then( res=>{
            if(res.code == 0){
                this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 2 * 1000,
                    showClose: true
                })
                this.search()
            }
          }).catch( err=> console.log(err))
          this.delId = ''
        //   row.visibleDel = false
        //   this.$set(row, 'visibleDel', false)
      },
      handleEdit( index, row) {
          const { id, subCooperatorName, remark } = row
          this.editId = id
          this.editData = {id, subCooperatorName, remark }
      },
      handleCancleEdit() {
          this.editId = ''
          this.editData = {}
      },
      handleSaveEdit() {
          console.log(this.editData,'dsds')
        //   this.handleCancleEdit()
          updateSubCooperator(this.editData).then( res=>{
              this.handleCancleEdit()
              this.search()
          }).catch(err=> console.log(err))
      },
      onCopy(){
          this.$message({
            message: '复制成功',
            type: 'success',
            duration: 2 * 1000,
            showClose: true
        })
      },
      onError(){
        this.$message({
            message: '系统异常，请刷新重试',
            type: 'success',
            duration: 2 * 1000,
            showClose: true
        })
      }
  },
  mounted() {
    const secondary = this.$store.state.user.secondary //  是否是二级合作商
    if(secondary){
        this.$router.push({ path: '/home' })
    }
    this.search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.partner_add{
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
    .iconclass{
        cursor: pointer;
    }
}
</style>
