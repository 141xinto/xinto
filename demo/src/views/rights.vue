<template>
  <div>
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-card class="mt">
        <el-table border :data="Rights" style="width: 100%">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="authName" label="权限名称"> </el-table-column>
          <el-table-column prop="path" label="路径"> </el-table-column>
          <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
              <el-tag :type="typeArray[scope.row.level]">{{
                scope.row.level | rank
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>
<script>
import ys from "../ys/ys.css";
export default {
  data() {
    return {
      typeArray: ["", "success", "warning"],
      Rights: [],
    };
  },
  //事件方法
  methods: {
    // 渲染权限列表
    async setRight() {
      const res = await this.$API.RolesListAPI();
      console.log(res);
      this.Rights = res;
    },
  },
  //注册组件(组件名)
  components: {},
  //计算属性
  computed: {},
  //事件监听
  watch: {},
  //生命周期
  created() {
    this.setRight();
  },
};
</script>
<style lang="scss" scoped>
</style>goods