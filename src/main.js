import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import VueLzayload from 'vue-lazyload'
import loading from '@/assets/images/lazyload.gif'
import '@/validate'
Vue.use(VueLzayload,{
  loading
})
//import Banner from '@/pages/Home/Banner'
import SliderLoop from '@/components/SliderLoop'
import Pagination from "@/components/Pagination";
import '@/mock/mockServer'
import { MessageBox, Message } from 'element-ui';


Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
//这个是为了测试接口请求函数  后期也会使用这样的方式去使用
import * as API from '@/api'
API.reqGoodsList({})
/////全局///////
Vue.config.productionTip = false
Vue.component('SliderLoop',SliderLoop)
Vue.component('Pagination',Pagination)
// Vue.component('Banner',Banner)
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  el:'#app',
  render: h => h(App),
  router,
  store
})

