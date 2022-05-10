<template>
  <div>
    <!--封装的面包屑  -->
    <MBX level="商品管理" level1="商品列表"></MBX>
    <!-- 卡片 -->
    <el-card class="mt">
      <!-- input和添加商品按钮 -->
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="paginaton.query"
          @input="search"
          class="input-with-select"
          clearable
        >
          <el-button
            @click="search"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="primary" class="ml" @click="addlist"
          >添加商品</el-button
        >
      </div>
      <!-- tab表格 -->
      <el-table border :data="list" style="width: 100%" class="mt">
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
        ></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <div>{{ scope.row.add_time | Time }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              circle
              @click="Edit(scope.row)"
            ></el-button>
            <el-button
              circle
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="mt">
        <el-pagination
          class="mt"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginaton.pagenum"
          :page-size="paginaton.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import Lodash from "lodash";
import ys from "../ys/ys.css";
import { dataTool } from "echarts";
export default {
  data() {
    return {
      //  总共商品条数
      total: 800,
      paginaton: {
        // 当前商品页数
        pagenum: 1,
        // 每页显示条数
        pagesize: 3,
        // 分页数据
        query: "",
      },
      list: [],
    };
  },
  //事件方法
  methods: {
    //编辑按钮

    async Edit(row) {
      this.$router.push({
        path: "/goodsAdd",
        query: {
          row: row.goods_id,
        },
      });
    },
    // 删除按钮
    del(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.GoodsDelAPI(id);
          this.GoodsList();
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
    // 添加商品
    addlist() {
      this.$router.push("/goodsAdd");
    },
    // 渲染商品列表
    async GoodsList() {
      const res = await this.$API.GoodsAPI(this.paginaton);
      const { goods, total } = res;
      this.list = goods;
      this.total = total;
    },
    // input 搜索事件
    search: Lodash.debounce(function () {
      this.GoodsList();
    }, 200),

    // 分页数据
    handleSizeChange(val) {
      this.paginaton.pagesize = val;
      this.GoodsList();
    },
    // 当前第几页
    handleCurrentChange(val) {
      this.paginaton.pagenum = val;
      this.GoodsList();
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
    this.GoodsList();
  },
};
</script>
<style lang="scss" scoped>
.input-with-select {
  width: 30%;
}
</style>