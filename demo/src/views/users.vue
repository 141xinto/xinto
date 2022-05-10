<template>
  <div>
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- input 和添加用户按钮  和卡片-->
    <el-card class="mt">
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="query"
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
          >添加用户</el-button
        >
      </div>
      <div>
        <el-table border :data="tableData" style="width: 100%" class="mt">
          <el-table-column label="#" type="index"> </el-table-column>
          <el-table-column label="姓名" prop="username"> </el-table-column>
          <el-table-column label="邮箱" prop="email"> </el-table-column>
          <el-table-column label="电话" prop="mobile"> </el-table-column>
          <el-table-column label="角色" prop="role_name"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope"
              ><el-switch
                @change="status(scope.row)"
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="">
            <template slot-scope="scope">
              <!-- 编辑用户 -->
              <el-button
                @click="edit(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
              <!-- 删除用户 -->
              <el-button
                @click="detail(scope.row.id)"
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
              <!-- 分配角色 -->
              <el-button
                @click="jurisdiction(scope.row)"
                type="warning"
                size="mini"
                icon="el-icon-setting"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mt">
        <!-- 分页 -->
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
    <!-- 添加用户 -->
    <div>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          class="add"
          :rules="rules"
          ref="ruleFormListRef"
        >
          <el-form-item label="用户" prop="username">
            <el-input v-model="ruleForm.username" class="input"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" class="input"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" class="input"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm.mobile" class="input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addok">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--编辑用户-->
    <div>
      <el-dialog title="编辑用户" :visible.sync="Edit">
        <el-form :model="ruleForm" class="add" :rules="rules" ref="ruleFormRef">
          <el-form-item label="用户" prop="username">
            <el-input
              v-model="ruleForm.username"
              class="input"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" class="input"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="ruleForm.mobile" class="input"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Edit = false">取 消</el-button>
          <el-button type="primary" @click="editList">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 删除用户 -->
    <div></div>
    <!-- 角色权限 -->
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form :model="ruleForm">
          <div>当前的用户:{{ rol.username }}</div>
          <br />
          <div>当前的角色:{{ rol.role_name }}</div>
          <br />
          <el-form-item label="分配新角色">
            <el-select v-model="roid" placeholder="请选择">
              <el-option
                v-for="(item, i) in rolname"
                :key="i"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="jur">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Lodash from "lodash";
// import { MessageBox } from "element-ui";
import {
  UsersApi,
  AddApi,
  EdilApi,
  DetailApi,
  EditRolesApi,
  Roles,
  JurisdictionApi,
} from "@/http/api";
import ys from "@/ys/ys.css";
export default {
  data() {
    const checkEmail = (rules, value, callback) => {
      const regEmail =
        /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!regEmail.test(value)) {
        return callback(new Error("请输入合法邮箱"));
      }
      callback();
    };
    const checkMobile = (rules, value, callback) => {
      const regMobile = /^1[3456789]\d{9}$/;
      if (!regMobile.test(value)) {
        return callback(new Error("请输入合法手机号"));
      }
      callback();
    };
    return {
      dialogVisible: false,
      Edit: false,
      tableData: [],
      query: "",
      show: false,
      pagenum: 1,
      total: 2,
      pagesize: 2,
      rol: [],
      roid: [],
      rolname: [],
      ruleForm: {
        username: "",
        email: "",
        mobile: "",
        password: "",
      },
      dialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "用户名长度在 3~8 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "用户名长度在 3~8 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: checkEmail,
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkMobile,
          },
        ],
      },
    };
  },
  //事件方法
  methods: {
    async jur() {
      const res = await JurisdictionApi(this.rol.id, this.roid);
      this.UserList();
      this.dialogVisible = false;
    },
    // 角色权限对话框X
    handleClose() {
      this.dialogVisible = false;
    },
    // 角色权限
    async jurisdiction(row) {
      const res = await Roles();
      this.rolname = res;
      this.rol = row;
      this.dialogVisible = true;
    }, // 删除
    detail(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await DetailApi(id);
          this.UserList();
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
    //  确定编辑用户
    editList() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) return false;
        const res = await EdilApi(this.ruleForm);
      });
      this.Edit = false;
    },
    // 编辑用户
    edit(row) {
      this.ruleForm = row;
      this.Edit = true;
    },
    // 提交添加用户
    addok() {
      // 检查表单输入是否合法
      this.$refs.ruleFormListRef.validate(async (valid) => {
        if (!valid) return false;
        const res = await AddApi(this.ruleForm);

        this.dialogFormVisible = false;
        this.UserList();
        this.ruleForm = {};
      });
    },
    // 修改状态
    async status(row) {
      const { id, mg_state: EditType } = row;
      const res = await EditRolesApi(id, EditType);
    },
    // 添加用户
    addlist() {
      this.ruleForm = {};
      this.dialogFormVisible = true;
    },
    // 分页数据
    handleSizeChange(val) {
      this.pagesize = val;
      this.UserList();
    },
    // 当前分页第几页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.UserList();
    },
    async UserList() {
      const res = await UsersApi({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query,
      });
      this.tableData = res.users;
      const { total } = res;
      this.total = total;
    },
    // 搜索
    search: Lodash.debounce(function () {
      this.UserList();
    }, 200),
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
.input-with-select {
  width: 300px;
}
.input {
  width: 100%;
}
.add {
  padding-left: 40px;
}
</style>