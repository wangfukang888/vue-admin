<template>
    <div class="role">
        <div class="hd row-20">
      <el-row :gutter="10">
         <el-col :span="6">
          <el-button type="primary" ic  on="el-icon-circle-plus-outline" @click="show_dialog = true, addFormData = {}, show_index = 1, getRoleCode()">添加角色</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
        :visible.sync="show_dialog"
        width="70%">
            <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>角色代码：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-radio v-for="(item,index) in roleList" :key="index" v-model="addFormData.roleCode" :label="item.roleName">{{item.roleName}}</el-radio>
      </el-col>
    </el-row>
        <el-row align="middle" type="flex">
        <el-col :span="txt_length">
            <div>角色描述：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
            <el-input
            placeholder=""
            v-model="addFormData.roleDesc">
            </el-input>    
        </el-col>
        </el-row>
        <el-row align="middle" type="flex">
        <el-col :span="txt_length">
            <div>角色名：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
            <el-input
            placeholder=""
            v-model="addFormData.roleName">
            </el-input>    
        </el-col>
        </el-row>
        <span slot="footer" class="show_dialog-footer">
            <el-button @click="show_dialog = false">取 消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
        </span>
    </el-dialog>
        <el-table
      :data="tableList.list"
      style="width: 100%">
            <el-table-column
                label="角色id"
                width="120">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="角色代码"
                width="120">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.roleCode }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="角色描述"
                width="300">
                <template slot-scope="scope">
                <span>{{ scope.row.roleDesc }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="菜单权限"
                width="140">
                <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleMenu(scope.row)">配置</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="角色名"
                width="200">
                <template slot-scope="scope">
                <span>{{ scope.row.roleName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">更改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">删除角色</el-button>
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
        <el-dialog
            :title="dialog_t"
            :visible.sync="JurisdictionOffs"
            width="70%">
            <Jurisdiction :r_id.sync="r_id" @submit="submitRoleMenu"/>
        </el-dialog>
    </div>
</template> 

<script>
import Jurisdiction from '../../components/Jurisdiction'
import req from '../../https'

export default {
  data() {
    return {
      JurisdictionOffs: false,
      tableList: false,
      show_index: 0,
      r_id: '',
      input_length: 8,
      txt_length: 4,
      addFormData: {},
      show_dialog: false,
      page: 1,
      dialog_t: '',
      roleList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      req
        .get('/apis/permission', {
          params: {
            current: this.page,
            size: 10
          }
        })
        .then(res => {
          if (res.code == 1) {
            this.tableList = res.data
          }
        })
    },
    change(page) {
      this.page = page
      this.getList()
    },
    submit() {
      let type = ''
      if (this.show_index == 1) type = 'post'
      if (this.show_index == 2) type = 'put'
      req[type]('/apis/permission/role', this.addFormData).then(res => {
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          if(this.show_index == 1) this.getList()
          this.show_dialog = false
        }
      })
    },
    handleMenu(row) {
      this.r_id = row.id
      this.dialog_t = row.roleName + '权限配置'
      this.JurisdictionOffs = true
    },
    submitRoleMenu(list) {
      this.JurisdictionOffs = false
      let  _set_menu_arr = [...new Set(list)]
       req.post('/apis/permission/grantRole', {
         grantRoleDTO: {
          menuIds: _set_menu_arr,
          buttonIds: [],
          roleId: this.r_id
         }     
       }).then(res => {
         if(res.code == 1) {
           console.log(res)
         }
       })
    },
    handleDelete(idx, id) {
        req.delete('/apis/permission/role/' + id).then(res => {
            if(res.code == 1) {
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
                this.tableList.list.splice(idx, 1)
            }
        })
    },
    getRoleCode() {
      req.get('/apis/permission/roleCode').then(res => {
        if(res.code == 1) {
          this.roleList = res.data
        }
      })
    },
    handleEdit(row) {
      this.show_index = 2
      this.show_dialog = true
      this.addFormData = row
      this.getRoleCode()
    }
  },
  components: {
    Jurisdiction
  }
}
</script>


<style lang="scss" scoped>
// @import 'css/def.scss';
</style>