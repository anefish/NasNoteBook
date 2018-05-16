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
        :status="item.isOpen ? 'finish': 'process'" :key="item.createTime"></el-step>
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

        callback: window.IS_TESTNET ? window.NebPay.config.testnetUrl : window.NebPay.config.mainnetUrl,

        // set listener for extension transaction result
        listener: this.listener
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
