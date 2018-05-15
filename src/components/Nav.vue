<template>
  <el-menu
    :default-active="activeIndex"
    class="" router
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/" class="logo">区块记事</el-menu-item>
    <el-menu-item index="/add">首页</el-menu-item>
    <!-- <el-menu-item index="/add">记事</el-menu-item> -->
    <el-menu-item index="/wall">大家说</el-menu-item>
    <el-menu-item index="/mylist">我的事件</el-menu-item>
    <!-- <el-menu-item index="/about">关于我们</el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: '/add'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.logo {
  font-size: 30px;
}
</style>
