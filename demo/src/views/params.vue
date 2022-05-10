<template>
  <div>
    <!-- 面包屑 -->
    <MBX level="商品管理" level1="分类参数"></MBX>
    <div class="mt">
      <!-- 卡片 -->
      <el-card>
        <!-- 提示语 -->
        <el-alert
          title="注意:只允许为第三级分类设置相关参数"
          type="warning"
          show-icon
          :closable="false"
        >
        </el-alert>
        <!-- 选择级联框 -->
        <div class="mt">
          选择商品分类:

          <el-cascader
            v-model="active"
            :options="options"
            :props="gteGoo"
            @change="handleChange"
          ></el-cascader>
        </div>
        <!-- 标签页 -->
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="many">
              <template>
                <!-- 添加参数按钮 -->
                <div class="mt">
                  <el-button type="primary" :disabled="iShow" @click="add"
                    >添加参数</el-button
                  >
                </div>
                <!-- 表格 -->
                <div class="mt">
                  <el-table :data="manyList" border>
                    <el-table-column type="expand">
                      <template slot-scope="scope">
                        <div>
                          <el-tag
                            v-for="(item, i) in scope.row.attr_vals"
                            :key="i"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(index, scope.row)"
                          >
                            {{ item }}
                          </el-tag>
                          <el-input
                            class="input-new-tag"
                            v-if="scope.row.inputVisible"
                            v-model="scope.row.inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(scope.row)"
                            @blur="handleInputConfirm(scope.row)"
                          >
                          </el-input>
                          <el-button
                            v-else
                            class="button-new-tag"
                            size="small"
                            @click="showInput(scope.row)"
                            >+ New Tag</el-button
                          >
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="#" type="index"> </el-table-column>
                    <el-table-column
                      label="参数名称"
                      prop="attr_name"
                    ></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="small"
                          @click="edit(scope.row)"
                          >编辑</el-button
                        >
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="small"
                          @click="del(scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
              <div class="mt">
                <el-table :data="onlyList" border>
                  <el-table-column type="expand">
                    <template slot-scope="scope">
                      <div>
                        <el-tag
                          v-for="(item, i) in scope.row.attr_vals"
                          :key="i"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(index, scope.row)"
                        >
                          {{ item }}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-if="scope.row.inputVisible"
                          v-model="scope.row.inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm(scope.row)"
                          @blur="handleInputConfirm(scope.row)"
                        >
                        </el-input>
                        <el-button
                          v-else
                          class="button-new-tag"
                          size="small"
                          @click="showInput(scope.row)"
                          >+ New Tag</el-button
                        >
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="#" type="index"> </el-table-column>
                  <el-table-column
                    label="参数名称"
                    prop="attr_name"
                  ></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="small"
                        @click="edit(scope.row)"
                        >编辑</el-button
                      >
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        size="small"
                        @click="del(scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
      <!-- 添加对话框 -->
      <div>
        <el-dialog title="添加动态参数" :visible.sync="dialogVisible">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="动态参数" prop="attr_name">
              <el-input v-model="form.attr_name"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addok">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 编辑对话框 -->
      <div>
        <el-dialog title="编辑动态参数" :visible.sync="editadd">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="动态参数" prop="attr_name">
              <el-input v-model="form.attr_name"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editadd = false">取 消</el-button>
            <el-button type="primary" @click="ewditaddok">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import ys from "@/ys/ys.css";
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: "",
      // 标签页的数据 默认activeName为many 动态参数
      activeName: "many",
      // 商品分类数据源
      options: [],

      // 存放选中分类id组成的数组
      active: "",
      // 三级商品分类
      gteGoo: {
        expandTrigger: "hover",
        children: "children",
        label: "cat_name",
        value: "cat_id",
      },
      // 动态参数数组
      manyList: [],
      // 静态参数数组
      onlyList: [],
      // 动态参数对话框
      dialogVisible: false,
      // 编辑参数对话框
      editadd: false,

      // 对话框表单
      form: {
        attr_name: "",
        attr_sel: "only",
      },
      rules: {
        attr_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //事件方法
  methods: {
    // 添加确定按钮
    async addok() {
      await this.$API.addcateAPI(this.currId, {
        attr_name: this.form.attr_name,
        attr_sel: this.activeName,
      });
      this.getGoods();
      this.getGoodsParamsList();
      this.dialogVisible = false;
    },
    // 添加
    add() {
      this.form = {};
      this.dialogVisible = true;
    },
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async handleInputConfirm(row) {
      if (row.inputValue.trim().length > 0) {
        row.attr_vals.push(row.inputValue);
        await this.$API.editcategoriesApi(this.currId, row.attr_id, {
          attr_name: row.attr_name,
          attr_sel: this.activeName,
          attr_vals: row.attr_vals.join(","),
        });
      }
      row.inputVisible = false;
      row.inputValue = "";
    },

    // 删除tagb标签是触发
    handleClose(i, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          row.attr_vals.splice(i, 1);
          await this.$API.editcategoriesApi(this.currId, row.attr_id, {
            attr_name: row.attr_name,
            attr_sel: this.activeName,
            attr_vals: row.attr_vals.join(","),
          });
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
    // 删除
    async del(row) {
      let isok;
      try {
        isok = await this.$confirm(
          "此操作将永久删除该文件, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
      } catch (error) {
        isok = error;
      }

      if (isok === "confirm") {
        await this.$API.delcateAPI(this.currId, row.attr_id);
        this.getGoodsParamsList();

        this.getGoods();
      } else if (isok === "cancel") {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    // 编辑确定按钮
    async ewditaddok() {
      let css = {
        id: this.currId,
        attrId: this.form.attr_id,
        attr_name: this.form.attr_name,
        attr_sel: this.activeName,
      };

      const res = await this.$API.editcateApi(css);

      this.getGoodsParamsList();

      this.editadd = false;
    },
    // 编辑
    edit(row) {
      console.log(row);
      this.form = {
        attr_id: row.attr_id,
        attr_name: row.attr_name,
      };

      this.editadd = true;
    },
    // 三级分类选中是触发
    handleChange() {
      this.getGoodsParamsList();
      this.getGoods();
    },
    async getGoodsParamsList() {
      if (this.active.length !== 3) {
        this.$message({
          type: "error",
          message: "请选择三级商品分类 , 才可以添加或编辑参数",
        });
        this.manyList = [];
        this.onlyList = [];
        return false;
      }
      this.getGoods();
      const res = await this.$API.goodsAPI(this.currId, this.activeName);
      if (this.activeName === "many") {
        res.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        // 渲染动态参数
        this.manyList = res;
      } else if (this.activeName === "only") {
        res.forEach((item) => {
          item.inputVisible = false;
          item.inputValue = "";
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        // 静态参数
        this.onlyList = res;
      }
    },

    // 点击tab改变是触发
    handleClick() {
      this.getGoodsParamsList();
      console.log(this.activeName);
    },
    // 商品分类列表
    async getGoods() {
      const res = await this.$API.GoodsListAPI();
      this.options = res;
    },
  },
  //注册组件(组件名)
  components: {},
  //计算属性
  computed: {
    currId() {
      return this.active[this.active.length - 1];
    },
    // 添加参数的按钮是不是禁用状态
    iShow() {
      return this.active.length !== 3;
    },
  },
  //事件监听
  watch: {},
  //生命周期
  created() {
    this.getGoods();
  },
};
</script>
<style lang="scss" scoped>
.el-cascader {
  margin-left: 20px;
}
.el-tag {
  margin: 10px 10px;
}
.input-new-tag {
  width: 103px;
}
</style>