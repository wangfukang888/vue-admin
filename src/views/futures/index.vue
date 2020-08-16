<template>
  <div class="futures">
    <div class="hd">
      <el-row :gutter="10">
         <el-col :span="6" >
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true, f_data = {}, add()">添加期货价格</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="期货价格添加"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-table
        :data="add_list"
        :height="l_height"
        style="width: 100%">
        <el-table-column
          label="年/月"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.months }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="期货价格"
          width="180">
          <template slot-scope="scope">
            <el-input
              placeholder=""
              v-model="scope.row.futuresPrice">
            </el-input>   
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">添加</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="tableList"
      style="width: 100%">
      <el-table-column
        label="年/月"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.months }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="期货价格/元"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.futuresPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="每KG(不含税价)"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.noTaxPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="每KG(含税价)"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.taxPrice }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import req from '../../https'

export default {
  data() {
    return{
      tableList: [],
      add_list: [],
      f_data: {},
      l_height: '',
      txt_length: 6,
      input_length: 8,
      dialogVisible: false
    }
  },
  mounted() {  
    this.handleWindow()
    this.getList()
    window.addEventListener('resize', this.handleWindow, true)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindow, true)
  },
  methods: {
    handleWindow() {
      const _H = document.body.clientHeight || document.documentElement.clientHeight
      this.l_height = parseInt (_H / 2.2) 
    },
    getList() {
      req.get('/apis/futures').then(data => {
        if(data && data.code == 1) {
          this.tableList = data.data
        }
      })
    },
    add() {
      const now = new Date()
      const y = now.getFullYear()
      const m = now.getMonth() + 1
      let _arr = []
      for(let i = 0; i < 12; i++) {
        const index = i + 1
        if(index >= m ) {
          _arr.push({
            futuresPrice: '',
            months: y + (i < 9 ? `0${i + 1}`: `${i+1}` )
          })
        } 
      }
      const num = 12 - _arr.length
      for(let i = 0; i < num; i++) {
        _arr.push({
          futuresPrice: '',
          months: (y + 1) + (i < 9 ? `0${i + 1}`: `${i+1}`)
        })
      }
      this.add_list = _arr
    },
    submit() {
      req.post('/apis/futures', {addFuturesPriceDTOS: this.add_list}).then(data => {
        if(data && data.code == 1) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialogVisible = false
        }  
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hd{
  margin-bottom: 10px;
}
</style>
