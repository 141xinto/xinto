<template>
  <div>
    <!-- 面包屑 -->
    <MBX level="商品管理" level1="商品分类"></MBX>
    <!-- 卡片 -->
    <el-card class="mt">
      <!-- 按钮 -->
      <el-button type="primary" @click="addList">添加分类</el-button>
      <!-- 表格 -->
      <el-table class="mt" :data="categories" border row-key="cat_id">
        <el-table-column label="#" type="index">
          <template slot-scope="scope">
            <div>
              {{ scope.row.index }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            <div>
              <i
                v-if="!scope.row.cat_deleted"
                style="color: #1ab31a"
                class="el-icon-success"
              ></i>
              <i v-else class="el-icon-error"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag :type="typeArray[scope.row.cat_level]">{{
              scope.row.cat_level | rank
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="primary" size="mini"
              >编辑</el-button
            >
            <el-button @click="del(scope.row.cat_id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="mt">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="fy.pagenum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="fy.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>

      <!-- 添加分类 -->
      <div>
        <el-dialog
          @close="closeEvent"
          title="添加分类"
          :visible.sync="dialogFormVisible"
        >
          <el-form :model="form">
            <el-form-item label="分类名称" prop="cat_name">
              <el-input v-model="form.cat_name" class="in"></el-input>
            </el-form-item>
            <el-form-item label="分级分类">
              <el-cascader
                v-model="value"
                :options="options"
                :props="Cascader"
                @change="handleChange"
                class="in"
              ></el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 编辑 -->
      <div>
        <el-dialog title="编辑分类" :visible.sync="EditdialogForm">
          <el-form :model="Editform">
            <el-form-item label="分类名称" prop="cat_name">
              <el-input v-model="Editform.cat_name" class="in"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="EditdialogForm = false">取 消</el-button>
            <el-button type="primary" @click="addedit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
import ys from "@/ys/ys.css";
export default {
  data() {
    return {
      // 编辑
      EditdialogForm: false,
      Editform: { cat_name: "" },
      // 添加
      Cascader: {
        checkStrictly: "true",
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
      value: [],
      options: [],
      form: {
        cat_name: "",
        cat_pid: "",
        cat_level: "",
      },
      // 对话框
      dialogFormVisible: false,
      typeArray: ["", "success", "warning"],
      categories: [],
      // 分页
      fy: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      total: 5,
    };
  },
  //事件方法
  methods: {
    // 编辑对话框按钮
    async addedit() {
      let { cat_id, cat_name } = this.Editform;
      await this.$API.EditcategoriesAPI(cat_id, { cat_name });
      this.EditdialogForm = false;
      this.Caregories();
    },
    // 编辑
    edit(row) {
      this.Editform.cat_name = row.cat_name;
      this.Editform.cat_id = row.cat_id;
      this.EditdialogForm = true;
    },
    handleChange() {},
    // 清空表单
    closeEvent() {
      this.form = {};
      this.value = {};
    },
    // 添加分类按钮
    async add() {
      if (this.value.length !== 0) {
        this.form.cat_pid = this.value[this.value.length - 1];
        this.form.cat_level = this.value.length;
      } else {
        this.form.cat_pid = 0;
        this.form.cat_level = 0;
      }
      const res = await this.$API.addcategoriesAPI(this.form);
      this.dialogFormVisible = false;
      this.Caregories();
    },
    // 添加分类
    async addList() {
      const res = await this.$API.categoriesAPI({ type: 2 });
      this.options = res;

      this.dialogFormVisible = true;
    },

    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.delcategoriesAPI(id);
          this.Caregories();
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
    // 渲染商品分类数据
    async Caregories() {
      const res = await this.$API.categoriesAPI(this.fy);
      const { total, result } = res;
      result.forEach((item, index) => {
        item.index = index + 1;
      });
      this.total = total;
      this.categories = result;
    },
    // 分页数据
    handleSizeChange(val) {
      this.fy.pagesize = val;
      this.Caregories();
    },
    // 当前分页第几页
    handleCurrentChange(val) {
      this.fy.pagenum = val;
      this.Caregories();
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
    this.Caregories();
  },
};
</script>
<style>
.el-radio {
  position: absolute;
  width: 75%;
  height: 25px;
}
.el-radio__inner {
  display: none;
}
</style>
<style lang="scss" scoped>
.in {
  width: 80%;
}
</style>