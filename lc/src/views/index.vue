<template>
  <div>
    <div ref="dom"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.ass();
  },
  //事件方法
  methods: {
    ass() {
      const dom = this.$refs.dom;
      const e = echarts.init(dom);
      const option = {
        backgroundColor: "#2c343c",
        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
          },
        },
        tooltip: {
          trigger: "item",
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 274, name: "Union Ads" },
              { value: 235, name: "Video Ads" },
              { value: 400, name: "Search Engine" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      };
      window.onresize = function () {
        e.resize();
      };
      e.setOption(option);
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
div {
  width: 100%;
  height: 800px;
  margin-top: 100px;
}
</style>