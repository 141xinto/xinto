<template>
  <div>
    <!-- 面包屑 -->
    <MBX level="商品管理" level1="添加商品信息"></MBX>
    <!-- 卡片 -->
    <el-card class="mt">
      <!-- 消息提示 -->
      <el-alert
        center
        :closable="false"
        title="添加商品信息"
        type="info"
        effect="dark"
      >
      </el-alert>
      <!-- 步骤条 -->
      <div>
        <el-steps
          class="mt"
          :space="200"
          align-center
          :active="active * 1"
          finish-status="success"
        >
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <!-- 标签页 -->
      <div class="mt">
        <el-form :model="form" :rules="rules" ref="rulesFrom">
          <el-tabs
            :tab-position="tabPosition"
            v-model="active"
            @tab-click="addClisk"
            :before-leave="tab"
          >
            <el-tab-pane label="基本信息">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="form.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="form.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="form.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="form.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <br />
                <template>
                  <div>
                    <el-cascader
                      v-model="value"
                      :options="options"
                      :props="a"
                      @change="handleChange"
                    ></el-cascader>
                  </div>
                </template>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数">
              <el-form-item
                :label="item.attr_name"
                v-for="item in manyParams"
                :key="item.id"
              >
                <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox
                    :label="ele"
                    v-for="(ele, i) in item.attr_vals"
                    :key="i"
                  ></el-checkbox> </el-checkbox-group
              ></el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性">
              <el-form-item
                :label="item.attr_name"
                v-for="item in onlParams"
                :key="item.id"
              >
                <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片">
              <el-upload
                action="http://timemeetyou.com:8889/api/private/v1/upload"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="hanSuccess"
                file-type="picture"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件,且不超过500kb
                </div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容">
              <quill-editor v-model="form.goods_introduce" />
              <el-button class="mt" type="primary" @click="addCliskOk"
                >提交</el-button
              >
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import ys from "@/ys/ys.css";
export default {
  data() {
    return {
      tabPosition: "left",
      active: "0",
      goodsId: 0,
      form: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_introduce: "",
        goods_cat: "",
        pics: [],
        attrs: [],
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10个字符",
            trigger: "blur",
          },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      arr: [],
      options: [],
      a: {
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
      //   参数id
      value: [],
      manyParams: [],
      onlParams: [],
      headers: [],
      headers: { Authorization: sessionStorage.getItem("token") },
    };
  },
  //事件方法
  methods: {
    async getdoos() {
      const res = await this.$API.getGoodsAPIs(this.goodsId, this.form);
      this.form = res;

      this.arr = this.form.goods_cat.split(",");
      const goos = this.arr.map((item) => {
        return (item = Number(item));
      });

      this.value = goos;
    },
    // 提交按钮
    async addCliskOk() {
      if (this.getdoos) {
        const res = await this.$API.getEditApi(this.goodsId, this.form);
        this.$router.push("/goods");
        return false;
      }
      this.form.goods_cat = this.value.join(",");
      const dtData = this.manyParams.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(","),
        };
      });
      const jtData = this.onlParams.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals,
        };
      });
      const merParams = [...dtData, ...jtData];

      await this.$API.GoodsAddAPI(this.form);
      this.$router.push("/goods");
      this.GoodsList();
    },
    //   上传成功
    hanSuccess(res) {},
    // 移除
    handleRemove() {},
    //预览
    handlePreview() {},
    async addClisk() {
      if (this.active === "1") {
        const res = await this.$API.goodsAPI(this.valueid);

        res.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        this.manyParams = res;
      } else if (this.active === "2") {
        this.onlParams = await this.$API.goodsAPI(this.valueid, "only");
      }
    },
    handleChange() {},
    //  tab切换
    tab(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.value.length !== 3) {
        this.$message({
          type: "error",
          message: "请选择三级分类之后,才能进入下一步操作",
        });
        return false;
      }
    },
    submitForm(rulesFrom) {
      this.$refs[rulesFrom].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(rulesFrom) {
      this.$refs[rulesFrom].resetFields();
    },
    // 渲染商品分类数据列表
    async GoodsList(params) {
      const res = await this.$API.GoodsListAPI(params);
      this.options = res;
    },
  },
  //注册组件(组件名)
  components: {},
  //计算属性
  computed: {
    valueid() {
      return this.value[this.value.length - 1];
    },
  },
  //事件监听
  watch: {},
  //生命周期
  created() {
    this.GoodsList();
    this.goodsId = this.$route.query.row;
    if (this.goodsId) {
      this.getdoos();
    }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .ql-editor {
  height: 300px;
}
</style>