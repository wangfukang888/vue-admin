<template>
  <div>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>参数值：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.configValue">
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
