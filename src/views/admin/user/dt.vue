<template>
  <div>  
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>账号：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">   
          <div>{{dt_data.accountNo}}</div>  
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>邮箱：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">  
          <div>{{dt_data.email}}</div>     
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>用户id：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">  
          <div>{{dt_data.id}}</div>     
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>身份证号：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">   
          <div>{{dt_data.idNo}}</div>       
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>手机号：</div>
        </el-col>
        <el-col :span="input_length" :offset="1"> 
          <div>{{dt_data.mobile}}</div>         
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>姓名：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
          <div>{{dt_data.name}}</div> 
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>角色编号：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
          <div>{{dt_data.roleCode}}</div> 
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>角色id：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
          <div>{{dt_data.roleId}}</div> 
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>角色名称：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
          <div>{{dt_data.roleName}}</div> 
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>令牌：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
          <div>{{dt_data.token}}</div> 
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  props: {
    dt_data: {},
    input_length: 0,
    txt_length: 0
  }
}
</script>

<style lang="scss" scoped>
@import 'css/def.scss';
</style>
