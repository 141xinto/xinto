<template>
  <div>
    <!--，面包屑  -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="mt">
      <!-- 添加角色按钮 -->
      <el-card>
        <el-button type="primary" @click="add">添加角色</el-button>
      </el-card>
      <!-- 添加角色对话框 -->
      <el-dialog title="添加角色" :visible.sync="dialogVisible" width="40%">
        <el-form
          :model="rulesFrom"
          :inline="true"
          :rules="rules"
          label-position="right"
          ref="rulesFromRef"
          label-width="100px"
          class="form"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rulesFrom.roleName" class="input"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="rulesFrom.roleDesc" class="input"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="Addroles">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 角色列表表格 树控-->
    <div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-if="scope.row.children.length > 0">
              <el-row
                type="flex"
                v-for="item in scope.row.children"
                :key="item.id"
              >
                <el-col :span="4">
                  <el-tag
                    effect="dark"
                    closable
                    @close="del(scope.row, scope.row.id, item.id)"
                  >
                    {{ item.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="ele in item.children" :key="ele.id">
                    <el-col :span="4">
                      <el-tag
                        type="success"
                        effect="dark"
                        closable
                        @close="del(scope.row, scope.row.id, ele.id)"
                      >
                        {{ ele.authName }}
                      </el-tag>
                    </el-col>
                    <el-col :span="20">
                      <el-row>
                        <el-col :span="4"> </el-col>
                        <el-col :span="20">
                          <el-tag
                            v-for="iei in ele.children"
                            :key="iei.id"
                            type="warning"
                            effect="dark"
                            closable
                            @close="del(scope.row, scope.row.id, iei.id)"
                          >
                            {{ iei.authName }}
                          </el-tag>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-else>此角色暂无权限</div>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑用户按钮 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <!-- 删除用户按钮 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="detail(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="jurisdiction(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑用户 -->
    <div>
      <el-dialog title="编辑角色" :visible.sync="EditData" width="40%">
        <el-form
          :model="rulesFrom"
          :inline="true"
          :rules="rules"
          label-position="right"
          ref="rulesFromRef"
          label-width="100px"
          class="form"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rulesFrom.roleName" class="input"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="rulesFrom.roleDesc" class="input"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditList">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分配权限角色 -->
    <div>
      <el-dialog
        title="分配权限"
        :visible.sync="access"
        width="50%"
        :before-close="handleClose"
      >
        <!-- 
        data:树形控件
        show-checkbox：是否显示复选框
        default-expand-all:展开所有
        node-key="id":指定在当前tree组件的唯一标识 通常是id
        default-checked-keys:设置tree控件默认选中选择id组成的数组
        default-expanded-keys：设置tree控件默认展开选择id组成的数组
        props：设置tree控件默认配置{label节点名称，chlddren:设置子级属性名称 }
       -->
        <el-tree
          :data="tree"
          show-checkbox
          default-expand-all
          :default-checked-keys="cheArray"
          node-key="id"
          ref="treeFrom"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="access = false">取 消</el-button>
          <el-button type="primary" @click="accessAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!--  -->
    <div></div>
  </div>
</template>
<script>
import ys from "@/ys/ys.css";
export default {
  data() {
    return {
      // 当前用户id
      currentRoles: 0,
      // 默认数组
      cheArray: [],
      // tree默认控件
      defaultProps: {
        label: "authName",
        children: "children",
      },
      access: false,
      //tree 数据
      tree: [],
      EditData: false,
      dialogVisible: false,
      tableData: [],
      rulesFrom: {
        roleName: "",
        roleDesc: "",
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 8,
            message: "角色名称长度在3~8个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          {
            required: true,
            message: "请输入角色描述",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //事件方法
  methods: {
    //权限tag删除按钮
    async del(item, ele, iei) {
      const reg = await this.$API.Delroles(ele, iei);
      item.children = reg;
      // this.roles();
    },
    // 分配权限对话框X
    handleClose() {
      this.access = false;
      this.cheArray = [];
    },
    // 分配权限对话框确定按钮
    async accessAdd() {
      // 全选按钮
      const checkbox = this.$refs.treeFrom.getCheckedKeys();
      // 半选按钮
      const check = this.$refs.treeFrom.getHalfCheckedKeys();
      // 和到一个数组里面
      const Array = [...checkbox, ...check];
      const cheArray = Array.join(",");
      const res = await this.$API.RolesPoosApi(this.currentRoles, cheArray);
      this.roles();
      this.access = false;
    },
    // 分配权限按钮
    async jurisdiction(row) {
      const res = await this.$API.RolesListAPI("tree");
      this.tree = res;
      this.currentRoles = row.id;
      // 递归获取当前角色所拥有的权限数组方法
      this.getCheBoxIdArr(row, this.cheArray);
      console.log("当前拥有id", this.cheArray);
      this.access = true;
      this.roles();
    },
    // 递归
    getCheBoxIdArr(row, cheArray) {
      if (!row.children) {
        return cheArray.push(row.id);
      }
      row.children.forEach((item) => {
        this.getCheBoxIdArr(item, cheArray);
      });
    },
    // 删除按钮
    detail(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.DetailRolesAPI(id);
          this.roles();
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
    // 编辑确定按钮
    EditList() {
      this.$refs.rulesFromRef.validate(async (valid) => {
        if (!valid) return false;
        const res = await this.$API.EditRolesAPi(this.rulesFrom);
        this.roles();
      });

      this.EditData = false;
    },
    // 编辑按钮
    edit(row) {
      this.rulesFrom = row;
      this.EditData = true;
    },
    // 添加角色按钮
    add() {
      this.dialogVisible = true;
    },
    // 添加角色
    Addroles() {
      this.$refs.rulesFromRef.validate(async (valid) => {
        if (!valid) return false;
        await this.$API.RolesApi(this.rulesFrom);
        this.dialogVisible = false;
        this.roles();
      });
    },
    // 渲染角色列表
    async roles() {
      const res = await this.$API.Roles(this.rulesFrom);
      this.tableData = res;
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
    this.roles();
  },
};
</script>
<style lang="scss" scoped>
.input {
  width: 100%;
}
.el-tag {
  margin: 8px;
}
</style>