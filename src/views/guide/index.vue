<template>
  <div>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>项目编号：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="form_data.projectNo">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>版本：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-radio v-model="form_data.verNo" label="home">国内</el-radio>
        <el-radio v-model="form_data.verNo" label="overseas">国外</el-radio> 
      </el-col>
    </el-row>
    <div class="row-30">
      <el-row>
        <el-col :offset="5">
          <el-button type="primary" icon="el-icon-search" @click="getQuery()">查询</el-button>
          <el-button type="primary" icon="el-icon-s-tools" @click="dialogVisible = true">销售利率设置</el-button>
        </el-col>  
      </el-row>
    </div>
    <el-row v-if="show_index == 1" class="row-30">
      <el-tag>当前销售人员项目利润为 {{rate}}</el-tag>
    </el-row>
     <el-dialog
      title="请填写利润率"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>利润率：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="form_data.profitRate">
        </el-input>    
      </el-col>
    </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
     </el-dialog>
    <template v-if="tableList.length && show_index == 1">
      <el-tabs v-model="activeName" @tab-click="handleTab">
        <el-tab-pane label="基准价格表" name="one"></el-tab-pane>
        <el-tab-pane label="销售基准价格表" name="two"></el-tab-pane>
     </el-tabs>
      <el-table
        :data="tableList"
        style="width: 100%">
        <el-table-column
          label="年/月"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.months }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="人民币价格/元"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.rmbPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="美金价格/美元"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.usdPrice }}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import req from '../../https'
import { Progress } from 'element-ui'
import { Promise } from 'q'

export default {
  data() {
    return {
      form_data: {},
      input_length: 8,
      show_index: 0,
      txt_length: 4,
      tableList: [],
      rate: '',
      activeName: 'one',
      dialogVisible: false
    }
  },
  methods: {
    async getTableList() {
      let url = ''
      if (this.activeName == 'one') url = '/apis/guide'
      if (this.activeName == 'two') url = '/apis/guide/salesman'
      return await req.get(url, { params: this.form_data })
    },
    handleTab() {
      this.getQuery()
    },
    getQuery() {
      Promise.all([this.getTableList(), this.getMoney()]).then(res => {
        let is_data = !!(
          res[0] &&
          res[1] &&
          res[0].code == 1 &&
          res[1].code == 1
        )
        if (is_data) {
          this.tableList = res[0].data
          this.rate = res[1].data
          this.show_index = 1
        }
      })
    },
    async getMoney() {
      return await req.get('/apis/guide/profit', { params: this.form_data })
    },
    submit() {
      req.post('/apis/guide', this.form_data).then(data => {
        if (data.code == 1) {
          this.$message({
            message: '设置成功',
            type: 'success'
          })
          this.getQuery()
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'css/def.scss';
</style>



