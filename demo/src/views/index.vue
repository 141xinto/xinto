<template>
  <div>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
      <h2 class="top">电商管理品台</h2>
      <el-form-item>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          show-password
          placeholder="请输入密码"
          prefix-icon="iconfont icon-password"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="btn">
        <el-button type="primary" @click="goLogin">登录</el-button>
        <el-button type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { LoginApi } from "@/http/api";
export default {
  data() {
    return {
      // 表单表单数据

      loginForm: { username: "admin", password: "123456" },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "输入的用户名长度必须是5~10位之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 6,
            message: "输入的用户名长度必须是3~6位之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //事件方法
  methods: {
    //   登录
    goLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return false;
        const res = await LoginApi(this.loginForm);
        console.log("是否登陆成功", res);
        this.$router.push("/home");
      });
    },
  },
  //注册组件(组件名)
  components: {},
  //计算属性
  computed: {},
  //事件监听
  watch: {},
  //生命周期
  created() {},
};
</script>
<style lang="scss" scoped>
.el-form {
  background-color: white;
  height: 400px;
  width: 550px;
  padding: 0 40px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  .top {
    margin: 40px;
    text-align: center;
    font-size: 30px;
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>