<template>
  <div id="app">
    <el-container>
      <el-header>
        <my-nav></my-nav>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        <!-- <i class="el-icon-location"></i> -->
        <span>Copyright © 2018.区块记事</span>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  name: 'App',
  components: {
    'my-nav': Nav
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,body {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  /* max-height: 800px; */
  overflow: scroll;
  flex: 1;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
