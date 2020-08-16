<template>
  <div class="s">
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>下单月份：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder="如202003"
          v-model="form_data.months">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>订单台数：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder="/台"
          v-model="form_data.orderNum">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>项目编号：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder=""
          v-model="form_data.projectNo">
        </el-input>    
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length"></el-col>
      <el-col :span="input_length" :offset="1">
        <div class="border" v-for="(item,index) in paymentList" :key="index">
          <i class="el-icon-circle-close" @click="paymentList.splice(index, 1)"></i>
          <div class="item">
            <div class="t">帐期： {{item.paymentDays}}</div>
            <div class="t">支付比例： {{item.paymentRatio}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <!-- <div>账单比例：</div> -->
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-button type="primary" icon="el-icon-circle-plus" @click="show_dialog = true, add_obj = {}">新增账单比例</el-button>
      </el-col>
    </el-row>
    <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>版本：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-radio v-model="form_data.verNo" label="home">国内</el-radio>
        <el-radio v-model="form_data.verNo" label="overseas">国外</el-radio> 
      </el-col>
    </el-row>
     <div class="row-30" >
      <el-row>
        <el-col :offset="5">
          <el-button type="primary" icon="el-icon-s-tools" @click="getBalance">结算</el-button>
        </el-col>    
      </el-row>
    </div>
    <el-row class="row-30" v-if="rate" align="middle" type="flex">
      <el-col :span="txt_length">
        <!-- <div>账单比例：</div> -->
      </el-col>
      <el-col :span="input_length" :offset="1">
        <el-tag>结算价格为 {{rate}}</el-tag>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="show_dialog"
      width="60%"
    >
      <el-row align="middle" type="flex">
        <el-col :span="txt_length">
          <div>帐期：</div>
        </el-col>
        <el-col :span="input_length" :offset="1">     
          <el-input
            placeholder="小于或等于360"
            v-model="add_obj.paymentDays">
          </el-input>    
        </el-col>
      </el-row>
      <el-row align="middle" type="flex">
      <el-col :span="txt_length">
        <div>支付比例：</div>
      </el-col>
      <el-col :span="input_length" :offset="1">     
        <el-input
          placeholder="小于或等于1"
          v-model="add_obj.paymentRatio">
        </el-input>    
      </el-col>
    </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show_dialog = false">取 消</el-button>
        <el-button type="primary" @click="submit">新增</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import req from '../../https' 

export default {
  data() {
    return{
      txt_length: 4,
      input_length: 8,
      form_data: {},
      rate: '',
      add_obj: {},
      paymentList: [],
      show_dialog: false
    }
  },
  methods: {
    getBalance() {
      req.post('/apis/dealer', Object.assign(this.form_data, {
        settlementSubDTOS: this.paymentList
      })).then(res => {
        if( res && res.code == 1) {
          this.rate = res.data
        } else{
          this.rate = ''
        }
      })
    },
    submit() {
      if (this.add_obj.paymentDays && this.add_obj.paymentRatio ) {
        this.paymentList.push(this.add_obj)
        this.show_dialog = false
      } else {
        this.$message('信息必须填写')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .s /deep/ .el-row{
    margin-bottom: 10px;
}
.s{
  .hd{
    height: 40px;
    line-height: 40px;
  }
}
.border{
  // width: 200px;
  position: relative;
  min-height: 100px;
  border:1px solid #eee;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 8px;
  &:last-child{
    margin-bottom: 0;
  }
  i{
    position: absolute;
    top:5px;
    color: #888;
    right: 5px;
    cursor: pointer;
  }
  .item{
    padding-left: 10px;
    color: #666;
    font-size: 14px;
    .t{
      margin-bottom: 8px;
    }
  } 
}
</style>
