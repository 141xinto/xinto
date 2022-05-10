import Vue from 'vue'
import Vuex from 'vuex'
import vuexpersist from 'vuex-persist' //引入vuex数据固化插件
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
  },
  modules: {
  },
  plugins: [
    new vuexpersist({
      storage: window.localStorage,
    }).plugin
  ],
})
