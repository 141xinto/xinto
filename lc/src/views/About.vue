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
    this.echart();
  },
  //事件方法
  methods: {
    echart() {
      const dom = this.$refs.dom;
      const echar = echarts.init(dom);
      setTimeout(function () {
        const option = {
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: [
              ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
              ["Milk Tea", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ["Matcha Latte", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ["Cheese Cocoa", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ["Walnut Brownie", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
            ],
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { top: "55%" },
          series: [
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              emphasis: { focus: "series" },
            },
            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              emphasis: {
                focus: "self",
              },
              label: {
                formatter: "{b}: {@2012} ({d}%)",
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012",
              },
            },
          ],
        };
        echar.on("updateAxisPointer", function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            echar.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });
        window.onresize = function () {
          echar.resize();
        };
        echar.setOption(option);
        
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
div {
  width: 100%;
  height: 800px;
  margin-top: 100px;
}
</style>