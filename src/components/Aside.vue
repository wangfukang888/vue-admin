<template>
    <div class="aside">
        <el-menu
            :collapse="icons"
            router
            :collapse-transition='false'
            :default-active="paths"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            background-color="#343334"
            active-background-color="#484848"
            text-color="#fff"
            active-text-color="#409eff">

            <div v-for="item in routerList" :key="item.id">
                    <el-submenu :class="{no : icons}" :index="item.id.toString()" v-if="item.children && item.children.length > 0 && item.meta.display==true">
                        <template slot="title">
                            <span :class="{active_icon: tab_index == item.id}">
                                <i :class="item.meta.icon"></i>
                            </span>
                            <span v-if="!icons">{{item.label}}</span>
                        </template>
                        <el-menu-item v-show="items.meta.display" v-for="(items,indexs) in item.children" :key="indexs" :index="items.path">
                            <i :class="items.meta.icon"></i>
                            {{items.label}}
                        </el-menu-item>
                    </el-submenu>

                    <el-menu-item v-for="(items,indexs) in item.children" :key="indexs" :index="items.path" v-show="items.meta.display"  v-else-if="item.children && item.children.length > 0 && item.meta.display==false">
                        <i :class="item.meta.icon"></i>
                        <span slot="title" >{{item.label}}</span>
                    </el-menu-item>

                    <el-menu-item  v-show="item.meta.display" :index="item.path"  v-else>
                        <i :class="item.meta.icon"></i>
                        <span slot="title">{{item.label}}</span>
                    </el-menu-item>
            </div>
        </el-menu>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      tab_index: -1
    }
  },
  methods: {
    init_index() {
      if (this.paths && this.paths.split('/').length > 2) {
        this.map_index()
      } else {
        this.tab_index = -1
      }
    },
    handleSelect(key, keyPath) {
      this.tab_index = keyPath[0]
    },
    map_index() {
      const data = this.routerList
      data.length &&
        data.forEach(item => {
          if (item.children) {
            item.children.forEach(el => {
              if (el.path == this.paths) {
                this.tab_index = item.id
              }
            })
          }
        })
    }
  },
  mounted() {
    this.map_index()
  },
  computed: {
    paths: function() {
      return this.$route.path
    },
    icons: function() {
      return this.$store.state.load.icons
    },
    routerList() {
      return this.$store.state.routerlists.mentList
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  min-height: 100%;
  background: #343334;
}
.el-menu {
  border: none;
}
.aside /deep/ .el-menu-item i {
  margin-top: -3px;
}
.aside /deep/ .el-submenu__title i:first-child {
  margin-top: -3px;
}
.no {
  /deep/ .el-submenu__icon-arrow {
    display: none;
  }
  .active_icon {
    i {
      color: #409eff;
    }
  }
}
</style>