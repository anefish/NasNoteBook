<template>
  <div class="">
    <!-- <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table> -->

    <el-steps direction="vertical" :active="1" space="120px" class="records">
      <el-step v-for="item in myRecords" :title="dateFormat(item.createTime) + ' ('+ isOpenRaw(item.isOpen) +')'" :description="item.content"
        :status="item.isOpen ? 'process': 'wait'" :key="item.createTime"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: 'MyList',
  data () {
    return {
      // tableData: [],
      myRecords: []
    }
  },
  mounted () {
    // this.getMyRecords()
    this.getUserRecords()
  },
  methods: {
    isOpenRaw (isOpen) {
      return isOpen ? '公开' : '私密'
    },
    dateFormat (str) {
      if (!str) {
        return ''
      }

      const date = new Date(str)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      let hh = date.getHours()
      let mm = date.getMinutes()
      let ss = date.getSeconds()

      M = M < 10 ? ('0' + M) : M
      D = D < 10 ? ('0' + D) : D
      hh = hh < 10 ? ('0' + hh) : hh
      mm = mm < 10 ? ('0' + mm) : mm
      ss = ss < 10 ? ('0' + ss) : ss

      return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
    },
    listener (resp) {
      console.log('^^^^^^^^^^^^^^^^listener resp: ', JSON.parse(resp.result))
      this.myRecords = JSON.parse(resp.result).reverse()
    },
    getUserRecords () {
      window.nebPay.simulateCall(window.dappAddress, '0', 'getRecordsByUser', '[]', {
        // qrcode: {
        //   showQRCode: true
        // },
        // goods: {
        //   name: "test",
        //   desc: "test goods"
        // },

        // set listener for extension transaction result
        listener: this.listener
      })
    },
    getMyRecords () {
      const from = window.Account.NewAccount().getAddressString()
      // const from = 'n1MUJXb6imRmTgKeiBYVkU9pYNT2Avhnt7Q'
      console.log('from: ', from)

      const value = '0'
      const nonce = '0'
      const gasPrice = '1000000'
      const gasLimit = '2000000'
      const callFunction = 'getRecordsByUser'
      const callArgs = '[]' // in the form of ["args"]
      const contract = {
        'function': callFunction,
        'args': callArgs
      }

      window.neb.api.call(from, window.dappAddress, value, nonce, gasPrice, gasLimit, contract).then(function (resp) {
        console.log('resp------------------->>>: ', JSON.parse(resp.result))
      }).catch(function (err) {
        console.log('error: ', err.message)
      })
    }
  }
}
</script>

<style scoped>
.records {
  padding-left: 60px;
  padding-top: 10px;
}
</style>
