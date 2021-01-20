<template>
  <div>
    <h1>朝代列表</h1>
    <el-table :data="items" stripe>
      <el-table-column align="center" prop="_id" label="ID" width="220" header-align="center"> </el-table-column>
      <el-table-column align="center" prop="dynastyName" label="朝代名称" header-align="center"></el-table-column>
      <el-table-column align="center" prop="establish" label="始" header-align="center"></el-table-column>
      <el-table-column align="center" prop="destroyed" label="亡" header-align="center"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100" header-align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/dynasties/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/dynasties");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`确定要删除'${row.name}'这个朝代？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`rest/dynasties/${row._id}`);
          this.fetch();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
