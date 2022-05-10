<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ level }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ level1 }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: "mbx",
  props: {
    level: {
      type: String,
      default: "一级标题",
    },
    level1: {
      type: String,
      default: "二级标题",
    },
  },
  data() {
    return {};
  },
  //事件方法
  methods: {},
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
</style>