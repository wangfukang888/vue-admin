<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="国内" name="home">
      </el-tab-pane>
      <el-tab-pane label="国外" name="overseas">
      </el-tab-pane>
      
    </el-tabs>
    <el-table
      :data="tableList"
      style="width: 100%">
      <el-table-column
        label="参数键"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.configKey }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参数名称"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.configName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参数值"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.configValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
            <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)">更改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog 
      :visible.sync="show_dislog"
      width="60%"
    >
      <v-add :addFormData="f_data" :input_length="8" :txt_length="4" />
      <span slot="footer" class="dialog-footer" >
        <el-button @click="show_dislog = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import req from '../../https'
import Add from './cpt/add'

export default {
  components: {
    'v-add': Add
  },
  data() {
    return{
      activeName: 'home',
      tableList: [],
      f_data: {},
      show_dislog: false
    }
  },
  mounted() {
    this.handleClick()
  },
  methods:{
    handleClick() {
      req.get(`/apis/config/${this.activeName}`).then(res => {
        if( res.code == 1) {
          this.tableList = res.data
        }
      })
    },
    handleEdit(row) {
      this.show_dislog = true
      this.f_data = row
    },
    submit() {
      const data = this.f_data
      req.put(`/apis/config`, {
        configKey: data.configKey,
        verNo: data.verNo,
        configValue: data.configValue
      }).then(res => {
        if( res.code == 1) {
          this.$message({
            type: 'success',
            message: '更改成功'
          })
          this.show_dislog = false
        }
      })
    }
  }
}
</script>
