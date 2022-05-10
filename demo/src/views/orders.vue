    <template>
  <div>
    <MBX level="订单管理" level1="订单列表"></MBX>
    <div>
      <el-card class="mt">
        <div>
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="mt">
          <el-table :data="list" border>
            <el-table-column label="#" type="index"> </el-table-column>
            <el-table-column
              label="订单编号"
              prop="order_number"
            ></el-table-column>
            <el-table-column
              width="100px"
              label="订单价格"
              prop="order_price"
            ></el-table-column>
            <el-table-column label="是否付款" prop="pay_status" width="100px">
              <template slot-scope="scope">
                <el-tag :type="typeArr[scope.row.pay_status]">
                  {{ scope.row.pay_status | ran }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="是否发货" width="100px">
              <template slot-scope="scope">
                <el-tag type="danger" v-show="scope.row.is_send == '否'"
                  >未发货</el-tag
                >
                <el-tag type="primary" v-show="scope.row.is_send == '是'"
                  >已发货</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="下单时间">
              <template slot-scope="scope">
                {{ scope.row.create_time | time }}
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="username">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="edit(scope.row)"
                  icon="el-icon-edit"
                  circle
                ></el-button>
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-location"
                  circle
                  @click="logistics(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="this.queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <!-- 修改地址 -->
    <el-dialog title="修改地址" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="省市区/县">
          <el-cascader
            v-model="cheArr"
            :options="Ctiy"
            :props="props"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 查看物流进度 -->
    <el-dialog title="查看物流进度" :visible.sync="dial">
      <el-timeline :reverse="false">
        <el-timeline-item
          :icon="item.icon"
          v-for="(item, index) in Wu.data"
          :key="index"
          :timestamp="item.time"
          :color="item.type"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dial = false">取 消</el-button>
        <el-button type="primary" @click="dial = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Wu from "@/mock/wuliu.js";
console.log(Wu);
import Ctiy from "@/mock/Ctiy.js";
import loadh from "lodash";
import ys from "@/ys/ys.css";
export default {
  data() {
    return {
      Wu: Wu,
      Ctiy: Ctiy,
      cheArr: "",
      props: {
        expandTrigger: "hover",
        label: "label",
        children: "children",
        value: "value",
      },

      list: [],
      typeArr: ["danger", "success"],
      //   search: "",
      queryInfo: {
        pagenum: 1,
        pagesize: 5,
        query: "",
      },
      total: 0,
      dialogFormVisible: false,
      form: {},
      dial: false,
    };
  },
  //事件方法
  methods: {
    // 查看货物到什么地方
    logistics() {
      this.dial = true;
    },
    handleChange() {},
    // 修改地址
    edit() {
      this.dialogFormVisible = true;
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getorders();
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getorders();
    },
    async getorders() {
      const res = await this.$API.getOrdersAPI({
        pagenum: this.queryInfo.pagenum,
        pagesize: this.queryInfo.pagesize,
        query: this.queryInfo.query,
      });
      this.list = res.goods;
      const { total } = res;
      this.total = total;
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
    this.getorders();
  },
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 300px;
}
</style>