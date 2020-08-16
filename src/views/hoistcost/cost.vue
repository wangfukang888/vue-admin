<template>
  <div class="container">
    <div class="hd">
      <el-row :gutter="10">
        <!-- <el-col :span="6">     
          <el-input
            placeholder="请输入项目编号"
            prefix-icon="el-icon-search"
            v-model="no_num">
          </el-input>    
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col> -->
         <el-col :span="6">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true, addFormData = {}">添加成本</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="明细"
      :visible.sync="dt_show"
      width="60%"
    >
      <dislog-dt :tableList="dt_list" :input_length="8" :txt_length="4"/>
    </el-dialog>
    <el-dialog
      title="成本添加"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <dislog-add :addFormData="addFormData" :input_length="8" :txt_length="4" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tableList.list"
      style="width: 100%">
      <el-table-column
        label="项目编号"
        width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.projectNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="ERP编号"
        width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.erpNo }}</span>
        </template>
      </el-table-column>
       <el-table-column
        label="版本"
        width="120">
        <template slot-scope="scope"> 
          <span>{{ scope.row.verNo == 'home' ? '国内':'国外' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="钢材用量/kg"
        width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.steelConsumption }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="固定费用/元"
        width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fixedCost }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="固定物料成本/元"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.fixedMaterialCost }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.mark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">更改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDt(scope.$index, scope.row)">明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="tableList.total"
        @current-change="change"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getCostList, getCostListAdd, getCostListUpdate } from 'api'
import req from '../../https'
import Dt from './cpt/dt'
import Add from './cpt/add'

export default {
  components: {
    'dislog-dt': Dt,
    'dislog-add': Add
  },
  data() {
    return {
      no_num: '',
      page: 1,
      txt_length: 4,
      input_length: 8,
      dialogVisible: false,
      dt_show: false,
      tableList: [],
      dt_list: [],
      addFormData: {}
    }
  },
  mounted() {
    this.getList()
    // req.get('/apis/cost/projects').then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    async getList() {
      const data = await getCostList(this.page)
      if (data.code == 1) {
        this.tableList = data.data
      }
    },
    change(page) {
      this.page = page
      this.getList()
    },
    async submit() {
      let from_data = this.addFormData
      let data
      if (this.update) {
        data = await getCostListUpdate(this.addFormData)
      } else {
        data = await getCostListAdd(from_data)
      }
      if (data.code == 1) {
        this.dialogVisible = false
        this.getList()
        this.$message({
          type: 'success',
          message: this.update ? '更改成功' : '新增成功'
        })
        this.update = false
      }
    },
    async handleEdit(index, row) {
      this.dialogVisible = true
      this.addFormData = row
      this.update = true
    },
    handleDt(index, row) {
      this.dt_show = true
      req
        .get('/apis/cost/detail', {
          params: {
            projectNo: row.projectNo,
            verNo: row.verNo
          }
        })
        .then(res => {
          if (res && res.code == 1) {
            this.dt_list = res.data
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.hd {
  margin-bottom: 20px;
}
.container {
  /deep/ .el-row {
    margin-bottom: 10px;
  }
}
</style>
