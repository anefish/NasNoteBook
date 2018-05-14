<template>
  <div class="">
    <div class="title">
      <h1>区块记事</h1>
    </div>
    <el-form label-width="80px" class="form">
      <el-form-item label="事件内容">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="content">
        </el-input>

        <!-- <el-input v-model="content"></el-input> -->
      </el-form-item>
      <el-form-item label="是否公开">
        <el-switch v-model="isOpen"></el-switch>
        <!-- <el-button type="primary" @click="onSubmit">提交</el-button> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      content: '',
      isOpen: false,

      serialNumber: null,
      intervalQuery: null
    }
  },
  methods: {
    onSubmit () {
      console.log(this.content, this.isOpen)
      this.content = this.content.trim()
      if (!this.content) {
        this.$message.error('请填写事件内容')
        return false
      }

      const to = window.dappAddress
      const value = '0'
      const callFunction = 'addRecord'
      // const callArgs = '[\"' + this.content + '\",\"' + this.isOpen + '\"]'
      const callArgs = JSON.stringify([this.content, this.isOpen])

      // 使用nebpay的call接口去调用合约,
      this.serialNumber = window.nebPay.call(to, value, callFunction, callArgs, {
        // callback: NebPay.config.testnetUrl, //测试网，默认主网

        // 设置listener, 处理交易返回信息
        listener: this.cbPush
      })
      this.intervalQuery = setInterval(() => {
        this.funcIntervalQuery()
      }, 5000)
    },
    funcIntervalQuery () {
      // search transaction result from server (result upload to server by app)
      window.nebPay.queryPayInfo(this.serialNumber, {
        // callback: NebPay.config.testnetUrl, //测试网，默认主网
      })
        .then(function (resp) {
          // resp is a JSON string
          console.log('tx result: ', resp)
          const respObject = JSON.parse(resp)
          if (respObject.code === 0) {
            console.log('succeed!!!!!!!!!!!!!!!!!!!!!!!!')
            clearInterval(this.intervalQuery)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    cbPush (resp) {
      console.log('response of push: ', JSON.stringify(resp))
    }
  }
}
</script>

<style scoped>
.title {
  height: 100px;
  text-align: center;
}
.title h1 {
  font-size: 50px;
  color: #666666;
}
.form {
  padding-left: 60px;
  padding-top: 10px;
}
</style>
