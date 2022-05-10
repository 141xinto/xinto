<template>
  <div>
    <MBX level="数据统计" level1="数据报表"></MBX>
    <el-card class="mt">
      <div id="myChart" :style="{ width: '100%', height: '590px' }"></div>
    </el-card>
  </div>
</template>
<script>
import * as echarts from "echarts";
import ys from "@/ys/ys.css";
export default {
  data() {
    return {};
  },

  //事件方法
  methods: {
    async getRepots() {
      const res = await this.$API.getreportsAPI();
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption(res);
      window.onresize = function () {
        myChart.resize();
      };
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
    this.getRepots();
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  background: linear-gradient(
    to right,
    rgb(0, 255, 255),
    rgba(255, 20, 145, 0.403),
    rgb(255, 192, 203)
  );
  // background: linear-gradient(
  //   to right,
  //   rgba(0, 255, 255, 0.614),
  //   rgba(255, 20, 145, 0.542),
  //   rgba(255, 192, 203, 0.637)
  // );
  // background: -webkit-linear-gradient(
  //   rgba(0, 255, 255, 0.558),
  //   rgba(255, 20, 145, 0.63),
  //   rgba(255, 192, 203, 0.615),
  //   rgba(144, 238, 144, 0.677)
  // );
}
#myChart {
  border-radius: 100px;

  // background: linear-gradient(
  //   to right,
  //   rgb(0, 255, 255),
  //   rgba(255, 20, 145, 0.403),
  //   rgb(255, 192, 203)
  // );
  // background: linear-gradient(to right, #95d3d3, #e6bad7);
}
</style>

