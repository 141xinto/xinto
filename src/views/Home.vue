<template>
  <div>
    <!--头部-->
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="3">
            <img src="@/assets/logo.png" alt="" />
          </el-col>
          <el-col :span="17" class="left"> <h2>电商管理品台</h2> </el-col>
          <el-col :span="4">
            <el-button type="info">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 左侧 -->
        <el-aside :width="iShow ? '65px' : '200px'">
          <div @click="iShow = !iShow" class="box">|||</div>
          <el-menu
            :default-active="$route.name"
            :collapse="iShow"
            background-color="#373d41"
            text-color="#ffff"
            active-text-color="#f00"
            :unique-opened="true"
            :router="true"
            :collapse-transition="false"
          >
            <el-submenu
              :index="item.path + ''"
              v-for="(item, i) in left"
              :key="i"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group v-for="(ele, i) in item.children" :key="i">
                <el-menu-item :index="ele.path + ''">{{
                  ele.authName
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { HomeApi } from "@/http/api";
export default {
  data() {
    return {
      iShow: false,
      left: [],
    };
  },
  //事件方法
  methods: {
    async leftApi() {
      const res = await HomeApi();
      this.left = res;
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
    this.leftApi();
  },
};
</script>
<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #373d41;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  height: 100%;
  background-color: #373d41;
  color: white;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
img {
  box-sizing: border-box;
  padding-top: 5px;
  width: 40px;
  height: 50px;
}
.left {
  text-align: left;
}
.box {
  width: 100%;
  text-align: center;
  line-height: 40px;
  height: 40px;
}
.el-container {
  height: 700px;
}
</style>