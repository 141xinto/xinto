<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="mt">
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button
            @click="search"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="primary" class="ml" >添加用户</el-button>
      </div>
      <div>
        <el-table border :data="tableData" style="width: 100%" class="mt">
          <el-table-column label="#" type="index"> </el-table-column>
          <el-table-column label="姓名" prop="username"> </el-table-column>
          <el-table-column label="邮箱" prop="email"> </el-table-column>
          <el-table-column label="电话" prop="create_time"> </el-table-column>
          <el-table-column label="角色" prop="role_name"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope"
              ><el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="">
            <template>
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { UsersApi } from "@/http/api";
import ys from "@/ys/ys.css";
export default {
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      total: 2,
      pagesize: 2,
    };
  },
  //事件方法
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.UserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.UserList();
    },
    async UserList() {
      const res = await UsersApi({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      this.tableData = res.users;
      console.log(res);
      const { total } = res;
      this.total = total;
    },
    search() {
      this.UserList();
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
    this.UserList();
  },
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 300px;
}
</style>