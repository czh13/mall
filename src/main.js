import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuelazyLoad from 'vue-lazyload'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

//插件导入
import toast from './components/common/toast/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//使用自定义插件
Vue.use(toast)

Vue.use(VuelazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
  // 在还没有加载到数据图片时的占位图片
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


