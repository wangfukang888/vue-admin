<template>
  <div>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>账号：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.accountNo">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>邮箱：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.email">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>身份证号：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.idNo">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>手机号：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.mobile">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>姓名：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.name">
        </el-input>    
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    addFormData: {},
    input_length: 0,
    txt_length: 0
  }
}
</script>

<style lang="scss" scoped>
@import 'css/def.scss';
</style>
