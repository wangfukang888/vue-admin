<template>
  <div>  
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
        label="人民币价格"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.rmbPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="美金价格"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.usdPrice }}</span>
        </template>
      </el-table-column>
     </el-table>
  </div>
</template> 

<script>
export default {
  props: {
    tableList: {
      type: Array,
      default: []
    },
    input_length: 0,
    txt_length: 0
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
