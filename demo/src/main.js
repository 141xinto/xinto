import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import "../src/icon/iconfont.css"
Vue.config.productionTip = false

// 引入面包屑
import MBX from '@/components/BreadCrunmb'
Vue.component("MBX", MBX)
// 引入进度条的样式
import 'nprogress/nprogress.css'
import * as API from '@/http/api'
Vue.prototype.$API = API
// 引入时间戳
import Moment from 'moment'       //引入事件格式化插件
Vue.filter('Time', function (v) {
  return Moment(v * 1000).format('YYYY-MM-DD hh:mm:ss')
})
Vue.filter('time', function (v) {
  return Moment(v * 1000).format('YYYY年MM月DD日 hh时mm分ss秒')
})
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.filter('rank', function (v) {
  v = v + ''
  let result
  switch (v) {

    case '0': result = '一级'; break;
    case '1': result = '二级'; break;
    case '2': result = '三级'; break;
    default: result = '没有此级别'; break;
  }
  return result
})
Vue.filter('ran', function (v) {
  let ss
  switch (v) {
    case '0': ss = '未付款'; break
    case '1': ss = '已付款'; break
    default: ss = '没有了'; break;
  }
  return ss
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
