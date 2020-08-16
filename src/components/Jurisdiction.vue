<template>
    <div class="Jurisdiction">
        <el-tree
            :data="routerList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :render-content="renderContent"
        >
        </el-tree>
        <el-button class="row-30" type="primary" @click="JurisdictionBtns">确认保存</el-button>
        <el-dialog
            :visible.sync="show_dialog"
            :title="t"
            width="60%" 
            append-to-body 
        >
            <el-tree
                :data="btnList"
                show-checkbox
                default-expand-all
                node-key="id"
                :default-checked-keys="defaultBtnCheckedList"
                ref="btnTree"
                highlight-current
                :render-content="renderBtnContent"
                >
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitBtn">提交</el-button>
            </span>
        </el-dialog>  
    </div>
</template>

<script>
import req from '../https'

export default {
  props: {
    r_id: ''
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultCheckedList: [],
      t: '',
      id: '',
      role_id: '',
      checkList: [],
      list: [],
      btn_list: [],
      show_dialog: false
    }
  },
  watch: {
    r_id: {
      handler(newId, oldId) {
        this.getRoleMenuList(newId)
      }
    }
  },
  mounted() {
    this.getRoleMenuList(this.r_id)
  },
  methods: {
    getRoleMenuList(id) {
      req.get(`/apis/permission/treeMenu/${id}`).then(res => {
        if (res && res.code == 1) {
          this.list = res.data
          this.defaultCheckedList = []
          this.checkedList()
        }
      })
    },
    checkedList() {
      const data = this.list
      let _arr = []
      data.forEach(item => {
        if (!item.menus) {
          if (item.menu.blnChecked) {
            _arr.push(item.menu.id)
          }
          return
        }
        if (item.menus) {
          item.menus.forEach(p => {
            if (p.menu.blnChecked) {
              _arr.push(p.menu.id)
            }
          })
        }
      })
      this.$refs.tree.setCheckedKeys(_arr)
    },
    JurisdictionBtns() {
      //   console.log(this.$refs.tree.getCheckedNodes()) //获取节点
      let arr_id = this.$refs.tree.getCheckedKeys() //获取key
      let _s = []
      const data = this.routerList
      data.map(item => {
        arr_id.map(p => {
          item.children && item.children.map(v => {
            if(v.id == p && item.children.length > 1) {
              _s.push(item.id)
            }
          })
        })
      })
      this.$emit('submit', arr_id.concat(_s).sort())
    },
    renderContent(h, { node, data }) {
      let dom = ''
      if (!data.children) {
        dom = (
          <span style="padding-left: 40px;">
            <el-button
              size="mini"
              type="text"
              on-click={() => this.configBtn(data)}
            >
              配置按钮权限
            </el-button>
          </span>
        )
      }
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          {dom}
        </span>
      )
    },
    renderBtnContent(h, { node, data }) {
      console.log(data)
      return (
        <span class="custom-tree-node">
          <span>{data.buttonName}</span>
        </span>
      )
    },
    submitBtn() {
      let btn_id = this.$refs.btnTree.getCheckedKeys() //获取key
      console.log(btn_id)
      this.show_dialog = false
    },
    configBtn(d) {
      this.id = d.id
      this.t = d.label + '按钮权限配置'
      this.show_dialog = true
    }
  },
  computed: {
    defaultBtnCheckedList() {
      const data = this.btnList
      let _arr = []
      data.forEach(item => {
        if (item.blnChecked) {
          _arr.push(item.id)
        }
      })
      return _arr
    },
    btnList() {
      const data = this.list
      let btn_arr = []
      data && data.forEach(item => {
        if (!item.menus) {
          if (item.menu.id == this.id) {
            btn_arr.push(...item.buttons)
          }
          return
        }
        if (item.menus) {
          item.menus.forEach(p => {
            if (p.menu.id == this.id) {
              btn_arr.push(...p.buttons)
            }
          })
        }
      })
      return btn_arr
    },
    routerList() {
      const data = this.$store.state.routerlists.routerList
      let arr = []
      data.forEach(item => {
        if (item.id < 90) arr.push(item)
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.Jurisdiction {
  width: 100%;
  height: auto;
  /deep/ .el-dialog {
    width: 50% !important;
  }
}
</style>