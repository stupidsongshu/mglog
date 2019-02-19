<template>
  <el-container>
    <!-- <el-aside width="200px">
      <my-aside></my-aside>
    </el-aside> -->
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
import Aside from './aside'
export default {
  components: {
    myAside: Aside
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}
.el-header {
  padding: 0;
  background-color: #D3DCE6;
}
.el-main {
  padding: 0;
}
</style>
