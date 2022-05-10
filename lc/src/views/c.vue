<template>
  <div>
    <div ref="dom"></div>
  </div>
</template>
<script>
import * as echeats from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.cc();
  },
  //事件方法
  methods: {
    cc() {
      const dom = this.$refs.dom;
      const sc = echeats.init(dom);
      var xAxisData = [];
      var data1 = [];
      var data2 = [];
      for (var i = 0; i < 100; i++) {
        xAxisData.push("A" + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
      }
      const option = {
        title: {
          text: "Bar Animation Delay",
        },
        legend: {
          data: ["bar", "bar2"],
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ["stack"],
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: "bar",
            type: "bar",
            data: data1,
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10;
            },
          },
          {
            name: "bar2",
            type: "bar",
            data: data2,
            emphasis: {
              focus: "series",
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
          },
        ],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
      };
      sc.setOption(option);
      window.onresize = function () {
        sc.resize();
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
  created() {},
};
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  height: 800px;
  margin-top: 100px;
  margin-left: 50px;
}
</style>