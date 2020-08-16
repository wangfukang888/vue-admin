<template>
  <div>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>项目编号：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.projectNo">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>项目名称：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.projectName">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>ERP编号：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.erpNo">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>钢材用量：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.steelConsumption">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>固定费用：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.fixedCost">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>固定用料成本：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="addFormData.fixedMaterialCost">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>版本：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-radio v-model="addFormData.verNo" label="home">国内</el-radio>
        <el-radio v-model="addFormData.verNo" label="overseas">国外</el-radio> 
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>备注：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          type="textarea"
          placeholder=""
          v-model="addFormData.mark">
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