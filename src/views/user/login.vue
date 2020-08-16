<template>
  <div>
    <div class="box"></div>
    <div class="box-loading">
          <div class="box-loading-titles">
                  价格估算系统
          </div>
          <div class="box-loading-from">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item  prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入帐号"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input show-password v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>  
                <!-- <div class="box-loading-from-checks">
                    <el-checkbox v-model="ruleForm.checked">七天免密登录</el-checkbox>
                    <el-link type="info" ></el-link>
                </div>  -->
                <el-form-item class="submits">
                    <el-button class="submits-btns" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                </el-form-item>
            </el-form>
          </div>
      </div>
  </div>

</template>

<script>
import { getLogin } from 'api'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        checked: false,
        path: '/'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            token: '',
            checked: false
          }
          getLogin(this.ruleForm.username, this.ruleForm.password).then(res => {
            if (res.code == 1) {
              let _res = res.data
              if (this.ruleForm.checked) {
                data.checked = true
                Cookies.set('pwd_info', {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                  checked: true
                }, { expires: 7})    
              } else {
                Cookies.remove('pwd_info')
              }
              data.token = _res.token
              this.$store.commit('setUser', _res)
              this.$store.commit('addToken', data)
              this.$router.push('/')
            }
          })
        }
      })
    }
  },
  created() {
    let info = Cookies.get('pwd_info') && JSON.parse(Cookies.get('pwd_info'))
    if( info) {
      this.ruleForm = info
    }
   
  }
}
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  top:0;
  width: 100%;
  bottom: 0;
  background: url('~img/bg.png');
  -webkit-filter: blur(100px); /* Chrome, Opera */
       -moz-filter: blur(100px);
        -ms-filter: blur(100px);    
            filter: blur(100px);
}
.box-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 5px;
  color: #41a9f9;
  box-shadow: 0 0 5px rgba(255,255,255,0.2);
  border-radius: 5px;
  padding: 30px 20px;
  box-sizing: border-box;
}
.box-loading-titles {
  width: 100%;
  height: 80px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  line-height: 80px;
  color: #eee;
}
.box-loading-from {
  width: 100%;
}

.box-loading-from-checks {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  /deep/ .el-checkbox__label{
    color: #eee;
  }
}
.forget {
  color: #fd3c53;
}
.submits {
  width: 100%;
}
.submits-btns {
  width: 100%;
  background: rgba(255,255,255,0.1);
  border: 0;
}
</style>