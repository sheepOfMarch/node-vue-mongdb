<template>
  <div class="about">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"> </el-table-column>
      <el-table-column prop="name" label="分类名称" width="140"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {},
    };
  },
  methods: {
    async save() {
      await this.$http.post("categories", this.model);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
  },
};
</script>
