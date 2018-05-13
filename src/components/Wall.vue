<template>
  <!-- <el-carousel :interval="4000" type="card" height="600px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel> -->

  <el-table
    :show-header="false"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        {{dateFormat(scope.row.createTime)}}
      </template>
    </el-table-column>
    <!-- <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column> -->
    <el-table-column
      prop="content"
      label="内容">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Wall',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getOpenRecords()
  },
  methods: {
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
    getOpenRecords () {
      const from = window.Account.NewAccount().getAddressString()
      // const from = 'n1MUJXb6imRmTgKeiBYVkU9pYNT2Avhnt7Q'
      console.log('from: ', from)

      const value = '0'
      const nonce = '0'
      const gasPrice = '1000000'
      const gasLimit = '2000000'
      const callFunction = 'getOpenRecords'
      const callArgs = '[]' // in the form of ["args"]
      const contract = {
        'function': callFunction,
        'args': callArgs
      }

      var _this = this

      window.neb.api.call(from, window.dappAddress, value, nonce, gasPrice, gasLimit, contract).then(function (resp) {
        console.log('resp------------------->>>: ', JSON.parse(resp.result))
        _this.tableData = JSON.parse(resp.result)
      }).catch(function (err) {
        console.log('error: ', err.message)
      })
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
