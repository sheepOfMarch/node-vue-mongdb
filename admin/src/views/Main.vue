<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>朝代管理</template>
          <el-menu-item-group>
            <template slot="title">朝代</template>
            <el-menu-item index="/dynasties/create">添加朝代</el-menu-item>
            <el-menu-item index="/dynasties/list">朝代列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">帝王</template>
            <el-menu-item index="/emperors/create">添加帝王</el-menu-item>
            <el-menu-item index="/emperors/list">帝王列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        
        <span>王小虎</span>
      </el-header>

      <el-main>
          <router-view></router-view>
        
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return {

    }
  },
};
</script>
