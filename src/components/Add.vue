<template>
  <div class="">
    <div class="desc">
      <p>[2009年1月3日，比特币的创始人中本聪将泰晤士报当天的头版文章标题，永久刻在了比特币区块链的创世区块里。]</p>
      <br>
      <p>古有结绳记事，今有区块记事。区块链永不宕机，让事迹永不磨灭。</p>
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
        <el-switch active-color="#ebb563" v-model="isOpen"></el-switch>
        <!-- <el-button type="primary" @click="onSubmit">提交</el-button> -->
      </el-form-item>
      <el-form-item>
        <el-button type="warning" plain @click="onSubmit">提交</el-button>
        <el-button type="info" plain @click="setUserName">设置昵称</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      userName: '',

      content: '',
      isOpen: false,

      serialNumber: null,
      intervalQuery: null
    }
  },
  mounted () {
    this.getUserName()
  },
  methods: {
    getUserName () {
      window.nebPay.simulateCall(window.dappAddress, '0', 'getUserName', '[]', {
        callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl,

        // set listener for extension transaction result
        listener: (resp) => {
          console.log('getUserName: ', JSON.stringify(resp))
          this.userName = JSON.parse(resp.result) || ''
        }
      })
    },
    setUserName () {
      const _this = this
      const inputValue = this.userName
      this.$prompt('', '设置昵称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: inputValue
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        console.log('value', value)
        value = value.trim()
        if (!value) {
          return false
        }

        console.log('value', value)

        const to = window.dappAddress
        const amountValue = '0'
        const callFunction = 'setUserName'
        const callArgs = JSON.stringify([value])
        window.nebPay.call(to, amountValue, callFunction, callArgs, {
          callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl,

          // 设置listener, 处理交易返回信息
          listener: (resp) => {
            console.log('response of push: ', JSON.stringify(resp))
            _this.userName = value
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // })
      })
    },
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
        callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl,

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
        callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl
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
.desc {
  /* height: 100px; */
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
}
.desc p:first-child {
  font-style: italic;
}
.desc p:last-child {
}
.form {
  padding-left: 60px;
  padding-top: 10px;
}

</style>
