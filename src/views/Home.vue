<template>
  <div class="home">
    <el-container class="home-box">
        <el-aside class="home-aside" :width="icons ? '60px' : '220px' ">
            <Asides ref="cpt_asides"/>
        </el-aside>
        <el-container>
          <el-header class="box-header">
              <Headers @show="show_p = true" @change="changePath"/>
          </el-header>
          <el-main class="box-mains">
              <div class="box-mains-contnets">
                  <transition mode="out-in">
                      <router-view />
                  </transition>
              </div>
          </el-main>
        </el-container>
    </el-container>
    <el-dialog 
        title="修改密码"
        :visible.sync="show_p"
        width="60%">
        <el-row align="middle" type="flex">
          <el-col :span="txt_length">
            <div>帐号：</div>
          </el-col>
          <el-col :span="input_length" :offset="1">     
            <el-input
              placeholder=""
              v-model="f_data.accountNo">
            </el-input>    
          </el-col>
        </el-row>
        <el-row align="middle" type="flex">
          <el-col :span="txt_length">
            <div>原密码：</div>
          </el-col>
          <el-col :span="input_length" :offset="1">     
            <el-input
              placeholder=""
              v-model="f_data.oldPwd">
            </el-input>    
          </el-col>
        </el-row>
        <el-row align="middle" type="flex">
          <el-col :span="txt_length">
            <div>新密码：</div>
          </el-col>
          <el-col :span="input_length" :offset="1">     
            <el-input
              placeholder=""
              v-model="f_data.entryPwd">
            </el-input>    
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="show_p = false">取 消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Asides from '../components/Aside.vue'
import Headers from '../components/Headers.vue'
import req from '../https'

export default {
  name: 'home',
  created() {},
  data() {
    return {
      show_p: false,
      f_data: {},
      path: '',
      input_length: 8,
      txt_length: 4
    }
  },
  components: {
    Asides,
    Headers
  },
  computed: {
    icons: function() {
      return this.$store.state.load.icons
    }
  },
  methods: {
    changePath(path) {
      path && this.$refs.cpt_asides.init_index()
    },
    submit(){
      req.put('/apis/user/changePwd', this.f_data).then(res => {
        if(res && res.code == 1) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.show_p = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'css/def.scss';

.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home-box {
  width: 100%;
  height: 100%;
}
.box-mains {
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #eeeeee;
}
.box-mains-contnets {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.home-aside {
  background: #343334;
}

.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: 0.5s;
}

.v-leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: 0.5s;
}
</style>
