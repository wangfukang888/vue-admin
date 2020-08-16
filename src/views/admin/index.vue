<template>
  <div>
    <el-row>
      <el-col class="row-20">
          <el-button type="primary" icon="el-icon-edit" @click="show_dislog = true, show_index = 1, title= '添加用户', f_data = {}">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableList.list"
      style="width: 100%">
      <el-table-column
        label="帐号"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.accountNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户ID"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户信息"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>手机号: {{ scope.row.mobile }}</p>
            <p>身份证号: {{ scope.row.idNo }}</p>
            <p>邮箱: {{ scope.row.email }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
       <el-table-column
        label="角色ID"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roleId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="show_index = 2, title = '用户信息明细',show_dislog = true, handleDt(scope.row)">明细</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleSub(scope.row.accountNo, 1, scope.$index)">删除</el-button>
            <el-button
            size="mini"
            type="warning"
            @click="handleSub(scope.row.accountNo, 2)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog 
      :title="title"
      :visible.sync="show_dislog"
      width="60%"
    >
      <v-add v-if="show_index == 1" :addFormData="f_data" :input_length="8" :txt_length="4" />
      <v-dt  v-if="show_index == 2" :dt_data="f_data" :input_length="8" :txt_length="4" />
      <span slot="footer" class="dialog-footer" v-if="show_index == 1 || show_index == 3">
        <el-button @click="show_dislog = false">取 消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="show_index == 2">
        <el-button type="primary" @click="show_dislog = false">关闭</el-button>
      </span>
    </el-dialog>
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
import req from '../../https'
import Add from './user/add'
import Dt from './user/dt'

export default {
  components: {
    'v-add': Add,
    'v-dt': Dt
  },
  data() {
    return {
      tableList: {
        list: []
      },
      f_data: {},
      show_dislog: false,
      show_index: 0,
      title: '',
      page: 1
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      req
        .get('/apis/admin', {
          params: {
            current: this.page,
            size: 10
          }
        })
        .then(res => {
          if (res.code == 1) {
            const _data = res.data
            this.tableList = _data
          }
        })
    },
    submit() {
      if (this.show_index == 1) {
        this.postAdd()
      }
    },
    handleDt(data) {
      this.f_data = data
    },
    postAdd() {
      req.post('/apis/admin', this.f_data).then(res => {
        if (res.code == 1) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getUserList()
          this.show_dislog = false
        }
      })
    },
    handleSub(no, idx, index) {
      let type = ''
      if (idx == 1) type = 'delete'
      if (idx == 2) type = 'put'
      req[type](`/apis/admin/${no}`).then(res => {
        if( res.code == 1) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
          if(idx == 1) this.tableList.list.splice(index,1)   
        }
      })
    },
    change(index) {
      this.page = index
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'css/def.scss';
</style>


